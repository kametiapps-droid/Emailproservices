import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { checkRateLimit, getClientIP, SECURITY_HEADERS, validateInput, sanitizeInput } from '@/lib/security';

export const dynamic = 'force-dynamic';

// Feedback cache (10 min)
let feedbackCache: any[] | null = null;
let feedbackCacheTime = 0;
const FEEDBACK_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  try {
    const now = Date.now();
    
    // Return cached feedback if available
    if (feedbackCache && (now - feedbackCacheTime) < FEEDBACK_CACHE_DURATION) {
      const response = NextResponse.json(feedbackCache);
      response.headers.set('Cache-Control', 'public, max-age=600, s-maxage=0');
      response.headers.set('X-Cache', 'HIT');
      return response;
    }

    const db = getDb();
    const snapshot = await db.collection('feedback')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .get();
    
    const feedbacks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate?.() || data.timestamp || new Date()
      };
    });

    // Update cache
    feedbackCache = feedbacks;
    feedbackCacheTime = now;

    const response = NextResponse.json(feedbacks);
    response.headers.set('Cache-Control', 'public, max-age=600, s-maxage=0');
    response.headers.set('X-Cache', 'MISS');
    return response;
  } catch (error) {
    // Return empty array on error, with cache headers
    return NextResponse.json([], { 
      status: 200,
      headers: { 'Cache-Control': 'no-store' }
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (1 per hour per IP)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'FEEDBACK');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'You can only submit feedback once per hour. Thank you for your feedback!' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    // Limit request body size (50KB)
    const contentLength = parseInt(request.headers.get('content-length') || '0');
    if (contentLength > 50 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Request too large' },
        { status: 413, headers: SECURITY_HEADERS }
      );
    }

    const body = await request.json();
    let { name, rating, message, sentiment } = body;

    // Input validation
    if (!validateInput(name, 100, 1)) {
      return NextResponse.json(
        { success: false, error: 'Name is required and must be less than 100 characters' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (!rating || rating < 1 || rating > 5 || !Number.isInteger(parseInt(rating))) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (!validateInput(message, 1000, 10)) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 10 and 1000 characters' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (!['positive', 'neutral', 'negative'].includes(sentiment)) {
      return NextResponse.json(
        { success: false, error: 'Invalid sentiment' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // Sanitize inputs
    name = sanitizeInput(name, 100);
    message = sanitizeInput(message, 1000);
    rating = parseInt(rating);

    const db = getDb();
    const docRef = await db.collection('feedback').add({
      name,
      rating,
      message,
      sentiment,
      ipHash: clientIP, // Store IP for moderation
      timestamp: new Date(),
      createdAt: new Date()
    });

    // Invalidate feedback cache to show new feedback immediately
    feedbackCache = null;

    return NextResponse.json(
      { success: true, id: docRef.id, message: 'Thank you for your feedback!' },
      { status: 201, headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save feedback' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
