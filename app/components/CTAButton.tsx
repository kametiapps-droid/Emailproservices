'use client';

import Link from 'next/link';
import { useState } from 'react';

interface CTAButtonProps {
  href: string;
  text: string;
}

export default function CTAButton({ href, text }: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        display: 'inline-block',
        padding: '16px 32px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)',
        color: 'white',
        fontSize: '18px',
        fontWeight: '700',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        boxShadow: isHovered 
          ? '0 12px 32px rgba(59, 130, 246, 0.4)' 
          : '0 8px 24px rgba(59, 130, 246, 0.3)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </Link>
  );
}
