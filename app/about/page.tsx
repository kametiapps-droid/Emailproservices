'use client';

export default function AboutPage() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: '800', marginBottom: '16px' }}>About Temp Mail Pro</h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', opacity: 0.9 }}>Protecting your privacy, one temporary email at a time</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1100px', paddingTop: '60px', paddingBottom: '80px', padding: '60px 20px' }}>
        {/* Mission Section */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '24px', color: 'var(--text)' }}>
                Our Mission
              </h2>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '20px' }}>
                We believe everyone deserves the right to privacy in the digital world. Our mission is to provide a simple, secure, and reliable way to protect your personal information while browsing the web, signing up for services, or testing applications.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                Temp Mail Pro gives you complete control over your digital footprint without complicated setups or hidden fees.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🛡️</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '12px' }}>Privacy First</h3>
              <p style={{ color: 'var(--text-muted)' }}>Your data, your control, always</p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
            What We Offer
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px'
          }}>
            {[
              { icon: '⚡', title: 'Instant Generation', desc: 'Get a temporary email in seconds, no signup required' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your emails are encrypted and protected from unwanted access' },
              { icon: '⏰', title: '24-Hour Expiration', desc: 'Emails automatically expire and delete after 24 hours' },
              { icon: '📱', title: 'Works Everywhere', desc: 'Use on desktop, tablet, or mobile—no app needed' },
              { icon: '💬', title: 'Full Inbox Access', desc: 'Receive and read emails instantly in your temporary inbox' },
              { icon: '🎯', title: 'Privacy Protection', desc: 'Keep your primary email safe from spam and data brokers' }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.5) 0%, rgba(30, 41, 82, 0.3) 100%)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', color: 'var(--text)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
            Why Choose Temp Mail Pro?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              {[
                { num: '1', title: 'Completely Free', text: 'No credit card, no hidden charges, no subscriptions' },
                { num: '2', title: 'Fast & Reliable', text: 'Emails arrive instantly. We keep our service running 24/7' },
                { num: '3', title: 'Trusted by Users', text: 'Used by thousands of people worldwide for privacy and testing' },
                { num: '4', title: 'Privacy Focused', text: 'We never sell your data or use invasive tracking' }
              ].map((item, idx) => (
                <div key={idx} style={{ marginBottom: '32px', display: 'flex', gap: '20px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    color: 'white',
                    fontSize: '1.3rem',
                    flexShrink: 0
                  }}>
                    {item.num}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text)' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
              borderRadius: '20px',
              padding: '50px 40px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✨</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Simple & Effective</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                No complicated setup. No registration forms. Just click and get a temporary email ready to use instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Legal & Commitment */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
              borderRadius: '16px',
              padding: '40px',
              border: '1px solid rgba(59, 130, 246, 0.15)'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
                Our Commitment
              </h3>
              <ul style={{ paddingLeft: 0 }}>
                {[
                  'Maintaining high security standards',
                  'Providing reliable 24/7 service',
                  'Protecting user privacy always',
                  'Being transparent about our practices',
                  'Continuously improving the platform'
                ].map((item, idx) => (
                  <li key={idx} style={{
                    marginBottom: '16px',
                    display: 'flex',
                    gap: '12px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6'
                  }}>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>✓</span>
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
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
                Legal Compliance
              </h3>
              <ul style={{ paddingLeft: 0 }}>
                {[
                  'GDPR compliant',
                  'International privacy laws respected',
                  'No illegal activities supported',
                  'Abuse prevention in place',
                  'Transparent policies'
                ].map((item, idx) => (
                  <li key={idx} style={{
                    marginBottom: '16px',
                    display: 'flex',
                    gap: '12px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6'
                  }}>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Responsible Use */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
              Responsible Use
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
              Temp Mail Pro is designed for legitimate purposes including privacy protection, software testing, and educational use. We do not support fraud, impersonation, spam, or bypassing third-party terms of service. Users are responsible for complying with all applicable laws and platform policies.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          borderRadius: '20px',
          padding: 'clamp(40px, 5vw, 60px) clamp(20px, 5vw, 40px)',
          textAlign: 'center',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
            Ready to protect your privacy?
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Get started instantly with Temp Mail Pro. No signup, no fees, no hassle.
          </p>
          <a href="/" style={{
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
            Generate Your Email Now
          </a>
        </section>
      </div>
    </div>
  );
}
