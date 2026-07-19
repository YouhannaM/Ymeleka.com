'use client';

import { useEffect } from 'react';

/**
 * Reveals `[data-reveal]` sections as they enter the viewport by adding
 * an `is-visible` class. All motion lives in CSS, gated behind the
 * `html.js` flag so content stays fully visible without JavaScript,
 * and behind `prefers-reduced-motion` for users who opt out.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
