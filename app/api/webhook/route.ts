import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { validateWebhookSecret, SECURITY_HEADERS, checkRateLimit, getClientIP } from '@/lib/security';

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
    // Rate limiting (100 per hour - webhook endpoint)
    const clientIP = getClientIP(request.headers);
    const rateCheck = checkRateLimit(clientIP, 'QR_CODE');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || 'Too many requests' },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    console.log('📧 Webhook request received');
    console.log('Headers:', Object.fromEntries(request.headers.entries()));
    
    // Validate webhook secret
    const secret = request.headers.get('x-webhook-secret');
    if (!validateWebhookSecret(secret)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing webhook secret' },
        { status: 401, headers: SECURITY_HEADERS }
      );
    }

    // Limit request body size (10MB)
    const contentLength = parseInt(request.headers.get('content-length') || '0');
    if (contentLength > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Request too large' },
        { status: 413, headers: SECURITY_HEADERS }
      );
    }

    const db = getDb();
    const body = await request.json();

    const cfEmail: CloudflareEmail = body;
    const to = cfEmail.to;
    const from = cfEmail.from;
    const subject = cfEmail.subject || '(No Subject)';
    
    // Parse multipart email content
    let textBody = '';
    let htmlBody = '';
    
    const parseMultipartSection = (content: string, contentType: string): string => {
      const lines = content.split('\n');
      let foundSection = false;
      let inHeaders = false;
      let result: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if we found the section (case-insensitive)
        if (!foundSection && new RegExp(`Content-Type:\\s*${contentType}`, 'i').test(line)) {
          foundSection = true;
          inHeaders = true;
          continue;
        }
        
        if (foundSection) {
          // Skip headers until blank line
          if (inHeaders) {
            if (line.trim() === '') {
              inHeaders = false;
              continue;
            }
            continue;
          }
          
          // Stop at boundary (line starts with --)
          if (line.trim().startsWith('--')) {
            break;
          }
          
          // Add content
          result.push(line);
        }
      }
      
      let text = result.join('\n').trim();
      // Clean up quoted-printable encoding (=\n means soft line break)
      text = text.replace(/=\r?\n/g, '');
      return text;
    };
    
    // Try to extract HTML first
    if (cfEmail.text) {
      htmlBody = parseMultipartSection(cfEmail.text, 'text/html');
    }
    
    // Fallback to cfEmail.html if multipart extraction didn't work
    if (!htmlBody && cfEmail.html && cfEmail.html.trim().length > 0 && /<[^>]+>/.test(cfEmail.html)) {
      htmlBody = cfEmail.html;
    }
    
    // If no HTML, try plain text
    if (!htmlBody && cfEmail.text) {
      textBody = parseMultipartSection(cfEmail.text, 'text/plain');
    }
    
    // If still nothing, use raw cfEmail.text
    if (!htmlBody && !textBody && cfEmail.text) {
      textBody = cfEmail.text;
    }
    
    // Final fallback
    if (!htmlBody && !textBody) {
      textBody = 'Email received (no content available)';
    }

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
      return NextResponse.json(
        { success: false, error: 'Email address not found' },
        { status: 404 }
      );
    }

    const emailDoc = emailsSnapshot.docs[0];
    const emailData = emailDoc.data();

    // Check if expired
    if (new Date(emailData.expiresAt) < new Date()) {
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

    return NextResponse.json({ success: true, messageId: messageRef.id }, { headers: SECURITY_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to receive email' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
