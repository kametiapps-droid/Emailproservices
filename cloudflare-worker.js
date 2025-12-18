/**
 * Cloudflare Email Routing Worker
 * Handles incoming emails and forwards them to your Temp Mail Pro webhook
 */

export default {
  async email(message) {
    const webhookUrl = env.WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('WEBHOOK_URL not configured');
      message.setReject('Webhook URL not configured');
      return;
    }

    try {
      const to = message.to;
      const from = message.from;
      const subject = message.headers.get('subject') || '(No Subject)';
      
      // Read raw email content properly
      let raw = '';
      const reader = message.raw.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
      }

      console.log('📩 EMAIL RECEIVED');
      console.log('To:', to);
      console.log('From:', from);
      console.log('Subject:', subject);
      console.log('Size:', raw.length);

      // Forward to webhook
      let webhookResponse;
      try {
        webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to,
            from,
            subject,
            raw,
          }),
        });
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        message.setReject('Could not reach webhook');
        return;
      }

      if (!webhookResponse.ok) {
        console.error('Webhook error:', webhookResponse.status);
        message.setReject('Webhook returned error');
        return;
      }

      const result = await webhookResponse.json();
      
      if (result.success) {
        console.log('✅ Email processed successfully');
      } else {
        console.warn('Webhook error:', result.error);
        message.setReject(result.error || 'Processing failed');
      }
    } catch (error) {
      console.error('Error:', error);
      message.setReject('Failed to process');
    }
  },
};
