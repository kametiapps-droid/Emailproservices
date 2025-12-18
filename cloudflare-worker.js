export default {
  async email(message, env, ctx) {
    try {
      const to = message.to;
      const from = message.from;
      const subject = message.headers.get('subject') || 'No Subject';

      console.log('📧 Received email from:', from);
      console.log('📬 To:', to);
      console.log('📋 Subject:', subject);

      // Get the full email content
      // Cloudflare provides message.raw as a ReadableStream
      let emailContent = '';
      
      // Try to read the stream if it exists
      if (message.raw) {
        try {
          const reader = message.raw.getReader();
          const decoder = new TextDecoder();
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            emailContent += decoder.decode(value, { stream: true });
          }
          // Final flush
          emailContent += decoder.decode();
        } catch (streamError) {
          console.error('❌ Stream error:', streamError.message);
        }
      }

      console.log('📊 Email size:', emailContent.length, 'bytes');

      // Ensure we have webhook URL
      const webhookUrl = env.WEBHOOK_URL;
      if (!webhookUrl) {
        console.error('❌ WEBHOOK_URL not set in environment');
        message.setReject('Webhook not configured');
        return;
      }

      // Send the email to our webhook
      const payload = {
        to,
        from,
        subject,
        raw: emailContent,
        timestamp: new Date().toISOString(),
      };

      console.log('🚀 Sending to webhook...');

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Cloudflare-Email-Worker/1.0',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('✅ Successfully forwarded to webhook');
        const result = await response.json();
        console.log('📝 Webhook response:', result);
      } else {
        const errorBody = await response.text();
        console.error('❌ Webhook returned error:', response.status);
        console.error('📄 Error body:', errorBody);
        message.setReject('Webhook processing failed');
      }
    } catch (error) {
      console.error('❌ Worker error:', error.message || String(error));
      message.setReject('Failed to process email');
    }
  },
};
