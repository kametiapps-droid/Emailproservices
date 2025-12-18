export default function CopyrightPage() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Copyright Disclaimer</h1>
          <p>Intellectual property and copyright information</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px', maxWidth: '900px' }}>
        <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Ownership of Content
          </h2>
          <p style={{ marginBottom: '24px' }}>
            All content included on this website, including but not limited to text, graphics, logos, images, audio clips, and software, is the property of Temp Mail Pro or its content suppliers and is protected by international copyright laws. The compilation of all content on this website is the exclusive property of Temp Mail Pro and protected by international copyright laws.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Copyright Notice
          </h2>
          <p style={{ marginBottom: '24px' }}>
            © {new Date().getFullYear()} Temp Mail Pro. All rights reserved. No content from this website may be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way without our prior written consent.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Use of Content
          </h2>
          <p style={{ marginBottom: '24px' }}>
            You may view and print pages from the website for personal, non-commercial use, subject to restrictions set in these terms and conditions. You must not:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>Republish material from this website (including republication on another website)</li>
            <li style={{ marginBottom: '12px' }}>Sell, rent, or sub-license material from the website</li>
            <li style={{ marginBottom: '12px' }}>Reproduce, duplicate, or copy material from this website for commercial purposes</li>
            <li style={{ marginBottom: '12px' }}>Redistribute content from this website (unless content is specifically made for redistribution)</li>
            <li style={{ marginBottom: '12px' }}>Frame pages of this website in another website</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Intellectual Property Rights
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Unless otherwise stated, Temp Mail Pro and/or its licensors own the intellectual property rights for all material on www.mytempmail.pro. All intellectual property rights are reserved. You may access this for personal use subject to restrictions set in these terms and conditions.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Trademarks
          </h2>
          <p style={{ marginBottom: '24px' }}>
            The trademarks, logos, and brand names used on this website are the property of Temp Mail Pro or their respective owners. You may not use any of these marks without the prior written permission of Temp Mail Pro or the respective owner.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Third-Party Content
          </h2>
          <p style={{ marginBottom: '24px' }}>
            This website may contain content from third parties. The use of third-party content is for informational purposes only. We do not endorse and are not responsible for the accuracy or legitimacy of third-party content. If you believe any third-party content violates your intellectual property rights, please contact us immediately.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            DMCA Compliance
          </h2>
          <p style={{ marginBottom: '24px' }}>
            If you believe that your copyrighted work has been infringed upon in any way, please notify us immediately at Contact@mytempmail.pro with the following information:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>Your name and contact information</li>
            <li style={{ marginBottom: '12px' }}>A detailed description of the copyrighted work</li>
            <li style={{ marginBottom: '12px' }}>The URL where the infringing material is located</li>
            <li style={{ marginBottom: '12px' }}>Your statement that you have a good faith belief that the use is not authorized</li>
            <li style={{ marginBottom: '12px' }}>Your signature and declaration under penalty of perjury</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            User-Generated Content
          </h2>
          <p style={{ marginBottom: '24px' }}>
            By submitting content to Temp Mail Pro (including but not limited to reviews, comments, or feedback), you grant us a non-exclusive, worldwide, perpetual, irrevocable, and royalty-free license to use that content in any way we deem appropriate.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Contact Us
          </h2>
          <p style={{ marginBottom: '24px' }}>
            If you have any questions about this Copyright Disclaimer or if you believe your intellectual property rights have been infringed, please contact us at:
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
