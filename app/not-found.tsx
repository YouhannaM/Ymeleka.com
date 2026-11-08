import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page does not exist.',
};

const wrap: React.CSSProperties = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: '24px',
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  color: '#1d1d1f',
  background: '#fff',
  textAlign: 'center',
};

export default function NotFound() {
  return (
    <main style={wrap}>
      <div>
        <p
          style={{
            fontSize: 12,
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: '#6e6e73',
            fontWeight: 600,
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: '"Inter Tight", inherit',
            fontWeight: 600,
            fontSize: 'clamp(36px, 6vw, 72px)',
            letterSpacing: '-.04em',
            lineHeight: 1.02,
            margin: '12px 0 20px',
          }}
        >
          That page does not exist
        </h1>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '10px 18px',
            borderRadius: 999,
            background: '#1d1d1f',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
