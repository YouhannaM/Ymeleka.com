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

const TESLA_RED = '#e82127';
const CORNELL_RED = '#b31b1b';

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
 * inlined in Tesla red; other brands render their official file when
 * present (Cornell seal, Penn State shield), otherwise a monogram tile
 * in Cornell red for the Cornell organizations.
 */
export default function BrandMark({ brand }: { brand: Brand }) {
  if (brand === 'tesla') {
    return (
      <svg
        className="brand-mark"
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-brand={brand}
      >
        <path fill={TESLA_RED} d={teslaPath} />
      </svg>
    );
  }
  const file = logoFile(brand);
  if (file) {
    return (
      // biome-ignore lint/performance/noImgElement: static export, tiny asset
      <img
        className="brand-mark"
        src={file}
        alt=""
        width={18}
        height={18}
        data-brand={brand}
      />
    );
  }
  const text = MONOGRAM[brand];
  const red = brand === 'brv' || brand === 'cupi';
  return (
    <span
      className={`brand-mark brand-mono ${text.length > 1 ? 'brand-mono-wide' : ''}`}
      style={red ? { background: CORNELL_RED, color: '#fff' } : undefined}
      aria-hidden="true"
      title={NAMES[brand]}
      data-brand={brand}
    >
      {text}
    </span>
  );
}
