# Cloudflare Email Worker Setup Guide

## 🚀 Quick Setup (Browser - Simple Version)

If you want to deploy directly from Cloudflare Dashboard without using wrangler CLI, use this simple version:

### Step 1: Create Worker

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create application** → **Create Worker**
3. Give it a name like `temp-mail-worker`
4. Delete the default code and paste this:

```javascript
export default {
  async email(message, env, ctx) {
    try {
      const to = message.to;
      const from = message.from;
      const subject = message.headers.get('subject') || 'No Subject';

      console.log('📧 Email received from:', from);
      console.log('📬 To:', to);

      // Read raw email
      let rawContent = '';
      const reader = message.raw.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        rawContent += decoder.decode(value, { stream: true });
      }
      rawContent += decoder.decode();

      // Extract body from raw email
      let emailBody = '';
      const parts = rawContent.split(/\r?\n\r?\n/);
      if (parts.length > 1) {
        emailBody = parts.slice(1).join('\n\n').trim();
      }

      console.log('📊 Content length:', emailBody.length);

      const webhookUrl = env.WEBHOOK_URL;
      if (!webhookUrl) {
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
          text: emailBody,
          html: '',
        }),
      });

      if (response.ok) {
        console.log('✅ Email forwarded successfully');
      } else {
        console.error('❌ Webhook error:', response.status);
        message.setReject('Webhook failed');
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      message.setReject('Processing failed');
    }
  },
};
```

5. Click **Deploy**

### Step 2: Add Environment Variable

1. Go to **Settings** tab
2. Click **Variables and Secrets**
3. Add variable:
   - **Name:** `WEBHOOK_URL`
   - **Value:** `https://YOUR-REPLIT-URL/api/webhook`
4. Click **Encrypt** and **Deploy**

### Step 3: Configure Email Routing

1. Go to Cloudflare Dashboard → your domain
2. Click **Email** → **Email Routing**
3. Enable Email Routing if not already enabled
4. Go to **Email Workers** tab
5. Click **Create** or add a routing rule:
   - **Match:** Catch-all (`*@yourdomain.com`)
   - **Action:** Send to Worker → Select your worker
6. Save

---

## 🔧 Advanced Setup (Using Wrangler CLI with postal-mime)

For better email parsing with attachments support:

### Step 1: Install Wrangler

```bash
npm install -g wrangler
wrangler login
```

### Step 2: Create Project

```bash
mkdir email-worker
cd email-worker
npm init -y
npm install postal-mime
```

### Step 3: Create wrangler.toml

```toml
name = "temp-mail-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"

[vars]
WEBHOOK_URL = "https://YOUR-REPLIT-URL/api/webhook"
```

### Step 4: Create src/index.js

Use the code from `cloudflare-worker.js` in this project.

### Step 5: Deploy

```bash
wrangler deploy
```

---

## 📧 Testing

1. Send an email to any address at your domain (e.g., `test@yourdomain.com`)
2. Check Cloudflare Worker logs in Dashboard → Workers → your worker → Logs
3. Check your Temp Mail Pro inbox

## 🔍 Troubleshooting

- **No emails arriving?** Check Email Routing is enabled and the catch-all rule is set
- **Webhook errors?** Check the WEBHOOK_URL is correct and your Replit is running
- **Content missing?** Check Cloudflare Worker logs for errors
