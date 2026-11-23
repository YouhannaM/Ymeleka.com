'use client';

import React, { useEffect, useRef, useState } from 'react';

const BRUSH = 22;
/** Share of the foil that must be cleared before the rest fades away. */
const DONE_AT = 0.42;

function cssVar(el: Element, name: string, fallback: string) {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}

/**
 * The name of a place, hidden under a scratch-off foil. The name stays in
 * the DOM (screen readers get it at once); sighted visitors drag a finger
 * or the pointer across the foil, and once enough is gone the rest fades.
 * Enter or Space on the foil reveals it for keyboard users.
 */
export default function ScratchName({ name }: { name: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let started = false;
    let finished = false;
    let drawing = false;
    let moves = 0;
    let last: { x: number; y: number } | null = null;

    const paint = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';

      const foil = cssVar(canvas, '--foil', '#c9c9ce');
      const foil2 = cssVar(canvas, '--foil2', '#a9a9b0');
      const hint = cssVar(canvas, '--foil-ink', '#5c5c62');

      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, foil);
      g.addColorStop(0.5, foil2);
      g.addColorStop(1, foil);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      /* Fine grain so it reads as a scratch panel, not a flat block. */
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      for (let i = 0; i < (w * h) / 26; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      for (let i = 0; i < (w * h) / 40; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }

      ctx.fillStyle = hint;
      ctx.font = '500 11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('scratch to reveal', w / 2, h / 2);
    };

    const point = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const scratch = (p: { x: number; y: number }) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = BRUSH * 2;
      ctx.beginPath();
      if (last) ctx.moveTo(last.x, last.y);
      else ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(p.x, p.y, BRUSH, 0, Math.PI * 2);
      ctx.fill();
      last = p;
    };

    const cleared = () => {
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let gone = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4 * 7) {
        total++;
        if (data[i] === 0) gone++;
      }
      return total ? gone / total : 0;
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
    };

    const check = () => {
      if (cleared() >= DONE_AT) finish();
    };

    const down = (e: PointerEvent) => {
      if (finished) return;
      e.preventDefault();
      started = true;
      drawing = true;
      last = null;
      canvas.setPointerCapture(e.pointerId);
      scratch(point(e));
    };
    const move = (e: PointerEvent) => {
      if (!drawing || finished) return;
      e.preventDefault();
      scratch(point(e));
      if (++moves % 6 === 0) check();
    };
    const up = () => {
      if (!drawing) return;
      drawing = false;
      last = null;
      check();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        finish();
      }
    };

    paint();
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('keydown', key);

    /* Repaint for a new size or theme, but never wipe a scratch in progress. */
    const ro = new ResizeObserver(() => {
      if (!started) paint();
    });
    ro.observe(canvas);
    const mo = new MutationObserver(() => {
      if (!started) paint();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onScheme = () => {
      if (!started) paint();
    };
    mq.addEventListener('change', onScheme);

    return () => {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('keydown', key);
      ro.disconnect();
      mo.disconnect();
      mq.removeEventListener('change', onScheme);
    };
  }, []);

  return (
    <figcaption className={`scratch${done ? ' is-done' : ''}`}>
      <span className="scratch-name">{name}</span>
      <canvas
        ref={canvasRef}
        className="scratch-foil"
        tabIndex={done ? -1 : 0}
        role="button"
        aria-label="Scratch to reveal the name of this place"
        aria-hidden={done ? true : undefined}
      />
    </figcaption>
  );
}
