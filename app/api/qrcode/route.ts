export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { checkRateLimit, getClientIP, SECURITY_HEADERS } from '@/lib/security';
import QRCode from 'qrcode';

// Simple in-memory cache for QR codes (max 100 entries)
const qrCache = new Map<string, { qr: string; timestamp: number }>();
const CACHE_DURATION = 3600000; // 1 hour in milliseconds
const MAX_CACHE_SIZE = 100;

function getCachedQR(emailId: string): string | null {
  const cached = qrCache.get(emailId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.qr;
  }
  qrCache.delete(emailId);
  return null;
}

function setCachedQR(emailId: string, qr: string): void {
  // Simple LRU: remove oldest if cache is full
  if (qrCache.size >= MAX_CACHE_SIZE) {
    const firstKey = qrCache.keys().next().value as string | undefined;
    if (firstKey) {
      qrCache.delete(firstKey);
    }
  }
  qrCache.set(emailId, { qr, timestamp: Date.now() });
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting (20 per hour)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'QR_CODE');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get('id');

    if (!emailId) {
      return NextResponse.json(
        { success: false, error: 'Email ID is required' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // Check cache first
    const cachedQR = getCachedQR(emailId);
    if (cachedQR) {
      const response = NextResponse.json({ success: true, qrCode: cachedQR }, { headers: SECURITY_HEADERS });
      response.headers.set('Cache-Control', 'private, max-age=3600, s-maxage=0');
      response.headers.set('X-Cache', 'HIT');
      return response;
    }

    // Generate QR code if not cached
    const db = getDb();
    const doc = await db.collection('temp_emails').doc(emailId).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Email not found' },
        { status: 404, headers: SECURITY_HEADERS }
      );
    }

    const data = doc.data();
    const email = data?.email;

    // Generate with optimized settings for faster processing
    const qrDataUrl = await QRCode.toDataURL(email, {
      type: 'image/png',
      width: 200,
      margin: 2,
      errorCorrectionLevel: 'M', // Medium error correction for faster generation
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    // Cache the result
    setCachedQR(emailId, qrDataUrl);

    const response = NextResponse.json({ success: true, qrCode: qrDataUrl }, { headers: SECURITY_HEADERS });
    response.headers.set('Cache-Control', 'private, max-age=3600, s-maxage=0');
    response.headers.set('X-Cache', 'MISS');
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate QR code' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
