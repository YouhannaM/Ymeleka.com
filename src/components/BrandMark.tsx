import fs from 'node:fs';
import path from 'node:path';
import React from 'react';

import { teslaPath } from '@/data/teslaPath';

export type Brand = 'penn-state' | 'tesla' | 'cornell' | 'brv' | 'cupi';

const NAMES: Record<Brand, string> = {
  'penn-state': 'Penn State',
  tesla: 'Tesla',
  cornell: 'Cornell University',
  brv: 'Big Red Ventures',
  cupi: 'Cornell University Physical Intelligence',
};

/** Initials shown until an official logo file is dropped into /public/logos. */
const MONOGRAM: Record<Brand, string> = {
  'penn-state': 'PS',
  tesla: 'T',
  cornell: 'C',
  brv: 'BRV',
  cupi: 'CPI',
};

/** Finds /public/logos/<brand>.svg or .png at build time. */
function logoFile(brand: Brand): string | null {
  for (const ext of ['svg', 'png']) {
    const file = path.join(process.cwd(), 'public', 'logos', `${brand}.${ext}`);
    if (fs.existsSync(file)) return `/logos/${brand}.${ext}`;
  }
  return null;
}

/**
 * A small brand mark that sits before a link's text. Tesla's mark is
 * inlined so it follows the theme color; other brands render their
 * official file when present, otherwise a monogram in the theme ink.
 */
export default function BrandMark({ brand }: { brand: Brand }) {
  if (brand === 'tesla') {
    return (
      <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d={teslaPath} />
      </svg>
    );
  }
  const file = logoFile(brand);
  if (file) {
    return (
      // biome-ignore lint/performance/noImgElement: static export, tiny asset
      <img className="brand-mark" src={file} alt="" width={18} height={18} />
    );
  }
  const text = MONOGRAM[brand];
  return (
    <span
      className={`brand-mark brand-mono ${text.length > 1 ? 'brand-mono-wide' : ''}`}
      aria-hidden="true"
      title={NAMES[brand]}
    >
      {text}
    </span>
  );
}
