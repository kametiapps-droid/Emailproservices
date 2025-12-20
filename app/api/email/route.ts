import { NextRequest, NextResponse } from 'next/server';
import { getDb, generateRandomEmail, getExpirationTime } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import { checkRateLimit, getClientIP, SECURITY_HEADERS } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP);
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }
    
    const id = uuidv4();
    const email = generateRandomEmail();
    const createdAt = new Date();
    const expiresAt = getExpirationTime();

    const db = getDb();
    
    await db.collection('temp_emails').doc(id).set({
      id,
      email,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
    }, { merge: false });

    return NextResponse.json({
      success: true,
      data: {
        id,
        email,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get('id');

    if (!emailId) {
      return NextResponse.json(
        { success: false, error: 'Email ID is required' },
        { status: 400 }
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get email' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get('id');

    if (!emailId) {
      return NextResponse.json(
        { success: false, error: 'Email ID is required' },
        { status: 400 }
      );
    }

    const messagesSnapshot = await db
      .collection('temp_emails')
      .doc(emailId)
      .collection('messages')
      .get();
    
    const batch = db.batch();
    messagesSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    await db.collection('temp_emails').doc(emailId).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete email' },
      { status: 500 }
    );
  }
}
