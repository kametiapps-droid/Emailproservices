'use client';

export default function BlogFAQ() {
  return (
    <div style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: '700',
        color: 'var(--text)',
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Frequently Asked Questions
      </h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '15px',
        marginBottom: '40px',
        maxWidth: '600px',
        margin: '0 auto 40px'
      }}>
        Quick answers to common questions about this topic
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {[
          {
            q: 'What is temporary email?',
            a: 'Temporary email is a disposable email address that you can use to receive emails without revealing your real email address. It automatically expires after 24 hours.'
          },
          {
            q: 'Is it safe to use temporary email?',
            a: 'Yes, temporary email is very safe. It protects your privacy by preventing your real email from being sold to marketers or exposed in data breaches.'
          },
          {
            q: 'How long does a temporary email last?',
            a: 'A temporary email address remains active for 24 hours. After that, the address and all messages are automatically deleted permanently.'
          },
          {
            q: 'Can I receive attachments?',
            a: 'Yes, you can receive and view attachments in temporary email just like a regular email account. Simply access them through your inbox.'
          },
          {
            q: 'Why should I use temporary email?',
            a: 'Use temporary email when signing up for free trials, testing websites, registering on untrusted sites, or protecting your privacy online.'
          },
          {
            q: 'Will websites ban me?',
            a: 'Most websites don\'t care about temporary email. Some services prohibit it to prevent free trial abuse, so always check their terms of service first.'
          }
        ].map((faq, idx) => (
          <div
            key={idx}
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.5) 0%, rgba(30, 41, 82, 0.3) 100%)',
              borderRadius: '14px',
              border: '1px solid rgba(59, 130, 246, 0.15)',
              padding: '24px',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.12)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <span style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                flexShrink: 0
              }}>
                ❓
              </span>
            </div>
            <h3 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'var(--text)',
              marginBottom: '10px',
              margin: '0 0 12px 0',
              lineHeight: '1.5'
            }}>
              {faq.q}
            </h3>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
              margin: 0,
              flex: 1
            }}>
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
