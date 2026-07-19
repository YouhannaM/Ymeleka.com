'use client';

import { useEffect } from 'react';

/**
 * Gallery cursor: a small dot with a trailing ring, drawn in white
 * under `mix-blend-mode: difference` so it inverts against both the
 * putty and ink rooms. Only mounts for fine pointers; the ring grows
 * over links and buttons. With reduced motion the ring follows the
 * dot exactly instead of trailing.
 */
export default function Cursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);
    document.documentElement.classList.add('has-cursor');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let raf = 0;

    const trail = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = window.requestAnimationFrame(trail);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (reduced) {
        ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      dot.classList.add('is-shown');
      ring.classList.add('is-shown');
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as Element).closest?.('a, button');
      ring.classList.toggle('is-on-link', Boolean(interactive));
    };

    const onDown = () => ring.classList.add('is-pressed');
    const onUp = () => ring.classList.remove('is-pressed');
    const onLeave = () => {
      dot.classList.remove('is-shown');
      ring.classList.remove('is-shown');
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    if (!reduced) {
      raf = window.requestAnimationFrame(trail);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-cursor');
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
