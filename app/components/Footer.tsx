import Link from 'next/link';

export default function Footer() {
  const siteUrl = 'https://mytempmail.pro';
  const shareText = 'Check out Temp Mail Pro - Get instant temporary disposable email addresses to protect your privacy online!';

  const socialLinks = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      icon: 'f',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: 'in',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: 'wa',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + siteUrl)}`,
    },
    {
      name: 'Telegram',
      icon: 'tg',
      url: `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h2 className="footer-logo">Temp Mail Pro</h2>
              <p className="footer-tagline">
                Secure, instant disposable email addresses to protect your privacy online.
              </p>
              <div className="footer-social">
                <p className="social-label">Share with us:</p>
                <div className="social-links">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      title={`Share on ${link.name}`}
                      aria-label={`Share on ${link.name}`}
                    >
                      <span className="social-icon">{link.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="footer-nav">
              <div className="footer-nav-group">
                <h3>Product</h3>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/use-cases">Use Cases</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                </ul>
              </div>
              
              <div className="footer-nav-group">
                <h3>Support</h3>
                <ul>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/reviews">Reviews</Link></li>
                </ul>
              </div>
              
              <div className="footer-nav-group">
                <h3>Legal</h3>
                <ul>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms & Conditions</Link></li>
                  <li><Link href="/disclaimer">Disclaimer</Link></li>
                  <li><Link href="/copyright">Copyright</Link></li>
                </ul>
              </div>
              
              <div className="footer-nav-group">
                <h3>Company</h3>
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
