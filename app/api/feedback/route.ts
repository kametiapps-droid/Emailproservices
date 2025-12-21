import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';

export async function GET() {
  try {
    const db = getDb();
    const snapshot = await db.collection('feedback')
      .orderBy('timestamp', 'desc')
      .get();
    
    const feedbacks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate?.() || data.timestamp || new Date()
      };
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, rating, message, sentiment } = body;

    if (!name || !rating || !message || !sentiment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = getDb();
    const docRef = await db.collection('feedback').add({
      name,
      rating: parseInt(rating),
      message,
      sentiment,
      timestamp: new Date(),
      createdAt: new Date()
    });

    return NextResponse.json(
      { id: docRef.id, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving feedback:', error);
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    );
  }
}
