import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - Important Information',
  description: 'Read the disclaimer for Temp Mail Pro. Understand the limitations and proper use of our temporary email service.',
  keywords: [
    'temp mail pro disclaimer',
    'temporary email disclaimer',
    'disposable email limitations',
    'temp mail legal disclaimer',
    'temporary email legal',
    'disposable email disclaimer',
    'temp mail liability',
    'temporary email notice',
    'temp mail pro legal',
    'disposable email legal notice',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer | Temp Mail Pro',
    description: 'Important disclaimer information for Temp Mail Pro.',
    url: 'https://www.mytempmail.pro/disclaimer',
    type: 'website',
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
