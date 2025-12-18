import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - How We Protect Your Data',
  description: 'Read Temp Mail Pro privacy policy. Learn how we collect, use, and protect your personal data. Your privacy is our top priority.',
  keywords: [
    'temp mail pro privacy policy',
    'temporary email privacy',
    'disposable email data protection',
    'temp mail data security',
    'privacy policy temp mail',
    'how we protect your data',
    'temp mail pro gdpr',
    'temporary email security',
    'disposable email privacy',
    'temp mail user rights',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Temp Mail Pro',
    description: 'How we protect your data and privacy.',
    url: 'https://www.mytempmail.pro/privacy',
    type: 'website',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
