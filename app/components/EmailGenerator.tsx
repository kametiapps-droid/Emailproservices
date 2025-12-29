'use client';

import { memo, useState } from 'react';
import QRCode from 'qrcode';

interface Email {
  id: string;
  email: string;
  createdAt: string;
  expiresAt: string;
}

interface EmailGeneratorProps {
  email: Email | null;
  loading: boolean;
  timeLeft: string;
  onGenerate: (e?: React.MouseEvent, forceNew?: boolean) => void;
  onRefresh: () => void;
  onDelete: () => void;
  onShowQR: () => void;
}

const EmailGenerator = memo(({
  email,
  loading,
  timeLeft,
  onGenerate,
  onRefresh,
  onDelete,
  onShowQR,
}: EmailGeneratorProps) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (email?.email) {
      navigator.clipboard.writeText(email.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="email-generator-card">
      <div className="generator-header">
        <div className="generator-title-section">
          <h3 className="generator-title">Your Temporary Email</h3>
        </div>
      </div>

      <div className="email-display-new">
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

      <div className="generator-actions">
        <button className="action-btn-new refresh-btn" onClick={onRefresh} disabled={loading} title="Refresh inbox">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
          <span>{loading ? 'Generating...' : 'Refresh'}</span>
        </button>
        <button className="action-btn-new qr-btn" onClick={onShowQR} disabled={loading || !email} title="Show QR code">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="5" y="5" width="3" height="3"></rect><rect x="16" y="5" width="3" height="3"></rect><rect x="16" y="16" width="3" height="3"></rect><rect x="5" y="16" width="3" height="3"></rect></svg>
          <span>QR Code</span>
        </button>
        <button className="action-btn-new change-btn" onClick={() => onGenerate(undefined, true)} disabled={loading} title="Generate new email" style={{ opacity: loading ? 0.6 : 1 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <span>{loading ? 'Generating...' : 'Change Email'}</span>
        </button>
        <button className="action-btn-new delete-btn" onClick={onDelete} disabled={loading} title="Delete this email">
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
  );
});

EmailGenerator.displayName = 'EmailGenerator';

export default EmailGenerator;
