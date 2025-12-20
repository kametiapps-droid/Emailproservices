'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

interface Email {
  id: string;
  email: string;
  createdAt: string;
  expiresAt: string;
}

interface Attachment {
  filename: string;
  contentType: string;
  size: number;
  url?: string;
}

interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  htmlContent?: string;
  attachments?: Attachment[];
  receivedAt: string;
  isRead: boolean;
}

export default function Home() {
  const [email, setEmail] = useState<Email | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generateEmail = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/email', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        setEmail(data.data);
        localStorage.setItem('tempEmail', JSON.stringify(data.data));
        setMessages([]);
        setSelectedMessage(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchInbox = useCallback(async () => {
    if (!email?.id) return;
    try {
      const response = await fetch(`/api/inbox?emailId=${email.id}`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      // Silently handle fetch errors
    }
  }, [email?.id]);

  const checkExistingEmail = async (storedEmail: Email) => {
    try {
      const response = await fetch(`/api/email?id=${storedEmail.id}`);
      const data = await response.json();
      if (data.success) {
        setEmail(data.data);
        return true;
      }
    } catch (error) {
      // Silently handle fetch errors
    }
    return false;
  };

  useEffect(() => {
    const init = async () => {
      const stored = localStorage.getItem('tempEmail');
      if (stored) {
        try {
          const storedEmail = JSON.parse(stored);
          setEmail(storedEmail);
          setLoading(false);
          // Check if valid in background
          checkExistingEmail(storedEmail).then(async (isValid) => {
            if (!isValid) {
              localStorage.removeItem('tempEmail');
              generateEmail();
            } else {
              // Valid, fetch inbox
              const response = await fetch(`/api/inbox?emailId=${storedEmail.id}`);
              const data = await response.json();
              if (data.success) {
                setMessages(data.data);
              }
            }
          });
        } catch {
          localStorage.removeItem('tempEmail');
          setLoading(false);
          generateEmail();
        }
      } else {
        // Generate email in background
        generateEmail();
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (email?.id) {
      // Fetch immediately on mount
      fetchInbox();
      // Then set up interval - use 15 seconds instead of 10 for better performance
      const interval = setInterval(fetchInbox, 15000);
      return () => clearInterval(interval);
    }
  }, [email?.id, fetchInbox]);

  useEffect(() => {
    if (!email?.expiresAt) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const expiry = new Date(email.expiresAt).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m remaining`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [email?.expiresAt]);

  useEffect(() => {
    if (selectedMessage && iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        // Use HTML content ONLY if it contains actual HTML tags, otherwise show plain text
        const hasHtmlTags = selectedMessage.htmlContent && selectedMessage.htmlContent.trim() !== '' && /<[^>]+>/.test(selectedMessage.htmlContent);
        
        const htmlContent = hasHtmlTags
          ? `
            <html>
              <head>
                <style>
                  body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 20px; line-height: 1.6; color: #333; background: #fff; margin: 0; }
                  img { max-width: 100%; height: auto; }
                  a { color: #0066cc; text-decoration: none; }
                  a:hover { text-decoration: underline; }
                  table { max-width: 100%; border-collapse: collapse; }
                  pre { white-space: pre-wrap; word-wrap: break-word; background: #f5f5f5; padding: 10px; border-radius: 5px; }
                </style>
              </head>
              <body>${selectedMessage.htmlContent?.replace(/<a\s+(?![^>]*target=)([^>]*?)>/g, '<a target="_blank" rel="noopener noreferrer" $1>')}</body>
            </html>
          `
          : `
            <html>
              <head>
                <style>
                  body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 20px; line-height: 1.6; color: #333; background: #fff; margin: 0; }
                  a { color: #0066cc; text-decoration: none; }
                  a:hover { text-decoration: underline; }
                  pre { white-space: pre-wrap; word-wrap: break-word; }
                </style>
              </head>
              <body>${selectedMessage.content.replace(/\n/g, '<br>')}</body>
            </html>
          `;
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [selectedMessage]);

  const copyEmail = () => {
    if (email?.email) {
      navigator.clipboard.writeText(email.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const showQRCode = async () => {
    if (!email?.id) return;
    try {
      const response = await fetch(`/api/qrcode?id=${email.id}`);
      const data = await response.json();
      if (data.success) {
        setQrCode(data.qrCode);
        setShowQR(true);
      }
    } catch (error) {
      // Silently handle QR generation errors
    }
  };

  const deleteEmail = async () => {
    if (!email?.id || !confirm('Are you sure you want to delete this email?')) return;
    try {
      await fetch(`/api/email?id=${email.id}`, { method: 'DELETE' });
      localStorage.removeItem('tempEmail');
      await generateEmail();
    } catch (error) {
      // Silently handle deletion errors
    }
  };

  const openMessage = async (message: Message) => {
    if (selectedMessage?.id === message.id) {
      setSelectedMessage(null);
      return;
    }
    setSelectedMessage(message);
    if (!message.isRead && email?.id) {
      await fetch('/api/inbox', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailId: email.id, messageId: message.id }),
      });
      setMessages(prev =>
        prev.map(m => (m.id === message.id ? { ...m, isRead: true } : m))
      );
    }
  };

  const deleteMessage = async (messageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!email?.id || !confirm('Delete this message?')) return;
    try {
      await fetch(`/api/inbox?emailId=${email.id}&messageId=${messageId}`, { method: 'DELETE' });
      setMessages(prev => prev.filter(m => m.id !== messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const displayEmail = email || { 
    id: '', 
    email: 'Loading...', 
    createdAt: new Date().toISOString(), 
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() 
  };

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Secure Temporary Email</h1>
          <p>Protect your privacy with instant disposable email addresses. No registration required. Emails expire in 24 hours.</p>
        </div>
      </section>

      <div className="container">
        <div className="email-box">
          {loading && !email && (
            <div className="email-loading-indicator">
              <div className="spinner"></div>
              <p>Generating...</p>
            </div>
          )}
          <div className="email-header-label">Your Temporary Email</div>
          <div className="email-display">
            <span className="email-address">{displayEmail.email}</span>
            <button className="copy-btn-icon" onClick={copyEmail} disabled={!email} title={copied ? 'Copied!' : 'Copy to clipboard'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>

          <div className="timer">
            <span className="timer-icon">⏱️</span>
            <span className="timer-text">{timeLeft || '24h 0m remaining'}</span>
          </div>

          <div className="action-buttons">
            <button className="action-btn" onClick={fetchInbox}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
              </svg>
              Refresh
            </button>
            <button className="action-btn" onClick={showQRCode}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
              QR Code
            </button>
            <button className="action-btn" onClick={generateEmail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              New Email
            </button>
            <button className="action-btn danger" onClick={deleteEmail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      <section className="inbox-section">
        <div className="inbox-header">
          <div className="inbox-header-left">
            <h2 className="inbox-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
              </svg>
              Inbox
            </h2>
            <div className="refresh-indicator">
              <span className="refresh-dot"></span>
              <span>Auto-refresh active</span>
            </div>
          </div>
          <span className="message-count">{messages.length} messages</span>
        </div>

        <div className="inbox-container">
          <div className={`inbox-list ${selectedMessage ? 'inbox-list-narrow' : ''}`}>
            {messages.length === 0 ? (
              <div className="inbox-empty">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                </svg>
                <h3>Your inbox is empty</h3>
                <p>Emails sent to your temporary address will appear here.</p>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`message-item ${!message.isRead ? 'message-unread' : ''} ${selectedMessage?.id === message.id ? 'message-expanded' : ''}`}
                >
                  <div className="message-item-content" onClick={() => openMessage(message)}>
                    <div className="message-avatar">
                      {message.sender.charAt(0).toUpperCase()}
                    </div>
                    <div className="message-info">
                      <div className="message-header">
                        <span className="message-sender">{message.sender}</span>
                        <span className="message-time">{formatTime(message.receivedAt)}</span>
                      </div>
                      <div className="message-subject">{message.subject}</div>
                      {selectedMessage?.id !== message.id && (
                        <div className="message-preview">
                          {message.content.replace(/<[^>]*>/g, '').substring(0, 60)}...
                        </div>
                      )}
                    </div>
                    <div className="message-actions">
                      <button 
                        className="message-delete-btn"
                        onClick={(e) => deleteMessage(message.id, e)}
                        title="Delete message"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                      <svg 
                        className={`expand-icon ${selectedMessage?.id === message.id ? 'expanded' : ''}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  
                  {selectedMessage?.id === message.id && (
                    <div className="message-expanded-content">
                      <div className="expanded-meta">
                        <span className="expanded-date">{new Date(message.receivedAt).toLocaleString()}</span>
                        <span className="expanded-to">to: {email?.email}</span>
                      </div>
                      
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="expanded-attachments">
                          <div className="attachments-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                            </svg>
                            {message.attachments.length} attachment{message.attachments.length > 1 ? 's' : ''}
                          </div>
                          <div className="attachments-inline">
                            {message.attachments.map((att, idx) => (
                              <span key={idx} className="attachment-chip">
                                {att.filename} ({formatFileSize(att.size)})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="expanded-body">
                        <iframe
                          ref={selectedMessage?.id === message.id ? iframeRef : null}
                          title="Email Content"
                          sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                          className="inline-email-iframe"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      <section style={{ 
        padding: '100px 0', 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(59, 130, 246, 0.03) 100%)',
        borderTop: '1px solid rgba(59, 130, 246, 0.1)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '80px', textAlign: 'center' }}>
              <h2 style={{ 
                color: 'var(--text)', 
                marginBottom: '16px',
                fontSize: '42px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Understanding Temporary Email</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '12px' }}>
                Learn how our service protects your privacy and why it matters in today's digital world
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                borderRadius: '16px',
                padding: '40px 32px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 6l10 7 10-7"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '22px', fontWeight: '700' }}>What is Temp Mail?</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '15px' }}>
                  Temporary email, or disposable email, is a short-lived email address that exists for a limited time. Instead of using your real email for every signup, you can use a temporary address that automatically expires after 24 hours. This keeps your primary inbox clean and protects your personal email from being sold or shared with third parties.
                </p>
              </div>

              <div style={{
                background: 'rgba(168, 85, 247, 0.05)',
                border: '1px solid rgba(168, 85, 247, 0.15)',
                borderRadius: '16px',
                padding: '40px 32px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #A855F7 0%, #D946EF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '22px', fontWeight: '700' }}>Why Privacy Matters</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '15px' }}>
                  Your email address is a gateway to your identity. Companies collect emails to build marketing profiles and sell your data. Every signup exposes you to spam and data breaches. By using temporary emails, you create a barrier between your real identity and corporate data collection. Protecting your email is one of the most effective ways to maintain digital privacy.
                </p>
              </div>

              <div style={{
                background: 'rgba(34, 197, 94, 0.05)',
                border: '1px solid rgba(34, 197, 94, 0.15)',
                borderRadius: '16px',
                padding: '40px 32px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '22px', fontWeight: '700' }}>Legal & Ethical</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '15px' }}>
                  Temporary emails are completely legal and widely accepted. Perfect for testing, protecting privacy, and avoiding spam. However, using fake emails to commit fraud or violate terms of service is illegal. Temp Mail Pro is designed for legitimate privacy protection—use it responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 style={{ color: 'var(--text)' }}>Why Choose Temp Mail Pro?</h2>
          <div className="features-grid">
            <div className="feature-card card-lightning">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Instant Generation</h3>
              <p>Get a new temporary email address instantly with just one click. No registration needed.</p>
            </div>
            <div className="feature-card card-privacy">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3>Privacy Protected</h3>
              <p>Your real email stays private. Use disposable addresses for signups and verifications.</p>
            </div>
            <div className="feature-card card-clock">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>24-Hour Validity</h3>
              <p>Emails are automatically deleted after 24 hours for enhanced security.</p>
            </div>
            <div className="feature-card card-refresh">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6"/>
                  <path d="M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
                </svg>
              </div>
              <h3>Auto Refresh</h3>
              <p>Inbox automatically refreshes every 10 seconds so you never miss an email.</p>
            </div>
            <div className="feature-card card-qr">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <h3>QR Code Sharing</h3>
              <p>Share your temporary email via QR code for easy access on other devices.</p>
            </div>
            <div className="feature-card card-shield">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Spam Protection</h3>
              <p>Keep your main inbox clean from spam and promotional emails.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--surface)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', color: 'var(--text)', marginBottom: '60px', fontSize: '38px', fontWeight: '700' }}>Common Questions</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {[
              { question: 'Do I need to register to use Temp Mail Pro?', answer: 'No! Temp Mail Pro is completely free and requires no registration.' },
              { question: 'How quickly can I get an email address?', answer: 'Instantly! With just one click, you get a new temporary email address ready to use.' },
              { question: 'How long will my temporary email address work?', answer: '24 hours! Your temporary email is automatically deleted after 24 hours.' },
              { question: 'Is this completely free?', answer: 'Yes! Temp Mail Pro is completely free. No hidden costs, no subscriptions.' },
              { question: 'Can I use Temp Mail Pro on mobile?', answer: 'Absolutely! Temp Mail Pro works seamlessly on both iOS and Android.' },
              { question: 'Is this illegal?', answer: 'No! Temp Mail Pro is completely legal for privacy protection and legitimate uses.' }
            ].map((faq, idx) => (
              <div key={idx} style={{
                background: 'rgba(59, 130, 246, 0.03)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)';
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.03)';
              }}>
                <h3 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '16px', fontWeight: '600', lineHeight: '1.4' }}>
                  {faq.question}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/faq" style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            }}>
              View All Questions →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ 
        padding: '80px 0',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ color: 'var(--text)', marginBottom: '24px', fontSize: '44px', fontWeight: '700' }}>Get Your Free Temporary Email</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Start protecting your privacy instantly. Generate a disposable email address in seconds with zero registration required.
          </p>
          <Link href="/" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} style={{
            display: 'inline-block',
            padding: '18px 48px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
          }}>
            Get Started Free Now ✨
          </Link>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', color: 'var(--text)', marginBottom: '50px' }}>Latest from Our Blog</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                id: 1,
                title: "The Ultimate Guide to Protecting Your Privacy Online",
                excerpt: "Learn how temporary email addresses can be your first line of defense against spam and data breaches.",
                date: "December 15, 2024",
                readTime: 8
              },
              {
                id: 2,
                title: "How Scammers Use Email: A Complete Protection Guide",
                excerpt: "Understand the tactics used by scammers and how temporary email can protect you from becoming their next victim.",
                date: "December 12, 2024",
                readTime: 10
              },
              {
                id: 3,
                title: "Temporary Email for Software Testing and Development",
                excerpt: "Discover how developers can use temporary email to streamline testing workflows and improve productivity.",
                date: "December 8, 2024",
                readTime: 7
              },
              {
                id: 4,
                title: "Privacy Rights and Digital Freedom: What You Should Know",
                excerpt: "Explore your rights to privacy in the digital age and what you can do to protect them.",
                date: "December 1, 2024",
                readTime: 9
              }
            ].map(post => (
              <Link
                key={post.id}
                href={`/blog?id=${post.id}`}
                style={{
                  display: 'block',
                  background: 'var(--surface)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  color: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: 'var(--text)', lineHeight: '1.4' }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                  {post.excerpt}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid rgba(59, 130, 246, 0.1)',
                  paddingTop: '16px'
                }}>
                  <span>{post.date}</span>
                  <span>{post.readTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {showQR && (
        <div className="modal-overlay" onClick={() => setShowQR(false)}>
          <div className="modal qr-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>QR Code</h3>
              <button className="modal-close" onClick={() => setShowQR(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="qr-code">
                {qrCode && <img src={qrCode} alt="QR Code" />}
              </div>
              <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                Scan this QR code to copy the email address
              </p>
            </div>
          </div>
        </div>
      )}

      <section style={{ 
        padding: '80px 0',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '40px', fontWeight: '700' }}>Help Others Discover Temp Mail Pro</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
            Love using Temp Mail Pro? Share it with your friends, colleagues, and community. Follow us on social media for updates and tips.
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <a href="https://twitter.com/tempmail" target="_blank" rel="noopener noreferrer" className="social-link" title="Follow on Twitter/X">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-5.5 9-5.5s4 5 0 10c-4 5-9 7-15 7-6 0-11-5-11-5"/>
              </svg>
              <span>Twitter</span>
            </a>
            
            <a href="https://github.com/tempmail-pro" target="_blank" rel="noopener noreferrer" className="social-link" title="Follow on GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            
            <a href="https://linkedin.com/company/tempmail-pro" target="_blank" rel="noopener noreferrer" className="social-link" title="Follow on LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.659 1.189-1.599 2.898-1.599 2.117 0 3.704 1.379 3.704 4.342v5.539zM5.337 9.433c-1.144 0-1.915-.759-1.915-1.71 0-.951.77-1.71 1.954-1.71 1.184 0 1.915.759 1.915 1.71 0 .951-.73 1.71-1.954 1.71zm1.6 11.019H3.738V9.806h3.199v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            
            <a href="https://facebook.com/tempmail" target="_blank" rel="noopener noreferrer" className="social-link" title="Follow on Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
            
            <a href="https://reddit.com/r/tempmail" target="_blank" rel="noopener noreferrer" className="social-link" title="Join on Reddit">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.385 4.859-7.181 4.859-3.796 0-7.182-2.165-7.182-4.859a3.5 3.5 0 0 1 .476-1.465 1.761 1.761 0 0 1-.105-.3c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.53l.847-4.5c.034-.179-.021-.353-.141-.465-.12-.112-.282-.151-.465-.122l-2.654.567a1.746 1.746 0 0 0-1.235-2.235c-.464-.115-.9.182-.996.646-.096.464.182.901.646.996.327.082.64-.122.825-.451.57-.315 1.298-.315 1.868 0 .249.14.495.208.743.208.468 0 .9-.272 1.055-.707l2.368-.504.56 2.958c1.68.163 3.19.735 4.29 1.58a1.754 1.754 0 0 1 1.226-.505zm4.78 4.731a1.754 1.754 0 0 1-1.754 1.754 1.754 1.754 0 1 1 0-3.508 1.754 1.754 0 0 1 1.754 1.754zm-10.5 4.772c.676 0 1.193.517 1.193 1.193 0 .676-.517 1.193-1.193 1.193-.676 0-1.193-.517-1.193-1.193 0-.676.517-1.193 1.193-1.193zm5.524 0c.676 0 1.193.517 1.193 1.193 0 .676-.517 1.193-1.193 1.193-.676 0-1.193-.517-1.193-1.193 0-.676.517-1.193 1.193-1.193z"/>
              </svg>
              <span>Reddit</span>
            </a>
          </div>
        </div>
      </section>

      <section style={{ 
        padding: '80px 0',
        background: 'var(--surface)',
        borderTop: '1px solid rgba(59, 130, 246, 0.1)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(239, 68, 68, 0.05) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '16px',
              padding: '48px 40px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              
              <h3 style={{ color: 'var(--text)', fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>Legal Notice & Terms of Use</h3>
              
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '15px',
                lineHeight: '1.8',
                margin: 0,
                textAlign: 'left'
              }}>
                Temp Mail Pro is intended for privacy protection, testing, and inbox management only. Misuse for illegal or abusive activities is strictly prohibited. Users are responsible for complying with applicable laws and third-party terms.
              </p>

              <div style={{ marginTop: '28px', paddingTop: '28px', borderTop: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
                  For complete terms and policies, please visit our{' '}
                  <Link href="/terms" style={{ color: 'rgb(59, 130, 246)', textDecoration: 'none', fontWeight: '600' }}>
                    Terms and Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" style={{ color: 'rgb(59, 130, 246)', textDecoration: 'none', fontWeight: '600' }}>
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
