'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blogData';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Temp Mail Pro Blog</h1>
          <p>
            Expert insights on privacy, security, and digital protection. Stay informed about the latest threats and
            best practices.
          </p>
        </div>
      </section>

      <div className="container">
        <div style={{ marginBottom: '40px', marginTop: '40px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                background: 'rgba(15, 23, 42, 0.5)',
                color: 'var(--text)',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: !selectedCategory ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)',
                background: !selectedCategory ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border:
                    selectedCategory === category ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)',
                  background: selectedCategory === category ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}
        >
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article
                style={{
                  padding: 0,
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  background: 'rgba(15, 23, 42, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
                }}
              >
                {post.featuredImage && (
                  <img 
                    src={post.featuredImage} 
                    alt={post.imageAlt || post.title}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>
                      {post.title}
                    </h2>
                    <span
                      style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: 'rgb(59, 130, 246)',
                        whiteSpace: 'nowrap',
                        marginLeft: '8px'
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 16px 0', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <span>{post.date}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
