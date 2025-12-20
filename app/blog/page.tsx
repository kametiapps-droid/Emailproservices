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
          <h1>Temp Mail Blog</h1>
          <p>
            Expert insights on privacy, security, and digital protection. Stay informed about the latest threats and best practices.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        <div style={{ marginBottom: '60px' }}>
          <div style={{ marginBottom: '28px' }}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '10px',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                background: 'rgba(15, 23, 42, 0.8)',
                color: 'var(--text)',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.7)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.1)';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: '500', marginRight: '4px' }}>FILTER:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: !selectedCategory ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)',
                background: !selectedCategory ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '13px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (!selectedCategory) {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedCategory) {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border:
                    selectedCategory === category ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)',
                  background: selectedCategory === category ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = 'transparent';
                  }
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}
        >
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', height: '100%' }}
            >
              <article
                style={{
                  borderRadius: '14px',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(31, 41, 55, 0.3) 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(31, 41, 55, 0.5) 100%)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(31, 41, 55, 0.3) 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {post.featuredImage && (
                  <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={post.featuredImage} 
                      alt={post.imageAlt || post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLImageElement).style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                )}
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: 'rgb(59, 130, 246)',
                        whiteSpace: 'nowrap',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--text)', margin: '0 0 14px 0', lineHeight: '1.4' }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 20px 0', flex: 1, lineHeight: '1.6' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-dim)', borderTop: '1px solid rgba(59, 130, 246, 0.1)', paddingTop: '16px' }}>
                    <span>{post.date}</span>
                    <span style={{ fontWeight: '600' }}>{post.readTime} MIN READ</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)' }}>
              No articles found matching your search. Try different keywords or browse all categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
