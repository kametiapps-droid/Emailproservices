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
    answer: 'No! Temp Mail Pro is a free temp mail pro generator that requires no registration. Simply visit our website and instantly get a temporary email address or a burner email address for privacy.'
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'How quickly can I get an email address?',
    answer: 'Instantly! With our fast temporary email service, you get a new, unique temporary inbox online immediately. It\'s the best fake email generator for quick email sign up.'
  },
  {
    id: '3',
    category: 'Getting Started',
    question: 'Can I use this for apps and trials?',
    answer: 'Yes! Our users use it as a temp mail for apps, temp mail for games, and even temporary email for netflix signup or shopping. It\'s an excellent anonymous email tool for free trials.'
  },
  {
    id: '4',
    category: 'Security & Privacy',
    question: 'Is Temp Mail Pro a secure temp mail service?',
    answer: 'Absolutely! We offer a secure temp mail service with spam protection email features. Your private temp mail is encrypted, providing safe disposable email access to avoid spam emails.'
  },
  {
    id: '5',
    category: 'Security & Privacy',
    question: 'Is it an online inbox with no sign up?',
    answer: 'Yes, Temp Mail Pro is an online inbox with no sign up required. It serves as a burner mailbox online or a throwaway email to protect your email privacy protection.'
  },
  {
    id: '6',
    category: 'Security & Privacy',
    question: 'Is it adsense friendly?',
    answer: 'Yes, our platform uses adsense safe email terms and follows legal safe temporary email practices. We provide a clean email inbox and email without login for all users.'
  },
  {
    id: '7',
    category: 'Email Usage',
    question: 'How long does the temporary inbox online last?',
    answer: 'Your temporary email for testing or signups lasts for 24 hours. This short term email address is a great temporary gmail alternative for online verification.'
  },
  {
    id: '8',
    category: 'Technical',
    question: 'Is there a developer test email API?',
    answer: 'Yes! Our cloud temp mail service includes a powerful API. It\'s a perfect testing email inbox tool for developers needing temp mail for coding platforms.'
  },
  {
    id: '9',
    category: 'Pricing & Plans',
    question: 'Is this the best free temp mail generator?',
    answer: 'We strive to be the best temp mail service. It is completely free with no registration email service required. Use it as a professional temp mail tool for your projects.'
  },
  {
    id: '10',
    category: 'Use Cases',
    question: 'Can I use it for social media?',
    answer: 'Yes, many use it as temp mail for discord, temp mail for instagram, or temp mail for facebook. It also works for temp mail for telegram, tiktok, and more.'
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
    question: 'Is this legal?',
    answer: 'Yes! Temp Mail Pro is completely legal. Use it for privacy protection and testing. However, always comply with website terms of service and applicable laws when using the service.'
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
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {filteredFAQs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
              {filteredFAQs.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.5) 0%, rgba(30, 41, 82, 0.3) 100%)',
                    borderRadius: '16px',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: expandedId === item.id
                      ? '0 20px 45px rgba(59, 130, 246, 0.15)'
                      : '0 8px 24px rgba(0, 0, 0, 0.12)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (expandedId !== item.id) {
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.12)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (expandedId !== item.id) {
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    style={{
                      width: '100%',
                      padding: '24px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '16px',
                      textAlign: 'left',
                      flex: 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      flex: 1
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        ❓
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{
                          fontSize: '15px',
                          fontWeight: '700',
                          margin: 0,
                          color: 'var(--text)',
                          lineHeight: '1.4'
                        }}>
                          {item.question}
                        </h2>
                        <div style={{
                          display: 'flex',
                          gap: '8px',
                          marginTop: '10px',
                          flexWrap: 'wrap'
                        }}>
                          <span
                            style={{
                              fontSize: '11px',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                              color: 'rgba(59, 130, 246, 0.9)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <svg
                        style={{
                          width: '20px',
                          height: '20px',
                          color: 'var(--text-dim)',
                          transform: expandedId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </button>

                  {expandedId === item.id && (
                    <div style={{
                      padding: '0 24px 24px',
                      borderTop: '1px solid rgba(59, 130, 246, 0.1)',
                      animation: 'slideDown 0.3s ease-out'
                    }}>
                      <div style={{
                        background: 'rgba(59, 130, 246, 0.05)',
                        borderLeft: '3px solid rgba(59, 130, 246, 0.5)',
                        padding: '16px',
                        borderRadius: '8px'
                      }}>
                        <p style={{
                          color: 'var(--text-muted)',
                          lineHeight: '1.8',
                          fontSize: '14px',
                          margin: 0
                        }}>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: 'var(--text-muted)',
              background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.3) 0%, rgba(30, 41, 82, 0.15) 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}>
              <svg
                style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 24px',
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
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '8px',
                color: 'var(--text)'
              }}>
                No results found
              </h2>
              <p style={{ fontSize: '15px' }}>Try changing your search or select a different category</p>
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
