'use client';

import React, { useEffect, useRef } from 'react';

const NAME = 'Youhanna';

/**
 * The wordmark as dimensional type: each letter is a block with an
 * extruded shadow, the whole word tilts toward the pointer in
 * perspective, and letters rise into place one by one on load.
 * Semantics stay intact: it is still the page's single h1.
 */
export default function Wordmark3D() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let raf = 0;
    let rx = 0;
    let ry = 0;
    let targetX = 0;
    let targetY = 0;

    const tick = () => {
      rx += (targetX - rx) * 0.08;
      ry += (targetY - ry) * 0.08;
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      if (Math.abs(targetX - rx) > 0.01 || Math.abs(targetY - ry) > 0.01) {
        raf = window.requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetY = nx * 9;
      targetX = -ny * 6;
      kick();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <h1 className="hero-wordmark">
      <span className="wordmark-3d" ref={ref}>
        {Array.from(NAME).map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            className="letter"
            style={{ '--i': i } as React.CSSProperties}
          >
            {letter}
          </span>
        ))}
      </span>
      <span className="sr-only"> Meleka</span>
    </h1>
  );
}
