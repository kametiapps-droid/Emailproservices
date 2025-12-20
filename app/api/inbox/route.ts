import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { 
  isBlockedDomain, 
  calculateSpamScore, 
  containsIllegalContent, 
  sanitizeMessage,
  SECURITY_HEADERS,
  checkRateLimit,
  getClientIP,
  validateInput
} from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting (30 per hour)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'INBOX');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    const db = getDb();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get('emailId');

    if (!emailId || !validateInput(emailId, 40, 20)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Email ID' },
        { status: 400, headers: SECURITY_HEADERS }
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

    // Filter and sanitize messages
    const messages = messagesSnapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Check for blocked domains
      if (isBlockedDomain(data.sender)) {
        return null;
      }
      
      // Check for illegal content
      if (containsIllegalContent(data.content || '') || containsIllegalContent(data.subject || '')) {
        return null;
      }
      
      // Calculate spam score
      const spamCheck = calculateSpamScore(data.subject || '', data.content || '');
      
      // Sanitize HTML content
      const sanitizedHtml = data.htmlContent ? sanitizeMessage(data.htmlContent) : '';
      
      return {
        id: doc.id,
        ...data,
        htmlContent: sanitizedHtml,
        isSpam: spamCheck.isSpam,
        spamScore: spamCheck.score,
      };
    }).filter(Boolean); // Remove blocked messages

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get inbox' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (60 per hour - higher for webhook)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'INBOX');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    const db = getDb();
    const body = await request.json();
    const { emailId, sender, subject, content, htmlContent, attachments } = body;

    if (!emailId || !sender || !subject) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }
    
    // Security checks for incoming messages
    if (isBlockedDomain(sender)) {
      return NextResponse.json(
        { success: false, error: 'Sender is blocked' },
        { status: 403 }
      );
    }
    
    if (containsIllegalContent(content || '') || containsIllegalContent(subject)) {
      return NextResponse.json(
        { success: false, error: 'Content violates policy' },
        { status: 403 }
      );
    }
    
    // Calculate spam score
    const spamCheck = calculateSpamScore(subject, content || '');

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
      htmlContent: htmlContent ? sanitizeMessage(htmlContent) : '',
      attachments: attachments || [],
      receivedAt: new Date().toISOString(),
      isRead: false,
      isSpam: spamCheck.isSpam,
      spamScore: spamCheck.score,
    };

    await messageRef.set(message);

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add message' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Rate limiting (30 per hour)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'INBOX');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    const db = getDb();
    const body = await request.json();
    const { emailId, messageId } = body;

    if (!emailId || !messageId) {
      return NextResponse.json(
        { success: false, error: 'Email ID and Message ID are required' },
        { status: 400, headers: SECURITY_HEADERS }
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
    return NextResponse.json(
      { success: false, error: 'Failed to mark as read' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Rate limiting (10 per hour - stricter for deletion)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'CONTACTS');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    const db = getDb();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get('emailId');
    const messageId = searchParams.get('messageId');

    if (!emailId || !messageId) {
      return NextResponse.json(
        { success: false, error: 'Email ID and Message ID are required' },
        { status: 400, headers: SECURITY_HEADERS }
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
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
