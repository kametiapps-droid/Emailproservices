import Link from 'next/link';

export default function Footer() {
  const siteUrl = 'https://mytempmail.pro';
  const shareText = 'Check out Temp Mail Pro - Get instant temporary disposable email addresses to protect your privacy online!';

  const socialLinks = [
    {
      name: 'Twitter',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-5.5 9-5.5s4 5 0 10c-4 5-9 7-15 7-6 0-11-5-11-5"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.659 1.189-1.599 2.898-1.599 2.117 0 3.704 1.379 3.704 4.342v5.539zM5.337 9.433c-1.144 0-1.915-.759-1.915-1.71 0-.951.77-1.71 1.954-1.71 1.184 0 1.915.759 1.915 1.71 0 .951-.73 1.71-1.954 1.71zm1.6 11.019H3.738V9.806h3.199v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.652 0-3.278-.621-4.475-1.749-1.197-1.129-1.846-2.629-1.846-4.16 0-3.227 2.627-5.852 5.853-5.852 1.564 0 3.031.611 4.135 1.719 1.104 1.108 1.71 2.58 1.71 4.134 0 3.227-2.627 5.858-5.853 5.858m5.854-11.667C19.582 1.962 17.292 1 14.976 1 7.755 1 1.9 6.855 1.9 14.076c0 2.408.629 4.776 1.82 6.86L1 23l6.305-1.654c2.007 1.095 4.26 1.674 6.59 1.674 7.22 0 13.077-5.853 13.077-13.074 0-3.493-1.36-6.777-3.831-9.22Z"/>
        </svg>
      ),
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + siteUrl)}`,
    },
    {
      name: 'Telegram',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.954-.14.579.192l-8.533 7.701h-.002a.498.498 0 0 0-.247.463l-.972 6.923c-.137.996.3 1.573 1.167 1.573.408 0 .809-.14 1.208-.427l2.664-2.265 5.494 4.053c1.02.753 1.734.357 1.997-.923l3.311-15.766c.432-1.651-.742-2.424-2.064-1.898Z"/>
        </svg>
      ),
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
                      <span className="social-icon">{link.icon as React.ReactNode}</span>
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
