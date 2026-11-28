import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

/** The gallery used to live at /places; send old links on to /gallery. */
export const metadata: Metadata = {
  title: { absolute: 'Gallery · Youhanna Meleka' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/gallery' },
};

const redirect = "location.replace('/gallery');";

export default function PlacesRedirect() {
  return (
    <main className="home">
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <div className="home-text">
        <p>
          The gallery has moved to{' '}
          <Link className="link" href="/gallery">
            ymeleka.com/gallery
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
