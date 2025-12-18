export default {
  async email(message, env, ctx) {
    try {
      const to = message.to;
      const from = message.from;
      const subject = message.headers.get('subject') || 'No Subject';

      // Read email content
      const chunks = [];
      const reader = message.raw.getReader();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const decoder = new TextDecoder();
      let content = '';
      for (const chunk of chunks) {
        content += decoder.decode(chunk, { stream: true });
      }

      console.log('📧 Email from:', from);
      console.log('📬 To:', to);
      console.log('📋 Subject:', subject);

      // Send to your webhook
      const webhookUrl = env.WEBHOOK_URL || '';
      
      if (!webhookUrl) {
        console.error('WEBHOOK_URL not set');
        message.setReject('Webhook not configured');
        return;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          from,
          subject,
          content,
        }),
      });

      if (response.ok) {
        console.log('✅ Email forwarded to webhook');
      } else {
        console.error('❌ Webhook error:', response.status);
        message.setReject('Webhook failed');
      }
    } catch (err) {
      console.error('❌ Error:', err.message);
      message.setReject('Processing failed');
    }
  },
};
