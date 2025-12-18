'use client';

import { useState, useEffect } from 'react';

interface Feedback {
  id: string;
  name: string;
  rating: number;
  message: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface Poll {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
  totalVotes: number;
}

export default function ReviewsPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      name: 'Ahmed Khan',
      rating: 5,
      message: 'Amazing privacy protection! This is exactly what I needed. Love the simplicity!',
      timestamp: 'Just now',
      sentiment: 'positive'
    },
    {
      id: '2',
      name: 'Fatima Ali',
      rating: 5,
      message: 'Super fast email generation. No more spam on my main email. Highly recommend!',
      timestamp: '2 minutes ago',
      sentiment: 'positive'
    },
    {
      id: '3',
      name: 'Hassan Malik',
      rating: 4,
      message: 'Great service. Works perfectly. Would appreciate webhook support though.',
      timestamp: '5 minutes ago',
      sentiment: 'positive'
    },
    {
      id: '4',
      name: 'Sara Khan',
      rating: 5,
      message: 'Best temporary email service I\'ve used. Clean UI and instant email generation!',
      timestamp: '10 minutes ago',
      sentiment: 'positive'
    },
    {
      id: '5',
      name: 'Usman Ahmed',
      rating: 4,
      message: 'Really useful for online shopping. Keeps my real email safe from spam.',
      timestamp: '15 minutes ago',
      sentiment: 'positive'
    },
  ]);

  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 'poll1',
      question: 'How often do you use temporary email?',
      options: [
        { text: 'Daily', votes: 234 },
        { text: 'Weekly', votes: 187 },
        { text: 'Monthly', votes: 92 },
        { text: 'Rarely', votes: 45 },
      ],
      totalVotes: 558
    },
    {
      id: 'poll2',
      question: 'What\'s your main use case?',
      options: [
        { text: 'Online Shopping', votes: 312 },
        { text: 'Free Trials', votes: 245 },
        { text: 'Privacy Protection', votes: 189 },
        { text: 'Testing Services', votes: 98 },
      ],
      totalVotes: 844
    },
  ]);

  const [newFeedback, setNewFeedback] = useState({
    name: '',
    rating: 5,
    message: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.name || !newFeedback.message) {
      alert('Please fill all fields');
      return;
    }

    const feedback: Feedback = {
      id: Date.now().toString(),
      name: newFeedback.name,
      rating: newFeedback.rating,
      message: newFeedback.message,
      timestamp: 'Just now',
      sentiment: newFeedback.rating >= 4 ? 'positive' : newFeedback.rating === 3 ? 'neutral' : 'negative'
    };

    setFeedbacks([feedback, ...feedbacks]);
    setNewFeedback({ name: '', rating: 5, message: '' });
    setShowForm(false);
  };

  const handleVotePoll = (pollId: string, optionIndex: number) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        const newOptions = [...poll.options];
        newOptions[optionIndex].votes += 1;
        return {
          ...poll,
          options: newOptions,
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    }));
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

  const stats = getSentimentStats();

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Community Feedback & Polls</h1>
          <p>See what our users are saying and participate in live polls</p>
        </div>
      </section>

      <div className="container">
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
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
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
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Positive Reviews
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
              {((stats.positive / feedbacks.length) * 100).toFixed(0)}% of total
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgba(59, 130, 246, 1)', marginBottom: '8px' }}>
              {polls.reduce((acc, p) => acc + p.totalVotes, 0)}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Total Poll Votes
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
              Active participation
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
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Neutral/Negative
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
              We value all feedback
            </div>
          </div>
        </div>

        {/* Add Feedback Button */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
              border: 'none',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {showForm ? '✕ Close' : '+ Share Your Feedback'}
          </button>
        </div>

        {/* Feedback Form */}
        {showForm && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.8) 0%, rgba(30, 41, 82, 0.6) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            padding: '32px',
            marginBottom: '40px'
          }}>
            <h3 style={{ marginBottom: '24px', fontSize: '20px' }}>Leave Your Feedback</h3>
            <form onSubmit={handleSubmitFeedback}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
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
                    background: 'rgba(15, 23, 42, 0.5)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
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
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
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
                    background: 'rgba(15, 23, 42, 0.5)',
                    color: 'var(--text-primary)',
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
        )}

        {/* Live Polls Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Live Polls</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px'
          }}>
            {polls.map(poll => (
              <div
                key={poll.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  padding: '24px'
                }}
              >
                <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-primary)' }}>
                  {poll.question}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {poll.options.map((option, idx) => {
                    const percentage = (option.votes / poll.totalVotes) * 100;
                    return (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            {option.text}
                          </span>
                          <span style={{ color: 'rgba(59, 130, 246, 1)', fontSize: '14px', fontWeight: '600' }}>
                            {option.votes} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          borderRadius: '8px',
                          height: '24px',
                          overflow: 'hidden',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}>
                          <div
                            style={{
                              background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
                              height: '100%',
                              width: `${percentage}%`,
                              transition: 'width 0.3s ease',
                              borderRadius: '8px'
                            }}
                          />
                        </div>
                        <button
                          onClick={() => handleVotePoll(poll.id, idx)}
                          style={{
                            marginTop: '8px',
                            background: 'rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            color: 'rgba(59, 130, 246, 1)',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            width: '100%'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.25)';
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                          }}
                        >
                          Vote for this option
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(59, 130, 246, 0.1)',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  textAlign: 'center'
                }}>
                  Total Votes: {poll.totalVotes}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div>
          <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Recent Feedback ({feedbacks.length})</h2>
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
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {feedback.name}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                      {feedback.timestamp}
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
                  color: 'var(--text-secondary)',
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
                  <button
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      color: 'var(--text-secondary)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    💬 Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
