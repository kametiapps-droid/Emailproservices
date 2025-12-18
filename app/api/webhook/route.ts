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
    
    // Function to clean MIME content - preserve HTML, remove only MIME envelope
    const cleanMimeContent = (content: string): string => {
      if (!content) return '';
      
      const lines = content.split('\n');
      const cleanedLines: string[] = [];
      let inHeaders = true;
      let headerEndIndex = 0;
      
      // Find where headers end (first blank line)
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '') {
          inHeaders = false;
          headerEndIndex = i + 1;
          break;
        }
      }
      
      // Extract everything after headers
      const bodyLines = lines.slice(headerEndIndex);
      
      // Remove only MIME boundaries, keep HTML content intact
      for (const line of bodyLines) {
        const trimmed = line.trim();
        
        // Skip lines that are pure MIME boundaries (just dashes and optional text)
        if (trimmed.startsWith('--') && (trimmed.includes('Part') || trimmed.includes('boundary') || trimmed.endsWith('--'))) {
          continue;
        }
        
        // Skip lines that start with Content- or MIME- (these are sub-part headers)
        if (line.startsWith('Content-') || line.startsWith('MIME-')) {
          continue;
        }
        
        // Keep all other content (including HTML, images, etc)
        if (trimmed) {
          cleanedLines.push(line);
        }
      }
      
      return cleanedLines.join('\n').trim();
    };

    // Get content - prefer text/html fields from postal-mime parsed email
    let textBody = '';
    let htmlBody = '';
    
    if (cfEmail.text) {
      // New format: postal-mime parsed content (but may contain MIME artifacts)
      textBody = cleanMimeContent(cfEmail.text);
      htmlBody = cfEmail.html ? cleanMimeContent(cfEmail.html) : '';
      console.log('✅ Using parsed text/html fields');
    } else if (cfEmail.raw) {
      // Legacy format: raw email content
      console.log('📄 Using raw email field, parsing...');
      try {
        const rawEmail = cfEmail.raw;
        textBody = cleanMimeContent(rawEmail) || 'Email received (content not extracted)';
      } catch (parseError) {
        console.error('Error parsing raw email:', parseError);
        textBody = 'Failed to parse email content';
      }
    } else {
      // No content available
      console.warn('⚠️ No email content received');
      textBody = 'Email received (no content available)';
    }

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
      content: textBody || htmlBody || 'No content',
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
