'use client';

import { useEffect } from 'react';

/**
 * The storyboard scroll engine, in three parts:
 *
 * 1. Reveal: `[data-reveal]` sections gain `is-visible` as they enter
 *    the viewport. All motion lives in CSS, gated behind `html.js` so
 *    content stays fully visible without JavaScript, and behind
 *    `prefers-reduced-motion` for users who opt out.
 * 2. Scene tracking: the section crossing the middle of the viewport
 *    marks its `[data-scene-link]` in the scene rail as active.
 * 3. Parallax: `[data-parallax]` layers drift at their own rate for
 *    depth, skipped for coarse pointers and reduced motion.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const railLinks = document.querySelectorAll('[data-scene-link]');
    const sceneObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            railLinks.forEach((link) => {
              link.classList.toggle(
                'is-active',
                link.getAttribute('data-scene-link') === entry.target.id,
              );
            });
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    railLinks.forEach((link) => {
      const id = link.getAttribute('data-scene-link');
      const section = id && document.getElementById(id);
      if (section) {
        sceneObserver.observe(section);
      }
    });

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]'),
    );

    let onScroll: (() => void) | null = null;
    if (!reduced && finePointer && parallaxEls.length > 0) {
      let ticking = false;
      const update = () => {
        ticking = false;
        const mid = window.innerHeight / 2;
        for (const el of parallaxEls) {
          const rect = el.getBoundingClientRect();
          const offset = rect.top + rect.height / 2 - mid;
          const factor = parseFloat(el.dataset.parallax || '0.1');
          el.style.transform = `translate3d(0, ${(offset * factor).toFixed(1)}px, 0)`;
        }
      };
      onScroll = () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      update();
    }

    return () => {
      revealObserver.disconnect();
      sceneObserver.disconnect();
      if (onScroll) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
  }, []);

  return null;
}
