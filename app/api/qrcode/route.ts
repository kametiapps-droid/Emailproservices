export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { checkRateLimit, getClientIP, SECURITY_HEADERS } from '@/lib/security';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
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
        { status: 404, headers: SECURITY_HEADERS }
      );
    }

    const data = doc.data();
    const email = data?.email;

    const qrDataUrl = await QRCode.toDataURL(email, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    return NextResponse.json({ success: true, qrCode: qrDataUrl }, { headers: SECURITY_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate QR code' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
