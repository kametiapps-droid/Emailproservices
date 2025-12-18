# Temp Mail Pro - Temporary Disposable Email Service

## Project Status: ✅ READY FOR PRODUCTION

### Overview
A Next.js 15 application providing free temporary disposable email addresses that expire in 24 hours. Built with React, TypeScript, Firebase Firestore, and deployed on Replit.

### Key Features
- ✅ Instant email generation with 4 domains (kameti.online, giftofhope.online, mytoolhub.store, playgamesonline.space)
- ✅ 24-hour email expiration
- ✅ Real-time inbox with message reading
- ✅ QR code generation for email sharing
- ✅ Copy-to-clipboard functionality
- ✅ Auto-refresh inbox every 15 seconds
- ✅ Mobile-optimized UI with responsive design
- ✅ Dark theme with gradient styling

### Recent Optimizations (Dec 18, 2025)
1. **Firebase Pre-initialization**: Added `lib/firebaseInit.ts` module to cache Firebase connection
2. **Loading State UX**: Placeholder "Loading..." email shows immediately, subtle "Generating..." indicator in corner
3. **Page Load Performance**: Instant UI display - no blocking overlays
4. **Email Generation Speed**: Optimized to ~1-2 seconds with Firebase warming

### Technical Stack
- **Frontend**: Next.js 15.5.9, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Deployment**: Replit (Port 5000)
- **Package Manager**: npm

### Project Structure
```
app/
  ├── api/
  │   ├── email/route.ts      # Email generation, retrieval, deletion
  │   ├── inbox/route.ts      # Fetch messages for email
  │   └── init/route.ts       # Firebase warm-up endpoint
  ├── components/
  │   ├── Header.tsx
  │   └── Footer.tsx
  ├── page.tsx                # Main email interface
  ├── layout.tsx
  └── globals.css
lib/
  ├── firebase.ts             # Firebase initialization and utilities
  └── firebaseInit.ts         # Firebase connection caching
```

### User Preferences
- Communicates in Urdu/Hindi - use simple, conversational language
- Expects lightning-fast page loads and visual feedback
- Values clean, uncluttered UI without blocking overlays

### Known Configuration
- Replit environment with Node.js
- Firebase Admin SDK for backend operations
- Next.js dev server bound to 0.0.0.0:5000
- localStorage for email persistence across sessions

### Deployment
- Run: `npm run dev`
- Build: `npm run build`
- Production ready - can publish to custom domain via Replit
