import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions About Temporary Email',
  description: 'Find answers to common questions about temporary email, disposable email addresses, privacy protection, and how Temp Mail Pro works. Get help with temp mail.',
  keywords: [
    'temporary email FAQ',
    'temp mail questions',
    'disposable email help',
    'how does temp mail work',
    'temporary email guide',
    'temp mail help',
    'disposable email FAQ',
    'anonymous email questions',
    'temp mail tutorial',
    'email privacy FAQ',
    'throwaway email help',
    'burner email FAQ',
    'temporary inbox help',
    'temp mail support',
    'disposable mail questions',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/faq',
  },
  openGraph: {
    title: 'FAQ - Temporary Email Questions Answered | Temp Mail Pro',
    description: 'Find answers to common questions about temporary email and privacy protection.',
    url: 'https://www.mytempmail.pro/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Temp Mail Questions | Temp Mail Pro',
    description: 'Common questions about temporary email answered.',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
