/**
 * Cloudflare Email Routing Worker for Temp Mail Pro
 * Simple version - no external dependencies required
 * 
 * Deploy this directly in Cloudflare Dashboard:
 * 1. Workers & Pages → Create Worker
 * 2. Paste this code
 * 3. Deploy
 * 4. Add WEBHOOK_URL in Settings → Variables
 */

export default {
  async email(message, env, ctx) {
    try {
      const to = message.to;
      const from = message.from;
      const subject = message.headers.get('subject') || 'No Subject';

      console.log('📧 Email received');
      console.log('From:', from);
      console.log('To:', to);
      console.log('Subject:', subject);

      // Read raw email stream
      let rawContent = '';
      try {
        const reader = message.raw.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          rawContent += decoder.decode(value, { stream: true });
        }
        rawContent += decoder.decode();
      } catch (streamError) {
        console.error('Stream error:', streamError);
      }

      console.log('📊 Raw email size:', rawContent.length, 'bytes');

      // Extract body from raw email (after headers)
      // Headers end with double newline
      let emailBody = '';
      const headerBodySplit = rawContent.split(/\r?\n\r?\n/);
      if (headerBodySplit.length > 1) {
        // Everything after the first double-newline is the body
        emailBody = headerBodySplit.slice(1).join('\n\n');
        
        // Clean up common email formatting
        emailBody = emailBody
          .replace(/=\r?\n/g, '') // Remove soft line breaks (quoted-printable)
          .replace(/=([0-9A-F]{2})/gi, (match, hex) => String.fromCharCode(parseInt(hex, 16))) // Decode quoted-printable
          .trim();
      }

      console.log('📝 Extracted body length:', emailBody.length);

      // Get webhook URL
      const webhookUrl = env.WEBHOOK_URL;
      if (!webhookUrl) {
        console.error('❌ WEBHOOK_URL not set');
        message.setReject('Webhook not configured');
        return;
      }

      // Send to webhook
      const payload = {
        to,
        from,
        subject,
        text: emailBody,
        html: '',
        timestamp: new Date().toISOString(),
      };

      console.log('🚀 Sending to webhook...');

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Cloudflare-Email-Worker/2.0',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Success! Response:', JSON.stringify(result));
      } else {
        const errorText = await response.text();
        console.error('❌ Webhook error:', response.status, errorText);
        message.setReject('Webhook processing failed');
      }
    } catch (error) {
      console.error('❌ Worker error:', error.message || String(error));
      message.setReject('Failed to process email');
    }
  },
};
