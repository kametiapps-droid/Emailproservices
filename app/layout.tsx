import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Temp Mail Pro – Free Temporary Disposable Email Service',
  description: 'Temp Mail Pro provides free temporary disposable email addresses to protect your privacy. Instantly receive verification emails without registration.',
  keywords: 'temporary email, disposable email, temp mail, fake email, anonymous email, privacy email',
  authors: [{ name: 'Temp Mail Pro' }],
  openGraph: {
    title: 'Temp Mail Pro – Free Temporary Disposable Email Service',
    description: 'Temp Mail Pro provides free temporary disposable email addresses to protect your privacy. Instantly receive verification emails without registration.',
    url: 'https://www.mytempmail.pro',
    siteName: 'Temp Mail Pro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temp Mail Pro – Free Temporary Disposable Email Service',
    description: 'Temp Mail Pro provides free temporary disposable email addresses to protect your privacy.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.mytempmail.pro" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
