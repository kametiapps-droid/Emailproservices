import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Temp Mail Pro | Email Privacy Tips & News',
  description: 'Stay updated with the latest email privacy tips, security news, and best practices for protecting your online identity with temporary email addresses.',
};

const blogPosts = [
  {
    id: 1,
    slug: 'why-temporary-email-matters',
    title: 'Why Temporary Email Matters in 2024',
    excerpt: 'Learn why disposable email addresses have become essential for protecting your privacy in the digital age.',
    date: 'December 15, 2024',
    category: 'Privacy',
    readTime: '5 min read'
  },
  {
    id: 2,
    slug: 'protect-from-spam',
    title: 'How to Protect Your Inbox from Spam',
    excerpt: 'Discover effective strategies to keep your primary inbox clean and spam-free using temporary emails.',
    date: 'December 10, 2024',
    category: 'Tips',
    readTime: '4 min read'
  },
  {
    id: 3,
    slug: 'email-verification-hacks',
    title: 'Smart Ways to Handle Email Verification',
    excerpt: 'Tips and tricks for managing email verifications without exposing your real email address.',
    date: 'December 5, 2024',
    category: 'How-to',
    readTime: '6 min read'
  },
  {
    id: 4,
    slug: 'data-privacy-basics',
    title: 'Data Privacy Basics Everyone Should Know',
    excerpt: 'A comprehensive guide to understanding data privacy and how to protect your personal information online.',
    date: 'November 28, 2024',
    category: 'Security',
    readTime: '8 min read'
  },
  {
    id: 5,
    slug: 'temp-email-vs-email-aliases',
    title: 'Temporary Email vs Email Aliases: Which is Better?',
    excerpt: 'Compare the pros and cons of temporary emails and email aliases to find the best solution for your needs.',
    date: 'November 20, 2024',
    category: 'Comparison',
    readTime: '7 min read'
  },
  {
    id: 6,
    slug: 'online-shopping-privacy',
    title: 'Stay Anonymous While Shopping Online',
    excerpt: 'How to protect your identity and reduce marketing spam when shopping on e-commerce websites.',
    date: 'November 15, 2024',
    category: 'Tips',
    readTime: '5 min read'
  }
];

export default function BlogPage() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>Blog</h1>
          <p>Privacy tips, security news, and best practices for email protection</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-header">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="blog-read-time">{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="blog-read-more">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Protect Your Privacy?</h2>
            <p>Get your free temporary email address in seconds</p>
            <Link href="/" className="btn btn-primary btn-large">
              Get Free Temp Email
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
