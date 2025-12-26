'use client';

export default function TermsPage() {
  const lastUpdated = "November 25, 2025";

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: '800', marginBottom: '16px' }}>
            Terms and Conditions
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', opacity: 0.9 }}>
            Please read these terms carefully before using our service
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
              icon: '✅',
              title: 'Acceptance of Terms',
              content: 'By using Temp Mail Pro, you agree to be bound by all terms and conditions. If you don\'t agree, please don\'t use our service.'
            },
            {
              icon: '📋',
              title: 'Use License',
              content: 'You have permission to download materials for personal, non-commercial use only. Commercial use is strictly prohibited.'
            },
            {
              icon: '⚡',
              title: 'As-Is Service',
              content: 'Temp Mail Pro is provided on an "as is" basis. We make no warranties regarding accuracy, completeness, or reliability.'
            },
            {
              icon: '⛔',
              title: 'Restrictions',
              content: 'You may not modify, copy, reverse engineer, or use materials for any commercial purpose without permission.'
            },
            {
              icon: '🛡️',
              title: 'No Liability',
              content: 'We are not liable for any damages, data loss, or business interruption resulting from your use of our service.'
            },
            {
              icon: '⚖️',
              title: 'Governing Law',
              content: 'These terms are governed by applicable laws. Any disputes are subject to the jurisdiction of competent courts.'
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

        {/* Section 1: Acceptance of Terms */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            1️⃣ Acceptance of Terms
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              By accessing and using Temp Mail Pro, you accept and agree to be bound by all terms and conditions contained in this agreement. If you do not agree to abide by these terms, please do not use this service. Continued use of this service constitutes your acceptance of these terms as they may be updated from time to time.
            </p>
          </div>
        </section>

        {/* Section 2: Use License */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            2️⃣ Use License
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              Permission is granted to temporarily use our materials for personal, non-commercial viewing only. This is a license, not a transfer of title. Under this license, you may NOT:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Modify or copy the materials',
                'Use materials for any commercial purpose',
                'Decompile or reverse engineer any software',
                'Remove copyright or proprietary notations',
                'Transfer materials to others or mirror them',
                'Violate applicable laws or regulations',
                'Attempt to gain unauthorized system access'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#10b981', fontWeight: '700', flexShrink: 0 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3-5: Disclaimers */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            3️⃣ Disclaimer & 4️⃣ Limitations
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(239, 68, 68, 0.1)'
          }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '1.1rem', fontWeight: '600' }}>
              No Warranties
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              Temp Mail Pro is provided on an "as is" basis. We make no warranties, expressed or implied, regarding:
            </p>
            <ul style={{ paddingLeft: 0, margin: '0 0 20px 0' }}>
              {[
                'Accuracy, completeness, or currency of materials',
                'Merchantability or fitness for a particular purpose',
                'Non-infringement of intellectual property rights',
                'Uninterrupted or error-free operation',
                'Security of transmitted data'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#ef4444' }}>⚠️</span>
                  {item}
                </li>
              ))}
            </ul>
            <hr style={{ borderColor: 'rgba(239, 68, 68, 0.1)', margin: '24px 0' }} />
            <h3 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '1.1rem', fontWeight: '600' }}>
              No Liability for Damages
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              In no event shall Temp Mail Pro be liable for damages including loss of data, profits, or business interruption, even if we've been notified of the possibility of such damages.
            </p>
          </div>
        </section>

        {/* Section 5-6: Accuracy & Links */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            5️⃣ Accuracy & 6️⃣ External Links
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
              borderRadius: '16px',
              padding: '40px',
              border: '1px solid rgba(59, 130, 246, 0.15)'
            }}>
              <h3 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '1.1rem', fontWeight: '600' }}>
                🔍 Accuracy of Materials
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1rem)' }}>
                Materials may contain technical, typographical, or photographic errors. We do not warrant accuracy or completeness. We may change materials at any time without notice.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
              borderRadius: '16px',
              padding: '40px',
              border: '1px solid rgba(59, 130, 246, 0.15)'
            }}>
              <h3 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '1.1rem', fontWeight: '600' }}>
                🔗 Third-Party Links
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1rem)' }}>
                We are not responsible for external links or third-party content. Links don't imply endorsement. Use linked sites at your own risk.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Modifications */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            7️⃣ Modifications to Terms
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              Temp Mail Pro may revise these terms of service at any time without notice. By continuing to use this website, you are agreeing to be bound by the then-current version of these terms of service. We recommend checking this page periodically for changes.
            </p>
          </div>
        </section>

        {/* Section 8: Governing Law */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            8️⃣ Governing Law
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              These terms and conditions are governed by and construed in accordance with applicable laws. You irrevocably submit to the exclusive jurisdiction of competent courts for any disputes.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              If any provision of these terms is found invalid, the remaining provisions shall continue in full effect.
            </p>
          </div>
        </section>

        {/* User Responsibilities */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            👤 Your Responsibilities
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              You are responsible for:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Complying with all applicable laws and regulations',
                'Not using the service for illegal or unauthorized purposes',
                'Not transmitting spam, viruses, or harmful content',
                'Respecting intellectual property and privacy of others',
                'Maintaining the confidentiality of your account',
                'Not circumventing our security measures'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer */}
        <section style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: '1.7' }}>
            By using Temp Mail Pro, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions in this agreement. If you do not agree with any part of these terms, please do not use our service.
          </p>
        </section>
      </div>
    </div>
  );
}
