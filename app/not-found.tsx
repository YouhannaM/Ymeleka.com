import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import SiteNav from '@/components/SiteNav';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page does not exist.',
};

export default function NotFound() {
  return (
    <>
      <SiteNav page="home" />
      <main className="home">
        <div className="home-text">
          <h1>That page does not exist.</h1>
          <p>
            <Link className="link" href="/">
              Back to the homepage
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
