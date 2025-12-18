import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mytempmail.pro'),
  title: {
    default: 'Temp Mail Pro - Free Temporary Disposable Email Generator | 10 Minute Mail',
    template: '%s | Temp Mail Pro'
  },
  description: 'Generate free temporary disposable email addresses instantly. Protect your privacy with anonymous temp mail, 10 minute mail, fake email generator. No registration required. Auto-expires in 24 hours.',
  keywords: [
    'temporary email',
    'temp mail',
    'disposable email',
    'fake email',
    'anonymous email',
    '10 minute mail',
    'throwaway email',
    'temporary email address',
    'free temp mail',
    'disposable email address',
    'temporary mail',
    'fake email generator',
    'temp email',
    'burner email',
    'trash mail',
    'guerrilla mail alternative',
    'mailinator alternative',
    'temporary inbox',
    'anonymous mail',
    'privacy email',
    'spam free email',
    'one time email',
    'temporary email service',
    'free disposable email',
    'email generator',
    'temp mail pro',
    'instant email',
    'quick email',
    'secure temporary email',
    'private email',
    'no registration email',
    'verification email',
    'signup email',
    'test email',
    'temporary email for verification',
    'free fake email',
    'random email generator',
    'anonymous inbox',
    'temp mail address',
    'disposable inbox',
    'temporary email inbox',
    'free anonymous email',
    'temporary email generator',
    'email privacy',
    'anti spam email',
    'temporary email online',
    'create temp email',
    'get temporary email',
    'temporary email free',
    'best temp mail',
    'top temporary email',
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
    title: 'Temp Mail Pro - Free Temporary Disposable Email Generator',
    description: 'Generate free temporary disposable email addresses instantly. Protect your privacy with anonymous temp mail. No registration required.',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'Temp Mail Pro - Free Temporary Email Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temp Mail Pro - Free Temporary Disposable Email',
    description: 'Generate free temporary disposable email addresses instantly. Protect your privacy online.',
    images: ['/favicon.png'],
    creator: '@tempmailpro',
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
    google: 'your-google-verification-code',
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
      name: 'Temp Mail Pro',
      description: 'Free temporary disposable email service',
      publisher: {
        '@id': 'https://www.mytempmail.pro/#organization',
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
      url: 'https://www.mytempmail.pro',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://www.mytempmail.pro/#logo',
        url: 'https://www.mytempmail.pro/favicon.png',
        contentUrl: 'https://www.mytempmail.pro/favicon.png',
        width: 512,
        height: 512,
        caption: 'Temp Mail Pro',
      },
      image: { '@id': 'https://www.mytempmail.pro/#logo' },
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
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.mytempmail.pro" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e27" />
        <meta name="msapplication-TileColor" content="#0a0e27" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Temp Mail Pro" />
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
