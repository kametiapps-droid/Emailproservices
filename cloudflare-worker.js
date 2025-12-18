export default {
  async email(message) {
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

      console.log('Email from:', from);
      console.log('To:', to);

      // Send to webhook
      const webhook = 'YOUR_WEBHOOK_URL';
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          from,
          subject,
          content,
        }),
      });

      console.log('Email processed');
    } catch (err) {
      console.error('Error:', err);
    }
  },
};
