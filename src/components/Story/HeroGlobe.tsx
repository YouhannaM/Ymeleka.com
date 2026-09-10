'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

const HeroGlobeCanvas = dynamic(() => import('./three/HeroGlobeCanvas'), {
  ssr: false,
});

type Mode = 'pending' | 'live' | 'static';

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * The hero as one scroll-driven scene. The section is taller than the
 * viewport and its stage sticks while the visitor scrolls through it;
 * that scroll distance becomes a progress value in [0, 1] which drives
 * the globe (via a ref read every frame) and the typography (via the
 * --hero-p custom property). Without WebGL or with reduced motion the
 * hero renders in its final, fully revealed state.
 */
export default function HeroGlobe({ children }: { children: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [mode, setMode] = useState<Mode>('pending');
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !hasWebGL()
    ) {
      setMode('static');
      return;
    }
    setMode('live');

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 1;
      progress.current = p;
      el.style.setProperty('--hero-p', p.toFixed(4));
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={section}
      className="hero"
      aria-label="Introduction"
      data-mode={mode}
    >
      <div className="hero-stage">
        {mode === 'live' && (
          <div className="hero-canvas" aria-hidden="true">
            <HeroGlobeCanvas progress={progress} active={active} />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
