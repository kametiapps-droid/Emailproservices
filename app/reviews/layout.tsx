import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews - User Feedback & Ratings for Temp Mail Pro',
  description: 'Read real user reviews and ratings for Temp Mail Pro temporary email service. See what customers say about our fast, secure disposable email solution.',
  keywords: [
    'temp mail pro reviews',
    'temporary email reviews',
    'disposable email ratings',
    'temp mail feedback',
    'best temp mail review',
    'temporary email testimonials',
    'user reviews temp mail',
    'temp mail pro ratings',
    'disposable email service review',
    'anonymous email reviews',
    'temp mail customer feedback',
    'temporary email user experience',
    'best disposable email review',
    'temp mail pro testimonials',
    'fake email service reviews',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/reviews',
  },
  openGraph: {
    title: 'Reviews - Customer Feedback | Temp Mail Pro',
    description: 'Read real user reviews and ratings for Temp Mail Pro temporary email service.',
    url: 'https://www.mytempmail.pro/reviews',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reviews & Ratings | Temp Mail Pro',
    description: 'Real user reviews for Temp Mail Pro.',
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
