'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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
    } catch (error) {
      console.error('Error generating email:', error);
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
      console.error('Error fetching inbox:', error);
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
      console.error('Error checking email:', error);
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
          // Check if valid in background
          checkExistingEmail(storedEmail).then(isValid => {
            if (!isValid) {
              localStorage.removeItem('tempEmail');
              generateEmail();
            }
          });
        } catch {
          localStorage.removeItem('tempEmail');
          generateEmail();
        }
      } else {
        // Generate email in background
        generateEmail();
      }
      setLoading(false);
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
                  table { max-width: 100%; border-collapse: collapse; }
                  pre { white-space: pre-wrap; word-wrap: break-word; background: #f5f5f5; padding: 10px; border-radius: 5px; }
                </style>
              </head>
              <body>${selectedMessage.htmlContent}</body>
            </html>
          `
          : `
            <html>
              <head>
                <style>
                  body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 20px; line-height: 1.6; color: #333; background: #fff; margin: 0; }
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
      console.error('Error generating QR:', error);
    }
  };

  const deleteEmail = async () => {
    if (!email?.id || !confirm('Are you sure you want to delete this email?')) return;
    try {
      await fetch(`/api/email?id=${email.id}`, { method: 'DELETE' });
      localStorage.removeItem('tempEmail');
      await generateEmail();
    } catch (error) {
      console.error('Error deleting email:', error);
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
          <div className="refresh-indicator" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            <span className="refresh-dot"></span>
            Auto-refresh active
          </div>
          <h1>Secure Temporary Email</h1>
          <p>Protect your privacy with instant disposable email addresses. No registration required. Emails expire in 24 hours.</p>
        </div>
      </section>

      <div className="container">
        <div className="email-box" style={{ position: 'relative' }}>
          {loading && !email && (
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(10, 14, 39, 0.3)', borderRadius: '20px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10, backdropFilter: 'blur(4px)' }}>
              <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Generating...</p>
            </div>
          )}
          <div className="email-display">
            <span className="email-address">{displayEmail.email}</span>
            <button className="copy-btn" onClick={copyEmail} disabled={!email}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              {copied ? 'Copied!' : 'Copy'}
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
          <h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            </svg>
            Inbox
          </h2>
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
                          sandbox="allow-same-origin"
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

      <section className="features">
        <div className="container">
          <h2>Why Choose Temp Mail Pro?</h2>
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
    </div>
  );
}
