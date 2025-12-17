import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

async function fetchEmailContent(emailId: string): Promise<{ text: string; html: string } | null> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('RESEND_API_KEY not set, cannot fetch email content');
    return null;
  }

  try {
    const response = await fetch(`https://api.resend.com/emails/${emailId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Failed to fetch email content:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    console.log('Fetched email content from Resend:', JSON.stringify(data, null, 2));
    return {
      text: data.text || data.body || '',
      html: data.html || '',
    };
  } catch (error) {
    console.error('Error fetching email content:', error);
    return null;
  }
}

function verifyResendWebhook(payload: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const rawBody = await request.text();
    const signature = request.headers.get('svix-signature') || request.headers.get('resend-signature') || '';
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const isValid = verifyResendWebhook(rawBody, signature, webhookSecret);
      if (!isValid) {
        console.log('Webhook signature verification failed, but continuing...');
      }
    }

    const body = JSON.parse(rawBody);
    
    let to: string;
    let from: string;
    let subject: string;
    let textBody: string = '';
    let htmlBody: string = '';

    console.log('Webhook received payload:', JSON.stringify(body, null, 2));

    if (body.type === 'email.received' && body.data) {
      to = body.data.to?.[0] || body.data.to;
      from = body.data.from;
      subject = body.data.subject || '(No Subject)';
      textBody = body.data.text || body.data.body || body.data.content || '';
      htmlBody = body.data.html || '';
    } else if (body.data) {
      to = body.data.to?.[0] || body.data.to || body.to;
      from = body.data.from || body.from;
      subject = body.data.subject || body.subject || '(No Subject)';
      textBody = body.data.text || body.data.body || body.data.content || body.body || body.text || '';
      htmlBody = body.data.html || body.html || '';
    } else {
      to = body.to;
      from = body.from;
      subject = body.subject || '(No Subject)';
      textBody = body.body || body.text || body.content || '';
      htmlBody = body.html || '';
    }
    
    console.log('Parsed email - To:', to, 'From:', from, 'Subject:', subject, 'Text length:', textBody?.length || 0, 'HTML length:', htmlBody?.length || 0);

    // Always try to fetch full content from Resend API to get HTML
    if (body.data?.email_id) {
      console.log('Fetching full email content from Resend API with email_id:', body.data.email_id);
      const content = await fetchEmailContent(body.data.email_id);
      if (content) {
        if (content.text) textBody = content.text;
        if (content.html) htmlBody = content.html;
        console.log('Fetched text length:', textBody?.length || 0, 'html length:', htmlBody?.length || 0);
      }
    }

    if (!to || !from) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailAddress = Array.isArray(to) ? to[0] : to;

    const emailsSnapshot = await db
      .collection('temp_emails')
      .where('email', '==', emailAddress)
      .limit(1)
      .get();

    if (emailsSnapshot.empty) {
      console.log('Email address not found:', emailAddress);
      return NextResponse.json(
        { success: false, error: 'Email address not found' },
        { status: 404 }
      );
    }

    const emailDoc = emailsSnapshot.docs[0];
    const emailData = emailDoc.data();

    if (new Date(emailData.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Email has expired' },
        { status: 404 }
      );
    }

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

    console.log('Email received and stored successfully for:', emailAddress);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook receive error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to receive email' },
      { status: 500 }
    );
  }
}
