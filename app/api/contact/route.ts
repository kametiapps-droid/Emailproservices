import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { initializeFirebase } from '@/lib/firebaseInit';
import { checkRateLimit, getClientIP, SECURITY_HEADERS } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    // Limit request body size
    const contentLength = parseInt(request.headers.get('content-length') || '0');
    if (contentLength > 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Request too large' },
        { status: 413, headers: SECURITY_HEADERS }
      );
    }

    await initializeFirebase();
    const database = getDb();
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!database) {
      return NextResponse.json(
        { success: false, error: 'Database not available' },
        { status: 500 }
      );
    }

    // Save to Firestore
    const contactRef = await database.collection('contact_messages').add({
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'new',
      read: false,
    });

    return NextResponse.json({
      success: true,
      id: contactRef.id,
      message: 'Your message has been received. We will get back to you soon!',
    }, { headers: SECURITY_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process your request' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
