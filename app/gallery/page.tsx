import type { Metadata } from 'next';
import Script from 'next/script';
import React from 'react';

import SiteNav from '@/components/SiteNav';

export const metadata: Metadata = {
  title: { absolute: 'Gallery · Youhanna Meleka' },
  description:
    'Four pencil sketches of the places that shaped Youhanna Meleka: Cairo, Happy Valley, California and Ithaca.',
  alternates: { canonical: '/gallery' },
};

const SKETCHES: { key: string; label: string }[] = [
  {
    key: 'cairo',
    label:
      'Pencil sketch of Cairo: apartment blocks, a mosque, palms and the pyramids',
  },
  {
    key: 'stadium',
    label: 'Pencil sketch of Beaver Stadium full on game day',
  },
  {
    key: 'factory',
    label: 'Pencil sketch of the Tesla factory with robots assembling a car',
  },
  {
    key: 'orchard',
    label:
      'Pencil sketch of an apple orchard with a tractor pulling a sorting machine',
  },
];

/** Four sketches on index cards, drawn at runtime by places.js. No captions. */
export default function GalleryPage() {
  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".035"
              numOctaves="2"
              seed="4"
              result="t"
            />
            <feDisplacementMap in="SourceGraphic" in2="t" scale="2.6" />
          </filter>
        </defs>
      </svg>
      <SiteNav page="gallery" />
      <main className="places">
        <h1 className="sr-only">Gallery</h1>
        {SKETCHES.map((p, i) => (
          <figure
            key={p.key}
            className="place card reveal"
            style={{ '--dl': `${i * 0.08}s` } as React.CSSProperties}
          >
            <div className="card-sheet">
              <svg
                className="sk draw"
                viewBox="0 0 300 200"
                data-sk={p.key}
                role="img"
                aria-label={p.label}
              />
            </div>
          </figure>
        ))}
      </main>
      <Script src="/places.js" strategy="afterInteractive" />
    </>
  );
}
