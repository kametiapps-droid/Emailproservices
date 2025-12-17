import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">Temp Mail Pro</h3>
            <p className="footer-tagline">
              Free temporary disposable email service to protect your privacy. Instantly receive verification emails without registration.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/use-cases">Use Cases</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/faq">Help Center</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/faq">Privacy Policy</Link></li>
              <li><Link href="/faq">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Temp Mail Pro. All rights reserved.</p>
          <p className="footer-domain">www.mytempmail.pro</p>
        </div>
      </div>
    </footer>
  );
}
