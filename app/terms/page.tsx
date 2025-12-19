export default function TermsPage() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Terms and Conditions</h1>
          <p>Please read these terms carefully before using our service</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px', maxWidth: '900px' }}>
        <div style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
          <p style={{ marginBottom: '24px', fontWeight: '500', color: 'var(--text)' }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ marginBottom: '24px' }}>
            By accessing and using Temp Mail Pro ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            2. Use License
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Permission is granted to temporarily download one copy of the materials (information or software) on Temp Mail Pro for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>Modifying or copying the materials</li>
            <li style={{ marginBottom: '12px' }}>Using the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
            <li style={{ marginBottom: '12px' }}>Attempting to decompile or reverse engineer any software contained on the Service</li>
            <li style={{ marginBottom: '12px' }}>Removing any copyright or other proprietary notations from the materials</li>
            <li style={{ marginBottom: '12px' }}>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            <li style={{ marginBottom: '12px' }}>Violating any applicable laws or regulations</li>
          </ul>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            3. Disclaimer
          </h2>
          <p style={{ marginBottom: '24px' }}>
            The materials on Temp Mail Pro are provided on an 'as is' basis. Temp Mail Pro makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            4. Limitations
          </h2>
          <p style={{ marginBottom: '24px' }}>
            In no event shall Temp Mail Pro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Temp Mail Pro, even if Temp Mail Pro or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            5. Accuracy of Materials
          </h2>
          <p style={{ marginBottom: '24px' }}>
            The materials appearing on Temp Mail Pro could include technical, typographical, or photographic errors. Temp Mail Pro does not warrant that any of the materials on this website are accurate, complete, or current. Temp Mail Pro may make changes to the materials contained on this website at any time without notice.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            6. Links
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Temp Mail Pro has not reviewed all of the sites linked to this website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Temp Mail Pro of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            7. Modifications
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Temp Mail Pro may revise these terms of service for this website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            8. Governing Law
          </h2>
          <p style={{ marginBottom: '24px' }}>
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Temp Mail Pro operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: 'var(--text)' }}>
            9. Contact Us
          </h2>
          <p style={{ marginBottom: '24px' }}>
            If you have any questions about these Terms and Conditions, please contact us at:
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
