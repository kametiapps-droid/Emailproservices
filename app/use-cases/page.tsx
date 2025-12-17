import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Where to Use Temporary Email - Temp Mail Pro | Use Cases',
  description: 'Discover all the places where you can use temporary email addresses. From website signups to online shopping, learn how disposable emails protect your privacy.',
};

const useCases = [
  {
    icon: '🛒',
    title: 'Online Shopping',
    description: 'Sign up for e-commerce websites without exposing your real email. Avoid promotional spam and marketing emails after making purchases.',
    tips: ['Get discount codes without spam', 'Create multiple accounts for deals', 'Protect from data breaches']
  },
  {
    icon: '📱',
    title: 'App & Software Trials',
    description: 'Test apps and software with temporary emails. No commitment required - try before you buy without cluttering your inbox.',
    tips: ['Try premium features risk-free', 'Avoid trial expiration reminders', 'Test multiple times with fresh emails']
  },
  {
    icon: '🎮',
    title: 'Gaming & Entertainment',
    description: 'Create gaming accounts, access free content, and sign up for entertainment platforms without revealing your identity.',
    tips: ['Create game accounts quickly', 'Access free game trials', 'Join gaming communities anonymously']
  },
  {
    icon: '📚',
    title: 'Educational Resources',
    description: 'Access educational content, online courses, and research materials that require email registration.',
    tips: ['Download free ebooks and guides', 'Access research papers', 'Try online learning platforms']
  },
  {
    icon: '💼',
    title: 'Job Hunting',
    description: 'Apply to jobs on multiple platforms without getting overwhelmed by recruiter spam and job alerts.',
    tips: ['Test job application systems', 'Sign up for job boards', 'Keep job searching private']
  },
  {
    icon: '🔐',
    title: 'Testing & Development',
    description: 'Developers can test email functionality, user registration flows, and verification systems with disposable addresses.',
    tips: ['Test registration systems', 'QA email workflows', 'Verify password reset flows']
  },
  {
    icon: '📰',
    title: 'News & Content Access',
    description: 'Read articles behind paywalls or registration walls without giving up your real email address.',
    tips: ['Access premium content', 'Bypass registration walls', 'Read without newsletters']
  },
  {
    icon: '🎁',
    title: 'Contests & Giveaways',
    description: 'Enter online contests and giveaways without the aftermath of promotional emails flooding your inbox.',
    tips: ['Enter multiple contests', 'Avoid sponsor emails', 'Maximize winning chances']
  },
  {
    icon: '💬',
    title: 'Forums & Communities',
    description: 'Join online forums, social platforms, and communities while maintaining your privacy and anonymity.',
    tips: ['Join discussions anonymously', 'Test community platforms', 'Protect your identity']
  },
  {
    icon: '🌐',
    title: 'Public WiFi Safety',
    description: 'When using public WiFi that requires email login, use a temporary email to stay secure and anonymous.',
    tips: ['Access public WiFi safely', 'Avoid tracking by venues', 'Keep browsing private']
  },
  {
    icon: '📊',
    title: 'Market Research',
    description: 'Sign up for competitor services, research tools, and market analysis platforms for business intelligence.',
    tips: ['Research competitors', 'Access market reports', 'Test competitor signups']
  },
  {
    icon: '🛡️',
    title: 'Data Breach Protection',
    description: 'Minimize risk from data breaches by using disposable emails for less trusted or new websites.',
    tips: ['Limit data breach exposure', 'Protect real identity', 'Reduce phishing risks']
  }
];

export default function UseCasesPage() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>Where to Use Temporary Email</h1>
          <p>Discover all the situations where a disposable email address can protect your privacy</p>
        </div>
      </section>

      <section className="use-cases-section">
        <div className="container">
          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div key={index} className="use-case-card">
                <div className="use-case-icon">{useCase.icon}</div>
                <h2 className="use-case-title">{useCase.title}</h2>
                <p className="use-case-description">{useCase.description}</p>
                <ul className="use-case-tips">
                  {useCase.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <h2>Why Use Temp Mail Pro?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-number">1</div>
              <h3>Instant Creation</h3>
              <p>Get a new email address in seconds - no registration required</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number">2</div>
              <h3>Auto Expiry</h3>
              <p>Emails automatically delete after 24 hours for maximum privacy</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number">3</div>
              <h3>Real-time Inbox</h3>
              <p>Receive emails instantly with automatic inbox refresh</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number">4</div>
              <h3>100% Free</h3>
              <p>No hidden costs, no premium plans, completely free forever</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Start Protecting Your Privacy Now</h2>
            <p>Get your free temporary email address and keep your real inbox clean</p>
            <Link href="/" className="btn btn-primary btn-large">
              Get Free Temp Email
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
