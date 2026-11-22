import React from 'react';

/** Ficio's apple: black body, orange leaf, orange highlight. */
export default function FicioMark() {
  return (
    <svg
      className="ficio-mark"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M32 20c-4-5-10-7-15-5C9 18 5 28 7 38c2 11 9 20 17 22 3 1 5-1 8-1s5 2 8 1c8-2 15-11 17-22 2-10-2-20-10-23-5-2-11 0-15 5z"
      />
      <path fill="#FF5A1F" d="M33 19c1-7 6-11 13-12-1 7-6 11-13 12z" />
      <path
        fill="none"
        stroke="#FF5A1F"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 50C7 43 5 35 7 28"
      />
    </svg>
  );
}
