'use client';

import { useState } from 'react';

interface UseCase {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string;
  category: string;
  color: string;
}

const useCases: UseCase[] = [
  {
    id: '1',
    title: 'Online Shopping',
    description: 'Keep your real email safe when shopping online. Get all order confirmations and sales notifications through a temporary email.',
    benefits: [
      'Avoid spam emails',
      'Maintain privacy',
      'Protect from data breaches',
      'Easy email deletion'
    ],
    icon: '🛍️',
    category: 'Shopping',
    color: 'rgba(59, 130, 246, 0.1)'
  },
  {
    id: '2',
    title: 'Free Trials',
    description: 'Use free trials for various services without sharing your real email. No hidden charges, no forced subscriptions.',
    benefits: [
      'Avoid trial cancellation issues',
      'No unwanted emails',
      'Full access',
      'Delete anytime'
    ],
    icon: '🎁',
    category: 'Services',
    color: 'rgba(34, 197, 94, 0.1)'
  },
  {
    id: '3',
    title: 'Website Signups',
    description: 'Register on new websites without sharing your real email. Delete the temporary email whenever you want.',
    benefits: [
      'No spam from websites',
      'Avoid data tracking',
      'Multiple accounts easily',
      'Complete privacy'
    ],
    icon: '📝',
    category: 'Registration',
    color: 'rgba(168, 85, 247, 0.1)'
  },
  {
    id: '4',
    title: 'Newsletters & Recommendations',
    description: 'Get newsletters and recommendations on a separate email. Keep your main inbox clean and organized.',
    benefits: [
      'Organized inbox',
      'Never miss important emails',
      'Everything filtered',
      'Easy to manage'
    ],
    icon: '💌',
    category: 'Email Management',
    color: 'rgba(236, 72, 153, 0.1)'
  },
  {
    id: '5',
    title: 'Testing & Development',
    description: 'Software developers can test email features in their apps. Use our API for direct integration.',
    benefits: [
      'Real email testing',
      'No obstacles',
      'Multiple emails instantly',
      'API documentation available'
    ],
    icon: '👨‍💻',
    category: 'Development',
    color: 'rgba(59, 130, 246, 0.1)'
  },
  {
    id: '6',
    title: 'Phishing Protection',
    description: 'Use a separate email for suspicious links. Instantly delete it if the email seems dangerous.',
    benefits: [
      'Avoid fraud',
      'Protection from malware',
      'Keep your info safe',
      'Open only safe links'
    ],
    icon: '🛡️',
    category: 'Security',
    color: 'rgba(34, 197, 94, 0.1)'
  },
  {
    id: '7',
    title: 'Social Media Test Accounts',
    description: 'Create test accounts on social media without using your real email. Multiple accounts, no conflicts.',
    benefits: [
      'Multiple accounts safely',
      'No conflicts',
      'Easy account deletion',
      'Maintain privacy'
    ],
    icon: '📱',
    category: 'Social Media',
    color: 'rgba(6, 182, 212, 0.1)'
  },
  {
    id: '8',
    title: 'Data Breach Protection',
    description: 'If a website gets hacked, only the temporary email is compromised. Your real email stays safe.',
    benefits: [
      'Minimal damage',
      'Real email separate',
      'Instant deletion',
      'No worries'
    ],
    icon: '🔐',
    category: 'Security',
    color: 'rgba(239, 68, 68, 0.1)'
  }
];

export default function UseCasesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(useCases.map(uc => uc.category)));
  const filteredUseCases = selectedCategory
    ? useCases.filter(uc => uc.category === selectedCategory)
    : useCases;

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Use Cases</h1>
          <p>Discover when and how to use Temp Mail Pro</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '50px',
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
            All Use Cases
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

        {/* Use Cases Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {filteredUseCases.map(useCase => (
            <div
              key={useCase.id}
              style={{
                background: `linear-gradient(135deg, ${useCase.color}, ${useCase.color.replace('0.1', '0.05')})`,
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                padding: '32px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '40px',
                marginBottom: '16px'
              }}>
                {useCase.icon}
              </div>

              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '12px',
                color: 'var(--text)'
              }}>
                {useCase.title}
              </h3>

              <p style={{
                color: 'var(--text-muted)',
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {useCase.description}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <p style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: '0 0 12px 0'
                }}>
                  Benefits:
                </p>
                {useCase.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}
                  >
                    <span style={{
                      color: 'rgba(34, 197, 94, 1)',
                      fontWeight: '700',
                      minWidth: '20px'
                    }}>
                      ✓
                    </span>
                    <span style={{
                      color: 'var(--text-dim)',
                      fontSize: '13px',
                      lineHeight: '1.5'
                    }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                <span>Category:</span>
                <span style={{
                  background: 'var(--glass)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  color: 'var(--primary)'
                }}>
                  {useCase.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          maxWidth: '600px',
          margin: '80px auto 0',
          textAlign: 'center',
          padding: '60px 20px',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--text)' }}>
            Get Started Now
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Protect your privacy with just one click
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
              border: 'none',
              color: 'white',
              padding: '14px 40px',
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
            Get Email Now
          </a>
        </div>
      </div>
    </div>
  );
}
