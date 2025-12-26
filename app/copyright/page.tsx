'use client';

export default function CopyrightPage() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = "November 25, 2025";

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: '800', marginBottom: '16px' }}>
            Copyright & Intellectual Property
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', opacity: 0.9 }}>
            Understanding our intellectual property rights and your usage rights
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

        {/* Main Content Sections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '60px'
        }}>
          {[
            {
              icon: '📋',
              title: 'Ownership of Content',
              content: 'All content on this website—including text, graphics, logos, images, and software—is owned by Temp Mail Pro or our suppliers and protected by international copyright laws. The complete compilation of website content is our exclusive property.'
            },
            {
              icon: '©️',
              title: 'Copyright Notice',
              content: `© ${currentYear} Temp Mail Pro. All rights reserved. No part of this website may be copied, reproduced, or distributed without our prior written permission.`
            },
            {
              icon: '✅',
              title: 'Permitted Use',
              content: 'You may view and print pages for personal, non-commercial use only. This does not include republishing, selling, or using content for commercial purposes.'
            },
            {
              icon: '🏛️',
              title: 'Intellectual Property Rights',
              content: 'Temp Mail Pro and its licensors own all intellectual property rights for website materials. All rights are reserved. Personal access is permitted under these terms and conditions.'
            },
            {
              icon: '™️',
              title: 'Trademark Protection',
              content: 'Our trademarks, logos, and brand names are our property. You may not use these marks without our written permission. Unauthorized use is prohibited.'
            },
            {
              icon: '🔗',
              title: 'Third-Party Content',
              content: 'Third-party content is for informational purposes only. We do not endorse it and are not responsible for its accuracy. Report infringements immediately.'
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

        {/* Restrictions Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            ⛔ Content Usage Restrictions
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(239, 68, 68, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              You agree not to:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Republish material from this website on other platforms',
                'Sell, rent, or sub-license website material',
                'Reproduce or duplicate content for commercial use',
                'Redistribute content without permission',
                'Frame our pages within another website',
                'Use our content to create competing services',
                'Scrape or automate content collection'
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

        {/* DMCA Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            📜 DMCA Compliance & Copyright Claims
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              If you believe your copyrighted work has been infringed, notify us immediately at <strong>Contact@mytempmail.pro</strong> with:
            </p>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {[
                'Your full name and contact information',
                'Description of the copyrighted work',
                'URL of the infringing material',
                'Statement of good faith belief',
                'Your signature under penalty of perjury'
              ].map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: '16px',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                  fontSize: 'clamp(0.95rem, 2vw, 1rem)'
                }}>
                  <span style={{ color: '#10b981', fontWeight: '700', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(59, 130, 246, 0.1)',
              color: 'var(--text-muted)',
              fontSize: '0.9rem'
            }}>
              We will respond to all valid claims and take appropriate action.
            </p>
          </div>
        </section>

        {/* User-Generated Content */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '32px', color: 'var(--text)' }}>
            👥 User-Generated Content
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              By submitting content to Temp Mail Pro—including reviews, comments, feedback, or suggestions—you grant us a non-exclusive, worldwide, perpetual, irrevocable, and royalty-free license to use that content in any way we deem appropriate, including in marketing and product improvements.
            </p>
          </div>
        </section>

        {/* Footer */}
        <section style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: '1.7' }}>
            This Copyright Disclaimer outlines Temp Mail Pro's intellectual property rights and your permitted usage. By accessing our website, you agree to respect these terms. If you do not agree, please discontinue use immediately.
          </p>
        </section>
      </div>
    </div>
  );
}
