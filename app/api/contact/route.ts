import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { checkRateLimit, getClientIP, SECURITY_HEADERS, validateEmail, validateInput, sanitizeInput } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (5 per hour)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'CONTACTS');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    // Limit request body size (100KB max)
    const contentLength = parseInt(request.headers.get('content-length') || '0');
    if (contentLength > 100 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Request too large' },
        { status: 413, headers: SECURITY_HEADERS }
      );
    }

    const database = getDb();
    const body = await request.json();
    let { name, email, subject, message } = body;

    // Input validation
    if (!validateInput(name, 100, 1)) {
      return NextResponse.json(
        { success: false, error: 'Name is required and must be less than 100 characters' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (!validateInput(subject, 200, 1)) {
      return NextResponse.json(
        { success: false, error: 'Subject is required and must be less than 200 characters' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (!validateInput(message, 5000, 1)) {
      return NextResponse.json(
        { success: false, error: 'Message is required and must be less than 5000 characters' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // Sanitize inputs
    name = sanitizeInput(name, 100);
    email = sanitizeInput(email, 254);
    subject = sanitizeInput(subject, 200);
    message = sanitizeInput(message, 5000);

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
