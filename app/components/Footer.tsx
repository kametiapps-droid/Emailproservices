import Link from 'next/link';

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9 0 11-4s1-6.08 0-7c-1-.99-1.5-2.12-2.5-3.1z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.6 6.32c-1.63-1.6-3.8-2.48-6.1-2.48-4.76 0-8.63 3.87-8.63 8.63 0 1.52.39 3.01 1.14 4.32L2 22l4.6-1.2c1.27.68 2.7 1.04 4.16 1.04h.01c4.76 0 8.63-3.87 8.63-8.63 0-2.3-.9-4.46-2.54-6.09zM10.76 18.87h-.01c-1.3 0-2.57-.35-3.68-1.01l-.26-.16-2.7.71.72-2.65-.17-.27c-.78-1.24-1.19-2.67-1.19-4.13 0-3.96 3.22-7.18 7.18-7.18 1.92 0 3.72.75 5.07 2.1 1.35 1.36 2.09 3.16 2.09 5.08 0 3.96-3.22 7.18-7.18 7.18z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9 0 11-4s1-6.08 0-7c-1-.99-1.5-2.12-2.5-3.1z"/>
  </svg>
);

export default function Footer() {
  const siteUrl = 'https://mytempmail.pro';
  const shareText = 'Check out Temp Mail Pro - Get instant temporary disposable email addresses to protect your privacy online!';

  const socialLinks = [
    {
      name: 'Twitter',
      icon: TwitterIcon,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: LinkedInIcon,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + siteUrl)}`,
    },
    {
      name: 'Telegram',
      icon: TelegramIcon,
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
                      <link.icon />
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
