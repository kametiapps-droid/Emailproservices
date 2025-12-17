import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ - Temp Mail Pro | Frequently Asked Questions',
  description: 'Find answers to common questions about temporary email addresses, how they work, privacy protection, and how to use Temp Mail Pro effectively.',
};

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is a temporary email address?',
        a: 'A temporary email address is a disposable email that you can use for a short period. It helps protect your privacy by keeping your real email address private. Emails sent to temporary addresses are automatically deleted after a set time (24 hours on Temp Mail Pro).'
      },
      {
        q: 'Is Temp Mail Pro completely free?',
        a: 'Yes! Temp Mail Pro is 100% free to use. There are no hidden costs, premium plans, or subscriptions. You can create unlimited temporary email addresses without paying anything.'
      },
      {
        q: 'Do I need to register to use Temp Mail Pro?',
        a: 'No registration required! Simply visit our website and you will instantly receive a new temporary email address. No signup, no personal information needed.'
      },
      {
        q: 'How long do temporary emails last?',
        a: 'Temporary email addresses on Temp Mail Pro are valid for 24 hours. After this period, both the email address and all received messages are permanently deleted.'
      }
    ]
  },
  {
    category: 'Using Temp Mail',
    questions: [
      {
        q: 'How do I receive emails?',
        a: 'Once you have your temporary email address, use it on any website or service. Emails will appear in your inbox automatically - our system checks for new messages every 10 seconds.'
      },
      {
        q: 'Can I send emails with a temporary address?',
        a: 'Temp Mail Pro is designed for receiving emails only. This is a security feature that prevents misuse and ensures the service remains reliable for all users.'
      },
      {
        q: 'Can I get a new email address?',
        a: 'Yes! Click the "New Email" button to instantly generate a fresh temporary email address. Your previous address and messages will be discarded.'
      },
      {
        q: 'How do I copy my email address?',
        a: 'Click the "Copy" button next to your email address. It will be copied to your clipboard instantly. You can also scan the QR code to access your email on another device.'
      }
    ]
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'Is my data safe with Temp Mail Pro?',
        a: 'We take privacy seriously. We do not store any personal information about you. Temporary emails and messages are automatically deleted after 24 hours. We use secure connections (HTTPS) for all communications.'
      },
      {
        q: 'Can others see my emails?',
        a: 'Only you can access your temporary inbox through your unique session. However, temporary email addresses are not encrypted end-to-end, so they should not be used for highly sensitive information.'
      },
      {
        q: 'Are temporary emails legal?',
        a: 'Yes, using temporary email addresses is completely legal. They are a legitimate privacy tool. However, they should not be used to bypass security measures or for illegal activities.'
      },
      {
        q: 'Why should I use a temporary email instead of my real one?',
        a: 'Temporary emails protect you from spam, marketing emails, and potential data breaches. When you sign up for a service with your real email, you risk receiving unwanted emails or having your address sold to marketers.'
      }
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'Why am I not receiving emails?',
        a: 'Some services block temporary email domains. If you are not receiving emails, try generating a new address or check that you entered the address correctly. Our inbox refreshes every 10 seconds automatically.'
      },
      {
        q: 'Can I recover a deleted email?',
        a: 'No, once an email or temporary address is deleted, it cannot be recovered. This is by design to protect your privacy. Make sure to save any important information before it expires.'
      },
      {
        q: 'Does Temp Mail Pro work on mobile devices?',
        a: 'Yes! Temp Mail Pro is fully responsive and works perfectly on smartphones, tablets, and desktop computers. No app download required.'
      },
      {
        q: 'Can I use multiple temporary emails at once?',
        a: 'Each browser session can have one active temporary email. If you need multiple addresses, you can use different browsers or private/incognito windows.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about temporary email addresses</p>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="faq-category">
              <h2 className="faq-category-title">{category.category}</h2>
              <div className="faq-list">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="faq-item">
                    <h3 className="faq-question">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                      {faq.q}
                    </h3>
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Still Have Questions?</h2>
            <p>Contact us and we will be happy to help</p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <Link href="/" className="btn btn-secondary">
                Try Temp Mail Pro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
