'use client';

import React, { useEffect, useRef, useState } from 'react';

/* Must match .weave-row in globals.css: tile width and one weave row. */
const TILE_W = 400;
const BAND = (698 / 2) * (TILE_W / 440);
const GLIDE = 34; // px per second while held
const EASE_IN = 2.4; // per second
const EASE_OUT = 3.5;

/**
 * The woven background as a stack of rows, one weave row each. While the
 * pointer is held down anywhere on the page (not on a link or button)
 * neighbouring rows slide in opposite directions, like links shearing past
 * each other; a sideways drag adds to the shear. On release it eases to a
 * stop. Nothing moves otherwise. Rows are plain elements moved with
 * transforms, so phones handle it the same as desktops.
 */
export default function WeaveDrift() {
  const box = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    const count = () => setRows(Math.ceil(window.innerHeight / BAND) + 1);
    count();
    window.addEventListener('resize', count);
    return () => window.removeEventListener('resize', count);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = box.current;
    if (!el) return;
    const root = document.documentElement;
    let x = 0;
    let v = 0;
    let pressed = false;
    let lastX = 0;
    let raf = 0;
    let then = 0;

    const apply = () => {
      /* The tile repeats every TILE_W, so wrap to keep the numbers small. */
      const o = ((x % TILE_W) + TILE_W) % TILE_W;
      const rowEls = el.querySelectorAll<HTMLElement>('.weave-row');
      rowEls.forEach((r, i) => {
        const s = i % 2 === 0 ? o : -o;
        r.style.transform = `translate3d(${s.toFixed(2)}px, 0, 0)`;
      });
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - then) / 1000);
      then = now;
      const target = pressed ? GLIDE : 0;
      v += (target - v) * Math.min(1, dt * (pressed ? EASE_IN : EASE_OUT));
      x += v * dt;
      apply();
      if (pressed || v > 0.05) raf = requestAnimationFrame(frame);
      else raf = 0;
    };

    const start = () => {
      if (raf) return;
      then = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const interactive = (t: EventTarget | null) =>
      t instanceof Element &&
      t.closest('a, button, input, textarea, select, [role="button"]');

    const down = (e: PointerEvent) => {
      if (e.button !== 0 || interactive(e.target)) return;
      pressed = true;
      lastX = e.clientX;
      window.getSelection()?.removeAllRanges();
      root.classList.add('is-flowing');
      start();
    };
    const move = (e: PointerEvent) => {
      if (!pressed) return;
      x += (e.clientX - lastX) * 0.5;
      lastX = e.clientX;
    };
    const up = () => {
      if (!pressed) return;
      pressed = false;
      root.classList.remove('is-flowing');
      start();
    };
    const menu = (e: Event) => {
      if (pressed) e.preventDefault();
    };

    window.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    window.addEventListener('blur', up);
    window.addEventListener('contextmenu', menu);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      window.removeEventListener('blur', up);
      window.removeEventListener('contextmenu', menu);
      root.classList.remove('is-flowing');
    };
  }, []);

  return (
    <div ref={box} className="weave" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="weave-row"
          style={{
            top: i * BAND,
            backgroundPositionY: -i * BAND,
          }}
        />
      ))}
      <div className="weave-veil" />
    </div>
  );
}
