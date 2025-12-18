import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="footer-logo">Temp Mail Pro</h3>
              <p className="footer-tagline">
                Secure, instant disposable email addresses to protect your privacy online.
              </p>
            </div>
            
            <div className="footer-nav">
              <div className="footer-nav-group">
                <h4>Product</h4>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/use-cases">Use Cases</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                </ul>
              </div>
              
              <div className="footer-nav-group">
                <h4>Support</h4>
                <ul>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/reviews">Reviews</Link></li>
                </ul>
              </div>
              
              <div className="footer-nav-group">
                <h4>Legal</h4>
                <ul>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms & Conditions</Link></li>
                  <li><Link href="/disclaimer">Disclaimer</Link></li>
                  <li><Link href="/copyright">Copyright</Link></li>
                </ul>
              </div>
              
              <div className="footer-nav-group">
                <h4>Company</h4>
                <ul>
                  <li><Link href="/about">About Us</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Temp Mail Pro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
