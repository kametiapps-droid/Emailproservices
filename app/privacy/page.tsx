'use client';

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: '800', marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', opacity: 0.9 }}>
            Your privacy is our priority. Learn how we protect your data
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
              icon: '🔒',
              title: 'Data Protection',
              content: 'We use industry-standard security measures to protect your personal information.'
            },
            {
              icon: '👤',
              title: 'Minimal Collection',
              content: 'We collect only essential data needed to provide and improve our service.'
            },
            {
              icon: '🚫',
              title: 'No Selling',
              content: 'We never sell, trade, or share your personal information with third parties.'
            },
            {
              icon: '🌍',
              title: 'GDPR Compliant',
              content: 'We comply with GDPR and international data protection regulations.'
            },
            {
              icon: '📊',
              title: 'Transparent',
              content: 'We clearly explain what data we collect and why we collect it.'
            },
            {
              icon: '✋',
              title: 'Your Control',
              content: 'You have control over your data and can request deletion anytime.'
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

        {/* Section 1: Introduction */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            1️⃣ Introduction & Commitment
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              Temp Mail Pro ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              We believe in transparency and want you to understand exactly how your information is being used. Your trust is important to us, and we take data protection seriously.
            </p>
          </div>
        </section>

        {/* Section 2: Information Collection */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            2️⃣ Information Collection and Use
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
                👤 Personal Data We Collect
              </h3>
              <ul style={{ paddingLeft: 0, margin: 0 }}>
                {[
                  'Email addresses (when you submit feedback)',
                  'Names (optional, for feedback)',
                  'Browser type and version',
                  'IP address (for security)',
                  'Pages visited and time spent',
                  'Device information'
                ].map((item, idx) => (
                  <li key={idx} style={{
                    marginBottom: '12px',
                    display: 'flex',
                    gap: '12px',
                    color: 'var(--text-muted)',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    lineHeight: '1.6'
                  }}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
              borderRadius: '16px',
              padding: '40px',
              border: '1px solid rgba(59, 130, 246, 0.15)'
            }}>
              <h3 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '1.1rem', fontWeight: '600' }}>
                📊 Usage Data Collection
              </h3>
              <ul style={{ paddingLeft: 0, margin: 0 }}>
                {[
                  'How you interact with our service',
                  'Features you use most',
                  'Search terms and clicks',
                  'Session duration and frequency',
                  'Geographic location (country only)',
                  'Referral sources'
                ].map((item, idx) => (
                  <li key={idx} style={{
                    marginBottom: '12px',
                    display: 'flex',
                    gap: '12px',
                    color: 'var(--text-muted)',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    lineHeight: '1.6'
                  }}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Use of Data */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            3️⃣ How We Use Your Data
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              We use collected data for:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Providing and maintaining our service',
                'Improving and optimizing our features',
                'Analyzing usage patterns to enhance user experience',
                'Detecting and preventing security issues',
                'Responding to your inquiries and feedback',
                'Complying with legal obligations',
                'Personalizing your experience'
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

        {/* Section 4: Security */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            4️⃣ Security of Your Data
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              The security of your data is very important to us. We implement:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'HTTPS encryption for all data transmission',
                'Industry-standard security protocols',
                'Regular security audits and updates',
                'Secure data storage practices',
                'Limited access to personal information',
                'Monitoring for unauthorized access'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#10b981' }}>🔒</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(59, 130, 246, 0.1)',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              fontStyle: 'italic'
            }}>
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        {/* Section 5: Your Rights */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            5️⃣ Your Data Rights
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              You have the following rights:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Right to access your personal data',
                'Right to request data correction or update',
                'Right to request data deletion',
                'Right to opt-out of certain data collection',
                'Right to data portability',
                'Right to withdraw consent anytime'
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

        {/* Section 6: Cookies */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            6️⃣ Cookies and Tracking
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul style={{ paddingLeft: 0, margin: '0 0 20px 0' }}>
              {[
                'Session cookies for functional operation',
                'Analytics cookies to understand usage patterns',
                'Preference cookies to remember your settings'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#10b981' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              You can control cookie settings in your browser. Disabling cookies may affect some features of our service.
            </p>
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
            Privacy Questions or Concerns?
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            We're committed to your privacy. If you have questions about how we handle your data, please reach out to us.
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
            Contact@mytempmail.pro
          </a>
        </section>

        {/* Footer */}
        <section style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: '1.7' }}>
            We comply with GDPR, CCPA, and other international data protection regulations. Your privacy is not negotiable, and we take it seriously.
          </p>
        </section>
      </div>
    </div>
  );
}
