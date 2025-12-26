'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force light mode as default unless explicitly saved as dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDark(false);
      document.documentElement.setAttribute('data-theme', 'light');
      // If no theme is saved, explicitly save light to ensure it sticks
      if (!savedTheme) {
        localStorage.setItem('theme', 'light');
      }
    }

    // Close menu on scroll
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (!mounted) {
    return (
      <header className="site-header">
        <div className="container header-content">
          <div className="logo">
            <div style={{ width: 28, height: 28, borderRadius: '8px', background: '#eee' }}></div>
            Temp Mail Pro
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="site-header">
      <div className="container header-content">
        <Link href="/" className="logo" onClick={closeMenu}>
          <Image 
            src="/favicon.png" 
            alt="Temp Mail Pro Logo" 
            width={28} 
            height={28}
            style={{ borderRadius: '8px' }}
          />
          Temp Mail Pro
        </Link>

        <nav className={`nav-menu ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link href="/" className="nav-link" onClick={closeMenu} prefetch={false}>Home</Link>
          <Link href="/use-cases" className="nav-link" onClick={closeMenu} prefetch={false}>Use Cases</Link>
          <Link href="/blog" className="nav-link" onClick={closeMenu}>Blog</Link>
          <Link href="/faq" className="nav-link" onClick={closeMenu} prefetch={false}>FAQ</Link>
          <Link href="/feedback" className="nav-link" onClick={closeMenu} prefetch={false}>Feedback</Link>
          <Link href="/contact" className="nav-link" onClick={closeMenu} prefetch={false}>Contact</Link>
        </nav>

        <div className="header-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button 
            className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  );
}
