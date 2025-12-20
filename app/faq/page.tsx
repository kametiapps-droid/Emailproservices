'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'Do I need to register to use Temp Mail Pro?',
    answer: 'No! Temp Mail Pro is completely free and requires no registration. Simply visit our website and instantly get a temporary email address.'
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'How quickly can I get an email address?',
    answer: 'Instantly! With just one click, you will get a new, unique temporary email address. It\'s ready to use immediately.'
  },
  {
    id: '3',
    category: 'Getting Started',
    question: 'Can I forward emails from my current email?',
    answer: 'Yes, you can view all emails received through Temp Mail Pro. See all messages directly in the inbox and forward them to your real email if needed.'
  },
  {
    id: '4',
    category: 'Security & Privacy',
    question: 'Is Temp Mail Pro secure?',
    answer: 'Absolutely! We take your privacy protection very seriously. All emails are encrypted, and we never sell or share your personal information. Our servers use the most modern security protocols.'
  },
  {
    id: '5',
    category: 'Security & Privacy',
    question: 'Are my emails private?',
    answer: 'Yes, all emails are completely private. No one else can access your temporary email address. Only you can see the emails you receive.'
  },
  {
    id: '6',
    category: 'Security & Privacy',
    question: 'Are you protected against spam and malware?',
    answer: 'We have advanced filtering that blocks spam and malware. If you receive any suspicious email, you can block it immediately.'
  },
  {
    id: '7',
    category: 'Email Usage',
    question: 'How long will my temporary email address work?',
    answer: '24 hours! Your temporary email address is automatically deleted after 24 hours. If you need more time, you can extend it or create a new one.'
  },
  {
    id: '8',
    category: 'Email Usage',
    question: 'Can I change my email address?',
    answer: 'Yes! You can get a new temporary email address whenever you want. Just click the "New Email" button.'
  },
  {
    id: '9',
    category: 'Email Usage',
    question: 'Can I send emails?',
    answer: 'Temp Mail Pro is primarily for receiving emails. You can receive emails, but you cannot send directly from the temporary email. However, you can forward emails to your real email.'
  },
  {
    id: '10',
    category: 'Technical',
    question: 'Can I use Temp Mail Pro on mobile?',
    answer: 'Absolutely! Temp Mail Pro is fully mobile-friendly. It works seamlessly on both iOS and Android.'
  },
  {
    id: '11',
    category: 'Technical',
    question: 'What should I do if I have an issue?',
    answer: 'If you encounter any problems, please visit our Contact page. Our team will help you as soon as possible.'
  },
  {
    id: '12',
    category: 'Technical',
    question: 'Is there an API for Temp Mail Pro?',
    answer: 'Yes! We have a powerful API that you can use in your applications. Check the API Docs page for documentation.'
  },
  {
    id: '13',
    category: 'Pricing & Plans',
    question: 'Is this completely free?',
    answer: 'Yes! Temp Mail Pro is completely free. No hidden costs, no subscriptions. Use it as much as you want.'
  },
  {
    id: '14',
    category: 'Pricing & Plans',
    question: 'Is there a premium version?',
    answer: 'Not currently, but we may add premium features in the future. All features are free right now.'
  },
  {
    id: '15',
    category: 'Use Cases',
    question: 'When should I use Temp Mail Pro?',
    answer: 'Use it for: online shopping, free trials, website signups, avoiding spam, and when you don\'t want to share your real email.'
  },
  {
    id: '16',
    category: 'Use Cases',
    question: 'Is this illegal?',
    answer: 'No! Temp Mail Pro is completely legal. Use it for privacy protection. However, it\'s wrong to use it for fraud or harmful activities.'
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about Temp Mail Pro</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        {/* Search Bar */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto 40px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid var(--border-light)',
              background: 'var(--surface-light)',
              color: 'var(--text)',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.background = 'var(--surface)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.background = 'var(--surface-light)';
            }}
          />
          <svg
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: 'var(--text-dim)',
              pointerEvents: 'none'
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '40px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: selectedCategory === null ? '2px solid var(--primary)' : '1px solid var(--border)',
              background: selectedCategory === null ? 'var(--glass)' : 'transparent',
              color: selectedCategory === null ? 'var(--primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== null) {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== null) {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: selectedCategory === category ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: selectedCategory === category ? 'var(--glass)' : 'transparent',
                color: selectedCategory === category ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {filteredFAQs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredFAQs.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: expandedId === item.id
                      ? 'linear-gradient(135deg, rgba(30, 41, 82, 0.8) 0%, rgba(30, 41, 82, 0.6) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
                    borderRadius: '12px',
                    border: expandedId === item.id
                      ? '1px solid rgba(59, 130, 246, 0.6)'
                      : '1px solid rgba(59, 130, 246, 0.2)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    style={{
                      width: '100%',
                      padding: '20px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%'
                      }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h2 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: 0,
                        color: 'var(--text)'
                      }}>
                        {item.question}
                      </h2>
                      <p style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        margin: '6px 0 0 0',
                        fontWeight: '500'
                      }}>
                        {item.category}
                      </p>
                    </div>
                    <svg
                      style={{
                        width: '20px',
                        height: '20px',
                        color: 'var(--text-dim)',
                        transform: expandedId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>

                  {expandedId === item.id && (
                    <div style={{
                      padding: '0 20px 20px',
                      borderTop: '1px solid rgba(59, 130, 246, 0.1)',
                      animation: 'slideDown 0.3s ease-out'
                    }}>
                      <p style={{
                        color: 'var(--text-muted)',
                        lineHeight: '1.8',
                        fontSize: '15px',
                        margin: 0
                      }}>
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-muted)'
            }}>
              <svg
                style={{
                  width: '56px',
                  height: '56px',
                  margin: '0 auto 20px',
                  opacity: 0.3
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--text)'
              }}>
                No results found
              </h2>
              <p>Try changing your search or select a different category</p>
            </div>
          )}
        </div>

        {/* Additional Help */}
        <div style={{
          maxWidth: '800px',
          margin: '80px auto 0',
          textAlign: 'center',
          paddingTop: '60px',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--text)' }}>
            Need more help?
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            If you didn\'t find your answer here, please contact us
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
              border: 'none',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
