import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Service Agreement',
  description: 'Read Temp Mail Pro terms and conditions. Understand your rights and responsibilities when using our temporary email service.',
  keywords: [
    'temp mail pro terms',
    'temporary email terms of service',
    'disposable email conditions',
    'temp mail service agreement',
    'terms and conditions temp mail',
    'temp mail pro tos',
    'temporary email rules',
    'disposable email terms',
    'temp mail user agreement',
    'temp mail legal terms',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/terms',
  },
  openGraph: {
    title: 'Terms and Conditions | Temp Mail Pro',
    description: 'Service terms and conditions for using Temp Mail Pro.',
    url: 'https://www.mytempmail.pro/terms',
    type: 'website',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
