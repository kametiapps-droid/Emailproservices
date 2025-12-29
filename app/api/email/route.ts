import { NextRequest, NextResponse } from 'next/server';
import { getDb, generateRandomEmail, getExpirationTime } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import { checkRateLimit, getClientIP, SECURITY_HEADERS, validateInput } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const forceNew = body.forceNew === true;
    
    // Rate limiting check (100 per hour)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'EMAILS');
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }
    
    // Verify request is valid
    const contentType = request.headers.get('content-type');
    if (contentType && !contentType.includes('application/json') && contentType !== '') {
      return NextResponse.json(
        { success: false, error: 'Invalid content type' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }
    
    const db = getDb();
    
    // Check if IP already has an active email (one per IP per 24 hours)
    // For development, we allow more frequent changes if needed
    const existingEmailData = (db as any).getIpEmail?.(clientIP);
    if (existingEmailData && !forceNew) {
      const expiresAt = new Date(existingEmailData.expiresAt);
      // If email hasn't expired, return the existing one
      if (expiresAt > new Date()) {
        const emailDoc = await db.collection('temp_emails').doc(existingEmailData.emailId).get();
        if (emailDoc.exists) {
          const data = emailDoc.data();
          if (data) {
            const response = NextResponse.json({
              success: true,
              data: {
                id: data.id,
                email: data.email,
                createdAt: data.createdAt,
                expiresAt: data.expiresAt,
              },
            }, { headers: SECURITY_HEADERS });
            response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
            return response;
          }
        }
      } else {
        // Email expired, clear the IP mapping
        (db as any).clearIpEmail?.(clientIP);
      }
    }
    
    const id = uuidv4();
    const email = generateRandomEmail();
    const createdAt = new Date();
    const expiresAt = getExpirationTime();

    await db.collection('temp_emails').doc(id).set({
      id,
      email,
      clientIP,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
    }, { merge: false });
    
    // Track this email for the IP
    (db as any).setIpEmail?.(clientIP, id, expiresAt.toISOString());

    const response = NextResponse.json({
      success: true,
      data: {
        id,
        email,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
      },
    }, { headers: SECURITY_HEADERS });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting (100 per hour)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'EMAILS');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    const db = getDb();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get('id');

    if (!emailId) {
      return NextResponse.json(
        { success: false, error: 'Email ID is required' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const doc = await db.collection('temp_emails').doc(emailId).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Email not found' },
        { status: 404 }
      );
    }

    const data = doc.data();
    
    if (new Date(data?.expiresAt) < new Date()) {
      await db.collection('temp_emails').doc(emailId).delete();
      return NextResponse.json(
        { success: false, error: 'Email has expired' },
        { status: 404 }
      );
    }

    const response = NextResponse.json({ success: true, data }, { headers: SECURITY_HEADERS });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get email' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Rate limiting (5 per hour - stricter for deletion)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'CONTACTS');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    const db = getDb();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get('id');

    if (!emailId) {
      return NextResponse.json(
        { success: false, error: 'Email ID is required' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // Get the email document to find the IP
    const emailDoc = await db.collection('temp_emails').doc(emailId).get();
    const emailData = emailDoc.data();
    
    // Delete the email document and all subcollections in parallel
    const docRef = db.collection('temp_emails').doc(emailId);
    const batch = db.batch();

    // Fetch messages with limit for optimization
    const messagesSnapshot = await db
      .collection('temp_emails')
      .doc(emailId)
      .collection('messages')
      .limit(500) // Limit to prevent timeouts
      .get();
    
    // Add all message deletions to batch
    messagesSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Delete the main email document
    batch.delete(docRef);
    
    // Execute all deletions in one batch operation
    await batch.commit();
    
    // Clear IP mapping to allow new email generation
    if (emailData?.clientIP) {
      (db as any).clearIpEmail?.(emailData.clientIP);
    }

    return NextResponse.json({ success: true }, { headers: SECURITY_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete email' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
