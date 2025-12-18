import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
let db: admin.firestore.Firestore;

try {
  if (!admin.apps.length) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : undefined;

    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }
  db = admin.firestore();
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export async function POST(request: NextRequest) {
  try {
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

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not available' },
        { status: 500 }
      );
    }

    // Save to Firestore
    const contactRef = await db.collection('contact_messages').add({
      name,
      email,
      subject,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'new',
      read: false,
    });

    return NextResponse.json({
      success: true,
      id: contactRef.id,
      message: 'Your message has been received. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all contact messages (admin only in production)
export async function GET() {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not available' },
        { status: 500 }
      );
    }

    const snapshot = await db
      .collection('contact_messages')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get();

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    }));

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve messages' },
      { status: 500 }
    );
  }
}
