export default function AboutPage() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Learn more about Temp Mail Pro and our mission</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px', maxWidth: '900px' }}>
        <div style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
          
          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Our Mission
          </h2>
          <p style={{ marginBottom: '24px' }}>
            At Temp Mail Pro, our mission is to empower users with a simple, secure, and reliable solution for protecting their privacy online. We believe everyone deserves the right to privacy when browsing the web, signing up for services, or accessing content without compromising their personal information.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            What We Do
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Temp Mail Pro provides instant, disposable email addresses that allow you to:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>Protect your primary email from spam</li>
            <li style={{ marginBottom: '12px' }}>Maintain your privacy online</li>
            <li style={{ marginBottom: '12px' }}>Use an alternative email for newsletters, trials, and testing purposes</li>
            <li style={{ marginBottom: '12px' }}>Receive automated messages for testing and privacy protection only</li>
            <li style={{ marginBottom: '12px' }}>Test email functionality</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Why Choose Temp Mail Pro?
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>⚡ Instant Creation</h3>
              <p>Generate temporary email addresses instantly without registration</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>🔒 Secure & Private</h3>
              <p>Your privacy is protected with end-to-end encrypted communications</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>⏰ Automatic Expiration</h3>
              <p>Temporary addresses automatically expire after 24 hours</p>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>🎯 Easy to Use</h3>
              <p>Simple, intuitive interface that works on all devices</p>
            </div>
          </div>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Our Commitment
          </h2>
          <p style={{ marginBottom: '24px' }}>
            We are committed to:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>Maintaining the highest standards of security and privacy</li>
            <li style={{ marginBottom: '12px' }}>Providing a reliable and fast service</li>
            <li style={{ marginBottom: '12px' }}>Continuously improving our platform</li>
            <li style={{ marginBottom: '12px' }}>Protecting user data from unauthorized access</li>
            <li style={{ marginBottom: '12px' }}>Being transparent about our policies and practices</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Legal Compliance
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Temp Mail Pro operates in compliance with applicable laws and regulations. We:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>Comply with GDPR and international privacy laws</li>
            <li style={{ marginBottom: '12px' }}>Maintain transparent privacy practices</li>
            <li style={{ marginBottom: '12px' }}>Do not engage in illegal activities</li>
            <li style={{ marginBottom: '12px' }}>Actively prevent misuse of our service</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Responsible Use Notice
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Temp Mail Pro is designed strictly for privacy protection, software testing, and educational purposes. We do not support or promote fraud, impersonation, spam, or bypassing the terms of any third-party services. Users are solely responsible for complying with applicable laws and platform policies.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Get In Touch
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Have questions or feedback? We'd love to hear from you. Contact us at:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Email: Contact@mytempmail.pro</li>
            <li style={{ marginBottom: '8px' }}>Website: www.mytempmail.pro</li>
          </ul>

          <p style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid rgba(59, 130, 246, 0.1)', fontSize: '14px' }}>
            Thank you for choosing Temp Mail Pro. Your privacy matters to us.
          </p>
        </div>
      </div>
    </div>
  );
}
