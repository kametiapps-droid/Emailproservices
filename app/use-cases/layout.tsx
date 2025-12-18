import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use Cases - How to Use Temporary Email for Privacy Protection',
  description: 'Discover how to use temporary email for online shopping, free trials, website signups, social media, gaming, and more. Protect your privacy with Temp Mail Pro.',
  keywords: [
    'temporary email use cases',
    'how to use temp mail',
    'disposable email for shopping',
    'temp mail for free trials',
    'anonymous email for signup',
    'temporary email for verification',
    'disposable email uses',
    'when to use temp mail',
    'temp mail for testing',
    'throwaway email purposes',
    'burner email use cases',
    'temporary email applications',
    'disposable email benefits',
    'temp mail advantages',
    'why use temporary email',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/use-cases',
  },
  openGraph: {
    title: 'Use Cases - Temporary Email Applications | Temp Mail Pro',
    description: 'Discover how to use temporary email for privacy protection in everyday scenarios.',
    url: 'https://www.mytempmail.pro/use-cases',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temporary Email Use Cases | Temp Mail Pro',
    description: 'How to use temporary email for privacy protection.',
  },
};

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
