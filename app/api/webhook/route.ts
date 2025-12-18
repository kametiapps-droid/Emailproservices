import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

interface CloudflareEmail {
  to: string;
  from: string;
  subject?: string;
  headers?: Record<string, string>;
  raw: string;
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    
    let to: string;
    let from: string;
    let subject: string;
    let textBody: string = '';
    let htmlBody: string = '';

    console.log('📨 Webhook received from Cloudflare');

    // Parse Cloudflare email
    const cfEmail: CloudflareEmail = body;
    to = cfEmail.to;
    from = cfEmail.from;
    subject = cfEmail.subject || '(No Subject)';
    
    // Parse raw email content
    try {
      const rawEmail = cfEmail.raw;
      const lines = rawEmail.split('\n');
      let bodyStarted = false;
      let currentBody = '';

      for (const line of lines) {
        if (!bodyStarted) {
          if (line === '' || line === '\r') {
            bodyStarted = true;
            continue;
          }
          // Extract subject from headers if not set
          if (line.toLowerCase().startsWith('subject:')) {
            subject = line.substring(8).trim() || subject;
          }
        } else {
          currentBody += line + '\n';
        }
      }
      
      textBody = currentBody.trim() || '(No email content)';
      htmlBody = '';
    } catch (parseError) {
      console.error('Error parsing raw email:', parseError);
      textBody = cfEmail.raw || '(Failed to parse email)';
    }
    
    console.log('📩 EMAIL RECEIVED');
    console.log('Inbox:', to.split('@')[0]);
    console.log('From:', from);
    console.log('Subject:', subject);
    console.log('Size:', textBody.length);

    if (!to || !from) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailAddress = Array.isArray(to) ? to[0] : to;

    // Check if email exists
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
      content: textBody || htmlBody,
      htmlContent: htmlBody,
      receivedAt: new Date().toISOString(),
      isRead: false,
    });

    console.log('✅ Email received and stored successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook receive error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to receive email' },
      { status: 500 }
    );
  }
}
