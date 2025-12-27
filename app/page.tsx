'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QRCode from 'qrcode';
import { blogPosts } from '../lib/blogData';

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

interface Feedback {
  id: string;
  name: string;
  rating: number;
  message: string;
  timestamp: string | Date;
  sentiment: 'positive' | 'neutral' | 'negative';
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
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [recentReviews, setRecentReviews] = useState<Feedback[]>([]);
  const [showGenerator, setShowGenerator] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const qrButtonRef = useRef<HTMLButtonElement>(null);
  const isGeneratingRef = useRef(false);

  useEffect(() => {
    if (showQR) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [showQR]);

  const generateEmail = useCallback(async () => {
    // Prevent multiple simultaneous generations
    if (isGeneratingRef.current) return;
    
    try {
      isGeneratingRef.current = true;
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch('/api/email', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      if (data.success) {
        setEmail(data.data);
        localStorage.setItem('tempEmail', JSON.stringify(data.data));
        setMessages([]);
        setSelectedMessage(null);
      } else {
        console.error('API error:', data.error);
      }
    } catch (error) {
      console.error('Failed to generate email:', error);
    } finally {
      setLoading(false);
      isGeneratingRef.current = false;
    }
  }, []);

  const fetchInbox = useCallback(async () => {
    if (!email?.id) return;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(`/api/inbox?emailId=${encodeURIComponent(email.id)}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(`/api/email?id=${encodeURIComponent(storedEmail.id)}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      
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
              setEmail(null); // Clear invalid email state
            } else {
              // Valid, fetch inbox
              const response = await fetch(`/api/inbox?emailId=${storedEmail.id}`);
              const data = await response.json();
              if (data.success) {
                setMessages(data.data);
                if (data.data && data.data.length > 0) {
                  setShowGenerator(true);
                }
              }
            }
          });
        } catch {
          localStorage.removeItem('tempEmail');
          setLoading(false);
          setEmail(null);
        }
      } else {
        setLoading(false);
      }
      
      // Fetch recent reviews in background after initial render
      setTimeout(async () => {
        try {
          const cached = localStorage.getItem('tempmail_feedback_cache');
          if (cached) {
            const data = JSON.parse(cached);
            setRecentReviews(data.slice(0, 5));
          }
          const response = await fetch('/api/feedback');
          if (response.ok) {
            const data = await response.json();
            setRecentReviews(data.slice(0, 5));
            localStorage.setItem('tempmail_feedback_cache', JSON.stringify(data));
          }
        } catch (error) {
          console.error('Error loading recent reviews:', error);
        }
      }, 1000);
    };
    init();
  }, []);

  // Don't auto-generate - let user click button or load from localStorage

  useEffect(() => {
    if (email?.id) {
      // Fetch immediately on mount
      fetchInbox();
      // Auto-refresh every 15 seconds (reduced frequency for performance)
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
    if (!email?.email) return;
    try {
      // Position above the button (fixed to document, not viewport)
      if (qrButtonRef.current) {
        const rect = qrButtonRef.current.getBoundingClientRect();
        setPopupPosition({
          top: window.scrollY + rect.top - 280, // Position above button relative to document
          left: rect.left + rect.width / 2
        });
      }
      // Generate QR code client-side for instant display
      const qrDataUrl = await QRCode.toDataURL(email.email, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrCode(qrDataUrl);
      setShowQR(true);
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
    createdAt: '', 
    expiresAt: '' 
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`page-container ${!mounted ? 'loading-state' : ''}`} suppressHydrationWarning>
      <section className="hero" style={{ minHeight: 'auto', padding: '60px 0 20px' }} suppressHydrationWarning>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%' }} suppressHydrationWarning>
          <div className="privacy-badge-container" style={{ 
            marginBottom: '24px', 
            display: 'flex', 
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'fadeInDown 0.8s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
              padding: '12px 20px',
              borderRadius: '50px',
              border: '1.5px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span style={{ 
                background: 'linear-gradient(90deg, #10B981 0%, #06B6D4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700', 
                fontSize: '0.95rem', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                fontFamily: '"Inter", system-ui, sans-serif'
              }}>Protect Your Privacy</span>
            </div>
          </div>
          <h1 style={{ textAlign: 'center', width: '100%', marginBottom: '12px', background: 'linear-gradient(90deg, #1E293B 0%, #3B82F6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800' }} suppressHydrationWarning>Your Privacy-First Temporary Email Solution</h1>
          <p style={{ textAlign: 'center', width: '100%', maxWidth: '800px', margin: '0 auto 12px' }} suppressHydrationWarning>Generate disposable email addresses in one click. Protect your real inbox from spam, phishing, and unwanted newsletters.</p>
          <div className="hero-cta-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 'auto', marginTop: '10px' }} suppressHydrationWarning>
            {mounted && !showGenerator && (
              <button 
                onClick={() => {
                  setShowGenerator(true);
                  if (!email && !isGeneratingRef.current) {
                    generateEmail();
                  }
                }}
                className="btn-hero-primary"
                style={{ margin: '0 auto', display: 'block' }}
              >
                🚀 Generate Your Temporary Email Address
              </button>
            )}
            {mounted && showGenerator && (
              <div className="email-generator-card" suppressHydrationWarning>
                <div className="generator-header" suppressHydrationWarning>
                  <div className="generator-title-section" suppressHydrationWarning>
                    <div className="generator-badge">🎯 Active Inbox</div>
                    <h3 className="generator-title">Your Temporary Email</h3>
                  </div>
                  <button onClick={() => setShowGenerator(false)} className="generator-close-btn" title="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

                <div className="email-display-new" suppressHydrationWarning>
                  {email ? (
                    <>
                      <span className="email-address-large">{email.email}</span>
                      <button className="copy-btn-primary" onClick={copyEmail} title="Copy email address">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </>
                  ) : (
                    <div className="email-loading-state">
                      <span className="spinner-small" style={{ width: '20px', height: '20px', border: '3px solid transparent', borderTopColor: '#3B82F6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                      <span>Generating your email...</span>
                    </div>
                  )}
                </div>

                <div className="generator-actions" suppressHydrationWarning>
                  <button className="action-btn-new refresh-btn" onClick={fetchInbox} title="Refresh inbox">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
                    <span>Refresh</span>
                  </button>
                  <button className="action-btn-new qr-btn" onClick={showQRCode} ref={qrButtonRef} title="Show QR code">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="5" y="5" width="3" height="3"></rect><rect x="16" y="5" width="3" height="3"></rect><rect x="16" y="16" width="3" height="3"></rect><rect x="5" y="16" width="3" height="3"></rect></svg>
                    <span>QR Code</span>
                  </button>
                  <button className="action-btn-new change-btn" onClick={generateEmail} disabled={loading} title="Generate new email">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                    <span>Change Email</span>
                  </button>
                  <button className="action-btn-new delete-btn" onClick={deleteEmail} title="Delete this email">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    <span>Delete</span>
                  </button>
                </div>

                {timeLeft && email && (
                  <div className="generator-timer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>{timeLeft}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {mounted && showGenerator && (
        <section className="inbox-section" style={{ marginTop: '0', paddingTop: '20px' }}>
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
                      <button 
                        className="message-back-btn"
                        onClick={() => setSelectedMessage(null)}
                        title="Back to inbox"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back to Inbox
                      </button>
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
      )}

      <section style={{ 
        padding: '36px 0', 
        background: 'var(--surface)',
        borderTop: '1px solid rgba(59, 130, 246, 0.1)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
      }} className="content-section-responsive">
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '28px', textAlign: 'center' }}>
              <h2 style={{ 
                color: '#3B82F6', 
                marginBottom: '8px',
                fontSize: 'clamp(24px, 5vw, 36px)',
                fontWeight: '700'
              }}>Understanding Temporary Email</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '8px' }}>
                Learn how our service protects your privacy and why it matters in today's digital world
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '16px'
            }}>
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 6l10 7 10-7"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.4' }}>What is Temp Mail?</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem', margin: 0 }}>
                  Temporary email is a short-lived email address that protects your privacy. Instead of using your real email for signups, use a temporary address that automatically expires after 24 hours.
                </p>
              </div>

              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #A855F7 0%, #D946EF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.4' }}>Why Privacy Matters</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem', margin: 0 }}>
                  Your email is your digital identity. Companies collect emails to sell your data. Temporary emails create a barrier between your real identity and corporate data collection.
                </p>
              </div>

              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.4' }}>Legal & Ethical</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem', margin: 0 }}>
                  Temporary emails are completely legal. Perfect for testing and privacy protection. Use responsibly for legitimate purposes only.
                </p>
              </div>

              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(239, 68, 68, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.4' }}>Complete Control</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem', margin: 0 }}>
                  Each temporary email is an isolated inbox. Keep your accounts separate and your personal information private across different services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features content-section-responsive" style={{ padding: '36px 0' }}>
        <div className="container">
          <h2 style={{ color: 'var(--text)', textAlign: 'center', marginBottom: '40px' }}>Why Choose Temp Mail Pro?</h2>
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

      <section style={{ padding: '36px 0', background: 'var(--surface)' }} className="content-section-responsive">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }} className="section-header-mobile">
            <h2 style={{ color: 'var(--text)', fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: '700' }}>Common Questions</h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
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
                <h3 style={{ color: '#3B82F6', marginBottom: '12px', fontSize: '16px', fontWeight: '700', lineHeight: '1.4' }}>
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

      <section style={{ padding: '36px 0', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)' }} className="content-section-responsive">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--text)', marginBottom: '8px', fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '700' }}>Privacy & Security Resource Center</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '700px', margin: '0 auto' }}>Stay informed with the latest guides on online privacy, email security, and spam prevention in 2025.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {blogPosts.slice(0, 8).map(post => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  background: 'var(--surface)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
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
                {post.featuredImage && (
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    background: 'rgba(59, 130, 246, 0.1)'
                  }}>
                    <Image
                      src={post.featuredImage}
                      alt={post.imageAlt || post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#3B82F6', lineHeight: '1.4' }}>
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
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/blog" style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#3B82F6',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              Explore All Articles →
            </Link>
          </div>
        </div>
      </section>

      {recentReviews.length > 0 && (
        <section style={{
          padding: '60px 0',
          background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.4) 0%, rgba(30, 41, 82, 0.2) 100%)',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
        }} className="content-section-responsive">
          <div className="container">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '32px', fontWeight: '700' }}>User Feedback</h2>
                <p style={{ color: 'var(--text-muted)' }}>What our community says about Temp Mail Pro</p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {recentReviews.map((review) => (
                  <div key={review.id} style={{
                    background: 'var(--surface)',
                    padding: '32px',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? '#FBBF24' : 'rgba(255,255,255,0.1)'}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <p style={{ color: 'var(--text)', fontStyle: 'italic', marginBottom: '24px', lineHeight: '1.7' }}>"{review.message}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'white' }}>
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ color: 'var(--text)', fontWeight: '600', fontSize: '14px' }}>{review.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Verified User</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '48px' }}>
                <Link href="/reviews" className="btn btn-secondary">Read All Reviews</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="cta-section content-section-responsive" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 style={{ color: '#000000' }}>Ready to Protect Your Privacy?</h2>
              <p>Join thousands of users who trust Temp Mail Pro for their temporary email needs. Start your secure, spam-free journey today.</p>
              <div className="cta-actions">
                <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Generate Free Email Now
                </button>
                <Link href="/use-cases" className="btn btn-secondary">
                  Explore Use Cases
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showQR && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(10, 14, 39, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
          onClick={() => setShowQR(false)}
        >
          <div 
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
              maxWidth: '340px',
              width: '100%',
              position: 'relative',
              zIndex: 100000,
              animation: 'modalFadeIn 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style jsx>{`
              @keyframes modalFadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
            <button
              onClick={() => setShowQR(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f3f4f6',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4b5563',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
            >
              ×
            </button>
            <h3 style={{ color: '#111827', marginBottom: '8px', fontSize: '20px', fontWeight: '800' }}>Scan QR Code</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>Access your temporary inbox on mobile</p>
            
            <div style={{ 
              background: 'white', 
              padding: '16px', 
              borderRadius: '16px', 
              border: '2px solid #f3f4f6',
              marginBottom: '20px',
              display: 'inline-block'
            }}>
              {qrCode && <img src={qrCode} alt="Email QR Code" style={{ width: '200px', height: '200px', display: 'block' }} />}
            </div>
            
            <div style={{ 
              background: '#f9fafb', 
              padding: '12px', 
              borderRadius: '12px',
              border: '1px solid #f3f4f6'
            }}>
              <p style={{ color: '#374151', fontSize: '14px', wordBreak: 'break-all', fontWeight: '600', margin: 0 }}>
                {email?.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
