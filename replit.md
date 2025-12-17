# My-Mailer.Pro - Temporary Email Service

## Overview
A secure temporary email service built with Next.js and Firebase Firestore. Users can generate disposable email addresses that automatically expire in 24 hours, receive emails, and share their temporary address via QR code.

## Project Architecture

### Tech Stack
- **Frontend/Backend**: Next.js 16 with Turbopack
- **Database**: Firebase Firestore
- **Language**: TypeScript/React

### Directory Structure
```
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # API endpoints
│   │   ├── email/        # Email CRUD operations
│   │   ├── inbox/        # Inbox message handling
│   │   ├── qrcode/       # QR code generation
│   │   └── webhook/      # External webhook handling
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
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

## Configuration

### Environment Variables (Secrets)
- `FIREBASE_SERVICES_KEY` or `FIREBASE_SERVICE_ACCOUNT_KEY`: Firebase service account JSON key (required)
- `RESEND_API_KEY`: For email sending functionality
- `SESSION_SECRET`: Session management secret

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

## Recent Changes
- **December 17, 2025**: 
  - Upgraded to Next.js 16 with Turbopack for better performance
  - Configured allowedDevOrigins for Replit environment
  - Set up deployment configuration

## User Preferences
- Dark theme UI design
- Auto-refresh inbox every 10 seconds
