import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Script from 'next/script';

const criticalCSS = `
body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%); color: #ffffff; }
.site-header { position: sticky; top: 0; z-index: 1000; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 20px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.15); }
.hero { text-align: center; padding: 56px 0 40px; background: linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%); }
.hero h1 { font-size: 2.75rem; margin-bottom: 16px; font-weight: 700; letter-spacing: -0.03em; }
.email-box { background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%); border-radius: 20px; padding: 40px; margin: 40px auto; max-width: 560px; border: 1px solid rgba(255, 255, 255, 0.1); }
`;

export const metadata: Metadata = {
  metadataBase: new URL('https://mytempmail.pro'),
  title: {
    default: 'Temp Mail - Free Temporary Disposable Email for Privacy & Testing',
    template: '%s | Temp Mail'
  },
  description: 'Generate free temporary disposable email addresses instantly. Protect your privacy and test services without spam. Privacy-focused email for testing, shopping, and signup verification. No registration required. Auto-expires in 24 hours.',
  keywords: [
    'temporary email',
    'temp mail',
    'disposable email',
    'privacy-focused email',
    'email for testing',
    'temporary email address',
    'free temp mail',
    'disposable email address',
    'temporary mail',
    'disposable email generator',
    'temp email',
    'email generator',
    'temp mail pro',
    'instant email',
    'quick email',
    'secure temporary email',
    'private email',
    'test email',
    'email for signup',
    'temporary email for verification',
    'random email generator',
    'temp mail address',
    'disposable inbox',
    'temporary email inbox',
    'temporary email generator',
    'email privacy',
    'spam protection',
    'temporary email service',
    'free disposable email',
    'no registration email',
    'verification email',
    'sign up email',
    'temporary email online',
    'create temp email',
    'get temporary email',
    'temporary email free',
    'best temp mail',
    'top temporary email',
    'secure temp mail',
    'limited-time email',
    'email privacy protection',
    'inbox management',
    'anti-spam email',
    'email for shopping',
    'test email address',
    'temporary inbox',
  ],
  authors: [{ name: 'Temp Mail', url: 'https://mytempmail.pro' }],
  creator: 'Temp Mail',
  publisher: 'Temp Mail',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://mytempmail.pro',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mytempmail.pro',
    siteName: 'Temp Mail',
    title: 'Temp Mail - Free Temporary Disposable Email',
    description: 'Generate free temporary disposable email addresses instantly. Protect your privacy and use secure temporary email for testing. No registration required.',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'Temp Mail - Free Temporary Email Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temp Mail - Temporary Disposable Email',
    description: 'Generate free temporary disposable email instantly. Privacy-focused email for testing and signup verification.',
    images: ['/favicon.png'],
    creator: '@tempmail',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google16d5a87599c45f6c',
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://mytempmail.pro/#website',
      url: 'https://mytempmail.pro',
      name: 'Temp Mail',
      description: 'Free temporary disposable email service',
      publisher: {
        '@id': 'https://mytempmail.pro/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.mytempmail.pro/?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': 'https://mytempmail.pro/#organization',
      name: 'Temp Mail',
      url: 'https://mytempmail.pro',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://mytempmail.pro/#logo',
        url: 'https://mytempmail.pro/favicon.png',
        contentUrl: 'https://mytempmail.pro/favicon.png',
        width: 512,
        height: 512,
        caption: 'Temp Mail',
      },
      image: { '@id': 'https://mytempmail.pro/#logo' },
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'Contact@mytempmail.pro',
        availableLanguage: ['English'],
      },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://mytempmail.pro/#webapp',
      name: 'Temp Mail',
      url: 'https://mytempmail.pro',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '2847',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'Instant temporary email generation',
        'No registration required',
        'Auto-delete after 24 hours',
        'Receive emails instantly',
        'Mobile friendly interface',
        'QR code sharing',
        'Multiple domain support',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://mytempmail.pro/faq#faqpage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is temporary email?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Temporary email is a disposable email address that expires after a set time, protecting your privacy from spam and unwanted messages.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Temp Mail Pro free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Temp Mail Pro is completely free. No registration, no credit card, no hidden fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long do emails last?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Temporary emails automatically expire after 24 hours, ensuring your privacy is protected.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.mytempmail.pro/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://mytempmail.pro',
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link rel="canonical" href="https://mytempmail.pro" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e27" />
        <meta name="msapplication-TileColor" content="#0a0e27" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Temp Mail" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
