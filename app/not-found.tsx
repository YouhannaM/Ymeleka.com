import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Page not found',
};

export default function NotFound() {
  return (
    <main className="connect" style={{ minHeight: '100svh' }}>
      <h1 className="connect-title">
        LOST<em>?</em>
      </h1>
      <p className="connect-text">This room does not exist.</p>
      <Link className="pill-button" href="/">
        return home
      </Link>
    </main>
  );
}
