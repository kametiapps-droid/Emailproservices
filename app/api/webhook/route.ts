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
      const rawEmail = cfEmail.raw || '';
      
      if (!rawEmail || rawEmail.trim().length === 0) {
        console.warn('⚠️ No raw email content received from worker');
        console.warn('Raw value:', rawEmail);
        console.warn('Raw length:', rawEmail.length);
        // Set generic content placeholder
        textBody = 'Email received (content extraction pending)';
        htmlBody = '';
      } else {
        const lines = rawEmail.split('\n');
        let bodyStarted = false;
        let currentBody = '';
        let isHtml = false;
        let inQuotedPrintable = false;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          if (!bodyStarted) {
            // Look for empty line that marks end of headers
            if (line.trim() === '' || line === '\r') {
              bodyStarted = true;
              continue;
            }
            
            // Extract subject from headers if not set
            if (line.toLowerCase().startsWith('subject:')) {
              subject = line.substring(8).trim() || subject;
            }
            if (line.toLowerCase().startsWith('content-type:')) {
              if (line.toLowerCase().includes('text/html')) {
                isHtml = true;
              }
              if (line.toLowerCase().includes('quoted-printable')) {
                inQuotedPrintable = true;
              }
            }
          } else {
            // Skip boundary markers
            if (line.startsWith('--') && line.includes('boundary')) {
              continue;
            }
            // Skip charset and other metadata lines
            if (line.startsWith('Content-')) {
              continue;
            }
            // Add content
            if (line.trim().length > 0) {
              currentBody += line + '\n';
            }
          }
        }
        
        const cleanBody = currentBody.trim();
        
        if (cleanBody && cleanBody !== '') {
          textBody = cleanBody;
          htmlBody = isHtml ? cleanBody : '';
        } else {
          textBody = 'Email received (no extractable content)';
          htmlBody = '';
        }
      }
    } catch (parseError) {
      console.error('Error parsing raw email:', parseError);
      textBody = 'Failed to parse email content';
      htmlBody = '';
    }
    
    console.log('📋 Parsed text body length:', textBody.length);
    console.log('📋 Is HTML:', htmlBody.length > 0);
    
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
