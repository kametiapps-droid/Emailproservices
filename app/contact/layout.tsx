import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get Support for Temp Mail Pro',
  description: 'Contact Temp Mail Pro support team for help with temporary email, technical support, feature requests, or partnership inquiries. We respond within 24 hours.',
  keywords: [
    'contact temp mail pro',
    'temp mail support',
    'temporary email help',
    'disposable email contact',
    'temp mail customer service',
    'temp mail pro support',
    'email temp mail team',
    'temp mail assistance',
    'temporary email support',
    'temp mail feedback',
    'contact disposable email',
    'temp mail inquiry',
    'temp mail pro help',
    'get help temp mail',
    'temp mail questions',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/contact',
  },
  openGraph: {
    title: 'Contact Us - Support | Temp Mail Pro',
    description: 'Contact our support team for help with temporary email services.',
    url: 'https://www.mytempmail.pro/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Temp Mail Pro Support',
    description: 'Get help with temporary email services.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
