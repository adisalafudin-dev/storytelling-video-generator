import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Outlines } from "@react-three/drei";

// =========================================================================
// Helper: Low-Poly Tree with Outlines & Variety
// =========================================================================
export const LowPolyTree: React.FC<{
  position?: [number, number, number];
  scale?: number;
  foliageColor?: string;
  type?: "conifer" | "palm" | "round" | "acacia";
}> = ({ position = [0, 0, 0], scale = 1, foliageColor = "#22c55e", type = "conifer" }) => {
  if (type === "palm") {
    return (
      <group position={position} scale={[scale, scale, scale]}>
        {/* Curved Palm Trunk */}
        <mesh position={[0, 0.6, 0]} rotation={[0.08, 0, 0.05]}>
          <cylinderGeometry args={[0.06, 0.1, 1.2, 6]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        {/* Palm Fronds */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[0, 1.2, 0]} rotation={[0.4, angle, -0.3]}>
              <coneGeometry args={[0.22, 0.8, 4]} />
              <meshStandardMaterial color={foliageColor} roughness={0.6} flatShading />
              <Outlines thickness={0.02} color="#1a1a1a" />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (type === "acacia") {
    return (
      <group position={position} scale={[scale, scale, scale]}>
        {/* Tapering Split Trunk */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.14, 1.0, 5]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        {/* Flat-top Umbrella Canopy */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.7, 0.2, 0.25, 7]} />
          <meshStandardMaterial color={foliageColor} roughness={0.7} flatShading />
          <Outlines thickness={0.025} color="#1a1a1a" />
        </mesh>
        <mesh position={[0.2, 1.2, 0]}>
          <cylinderGeometry args={[0.5, 0.15, 0.2, 6]} />
          <meshStandardMaterial color={foliageColor} roughness={0.7} flatShading />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
      </group>
    );
  }

  if (type === "round") {
    return (
      <group position={position} scale={[scale, scale, scale]}>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.07, 0.12, 0.7, 6]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <dodecahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color={foliageColor} roughness={0.6} flatShading />
          <Outlines thickness={0.025} color="#1a1a1a" />
        </mesh>
      </group>
    );
  }

  // Conifer
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 0.9, 6]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <coneGeometry args={[0.55, 0.8, 6]} />
        <meshStandardMaterial color={foliageColor} roughness={0.6} flatShading />
        <Outlines thickness={0.025} color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <coneGeometry args={[0.42, 0.7, 6]} />
        <meshStandardMaterial color={foliageColor} roughness={0.6} flatShading />
        <Outlines thickness={0.025} color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <coneGeometry args={[0.28, 0.6, 6]} />
        <meshStandardMaterial color={foliageColor} roughness={0.6} flatShading />
        <Outlines thickness={0.025} color="#1a1a1a" />
      </mesh>
    </group>
  );
};

// =========================================================================
// Helper: Stylized Flamingo with Micro-Motion (Idle Bobbing / Feeding)
// =========================================================================
export const StylizedFlamingo: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  phaseOffset?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, phaseOffset = 0 }) => {
  const frame = useCurrentFrame();

  // Natural idle motion
  const neckBob = Math.sin(frame * 0.08 + phaseOffset) * 0.16;
  const headDip = Math.sin(frame * 0.08 + phaseOffset + 0.4) * 0.22;
  const bodySway = Math.cos(frame * 0.05 + phaseOffset) * 0.03;

  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Legs */}
      <mesh position={[-0.03, 0.15, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.3, 4]} />
        <meshStandardMaterial color="#f472b6" roughness={0.7} />
      </mesh>
      <mesh position={[0.03, 0.15, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.3, 4]} />
        <meshStandardMaterial color="#f472b6" roughness={0.7} />
      </mesh>
      {/* Animated Body */}
      <group position={[0, 0.32, 0]} rotation={[0.2 + bodySway, 0, bodySway]}>
        <mesh>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#ec4899" roughness={0.5} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        {/* Animated Neck & Head */}
        <group position={[0.06, 0.08, 0.04]} rotation={[-0.3 + neckBob, 0, -0.2]}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.018, 0.024, 0.22, 6]} />
            <meshStandardMaterial color="#ec4899" roughness={0.5} />
          </mesh>
          {/* Head & Beak dipping */}
          <group position={[0.04, 0.21, 0.02]} rotation={[headDip, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.035, 6, 6]} />
              <meshStandardMaterial color="#f472b6" roughness={0.5} />
            </mesh>
            <mesh position={[0.04, -0.01, 0]} rotation={[0, 0, -0.8]}>
              <coneGeometry args={[0.018, 0.07, 4]} />
              <meshStandardMaterial color="#1e293b" roughness={0.5} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

// =========================================================================
// 1. SCENE 1: ELEVATED UNDERGROUND CROSS-SECTION & PROMINENT WHALE FOSSIL
// =========================================================================

export const PrehistoricWhaleSkeleton: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, -0.28, 1.14], scale = 0.58 }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* 1. ELONGATED BASILOSAURUS SKULL (Facing Right / +X) */}
      <group position={[0.55, 0.04, 0]}>
        {/* Tapering Upper Snout / Rostrum */}
        <mesh position={[0.26, 0.02, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.13, 0.48, 6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} flatShading />
          <Outlines thickness={0.025} color="#1a1a1a" />
        </mesh>
        {/* Posterior Cranium / Braincase */}
        <mesh position={[0.02, 0.04, 0]} scale={[0.22, 0.16, 0.18]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} flatShading />
          <Outlines thickness={0.025} color="#1a1a1a" />
        </mesh>
        {/* Lower Jaw (Mandible) */}
        <mesh position={[0.24, -0.09, 0]} rotation={[0, 0, -0.06]}>
          <boxGeometry args={[0.44, 0.045, 0.11]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        {/* Eye Orbit Ridge */}
        <mesh position={[0.08, 0.08, 0.09]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Conical Prehistoric Teeth Array along jaws */}
        {[-0.04, 0.06, 0.16, 0.26, 0.36].map((tx) => (
          <group key={tx}>
            {/* Upper tooth */}
            <mesh position={[tx, -0.02, 0.06]} rotation={[0, 0, Math.PI]}>
              <coneGeometry args={[0.016, 0.045, 4]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
            {/* Lower tooth */}
            <mesh position={[tx + 0.04, -0.07, 0.06]}>
              <coneGeometry args={[0.014, 0.04, 4]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 2. ARTICULATED SPINAL COLUMN (11 Segmented Vertebrae with Spinous Processes) */}
      {Array.from({ length: 11 }).map((_, i) => {
        const vx = 0.38 - i * 0.11;
        const vy = Math.sin(i * 0.32) * 0.03;
        const vertScale = 1 - i * 0.035;
        return (
          <group key={i} position={[vx, vy, 0]} scale={[vertScale, vertScale, vertScale]}>
            {/* Vertebral Centrum */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.065, 0.065, 0.09, 8]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
              <Outlines thickness={0.02} color="#1a1a1a" />
            </mesh>
            {/* Upright Dorsal Spinous Process */}
            <mesh position={[0, 0.09, 0]} rotation={[0, 0, -0.15]}>
              <boxGeometry args={[0.03, 0.11, 0.03]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.35} />
              <Outlines thickness={0.018} color="#1a1a1a" />
            </mesh>
          </group>
        );
      })}

      {/* 3. ANATOMICAL ARCHED RIBCAGE (6 Paired Ribs) */}
      {[0.28, 0.17, 0.06, -0.05, -0.16, -0.27].map((rx, idx) => {
        const ribScale = 0.22 - Math.abs(idx - 2) * 0.02;
        return (
          <group key={idx} position={[rx, -0.01, 0]}>
            <mesh rotation={[0.45, 0, 0]} position={[0, -0.13, 0.07]}>
              <torusGeometry args={[ribScale, 0.022, 6, 16, Math.PI * 0.95]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
              <Outlines thickness={0.02} color="#1a1a1a" />
            </mesh>
          </group>
        );
      })}

      {/* 4. VESTIGIAL FRONT FLIPPER PADDLE */}
      <group position={[0.22, -0.12, 0.08]} rotation={[0.2, 0, -0.7]}>
        <mesh position={[0, -0.09, 0]}>
          <boxGeometry args={[0.045, 0.2, 0.025]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          <Outlines thickness={0.018} color="#1a1a1a" />
        </mesh>
        <mesh position={[0.02, -0.2, 0]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[0.05, 0.12, 4]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
      </group>

      {/* 5. CAUDAL TAIL FLUKES AT POSTERIOR */}
      <group position={[-0.82, -0.02, 0]}>
        {/* Upper fluke */}
        <mesh position={[-0.07, 0.08, 0]} rotation={[0, 0, 0.6]}>
          <coneGeometry args={[0.06, 0.18, 4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
          <Outlines thickness={0.018} color="#1a1a1a" />
        </mesh>
        {/* Lower fluke */}
        <mesh position={[-0.07, -0.08, 0]} rotation={[0, 0, -0.6]}>
          <coneGeometry args={[0.06, 0.18, 4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
          <Outlines thickness={0.018} color="#1a1a1a" />
        </mesh>
      </group>
    </group>
  );
};

export const SaharaCrossSection: React.FC<{ rotationSpeed?: number }> = ({
  rotationSpeed = 0.12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * rotationSpeed;

  return (
    // Balanced Y position (0.08) so top pyramids are completely visible below info card
    <group rotation={[0.16, Math.sin(t) * 0.12, 0]} position={[0, 0.08, 0]}>
      {/* 1.1 TOP DESERT SURFACE: PYRAMIDS & GOLDEN DUNES */}
      <group position={[0, 0.72, 0]}>
        {/* Dune Top Platform */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.4, 0.25, 2.2]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.9} flatShading />
          <Outlines thickness={0.03} color="#1a1a1a" />
        </mesh>
        {/* Prominent Egyptian / Desert Pyramids */}
        <mesh position={[-0.85, 0.42, -0.2]} rotation={[0, 0.4, 0]}>
          <coneGeometry args={[0.95, 0.75, 4]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.8} flatShading />
          <Outlines thickness={0.035} color="#1a1a1a" />
        </mesh>
        <mesh position={[0.75, 0.35, 0.2]} rotation={[0, -0.3, 0]}>
          <coneGeometry args={[0.75, 0.6, 4]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.85} flatShading />
          <Outlines thickness={0.03} color="#1a1a1a" />
        </mesh>
        {/* Sand Dune Ridge */}
        <mesh position={[0, 0.25, -0.4]} rotation={[0.1, 0, 0]}>
          <coneGeometry args={[1.2, 0.45, 6]} />
          <meshStandardMaterial color="#d97706" roughness={0.9} flatShading />
        </mesh>
        {/* Desert Rocks */}
        <mesh position={[-0.2, 0.18, 0.4]} rotation={[0.2, 0.5, 0]}>
          <dodecahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} flatShading />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        <mesh position={[1.1, 0.16, -0.2]} rotation={[0.4, 0.1, 0.3]}>
          <dodecahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} flatShading />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
      </group>

      {/* 1.2 STRATIFIED SEDIMENTARY CUTAWAY SLICES */}
      <group position={[0, -0.05, 0]}>
        {/* LAYER 1: Upper Sandstone & Silt Slices */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[3.4, 0.38, 2.18]} />
          <meshStandardMaterial color="#d97706" roughness={0.85} flatShading />
          <Outlines thickness={0.03} color="#1a1a1a" />
        </mesh>

        {/* LAYER 2: Ancient Alluvial River Sediment (Terracotta Clay) */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[3.4, 0.36, 2.18]} />
          <meshStandardMaterial color="#92400e" roughness={0.88} flatShading />
          <Outlines thickness={0.03} color="#1a1a1a" />
        </mesh>

        {/* LAYER 3: Ancient Riverbed Channel (Cyan/Teal Sedimentary Strata) */}
        <mesh position={[0, -0.26, 0]}>
          <boxGeometry args={[3.42, 0.42, 2.2]} />
          <meshStandardMaterial color="#0e7490" roughness={0.8} flatShading />
          <Outlines thickness={0.035} color="#1a1a1a" />
        </mesh>

        {/* Riverbed Flow Ribbon with Inset Water Groove */}
        <mesh position={[0, -0.26, 1.11]}>
          <planeGeometry args={[3.4, 0.22]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.6} />
        </mesh>

        {/* Embedded Pebbles & River Stones */}
        {[-1.3, -0.6, 0.3, 1.1].map((px, idx) => (
          <mesh key={idx} position={[px, -0.28, 1.12]} scale={0.065}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.5} />
          </mesh>
        ))}

        {/* LAYER 4: Deep Limestone Bedrock Strata */}
        <mesh position={[0, -0.68, 0]}>
          <boxGeometry args={[3.4, 0.46, 2.18]} />
          <meshStandardMaterial color="#451a03" roughness={0.95} flatShading />
          <Outlines thickness={0.03} color="#1a1a1a" />
        </mesh>
      </group>

      {/* 1.3 PERFECTLY CENTERED ANATOMICAL WHALE SKELETON (Wadi Al-Hitan) */}
      <PrehistoricWhaleSkeleton position={[0, -0.28, 1.14]} scale={0.58} />
    </group>
  );
};

// =========================================================================
// 2. SCENE 2: EXPANSIVE GREEN SAHARA & MEGA-LAKE CHAD (VAST CONTINENT)
// =========================================================================
export const GreenSahara: React.FC<{ rotationSpeed?: number }> = ({
  rotationSpeed = 0.2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * rotationSpeed;

  return (
    <group rotation={[0.3, t, 0]} position={[0, -0.25, 0]}>
      {/* 2.1 VAST CONTINENTAL TERRAIN BASE (Radius 6.5) */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[6.5, 6.8, 0.8, 24]} />
        <meshStandardMaterial color="#14532d" roughness={0.85} flatShading />
        <Outlines thickness={0.03} color="#1a1a1a" />
      </mesh>
      {/* Tiered Savannah Green Plate */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[5.8, 6.2, 0.45, 24]} />
        <meshStandardMaterial color="#15803d" roughness={0.75} flatShading />
        <Outlines thickness={0.035} color="#1a1a1a" />
      </mesh>
      {/* Surrounding Rolling Hills */}
      {[-3.2, 2.8, -1.8, 3.4].map((hx, idx) => (
        <mesh key={idx} position={[hx, 0.2, (idx % 2 === 0 ? 2.6 : -2.8)]} scale={[1.8, 0.6, 1.4]}>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#166534" roughness={0.8} flatShading />
        </mesh>
      ))}

      {/* 2.2 MEGA-LAKE CHAD (Broad Water Basin with Golden Shoreline) */}
      <group position={[-0.2, 0.25, -0.1]}>
        {/* Sandy Beach Rim */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.7, 1.7, 0.02, 32]} />
          <meshStandardMaterial color="#fde047" roughness={0.9} />
        </mesh>
        {/* Shimmering Turquoise Water */}
        <mesh position={[0, 0.015, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.03, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            roughness={0.12}
            metalness={0.75}
            emissive="#0891b2"
            emissiveIntensity={0.35}
          />
          <Outlines thickness={0.025} color="#0e7490" />
        </mesh>
      </group>

      {/* River Delta Inlets winding across the plain */}
      <mesh position={[0.9, 0.25, 0.5]} rotation={[0, 0.8, 0]}>
        <boxGeometry args={[1.8, 0.03, 0.2]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh position={[-1.3, 0.25, -0.7]} rotation={[0, -0.6, 0]}>
        <boxGeometry args={[1.4, 0.03, 0.16]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* 2.3 FLORA: Abundant Palms, Conifers, and Acacia Trees */}
      <LowPolyTree position={[-1.6, 0.26, 1.1]} scale={0.85} type="palm" foliageColor="#22c55e" />
      <LowPolyTree position={[-1.1, 0.26, 1.6]} scale={0.7} type="palm" foliageColor="#16a34a" />
      <LowPolyTree position={[1.4, 0.26, -0.7]} scale={0.9} type="acacia" foliageColor="#15803d" />
      <LowPolyTree position={[1.9, 0.26, 0.6]} scale={0.8} type="acacia" foliageColor="#16a34a" />
      <LowPolyTree position={[1.1, 0.26, 1.2]} scale={0.75} type="round" foliageColor="#4ade80" />
      <LowPolyTree position={[-1.8, 0.26, -1.0]} scale={0.85} type="round" foliageColor="#10b981" />
      <LowPolyTree position={[0.3, 0.26, -1.7]} scale={0.8} type="conifer" foliageColor="#15803d" />
      <LowPolyTree position={[-2.5, 0.26, 0.2]} scale={0.75} type="conifer" foliageColor="#166534" />
      <LowPolyTree position={[2.6, 0.26, -1.4]} scale={0.85} type="palm" foliageColor="#22c55e" />

      {/* 2.4 FAUNA: Animated Flamingos with Idle Head Bobbing */}
      <StylizedFlamingo position={[-0.9, 0.27, 0.5]} rotation={[0, 0.8, 0]} scale={0.75} phaseOffset={0} />
      <StylizedFlamingo position={[0.5, 0.27, -0.8]} rotation={[0, -1.2, 0]} scale={0.7} phaseOffset={1.5} />
      <StylizedFlamingo position={[-0.3, 0.27, 1.2]} rotation={[0, 0.4, 0]} scale={0.65} phaseOffset={3.0} />

      {/* Low-Poly Shoreline Boulders */}
      <mesh position={[1.0, 0.28, -0.2]} rotation={[0.2, 0.4, 0]}>
        <dodecahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color="#475569" roughness={0.8} flatShading />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.8, 0.28, -1.2]} rotation={[0.1, -0.3, 0.2]}>
        <dodecahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} flatShading />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
    </group>
  );
};

// =========================================================================
// 3. SCENE 3: EARTH AXIAL TILT WITH RECOGNIZABLE CONTINENTS
// =========================================================================
export const EarthAxialTilt: React.FC<{ rotationSpeed?: number }> = ({
  rotationSpeed = 0.35,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * rotationSpeed;

  const tiltAngle = 0.41; // ~23.5°

  return (
    <group position={[0, -0.35, 0]}>
      <group rotation={[0, 0, tiltAngle]}>
        {/* Tilted North-South Axis Indicator */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 3.6, 8]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.85} />
        </mesh>
        <mesh position={[0, 1.82, 0]}>
          <sphereGeometry args={[0.075, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#00f0ff" />
        </mesh>
        <mesh position={[0, -1.82, 0]}>
          <sphereGeometry args={[0.075, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#00f0ff" />
        </mesh>

        {/* Spinning Earth Globe (Oriented with Africa Facing Front) */}
        <group rotation={[0, -0.15 + t * 0.25, 0]}>
          {/* Deep Ocean Sphere */}
          <mesh>
            <sphereGeometry args={[1.16, 32, 32]} />
            <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.4} />
          </mesh>

          {/* RECOGNIZABLE AFRICAN CONTINENT LANDMASS GROUP */}
          {/* North Africa & Sahara (Golden-Yellow Bulge) */}
          <mesh position={[0.04, 0.42, 1.12]} scale={[0.95, 0.44, 0.3]}>
            <dodecahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial color="#eab308" roughness={0.7} flatShading />
            <Outlines thickness={0.025} color="#854d0e" />
          </mesh>
          {/* Central & West Africa Tropical Rainforest (Lush Green) */}
          <mesh position={[-0.15, 0.08, 1.15]} scale={[0.75, 0.48, 0.28]}>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#15803d" roughness={0.7} flatShading />
            <Outlines thickness={0.025} color="#14532d" />
          </mesh>
          {/* Horn of Africa (East Coast Projection) */}
          <mesh position={[0.48, 0.18, 1.05]} rotation={[0, 0.5, -0.3]} scale={[0.38, 0.28, 0.22]}>
            <coneGeometry args={[0.4, 0.5, 4]} />
            <meshStandardMaterial color="#16a34a" roughness={0.7} flatShading />
            <Outlines thickness={0.02} color="#14532d" />
          </mesh>
          {/* Southern Africa (Tapering Southwards) */}
          <mesh position={[0.08, -0.38, 1.08]} scale={[0.55, 0.5, 0.25]}>
            <dodecahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial color="#16a34a" roughness={0.7} flatShading />
            <Outlines thickness={0.02} color="#14532d" />
          </mesh>
          {/* Madagascar Island */}
          <mesh position={[0.55, -0.34, 0.98]} rotation={[0, 0, 0.35]} scale={[0.12, 0.32, 0.1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#22c55e" roughness={0.7} />
          </mesh>

          {/* EUROPE & MEDITERRANEAN (Across the Sea to the North) */}
          <mesh position={[-0.05, 0.82, 0.92]} scale={[0.75, 0.28, 0.22]}>
            <dodecahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial color="#15803d" roughness={0.7} flatShading />
            <Outlines thickness={0.02} color="#14532d" />
          </mesh>

          {/* ARABIAN PENINSULA (Separated by Red Sea Rift) */}
          <mesh position={[0.54, 0.52, 0.98]} rotation={[0, -0.2, 0.2]} scale={[0.38, 0.38, 0.2]}>
            <dodecahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} flatShading />
            <Outlines thickness={0.02} color="#854d0e" />
          </mesh>
        </group>

        {/* Equator Guide Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.44, 0.016, 8, 64]} />
          <meshStandardMaterial color="rgba(255, 255, 255, 0.4)" roughness={0.5} />
        </mesh>
      </group>

      {/* Orbit & Tilt Angle Arc Marker (Coral Red Glow) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, tiltAngle / 2]}>
        <torusGeometry args={[1.68, 0.024, 8, 32, tiltAngle]} />
        <meshStandardMaterial color="#ff2a5f" emissive="#ff2a5f" emissiveIntensity={1.0} />
      </mesh>

      {/* Cyan Monsoon Wind Trail sweeping into Sahara */}
      <mesh position={[0.15, 0.18, 1.22]} rotation={[0.4, 0.3, t * 0.8]}>
        <torusGeometry args={[0.48, 0.024, 6, 24, Math.PI * 0.85]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.95} />
      </mesh>
    </group>
  );
};

// =========================================================================
// 4. SCENE 4: ORGANIC CONTINENT CONTOURS (SAHARA & AMAZON) + FINE DUST STREAM
// =========================================================================
export const DustStream: React.FC<{ rotationSpeed?: number }> = ({
  rotationSpeed = 0.25,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * rotationSpeed;

  const count = 180;
  const particleMeta = useMemo(() => {
    const list: Array<{ offset: number; speed: number; yJitter: number; zOffset: number; scale: number }> = [];
    for (let i = 0; i < count; i++) {
      list.push({
        offset: (i * 0.618) % 1,
        speed: 0.65 + (i % 7) * 0.12,
        yJitter: ((i % 5) - 2) * 0.05,
        zOffset: ((i % 9) - 4) * 0.07,
        scale: 0.015 + (i % 4) * 0.005,
      });
    }
    return list;
  }, []);

  return (
    <group position={[0, -0.15, 0]} rotation={[0.22, 0.1, 0]}>
      {/* Atlantic Ocean Basin Expanse */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[3.4, 3.4, 0.25, 24]} />
        <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.5} />
        <Outlines thickness={0.03} color="#1a1a1a" />
      </mesh>

      {/* 4.1 RIGHT: ORGANIC WEST AFRICAN / SAHARA CONTINENT BULGE */}
      <group position={[1.4, 0.16, 0]}>
        {/* Coastal Shallow Shelf (Turquoise) */}
        <mesh position={[-0.15, -0.04, 0]} scale={[1.2, 0.22, 1.4]}>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#0ea5e9" roughness={0.6} />
        </mesh>
        {/* Main African Continental Bulge (Organic Polygonal Contours) */}
        <mesh position={[0.1, 0.06, -0.1]} scale={[1.1, 0.35, 1.3]}>
          <dodecahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial color="#eab308" roughness={0.9} flatShading />
          <Outlines thickness={0.03} color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.2, 0.08, 0.3]} scale={[0.8, 0.32, 0.9]}>
          <dodecahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#eab308" roughness={0.9} flatShading />
          <Outlines thickness={0.025} color="#1a1a1a" />
        </mesh>
        {/* Rolling Sand Dunes & Golden Ridge Peaks */}
        <mesh position={[-0.15, 0.28, 0.1]} rotation={[0.1, 0.4, 0]}>
          <coneGeometry args={[0.42, 0.38, 5]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.85} flatShading />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        <mesh position={[0.25, 0.26, -0.25]} rotation={[-0.1, -0.3, 0]}>
          <coneGeometry args={[0.48, 0.42, 5]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.85} flatShading />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        <mesh position={[0.3, 0.22, 0.35]} scale={[0.3, 0.2, 0.35]}>
          <dodecahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#d97706" roughness={0.9} />
        </mesh>
      </group>

      {/* 4.2 LEFT: ORGANIC SOUTH AMERICAN / AMAZON CONTINENT WITH RAINFOREST CANOPY */}
      <group position={[-1.4, 0.16, 0]}>
        {/* Coastal Shallow Shelf (Emerald Cyan) */}
        <mesh position={[0.15, -0.04, 0]} scale={[1.2, 0.22, 1.4]}>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#059669" roughness={0.6} />
        </mesh>
        {/* Main South American Continental Contour */}
        <mesh position={[-0.1, 0.06, -0.1]} scale={[1.1, 0.35, 1.3]}>
          <dodecahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial color="#15803d" roughness={0.7} flatShading />
          <Outlines thickness={0.03} color="#1a1a1a" />
        </mesh>
        <mesh position={[0.2, 0.08, 0.25]} scale={[0.85, 0.32, 0.95]}>
          <dodecahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#166534" roughness={0.7} flatShading />
          <Outlines thickness={0.025} color="#1a1a1a" />
        </mesh>
        {/* Amazon River Estuary Delta cutting deep into the interior */}
        <mesh position={[0.28, 0.24, 0.05]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.85, 0.03, 0.18]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Multi-Layered Rainforest Foliage */}
        <LowPolyTree position={[0.12, 0.28, 0.35]} scale={0.62} type="palm" foliageColor="#22c55e" />
        <LowPolyTree position={[-0.25, 0.28, -0.25]} scale={0.72} type="round" foliageColor="#16a34a" />
        <LowPolyTree position={[0.02, 0.28, -0.42]} scale={0.58} type="conifer" foliageColor="#15803d" />
        <LowPolyTree position={[-0.38, 0.28, 0.22]} scale={0.68} type="round" foliageColor="#14532d" />
        <LowPolyTree position={[-0.3, 0.28, -0.5]} scale={0.55} type="palm" foliageColor="#22c55e" />
      </group>

      {/* 4.3 DENSE GLOWING PHOSPHOR PARTICLES: FINE ATMOSPHERIC AEROSOL STREAM */}
      {particleMeta.map((p, i) => {
        const progress = (t * p.speed + p.offset) % 1;
        // East (1.35) to West (-1.35)
        const x = 1.35 - progress * 2.7;
        // High parabolic arc across the Atlantic
        const arcY = 0.3 + Math.sin(progress * Math.PI) * 0.72 + p.yJitter;
        const z = p.zOffset + Math.sin(progress * Math.PI * 2) * 0.12;

        return (
          <mesh key={i} position={[x, arcY, z]} scale={p.scale}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#f59e0b"
              emissiveIntensity={1.8}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// =========================================================================
// 5. SCENE 5: 20,000-YEAR MILANKOVITCH CYCLE (BALANCED VERTICAL FRAMING)
// =========================================================================
export const EarthPullout: React.FC<{ rotationSpeed?: number }> = ({
  rotationSpeed = 0.2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * rotationSpeed;

  return (
    <group position={[0, -0.42, 0]}>
      {/* Central Rotating Planetary Globe */}
      <group rotation={[0.25, t * 1.2, 0]}>
        <mesh>
          <sphereGeometry args={[1.16, 32, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Shifting African Landmass (Green to Gold Cycle) */}
        <mesh position={[0.04, 0.4, 1.12]} scale={[0.9, 0.45, 0.28]}>
          <dodecahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#22c55e" roughness={0.7} flatShading />
          <Outlines thickness={0.02} color="#14532d" />
        </mesh>
        <mesh position={[-0.15, 0.08, 1.14]} scale={[0.7, 0.45, 0.25]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#15803d" roughness={0.7} flatShading />
          <Outlines thickness={0.02} color="#14532d" />
        </mesh>
      </group>

      {/* Dual Glowing Orbital Precession Ellipse Rings */}
      <mesh rotation={[Math.PI / 3, 0, t * 0.35]}>
        <torusGeometry args={[1.9, 0.026, 12, 64]} />
        <meshStandardMaterial color="#ff2a5f" emissive="#ff2a5f" emissiveIntensity={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, t * 0.28, 0]}>
        <torusGeometry args={[2.25, 0.018, 12, 64]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.7} />
      </mesh>

      {/* Orbiting Timeline Node */}
      <mesh
        position={[
          Math.cos(t * 1.2) * 1.9,
          Math.sin(t * 1.2) * 0.8,
          Math.sin(t * 1.2) * 1.4,
        ]}
        scale={0.09}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#fef08a" emissive="#eab308" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
};

// =========================================================================
// 6. SCENE 6: FINALE - GRAND SUNSET OASIS WITH VAST ROLLING TERRAIN
// =========================================================================
export const GreenSaharaFinale: React.FC<{ rotationSpeed?: number }> = ({
  rotationSpeed = 0.22,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * rotationSpeed;

  return (
    <group rotation={[0.34, t * 0.7, 0]} position={[0, -0.28, 0]}>
      {/* 6.1 VAST PANORAMIC TERRAIN BASE (Radius 7.8) */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[7.8, 8.2, 0.9, 28]} />
        <meshStandardMaterial color="#14532d" roughness={0.9} flatShading />
        <Outlines thickness={0.03} color="#1a1a1a" />
      </mesh>
      {/* Upper Grassy Plateau */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[6.8, 7.2, 0.5, 28]} />
        <meshStandardMaterial color="#16a34a" roughness={0.7} flatShading />
        <Outlines thickness={0.035} color="#1a1a1a" />
      </mesh>
      {/* Rolling Savannah Hills forming a natural amphitheater */}
      {[-3.6, 3.2, -2.4, 3.8].map((hx, idx) => (
        <mesh key={idx} position={[hx, 0.35, (idx % 2 === 0 ? 3.0 : -3.2)]} scale={[2.2, 0.8, 1.8]}>
          <dodecahedronGeometry args={[1.0, 0]} />
          <meshStandardMaterial color="#15803d" roughness={0.8} flatShading />
        </mesh>
      ))}

      {/* 6.2 SUNSET SHIMMERING LAKE WITH GOLDEN RIM */}
      <group position={[0, 0.28, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.9, 1.9, 0.02, 32]} />
          <meshStandardMaterial color="#fde047" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.015, 0]}>
          <cylinderGeometry args={[1.7, 1.7, 0.03, 32]} />
          <meshStandardMaterial
            color="#0891b2"
            roughness={0.1}
            metalness={0.8}
            emissive="#0284c7"
            emissiveIntensity={0.4}
          />
          <Outlines thickness={0.025} color="#0369a1" />
        </mesh>
      </group>

      {/* 6.3 DENSE TROPICAL PALM GROVES & ACACIAS */}
      <LowPolyTree position={[-1.5, 0.29, 1.3]} scale={0.95} type="palm" foliageColor="#22c55e" />
      <LowPolyTree position={[-1.9, 0.29, 0.7]} scale={0.8} type="palm" foliageColor="#16a34a" />
      <LowPolyTree position={[1.6, 0.29, -0.9]} scale={1.0} type="acacia" foliageColor="#15803d" />
      <LowPolyTree position={[2.2, 0.29, 0.4]} scale={0.85} type="palm" foliageColor="#16a34a" />
      <LowPolyTree position={[1.3, 0.29, 1.1]} scale={0.85} type="round" foliageColor="#4ade80" />
      <LowPolyTree position={[-0.5, 0.29, -1.8]} scale={0.85} type="palm" foliageColor="#22c55e" />
      <LowPolyTree position={[-2.8, 0.29, -1.2]} scale={0.9} type="conifer" foliageColor="#166534" />
      <LowPolyTree position={[3.0, 0.29, -1.8]} scale={0.85} type="palm" foliageColor="#15803d" />

      {/* 6.4 ANIMATED FLAMINGOS WITH MICRO-BOBBING */}
      <StylizedFlamingo position={[-0.8, 0.3, 0.7]} rotation={[0, 0.6, 0]} scale={0.78} phaseOffset={0} />
      <StylizedFlamingo position={[-0.4, 0.3, 1.1]} rotation={[0, 0.3, 0]} scale={0.72} phaseOffset={1.8} />
      <StylizedFlamingo position={[0.8, 0.3, -0.6]} rotation={[0, -1.0, 0]} scale={0.75} phaseOffset={3.2} />
      <StylizedFlamingo position={[0.2, 0.3, 1.3]} rotation={[0, -0.4, 0]} scale={0.65} phaseOffset={4.5} />

      {/* 6.5 COLORFUL TROPICAL FLOWER SHRUBS */}
      {[-1.2, 1.1, -1.6, 0.7, -0.3, 1.8].map((fx, idx) => (
        <mesh key={idx} position={[fx, 0.32, (idx % 2 === 0 ? 1.5 : -1.4)]} scale={0.07}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={idx % 2 === 0 ? "#ec4899" : "#fbbf24"} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};
