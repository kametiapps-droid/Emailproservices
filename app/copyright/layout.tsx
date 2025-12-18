import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copyright Disclaimer - Intellectual Property',
  description: 'Read copyright information for Temp Mail Pro. Learn about intellectual property rights and DMCA compliance.',
  keywords: [
    'temp mail pro copyright',
    'temporary email copyright',
    'disposable email intellectual property',
    'temp mail dmca',
    'temporary email legal',
    'temp mail pro ip',
    'copyright notice temp mail',
    'temp mail trademark',
    'disposable email copyright',
    'temp mail legal rights',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/copyright',
  },
  openGraph: {
    title: 'Copyright Disclaimer | Temp Mail Pro',
    description: 'Copyright and intellectual property information.',
    url: 'https://www.mytempmail.pro/copyright',
    type: 'website',
  },
};

export default function CopyrightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
