'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { type MutableRefObject, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * The Atlas Fold. A hairline globe carries the four waypoints of the
 * story (Cairo, Happy Valley, California, Ithaca) with the route drawn
 * between them as the visitor begins to scroll. Then the sphere splits
 * into four shell petals that peel to the corners of the viewport, an
 * orange-peel projection unfolding, to reveal the name and the slogan
 * at the center. Everything is driven by a single scroll progress
 * value in [0, 1] supplied by the parent.
 */

const INK = '#000000';
const BONE = '#e7e5e4';
const R = 2.0;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const remap = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Sphere parametrization matching THREE.SphereGeometry. */
function onSphere(phi: number, theta: number, r = R): THREE.Vector3 {
  return new THREE.Vector3(
    -r * Math.cos(phi) * Math.sin(theta),
    r * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/** Latitude and longitude in degrees, with the Atlantic facing front. */
function geo(lat: number, lon: number, r = R): THREE.Vector3 {
  const theta = THREE.MathUtils.degToRad(90 - lat);
  const phi = THREE.MathUtils.degToRad(lon + 115);
  return onSphere(phi, theta, r);
}

const WAYPOINTS = [
  { name: 'Cairo', lat: 30.0, lon: 31.2 },
  { name: 'Happy Valley', lat: 40.8, lon: -77.9 },
  { name: 'California', lat: 37.5, lon: -121.9 },
  { name: 'Ithaca', lat: 42.4, lon: -76.5 },
];

function petalSegments(index: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const phiStart = (index * Math.PI) / 2;
  const step = Math.PI / 12;
  for (let k = 0; k <= 6; k++) {
    const phi = phiStart + k * step;
    for (let s = 0; s < 24; s++) {
      pts.push(
        onSphere(phi, (s / 24) * Math.PI),
        onSphere(phi, ((s + 1) / 24) * Math.PI),
      );
    }
  }
  for (let k = 1; k < 12; k++) {
    const theta = k * step;
    for (let s = 0; s < 12; s++) {
      pts.push(
        onSphere(phiStart + (s / 12) * (Math.PI / 2), theta),
        onSphere(phiStart + ((s + 1) / 12) * (Math.PI / 2), theta),
      );
    }
  }
  return pts;
}

interface Driven {
  progress: MutableRefObject<number>;
  scale: MutableRefObject<number>;
}

/* --- One quarter shell of the globe ------------------------------------- */

function Petal({ index, progress, scale }: Driven & { index: number }) {
  const group = useRef<THREE.Group>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const faceMat = useRef<THREE.MeshBasicMaterial>(null);
  const { viewport } = useThree();

  const lines = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(petalSegments(index)),
    [index],
  );
  const faces = useMemo(
    () =>
      new THREE.SphereGeometry(R, 24, 16, (index * Math.PI) / 2, Math.PI / 2),
    [index],
  );

  const phiCenter = (index * Math.PI) / 2 + Math.PI / 4;
  const dirX = -Math.cos(phiCenter);
  const dirZ = Math.sin(phiCenter);
  const faceCamera = Math.atan2(-dirX, dirZ);
  const cornerX = dirX < 0 ? -1 : 1;
  const cornerY = dirZ > 0 ? 1 : -1;

  useFrame(() => {
    const g = group.current;
    if (!g || !lineMat.current || !faceMat.current) return;
    const p = progress.current;
    const s = scale.current;
    const e = smooth(remap(p, 0.35, 0.8));
    const fade = 1 - smooth(remap(p, 0.84, 1));

    const targetX = (cornerX * (viewport.width / 2 - 0.9 * s)) / s;
    const targetY = (cornerY * (viewport.height / 2 - 0.75 * s)) / s;
    g.position.set(targetX * e, targetY * e, 1.2 * e);
    g.rotation.y = faceCamera * e;
    g.scale.setScalar(1 - 0.5 * e);
    lineMat.current.opacity = 0.7 * fade;
    faceMat.current.opacity = 0.5 * fade;
  });

  return (
    <group ref={group}>
      <mesh geometry={faces}>
        <meshBasicMaterial
          ref={faceMat}
          color={BONE}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <lineSegments geometry={lines}>
        <lineBasicMaterial
          ref={lineMat}
          color={INK}
          transparent
          opacity={0.7}
        />
      </lineSegments>
    </group>
  );
}

/* --- The route between the waypoints ------------------------------------ */

function Route({ progress }: Driven) {
  const mat = useRef<THREE.LineBasicMaterial>(null);
  const { geometry, total } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      const a = geo(WAYPOINTS[i].lat, WAYPOINTS[i].lon, 1).normalize();
      const b = geo(WAYPOINTS[i + 1].lat, WAYPOINTS[i + 1].lon, 1).normalize();
      const omega = a.angleTo(b);
      const steps = 40;
      let prev: THREE.Vector3 | null = null;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const w1 = Math.sin((1 - t) * omega) / Math.sin(omega);
        const w2 = Math.sin(t * omega) / Math.sin(omega);
        const lift = R * (1.01 + 0.1 * Math.sin(Math.PI * t));
        const pt = a
          .clone()
          .multiplyScalar(w1)
          .add(b.clone().multiplyScalar(w2))
          .multiplyScalar(lift);
        if (prev) pts.push(prev, pt);
        prev = pt;
      }
    }
    return {
      geometry: new THREE.BufferGeometry().setFromPoints(pts),
      total: pts.length,
    };
  }, []);

  useFrame(() => {
    const p = progress.current;
    const drawn = smooth(remap(p, 0.02, 0.4));
    geometry.setDrawRange(0, Math.floor(drawn * total));
    if (mat.current)
      mat.current.opacity = 0.95 * (1 - smooth(remap(p, 0.36, 0.6)));
  });

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial ref={mat} color={INK} transparent opacity={0.95} />
    </lineSegments>
  );
}

function Waypoints({ progress }: Driven) {
  const groups = useRef<THREE.Group[]>([]);
  const mats = useRef<THREE.LineBasicMaterial[]>([]);
  const dotMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const ring = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 0.07, Math.sin(a) * 0.07, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  const dot = useMemo(() => new THREE.SphereGeometry(0.025, 8, 6), []);

  useFrame(({ clock }) => {
    const p = progress.current;
    const fade = 1 - smooth(remap(p, 0.36, 0.6));
    groups.current.forEach((g, i) => {
      if (!g) return;
      const pulse = 1 + 0.18 * Math.sin(clock.elapsedTime * 2.4 + i * 1.3);
      g.scale.setScalar(pulse);
    });
    for (const m of mats.current) {
      if (m) m.opacity = fade;
    }
    for (const m of dotMats.current) {
      if (m) m.opacity = fade;
    }
  });

  return (
    <>
      {WAYPOINTS.map((w, i) => {
        const pos = geo(w.lat, w.lon, R * 1.004);
        return (
          <group
            key={w.name}
            position={pos}
            ref={(el) => {
              if (el) {
                groups.current[i] = el;
                el.lookAt(0, 0, 0);
              }
            }}
          >
            <lineLoop geometry={ring}>
              <lineBasicMaterial
                ref={(m) => {
                  if (m) mats.current[i] = m;
                }}
                color={INK}
                transparent
              />
            </lineLoop>
            <mesh geometry={dot}>
              <meshBasicMaterial
                ref={(m) => {
                  if (m) dotMats.current[i] = m;
                }}
                color={INK}
                transparent
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/* --- The globe: spin, lock, and hand off to the petals ------------------ */

function Globe({ progress }: { progress: MutableRefObject<number> }) {
  const outer = useRef<THREE.Group>(null);
  const scale = useRef(1);
  const lockedSpin = useRef<number | null>(null);
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    const g = outer.current;
    if (!g) return;
    const p = progress.current;
    const lock = smooth(remap(p, 0.28, 0.48));

    let spin = (clock.elapsedTime * 0.12) % (Math.PI * 2);
    if (spin > Math.PI) spin -= Math.PI * 2;
    if (lock > 0) {
      if (lockedSpin.current === null) lockedSpin.current = spin;
      spin = lockedSpin.current;
    } else {
      lockedSpin.current = null;
    }
    g.rotation.y = spin * (1 - lock);
    g.rotation.x = 0.28 * (1 - lock);

    const s = Math.min(1, viewport.width / 5.2);
    scale.current = s;
    g.scale.setScalar(s);
  });

  return (
    <group ref={outer}>
      {[0, 1, 2, 3].map((i) => (
        <Petal key={i} index={i} progress={progress} scale={scale} />
      ))}
      <Route progress={progress} scale={scale} />
      <Waypoints progress={progress} scale={scale} />
    </group>
  );
}

export interface HeroGlobeCanvasProps {
  progress: MutableRefObject<number>;
  active: boolean;
}

export default function HeroGlobeCanvas({
  progress,
  active,
}: HeroGlobeCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 8], fov: 40 }}
    >
      <Globe progress={progress} />
    </Canvas>
  );
}
