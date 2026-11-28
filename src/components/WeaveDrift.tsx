'use client';

import { useEffect } from 'react';

/* Glide direction follows the strands of the weave (mostly across). */
const DIR = { x: 0.94, y: 0.34 };
const GLIDE = 28; // px per second while held
const EASE_IN = 2.2; // per second
const EASE_OUT = 3.5;

/**
 * While the pointer is held down anywhere on the page (not on a link or
 * button) the woven background glides along its strands and follows the
 * drag like fabric. On release it eases to a stop. Nothing moves otherwise.
 */
export default function WeaveDrift() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const body = document.body;
    let x = 0;
    let y = 0;
    let v = 0;
    let pressed = false;
    let last = { x: 0, y: 0 };
    let raf = 0;
    let then = 0;

    const apply = () => {
      body.style.backgroundPosition = `0 0, calc(50% + ${x.toFixed(2)}px) ${y.toFixed(2)}px`;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - then) / 1000);
      then = now;
      const target = pressed ? GLIDE : 0;
      const k = Math.min(1, dt * (pressed ? EASE_IN : EASE_OUT));
      v += (target - v) * k;
      x += DIR.x * v * dt;
      y += DIR.y * v * dt;
      apply();
      if (pressed || v > 0.05) raf = requestAnimationFrame(frame);
      else raf = 0;
    };

    const start = () => {
      if (raf) return;
      then = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const interactive = (el: EventTarget | null) =>
      el instanceof Element &&
      el.closest('a, button, input, textarea, select, [role="button"]');

    const down = (e: PointerEvent) => {
      if (e.button !== 0 || interactive(e.target)) return;
      pressed = true;
      last = { x: e.clientX, y: e.clientY };
      root.classList.add('is-flowing');
      start();
    };
    const move = (e: PointerEvent) => {
      if (!pressed) return;
      x += e.clientX - last.x;
      y += e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      if (!pressed) return;
      pressed = false;
      root.classList.remove('is-flowing');
      start();
    };

    window.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    window.addEventListener('blur', up);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      window.removeEventListener('blur', up);
      root.classList.remove('is-flowing');
      body.style.backgroundPosition = '';
    };
  }, []);

  return null;
}
