# Temp Mail Pro - Temporary Email Service

## Overview
Temp Mail Pro is a modern, privacy-focused temporary disposable email service built with Next.js, React, and TypeScript. It allows users to generate instant, expiring email addresses to protect their privacy and manage online interactions without revealing their personal email. The service prioritizes speed, responsiveness, and a polished user experience with a dark-mode-first design. The project aims to provide a robust solution for privacy, testing, and secure online interactions, adhering to AdSense compliance standards and comprehensive SEO.

## User Preferences
- All content in English (converted from Urdu)
- Dark theme as default with light mode option
- Blog author: "Temp Mail Pro Team" (no fake names)
- Reviews: No reply buttons on feedback cards
- Vote limiting: One vote per poll using localStorage

## System Architecture

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API routes
- **Database**: Firebase Firestore
- **Styling**: CSS3 with glassmorphism effects, leveraging PostCSS for processing
- **UI Theme**: Dark mode (primary), Light mode (full support)
- **Deployment**: Vercel and Replit compatible

### UI/UX Design
- **Color Scheme**: Dark blue (#0a0e27 to #1a1f3a) with blue (#3B82F6) and purple (#A855F7) gradients as accents. Light mode uses #E0F4FF and #E8F8FF.
- **Typography**: Inter font family.
- **Visuals**: Sticky header with glassmorphism, subtle blue borders, soft shadows, blur effects, GPU acceleration for animations.
- **Responsiveness**: Fully responsive across desktop, tablet, and mobile (optimized for 600px and below).
- **Navigation**: Lightning-fast navigation with route prefetching, hamburger menu with smooth animations.
- **Interactivity**: Dark/Light theme toggle with localStorage persistence, glowing pulse animations for buttons, dynamic loading states.

### Feature Specifications
- **Core Functionality**: Instant email generation, inbox management, message reading. Emails expire in 24 hours.
- **Content Pages**: Home, Use Cases (8), Blog (10 articles with filtering), FAQ (16 with search), Feedback, Contact, Privacy Policy, Terms and Conditions, Disclaimer, About Us, Copyright.
- **Email Management**: Generate, fetch, and delete temporary emails and messages.
- **Contact Form**: Submissions stored in Firebase Firestore.
- **SEO & Compliance**:
    - Comprehensive meta tags, Open Graph, Twitter Cards.
    - Dynamic sitemap.xml and robots.txt.
    - JSON-LD Structured Data (Organization, WebSite, WebApplication, FAQPage, BreadcrumbList).
    - AdSense compliance: carefully curated keywords, disclaimers, and content.
    - Dedicated legal pages: Privacy Policy, Terms, Disclaimer, Copyright.
- **Blog**: 800-1200+ word articles with H2/H3, internal linking, FAQ sections, dynamic routing, search, and category filtering.

### System Design
- **API Endpoints**: Dedicated APIs for email generation, inbox retrieval, email/message deletion, and contact form submissions.
- **Database Schema**: `contact_messages` collection in Firestore, storing sender details, message content, and status.
- **Performance**: Route prefetching, optimized CSS transitions, GPU acceleration, critical CSS inlining, cache headers, `next/image` optimization.
- **Security**: Links open in new tabs with `rel="noopener noreferrer"`, iframe sandbox for email content.

## External Dependencies
- **Firebase Firestore**: Used for storing contact form submissions.
- **Next.js**: The primary framework for both frontend and backend (API routes).
- **React**: Frontend library for building user interfaces.
- **TypeScript**: For type-safe development.
- **PostCSS**: For CSS processing and styling enhancements.