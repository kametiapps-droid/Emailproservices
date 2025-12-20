// Security and Spam Filter Module for Temp Mail Pro

// Blocked sender domains (known spam/malicious sources)
export const BLOCKED_DOMAINS = [
  'spam.com',
  'spammer.net',
  'malware.org',
  'phishing.com',
  'scam.net',
  'fraud.org',
  'hack.com',
  'virus.net',
  'trojan.org',
  'ransomware.com',
  'botnet.net',
  'exploit.org',
  'darkweb.com',
  'illegal.net',
  'drugs.org',
  'weapons.com',
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

// Rate limit settings
const RATE_LIMIT = {
  MAX_EMAILS_PER_HOUR: 10,
  WINDOW_MS: 60 * 60 * 1000, // 1 hour
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

// Check if email is from a blocked domain
export function isBlockedDomain(email: string): boolean {
  if (!email) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return BLOCKED_DOMAINS.some(blocked => domain.includes(blocked));
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

// Rate limiting check
export function checkRateLimit(identifier: string): SecurityCheckResult {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record) {
    rateLimitStore.set(identifier, { count: 1, timestamp: now });
    return { allowed: true, blocked: false };
  }
  
  // Reset if window expired
  if (now - record.timestamp > RATE_LIMIT.WINDOW_MS) {
    rateLimitStore.set(identifier, { count: 1, timestamp: now });
    return { allowed: true, blocked: false };
  }
  
  // Check if exceeded limit
  if (record.count >= RATE_LIMIT.MAX_EMAILS_PER_HOUR) {
    return {
      allowed: false,
      blocked: true,
      reason: 'Rate limit exceeded. Please try again later.',
    };
  }
  
  // Increment count
  record.count++;
  rateLimitStore.set(identifier, record);
  return { allowed: true, blocked: false };
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

// Log security event
export function logSecurityEvent(type: string, details: object): void {
  // Security logging disabled in production
}

// Clean up old rate limit entries (call periodically)
export function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now - value.timestamp > RATE_LIMIT.WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
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
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'",
};
