'use client';

export default function ApiDocsPage() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>API Documentation</h1>
          <p>Build amazing applications with our temporary email service.</p>
        </div>
      </section>

      <div className="container">
        <div style={{ 
          maxWidth: '600px', 
          margin: '60px auto', 
          textAlign: 'center',
          padding: '60px 20px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="80" 
              height="80" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              style={{ color: 'rgba(59, 130, 246, 0.6)', margin: '0 auto' }}
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
              <polyline points="13 2 13 9 20 9"/>
              <line x1="9" y1="13" x2="15" y2="13"/>
              <line x1="9" y1="17" x2="15" y2="17"/>
            </svg>
          </div>
          
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Coming Soon
          </h2>
          
          <p style={{ 
            fontSize: '16px', 
            color: 'var(--text-muted)', 
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            We're working hard to bring you a comprehensive API documentation with code examples, integration guides, and best practices.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginTop: '40px'
          }}>
            <div style={{
              padding: '16px',
              background: 'rgba(59, 130, 246, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔌</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>REST API</div>
            </div>
            <div style={{
              padding: '16px',
              background: 'rgba(168, 85, 247, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(168, 85, 247, 0.1)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📚</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>SDK</div>
            </div>
            <div style={{
              padding: '16px',
              background: 'rgba(59, 130, 246, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Webhooks</div>
            </div>
          </div>

          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: 'rgba(251, 191, 36, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              📧 In the meantime, use our email service by visiting the <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>home page</a>
            </div>
          </div>
        </div>
      </div>

      <section className="features" style={{ marginTop: '100px' }}>
        <div className="container">
          <h2>What's Coming</h2>
          <div className="features-grid">
            <div className="feature-card card-lightning">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
                </svg>
              </div>
              <h3>Full API Access</h3>
              <p>Programmatic access to generate, manage, and monitor temporary email addresses.</p>
            </div>
            <div className="feature-card card-privacy">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Secure Webhooks</h3>
              <p>Real-time notifications when emails arrive with encrypted payload verification.</p>
            </div>
            <div className="feature-card card-clock">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3>Rate Limiting</h3>
              <p>Generous rate limits with transparent quota management and usage analytics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
