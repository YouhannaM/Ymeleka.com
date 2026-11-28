'use client';

import React, { useEffect, useRef } from 'react';

/* Must match the body background in globals.css. */
const TILE_W = 400;
const TILE_IMG = '/weave-light.webp';
const PIXEL = 4; // CSS px per drawn pixel
const FIELD_W = 110; // field cells across one tile
const COUNT_PER_PX = 1 / 3800; // particles per viewport pixel
const SPEED = 46; // px per second while pressed
const HOVER_R = 110;

type Field = {
  w: number;
  h: number;
  cell: number; // CSS px per cell
  tileH: number; // CSS px
  gx: Float32Array;
  gy: Float32Array;
  mag: Float32Array;
  max: number;
};

/**
 * Builds a gradient field from the weave tile: the magnitude marks the
 * edges of the woven tubes and the gradient points across them, so the
 * tangent runs along them.
 */
async function loadField(): Promise<Field> {
  const img = new Image();
  img.src = TILE_IMG;
  await img.decode();
  const w = FIELD_W;
  const h = Math.round((img.naturalHeight / img.naturalWidth) * w);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('no 2d context');
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);
  const g = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    g[i] = (data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2]) / 3;
  }
  const at = (x: number, y: number) => g[((y + h) % h) * w + ((x + w) % w)];
  const gx = new Float32Array(w * h);
  const gy = new Float32Array(w * h);
  const mag = new Float32Array(w * h);
  let max = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx =
        -at(x - 1, y - 1) -
        2 * at(x - 1, y) -
        at(x - 1, y + 1) +
        at(x + 1, y - 1) +
        2 * at(x + 1, y) +
        at(x + 1, y + 1);
      const dy =
        -at(x - 1, y - 1) -
        2 * at(x, y - 1) -
        at(x + 1, y - 1) +
        at(x - 1, y + 1) +
        2 * at(x, y + 1) +
        at(x + 1, y + 1);
      const i = y * w + x;
      gx[i] = dx;
      gy[i] = dy;
      mag[i] = Math.hypot(dx, dy);
      if (mag[i] > max) max = mag[i];
    }
  }
  const cell = TILE_W / w;
  return { w, h, cell, tileH: cell * h, gx, gy, mag, max };
}

type P = {
  x: number; // document CSS px
  y: number;
  dx: number;
  dy: number;
  seed: number;
};

/**
 * Pixel grains that sit on the weave's outlines and only travel along them
 * while the pointer is held down anywhere on the page. Near the cursor
 * they glow a little, which is the invitation.
 */
export default function WeaveFlow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let field: Field | null = null;
    let raf = 0;
    let alive = true;
    let W = 0;
    let H = 0;
    let lw = 0;
    let lh = 0;
    let pressed = false;
    let hover = { x: -1e4, y: -1e4 };
    let particles: P[] = [];
    let last = performance.now();
    const low = document.createElement('canvas');
    const lctx = low.getContext('2d');
    if (!lctx) return;

    const color = () => {
      const dark =
        document.documentElement.dataset.theme === 'dark' ||
        (document.documentElement.dataset.theme !== 'light' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      return dark ? [255, 90, 31] : [29, 29, 31];
    };

    /* Tile origin: the body background is centered horizontally, top aligned. */
    const originX = () => ((W - TILE_W) / 2) % TILE_W;

    const sample = (f: Field, x: number, y: number) => {
      const tx = (((x - originX()) % TILE_W) + TILE_W) % TILE_W;
      const ty = ((y % f.tileH) + f.tileH) % f.tileH;
      const cx = Math.min(f.w - 1, Math.floor(tx / f.cell));
      const cy = Math.min(f.h - 1, Math.floor(ty / f.cell));
      return cy * f.w + cx;
    };

    const onEdge = (f: Field, x: number, y: number) =>
      f.mag[sample(f, x, y)] > f.max * 0.28;

    const spawn = (f: Field, p?: P): P => {
      const q: P = p ?? { x: 0, y: 0, dx: 1, dy: 0, seed: Math.random() };
      const sy = window.scrollY;
      for (let tries = 0; tries < 40; tries++) {
        q.x = Math.random() * W;
        q.y = sy - 40 + Math.random() * (H + 80);
        if (onEdge(f, q.x, q.y)) break;
      }
      const a = Math.random() * Math.PI * 2;
      q.dx = Math.cos(a);
      q.dy = Math.sin(a);
      return q;
    };

    const resize = () => {
      W = document.documentElement.clientWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      lw = Math.ceil(W / PIXEL);
      lh = Math.ceil(H / PIXEL);
      low.width = lw;
      low.height = lh;
      if (field) {
        const n = Math.round(W * H * COUNT_PER_PX);
        while (particles.length < n) particles.push(spawn(field));
        particles.length = n;
      }
    };

    const step = (f: Field, p: P, dt: number) => {
      const i = sample(f, p.x, p.y);
      const m = f.mag[i];
      let vx: number;
      let vy: number;
      if (m > f.max * 0.12) {
        /* Along the edge: the tangent, signed to keep the heading. */
        let tx = -f.gy[i] / m;
        let ty = f.gx[i] / m;
        if (tx * p.dx + ty * p.dy < 0) {
          tx = -tx;
          ty = -ty;
        }
        /* Climb the magnitude a little so grains stay on the crest. */
        const r = sample(f, p.x + f.cell, p.y);
        const d = sample(f, p.x, p.y + f.cell);
        const cx = f.mag[r] - m;
        const cy = f.mag[d] - m;
        const cl = Math.hypot(cx, cy) || 1;
        vx = tx + (cx / cl) * 0.35;
        vy = ty + (cy / cl) * 0.35;
      } else {
        /* Off the weave: head back toward it. */
        const r = sample(f, p.x + f.cell, p.y);
        const d = sample(f, p.x, p.y + f.cell);
        const cx = f.mag[r] - m;
        const cy = f.mag[d] - m;
        const cl = Math.hypot(cx, cy);
        if (cl < 1e-3) {
          spawn(f, p);
          return;
        }
        vx = cx / cl;
        vy = cy / cl;
      }
      const vl = Math.hypot(vx, vy) || 1;
      p.dx = p.dx * 0.6 + (vx / vl) * 0.4;
      p.dy = p.dy * 0.6 + (vy / vl) * 0.4;
      const dl = Math.hypot(p.dx, p.dy) || 1;
      p.dx /= dl;
      p.dy /= dl;
      p.x += p.dx * SPEED * dt;
      p.y += p.dy * SPEED * dt;
      const sy = window.scrollY;
      if (p.x < -20 || p.x > W + 20 || p.y < sy - 60 || p.y > sy + H + 60) {
        spawn(f, p);
      }
    };

    const frame = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const f = field;
      if (!f) return;

      /* Trails fade fast while flowing, slowly at rest. */
      lctx.globalCompositeOperation = 'destination-out';
      lctx.fillStyle = `rgba(0,0,0,${pressed ? 0.16 : 0.06})`;
      lctx.fillRect(0, 0, lw, lh);
      lctx.globalCompositeOperation = 'source-over';

      const [r, g, b] = color();
      const sy = window.scrollY;
      const t = now / 1000;
      for (const p of particles) {
        if (pressed) step(f, p, dt);
        const vx = p.x;
        const vy = p.y - sy;
        if (vy < -8 || vy > H + 8) continue;
        const hd = Math.hypot(vx - hover.x, vy - hover.y);
        const near = hd < HOVER_R ? 1 - hd / HOVER_R : 0;
        /* A slow twinkle at rest; brighter near the cursor; solid in flow. */
        const twinkle = 0.35 + 0.25 * Math.sin(t * 1.6 + p.seed * 12.6);
        const a = pressed ? 0.85 : Math.min(0.95, twinkle * 0.6 + near * 0.6);
        lctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
        const jx = near > 0 && !pressed ? (Math.random() - 0.5) * near : 0;
        lctx.fillRect(
          Math.floor(vx / PIXEL + jx),
          Math.floor(vy / PIXEL),
          1,
          1,
        );
      }
      ctx.clearRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(low, 0, 0, lw, lh, 0, 0, lw * PIXEL, lh * PIXEL);
    };

    const interactive = (el: EventTarget | null) =>
      el instanceof Element &&
      el.closest('a, button, input, textarea, select, [role="button"]');

    const down = (e: PointerEvent) => {
      if (e.button !== 0 || interactive(e.target)) return;
      pressed = true;
      document.documentElement.classList.add('is-flowing');
    };
    const up = () => {
      pressed = false;
      document.documentElement.classList.remove('is-flowing');
    };
    const move = (e: PointerEvent) => {
      hover = { x: e.clientX, y: e.clientY };
    };
    const leave = () => {
      hover = { x: -1e4, y: -1e4 };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    window.addEventListener('blur', up);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave);
    document.addEventListener('mouseleave', leave);

    loadField()
      .then((f) => {
        if (!alive) return;
        field = f;
        resize();
        last = performance.now();
        raf = requestAnimationFrame(frame);
      })
      .catch(() => {
        /* No field, no flow; the static background still shows. */
      });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      window.removeEventListener('blur', up);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('is-flowing');
    };
  }, []);

  return <canvas ref={ref} className="weave-flow" aria-hidden="true" />;
}
