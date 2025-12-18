import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Email Privacy Tips, Security Guides & Temporary Email News',
  description: 'Expert guides on email privacy, online security, spam protection, and how to use temporary email addresses. Learn to protect your digital identity with Temp Mail Pro.',
  keywords: [
    'email privacy blog',
    'temporary email tips',
    'online privacy guide',
    'spam protection tips',
    'email security blog',
    'disposable email guide',
    'privacy protection articles',
    'temp mail tips',
    'anonymous email guide',
    'email safety tips',
    'digital privacy blog',
    'anti spam guide',
    'phishing protection',
    'online security tips',
    'email best practices',
  ],
  alternates: {
    canonical: 'https://www.mytempmail.pro/blog',
  },
  openGraph: {
    title: 'Blog - Email Privacy Tips & Security Guides | Temp Mail Pro',
    description: 'Expert guides on email privacy, online security, and spam protection.',
    url: 'https://www.mytempmail.pro/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Email Privacy Tips | Temp Mail Pro',
    description: 'Expert guides on email privacy and online security.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
