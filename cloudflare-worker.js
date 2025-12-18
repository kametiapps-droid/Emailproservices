/**
 * Cloudflare Email Routing Worker
 * Handles incoming emails and forwards them to your Temp Mail Pro webhook
 */

export default {
  async email(message) {
    const webhookUrl = env.WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('WEBHOOK_URL environment variable not set');
      message.setReject('Webhook URL not configured');
      return;
    }

    try {
      const to = message.to;
      const from = message.from;
      const subject = message.headers.get('subject') || '(No Subject)';
      
      // Read raw email content
      let raw = '';
      
      // For Cloudflare Workers, message.raw is an AsyncIterable
      if (message.raw && typeof message.raw[Symbol.asyncIterator] === 'function') {
        const decoder = new TextDecoder();
        for await (const chunk of message.raw) {
          raw += decoder.decode(chunk, { stream: true });
        }
        raw += decoder.decode(); // Final flush
      } else if (message.raw) {
        // Fallback if raw is a string
        raw = String(message.raw);
      }

      console.log('📩 EMAIL RECEIVED');
      console.log('To:', to);
      console.log('From:', from);
      console.log('Subject:', subject);
      console.log('Raw size:', raw.length, 'bytes');

      // Send to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Cloudflare-Email-Worker/1.0',
        },
        body: JSON.stringify({
          to,
          from,
          subject,
          raw,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error:', response.status, errorText);
        message.setReject(`Webhook failed: ${response.status}`);
        return;
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Email forwarded successfully');
      } else {
        console.warn('⚠️ Webhook error:', result.error);
        message.setReject(result.error || 'Processing failed');
      }
    } catch (error) {
      console.error('❌ Worker error:', error.message);
      message.setReject('Failed to process email');
    }
  },
};
