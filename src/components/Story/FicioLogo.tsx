import React from 'react';

/** The Ficio mark: a hexagonal seed with a sprout, in marble and kiln. */
export default function FicioLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>Ficio</title>
      <path d="M24 3 L42 13.5 V34.5 L24 45 L6 34.5 V13.5 Z" />
      <path d="M24 38 V22" />
      <path d="M24 28 Q16 27 14 19 Q22 19 24 28" />
      <path d="M24 24 Q32 23 34 15 Q26 15 24 24" />
      <circle cx="24" cy="38" r="2.2" fill="#d2772f" stroke="none" />
    </svg>
  );
}
