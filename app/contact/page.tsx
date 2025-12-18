'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert(`Error: ${data.error || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Contact Info Cards */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Email</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Reach us via email for inquiries
            </p>
            <a
              href="mailto:support@tempmail.pro"
              style={{
                color: 'rgba(59, 130, 246, 1)',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              support@tempmail.pro
            </a>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Live Chat</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Chat with our support team
            </p>
            <button
              onClick={() => alert('Live chat opening soon!')}
              style={{
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: 'rgba(59, 130, 246, 1)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
              }}
            >
              Start Chat
            </button>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏱️</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Response Time</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              We typically respond within 24 hours
            </p>
            <p style={{
              color: 'rgba(34, 197, 94, 1)',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Monday - Sunday
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 82, 0.8) 0%, rgba(30, 41, 82, 0.6) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            padding: '40px'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px', textAlign: 'center' }}>
              Send us a Message
            </h2>

            {submitted && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                color: 'rgba(34, 197, 94, 1)',
                textAlign: 'center',
                fontWeight: '600'
              }}>
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
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
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)';
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
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
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)';
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
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
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Report a Bug</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
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
                    resize: 'vertical',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)';
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading
                    ? 'rgba(107, 114, 128, 0.5)'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '14px',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.opacity = '0.9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{
          maxWidth: '700px',
          margin: '80px auto 0',
          textAlign: 'center',
          paddingTop: '60px',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>
            Didn't find an answer?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Check our FAQ page or contact us directly
          </p>
          <a
            href="/faq"
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
              transition: 'all 0.3s ease',
              marginRight: '12px',
              marginBottom: '12px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            View FAQ
          </a>
          <a
            href="/"
            style={{
              display: 'inline-block',
              background: 'transparent',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: 'rgba(59, 130, 246, 1)',
              padding: '12px 32px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
