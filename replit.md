# Temp Mail Pro - Temporary Email Service

## Project Overview
Temp Mail Pro is a modern temporary disposable email service built with Next.js 15, React 19, and TypeScript. Users can instantly generate disposable email addresses that expire in 24 hours, protecting their privacy. All features are fast, beautiful, and fully responsive.

## Site Information
- **Site Name:** Temp Mail Pro
- **Domain:** https://www.mytempmail.pro/
- **Contact Email:** Contact@mytempmail.pro
- **Language:** English only

## Project Architecture

### Technology Stack
- Frontend: Next.js 15, React 19, TypeScript
- Backend: Next.js API routes
- Database: Firebase Firestore
- Styling: CSS3 with glassmorphism effects
- UI Theme: Dark mode (primary), Light mode (full support)

### Pages & Features
1. **Home Page** (/) - Email generator, inbox, message reading
2. **Use Cases** (/use-cases) - 8 different use cases
3. **Blog** (/blog) - 10 articles with category filtering
4. **FAQ** (/faq) - 16 FAQs with search functionality
5. **Reviews** (/reviews) - Customer feedback with voting (one vote per poll via localStorage)
6. **Contact** (/contact) - Contact form with Firebase storage
7. **Privacy Policy** (/privacy) - AdSense-compliant privacy disclosure
8. **Terms and Conditions** (/terms) - Legal terms for service usage
9. **Disclaimer** (/disclaimer) - Legal disclaimer and liability limitations
10. **About Us** (/about) - Company mission and information
11. **Copyright** (/copyright) - Copyright and intellectual property information

### Key Features
- ✅ Sticky header with glass morphism effect
- ✅ Logo display (envelope icon from favicon.png)
- ✅ Auto-refresh indicator next to Inbox heading
- ✅ Lightning-fast navigation (prefetching enabled)
- ✅ Hamburger menu with 0.1s animations
- ✅ Dark/Light theme toggle with localStorage
- ✅ Contact form submissions stored in Firebase Firestore
- ✅ Fully responsive design
- ✅ Optimized performance with GPU acceleration

### API Endpoints
- `POST /api/email` - Generate new email
- `GET /api/inbox?emailId={id}` - Fetch messages
- `DELETE /api/email?id={id}` - Delete email
- `DELETE /api/message` - Delete message
- `POST /api/contact` - Submit contact form (stores in Firebase)
- `GET /api/contact` - Retrieve all contact messages

### Database Collections (Firebase Firestore)
- **contact_messages** - Contact form submissions
  - Fields: name, email, subject, message, createdAt, status, read

### Performance Optimizations
- Route prefetching on all navigation links
- CSS transitions optimized (0.1s animations)
- GPU acceleration with will-change and backface-visibility
- Sticky positioning for header (not fixed)
- Blur effects and glass morphism for modern UI

### Design System
- **Color Scheme:** Dark blue (#0a0e27) to (#1a1f3a)
- **Accents:** Blue (#3B82F6) and Purple (#A855F7) gradients
- **Typography:** Inter font family
- **Borders:** Subtle blue borders with 0.15-0.3 opacity
- **Shadows:** Soft shadows for depth

### User Preferences
- All content in English (converted from Urdu)
- Dark theme as default with light mode option
- Blog author: "Temp Mail Pro Team" (no fake names)
- Reviews: No reply buttons on feedback cards
- Vote limiting: One vote per poll using localStorage

### Recent Changes
- Added 5 new legal pages for AdSense compliance (Privacy, Terms, Disclaimer, About, Copyright)
- Updated Footer with links to all legal pages
- Configured deployment settings (autoscale, npm build & start scripts)
- Installed all npm dependencies
- Added sticky header with glass morphism
- Integrated Firebase for contact form storage
- Optimized navigation speed with prefetching
- Repositioned auto-refresh indicator to inbox section
- Updated contact email to Contact@mytempmail.pro

### AdSense Compliance (Dec 18, 2025)
✅ Privacy Policy page - Complete data collection and usage disclosure
✅ Terms and Conditions - Legal framework for service usage
✅ Disclaimer page - Liability limitations and prohibited uses
✅ About Us page - Company mission and service information
✅ Copyright Disclaimer - Intellectual property and DMCA compliance
✅ Footer updated with links to all legal pages
✅ Deployment configured for production

### SEO Optimization (Dec 18, 2025)
✅ **Sitemap.xml** - Dynamic sitemap with all 12 pages, priorities, and change frequencies
✅ **Robots.txt** - Search engine directives with Google/Bing specific rules
✅ **JSON-LD Structured Data** - Organization, WebSite, WebApplication, FAQPage, BreadcrumbList schemas
✅ **100+ Target Keywords** - Comprehensive keyword strategy for all pages
✅ **Meta Tags** - Unique title, description, keywords for each page
✅ **Open Graph** - Facebook/LinkedIn sharing optimization
✅ **Twitter Cards** - Twitter sharing optimization
✅ **Canonical URLs** - Proper canonical tags on all pages
✅ **Mobile Optimization** - Apple web app meta tags, theme colors
✅ **Page-Level SEO** - Individual layout.tsx with metadata for each page

**Target Keywords Include:**
- Primary: temp mail, temporary email, disposable email, fake email, anonymous email
- Secondary: 10 minute mail, throwaway email, burner email, trash mail
- Long-tail: free temporary email, temporary email for verification, best temp mail service
- Brand: temp mail pro, mytempmail.pro
- Features: instant email, no registration email, secure temporary email

**Structured Data Types:**
- Organization (company info, logo, contact)
- WebSite (search action, publisher)
- WebApplication (features, ratings, pricing)
- FAQPage (common questions)
- BreadcrumbList (navigation)

### Next Steps (Optional Enhancements)
- Email notifications when contact form is submitted
- Admin dashboard for viewing contact messages
- Message search and filtering
- Email verification for temporary addresses
