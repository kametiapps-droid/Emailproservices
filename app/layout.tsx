import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Script from 'next/script';
import GoogleAnalytics from './GoogleAnalytics';




export const metadata: Metadata = {
  metadataBase: new URL('https://www.mytempmail.pro'),
  title: {
    default: 'Your Privacy-First Temporary Email Solution | Temp Mail Pro',
    template: '%s | Your Privacy-First Temporary Email Solution'
  },
  description: 'Generate disposable email addresses in one click. Protect your real inbox from spam, phishing, and unwanted newsletters.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
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
  authors: [{ name: 'Temp Mail Pro', url: 'https://www.mytempmail.pro' }],
  creator: 'Temp Mail Pro',
  publisher: 'Temp Mail Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.mytempmail.pro',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.mytempmail.pro',
    siteName: 'Temp Mail Pro',
    title: 'Temp Mail Pro - Free Temporary Disposable Email',
    description: 'Generate free temporary disposable email addresses instantly. Protect your privacy and use secure temporary email for testing. No registration required.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Temp Mail Pro - Free Temporary Email Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temp Mail - Temporary Disposable Email',
    description: 'Generate free temporary disposable email instantly. Privacy-focused email for testing and signup verification.',
    images: ['/logo.png'],
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
      '@id': 'https://www.mytempmail.pro/#website',
      url: 'https://www.mytempmail.pro',
      name: 'My Temp Mail Pro',
      alternateName: 'Temp Mail Pro',
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
      '@id': 'https://www.mytempmail.pro/#organization',
      name: 'Temp Mail Pro',
      alternateName: 'Temp Mail',
      url: 'https://www.mytempmail.pro',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://www.mytempmail.pro/#logo',
        url: 'https://www.mytempmail.pro/logo.png',
        contentUrl: 'https://www.mytempmail.pro/logo.png',
        width: 512,
        height: 512,
        caption: 'Temp Mail Pro',
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
      '@id': 'https://www.mytempmail.pro/#webapp',
      name: 'Temp Mail Pro',
      alternateName: 'Temp Mail',
      url: 'https://www.mytempmail.pro',
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
      '@id': 'https://www.mytempmail.pro/faq#faqpage',
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
          item: 'https://www.mytempmail.pro',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        
        <GoogleAnalytics />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Temp Mail Pro" />
        
        <link rel="canonical" href="https://www.mytempmail.pro" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pl28355048.effectivegatecpm.com" />
        <link rel="preconnect" href="https://www.highperformanceformat.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9600331042737400"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="adsterra-social-bar"
          src="//pl28354972.effectivegatecpm.com/f0/6a/0a/f06a0a03332463f8205466b078028f80.js"
          strategy="lazyOnload"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body data-theme="light" className="inter-font" suppressHydrationWarning>
        <Header />
        <div suppressHydrationWarning>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
