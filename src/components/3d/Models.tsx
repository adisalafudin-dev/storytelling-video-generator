import React, { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Outlines, useGLTF } from "@react-three/drei";
import { interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import {
  SaharaCrossSection,
  GreenSahara,
  EarthAxialTilt,
  DustStream,
  EarthPullout,
  GreenSaharaFinale,
} from "./SaharaModels";
import {
  EngineCutawayIntro,
  CompressionStroke,
  EngineKnocking,
  ControlledCombustion,
  EnginePulloutClosing,
} from "./EngineModels";

// Helper color lerp
function lerpColor(colorA: string, colorB: string, t: number): string {
  const cA = new THREE.Color(colorA);
  const cB = new THREE.Color(colorB);
  cA.lerp(cB, Math.max(0, Math.min(1, t)));
  return `#${cA.getHexString()}`;
}

// =========================================================================
// 1. INSTANCED PARTICLES: GELEMBUNG AIR LAUT & MARINE SNOW (320 PARTIKEL)
// =========================================================================
export const InstancedSeaParticles: React.FC<{
  count?: number;
  areaRadius?: number;
  color?: string;
  speed?: number;
}> = ({ count = 320, areaRadius = 5.5, color = "#67e8f9", speed = 0.015 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const frame = useCurrentFrame();

  const particleData = useMemo(() => {
    const data: Array<{
      baseX: number;
      baseY: number;
      baseZ: number;
      speedY: number;
      sway: number;
      scale: number;
    }> = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 * 7;
      const dist = 0.3 + (i % 30) * (areaRadius / 30);
      data.push({
        baseX: Math.cos(angle) * dist + ((i % 7) - 3) * 0.4,
        baseY: ((i * 1.618) % 10) - 4.5,
        baseZ: Math.sin(angle) * dist + ((i % 5) - 2) * 0.5,
        speedY: 0.008 + (i % 5) * 0.006,
        sway: 0.03 + (i % 4) * 0.02,
        scale: 0.7 + (i % 5) * 0.25,
      });
    }
    return data;
  }, [count, areaRadius]);

  useMemo(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const p = particleData[i];
      const curY = ((p.baseY + frame * p.speedY * speed * 60 + 5) % 10) - 5;
      const curX = p.baseX + Math.sin(frame * 0.03 + i) * p.sway;
      const curZ = p.baseZ + Math.cos(frame * 0.025 + i) * p.sway;

      dummy.position.set(curX, curY, curZ);
      const s = 0.03 * p.scale;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [frame, count, particleData, speed]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.65}
        roughness={1}
        metalness={0}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
};

// =========================================================================
// 2. INSTANCED RUST DEBRIS (SERPIHAN & DEBU KARAT HANCUR BERANTAKAN)
// =========================================================================
export const InstancedRustDebris: React.FC<{
  count?: number;
  explodeProgress?: number;
}> = ({ count = 150, explodeProgress = 0 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const debrisData = useMemo(() => {
    const list: Array<{
      dirX: number;
      dirY: number;
      dirZ: number;
      rotSpeed: number;
      scale: number;
    }> = [];
    for (let i = 0; i < count; i++) {
      const theta = random(`deb-th-${i}`) * Math.PI * 2;
      const phi = (random(`deb-ph-${i}`) - 0.5) * Math.PI;
      const speed = 1.2 + random(`deb-sp-${i}`) * 3.2;

      list.push({
        dirX: Math.cos(phi) * Math.cos(theta) * speed,
        dirY: Math.sin(phi) * speed + 0.8, // Ledakan menyembur ke atas & samping
        dirZ: Math.sin(phi) * Math.sin(theta) * speed,
        rotSpeed: (random(`deb-rot-${i}`) - 0.5) * 4,
        scale: 0.04 + random(`deb-sc-${i}`) * 0.05,
      });
    }
    return list;
  }, [count]);

  useMemo(() => {
    if (!meshRef.current || explodeProgress <= 0) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const d = debrisData[i];
      const p = explodeProgress;
      const curX = d.dirX * p;
      const curY = d.dirY * p - p * p * 0.6; // Efek gravitasi air laut
      const curZ = d.dirZ * p;

      dummy.position.set(curX, curY + 0.5, curZ);
      dummy.rotation.set(p * d.rotSpeed, p * d.rotSpeed * 1.3, p * d.rotSpeed * 0.7);
      const s = d.scale * Math.max(0.1, 1 - p * 0.25);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [explodeProgress, count, debrisData]);

  if (explodeProgress <= 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#78350f"
        emissive="#451a03"
        emissiveIntensity={0.3}
        roughness={1}
        metalness={0}
      />
    </instancedMesh>
  );
};

// =========================================================================
// 3. DASAR SAMUDRA ABISAL TERANG (#0D3B66 ATMOSFER)
// =========================================================================
export const AbyssalSeafloor: React.FC<{
  floorColor?: string;
  showRocks?: boolean;
}> = ({ floorColor = "#1e3a5f", showRocks = true }) => {
  return (
    <group position={[0, -1.8, 0]}>
      {/* Lantai Lumpur Samudra Luas */}
      <mesh receiveShadow position={[0, -0.3, 0]}>
        <boxGeometry args={[34, 0.6, 28]} />
        <meshStandardMaterial color={floorColor} roughness={1} metalness={0} />
        <Outlines color="#0c2340" thickness={0.03} />
      </mesh>

      {/* Gundukan Sedimen Pasir Laut Dalam */}
      <mesh position={[-4.5, 0.2, -2]} rotation={[0, 0.3, 0]}>
        <coneGeometry args={[4.2, 1.2, 7]} />
        <meshStandardMaterial color="#2d4a6f" roughness={1} metalness={0} flatShading />
        <Outlines color="#0c2340" thickness={0.03} />
      </mesh>
      <mesh position={[4.2, 0.15, -1.5]} rotation={[0, -0.4, 0]}>
        <coneGeometry args={[3.8, 1.1, 7]} />
        <meshStandardMaterial color="#2d4a6f" roughness={1} metalness={0} flatShading />
        <Outlines color="#0c2340" thickness={0.03} />
      </mesh>

      {/* Batu Karang Laut Dalam */}
      {showRocks && (
        <>
          <CartoonOceanRock position={[-2.4, 0.15, 1.8]} scale={0.4} />
          <CartoonOceanRock position={[2.6, 0.15, 1.2]} scale={0.45} />
          <CartoonOceanRock position={[-1.8, 0.1, -2.5]} scale={0.35} />
          <CartoonOceanRock position={[2.1, 0.1, -2.8]} scale={0.38} />
        </>
      )}
    </group>
  );
};

// =========================================================================
// 4. LOW-POLY OCEAN ROCK
// =========================================================================
const GLBOceanRock: React.FC<{ scale?: number }> = ({ scale = 0.3 }) => {
  const gltf = useGLTF(staticFile("models/ocean-rock.glb"));
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
          mat.roughness = 1;
          mat.metalness = 0;
          mesh.material = mat;
        }
      }
    });
    return cloned;
  }, [gltf.scene]);

  return <primitive object={scene} scale={[scale * 2.2, scale * 2.2, scale * 2.2]} />;
};

export const CartoonOceanRock: React.FC<{
  position?: [number, number, number];
  scale?: number;
  color?: string;
}> = ({ position = [0, 0, 0], scale = 0.4, color = "#3b557a" }) => {
  return (
    <group position={position}>
      <Suspense
        fallback={
          <mesh scale={[scale, scale * 0.7, scale]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} roughness={1} metalness={0} flatShading />
            <Outlines color="#0c2340" thickness={0.04} />
          </mesh>
        }
      >
        <GLBOceanRock scale={scale} />
      </Suspense>
    </group>
  );
};

// =========================================================================
// 5. TITANIC STEAMSHIP: KAPAL UAP TRANSLATANTIK DENGAN 4 CEROBONG ASAP KHAS
// (TIDAK ADA LAYAR KAIN / ZERO SAILS!)
// =========================================================================
export const TitanicSteamshipModel: React.FC<{
  rustLevel?: number;
  crackProgress?: number;
}> = ({ rustLevel = 1, crackProgress = 0 }) => {
  const rustColor = lerpColor("#3b1d11", "#78350f", Math.min(1, rustLevel));
  const deckColor = "#1e1e24";
  const funnelColor = "#d97706"; // Warna oranye-buff cerobong Titanic
  const funnelTopColor = "#0f172a"; // Cincin hitam cerobong

  const splitOffset = crackProgress * 1.5;
  const breakTilt = crackProgress * 0.4;

  return (
    <group position={[0, -0.3, 0]}>
      {/* =================================================== */}
      {/* BAGIAN HALUAN DEPAN (BOW SECTION - PECAH KE KIRI/DEPAN) */}
      {/* =================================================== */}
      <group
        position={[-splitOffset * 0.5, crackProgress * 0.3, splitOffset * 0.4]}
        rotation={[0, breakTilt * 0.5, crackProgress * 0.2]}
      >
        {/* Lambung Depan Kiri & Kanan (V-Hull) */}
        <mesh position={[0, 0.2, 1.1]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={[1.7, 1.8, 3.2]} />
          <meshStandardMaterial color={rustColor} roughness={1} metalness={0} flatShading />
          <Outlines color="#0f0704" thickness={0.04} />
        </mesh>

        {/* Ujung Lancip Haluan Khas Titanic */}
        <mesh position={[0, 0.35, 2.7]} rotation={[0, Math.PI, 0]}>
          <coneGeometry args={[0.88, 2.1, 4]} />
          <meshStandardMaterial color="#2d150b" roughness={1} metalness={0} flatShading />
          <Outlines color="#0f0704" thickness={0.04} />
        </mesh>

        {/* Geladak Depan Kayu (Foredeck) */}
        <mesh position={[0, 1.15, 1.3]} rotation={[-0.06, 0, 0]}>
          <boxGeometry args={[1.65, 0.12, 2.8]} />
          <meshStandardMaterial color={deckColor} roughness={1} metalness={0} />
          <Outlines color="#0f0704" thickness={0.035} />
        </mesh>

        {/* Pagar Railing Depan */}
        <mesh position={[0, 1.32, 2.4]}>
          <torusGeometry args={[0.65, 0.03, 6, 16, Math.PI]} />
          <meshStandardMaterial color="#94a3b8" roughness={1} metalness={0} />
          <Outlines color="#0f0704" thickness={0.03} />
        </mesh>

        {/* Tiang Foremast Baja Titanic dengan Sarang Gagak (Crow's Nest) */}
        <group position={[0, 2.2, 0.8]} rotation={[-0.08, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.08, 2.4, 8]} />
            <meshStandardMaterial color="#475569" roughness={1} metalness={0} />
            <Outlines color="#0f0704" thickness={0.035} />
          </mesh>
          {/* Sarang Gagak (Tempat Pengawas Melihat Gunung Es) */}
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.16, 0.14, 0.22, 8]} />
            <meshStandardMaterial color="#334155" roughness={1} metalness={0} />
            <Outlines color="#0f0704" thickness={0.03} />
          </mesh>
        </group>

        {/* Lubang Jangkar (Hawse Pipe) & Jangkar Baja */}
        <mesh position={[-0.88, 0.45, 1.8]} rotation={[0, 0.6, 0]}>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={1} metalness={0} />
          <Outlines color="#0f0704" thickness={0.035} />
        </mesh>
        <mesh position={[0.88, 0.45, 1.8]} rotation={[0, -0.6, 0]}>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={1} metalness={0} />
          <Outlines color="#0f0704" thickness={0.035} />
        </mesh>

        {/* Stalaktit Karat Menetes (Rusticles) di Haluan Depan */}
        {[-0.9, -0.4, 0.4, 0.9].map((rx, idx) => (
          <group key={idx} position={[rx, -0.6, 1.4 + idx * 0.2]}>
            <mesh rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.12, 0.75 + (idx % 2) * 0.3, 5]} />
              <meshStandardMaterial color="#78350f" roughness={1} metalness={0} flatShading />
              <Outlines color="#0f0704" thickness={0.03} />
            </mesh>
          </group>
        ))}
      </group>

      {/* =================================================== */}
      {/* BAGIAN ANJUNGAN & GELADAK TENGAH (SUPERSTRUCTURE) */}
      {/* =================================================== */}
      <group
        position={[splitOffset * 0.4, -crackProgress * 0.35, -splitOffset * 0.4]}
        rotation={[-breakTilt * 0.4, 0, -crackProgress * 0.25]}
      >
        {/* Lambung Tengah Utama */}
        <mesh position={[0, 0.15, -1.2]}>
          <boxGeometry args={[1.9, 1.7, 3.4]} />
          <meshStandardMaterial color={rustColor} roughness={1} metalness={0} flatShading />
          <Outlines color="#0f0704" thickness={0.04} />
        </mesh>

        {/* Anjungan Kapal Bertingkat (Bridge & Wheelhouse Putih Kusam Berkarat) */}
        <mesh position={[0, 1.25, -0.1]}>
          <boxGeometry args={[1.75, 0.6, 1.4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={1} metalness={0} />
          <Outlines color="#0f0704" thickness={0.035} />
        </mesh>
        <mesh position={[0, 1.65, -0.2]}>
          <boxGeometry args={[1.5, 0.35, 0.9]} />
          <meshStandardMaterial color="#cbd5e1" roughness={1} metalness={0} />
          <Outlines color="#0f0704" thickness={0.03} />
        </mesh>

        {/* Sekoci Penyelamat Mini di Dek Samping (Lifeboats) */}
        {[-0.92, 0.92].map((bx, i) =>
          [-0.3, -0.9, -1.5].map((bz, j) => (
            <mesh key={`${i}-${j}`} position={[bx, 1.55, bz]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.45, 6]} />
              <meshStandardMaterial color="#f8fafc" roughness={1} metalness={0} />
              <Outlines color="#0f0704" thickness={0.025} />
            </mesh>
          ))
        )}

        {/* =================================================== */}
        {/* 4 CEROBONG ASAP MIRING KHAS TITANIC (THE 4 FUNNELS) */}
        {/* =================================================== */}
        {[-0.6, -1.3, -2.0, -2.7].map((fz, fIdx) => {
          const funnelFall = crackProgress > 0.1 ? crackProgress * (fIdx + 1) * 0.5 : 0;
          return (
            <group
              key={fIdx}
              position={[0, 1.8 - funnelFall * 0.4, fz - funnelFall * 0.5]}
              rotation={[0.16 + funnelFall * 0.8, 0, funnelFall * 0.4]}
            >
              {/* Batang Bawah Cerobong Oranye Buff */}
              <mesh position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.2, 0.22, 0.8, 12]} />
                <meshStandardMaterial color={funnelColor} roughness={1} metalness={0} />
                <Outlines color="#0f0704" thickness={0.035} />
              </mesh>
              {/* Pucuk Atas Cerobong Hitam Pekat */}
              <mesh position={[0, 0.9, 0]}>
                <cylinderGeometry args={[0.19, 0.2, 0.35, 12]} />
                <meshStandardMaterial color={funnelTopColor} roughness={1} metalness={0} />
                <Outlines color="#0f0704" thickness={0.035} />
              </mesh>
              {/* Pipa Uap Samping */}
              <mesh position={[0.18, 0.4, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.9, 6]} />
                <meshStandardMaterial color="#475569" roughness={1} metalness={0} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};

// =========================================================================
// 6. SUBMERSIBLE ROV (KAPAL SELAM PENJELAJAH LAUT DALAM + VOLUMETRIC SPOTLIGHT)
// =========================================================================
const GLBSubmarine: React.FC<{ scale?: number }> = ({ scale = 0.9 }) => {
  const gltf = useGLTF(staticFile("models/submarine.glb"));
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
          mat.roughness = 1;
          mat.metalness = 0;
          mesh.material = mat;
        }
      }
    });
    return cloned;
  }, [gltf.scene]);

  return <primitive object={scene} scale={[scale * 0.6, scale * 0.6, scale * 0.6]} />;
};

export const SubmersibleROV: React.FC<{
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
}> = ({ position = [2.2, 1.2, 2.2], rotationY = -0.7, scale = 1 }) => {
  const frame = useCurrentFrame();
  const hoverY = Math.sin(frame * 0.05) * 0.08;

  return (
    <group position={[position[0], position[1] + hoverY, position[2]]} rotation={[0, rotationY, 0]} scale={[scale, scale, scale]}>
      <Suspense
        fallback={
          <group>
            {/* Badan Kapsul Selam Kuning */}
            <mesh>
              <sphereGeometry args={[0.55, 12, 12]} />
              <meshStandardMaterial color="#facc15" roughness={1} metalness={0} />
              <Outlines color="#1a1a1a" thickness={0.04} />
            </mesh>
            {/* Kaca Pengamat Kubah */}
            <mesh position={[0, 0, 0.45]}>
              <sphereGeometry args={[0.26, 8, 8]} />
              <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.2} />
              <Outlines color="#1a1a1a" thickness={0.04} />
            </mesh>
          </group>
        }
      >
        <GLBSubmarine scale={1} />
      </Suspense>

      {/* Sorot Lampu Kerucut Volumetrik (Volumetric Dual Light Cone) */}
      <mesh position={[0, -0.1, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.85, 2.8, 16, 1, true]} />
        <meshBasicMaterial
          color="#fef08a"
          transparent
          opacity={0.32}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Titik Lampu Terang */}
      <pointLight position={[0, 0, 0.6]} intensity={2.2} distance={8} color="#fef9c3" />
    </group>
  );
};

// =========================================================================
// SCENE 1: HOOK — DEEP DIVE TO 3.800 METERS
// =========================================================================
export const TitanicDeepDive: React.FC<{ rotationSpeed?: number }> = () => {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Gelembung & Partikel Salju Laut Dalam */}
      <InstancedSeaParticles count={320} areaRadius={6.5} color="#38bdf8" speed={0.012} />

      {/* Haluan Titanic Kapal Uap Tenggelam */}
      <TitanicSteamshipModel />

      {/* Kapal Selam Penjelajah Mengarahkan Lampu ke Haluan */}
      <SubmersibleROV position={[1.9, 0.9, 2.1]} rotationY={-0.65} scale={0.95} />

      {/* Lantai Samudra Abisal */}
      <AbyssalSeafloor />
    </group>
  );
};

// =========================================================================
// INWARD HYDROSTATIC ARROW (ROTASI MENGARAH MASUK KE PUSAT [0, 0, 0])
// =========================================================================
const InwardArrow: React.FC<{
  position: [number, number, number];
}> = ({ position }) => {
  const quaternion = useMemo(() => {
    const dir = new THREE.Vector3(-position[0], -position[1], -position[2]).normalize();
    const q = new THREE.Quaternion();
    // Default coneGeometry menunjuk ke sumbu +Y (0, 1, 0)
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    return q;
  }, [position]);

  return (
    <group position={position} quaternion={quaternion}>
      {/* Batang Panah (di belakang) */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.6, 8]} />
        <meshStandardMaterial color="#ef4444" roughness={1} metalness={0} />
        <Outlines color="#1a1a1a" thickness={0.03} />
      </mesh>
      {/* Kepala Kerucut Panah (di depan, menunjuk langsung ke pusat [0, 0, 0]) */}
      <mesh position={[0, 0.12, 0]}>
        <coneGeometry args={[0.14, 0.35, 8]} />
        <meshStandardMaterial color="#ff2a5f" roughness={1} metalness={0} />
        <Outlines color="#1a1a1a" thickness={0.03} />
      </mesh>
    </group>
  );
};

// =========================================================================
// SCENE 2: TEKANAN AIR 400X (DYNAMIC HORIZONTAL INWARD BUCKLING 1.0 -> 0.45)
// =========================================================================
export const HydrostaticCrush: React.FC<{ rotationSpeed?: number }> = () => {
  const frame = useCurrentFrame();

  // Jarak panah merah bergerak mendekat dari 3.2 unit ke 1.15 unit menusuk logam
  const arrowDist = interpolate(frame, [5, 60], [3.2, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => t * t,
  });

  // Skala horizontal tabung logam menyusut bertahap dari 1.0 menjadi 0.45
  const scaleXZ = interpolate(frame, [10, 65], [1.0, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scaleY = interpolate(frame, [10, 65], [1.0, 0.72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Getaran kompresi saat tekanan memuncak
  const crushShake = frame > 30 ? Math.sin(frame * 0.85) * 0.025 : 0;

  // 36 Panah Tekanan Merah dari Segala Sisi
  const arrowDirs = useMemo(() => {
    const list: Array<{ x: number; y: number; z: number }> = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.0;
      list.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      });
    }
    return list;
  }, []);

  const arrowPulse = 1 + Math.sin(frame * 0.25) * 0.05;

  return (
    <group position={[0, -0.1, 0]}>
      {/* Gelembung Laut Dalam */}
      <InstancedSeaParticles count={260} areaRadius={5.0} color="#38bdf8" speed={0.016} />

      {/* Kontainer / Tabung Logam Baja yang Menyusut & Penyok Horisontal (1.0 -> 0.45) */}
      <group
        scale={[scaleXZ + crushShake, scaleY, scaleXZ + crushShake]}
        position={[crushShake * 0.5, 0, 0]}
      >
        <mesh>
          <cylinderGeometry args={[0.95, 0.95, 1.8, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={1} metalness={0} flatShading />
          <Outlines color="#0f172a" thickness={0.05} />
        </mesh>
        {/* Lekukan Lipatan Penyok Baja (Buckling Crease) */}
        <mesh position={[0, 0.1, 0]} scale={[1.15, 0.3, 1.15]}>
          <torusGeometry args={[0.85, 0.12, 6, 16]} />
          <meshStandardMaterial color="#475569" roughness={1} metalness={0} />
          <Outlines color="#0f172a" thickness={0.04} />
        </mesh>
        {/* Pelat Penguat Baja Lingkar Atas & Bawah */}
        <mesh position={[0, 0.65, 0]}>
          <torusGeometry args={[0.98, 0.06, 6, 16]} />
          <meshStandardMaterial color="#334155" roughness={1} metalness={0} />
        </mesh>
        <mesh position={[0, -0.65, 0]}>
          <torusGeometry args={[0.98, 0.06, 6, 16]} />
          <meshStandardMaterial color="#334155" roughness={1} metalness={0} />
        </mesh>
      </group>

      {/* 36 Panah Tekanan Hidrostatis 3D Merah Menghadap Persis ke Pusat [0, 0, 0] */}
      {arrowDirs.map((a, idx) => {
        const d = arrowDist * arrowPulse;
        const norm = new THREE.Vector3(a.x, a.y, a.z).normalize();
        const px = norm.x * d;
        const py = norm.y * d;
        const pz = norm.z * d;

        return <InwardArrow key={idx} position={[px, py, pz]} />;
      })}

      {/* Cincin Gelombang Tekanan Air Merah */}
      <mesh scale={[scaleXZ * 1.6, scaleXZ * 1.6, scaleXZ * 1.6]}>
        <torusGeometry args={[1.6, 0.03, 6, 24]} />
        <meshStandardMaterial color="#ef4444" transparent opacity={0.4} />
      </mesh>

      {/* Lantai Dasar Laut */}
      <AbyssalSeafloor />
    </group>
  );
};

// =========================================================================
// SCENE 3: BAKTERI PEMAKAN BESI (HALOMONAS TITANICAE & RUSTICLES MACRO)
// =========================================================================
export const RusticlesMacro: React.FC<{ rotationSpeed?: number }> = () => {
  const frame = useCurrentFrame();
  const count = 380;
  const bacteriaRef = useRef<THREE.InstancedMesh>(null);

  // Instanced Bacteria Motion (Deterministic Random)
  const bacteriaPoints = useMemo(() => {
    const list: Array<{ x: number; y: number; z: number; phase: number; freq: number }> = [];
    for (let i = 0; i < count; i++) {
      const r1 = random(`bac-x-${i}`);
      const r2 = random(`bac-y-${i}`);
      const r3 = random(`bac-z-${i}`);
      const r4 = random(`bac-p-${i}`);
      const r5 = random(`bac-f-${i}`);

      list.push({
        x: ((i % 25) / 25) * 6 - 3 + (r1 - 0.5) * 0.2,
        y: ((i % 15) / 15) * 3.5 - 1.75 + (r2 - 0.5) * 0.2,
        z: 0.15 + r3 * 0.4,
        phase: r4 * Math.PI * 2,
        freq: 0.05 + r5 * 0.05,
      });
    }
    return list;
  }, [count]);

  useMemo(() => {
    if (!bacteriaRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const b = bacteriaPoints[i];
      const wiggleX = Math.sin(frame * b.freq + b.phase) * 0.08;
      const wiggleY = Math.cos(frame * b.freq * 1.2 + b.phase) * 0.08;
      dummy.position.set(b.x + wiggleX, b.y + wiggleY, b.z);
      dummy.scale.set(0.045, 0.045, 0.045);
      dummy.updateMatrix();
      bacteriaRef.current.setMatrixAt(i, dummy.matrix);
    }
    bacteriaRef.current.instanceMatrix.needsUpdate = true;
  }, [frame, count, bacteriaPoints]);

  return (
    <group position={[0, 0, 0]}>
      {/* Dinding Pelat Baja Kapal Titanic Berkarat Tebal */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[8.5, 5.0, 0.4]} />
        <meshStandardMaterial color="#451a03" roughness={1} metalness={0} />
        <Outlines color="#0f0704" thickness={0.04} />
      </mesh>

      {/* Garis Rivet / Paku Keling Baja Kuno */}
      {[-2.5, -1.2, 0, 1.2, 2.5].map((lx, idx) => (
        <group key={idx} position={[lx, 0, 0.02]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 4.8, 6]} />
            <meshStandardMaterial color="#291205" roughness={1} metalness={0} />
          </mesh>
        </group>
      ))}

      {/* Stalaktit Karat Menetes Raksasa (Rusticles Organik) */}
      {[-2.8, -2.1, -1.4, -0.7, 0, 0.7, 1.4, 2.1, 2.8].map((rx, idx) => {
        const height = 0.9 + (idx % 4) * 0.45;
        return (
          <group key={idx} position={[rx, 1.2 - (idx % 3) * 0.2, 0.05]}>
            <mesh rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.18, height, 7]} />
              <meshStandardMaterial color="#78350f" roughness={1} metalness={0} flatShading />
              <Outlines color="#0f0704" thickness={0.035} />
            </mesh>
            {/* Tetesan Ujung Rusticle */}
            <mesh position={[0, -height, 0]}>
              <sphereGeometry args={[0.08, 6, 6]} />
              <meshStandardMaterial color="#b45309" roughness={1} metalness={0} />
              <Outlines color="#0f0704" thickness={0.03} />
            </mesh>
          </group>
        );
      })}

      {/* Instanced Koloni Bakteri Halomonas Titanicae (Partikel Bio-Luminescent Oranye Mikro) */}
      <instancedMesh ref={bacteriaRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.8}
          roughness={1}
          metalness={0}
        />
      </instancedMesh>
    </group>
  );
};

// =========================================================================
// SCENE 4: SIMULASI PENGANGKATAN (KABEL DEREK BAJA & PECAHAN KAPAL MELEDAK)
// =========================================================================
export const LiftingFailure: React.FC<{ rotationSpeed?: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Penarikan Kabel Derek Baja dari Atas Samudra
  const pullProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 9, mass: 1.2, stiffness: 75 },
  });

  // Saat pertengahan scene (frame > 28): Struktur Hancur Berantakan
  const breakSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 7, mass: 1.0, stiffness: 110 },
  });

  const isBroken = frame > 28;

  return (
    <group position={[0, -0.2, 0]}>
      {/* Gelembung Laut */}
      <InstancedSeaParticles count={280} areaRadius={5.5} color="#38bdf8" speed={0.02} />

      {/* 4 Kabel Baja Derek Tegang dari Atas Menarik Haluan Kapal */}
      <group position={[0, 4.0 - pullProgress * 0.3, 0]}>
        {[-0.85, 0.85].map((kx, i) =>
          [-0.6, 1.2].map((kz, j) => (
            <group key={`${i}-${j}`} position={[kx, 0, kz]}>
              {/* Tali Kabel Baja Panjang */}
              <mesh position={[0, -1.8, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 5.2, 8]} />
                <meshStandardMaterial color="#e2e8f0" roughness={1} metalness={0} />
                <Outlines color="#0f172a" thickness={0.035} />
              </mesh>
              {/* Pengait Baja Derek (Heavy Lifting Hook) */}
              <mesh position={[0, -4.3, 0]}>
                <torusGeometry args={[0.12, 0.04, 6, 16]} />
                <meshStandardMaterial color="#f59e0b" roughness={1} metalness={0} />
                <Outlines color="#0f172a" thickness={0.03} />
              </mesh>
            </group>
          ))
        )}
      </group>

      {/* Haluan Kapal Titanic yang Terangkat Lalu Retak Pecah Terpisah */}
      <group position={[0, pullProgress * 0.45, 0]}>
        <TitanicSteamshipModel crackProgress={isBroken ? breakSpring : 0} />
      </group>

      {/* Semburan Partikel Karat Cokelat Hancur Berantakan (Instanced Debris) */}
      <InstancedRustDebris count={160} explodeProgress={isBroken ? breakSpring : 0} />

      {/* Awan Asap/Debu Karat Raksasa yang Membubung */}
      {isBroken && (
        <group position={[0, 0.4, 0.3]} scale={[breakSpring * 2.5, breakSpring * 1.8, breakSpring * 2.2]}>
          <mesh>
            <sphereGeometry args={[1.0, 8, 8]} />
            <meshStandardMaterial
              color="#b45309"
              transparent
              opacity={Math.max(0.1, 0.75 - breakSpring * 0.4)}
              roughness={1}
              metalness={0}
              flatShading
            />
          </mesh>
        </group>
      )}

      {/* Lantai Samudra */}
      <AbyssalSeafloor />
    </group>
  );
};

// =========================================================================
// SCENE 5: PREDIKSI KEPUNAHAN TAHUN 2030 (TIME-LAPSE PENIMBUNAN & PELAPUKAN)
// =========================================================================
export const TitanicDecay: React.FC<{ rotationSpeed?: number }> = () => {
  const frame = useCurrentFrame();

  // Erosi & Penimbunan Pasir Berlahan
  const decayProgress = interpolate(frame, [0, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sandRiseY = -1.6 + decayProgress * 0.8;

  return (
    <group position={[0, -0.2, 0]}>
      {/* Gelembung Laut & Karat Rontok */}
      <InstancedSeaParticles count={300} areaRadius={6.0} color="#f59e0b" speed={0.015} />

      {/* Bangkai Titanic yang Perlahan Menghilang & Memudar */}
      <group position={[0, -0.15, 0]}>
        <TitanicSteamshipModel rustLevel={1 + decayProgress * 1.5} />
      </group>

      {/* Lapisan Pasir Dasar Laut yang Menelan Bangkai Kapal (Time-Lapse Rise) */}
      <mesh position={[0, sandRiseY, 0]}>
        <boxGeometry args={[28, 0.85, 22]} />
        <meshStandardMaterial
          color="#1e3a5f"
          roughness={1}
          metalness={0}
          transparent
          opacity={0.94}
        />
        <Outlines color="#0c2340" thickness={0.03} />
      </mesh>

      <AbyssalSeafloor />
    </group>
  );
};

// =========================================================================
// SCENE 6: CLOSING — MONUMEN ABADI BAWAH LAUT
// =========================================================================
export const TitanicResting: React.FC<{ rotationSpeed?: number }> = () => {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Partikel Salju Laut / Marine Snow Sunyi */}
      <InstancedSeaParticles count={360} areaRadius={7.0} color="#38bdf8" speed={0.009} />

      {/* Haluan Titanic Kapal Uap yang Damai di Dasar Atlantik */}
      <TitanicSteamshipModel />

      {/* Kapal Selam Penjelajah dari Kejauhan Mengarahkan Sorot Lampu Perpisahan */}
      <SubmersibleROV position={[3.2, 1.8, 3.4]} rotationY={-0.8} scale={0.85} />

      {/* Lantai Dasar Samudra Atlantik */}
      <AbyssalSeafloor />
    </group>
  );
};

// =========================================================================
// UNIVERSAL MODEL ROUTER
// =========================================================================
export type ModelProps = {
  type: string;
  modelPath?: string;
  rotationSpeed?: number;
};

export const Models: React.FC<ModelProps> = ({
  type,
  modelPath,
  rotationSpeed = 0.2,
}) => {
  if (modelPath) {
    return (
      <Suspense fallback={<TitanicDeepDive rotationSpeed={rotationSpeed} />}>
        <TitanicSteamshipModel />
      </Suspense>
    );
  }

  switch (type) {
    case "titanic-deep-dive":
      return <TitanicDeepDive rotationSpeed={rotationSpeed} />;
    case "hydrostatic-crush":
      return <HydrostaticCrush rotationSpeed={rotationSpeed} />;
    case "rusticles-macro":
      return <RusticlesMacro rotationSpeed={rotationSpeed} />;
    case "lifting-failure":
      return <LiftingFailure rotationSpeed={rotationSpeed} />;
    case "titanic-decay":
      return <TitanicDecay rotationSpeed={rotationSpeed} />;
    case "titanic-resting":
      return <TitanicResting rotationSpeed={rotationSpeed} />;
    case "sahara-fossil":
      return <SaharaCrossSection rotationSpeed={rotationSpeed} />;
    case "green-sahara":
      return <GreenSahara rotationSpeed={rotationSpeed} />;
    case "earth-tilt":
      return <EarthAxialTilt rotationSpeed={rotationSpeed} />;
    case "dust-stream":
      return <DustStream rotationSpeed={rotationSpeed} />;
    case "earth-pullout":
    case "future-earth":
      return <EarthPullout rotationSpeed={rotationSpeed} />;
    case "green-sahara-finale":
      return <GreenSaharaFinale rotationSpeed={rotationSpeed} />;
    case "engine-cutaway-intro":
      return <EngineCutawayIntro rotationSpeed={rotationSpeed} />;
    case "compression-stroke":
      return <CompressionStroke rotationSpeed={rotationSpeed} />;
    case "engine-knocking":
      return <EngineKnocking rotationSpeed={rotationSpeed} />;
    case "controlled-combustion":
      return <ControlledCombustion rotationSpeed={rotationSpeed} />;
    case "engine-pullout-closing":
      return <EnginePulloutClosing rotationSpeed={rotationSpeed} />;
    default:
      return <TitanicDeepDive rotationSpeed={rotationSpeed} />;
  }
};
