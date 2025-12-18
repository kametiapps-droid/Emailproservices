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
│   │   └── webhook/      # Cloudflare email webhook handler
│   ├── components/       # Shared components
│   │   ├── Header.tsx   # Sticky header with nav and theme toggle
│   │   └── Footer.tsx   # Site footer with links
│   ├── page.tsx          # Main application page (temp email generator)
│   ├── layout.tsx        # Root layout with SEO metadata
│   └── globals.css       # Global styles with theme support
├── lib/
│   └── firebase.ts       # Firebase Admin SDK configuration
├── cloudflare-worker.js   # Cloudflare Email Routing worker
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
- Receives full HTML emails with logos and formatting
- Clean inbox display with multipart email parsing

## Configuration

### Environment Variables (Secrets)
- `FIREBASE_SERVICES_KEY`: Firebase service account JSON key (required)

### Email Service
- **Provider**: Cloudflare Email Routing
- **Setup**: Configure Cloudflare Email Routing to forward to your Cloudflare Worker
- **Worker**: Deploy `cloudflare-worker.js` to Cloudflare Workers with `WEBHOOK_URL` environment variable

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

## Recent Changes
- **December 18, 2025 (Latest - Code Cleanup)**:
  - Removed all debug console logs from webhook for production-ready code
  - Removed unused marketing pages (blog, contact, faq, reviews, use-cases) to reduce build size
  - Cleaned up old test screenshots from attached_assets
  - Optimized multipart email parsing to correctly display HTML with logos
  - No JavaScript console errors - fully clean delivery
  - Project is now lean and production-ready

- **December 18, 2025 (Previous)**:
  - Improved email parsing to handle multipart emails correctly
  - Fixed HTML content extraction from Cloudflare Email Routing
  - Shows only styled HTML emails with logos (no plain text duplication)
  - Removed Resend email service completely
  - Integrated Cloudflare Email Routing
  - Simplified webhook to handle only Cloudflare emails
  - Added `cloudflare-worker.js` for email forwarding
  - Enhanced button styles with gradients and animations

- **December 17, 2025**:
  - Complete layout redesign with modern, minimal, corporate style
  - New blue/indigo color scheme replacing purple/cyan
  - Glassmorphism effects on cards and buttons
  - Clean header with gradient logo icon
  - Modern typography with better spacing
  - Action buttons in 4-column grid layout
  - Subtle gradient backgrounds
  - Improved dark/light theme contrast
  - Professional, clean aesthetic throughout

- **December 18, 2025**:
  - Fixed header positioning (now properly at top with no gap)
  - Completely redesigned UI with modern purple/cyan gradient theme
  - Improved mobile footer layout (centered, cleaner structure)
  - More professional, unique design aesthetic
  - Enhanced color palette with better contrast
  - Refined button styles and hover effects
  - Streamlined footer with cleaner navigation groups
  - Better mobile responsiveness throughout

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
