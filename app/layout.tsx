import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My-Mailer.Pro - Temporary Email Service',
  description: 'Free temporary email service. Protect your privacy with disposable email addresses that expire in 24 hours.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
