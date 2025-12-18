/**
 * Cloudflare Email Routing Worker
 * Simple, working version for Temp Mail Pro
 */

export default {
  async email(message) {
    console.log('📧 Email received');
    
    const webhookUrl = 'WEBHOOK_URL_HERE';
    
    if (!webhookUrl || webhookUrl === 'WEBHOOK_URL_HERE') {
      console.error('❌ Please set WEBHOOK_URL in worker environment variables');
      message.setReject('Webhook not configured');
      return;
    }

    try {
      // Extract email details
      const to = message.to;
      const from = message.from;
      const subject = message.headers.get('subject') || '(No Subject)';
      
      console.log(`✉️ From: ${from}`);
      console.log(`📬 To: ${to}`);
      console.log(`📋 Subject: ${subject}`);

      // Read the email body
      const rawEmail = await streamToString(message.raw);

      // Send to your Next.js webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          from,
          subject,
          raw: rawEmail,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log('✅ Email sent to webhook successfully');
      } else {
        const error = await response.text();
        console.error('❌ Webhook error:', response.status, error);
        message.setReject('Webhook processing failed');
      }
    } catch (error) {
      console.error('❌ Worker error:', error.message || error);
      message.setReject('Email processing failed');
    }
  },
};

// Helper function to convert stream to string
async function streamToString(stream) {
  const reader = stream.getReader();
  let result = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += new TextDecoder().decode(value, { stream: true });
    }
    result += new TextDecoder().decode();
  } finally {
    reader.releaseLock();
  }
  
  return result;
}
