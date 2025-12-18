export default {
  async email(message, env, ctx) {
    try {
      const to = message.to;
      const from = message.from;
      const subject = message.headers.get('subject') || 'No Subject';

      console.log('📧 Email from:', from);
      console.log('📬 To:', to);
      console.log('📋 Subject:', subject);

      // Read full raw email content
      let rawContent = '';
      try {
        const reader = message.raw.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          rawContent += decoder.decode(value, { stream: true });
        }
        rawContent += decoder.decode(); // Flush remaining
      } catch (readError) {
        console.error('❌ Error reading stream:', readError);
        rawContent = '';
      }

      console.log('📊 Raw content size:', rawContent.length);

      // Get webhook URL
      const webhookUrl = env.WEBHOOK_URL || '';
      
      if (!webhookUrl) {
        console.error('❌ WEBHOOK_URL not configured');
        message.setReject('Webhook URL not configured');
        return;
      }

      // Send to webhook
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to,
            from,
            subject,
            raw: rawContent,
          }),
        });

        if (response.ok) {
          console.log('✅ Email forwarded to webhook successfully');
        } else {
          const errorText = await response.text();
          console.error('❌ Webhook error:', response.status, errorText);
          message.setReject('Webhook processing failed');
        }
      } catch (fetchError) {
        console.error('❌ Fetch error:', fetchError);
        message.setReject('Could not reach webhook');
      }
    } catch (err) {
      console.error('❌ Worker error:', err.message || err);
      message.setReject('Email processing failed');
    }
  },
};
