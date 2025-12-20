import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

export const dynamic = 'force-dynamic';

let db: admin.firestore.Firestore | null = null;

function initializeFirebaseContact() {
  if (db) return db;
  
  try {
    if (!admin.apps.length) {
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_SERVICES_KEY;
      
      if (!serviceAccountKey) {
        throw new Error('Firebase credentials not available');
      }

      let serviceAccount;
      try {
        serviceAccount = JSON.parse(serviceAccountKey);
      } catch {
        const decoded = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
        serviceAccount = JSON.parse(decoded);
      }

      const privateKey = serviceAccount.private_key.replace(/\\n/g, '\n');

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
          privateKey: privateKey,
        }),
      });
    }
    db = admin.firestore();
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
  
  return db;
}

export async function POST(request: NextRequest) {
  try {
    const database = initializeFirebaseContact();
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
    const database = initializeFirebaseContact();
    
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
