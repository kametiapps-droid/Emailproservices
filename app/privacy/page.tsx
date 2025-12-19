export default function PrivacyPage() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Your privacy is important to us. Learn how we protect your data</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px', maxWidth: '900px' }}>
        <div style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
          <p style={{ marginBottom: '24px', fontWeight: '500', color: 'var(--text)' }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            1. Introduction
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Temp Mail Pro ("we," "us," "our," or "Company") operates the Service. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            2. Information Collection and Use
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We collect different types of information for various purposes to provide and improve our Service to you.
          </p>
          <h3 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '12px', color: 'var(--text)' }}>
            Types of Data Collected:
          </h3>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
              <ul style={{ marginTop: '8px', paddingLeft: '24px' }}>
                <li>Email address</li>
                <li>Name</li>
                <li>Phone number</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </li>
            <li style={{ marginBottom: '12px' }}><strong>Usage Data:</strong> We collect information about how you access and use the Service, including:
              <ul style={{ marginTop: '8px', paddingLeft: '24px' }}>
                <li>Browser type and version</li>
                <li>IP address</li>
                <li>Pages visited</li>
                <li>Time and duration of activities</li>
                <li>Device information</li>
              </ul>
            </li>
            <li style={{ marginBottom: '12px' }}><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            3. Use of Data
          </h2>
          <p style={{ marginBottom: '12px' }}>Temp Mail Pro uses the collected data for various purposes:</p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>To provide and maintain our Service</li>
            <li style={{ marginBottom: '12px' }}>To notify you about changes to our Service</li>
            <li style={{ marginBottom: '12px' }}>To allow you to participate in interactive features of our Service</li>
            <li style={{ marginBottom: '12px' }}>To gather analysis or valuable information so we can improve our Service</li>
            <li style={{ marginBottom: '12px' }}>To monitor the usage of our Service</li>
            <li style={{ marginBottom: '12px' }}>To detect, prevent and address technical and security issues</li>
            <li style={{ marginBottom: '12px' }}>To provide customer support</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            4. Security of Data
          </h2>
          <p style={{ marginBottom: '24px' }}>
            The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            5. Contact Us
          </h2>
          <p style={{ marginBottom: '24px' }}>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Email: Contact@mytempmail.pro</li>
            <li style={{ marginBottom: '8px' }}>Website: www.mytempmail.pro</li>
          </ul>

          <p style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid rgba(59, 130, 246, 0.1)', fontSize: '14px', color: 'var(--text-muted)' }}>
            This Privacy Policy is effective as of the date of last update and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on the Service.
          </p>
        </div>
      </div>
    </div>
  );
}
