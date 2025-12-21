// Security and Spam Filter Module for Temp Mail Pro

// Blocked sender domains (known spam/malicious sources)
export const BLOCKED_DOMAINS = [
  'spam.com',
  'spammer.net',
  'malware.org',
  'phishing.com',
  'scam.net',
];

// Suspicious keywords that indicate spam/phishing
export const SPAM_KEYWORDS = [
  'you have won',
  'lottery winner',
  'claim your prize',
  'nigerian prince',
  'bank transfer',
  'wire transfer urgent',
  'password expired',
  'verify your account immediately',
  'suspended account',
  'click here now',
  'act now limited time',
  'free money',
  'make money fast',
  'cryptocurrency giveaway',
  'double your bitcoin',
  'investment opportunity urgent',
];

// Illegal content keywords
export const ILLEGAL_KEYWORDS = [
  'child abuse',
  'terrorism',
  'bomb making',
  'drug trafficking',
  'human trafficking',
  'money laundering',
  'identity theft',
  'credit card fraud',
];

// Rate limiting storage (in-memory for development)
const rateLimitStore: Map<string, { count: number; timestamp: number }> = new Map();

// Rate limit settings (per endpoint)
const RATE_LIMITS = {
  EMAILS: { max: 100, window: 60 * 60 * 1000 }, // 100 per hour
  CONTACTS: { max: 5, window: 60 * 60 * 1000 }, // 5 per hour
  INBOX: { max: 100, window: 60 * 60 * 1000 }, // 100 per hour
  QR_CODE: { max: 50, window: 60 * 60 * 1000 }, // 50 per hour
};

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
  score: number;
}

export interface SecurityCheckResult {
  allowed: boolean;
  reason?: string;
  blocked: boolean;
}

// Calculate spam score for a message
export function calculateSpamScore(subject: string, content: string): SpamCheckResult {
  let score = 0;
  const reasons: string[] = [];
  
  const textToCheck = `${subject} ${content}`.toLowerCase();
  
  // Check for spam keywords
  for (const keyword of SPAM_KEYWORDS) {
    if (textToCheck.includes(keyword.toLowerCase())) {
      score += 20;
      reasons.push(`Contains spam keyword: "${keyword}"`);
    }
  }
  
  // Check for excessive caps (shouting)
  const capsRatio = (textToCheck.match(/[A-Z]/g) || []).length / textToCheck.length;
  if (capsRatio > 0.5 && textToCheck.length > 20) {
    score += 15;
    reasons.push('Excessive capital letters');
  }
  
  // Check for suspicious URLs
  const urlCount = (textToCheck.match(/https?:\/\//g) || []).length;
  if (urlCount > 5) {
    score += 10;
    reasons.push('Too many URLs');
  }
  
  // Check for urgent language
  const urgentWords = ['urgent', 'immediately', 'act now', 'limited time', 'expires'];
  const urgentCount = urgentWords.filter(word => textToCheck.includes(word)).length;
  if (urgentCount >= 2) {
    score += 15;
    reasons.push('Urgent/pressure language detected');
  }
  
  return {
    isSpam: score >= 40,
    reason: reasons.join('; '),
    score,
  };
}

// Check for illegal content
export function containsIllegalContent(content: string): boolean {
  const lowerContent = content.toLowerCase();
  return ILLEGAL_KEYWORDS.some(keyword => lowerContent.includes(keyword));
}

// Check if email is from a blocked domain
export function isBlockedDomain(email: string): boolean {
  if (!email) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return BLOCKED_DOMAINS.some(blocked => domain.includes(blocked));
}

// Rate limiting check with per-endpoint limits
export function checkRateLimit(identifier: string, endpoint: keyof typeof RATE_LIMITS = 'EMAILS'): SecurityCheckResult {
  const now = Date.now();
  const key = `${identifier}:${endpoint}`;
  const record = rateLimitStore.get(key);
  const limit = RATE_LIMITS[endpoint];
  
  if (!record) {
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return { allowed: true, blocked: false };
  }
  
  // Reset if window expired
  if (now - record.timestamp > limit.window) {
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return { allowed: true, blocked: false };
  }
  
  // Check if exceeded limit
  if (record.count >= limit.max) {
    return {
      allowed: false,
      blocked: true,
      reason: 'Rate limit exceeded. Please try again later.',
    };
  }
  
  // Increment count
  record.count++;
  rateLimitStore.set(key, record);
  return { allowed: true, blocked: false };
}

// Input validation and sanitization
export function validateEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validateInput(input: string, maxLength: number = 1000, minLength: number = 1): boolean {
  if (!input || typeof input !== 'string') return false;
  const trimmed = input.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

export function sanitizeInput(input: string, maxLength: number = 1000): string {
  return input.trim().slice(0, maxLength);
}

// Filter message for display (sanitize dangerous content)
export function sanitizeMessage(content: string): string {
  // Remove script tags
  let sanitized = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '[Script Removed]');
  
  // Remove iframe tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '[Iframe Removed]');
  
  // Remove onclick and other event handlers
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '');
  
  // Remove javascript: URLs
  sanitized = sanitized.replace(/javascript:/gi, 'blocked:');
  
  return sanitized;
}

// Get client IP from request headers
export function getClientIP(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         headers.get('x-real-ip') || 
         'unknown';
}

// Webhook secret validation
export function validateWebhookSecret(providedSecret: string | null): boolean {
  const secret = process.env.WEBHOOK_SECRET || process.env.CLOUDFLARE_WEBHOOK_SECRET;
  // If no secret is configured, allow all requests (for Cloudflare Email Workers)
  if (!secret) return true;
  // If secret is configured, validate it
  return providedSecret === secret;
}

// Security headers for API responses
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'",
};
