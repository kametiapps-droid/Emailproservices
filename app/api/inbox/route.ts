import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get('emailId');

    if (!emailId) {
      return NextResponse.json(
        { success: false, error: 'Email ID is required' },
        { status: 400 }
      );
    }

    const emailDoc = await db.collection('temp_emails').doc(emailId).get();

    if (!emailDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Email not found' },
        { status: 404 }
      );
    }

    const emailData = emailDoc.data();
    if (new Date(emailData?.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Email has expired' },
        { status: 404 }
      );
    }

    const messagesSnapshot = await db
      .collection('temp_emails')
      .doc(emailId)
      .collection('messages')
      .orderBy('receivedAt', 'desc')
      .get();

    const messages = messagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error('Get inbox error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get inbox' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { emailId, sender, subject, content } = body;

    if (!emailId || !sender || !subject) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const messageRef = db
      .collection('temp_emails')
      .doc(emailId)
      .collection('messages')
      .doc();

    const message = {
      id: messageRef.id,
      sender,
      subject,
      content: content || '',
      receivedAt: new Date().toISOString(),
      isRead: false,
    };

    await messageRef.set(message);

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error('Add message error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add message' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { emailId, messageId } = body;

    if (!emailId || !messageId) {
      return NextResponse.json(
        { success: false, error: 'Email ID and Message ID are required' },
        { status: 400 }
      );
    }

    await db
      .collection('temp_emails')
      .doc(emailId)
      .collection('messages')
      .doc(messageId)
      .update({ isRead: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mark read error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to mark as read' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get('emailId');
    const messageId = searchParams.get('messageId');

    if (!emailId || !messageId) {
      return NextResponse.json(
        { success: false, error: 'Email ID and Message ID are required' },
        { status: 400 }
      );
    }

    await db
      .collection('temp_emails')
      .doc(emailId)
      .collection('messages')
      .doc(messageId)
      .delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete message error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
