import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { initializeFirebase } from '@/lib/firebaseInit';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
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
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await initializeFirebase();
    const database = getDb();
    
    if (!database) {
      return NextResponse.json(
        { success: false, error: 'Database not available' },
        { status: 500 }
      );
    }

    const snapshot = await database
      .collection('contact_messages')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get();

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: typeof doc.data().createdAt === 'string' ? doc.data().createdAt : new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve messages' },
      { status: 500 }
    );
  }
}
