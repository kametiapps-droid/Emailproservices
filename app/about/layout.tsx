import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Temp Mail Pro Mission & Team',
  description: 'Learn about Temp Mail Pro, our mission to protect online privacy, and why we created the best free temporary email service.',
  keywords: [
    'about temp mail pro',
    'temporary email company',
    'disposable email service about',
    'who made temp mail pro',
    'temp mail pro team',
    'temp mail pro mission',
    'about disposable email',
    'temp mail pro story',
    'temporary email about us',
    'temp mail pro info',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/about',
  },
  openGraph: {
    title: 'About Us | Temp Mail Pro',
    description: 'Learn about Temp Mail Pro and our mission to protect online privacy.',
    url: 'https://www.mytempmail.pro/about',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
