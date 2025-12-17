# Temp Mail Pro - Temporary Email Service

## Overview
A secure temporary email service built with Next.js and Firebase Firestore. Users can generate disposable email addresses that automatically expire in 24 hours, receive emails, and share their temporary address via QR code.

**Website**: https://www.mytempmail.pro

## Project Architecture

### Tech Stack
- **Frontend/Backend**: Next.js 15 (App Router)
- **Database**: Firebase Firestore
- **Language**: TypeScript/React
- **Styling**: CSS with CSS Variables (supports dark/light theme)

### Directory Structure
```
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # API endpoints
│   │   ├── email/        # Email CRUD operations
│   │   ├── inbox/        # Inbox message handling
│   │   ├── qrcode/       # QR code generation
│   │   └── webhook/      # External webhook handling
│   ├── blog/             # Blog page
│   ├── contact/          # Contact us page
│   ├── faq/              # FAQ page
│   ├── reviews/          # User reviews page
│   ├── use-cases/        # Where to use temp mail page
│   ├── components/       # Shared components
│   │   ├── Header.tsx   # Sticky header with nav and theme toggle
│   │   └── Footer.tsx   # Site footer with links
│   ├── page.tsx          # Main application page (temp email generator)
│   ├── layout.tsx        # Root layout with SEO metadata
│   └── globals.css       # Global styles with theme support
├── lib/
│   └── firebase.ts       # Firebase Admin SDK configuration
├── next.config.js         # Next.js configuration
└── package.json          # Dependencies and scripts
```

### Key Features
- Instant temporary email generation
- 24-hour email expiration
- Real-time inbox with auto-refresh (every 10 seconds)
- QR code sharing for email addresses
- Copy to clipboard functionality
- Firebase Firestore for persistence
- Dark/Light theme toggle
- Sticky header with hamburger menu (mobile)
- Multiple informational pages (Blog, FAQ, Contact, Reviews, Use Cases)

## Configuration

### Environment Variables (Secrets)
- `FIREBASE_SERVICE_ACCOUNT_KEY` or `FIREBASE_SERVICES_KEY`: Firebase service account JSON key (required)
- `RESEND_API_KEY`: For email sending functionality (optional)
- `SESSION_SECRET`: Session management secret (optional)

### Development
Run the development server:
```bash
npm run dev
```
The app runs on port 5000 at http://0.0.0.0:5000

### Production Build
```bash
npm run build
npm run start
```

## SEO Configuration
- **Title**: Temp Mail Pro – Free Temporary Disposable Email Service
- **Description**: Temp Mail Pro provides free temporary disposable email addresses to protect your privacy. Instantly receive verification emails without registration.
- **Domain**: www.mytempmail.pro

## Pages
1. **Home** (`/`) - Main temp email generator with inbox
2. **Blog** (`/blog`) - Privacy tips and security articles
3. **Use Cases** (`/use-cases`) - Where to use temporary email
4. **FAQ** (`/faq`) - Frequently asked questions
5. **Contact** (`/contact`) - Contact form and information
6. **Reviews** (`/reviews`) - User reviews with ratings

## Recent Changes
- **December 17, 2025**: 
  - Rebranded to "Temp Mail Pro" from "My-Mailer.Pro"
  - Added sticky header with navigation and hamburger menu
  - Added light/dark theme toggle
  - Created Blog, FAQ, Contact, Reviews, and Use Cases pages
  - Improved button styles with gradients and shadows
  - Added comprehensive footer with site links
  - Updated SEO metadata for Google visibility
  - Professional styling improvements throughout

## User Preferences
- Dark theme as default
- Auto-refresh inbox every 10 seconds
- Emails open inline within inbox (accordion style expansion)
- Professional, clean design aesthetic
