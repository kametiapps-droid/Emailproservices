import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blogData';
import BlogFAQ from '@/app/components/BlogFAQ';
import Script from 'next/script';

function renderContentWithLinks(text: string) {
  // Handle both [text](url) markdown style links and Temp Mail
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)|Temp Mail/g;
  const parts: (string | { type: 'link' | 'text'; text: string; href?: string })[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (lastIndex < match.index) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Markdown link [text](url)
      parts.push({ type: 'link', text: match[1], href: match[2] });
    } else if (match[0] === 'Temp Mail') {
      // Temp Mail link
      parts.push({ type: 'link', text: 'Temp Mail', href: '/' });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.map((part, idx) => {
    if (typeof part === 'string') {
      return <span key={idx}>{part}</span>;
    }
    return (
      <Link key={idx} href={part.href!} style={{ color: 'rgb(59, 130, 246)', textDecoration: 'none', fontWeight: '500' }}>
        {part.text}
      </Link>
    );
  });
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  const url = post ? `https://mytempmail.pro/blog/${post.slug}` : 'https://mytempmail.pro/blog';
  
  return {
    title: `${post.title} | Temp Mail Pro Blog`,
    description: post.excerpt,
    keywords: [
      post.category.toLowerCase(),
      'temporary email',
      'email privacy',
      'online security',
      'email protection',
      ...post.title.split(' ').slice(0, 5)
    ],
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Temp Mail Pro`,
      description: post.excerpt,
      url: url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category, 'temporary email', 'privacy', 'security'],
      images: post.featuredImage ? [
        {
          url: `https://mytempmail.pro${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
          type: 'image/webp',
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Temp Mail Pro`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const schemaData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage ? `https://mytempmail.pro${post.featuredImage}` : "https://mytempmail.pro/favicon.png",
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": "https://mytempmail.pro"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Temp Mail Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mytempmail.pro/favicon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mytempmail.pro/blog/${post.slug}`
    }
  });

  return (
    <div className="page-container">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaData,
        }}
      />
      <section className="hero" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container">
          <Link 
            href="/blog" 
            style={{ 
              color: 'rgb(59, 130, 246)',
              textDecoration: 'none',
              fontSize: '14px',
              marginBottom: '20px',
              display: 'inline-block'
            }}
          >
            ← Back to Blog
          </Link>
        </div>
      </section>

      <div className="container" style={{ marginTop: '20px', marginBottom: '60px' }}>
        <article>
          <header style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <span
                style={{
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  color: 'rgb(59, 130, 246)'
                }}
              >
                {post.category}
              </span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text)', margin: '0 0 16px 0' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
              <span>{post.date}</span>
              <span>{post.readTime} min read</span>
              <span>By {post.author}</span>
            </div>
          </header>

          {post.featuredImage && (
            <div style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              marginBottom: '40px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'rgba(59, 130, 246, 0.1)'
            }}>
              <Image
                src={post.featuredImage}
                alt={post.imageAlt || post.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                priority
              />
            </div>
          )}

          <div
            style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--text-muted)',
              marginBottom: '40px'
            }}
          >
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2
                    key={idx}
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      marginTop: '30px',
                      marginBottom: '15px',
                      color: 'var(--text)',
                      borderLeft: '3px solid rgba(59, 130, 246, 0.5)',
                      paddingLeft: '15px'
                    }}
                  >
                    {renderContentWithLinks(paragraph.replace('## ', ''))}
                  </h2>
                );
              }
              if (paragraph.startsWith('**')) {
                return (
                  <p key={idx} style={{ marginBottom: '15px', fontWeight: '600' }}>
                    {renderContentWithLinks(paragraph.replace(/\*\*/g, ''))}
                  </p>
                );
              }
              return (
                <p key={idx} style={{ marginBottom: '15px' }}>
                  {renderContentWithLinks(paragraph)}
                </p>
              );
            })}
          </div>

          <BlogFAQ items={post.faqItems} />

          <div
            style={{
              background: 'rgba(59, 130, 246, 0.05)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(59, 130, 246, 0.1)',
              marginTop: '60px'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>👤</span>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '8px', fontSize: '16px' }}>
                  Temp Mail Pro Team
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '12px' }}>
                  Privacy & security experts at Temp Mail Pro.
                  <br />
                  Passionate about helping users protect their digital identity.
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '13px', color: 'var(--text-muted)' }}>
                  We publish research-based articles to help users understand
                  privacy-friendly email practices and online safety.
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
