'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Pointillism. Any image, rendered as a field of dots: larger where
 * the picture is bright (in a dark room) or dark (in a marble room),
 * a scatter of kiln-orange points in the highlights, each dot growing
 * into place when the scene comes into view.
 *
 * The source is a photograph at `src` when one exists, typically an
 * aerial of the place; otherwise the engraved panorama passed as
 * children is rasterized and stippled instead. Both go through the
 * same renderer, so dropping a photo into /public/images/places/ is
 * all it takes to switch a scene over.
 */

interface PointillistProps {
  src?: string;
  tone: 'dark' | 'light';
  seed?: number;
  cols?: number;
  children: React.ReactNode;
}

const MARBLE = '#ece6da';
const OBSIDIAN = '#0d0c0a';
const ACCENT = '#d2772f';

function hash(n: number): number {
  let x = (n + 1) * 2654435761;
  x = (x ^ (x >>> 15)) * 2246822519;
  x = (x ^ (x >>> 13)) * 3266489917;
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

export default function Pointillist({
  src,
  tone,
  seed = 0,
  cols = 150,
  children,
}: PointillistProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    let cancelled = false;
    let raf = 0;
    let dots: { x: number; y: number; r: number; a: number; hot: boolean }[] =
      [];
    let cell = 0;
    let started = 0;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const loadImage = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`could not load ${url}`));
        img.src = url;
      });

    const panoramaUrl = () => {
      const svg = sourceRef.current?.querySelector('svg');
      if (!svg) return null;
      const clone = svg.cloneNode(true) as SVGSVGElement;
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clone.setAttribute('width', '1440');
      clone.setAttribute('height', '600');
      clone.setAttribute(
        'style',
        `color:${tone === 'dark' ? '#ffffff' : '#000000'}`,
      );
      const markup = new XMLSerializer().serializeToString(clone);
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
    };

    const sample = (img: HTMLImageElement, isPhoto: boolean) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const rows = Math.max(8, Math.round((cols * rect.height) / rect.width));
      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const ctx = off.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.fillStyle = tone === 'dark' ? '#000000' : '#ffffff';
      ctx.fillRect(0, 0, cols, rows);
      const scale = Math.max(cols / img.width, rows / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h);
      const data = ctx.getImageData(0, 0, cols, rows).data;

      cell = rect.width / cols;
      const next: typeof dots = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum =
            (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) /
            255;
          const v = tone === 'dark' ? lum : 1 - lum;
          const value = isPhoto ? v ** 1.35 : v;
          if (value < 0.06) continue;
          const k = y * cols + x + seed * 9973;
          const jx = (hash(k) - 0.5) * 0.5;
          const jy = (hash(k + 7) - 0.5) * 0.5;
          next.push({
            x: (x + 0.5 + jx) * cell,
            y: (y + 0.5 + jy) * cell,
            r: Math.max(0.3, value * cell * 0.46),
            a: isPhoto ? 0.22 + value * 0.5 : 0.3 + value * 0.45,
            hot: isPhoto ? value > 0.86 && hash(k + 3) < 0.12 : false,
          });
        }
      }
      dots = next;
    };

    const draw = (progress: number) => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      const ink = tone === 'dark' ? MARBLE : OBSIDIAN;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const stagger = hash(i + seed * 31) * 0.55;
        const t = Math.min(1, Math.max(0, (progress - stagger) / 0.45));
        if (t <= 0) continue;
        const grow = 1 - (1 - t) * (1 - t);
        ctx.globalAlpha = d.a * grow;
        ctx.fillStyle = d.hot ? ACCENT : ink;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * grow, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const animate = (now: number) => {
      if (cancelled) return;
      const p = reduced ? 1 : Math.min(1, (now - started) / 1800);
      draw(p);
      if (p < 1) raf = window.requestAnimationFrame(animate);
    };

    let image: HTMLImageElement | null = null;
    let isPhoto = false;

    const render = () => {
      if (!image) return;
      sample(image, isPhoto);
      if (started) {
        window.cancelAnimationFrame(raf);
        draw(1);
      }
    };

    const begin = () => {
      if (started || !image) return;
      started = performance.now();
      raf = window.requestAnimationFrame(animate);
    };

    const load = async () => {
      try {
        if (src) {
          image = await loadImage(src);
          isPhoto = true;
        } else {
          throw new Error('no photo');
        }
      } catch {
        const url = panoramaUrl();
        if (!url) return;
        try {
          image = await loadImage(url);
        } catch {
          return;
        }
        isPhoto = false;
      }
      if (cancelled) return;
      sample(image, isPhoto);
      if (visible) begin();
    };

    let visible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible) begin();
      },
      { rootMargin: '20% 0px 20% 0px' },
    );
    observer.observe(el);

    const resize = new ResizeObserver(() => render());
    resize.observe(el);

    void load();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      resize.disconnect();
    };
  }, [src, tone, seed, cols]);

  return (
    <div ref={wrap} className="pointillist">
      <canvas ref={canvasRef} />
      <div ref={sourceRef} className="pointillist-source" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
