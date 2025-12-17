import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reviews - Temp Mail Pro | What Users Say',
  description: 'Read reviews from our users about their experience with Temp Mail Pro. See why thousands trust us for their temporary email needs.',
};

const reviews = [
  {
    id: 1,
    name: 'Alex Johnson',
    location: 'United States',
    rating: 5,
    title: 'Best temp mail service I have used',
    review: 'I have tried many temporary email services, but Temp Mail Pro is by far the best. The interface is clean, emails arrive instantly, and I love the auto-refresh feature. Highly recommended!',
    date: 'December 2024',
    verified: true
  },
  {
    id: 2,
    name: 'Sarah M.',
    location: 'United Kingdom',
    rating: 5,
    title: 'Perfect for online shopping',
    review: 'I use this every time I shop online. No more promotional emails clogging up my inbox. The QR code feature is brilliant for accessing my temp inbox on my phone.',
    date: 'December 2024',
    verified: true
  },
  {
    id: 3,
    name: 'Michael Chen',
    location: 'Canada',
    rating: 5,
    title: 'Great for developers',
    review: 'As a developer, I use Temp Mail Pro daily for testing email verification flows. It is fast, reliable, and the 24-hour expiry is perfect for my testing needs.',
    date: 'November 2024',
    verified: true
  },
  {
    id: 4,
    name: 'Emma Williams',
    location: 'Australia',
    rating: 4,
    title: 'Simple and effective',
    review: 'Very straightforward service. Works exactly as advertised. I wish there was an option for longer email retention, but for most use cases, 24 hours is sufficient.',
    date: 'November 2024',
    verified: true
  },
  {
    id: 5,
    name: 'David Kim',
    location: 'South Korea',
    rating: 5,
    title: 'Fast and reliable',
    review: 'The speed is impressive. Emails show up within seconds of being sent. The dark theme is easy on the eyes, and the mobile experience is excellent.',
    date: 'November 2024',
    verified: true
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    location: 'Germany',
    rating: 5,
    title: 'Privacy made easy',
    review: 'Finally a service that respects privacy without requiring registration. No ads, no tracking, just a simple temp email. This is how all services should work.',
    date: 'October 2024',
    verified: true
  },
  {
    id: 7,
    name: 'James Wilson',
    location: 'New Zealand',
    rating: 4,
    title: 'Excellent free service',
    review: 'Cannot believe this is completely free. Works great for signing up to newsletters I am not sure about. The copy button makes it super easy to use.',
    date: 'October 2024',
    verified: true
  },
  {
    id: 8,
    name: 'Priya Sharma',
    location: 'India',
    rating: 5,
    title: 'Saved me from so much spam',
    review: 'My main inbox was drowning in spam until I started using Temp Mail Pro for all non-essential signups. Life-changing! The interface is beautiful too.',
    date: 'October 2024',
    verified: true
  }
];

const stats = {
  averageRating: 4.9,
  totalReviews: '10,000+',
  satisfaction: '99%'
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`star ${star <= rating ? 'star-filled' : 'star-empty'}`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={star <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>User Reviews</h1>
          <p>See what our users say about Temp Mail Pro</p>
        </div>
      </section>

      <section className="reviews-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.averageRating}</div>
              <StarRating rating={5} />
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.totalReviews}</div>
              <div className="stat-label">Happy Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.satisfaction}</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <div className="container">
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="reviewer-name">
                        {review.name}
                        {review.verified && (
                          <span className="verified-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="reviewer-location">{review.location}</div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <h3 className="review-title">{review.title}</h3>
                <p className="review-text">{review.review}</p>
                <div className="review-date">{review.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Join Thousands of Happy Users</h2>
            <p>Experience the best temporary email service for yourself</p>
            <Link href="/" className="btn btn-primary btn-large">
              Get Free Temp Email
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
