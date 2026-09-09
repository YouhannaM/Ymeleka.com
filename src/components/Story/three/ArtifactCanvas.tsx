'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three-dimensional engravings for each scene. Every artifact is drawn
 * the way the flat vignettes are: solid faces in the room's color with
 * hairline edges, so the objects read as technical drawings that
 * happen to be real geometry. Interaction: drag to turn, pointer tilt,
 * a slow idle rotation, and a nudge from the page scroll. Motion grows
 * scene by scene: I turns, II floats, III spins its wheels, IV runs
 * its orbits, V articulates its arm over a moving line.
 */

export type SceneId = 'origins' | 'foundations' | 'scale' | 'depth' | 'ficio';
export type Tone = 'dark' | 'light';

interface Palette {
  line: string;
  face: string;
}

const palettes: Record<Tone, Palette> = {
  dark: { line: '#ffffff', face: '#000000' },
  light: { line: '#000000', face: '#e7e5e4' },
};

type Vec3 = [number, number, number];

interface Placed {
  position?: Vec3;
  rotation?: Vec3;
  scale?: number | Vec3;
}

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

/* --- Scene II: Beaver Stadium ------------------------------------------- */

function Foundations({ palette }: SceneProps) {
  const bowl = useMemo(
    () =>
      new THREE.LatheGeometry(
        [
          new THREE.Vector2(0.9, -0.3),
          new THREE.Vector2(1.35, 0.3),
          new THREE.Vector2(1.45, 0.34),
          new THREE.Vector2(1.38, 0.36),
          new THREE.Vector2(0.95, -0.2),
        ],
        56,
      ),
    [],
  );
  const tier = useMemo(
    () =>
      new THREE.LatheGeometry(
        [
          new THREE.Vector2(0.92, -0.28),
          new THREE.Vector2(1.14, 0.04),
          new THREE.Vector2(1.16, 0.06),
        ],
        56,
      ),
    [],
  );
  const field = useMemo(() => new THREE.BoxGeometry(1.5, 0.04, 0.9), []);
  const mast = useMemo(
    () => new THREE.CylinderGeometry(0.02, 0.02, 1.7, 8),
    [],
  );
  const head = useMemo(() => new THREE.BoxGeometry(0.34, 0.06, 0.08), []);
  const yardLines = useMemo<Vec3[]>(() => {
    const pts: Vec3[] = [];
    for (let i = -3; i <= 3; i++) {
      pts.push([i * 0.2, -0.27, -0.45], [i * 0.2, -0.27, 0.45]);
    }
    return pts;
  }, []);
  const stadium = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (stadium.current) {
      stadium.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.06;
    }
  });

  const corners: Vec3[] = [
    [-1.55, 0.25, -0.95],
    [1.55, 0.25, -0.95],
    [-1.55, 0.25, 0.95],
    [1.55, 0.25, 0.95],
  ];

  return (
    <>
      <Grid palette={palette} y={-0.6} />
      <group ref={stadium} position={[0, -0.3, 0]}>
        <group scale={[1.3, 1, 1]}>
          <Edged geometry={bowl} palette={palette} />
          <Edged geometry={tier} palette={palette} threshold={30} />
        </group>
        <Edged geometry={field} palette={palette} position={[0, -0.29, 0]} />
        <Segments points={yardLines} palette={palette} opacity={0.6} />
        {corners.map((c) => (
          <group key={c.join(',')} position={c}>
            <Edged
              geometry={mast}
              palette={palette}
              faces={false}
              threshold={40}
            />
            <Edged geometry={head} palette={palette} position={[0, 0.88, 0]} />
          </group>
        ))}
      </group>
    </>
  );
}

/* --- Scene III: Cybertruck ---------------------------------------------- */

function Scale({ palette }: SceneProps) {
  const body = useMemo(() => {
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
  const wheel = useMemo(
    () => new THREE.CylinderGeometry(0.34, 0.34, 0.24, 28),
    [],
  );
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
  const wheels = useRef<THREE.Group[]>([]);
  const truck = useRef<THREE.Group>(null);

  useFrame(({ clock }, dt) => {
    for (const w of wheels.current) {
      if (w) w.rotation.z -= dt * 2.2;
    }
    if (truck.current) {
      truck.current.position.y = -0.8 + Math.sin(clock.elapsedTime * 3) * 0.012;
    }
  });

  const wheelSpots: Vec3[] = [
    [-0.82, 0.34, 0.72],
    [0.9, 0.34, 0.72],
    [-0.82, 0.34, -0.72],
    [0.9, 0.34, -0.72],
  ];

  return (
    <>
      <Grid palette={palette} y={-0.8} />
      <group ref={truck} position={[0, -0.8, 0]}>
        <Edged geometry={body} palette={palette} />
        {wheelSpots.map((spot, i) => (
          <group key={spot.join(',')} position={spot}>
            <group
              ref={(el) => {
                if (el) wheels.current[i] = el;
              }}
              rotation={[0, 0, 0]}
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

/* --- Scene IV: McGraw Tower on a chip ----------------------------------- */

function Depth({ palette }: SceneProps) {
  const chip = useMemo(() => new THREE.BoxGeometry(2.4, 0.14, 2.4), []);
  const pin = useMemo(() => new THREE.BoxGeometry(0.14, 0.05, 0.28), []);
  const tower = useMemo(() => new THREE.BoxGeometry(0.5, 1.9, 0.5), []);
  const spire = useMemo(() => new THREE.ConeGeometry(0.42, 0.75, 4), []);
  const finial = useMemo(() => new THREE.SphereGeometry(0.05, 8, 6), []);
  const electron = useMemo(() => new THREE.SphereGeometry(0.06, 8, 6), []);
  const traces = useMemo<Vec3[]>(
    () => [
      [-0.25, -0.77, 0.25],
      [-0.25, -0.77, 0.75],
      [-0.25, -0.77, 0.75],
      [-0.85, -0.77, 0.75],
      [0.25, -0.77, 0.25],
      [0.85, -0.77, 0.25],
      [0.85, -0.77, 0.25],
      [0.85, -0.77, 0.85],
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
    void clock;
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
    [-0.85, -0.76, 0.75],
    [0.85, -0.76, 0.85],
    [-0.75, -0.76, -0.8],
    [0.8, -0.76, -0.7],
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
        <Edged
          geometry={electron}
          palette={palette}
          position={[1.35, 0, 0]}
          threshold={10}
        />
      </group>
      <group ref={orbitB} rotation={[1.9, -0.5, 0.6]} position={[0, 0.4, 0]}>
        <Ring radius={1.55} palette={palette} opacity={0.45} />
        <Edged
          geometry={electron}
          palette={palette}
          position={[1.55, 0, 0]}
          threshold={10}
        />
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

const scenes: Record<SceneId, React.FC<SceneProps>> = {
  origins: Origins,
  foundations: Foundations,
  scale: Scale,
  depth: Depth,
  ficio: Ficio,
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
