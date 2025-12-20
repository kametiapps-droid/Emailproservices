export default function DisclaimerPage() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Disclaimer</h1>
          <p>Important information about the use of our service</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px', maxWidth: '900px' }}>
        <div style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
          <p style={{ marginBottom: '24px', fontWeight: '500', color: 'var(--text)' }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            General Disclaimer
          </h2>
          <p style={{ marginBottom: '24px' }}>
            The information provided by Temp Mail Pro ("we," "us," "our," or "Company") on www.mytempmail.pro (the "Site") and our mobile application is for general informational purposes only. All information on the Site and our mobile application is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site or mobile application.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            No Professional Advice
          </h2>
          <p style={{ marginBottom: '24px' }}>
            UNDER NO CIRCUMSTANCE SHALL TEMP MAIL PRO HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR OUR MOBILE APPLICATION OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE AND MOBILE APPLICATION. YOUR USE OF THE SITE AND OUR MOBILE APPLICATION AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE AND MOBILE APPLICATION IS SOLELY AT YOUR OWN RISK.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Temporary Email Addresses
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Our Service provides temporary, disposable email addresses. These email addresses are not suitable for important communications, account recovery, or official correspondence. Users are solely responsible for the consequences of using temporary email addresses, including but not limited to:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>Loss of access to accounts or services</li>
            <li style={{ marginBottom: '12px' }}>Missed important communications</li>
            <li style={{ marginBottom: '12px' }}>Inability to recover accounts</li>
            <li style={{ marginBottom: '12px' }}>Data loss</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Prohibited Uses
          </h2>
          <p style={{ marginBottom: '12px' }}>
            You agree not to use Temp Mail Pro for any illegal or unauthorized purpose. You must comply with all laws, rules, and regulations applicable to your use of the Service. Specifically, but without limitation, you agree not to use the Service:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>For any illegal purpose or in violation of any laws</li>
            <li style={{ marginBottom: '12px' }}>To send spam, phishing, or malicious content</li>
            <li style={{ marginBottom: '12px' }}>To create multiple accounts for unauthorized or abusive purposes</li>
            <li style={{ marginBottom: '12px' }}>To circumvent platform security or terms of service</li>
            <li style={{ marginBottom: '12px' }}>To harass, abuse, or threaten other users</li>
            <li style={{ marginBottom: '12px' }}>To engage in unauthorized account access</li>
            <li style={{ marginBottom: '12px' }}>To violate intellectual property rights</li>
            <li style={{ marginBottom: '12px' }}>To distribute malware or harmful code</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            External Links Disclaimer
          </h2>
          <p style={{ marginBottom: '24px' }}>
            The Site and mobile application may contain links to external websites. We are not responsible for and assume no liability for the content, accuracy, privacy policies, or practices of any external websites, products, or services. Your use of third-party websites is at your own risk and subject to their terms and conditions.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Service Availability
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Temp Mail Pro is provided on an "as is" basis. We do not guarantee that the Service will be uninterrupted, error-free, or secure. We reserve the right to modify or discontinue the Service at any time without notice.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Limitation of Liability
          </h2>
          <p style={{ marginBottom: '24px' }}>
            IN NO EVENT SHALL TEMP MAIL PRO, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING FROM ANY ERRORS, OMISSIONS, OR DELAYS IN OR RELATING TO THE CONTENT, GRAPHICS, INFORMATION OR OTHER MATERIALS ON THE SITE OR MOBILE APPLICATION.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            Contact Us
          </h2>
          <p style={{ marginBottom: '24px' }}>
            If you have any questions about this Disclaimer, please contact us at:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Email: Contact@mytempmail.pro</li>
            <li style={{ marginBottom: '8px' }}>Website: www.mytempmail.pro</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
