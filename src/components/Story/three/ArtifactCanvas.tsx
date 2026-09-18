'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three-dimensional engravings for each scene. Every artifact is drawn
 * the way the flat vignettes are: solid faces in the room's color with
 * hairline edges, so the objects read as technical drawings that
 * happen to be real geometry. Interaction: drag to turn, pointer tilt,
 * a slow idle rotation, and a nudge from the page scroll.
 *
 * Each scene is a small looping film: I the pyramids under a turning
 * sun, II the Nittany Lion poured and cast in bronze, III a Cybertruck
 * assembled part by part beneath a gantry, IV McGraw Tower rising from
 * a chip between server racks with orbits running, V a robotic arm
 * working a moving line of apples.
 */

export type SceneId =
  | 'origins'
  | 'foundations'
  | 'scale'
  | 'depth'
  | 'ficio'
  | 'column';
export type Tone = 'dark' | 'light';

interface Palette {
  line: string;
  face: string;
  accent: string;
}

const palettes: Record<Tone, Palette> = {
  dark: { line: '#ece6da', face: '#16140f', accent: '#d2772f' },
  light: { line: '#0d0c0a', face: '#e4dccf', accent: '#d2772f' },
};

type Vec3 = [number, number, number];

interface Placed {
  position?: Vec3;
  rotation?: Vec3;
  scale?: number | Vec3;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const remap = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const ease = (t: number) => t * t * (3 - 2 * t);

/* --- Primitives ---------------------------------------------------------- */

interface EdgedProps extends Placed {
  geometry: THREE.BufferGeometry;
  palette: Palette;
  threshold?: number;
  faces?: boolean;
}

/** A mesh with occluding faces and crisp edges: the 3D engraving stroke. */
function Edged({
  geometry,
  palette,
  threshold = 20,
  faces = true,
  ...placed
}: EdgedProps) {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry, threshold),
    [geometry, threshold],
  );
  return (
    <group {...placed}>
      {faces && (
        <mesh geometry={geometry}>
          <meshBasicMaterial
            color={palette.face}
            polygonOffset
            polygonOffsetFactor={1}
            polygonOffsetUnits={1}
          />
        </mesh>
      )}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={palette.line} />
      </lineSegments>
    </group>
  );
}

/** A solid in the kiln accent: molten metal, cable, status lights. */
function Solid({
  geometry,
  palette,
  ...placed
}: { geometry: THREE.BufferGeometry; palette: Palette } & Placed) {
  return (
    <mesh geometry={geometry} {...placed}>
      <meshBasicMaterial color={palette.accent} />
    </mesh>
  );
}

interface SegmentsProps extends Placed {
  points: Vec3[];
  palette: Palette;
  opacity?: number;
}

/** Straight hairlines from pairs of points. */
function Segments({ points, palette, opacity = 1, ...placed }: SegmentsProps) {
  const geometry = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(...p)),
      ),
    [points],
  );
  return (
    <group {...placed}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color={palette.line}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </lineSegments>
    </group>
  );
}

interface RingProps extends Placed {
  radius: number;
  palette: Palette;
  segments?: number;
  opacity?: number;
}

/** A hairline circle in the local XY plane. */
function Ring({
  radius,
  palette,
  segments = 64,
  opacity = 1,
  ...placed
}: RingProps) {
  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0),
      );
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius, segments]);
  return (
    <group {...placed}>
      <lineLoop geometry={geometry}>
        <lineBasicMaterial
          color={palette.line}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </lineLoop>
    </group>
  );
}

/** A faint ground grid that anchors each artifact on a plane. */
function Grid({
  palette,
  size = 6,
  divisions = 8,
  y = -0.9,
}: {
  palette: Palette;
  size?: number;
  divisions?: number;
  y?: number;
}) {
  const points = useMemo(() => {
    const pts: Vec3[] = [];
    const half = size / 2;
    for (let i = 0; i <= divisions; i++) {
      const v = -half + (i / divisions) * size;
      pts.push([v, y, -half], [v, y, half], [-half, y, v], [half, y, v]);
    }
    return pts;
  }, [size, divisions, y]);
  return <Segments points={points} palette={palette} opacity={0.22} />;
}

interface SceneProps {
  palette: Palette;
}

/* --- Scene I: Giza ------------------------------------------------------- */

function Origins({ palette }: SceneProps) {
  const big = useMemo(() => new THREE.ConeGeometry(1.6, 1.7, 4), []);
  const mid = useMemo(() => new THREE.ConeGeometry(1.05, 1.1, 4), []);
  const small = useMemo(() => new THREE.ConeGeometry(0.65, 0.7, 4), []);
  const sun = useRef<THREE.Group>(null);
  const rays = useMemo<Vec3[]>(() => {
    const pts: Vec3[] = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      pts.push(
        [Math.cos(a) * 0.46, Math.sin(a) * 0.46, 0],
        [Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0],
      );
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    if (sun.current) {
      sun.current.rotation.z = clock.elapsedTime * 0.25;
      sun.current.position.y = 2.05 + Math.sin(clock.elapsedTime * 0.7) * 0.06;
    }
  });

  const quarter: Vec3 = [0, Math.PI / 4, 0];
  return (
    <>
      <Grid palette={palette} />
      <Edged
        geometry={big}
        palette={palette}
        position={[0.2, -0.05, -0.3]}
        rotation={quarter}
      />
      <Edged
        geometry={mid}
        palette={palette}
        position={[-1.75, -0.35, 0.5]}
        rotation={quarter}
      />
      <Edged
        geometry={small}
        palette={palette}
        position={[1.95, -0.55, 0.9]}
        rotation={quarter}
      />
      <group ref={sun} position={[1.7, 2.05, -1.6]}>
        <Ring radius={0.34} palette={palette} />
        <Segments points={rays} palette={palette} />
      </group>
    </>
  );
}

/* --- Scene II: casting the Nittany Lion --------------------------------- */

/** Side silhouette of the crouching lion, nose to the left. */
const LION: [number, number][] = [
  [-1.15, 0.55],
  [-0.95, 0.85],
  [-0.9, 1.02],
  [-0.8, 0.9],
  [-0.7, 1.0],
  [-0.62, 0.88],
  [-0.4, 0.9],
  [0.0, 0.95],
  [0.5, 0.9],
  [0.95, 0.8],
  [1.15, 0.55],
  [1.3, 0.4],
  [1.35, 0.15],
  [1.25, 0.12],
  [1.1, 0.2],
  [1.05, 0.0],
  [0.7, 0.0],
  [0.6, 0.15],
  [0.1, 0.12],
  [-0.1, 0.0],
  [-0.7, 0.0],
  [-0.75, 0.1],
  [-0.85, 0.3],
  [-1.0, 0.35],
  [-1.12, 0.42],
];

function Foundations({ palette }: SceneProps) {
  const pedestal = useMemo(() => new THREE.BoxGeometry(2.8, 0.3, 1.3), []);
  const lion = useMemo(() => {
    const shape = new THREE.Shape(
      LION.map(([x, y]) => new THREE.Vector2(x, y)),
    );
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.5,
      bevelEnabled: false,
    });
    geo.translate(0, 0, -0.25);
    return geo;
  }, []);
  const half = useMemo(() => new THREE.BoxGeometry(1.4, 1.3, 0.95), []);
  const fill = useMemo(() => new THREE.BoxGeometry(2.6, 1.1, 0.7), []);
  const ladle = useMemo(
    () =>
      new THREE.LatheGeometry(
        [
          new THREE.Vector2(0.0, 0),
          new THREE.Vector2(0.3, 0),
          new THREE.Vector2(0.38, 0.32),
          new THREE.Vector2(0.34, 0.34),
        ],
        20,
      ),
    [],
  );
  const stream = useMemo(
    () => new THREE.CylinderGeometry(0.035, 0.035, 1, 8),
    [],
  );
  const drop = useMemo(() => new THREE.SphereGeometry(0.04, 6, 4), []);

  const ladleRef = useRef<THREE.Group>(null);
  const streamRef = useRef<THREE.Group>(null);
  const fillRef = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const drops = useRef<THREE.Mesh[]>([]);

  // Stream runs from the ladle lip to the mold mouth.
  const lip = new THREE.Vector3(0.56, 1.02, 0);
  const mouth = new THREE.Vector3(0.18, 0.62, 0);
  const dir = mouth.clone().sub(lip);
  const streamLen = dir.length();
  const streamAngle = Math.atan2(dir.x, -dir.y);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime % 11;
    const tilt = ease(remap(t, 0, 1.2)) * (1 - ease(remap(t, 4.0, 4.8)));
    const pour = ease(remap(t, 1.0, 1.4)) * (1 - ease(remap(t, 3.8, 4.4)));
    const open = ease(remap(t, 5.2, 7.0)) * (1 - ease(remap(t, 9.8, 11)));
    const level = remap(t, 1.2, 4.0) * (1 - ease(remap(t, 9.8, 10.6)));

    if (ladleRef.current) ladleRef.current.rotation.z = -1.05 * tilt;
    if (streamRef.current) {
      streamRef.current.scale.y = Math.max(0.001, pour * streamLen);
      streamRef.current.visible = pour > 0.01;
    }
    if (fillRef.current) {
      fillRef.current.scale.set(
        Math.max(0.001, 1 - open),
        Math.max(0.001, level),
        Math.max(0.001, 1 - open),
      );
    }
    if (left.current) left.current.position.x = -0.7 - 1.35 * open;
    if (right.current) right.current.position.x = 0.7 + 1.35 * open;
    drops.current.forEach((d, i) => {
      if (!d) return;
      const f = (t * 1.5 + i * 0.33) % 1;
      d.position.copy(lip).addScaledVector(dir, f);
      d.visible = pour > 0.5;
    });
  });

  return (
    <>
      <Grid palette={palette} y={-1.0} />
      <Edged geometry={pedestal} palette={palette} position={[0, -0.85, 0]} />
      <Edged geometry={lion} palette={palette} position={[0, -0.7, 0]} />
      <group ref={fillRef} position={[0, -0.7, 0]}>
        <Edged geometry={fill} palette={palette} position={[0, 0.55, 0]} />
      </group>
      <group ref={left} position={[-0.7, -0.05, 0]}>
        <Edged geometry={half} palette={palette} faces={false} />
      </group>
      <group ref={right} position={[0.7, -0.05, 0]}>
        <Edged geometry={half} palette={palette} faces={false} />
      </group>
      <group ref={ladleRef} position={[0.95, 1.15, 0]}>
        <Edged geometry={ladle} palette={palette} threshold={30} />
        <Segments
          points={[
            [0.34, 0.3, 0],
            [1.0, 0.55, 0],
          ]}
          palette={palette}
        />
      </group>
      <group
        ref={streamRef}
        position={[lip.x, lip.y, lip.z]}
        rotation={[0, 0, streamAngle]}
      >
        <Solid geometry={stream} palette={palette} position={[0, -0.5, 0]} />
      </group>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          geometry={drop}
          ref={(el) => {
            if (el) drops.current[i] = el;
          }}
        >
          <meshBasicMaterial color={palette.accent} />
        </mesh>
      ))}
    </>
  );
}

/* --- Scene III: assembling the Cybertruck -------------------------------- */

function Scale({ palette }: SceneProps) {
  const cab = useMemo(() => {
    const shape = new THREE.Shape([
      new THREE.Vector2(-1.56, 0.35),
      new THREE.Vector2(-1.56, 0.53),
      new THREE.Vector2(-1.24, 0.97),
      new THREE.Vector2(0.13, 1.51),
      new THREE.Vector2(1.56, 0.88),
      new THREE.Vector2(1.56, 0.35),
    ]);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 1.4,
      bevelEnabled: false,
    });
    geo.translate(0, 0, -0.7);
    return geo;
  }, []);
  const chassis = useMemo(() => new THREE.BoxGeometry(3.2, 0.16, 1.5), []);
  const wheel = useMemo(
    () => new THREE.CylinderGeometry(0.34, 0.34, 0.24, 28),
    [],
  );
  const post = useMemo(
    () => new THREE.CylinderGeometry(0.03, 0.03, 2.8, 8),
    [],
  );
  const beam = useMemo(() => new THREE.BoxGeometry(4.4, 0.07, 0.07), []);
  const trolley = useMemo(() => new THREE.BoxGeometry(0.34, 0.12, 0.34), []);
  const cable = useMemo(() => new THREE.CylinderGeometry(0.01, 0.01, 1, 6), []);
  const spokes = useMemo<Vec3[]>(
    () => [
      [0, 0, 0.13],
      [0, 0.3, 0.13],
      [0, 0, 0.13],
      [0.26, -0.15, 0.13],
      [0, 0, 0.13],
      [-0.26, -0.15, 0.13],
    ],
    [],
  );

  const truck = useRef<THREE.Group>(null);
  const cabRef = useRef<THREE.Group>(null);
  const chassisRef = useRef<THREE.Group>(null);
  const cableRef = useRef<THREE.Group>(null);
  const wheelGroups = useRef<THREE.Group[]>([]);
  const wheelSpins = useRef<THREE.Group[]>([]);

  const wheelHome: Vec3[] = [
    [-0.82, 0.34, 0.72],
    [0.9, 0.34, 0.72],
    [-0.82, 0.34, -0.72],
    [0.9, 0.34, -0.72],
  ];

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime % 12;
    const reset = 1 - ease(remap(t, 10.4, 11.8));
    const chassisIn = ease(remap(t, 0.2, 2.4)) * reset;
    const cabIn = ease(remap(t, 1.8, 4.6)) * reset;
    const wheelsIn = ease(remap(t, 4.2, 6.4)) * reset;
    const cableGone = ease(remap(t, 5.0, 5.8)) * reset;
    const assembled = t > 6.4 && t < 10.4;

    if (chassisRef.current)
      chassisRef.current.position.x = -4.2 * (1 - chassisIn);
    const cabY = 2.3 * (1 - cabIn);
    if (cabRef.current) cabRef.current.position.y = cabY;
    if (cableRef.current) {
      const len = Math.max(0.001, (1.9 - (cabY + 1.51)) * (1 - cableGone));
      cableRef.current.scale.y = len;
      cableRef.current.visible = len > 0.01;
    }
    wheelGroups.current.forEach((g, i) => {
      if (!g) return;
      const home = wheelHome[i];
      const side = home[2] > 0 ? 1 : -1;
      const z = home[2] + side * 2.4 * (1 - wheelsIn);
      g.position.set(home[0], home[1], z);
      const spin = wheelSpins.current[i];
      if (spin) {
        if (assembled) spin.rotation.z -= dt * 2.4;
        else spin.rotation.z = -(z - home[2]) * side * 2.5;
      }
    });
    if (truck.current) {
      truck.current.position.y =
        -0.8 + (assembled ? Math.sin(clock.elapsedTime * 3) * 0.012 : 0);
    }
  });

  return (
    <>
      <Grid palette={palette} y={-0.8} />
      <group position={[0, -0.8, 0]}>
        <Edged
          geometry={post}
          palette={palette}
          position={[-2.1, 1.4, 0]}
          faces={false}
          threshold={40}
        />
        <Edged
          geometry={post}
          palette={palette}
          position={[2.1, 1.4, 0]}
          faces={false}
          threshold={40}
        />
        <Edged geometry={beam} palette={palette} position={[0, 2.8, 0]} />
        <Edged geometry={trolley} palette={palette} position={[0.1, 2.7, 0]} />
        <group ref={cableRef} position={[0.1, 2.64, 0]}>
          <Solid geometry={cable} palette={palette} position={[0, -0.5, 0]} />
        </group>
      </group>
      <group ref={truck} position={[0, -0.8, 0]}>
        <group ref={chassisRef}>
          <Edged geometry={chassis} palette={palette} position={[0, 0.3, 0]} />
        </group>
        <group ref={cabRef}>
          <Edged geometry={cab} palette={palette} />
        </group>
        {wheelHome.map((home, i) => (
          <group
            key={home.join(',')}
            ref={(el) => {
              if (el) wheelGroups.current[i] = el;
            }}
          >
            <group
              ref={(el) => {
                if (el) wheelSpins.current[i] = el;
              }}
            >
              <Edged
                geometry={wheel}
                palette={palette}
                rotation={[Math.PI / 2, 0, 0]}
                threshold={40}
              />
              <Ring radius={0.14} palette={palette} position={[0, 0, 0.13]} />
              <Segments points={spokes} palette={palette} />
            </group>
          </group>
        ))}
      </group>
    </>
  );
}

/* --- Scene IV: McGraw Tower on a chip, between racks -------------------- */

function Depth({ palette }: SceneProps) {
  const chip = useMemo(() => new THREE.BoxGeometry(2.4, 0.14, 2.4), []);
  const pin = useMemo(() => new THREE.BoxGeometry(0.14, 0.05, 0.28), []);
  const tower = useMemo(() => new THREE.BoxGeometry(0.5, 1.9, 0.5), []);
  const spire = useMemo(() => new THREE.ConeGeometry(0.42, 0.75, 4), []);
  const finial = useMemo(() => new THREE.SphereGeometry(0.05, 8, 6), []);
  const electron = useMemo(() => new THREE.SphereGeometry(0.06, 8, 6), []);
  const rack = useMemo(() => new THREE.BoxGeometry(0.5, 1.0, 0.6), []);
  const slots = useMemo<Vec3[]>(() => {
    const pts: Vec3[] = [];
    for (let i = 0; i < 7; i++) {
      const y = -0.4 + i * 0.13;
      pts.push([-0.2, y, 0.305], [0.2, y, 0.305]);
    }
    return pts;
  }, []);
  const lights = useRef<THREE.Mesh[]>([]);
  const led = useMemo(() => new THREE.SphereGeometry(0.02, 6, 4), []);
  const traces = useMemo<Vec3[]>(
    () => [
      [-0.25, -0.77, 0.25],
      [-0.25, -0.77, 0.75],
      [-0.25, -0.77, 0.75],
      [-0.6, -0.77, 0.75],
      [0.25, -0.77, 0.25],
      [0.6, -0.77, 0.25],
      [0.6, -0.77, 0.25],
      [0.6, -0.77, 0.75],
      [-0.25, -0.77, -0.25],
      [-0.75, -0.77, -0.25],
      [-0.75, -0.77, -0.25],
      [-0.75, -0.77, -0.8],
      [0.25, -0.77, -0.25],
      [0.25, -0.77, -0.7],
      [0.25, -0.77, -0.7],
      [0.8, -0.77, -0.7],
    ],
    [],
  );
  const hands = useRef<THREE.Group>(null);
  const orbitA = useRef<THREE.Group>(null);
  const orbitB = useRef<THREE.Group>(null);

  useFrame(({ clock }, dt) => {
    if (hands.current) hands.current.rotation.z -= dt * 0.6;
    if (orbitA.current) orbitA.current.rotation.z += dt * 0.7;
    if (orbitB.current) orbitB.current.rotation.z -= dt * 0.5;
    lights.current.forEach((m, i) => {
      if (m) m.visible = Math.sin(clock.elapsedTime * (2.2 + i * 0.7) + i) > 0;
    });
  });

  const pins: Vec3[] = [];
  for (let i = -2; i <= 2; i++) {
    pins.push([i * 0.4, -0.85, 1.34], [i * 0.4, -0.85, -1.34]);
  }
  const sidePins: Vec3[] = [];
  for (let i = -2; i <= 2; i++) {
    sidePins.push([1.34, -0.85, i * 0.4], [-1.34, -0.85, i * 0.4]);
  }
  const pads: Vec3[] = [
    [-0.75, -0.76, -0.8],
    [0.8, -0.76, -0.7],
  ];
  const racks: Vec3[] = [
    [-0.85, -0.28, 0.72],
    [0.85, -0.28, 0.72],
  ];

  return (
    <>
      <Edged geometry={chip} palette={palette} position={[0, -0.85, 0]} />
      {pins.map((p) => (
        <Edged
          key={p.join(',')}
          geometry={pin}
          palette={palette}
          position={p}
        />
      ))}
      {sidePins.map((p) => (
        <Edged
          key={p.join(',')}
          geometry={pin}
          palette={palette}
          position={p}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
      <Segments points={traces} palette={palette} opacity={0.7} />
      {pads.map((p) => (
        <Ring
          key={p.join(',')}
          radius={0.08}
          palette={palette}
          position={p}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
      {racks.map((r, i) => (
        <group key={r.join(',')} position={r}>
          <Edged geometry={rack} palette={palette} />
          <Segments points={slots} palette={palette} opacity={0.75} />
          <mesh
            geometry={led}
            position={[0.17, 0.42, 0.31]}
            ref={(el) => {
              if (el) lights.current[i] = el;
            }}
          >
            <meshBasicMaterial color={palette.accent} />
          </mesh>
        </group>
      ))}
      <Edged geometry={tower} palette={palette} position={[0, 0.17, 0]} />
      <Edged
        geometry={spire}
        palette={palette}
        position={[0, 1.495, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
      <Edged
        geometry={finial}
        palette={palette}
        position={[0, 1.92, 0]}
        threshold={10}
      />
      <group position={[0, 0.75, 0.256]}>
        <Ring radius={0.17} palette={palette} />
        <group ref={hands}>
          <Segments
            points={[
              [0, 0, 0],
              [0, 0.13, 0],
              [0, 0, 0],
              [0.09, -0.04, 0],
            ]}
            palette={palette}
          />
        </group>
      </group>
      <group ref={orbitA} rotation={[1.15, 0.35, 0]} position={[0, 0.4, 0]}>
        <Ring radius={1.35} palette={palette} opacity={0.6} />
        <Solid geometry={electron} palette={palette} position={[1.35, 0, 0]} />
      </group>
      <group ref={orbitB} rotation={[1.9, -0.5, 0.6]} position={[0, 0.4, 0]}>
        <Ring radius={1.55} palette={palette} opacity={0.45} />
        <Solid geometry={electron} palette={palette} position={[1.55, 0, 0]} />
      </group>
    </>
  );
}

/* --- Scene V: Ficio ------------------------------------------------------ */

function Ficio({ palette }: SceneProps) {
  const belt = useMemo(() => new THREE.BoxGeometry(3.0, 0.08, 0.7), []);
  const roller = useMemo(
    () => new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16),
    [],
  );
  const base = useMemo(() => new THREE.BoxGeometry(0.9, 0.3, 0.7), []);
  const column = useMemo(
    () => new THREE.CylinderGeometry(0.14, 0.18, 0.5, 12),
    [],
  );
  const upper = useMemo(() => new THREE.BoxGeometry(0.16, 0.95, 0.16), []);
  const fore = useMemo(() => new THREE.BoxGeometry(0.14, 0.85, 0.14), []);
  const joint = useMemo(() => new THREE.SphereGeometry(0.15, 10, 6), []);
  const finger = useMemo(() => new THREE.BoxGeometry(0.05, 0.3, 0.12), []);
  const apple = useMemo(() => new THREE.SphereGeometry(0.2, 10, 7), []);
  const stem = useMemo(
    () => new THREE.CylinderGeometry(0.015, 0.015, 0.14, 6),
    [],
  );

  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const fingerL = useRef<THREE.Group>(null);
  const fingerR = useRef<THREE.Group>(null);
  const rollers = useRef<THREE.Group[]>([]);
  const apples = useRef<THREE.Group[]>([]);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (shoulder.current)
      shoulder.current.rotation.z = -0.8 + Math.sin(t * 0.9) * 0.2;
    if (elbow.current)
      elbow.current.rotation.z = 1.45 + Math.sin(t * 0.9 + 1) * 0.3;
    const gap = 0.09 + (Math.sin(t * 1.8) + 1) * 0.06;
    if (fingerL.current) fingerL.current.position.x = -gap;
    if (fingerR.current) fingerR.current.position.x = gap;
    for (const r of rollers.current) {
      if (r) r.rotation.z -= dt * 1.6;
    }
    apples.current.forEach((a, i) => {
      if (a) a.position.x = ((t * 0.45 + i * 1.0) % 3.0) - 1.5;
    });
  });

  const rollerX = [-1.0, 0, 1.0];

  return (
    <>
      <Grid palette={palette} y={-0.98} />
      <Edged geometry={belt} palette={palette} position={[0, -0.72, 0]} />
      {rollerX.map((x, i) => (
        <group
          key={x}
          position={[x, -0.86, 0]}
          ref={(el) => {
            if (el) rollers.current[i] = el;
          }}
        >
          <Edged
            geometry={roller}
            palette={palette}
            rotation={[Math.PI / 2, 0, 0]}
            threshold={40}
          />
          <Segments
            points={[
              [0, 0, 0.41],
              [0, 0.1, 0.41],
              [0, 0, -0.41],
              [0, 0.1, -0.41],
            ]}
            palette={palette}
          />
        </group>
      ))}
      {[0, 1, 2].map((i) => (
        <group
          key={i}
          position={[0, -0.48, 0]}
          ref={(el) => {
            if (el) apples.current[i] = el;
          }}
        >
          <Edged geometry={apple} palette={palette} threshold={10} />
          <Edged
            geometry={stem}
            palette={palette}
            position={[0.03, 0.26, 0]}
            rotation={[0, 0, 0.3]}
            threshold={40}
          />
        </group>
      ))}
      <group position={[-1.15, 0, 0.55]} rotation={[0, 0.5, 0]}>
        <Edged geometry={base} palette={palette} position={[0, -0.83, 0]} />
        <Edged
          geometry={column}
          palette={palette}
          position={[0, -0.43, 0]}
          threshold={25}
        />
        <group ref={shoulder} position={[0, -0.18, 0]}>
          <Edged geometry={joint} palette={palette} threshold={10} />
          <Edged geometry={upper} palette={palette} position={[0, 0.475, 0]} />
          <group ref={elbow} position={[0, 0.95, 0]}>
            <Edged geometry={joint} palette={palette} threshold={10} />
            <Edged geometry={fore} palette={palette} position={[0, 0.425, 0]} />
            <group position={[0, 0.87, 0]}>
              <Edged
                geometry={joint}
                palette={palette}
                threshold={10}
                scale={0.8}
              />
              <group ref={fingerL} position={[-0.1, 0.2, 0]}>
                <Edged geometry={finger} palette={palette} />
              </group>
              <group ref={fingerR} position={[0.1, 0.2, 0]}>
                <Edged geometry={finger} palette={palette} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

/* --- Connect: a classical column, carved ---------------------------------- */

function Column({ palette }: SceneProps) {
  const shaft = useMemo(
    () => new THREE.CylinderGeometry(0.42, 0.5, 2.6, 24, 1, true),
    [],
  );
  const flutes = useMemo<Vec3[]>(() => {
    const pts: Vec3[] = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      pts.push(
        [Math.cos(a) * 0.42, 1.3, Math.sin(a) * 0.42],
        [Math.cos(a) * 0.5, -1.3, Math.sin(a) * 0.5],
      );
    }
    return pts;
  }, []);
  const abacus = useMemo(() => new THREE.BoxGeometry(1.5, 0.16, 1.5), []);
  const echinus = useMemo(
    () =>
      new THREE.LatheGeometry(
        [
          new THREE.Vector2(0.44, 0),
          new THREE.Vector2(0.62, 0.12),
          new THREE.Vector2(0.72, 0.26),
          new THREE.Vector2(0.72, 0.3),
        ],
        24,
      ),
    [],
  );
  const torus = useMemo(() => new THREE.TorusGeometry(0.58, 0.1, 10, 24), []);
  const plinth = useMemo(() => new THREE.BoxGeometry(1.6, 0.22, 1.6), []);
  const chisel = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Mesh[]>([]);
  const mote = useMemo(() => new THREE.SphereGeometry(0.02, 5, 4), []);
  const bit = useMemo(
    () => new THREE.CylinderGeometry(0.012, 0.03, 0.7, 6),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (chisel.current) {
      chisel.current.position.y = 0.4 + Math.sin(t * 1.3) * 0.7;
      chisel.current.position.x = 0.62 + Math.abs(Math.sin(t * 9)) * 0.03;
    }
    dust.current.forEach((m, i) => {
      if (!m) return;
      const f = (t * 0.35 + i * 0.17) % 1;
      m.position.set(
        0.5 + Math.sin(i * 2.1) * 0.25 + f * 0.3,
        -1.2 + f * 2.6,
        Math.cos(i * 1.7) * 0.25,
      );
      m.visible = f < 0.85;
    });
  });

  return (
    <>
      <Grid palette={palette} y={-1.6} />
      <Edged geometry={plinth} palette={palette} position={[0, -1.49, 0]} />
      <Edged
        geometry={torus}
        palette={palette}
        position={[0, -1.32, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        threshold={40}
      />
      <Edged geometry={shaft} palette={palette} faces threshold={60} />
      <Segments points={flutes} palette={palette} opacity={0.55} />
      <Edged
        geometry={echinus}
        palette={palette}
        position={[0, 1.3, 0]}
        threshold={40}
      />
      <Edged geometry={abacus} palette={palette} position={[0, 1.68, 0]} />
      {/* the robot's chisel, working the shaft */}
      <group ref={chisel} position={[0.62, 0.4, 0]} rotation={[0, 0, -0.35]}>
        <Solid
          geometry={bit}
          palette={palette}
          position={[0.3, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
      </group>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          geometry={mote}
          ref={(el) => {
            if (el) dust.current[i] = el;
          }}
        >
          <meshBasicMaterial color={palette.line} transparent opacity={0.7} />
        </mesh>
      ))}
    </>
  );
}

const scenes: Record<SceneId, React.FC<SceneProps>> = {
  origins: Origins,
  foundations: Foundations,
  scale: Scale,
  depth: Depth,
  ficio: Ficio,
  column: Column,
};

/* --- Rig: interaction, idle turn, scroll nudge --------------------------- */

function Rig({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const s = useRef({
    ry: -0.35,
    rx: 0,
    vel: 0,
    tiltX: 0,
    tiltY: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastScroll: 0,
  });

  useEffect(() => {
    const el = gl.domElement;
    const st = s.current;
    st.lastScroll = window.scrollY;

    const onDown = (e: PointerEvent) => {
      st.dragging = true;
      st.lastX = e.clientX;
      st.lastY = e.clientY;
      st.vel = 0;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (st.dragging) {
        const dx = e.clientX - st.lastX;
        const dy = e.clientY - st.lastY;
        st.lastX = e.clientX;
        st.lastY = e.clientY;
        st.ry += dx * 0.009;
        st.rx = THREE.MathUtils.clamp(st.rx + dy * 0.005, -0.5, 0.6);
        st.vel = dx * 0.009;
      } else {
        const r = el.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        st.tiltY = nx * 0.28;
        st.tiltX = -ny * 0.16;
      }
    };
    const onUp = (e: PointerEvent) => {
      st.dragging = false;
      if (el.hasPointerCapture(e.pointerId))
        el.releasePointerCapture(e.pointerId);
    };
    const onLeave = () => {
      st.tiltX = 0;
      st.tiltY = 0;
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [gl]);

  useFrame((_, dt) => {
    const g = group.current;
    const st = s.current;
    if (!g) return;
    const scroll = window.scrollY;
    const ds = scroll - st.lastScroll;
    st.lastScroll = scroll;
    if (!st.dragging) {
      st.ry += dt * (0.1 + index * 0.03) + st.vel + ds * 0.0012;
      st.vel *= 0.9;
    }
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, st.ry + st.tiltY, 0.18);
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      st.rx + st.tiltX + 0.08,
      0.1,
    );
  });

  return <group ref={group}>{children}</group>;
}

/* --- Canvas --------------------------------------------------------------- */

export interface ArtifactCanvasProps {
  scene: SceneId;
  tone: Tone;
  index: number;
  active: boolean;
  onReady?: () => void;
}

export default function ArtifactCanvas({
  scene,
  tone,
  index,
  active,
  onReady,
}: ArtifactCanvasProps) {
  const palette = palettes[tone];
  const Scene = scenes[scene];
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 1.4, 7.4], fov: 34 }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0.1, 0);
        onReady?.();
      }}
      style={{ touchAction: 'pan-y' }}
    >
      <Rig index={index}>
        <Scene palette={palette} />
      </Rig>
    </Canvas>
  );
}
