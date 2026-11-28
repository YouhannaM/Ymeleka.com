import Link from 'next/link';
import React from 'react';

import ThemeToggle from './ThemeToggle';

/** Monogram home link, a Gallery or Home link, and the theme switch. */
export default function SiteNav({ page }: { page: 'home' | 'gallery' }) {
  return (
    <nav className="nav" aria-label="Site">
      <Link href="/" className="brand" aria-label="Youhanna Meleka, home">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <clipPath id="ymc">
            <rect x="0" y="15.5" width="64" height="33.7" />
          </clipPath>
          <rect width="64" height="64" rx="14" fill="#000" />
          <g fill="#fff">
            <g clipPath="url(#ymc)">
              <polygon points="12.6,15.5 18.6,15.5 27.6,33.6 27.6,49.5 22.4,49.5 22.4,35.4" />
              <path d="M26.4 34 L36 14" stroke="#fff" strokeWidth="1.6" />
              <rect x="34.2" y="15" width="1.6" height="35" />
              <polygon points="34.2,15.5 39.8,15.5 45.4,37.4 43.6,42.6" />
              <path d="M43.4 42 L51.9 14" stroke="#fff" strokeWidth="1.6" />
              <rect x="48.6" y="15" width="5.2" height="35" />
            </g>
            <rect x="9.6" y="14.8" width="11" height="1.4" />
            <rect x="32" y="14.8" width="6.4" height="1.4" />
            <rect x="46.4" y="14.8" width="9.6" height="1.4" />
            <rect x="19.4" y="48.6" width="11.2" height="1.4" />
            <rect x="31.8" y="48.6" width="6.4" height="1.4" />
            <rect x="46" y="48.6" width="10.4" height="1.4" />
          </g>
          <circle cx="43.6" cy="55" r="2.3" fill="#8e8e93" />
        </svg>
      </Link>
      <div className="nav-right">
        {page === 'gallery' ? (
          <Link href="/" className="nav-link nav-back">
            <span aria-hidden="true">&larr;</span> Home
          </Link>
        ) : (
          <Link href="/gallery" className="nav-link">
            Gallery
          </Link>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
