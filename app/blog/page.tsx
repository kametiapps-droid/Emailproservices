'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Protecting Your Privacy Online",
    excerpt: "Learn how temporary email addresses can be your first line of defense against spam and data breaches.",
    category: "Privacy",
    author: "Temp Mail Pro Team",
    date: "December 15, 2024",
    readTime: 8,
    content: `In today's digital age, your email address has become one of your most valuable assets. It's the key to your social media accounts, online shopping profiles, banking services, and countless subscriptions. But with this power comes a significant vulnerability: every time you sign up for a new service or download an app, you're giving out information that could be sold to marketers, stolen by hackers, or used for spam.

This is where temporary email addresses come into play, offering a revolutionary solution to an age-old problem. By using disposable email addresses for sign-ups, verifications, and untrusted websites, you can maintain your privacy while still enjoying the services you love.

## Why Your Real Email Deserves Protection

Your primary email address is like the master key to your digital life. Once someone gets access to it, they can potentially reset passwords on all your accounts, intercept sensitive communications, and impersonate you across multiple platforms. Email has become the universal identifier in the digital world, making it increasingly valuable to hackers and scammers.

Statistics show that the average person receives over 80 emails per day, and roughly 85% of those are spam or phishing attempts. Every single unwanted email represents a threat – a potential attack vector that could compromise your security.

## How Temporary Email Works

Temporary email services create disposable email addresses that function exactly like regular emails but with a crucial difference: they expire. You can receive emails sent to your temporary address, read the content, verify your account, or confirm your subscription. After 24 hours, the email address disappears completely, along with all messages associated with it.

This simple yet powerful mechanism creates a buffer between your real identity and the services you're testing or the websites you don't fully trust. It's like having a dedicated throwaway phone number, except for email.

## Real-World Applications

The beauty of temporary email lies in its versatility. Software developers use it to test applications without cluttering their actual inbox. Privacy-conscious users employ it when registering for social media accounts to prevent tracking. Online shoppers use temporary emails to avoid marketing lists. Students use it to access free trial periods without commitment. Researchers utilize it to maintain anonymity when exploring web services.

Each use case represents a layer of protection – a way to interact with the digital world without exposing your core identity.

## The Privacy Revolution

In an era where data is the new currency, temporary email represents a quiet revolution. Major corporations make millions selling user data to advertisers. By fragmenting this data across temporary, disposable addresses, you render those data profiles nearly useless. A marketer can't build a comprehensive profile of you when your email changes with every signup.

This democratization of privacy is empowering. It shifts control back to the user, allowing ordinary people to take meaningful steps to protect their personal information without requiring technical expertise.

## Security Beyond Privacy

While privacy is the primary benefit, security gains are equally important. Temporary email addresses can't be used for password recovery on your main accounts, which means even if a hacker compromises one of these disposable addresses, they can't use it to access your important accounts. It creates a natural firewall between your digital identities.

## The Future of Email Security

As privacy concerns continue to mount and regulations like GDPR reshape how companies handle data, temporary email services are likely to become even more essential. We're witnessing a fundamental shift in how people think about their digital identity – moving from one universal email address to a more sophisticated, compartmentalized approach.

Organizations are beginning to recognize this shift as well. Some companies now provide built-in email masking features, understanding that user privacy concerns are fundamental to building trust in their platforms.

Whether you're a privacy advocate, a security-conscious professional, or simply someone tired of spam, temporary email offers a practical, accessible solution to one of the internet's most persistent problems.`
  },
  {
    id: 2,
    title: "How Scammers Use Email: A Complete Protection Guide",
    excerpt: "Understand the tactics used by scammers and how temporary email can protect you from becoming their next victim.",
    category: "Security",
    author: "Temp Mail Pro Team",
    date: "December 12, 2024",
    readTime: 10,
    content: `Email-based attacks have evolved dramatically over the past decade. What started with simple Nigerian prince schemes has transformed into sophisticated, targeted campaigns that exploit human psychology and technical vulnerabilities. Understanding these tactics is your best defense against becoming a victim.

## The Psychology of Email Scams

Scammers don't rely solely on technical tricks – they exploit human nature. Urgency is their most powerful tool. Whether it's a "limited time offer," a fake account alert, or a supposed tax deadline, scammers create pressure that forces you to act without thinking critically about what you're being asked to do.

Trust is another key factor. They often impersonate legitimate companies, using logos, email formatting, and language that matches official communications. Your brain sees these familiar elements and relaxes its guard. This is why even tech-savvy individuals fall for well-crafted phishing emails.

## Common Scam Categories

**Phishing**: The attacker sends you an email appearing to come from your bank, PayPal, Amazon, or another trusted service. The email asks you to "verify" your account by clicking a link and entering your credentials. The link leads to a counterfeit website that looks identical to the real one, but instead of verifying your account, it steals your credentials.

**Spear Phishing**: This is phishing's more dangerous cousin. Instead of sending generic emails to millions of people, the attacker researches you specifically. They might use your name, mention your employer, or reference recent transactions. This personalization makes the email far more convincing.

**CEO Fraud**: The attacker impersonates your company's CEO or another executive, requesting urgent wire transfers or confidential information. The emotional pressure of a request from leadership, combined with the element of surprise, often bypasses critical thinking.

## The Temporary Email Advantage

Here's where temporary email becomes your secret weapon. By using a disposable email address whenever possible, you significantly reduce your exposure to scammers. If you use a temporary email to sign up for a service you're unsure about, any phishing emails sent to that address can be safely ignored – you don't care about account access because you never intended to keep the account.

More importantly, your real email address remains protected. Scammers build lists of valid email addresses through data breaches. If your address isn't on these lists, you're less likely to receive targeted attacks.

## Protecting Yourself

**One: Be suspicious of urgent requests.** Legitimate companies rarely demand immediate action via email. Take time to verify the request through official channels.

**Two: Check the sender address carefully.** Scammers often use addresses that look similar to legitimate ones (amazon-security.com instead of amazon.com).

**Three: Never click links in suspicious emails.** Instead, navigate directly to the company's official website using your browser.

**Four: Look for red flags in the email content.** Spelling mistakes, grammatical errors, and awkward phrasing are often signs of scams.

**Five: Use temporary email for untrusted websites.** If a website seems questionable or you don't plan to return to it, use a disposable email.

Your email inbox is a gateway to your digital life. Protect it like you'd protect your front door.`
  },
  {
    id: 3,
    title: "Temporary Email for Software Testing and Development",
    excerpt: "Discover how developers can use temporary email to streamline testing workflows and improve productivity.",
    category: "Technical",
    author: "Temp Mail Pro Team",
    date: "December 8, 2024",
    readTime: 7,
    content: `For software developers, temporary email is more than just a privacy tool – it's a productivity multiplier. Whether you're testing user authentication flows, API integrations, or email notification systems, temporary email provides a clean, efficient solution.

## The Developer's Dilemma

When testing an application, you need multiple test accounts. Each test account requires a unique email address. You could use variations of your personal email (test+1@gmail.com, test+2@gmail.com), but this clutters your inbox and creates confusion.

Alternatively, you could create throwaway email accounts, but managing multiple accounts across different email providers is cumbersome. You need something faster, simpler, and more disposable.

## How Developers Use Temporary Email

**Testing Sign-Up Flows**: Create a new temporary email for each test run. This gives you a clean slate every time and eliminates leftover test data from previous runs.

**Testing Email Notifications**: Send notifications to temporary email addresses to verify they're formatted correctly and contain the right information.

**Testing Password Recovery**: Verify that password reset emails arrive correctly without cluttering your personal inbox.

**API Integration Testing**: If your application integrates with email services, use temporary email to test various integration scenarios.

**Load Testing**: Create thousands of temporary email addresses to simulate a large user base without polluting your real inbox.

## Tools and Workflows

Most developers integrate temporary email services into their testing infrastructure. Some even build custom scripts that automatically generate temporary email addresses and verify incoming messages through API calls.

Forward-thinking teams include temporary email testing in their CI/CD pipelines, ensuring that every code deployment maintains proper email functionality.

The efficiency gains are significant. What might have taken 30 minutes of manual email account management now takes seconds.

## Privacy Through Development

Beyond efficiency, temporary email embodies important privacy principles. When you test with temporary email, you're not creating unnecessary records tied to your personal identity. This is especially important for security-sensitive testing where you want to avoid any association between yourself and test data.

For open-source developers who test publicly, temporary email prevents their personal address from being exposed in commit messages or bug reports.

## The Future of Testing

As applications become more email-centric and testing more sophisticated, temporary email will likely become an even more integral part of the developer's toolkit. Some frameworks are beginning to include built-in support for temporary email services, recognizing their value in modern development workflows.

If you haven't integrated temporary email into your testing process, you might be working harder than necessary.`
  },
  {
    id: 4,
    title: "Privacy Rights and Digital Freedom: What You Should Know",
    excerpt: "Explore your rights to privacy in the digital age and what you can do to protect them.",
    category: "Privacy",
    author: "Temp Mail Pro Team",
    date: "December 1, 2024",
    readTime: 9,
    content: `Privacy isn't a luxury – it's a fundamental right. Yet in the digital age, this right is under unprecedented pressure from corporations, governments, and criminals. Understanding your privacy rights and the tools available to protect them is more important than ever.

## Your Right to Privacy

Privacy rights vary by jurisdiction, but the underlying principle is universal: you have a right to control your personal information. The European Union's GDPR enshrines this principle in law, giving citizens extensive rights over their data. The United States has a patchwork of privacy laws that vary by state and industry.

Regardless of where you live, you have the moral right to privacy. Your thoughts, your communications, your browsing habits, and your preferences should remain private unless you choose to share them.

## How Your Data is Collected

Every time you browse the web, you're leaving a digital trail. Websites track your activity through cookies, pixels, and scripts. Social media companies monitor not just what you do on their platforms, but your activity across the entire web through embedded tracking code.

Your email address is particularly valuable because it's the central identifier for your digital life. Companies that obtain your email address can:
- Build a profile of your interests and behaviors
- Use it to attempt account takeovers on other services
- Sell it to marketers and data brokers
- Include it in future data breaches

## Tools for Privacy Protection

Temporary email is one tool in a larger privacy toolkit. Other important tools include:

**VPNs**: Encrypt your internet traffic and hide your IP address, making it harder for websites to track your location.

**Browser Privacy Extensions**: Tools like uBlock Origin, Privacy Badger, and HTTPS Everywhere provide additional privacy protection while browsing.

**Privacy-Respecting Search Engines**: Services like DuckDuckGo don't track your search history.

**End-to-End Encryption Messaging**: Signal, ProtonMail, and similar services protect your communications from surveillance.

## The Bigger Picture

Privacy protection requires action at multiple levels. Individual tools matter, but so does advocacy for stronger privacy laws. Support organizations fighting for digital rights. Vote for representatives who prioritize privacy. Choose companies that respect your data.

Your personal efforts to protect your privacy, combined with broader systemic change, create real protection.`
  },
  {
    id: 5,
    title: "Free Trial Abuse Prevention: Using Temp Mail Responsibly",
    excerpt: "Learn how companies prevent free trial exploitation while protecting legitimate user privacy.",
    category: "Security",
    author: "Temp Mail Pro Team",
    date: "November 25, 2024",
    readTime: 6,
    content: `Free trials are a wonderful way to test services before committing to paid plans. But they're also vulnerable to abuse. Understanding how companies prevent abuse while respecting user privacy is important for anyone interested in internet ethics.

## The Free Trial Problem

Companies offer free trials to reduce purchase friction and let customers experience their product before buying. But some users exploit this by repeatedly creating new accounts to extend free access indefinitely.

This creates a challenge: companies need to prevent abuse without implementing invasive tracking that violates user privacy.

## How Companies Detect Abuse

Payment information is the primary abuse-prevention tool. When you register for a free trial, companies typically require a credit card. This single requirement eliminates most abuse because obtaining new payment methods for repeated signups is tedious and potentially expensive.

However, with free trials that don't require payment information, companies must use other methods. Some track devices using cookies or device fingerprinting. Others look for patterns in signups from the same IP address or location.

## The Temporary Email Question

Some companies explicitly prohibit temporary email addresses in their terms of service. Their reasoning is straightforward: temporary email makes it harder to track users across multiple accounts.

Is this practice fair? The answer is nuanced.

**From the company's perspective**: Preventing abuse is legitimate. If users repeatedly sign up with temporary email to access free trials indefinitely, the company can't recover value that justifies the free trial offer.

**From the user's perspective**: Requiring a permanent email feels like an invasion of privacy. Companies can build profiles and send marketing emails even after trial periods expire.

## Finding Balance

The most user-respecting approach combines multiple verification methods. A company might accept temporary email addresses but require payment information, or implement smart detection systems that identify abuse based on behavior rather than email provider.

Users should use temporary email responsibly. If a free trial's terms prohibit it, using temporary email anyway violates the agreement. Respecting a company's terms, even when you disagree with them, is part of ethical internet use.

## The Future

As privacy concerns grow, we'll likely see better tools for both privacy protection and abuse prevention. Companies will develop smarter systems that prevent abuse without resorting to invasive tracking. Users will demand the right to use their email address of choice, including temporary ones.

Until then, understand the terms you're agreeing to. Use temporary email where it's permitted. When it's prohibited, decide whether you're comfortable with the company's information collection practices before signing up.`
  },
  {
    id: 6,
    title: "Email as Your Digital Identity: Why Protection Matters",
    excerpt: "Understand why your email address is your most important digital asset and how to protect it.",
    category: "Privacy",
    author: "Temp Mail Pro Team",
    date: "November 18, 2024",
    readTime: 7,
    content: `Your email address is the foundation of your digital identity. It's your username on social media, the recovery method for countless accounts, and the key to your financial systems. If someone gains control of your email, they can potentially take control of your entire digital life.

## Your Email is Your Master Key

Almost every online account can be recovered using your email address. If a hacker gains access to your email, they can reset passwords and take over your accounts.

This is why protecting your email is so critical. You wouldn't give your house keys to strangers. You shouldn't casually distribute your email address either.

## Common Ways Email Addresses Leak

Data breaches are the primary source of email address leaks. Every few weeks, major companies suffer breaches that expose millions of email addresses. These addresses end up in databases that scammers and hackers buy and sell.

Additionally, companies you trust may legally sell your information to data brokers who compile comprehensive dossiers about you, including your email.

Careless use of email at untrusted websites also exposes your address. Every time you sign up for a service, you're trusting that company's security practices.

## Compartmentalization Strategy

The most effective email protection strategy is compartmentalization. Instead of using a single email address for everything, use different email addresses for different purposes:

- **Banking/Finance**: A dedicated email used only for financial institutions
- **Shopping**: A separate email for retail and commerce
- **Social Media**: Another email for social networks
- **Untrusted Services**: Temporary email for questionable websites

This approach, sometimes called email hygiene, limits the damage if any single email is compromised.

## The Temporary Email Role

This is where temporary email fits into a comprehensive email protection strategy. Use temporary email for:

- Websites you're trying out
- Services you don't plan to use long-term
- Sites with questionable security practices
- Downloads requiring email confirmation
- Forums and comment sections

By keeping your primary email separated from these low-trust activities, you significantly reduce your exposure to scams, spam, and potential breaches.

## Long-term Email Safety

Even your primary email needs protection. Use a strong, unique password. Enable two-factor authentication. Regularly review connected apps and revoke access to those you no longer use.

Your email is the skeleton key to your digital life. Keep it safe.`
  },
  {
    id: 7,
    title: "GDPR and Your Right to Be Forgotten: A Practical Guide",
    excerpt: "Discover how GDPR gives you control over your data and how to exercise your rights.",
    category: "Privacy",
    author: "Temp Mail Pro Team",
    date: "November 10, 2024",
    readTime: 8,
    content: `The European Union's General Data Protection Regulation (GDPR) is one of the most comprehensive privacy laws ever enacted. It fundamentally changed how companies handle personal data and gave individuals unprecedented control over their information.

## What GDPR Changed

Before GDPR, companies could collect and use personal data with relatively little restriction. GDPR flipped this model. Now, companies must:

- Justify why they're collecting data
- Get explicit consent before collecting
- Tell you how they'll use your data
- Delete data when no longer necessary
- Give you access to your data
- Correct inaccurate information
- Delete your information upon request

## Your Rights Under GDPR

**Right of Access**: You can request a copy of all personal data a company has about you. They must provide it in a structured format within 30 days.

**Right to Rectification**: If a company has incorrect information about you, you can demand they correct it.

**Right to Erasure**: Often called the "right to be forgotten," you can ask companies to delete your information. They must comply unless there's a legitimate reason to keep it.

**Right to Data Portability**: You can ask for your data in a format you can move to another company.

**Right to Object**: You can object to how a company uses your data, particularly for marketing purposes.

## How to Exercise These Rights

Contact a company's privacy officer and request your information under GDPR. Companies must respond within one month. If they refuse, you can file a complaint with your country's data protection authority.

For the right to be forgotten, send a written request asking them to delete all your personal data. Companies must comply unless there's a legally recognized exception.

## Temporary Email and GDPR

Using temporary email is partly a practical recognition that your data is valuable and vulnerable. It's a tool that lets you maintain privacy while still using services.

However, GDPR is the larger solution. It gives you legal rights to control your data. Use both: temporary email for preventive protection, and your GDPR rights when you discover companies misusing your data.

## Beyond GDPR

Not everyone lives in the EU. But GDPR's success is inspiring similar legislation worldwide. California's CCPA, Brazil's LGPD, and many other laws were influenced by GDPR's comprehensive approach.

Advocate for privacy-protective legislation in your jurisdiction. Your digital rights matter everywhere.`
  },
  {
    id: 8,
    title: "Building Your Personal Privacy Strategy: A Step-by-Step Plan",
    excerpt: "Create a comprehensive privacy protection plan tailored to your specific needs and risk level.",
    category: "Privacy",
    author: "Temp Mail Pro Team",
    date: "November 1, 2024",
    readTime: 9,
    content: `Privacy protection isn't a one-time setup – it's an ongoing practice. But building a sustainable privacy strategy doesn't require becoming paranoid or spending hours on security maintenance. This guide will help you create a practical, personalized plan.

## Assessing Your Risk

First, assess your specific privacy risks. Everyone's situation is different:

- Are you a journalist who might be targeted by governments?
- A businessperson protecting competitive information?
- Someone trying to avoid harassment?
- A general internet user concerned about data collection?

Your risk level determines which tools are most important. A journalist might need sophisticated encryption. A general user might primarily need to avoid marketing profiling.

## Your Privacy Baseline

Start with basics that benefit everyone:

**Strong Passwords**: Use a password manager to create unique passwords for every service.

**Two-Factor Authentication**: Enable on your email and important financial accounts first.

**Regular Updates**: Keep your operating system and applications updated.

**Basic Awareness**: Be cautious about what information you share publicly.

These baseline protections prevent most common attacks and data collection.

## Intermediate Protections

Once you're comfortable with basics, add intermediate protections:

**VPN Usage**: Use a reputable VPN when on untrusted networks (coffee shops, airports).

**Browser Privacy Extensions**: Install uBlock Origin and Privacy Badger for ad and tracking protection.

**Email Compartmentalization**: Start using different email addresses for different purposes.

**Temporary Email**: Use for sign-ups and trials.

**Privacy-Respecting Services**: Switch to DuckDuckGo for search, consider ProtonMail for email.

## Advanced Protections

If you're concerned about sophisticated threats, advanced protections include:

**Full Disk Encryption**: Encrypt your entire hard drive.

**Secure Operating System**: Consider Linux or specialized privacy-focused operating systems.

**Air-Gapped Devices**: Keep highly sensitive data on devices never connected to the internet.

**Dead Drops**: Methods of communicating without digital trails.

Most people don't need advanced protections. They're appropriate for people facing genuine sophisticated threats.

## Implementation Timeline

You don't need to implement everything at once. Privacy is a journey, not a destination. Start with the highest-impact changes:

Month 1: Implement strong, unique passwords. Enable two-factor authentication on important accounts.

Month 2: Start using temporary email for new signups. Reduce your public information online.

Month 3: Switch to privacy-respecting services where practical (email, search, browser).

Month 4: Review and adjust based on your experience.

This gradual approach prevents overwhelm and allows you to develop sustainable habits.

## Privacy Hygiene

Like physical hygiene, privacy requires ongoing attention. Regularly audit your accounts. Request your data from companies. Delete accounts you no longer use. Review privacy settings on social media.

This isn't intensive work – an hour per month is often sufficient – but consistency matters.

## The Bigger Picture

Individual privacy practices matter, but they're insufficient against systemic issues. Privacy requires regulation, corporate accountability, and technological innovation. Individual efforts should complement broader advocacy for privacy rights.

Support privacy-protective policies. Vote for representatives who prioritize privacy. Use your consumer power to support privacy-respecting companies.

## Your Privacy Manifesto

Building a sustainable privacy strategy requires commitment but not paranoia. The goal is creating a life where you're in control of your personal information, where you can interact online without surrendering unnecessary privacy, and where you benefit from the internet's opportunities while minimizing its risks.

Start today. Make one change. Then another. Privacy is built through accumulated choices, not overnight transformation. Each step increases your control over your digital self.

Your personal information is valuable. You deserve to control it.`
  }
];

function BlogPageContent() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const postId = searchParams.get('id');
    if (postId) {
      const post = blogPosts.find(p => p.id === parseInt(postId));
      if (post) {
        setSelectedPost(post);
      }
    }
  }, [searchParams]);

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>Temp Mail Pro Blog</h1>
          <p>Expert insights on privacy, security, and digital protection. Stay informed about the latest threats and best practices.</p>
        </div>
      </section>

      <div className="container">
        {!selectedPost ? (
          <>
            {/* Search and Filter */}
            <div style={{ marginBottom: '40px', marginTop: '40px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    background: 'rgba(15, 23, 42, 0.5)',
                    color: 'var(--text)',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Category Filter */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: !selectedCategory ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)',
                    background: !selectedCategory ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: selectedCategory === category ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)',
                      background: selectedCategory === category ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px',
              marginBottom: '60px'
            }}>
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  style={{
                    padding: '24px',
                    borderRadius: '12px',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    background: 'rgba(15, 23, 42, 0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>
                      {post.title}
                    </h3>
                    <span style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: 'rgb(59, 130, 246)',
                      whiteSpace: 'nowrap',
                      marginLeft: '8px'
                    }}>
                      {post.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 16px 0', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <span>{post.date}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Article View */}
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                marginTop: '40px',
                padding: '10px 20px',
                borderRadius: '6px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                background: 'transparent',
                color: 'rgb(59, 130, 246)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              ← Back to Blog
            </button>

            <article style={{ marginTop: '40px', marginBottom: '60px' }}>
              <header style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: 'rgb(59, 130, 246)'
                  }}>
                    {selectedPost.category}
                  </span>
                </div>
                <h1 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text)', margin: '0 0 16px 0' }}>
                  {selectedPost.title}
                </h1>
                <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <span>{selectedPost.date}</span>
                  <span>{selectedPost.readTime} min read</span>
                  <span>By {selectedPost.author}</span>
                </div>
              </header>

              <div style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: 'var(--text-muted)',
                marginBottom: '40px'
              }}>
                {selectedPost.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('##')) {
                    return (
                      <h2 key={idx} style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        marginTop: '30px',
                        marginBottom: '15px',
                        color: 'var(--text)',
                        borderLeft: '3px solid rgba(59, 130, 246, 0.5)',
                        paddingLeft: '15px'
                      }}>
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('**')) {
                    return (
                      <p key={idx} style={{ marginBottom: '15px', fontWeight: '600' }}>
                        {paragraph.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  return (
                    <p key={idx} style={{ marginBottom: '15px' }}>
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Article Footer */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                marginTop: '40px'
              }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>👤</span>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '8px', fontSize: '16px' }}>
                      Temp Mail Pro Team
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '12px' }}>
                      Privacy & security experts at Temp Mail Pro.<br />
                      Passionate about helping users protect their digital identity.
                    </div>
                    <div style={{ fontStyle: 'italic', fontSize: '13px', color: 'var(--text-muted)' }}>
                      We publish research-based articles to help users understand
                      privacy-friendly email practices and online safety.
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </>
        )}
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>Loading blog...</div>}>
      <BlogPageContent />
    </Suspense>
  );
}
