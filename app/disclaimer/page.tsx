'use client';

export default function DisclaimerPage() {
  const lastUpdated = "November 25, 2025";

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: '800', marginBottom: '16px' }}>
            Important Disclaimer
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', opacity: 0.9 }}>
            Please read this carefully before using our service
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1100px', paddingTop: '60px', paddingBottom: '80px', padding: '60px 20px' }}>
        
        {/* Last Updated */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '60px',
          border: '1px solid rgba(59, 130, 246, 0.15)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
            <strong>Last Updated:</strong> {lastUpdated}
          </p>
        </div>

        {/* Key Points Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          marginBottom: '60px'
        }}>
          {[
            {
              icon: '⚠️',
              title: 'General Disclaimer',
              content: 'Information on this website is provided for general informational purposes only. We make no warranties about accuracy, reliability, or completeness.'
            },
            {
              icon: '👤',
              title: 'No Professional Advice',
              content: 'Our service is not professional advice. We have no liability for losses resulting from your use of our service or reliance on our information.'
            },
            {
              icon: '📧',
              title: 'Temporary Emails Only',
              content: 'Our emails are temporary and not suitable for important communications, account recovery, or official correspondence.'
            },
            {
              icon: '❌',
              title: 'Prohibited Uses',
              content: 'Illegal activities, spam, phishing, harassment, and circumventing security are strictly prohibited.'
            },
            {
              icon: '🔗',
              title: 'External Links',
              content: 'We are not responsible for external websites linked on our site. Their content is at your own risk.'
            },
            {
              icon: '📊',
              title: 'Service Availability',
              content: 'Service is provided "as is" without guarantee of uptime, error-free operation, or security.'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.5) 0%, rgba(30, 41, 82, 0.3) 100%)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(59, 130, 246, 0.15)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text)' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                {item.content}
              </p>
            </div>
          ))}
        </div>

        {/* Temporary Email Risks */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            ⚠️ Risks of Using Temporary Emails
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(239, 68, 68, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              Using temporary email addresses comes with inherent risks that you assume:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Loss of access to accounts or services after 24 hours',
                'Inability to recover forgotten passwords or accounts',
                'Missing important communications or confirmations',
                'Deleted accounts on services requiring email verification',
                'No email recovery options after expiration',
                'Third-party services may reject temporary email addresses'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '16px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                  fontSize: 'clamp(0.95rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#ef4444', fontWeight: '700', flexShrink: 0 }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prohibited Uses */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            🚫 Prohibited Uses
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              You must NOT use our service for:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Illegal activities or violation of any laws',
                'Spam, phishing, or sending malicious content',
                'Creating multiple accounts for abuse or evasion',
                'Bypassing security measures or platform restrictions',
                'Harassment, abuse, or threats to other users',
                'Unauthorized access to accounts or systems',
                'Violating intellectual property or copyrights',
                'Distributing malware or harmful code',
                'Fraud, impersonation, or deception'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '16px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                  fontSize: 'clamp(0.95rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#ef4444', fontWeight: '700', flexShrink: 0 }}>✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Liability Limitation */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            ⚖️ Limitation of Liability
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.04) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(239, 68, 68, 0.15)'
          }}>
            <p style={{
              color: 'var(--text)',
              lineHeight: '1.8',
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              fontWeight: '500'
            }}>
              IN NO EVENT SHALL TEMP MAIL PRO, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES RESULTING FROM:
            </p>
            <ul style={{ paddingLeft: 0, margin: '24px 0 0 0' }}>
              {[
                'Use of our service or reliance on our information',
                'Loss of data, access, or communications',
                'Service interruptions or unavailability',
                'Errors, omissions, or delays in our content',
                'Third-party actions or external websites'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#ef4444', fontWeight: '700', flexShrink: 0 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(239, 68, 68, 0.1)',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              fontStyle: 'italic'
            }}>
              Your use of our service is entirely at your own risk.
            </p>
          </div>
        </section>

        {/* External Links */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            🔗 External Links Disclaimer
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              Our website may contain links to external websites. We are not responsible for:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Content accuracy on external websites',
                'Privacy policies or practices of third parties',
                'Security of linked websites',
                'Terms and conditions of external services'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Service Availability */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            📊 Service Availability
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              Temp Mail Pro is provided "AS IS" without any warranties or guarantees:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Service may be interrupted without notice',
                'We do not guarantee error-free operation',
                'Security is not guaranteed',
                'Service may be modified or discontinued anytime'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#f59e0b', fontWeight: '700' }}>!</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          borderRadius: '20px',
          padding: 'clamp(40px, 5vw, 60px) clamp(20px, 5vw, 40px)',
          textAlign: 'center',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
            Questions About This Disclaimer?
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            If you have any questions or concerns about this disclaimer, please contact us immediately.
          </p>
          <a href="mailto:Contact@mytempmail.pro" style={{
            display: 'inline-block',
            padding: '16px 40px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
          }}>
            Contact Us
          </a>
        </section>

        {/* Footer */}
        <section style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: '1.7' }}>
            By using Temp Mail Pro, you acknowledge that you have read, understood, and agree to all terms in this disclaimer. If you do not agree with any part of this disclaimer, please discontinue use of our service immediately.
          </p>
        </section>
      </div>
    </div>
  );
}
