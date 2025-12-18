import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

interface CloudflareEmail {
  to: string;
  from: string;
  subject?: string;
  text?: string;
  html?: string;
  raw?: string;
  timestamp?: string;
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    
    console.log('📨 Webhook received from Cloudflare');
    console.log('📦 Payload keys:', Object.keys(body));

    const cfEmail: CloudflareEmail = body;
    const to = cfEmail.to;
    const from = cfEmail.from;
    const subject = cfEmail.subject || '(No Subject)';
    
    // Get content from Cloudflare parsed email
    let textBody = '';
    let htmlBody = '';
    
    if (cfEmail.html && cfEmail.html.trim().length > 0 && /<[^>]+>/.test(cfEmail.html)) {
      // Prefer HTML if it contains actual HTML tags
      htmlBody = cfEmail.html;
    } else if (cfEmail.text && cfEmail.text.trim().length > 0) {
      // Otherwise use plain text
      textBody = cfEmail.text;
    } else {
      // Fallback
      textBody = 'Email received (no content available)';
    }
    
    console.log('✅ Using parsed text/html fields');

    console.log('📩 EMAIL RECEIVED');
    console.log('📬 To:', to);
    console.log('📧 From:', from);
    console.log('📋 Subject:', subject);
    console.log('📝 Text length:', textBody.length);
    console.log('🌐 HTML length:', htmlBody.length);

    if (!to || !from) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (to/from)' },
        { status: 400 }
      );
    }

    const emailAddress = Array.isArray(to) ? to[0] : to;

    // Check if email exists in database
    const emailsSnapshot = await db
      .collection('temp_emails')
      .where('email', '==', emailAddress)
      .limit(1)
      .get();

    if (emailsSnapshot.empty) {
      console.log('⚠️ Email address not found:', emailAddress);
      return NextResponse.json(
        { success: false, error: 'Email address not found' },
        { status: 404 }
      );
    }

    const emailDoc = emailsSnapshot.docs[0];
    const emailData = emailDoc.data();

    // Check if expired
    if (new Date(emailData.expiresAt) < new Date()) {
      console.log('⏰ Email has expired:', emailAddress);
      return NextResponse.json(
        { success: false, error: 'Email has expired' },
        { status: 404 }
      );
    }

    // Store message in Firebase
    const messageRef = emailDoc.ref.collection('messages').doc();

    await messageRef.set({
      id: messageRef.id,
      sender: from,
      subject: subject,
      content: htmlBody || textBody || 'No content',
      htmlContent: htmlBody,
      receivedAt: new Date().toISOString(),
      isRead: false,
    });

    console.log('✅ Email stored successfully with ID:', messageRef.id);
    return NextResponse.json({ success: true, messageId: messageRef.id });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to receive email' },
      { status: 500 }
    );
  }
}
