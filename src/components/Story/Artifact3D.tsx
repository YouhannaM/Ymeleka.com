'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

import type { SceneId, Tone } from './three/ArtifactCanvas';

const ArtifactCanvas = dynamic(() => import('./three/ArtifactCanvas'), {
  ssr: false,
});

interface Artifact3DProps {
  scene: SceneId;
  tone: Tone;
  index: number;
  /** The flat engraving: instant poster, and the fallback without WebGL. */
  children: React.ReactNode;
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'),
    );
  } catch {
    return false;
  }
}

/**
 * Progressive 3D: the SVG engraving paints immediately (and is all a
 * reduced-motion or no-WebGL visitor ever sees). When the scene nears
 * the viewport the 3D module loads, mounts behind the poster, and the
 * poster fades to reveal the live artifact. The render loop only runs
 * while the scene is on screen.
 */
export default function Artifact3D({
  scene,
  tone,
  index,
  children,
}: Artifact3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window) || !hasWebGL()) return;
    setSupported(true);

    const nearObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: '70% 0px 70% 0px' },
    );
    const activeObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setActive(e.isIntersecting);
      },
      { threshold: 0.02 },
    );
    nearObserver.observe(el);
    activeObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={ready ? 'artifact is-ready' : 'artifact'}
      data-interactive={supported ? '' : undefined}
    >
      <div className="artifact-poster">{children}</div>
      {supported && near && (
        <div className="artifact-canvas" aria-hidden="true">
          <ArtifactCanvas
            scene={scene}
            tone={tone}
            index={index}
            active={active}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}
