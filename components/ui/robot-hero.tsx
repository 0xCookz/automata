"use client";

/**
 * Automata — hero automaton.
 *
 * Adapted from the supplied `robot-hero` component: the chrome (navbar,
 * wordmark backdrop, light gradient stage) has been removed so the scene
 * carries the robot and nothing else, on a transparent canvas over the
 * near-black page. Lighting was rebuilt for a dark stage and the HDRI
 * environment dropped so the page holds no runtime CDN dependency.
 */

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

class HeartCurve extends THREE.Curve<THREE.Vector3> {
  // three's Curve constructor is typed as protected; re-declaring it public
  // here is what lets the shared instance be created at module scope.
  public constructor() {
    super();
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return optionalTarget.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}

const sharedHeartCurve = new HeartCurve();

function ResponsiveGroup({
  children,
  scale = 1,
}: {
  children: React.ReactNode;
  scale?: number;
}) {
  const { viewport } = useThree();
  const s = Math.min(1.1, viewport.width / 3.5) * scale;
  return <group scale={s}>{children}</group>;
}

function GlassCapsule({
  color,
  power,
  intensity,
}: {
  color: string;
  power: number;
  intensity: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color("#ffffff") },
      power: { value: 2.5 },
      intensity: { value: 0.6 },
    }),
    [],
  );

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.color.value.set(color);
      materialRef.current.uniforms.power.value = power;
      materialRef.current.uniforms.intensity.value = intensity;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[0.3, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float power;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            fresnel = pow(fresnel, power);
            gl_FragColor = vec4(color, fresnel * intensity);
          }
        `}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

const earBaseMat = new THREE.MeshStandardMaterial({ color: "#e8e3da", roughness: 0.5 });
const earRingMat = new THREE.MeshStandardMaterial({ color: "#f4f0e8", roughness: 0.3 });
const earCenterMat = new THREE.MeshStandardMaterial({ color: "#b8b3aa", roughness: 0.8 });
const antennaBaseMat = new THREE.MeshStandardMaterial({
  color: "#8e8a84",
  roughness: 0.4,
  metalness: 0.5,
});
const antennaStickMat = new THREE.MeshStandardMaterial({
  color: "#c6c1b8",
  roughness: 0.4,
  metalness: 0.2,
});

function RobotEar({
  position,
  scale = 1,
  isLeft = false,
  tipColor,
}: {
  position: [number, number, number];
  scale?: number;
  isLeft?: boolean;
  tipColor: string;
}) {
  const dir = isLeft ? -1 : 1;
  const tipMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: tipColor,
        emissive: new THREE.Color(tipColor),
        emissiveIntensity: 1.4,
        roughness: 0.2,
        toneMapped: false,
      }),
    [tipColor],
  );

  return (
    <group position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earBaseMat}>
        <cylinderGeometry args={[0.04, 0.04, 0.025, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earRingMat}
      >
        <torusGeometry args={[0.032, 0.008, 16, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earCenterMat}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
      </mesh>

      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.01, 0]} castShadow receiveShadow material={antennaBaseMat}>
          <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow material={antennaStickMat}>
          <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        </mesh>
        <mesh position={[0, 0.11, 0]} castShadow receiveShadow material={tipMat}>
          <sphereGeometry args={[0.006, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

const eyeMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color(2, 2, 2),
  toneMapped: false,
  transparent: true,
});

function RobotEye({
  position,
  rotation,
  scale = 1,
  blinkDuration = 0.15,
  blinkCycle = 3.0,
  isLovedRef,
  heartColor,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  blinkDuration?: number;
  blinkCycle?: number;
  isLovedRef: React.RefObject<boolean>;
  heartColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const normalEyesRef = useRef<THREE.Group>(null);
  const heartEyeRef = useRef<THREE.Mesh>(null);

  const heartMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: heartColor, toneMapped: false }),
    [heartColor],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current || !normalEyesRef.current || !heartEyeRef.current) return;

    const isHeart = isLovedRef.current;
    normalEyesRef.current.visible = !isHeart;
    heartEyeRef.current.visible = isHeart;

    const cycle = clock.getElapsedTime() % blinkCycle;
    let targetScaleY = 1;

    if (cycle < blinkDuration && !isHeart) {
      const progress = cycle / blinkDuration;
      const blinkClose = Math.sin(progress * Math.PI);
      targetScaleY = Math.max(0.05, 1.0 - blinkClose);
    }

    groupRef.current.scale.set(scale, scale * targetScaleY, scale);
  });

  const { topPath, bottomPath } = useMemo(() => {
    const w = 0.025;
    const h = 0.035;
    const r = 0.02;
    const g = 0.005;
    const V = THREE.Vector3;

    const tPath = new THREE.CurvePath<THREE.Vector3>();
    tPath.add(new THREE.LineCurve3(new V(-w, g, 0), new V(-w, h - r, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(new V(-w, h - r, 0), new V(-w, h, 0), new V(-w + r, h, 0)));
    tPath.add(new THREE.LineCurve3(new V(-w + r, h, 0), new V(w - r, h, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(new V(w - r, h, 0), new V(w, h, 0), new V(w, h - r, 0)));
    tPath.add(new THREE.LineCurve3(new V(w, h - r, 0), new V(w, g, 0)));

    const bPath = new THREE.CurvePath<THREE.Vector3>();
    bPath.add(new THREE.LineCurve3(new V(-w, -g, 0), new V(-w, -(h - r), 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(new V(-w, -(h - r), 0), new V(-w, -h, 0), new V(-w + r, -h, 0)));
    bPath.add(new THREE.LineCurve3(new V(-w + r, -h, 0), new V(w - r, -h, 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(new V(w - r, -h, 0), new V(w, -h, 0), new V(w, -(h - r), 0)));
    bPath.add(new THREE.LineCurve3(new V(w, -(h - r), 0), new V(w, -g, 0)));

    return { topPath: tPath, bottomPath: bPath };
  }, []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh ref={heartEyeRef} visible={false} material={heartMat}>
        <tubeGeometry args={[sharedHeartCurve, 64, 0.0035, 8, true]} />
      </mesh>

      <group ref={normalEyesRef}>
        <mesh material={eyeMat}>
          <tubeGeometry args={[topPath, 20, 0.0035, 8, false]} />
        </mesh>
        <mesh material={eyeMat}>
          <tubeGeometry args={[bottomPath, 20, 0.0035, 8, false]} />
        </mesh>
      </group>
    </group>
  );
}

function generatePbrTexturesAsync(): Promise<{
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const size = 512;
      const canvasC = document.createElement("canvas");
      const canvasB = document.createElement("canvas");
      canvasC.width = canvasB.width = size;
      canvasC.height = canvasB.height = size;
      const ctxC = canvasC.getContext("2d");
      const ctxB = canvasB.getContext("2d");

      if (ctxC && ctxB) {
        ctxC.fillStyle = "#dcdcdc";
        ctxC.fillRect(0, 0, size, size);
        ctxB.fillStyle = "#808080";
        ctxB.fillRect(0, 0, size, size);

        for (let i = 0; i < 10000; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const r = 0.5 + Math.random() * 1.5;
          const isDark = Math.random() > 0.15;

          ctxC.beginPath();
          ctxC.arc(x, y, r, 0, Math.PI * 2);
          ctxC.fillStyle = isDark ? "#222222" : "#dddddd";
          ctxC.fill();

          ctxB.beginPath();
          ctxB.arc(x, y, r, 0, Math.PI * 2);
          ctxB.fillStyle = isDark ? "#000000" : "#ffffff";
          ctxB.fill();
        }
      }

      const texC = new THREE.CanvasTexture(canvasC);
      const texB = new THREE.CanvasTexture(canvasB);
      texC.wrapS = texB.wrapS = THREE.RepeatWrapping;
      texC.wrapT = texB.wrapT = THREE.RepeatWrapping;
      texC.repeat.set(6, 3);
      texB.repeat.set(6, 3);
      texC.needsUpdate = true;
      texB.needsUpdate = true;

      resolve({ colorMap: texC, bumpMap: texB });
    }, 0);
  });
}

function RobotPrototype({
  color,
  screenColor,
  screenGlow,
  blinkCycle,
  metalness,
  reducedMotion,
}: {
  color: string;
  screenColor: string;
  screenGlow: number;
  blinkCycle: number;
  metalness: number;
  reducedMotion: boolean;
}) {
  const isLovedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const [textures, setTextures] = useState<{
    colorMap: THREE.CanvasTexture | null;
    bumpMap: THREE.CanvasTexture | null;
  }>({ colorMap: null, bumpMap: null });

  const neckParams = {
    baseR: 0.215,
    baseH: -0.05,
    midR: 0.28,
    midH: 0.02,
    lipBottomR: 0.295,
    lipBottomH: 0.045,
    lipTopR: 0.27,
    lipTopH: 0.055,
    innerR: 0.1,
    innerDropH: 0.0,
  };
  const bodyParams = { bodyBevelR: 0.235, bodyBevelY: 0.34, bodyBevelT: 0.025 };

  const design = {
    screenThickness: 3.4,
    eyeGap: 0.07,
    earScale: 1.3,
    eyeScale: 1.28,
    blinkDuration: 0.45,
    headHeight: 0.6,
  };

  const config = {
    moveSpeed: 0.35,
    bodyRotSpeed: 10.0,
    headRotSpeed: 20.0,
    bodyTiltX: 0.0,
    bodyTiltY: 0.95,
    headLookX: 0.3,
    headLookY: 1.8,
  };

  useFrame((state, delta) => {
    if (!bodyRef.current || !headRef.current) return;

    const dt = Math.min(delta, 0.1);
    // Reduced motion: the automaton idles gently instead of tracking the cursor.
    const tx = reducedMotion ? Math.sin(state.clock.elapsedTime * 0.25) * 0.15 : state.pointer.x;
    const ty = reducedMotion ? 0 : state.pointer.y;

    const maxMoveX = state.viewport.width / 5;
    bodyRef.current.position.x = THREE.MathUtils.lerp(
      bodyRef.current.position.x,
      tx * maxMoveX,
      config.moveSpeed * dt,
    );

    // a slow idle bob keeps it alive when the cursor is not moving
    bodyRef.current.position.y = -0.3 + Math.sin(state.clock.elapsedTime * 0.9) * 0.022;

    const relativeX = tx - bodyRef.current.position.x / 2.5;

    bodyRef.current.rotation.y = THREE.MathUtils.lerp(
      bodyRef.current.rotation.y,
      -relativeX * config.bodyTiltY,
      config.bodyRotSpeed * dt,
    );
    bodyRef.current.rotation.x = THREE.MathUtils.lerp(
      bodyRef.current.rotation.x,
      relativeX * relativeX * config.bodyTiltX - ty * 0.25,
      config.bodyRotSpeed * dt,
    );
    bodyRef.current.rotation.z = THREE.MathUtils.lerp(
      bodyRef.current.rotation.z,
      -relativeX * 0.15,
      config.bodyRotSpeed * dt,
    );

    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      relativeX * config.headLookY,
      config.headRotSpeed * dt,
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      -ty * config.headLookX,
      config.headRotSpeed * dt,
    );
  });

  useEffect(() => {
    let mounted = true;
    let generatedMaps: { colorMap: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null = null;

    generatePbrTexturesAsync().then((res) => {
      if (mounted) {
        generatedMaps = res;
        setTextures(res);
      } else {
        res.colorMap.dispose();
        res.bumpMap.dispose();
      }
    });

    return () => {
      mounted = false;
      if (generatedMaps) {
        generatedMaps.colorMap.dispose();
        generatedMaps.bumpMap.dispose();
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.body.style.cursor = "auto";
    };
  }, []);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isLovedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isLovedRef.current = false;
    }, 2000);
  };

  const neckProfile = useMemo(() => {
    const p: THREE.Vector2[] = [];
    p.push(new THREE.Vector2(neckParams.innerR, neckParams.baseH));
    p.push(new THREE.Vector2(neckParams.baseR, neckParams.baseH));
    p.push(new THREE.Vector2(neckParams.midR, neckParams.midH));
    p.push(new THREE.Vector2(neckParams.lipBottomR, neckParams.lipBottomH));
    p.push(new THREE.Vector2(neckParams.lipTopR, neckParams.lipTopH));
    p.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH));
    p.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH - neckParams.innerDropH));
    return p;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#17171d", roughness: 0.85, metalness: 0.05 }),
    [],
  );

  const chassisProps = {
    color,
    map: textures.colorMap || undefined,
    bumpMap: textures.bumpMap || undefined,
    bumpScale: 0.005,
    roughness: 0.95,
    metalness,
    envMapIntensity: 0.0,
  };

  if (!textures.colorMap) return null;

  return (
    <group
      ref={bodyRef}
      position={[0, -0.3, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.43, 64, 64, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]} />
        <meshStandardMaterial {...chassisProps} />
      </mesh>

      <mesh
        position={[0, bodyParams.bodyBevelY, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <torusGeometry args={[bodyParams.bodyBevelR, bodyParams.bodyBevelT, 32, 64]} />
        <meshStandardMaterial {...chassisProps} />
      </mesh>

      <mesh position={[0, 0.38, 0]} receiveShadow castShadow>
        <latheGeometry args={[neckProfile, 64]} />
        <meshStandardMaterial {...chassisProps} />
      </mesh>

      <group ref={headRef} position={[0, design.headHeight, 0]}>
        <mesh material={headMat} castShadow receiveShadow>
          <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>

        <GlassCapsule color={screenColor} power={design.screenThickness} intensity={screenGlow} />

        <group position={[0, -0.02, 0.29]}>
          <RobotEye
            position={[-design.eyeGap, 0, 0]}
            rotation={[0, -0.2, 0]}
            scale={design.eyeScale}
            blinkDuration={design.blinkDuration}
            blinkCycle={blinkCycle}
            isLovedRef={isLovedRef}
            heartColor={screenColor}
          />
          <RobotEye
            position={[design.eyeGap, 0, 0]}
            rotation={[0, 0.2, 0]}
            scale={design.eyeScale}
            blinkDuration={design.blinkDuration}
            blinkCycle={blinkCycle}
            isLovedRef={isLovedRef}
            heartColor={screenColor}
          />
        </group>

        <RobotEar position={[-0.29, 0, 0]} isLeft scale={design.earScale} tipColor={screenColor} />
        <RobotEar position={[0.29, 0, 0]} scale={design.earScale} tipColor={screenColor} />
      </group>
    </group>
  );
}

export interface RobotStageProps {
  /** Chassis colour. */
  color?: string;
  /** Overall size multiplier — the automaton is deliberately small on the page. */
  scale?: number;
  /** Visor glow + heart-eye colour. */
  screenColor?: string;
  screenGlow?: number;
  blinkCycle?: number;
  metalness?: number;
  /** rim light colour — tie it to the page's accent, not the chassis. */
  rimColor?: string;
  className?: string;
}

export function RobotStage({
  color = "#d9d4ca",
  scale = 0.62,
  screenColor = "#ff4a1c",
  screenGlow = 0.8,
  blinkCycle = 3.4,
  metalness = 0.0,
  rimColor = "#ff5a2c",
  className,
}: RobotStageProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, 6], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} color="#cfd6e0" />
        {/* small frontal fill so the visor reads as a face, not a hole */}
        <pointLight position={[0, 0.6, 3.2]} intensity={2.6} distance={9} color="#f2ece2" />
        {/* key light, cool from above-left */}
        <directionalLight position={[-3, 5, 4]} intensity={1.35} color="#ffffff" />
        {/* signal rim from the right, ties the object to the palette */}
        <directionalLight position={[5, 1.5, -2]} intensity={0.7} color={rimColor} />
        {/* soft under-fill so the lower chassis does not go to black */}
        <directionalLight position={[0, -3, 2]} intensity={0.25} color="#8fa0b8" />

        <ResponsiveGroup scale={scale}>
          <RobotPrototype
            color={color}
            screenColor={screenColor}
            screenGlow={screenGlow}
            blinkCycle={blinkCycle}
            metalness={metalness}
            reducedMotion={reducedMotion}
          />
        </ResponsiveGroup>
      </Canvas>
    </div>
  );
}

export default RobotStage;
