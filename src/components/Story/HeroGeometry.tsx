import React from 'react';

/**
 * A Renaissance construction drawing behind the globe: the circle in
 * the square, its diagonals, a golden-section spiral, and the tick
 * marks of a compass, as if the world were laid out by Leonardo's rule
 * and divider. Rendered in marble hairlines at low opacity.
 */
export default function HeroGeometry() {
  const ticks: React.ReactNode[] = [];
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const long = i % 6 === 0;
    const r1 = long ? 452 : 462;
    ticks.push(
      <line
        key={i}
        x1={500 + Math.cos(a) * r1}
        y1={500 + Math.sin(a) * r1}
        x2={500 + Math.cos(a) * 472}
        y2={500 + Math.sin(a) * 472}
      />,
    );
  }

  return (
    <div className="hero-geometry" aria-hidden="true">
      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
      >
        <circle cx="500" cy="500" r="472" />
        <circle cx="500" cy="500" r="330" strokeDasharray="2 10" />
        <circle cx="500" cy="500" r="204" />
        <rect x="170" y="170" width="660" height="660" />
        <line x1="170" y1="170" x2="830" y2="830" />
        <line x1="830" y1="170" x2="170" y2="830" />
        <line x1="500" y1="28" x2="500" y2="972" strokeDasharray="1 14" />
        <line x1="28" y1="500" x2="972" y2="500" strokeDasharray="1 14" />
        {/* golden section: square within square, spiral of quarter arcs */}
        <rect x="170" y="170" width="408" height="408" />
        <rect x="578" y="170" width="252" height="252" />
        <rect x="578" y="422" width="156" height="156" />
        <rect x="734" y="482" width="96" height="96" />
        <path d="M170 578 A408 408 0 0 1 578 170" />
        <path d="M578 170 A252 252 0 0 1 830 422" />
        <path d="M830 422 A156 156 0 0 1 674 578" />
        <path d="M674 578 A96 96 0 0 1 578 482" />
        {/* the compass scale */}
        <g strokeWidth={1.2}>{ticks}</g>
        {/* Vitruvian points */}
        <circle cx="500" cy="170" r="6" />
        <circle cx="500" cy="830" r="6" />
        <circle cx="170" cy="500" r="6" />
        <circle cx="830" cy="500" r="6" />
      </svg>
    </div>
  );
}
