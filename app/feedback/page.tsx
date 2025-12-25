'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogPosts, BlogPost } from '../../lib/blogData';

import CTAButton from '@/app/components/CTAButton';

interface Feedback {
  id: string;
  name: string;
  rating: number;
  message: string;
  timestamp: Date | string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newFeedback, setNewFeedback] = useState({
    name: '',
    rating: 5,
    message: '',
  });

  // Load feedback from Firestore on mount
  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      // Load cached feedback instantly
      const cached = localStorage.getItem('tempmail_feedback_cache');
      if (cached) {
        try {
          setFeedbacks(JSON.parse(cached));
          setIsLoading(false);
        } catch (e) {
          console.error('Error parsing cached feedback:', e);
        }
      } else {
        setIsLoading(true);
      }

      // Fetch fresh data from server
      const response = await fetch('/api/feedback');
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
        localStorage.setItem('tempmail_feedback_cache', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.name || !newFeedback.message) {
      alert('Please fill all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newFeedback.name,
          rating: newFeedback.rating,
          message: newFeedback.message,
          sentiment: newFeedback.rating >= 4 ? 'positive' : newFeedback.rating === 3 ? 'neutral' : 'negative'
        })
      });

      if (response.ok) {
        setNewFeedback({ name: '', rating: 5, message: '' });
        await loadFeedback();
        alert('Thank you for your feedback!');
      } else {
        alert('Error submitting feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const getAverageRating = () => {
    if (feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((acc, f) => acc + f.rating, 0);
    return (sum / feedbacks.length).toFixed(1);
  };

  const getSentimentStats = () => {
    return {
      positive: feedbacks.filter(f => f.sentiment === 'positive').length,
      neutral: feedbacks.filter(f => f.sentiment === 'neutral').length,
      negative: feedbacks.filter(f => f.sentiment === 'negative').length,
    };
  };

  const formatTimestamp = (timestamp: Date | string): string => {
    if (!timestamp) return 'Recently';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const stats = getSentimentStats();

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>User Feedback</h1>
          <p>See what our users are saying about Temp Mail Pro</p>
        </div>
      </section>

      <div className="container" style={{
        paddingTop: '60px',
        paddingBottom: '80px'
      }}>
        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
          marginTop: '40px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgba(34, 197, 94, 1)', marginBottom: '8px' }}>
              {getAverageRating()}★
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Average Rating
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
              {feedbacks.length} total reviews
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgba(34, 197, 94, 1)', marginBottom: '8px' }}>
              {stats.positive}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Positive Reviews
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
              {((stats.positive / feedbacks.length) * 100).toFixed(0)}% of total
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgba(168, 85, 247, 1)', marginBottom: '8px' }}>
              {stats.neutral + stats.negative}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Neutral/Negative
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
              We value all feedback
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.8) 0%, rgba(30, 41, 82, 0.6) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          padding: '32px',
          marginBottom: '40px'
        }}>
          <h3 style={{ marginBottom: '24px', fontSize: '20px', color: 'white' }}>Leave Your Feedback</h3>
            <form onSubmit={handleSubmitFeedback}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={newFeedback.name}
                  onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    background: 'rgba(15, 23, 42, 0.7)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500' }}>
                  Rating: {newFeedback.rating} ★
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newFeedback.rating}
                  onChange={(e) => setNewFeedback({ ...newFeedback, rating: parseInt(e.target.value) })}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500' }}>
                  Your Feedback
                </label>
                <textarea
                  value={newFeedback.message}
                  onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
                  placeholder="Tell us what you think..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    background: 'rgba(15, 23, 42, 0.7)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(34, 197, 94, 0.6) 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Submit Feedback
              </button>
            </form>
        </div>

        {/* Feedback Section */}
        <div>
          <h2 style={{ fontSize: '28px', marginBottom: '24px', color: 'var(--text)' }}>Recent Feedback ({feedbacks.length})</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {feedbacks.map(feedback => (
              <div
                key={feedback.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  padding: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 82, 0.8) 0%, rgba(30, 41, 82, 0.6) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>
                      {feedback.name}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                      {formatTimestamp(feedback.timestamp)}
                    </div>
                  </div>
                  <div style={{
                    background: feedback.sentiment === 'positive' ? 'rgba(34, 197, 94, 0.1)' : feedback.sentiment === 'neutral' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: feedback.sentiment === 'positive' ? 'rgba(34, 197, 94, 1)' : feedback.sentiment === 'neutral' ? 'rgba(168, 85, 247, 1)' : 'rgba(239, 68, 68, 1)',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {'★'.repeat(feedback.rating)}
                  </div>
                </div>

                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feedback.message}
                </p>

                <div style={{
                  marginTop: '12px',
                  display: 'flex',
                  gap: '12px'
                }}>
                  <button
                    style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      color: 'rgba(34, 197, 94, 1)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)';
                    }}
                  >
                    👍 Helpful
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blog Posts Section */}
        <div style={{ marginTop: '100px', paddingTop: '80px', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '24px', color: 'var(--text)' }}>Latest from Our Blog</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {blogPosts.slice(0, 4).map((post: BlogPost) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  height: '100%'
                }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(31, 41, 55, 0.3) 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  padding: '0',
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
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
                    <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                      <img 
                        src={post.featuredImage} 
                        alt={post.imageAlt || post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: 'rgb(59, 130, 246)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      display: 'inline-block',
                      width: 'fit-content',
                      marginBottom: '12px'
                    }}>
                      {post.category}
                    </div>

                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: 'var(--text)',
                      marginBottom: '12px',
                      lineHeight: '1.4'
                    }}>
                      {post.title}
                    </h3>

                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                      flex: 1
                    }}>
                      {post.excerpt}
                    </p>

                    <div style={{
                      fontSize: '12px',
                      color: 'var(--text-dim)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(59, 130, 246, 0.1)'
                    }}>
                      <span>{post.date}</span>
                      <span style={{ fontWeight: '600' }}>{post.readTime} MIN READ</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/blog" style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#3B82F6',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              Explore All Articles →
            </Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <CTAButton href="/" text="Get Your Free Temp Mail Now" />
        </div>
      </div>
    </div>
  );
}
