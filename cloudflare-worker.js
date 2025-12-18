/**
 * Cloudflare Email Worker
 * 
 * This worker handles incoming emails from Cloudflare Email Routing
 * and forwards them to your Temp Mail Pro webhook.
 * 
 * Setup Instructions:
 * 1. Deploy this worker to Cloudflare Workers
 * 2. Set the WEBHOOK_URL environment variable to your webhook endpoint
 * 3. Configure Cloudflare Email Routing to point to this worker
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
      // Extract email headers
      const to = message.to;
      const from = message.from;
      const subject = message.headers.get('subject') || '(No Subject)';
      
      // Read the raw email content
      let raw = '';
      const reader = message.raw.getReader();
      const decoder = new TextDecoder();
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          raw += decoder.decode(value, { stream: true });
        }
        // Final flush
        raw += decoder.decode();
      } catch (error) {
        console.error('Error reading email stream:', error);
        message.setReject('Failed to read email content');
        return;
      }

      console.log('📩 EMAIL RECEIVED');
      console.log('Inbox:', to.split('@')[0]);
      console.log('From:', from);
      console.log('Subject:', subject);
      console.log('Size:', raw.length);

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
        message.setReject(`Webhook failed with status ${response.status}`);
        return;
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Email forwarded successfully to webhook');
      } else {
        console.warn('⚠️ Webhook returned error:', result.error);
        message.setReject(result.error || 'Webhook processing failed');
      }
    } catch (error) {
      console.error('❌ Error processing email:', error);
      message.setReject('Failed to process email');
    }
  },
};
