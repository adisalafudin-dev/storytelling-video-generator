import React, { Component, ErrorInfo, ReactNode } from "react";
import * as THREE from "three";
import { Outlines } from "@react-three/drei";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// =========================================================================
// 1. ERROR BOUNDARY UNTUK KOMPONEN 3D (ZERO-CRASH GUARANTEE)
// =========================================================================
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ThreeErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(
      "3D Engine Component Error caught by boundary:",
      error,
      errorInfo,
    );
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <group position={[0, 0.05, 0]}>
            <mesh>
              <cylinderGeometry args={[0.85, 0.85, 2.0, 16]} />
              <meshStandardMaterial color="#334155" roughness={0.8} />
              <Outlines thickness={0.03} color="#0f172a" />
            </mesh>
          </group>
        )
      );
    }
    return this.props.children;
  }
}

// =========================================================================
// 2. STUDIO LIGHTING RIG (PENCAHAYAAN OPTIMAL DARI ATAS KE BAWAH)
// =========================================================================
export const EngineLightingRig: React.FC = () => {
  return (
    <>
      <hemisphereLight args={["#f8fafc", "#1e293b", 2.6]} />
      {/* Key light dari depan-kanan-atas */}
      <directionalLight position={[3.5, 6.5, 4.5]} intensity={3.2} color="#ffffff" />
      {/* Fill light dari kiri-depan */}
      <directionalLight position={[-4.0, 2.0, 4.0]} intensity={2.4} color="#94a3b8" />
      {/* Bottom uplight — menerangi crankshaft & connecting rod dari bawah */}
      <directionalLight position={[0, -5.0, 3.5]} intensity={3.2} color="#e2e8f0" />
      {/* Point light di ruang karter (crankcase) agar connecting rod & kruk as berkilau */}
      <pointLight position={[0, -0.95, 1.4]} intensity={3.2} distance={5.0} color="#f8fafc" />
      {/* Sorot tajam di area kubah ruang bakar & busi */}
      <pointLight position={[0, 1.4, 1.2]} intensity={2.6} distance={3.8} color="#bae6fd" />
      {/* Rim light belakang untuk garis tepi tajam */}
      <directionalLight position={[0, -1.5, -4.0]} intensity={2.0} color="#38bdf8" />
    </>
  );
};

// =========================================================================
// 3. KINEMATIKA SLIDER-CRANK TERVERIFIKASI & TERSINKRONISASI 100%
// =========================================================================
export const CRANK_CENTER_Y = -0.95;
export const CRANK_RADIUS = 0.38;
export const ROD_LENGTH = 1.35;
export const WRIST_PIN_OFFSET = 0.18;

export function calculateEngineKinematics(
  crankAngle: number,
  crankRadius = CRANK_RADIUS,
  rodLength = ROD_LENGTH,
  crankCenterY = CRANK_CENTER_Y,
  wristPinOffset = WRIST_PIN_OFFSET
) {
  // Posisi crankpin di world coordinates
  const X_cp = -Math.sin(crankAngle) * crankRadius;
  const Y_cp = crankCenterY + Math.cos(crankAngle) * crankRadius;

  // Jarak vertikal rod
  const rodYDiff = Math.sqrt(Math.max(0.01, rodLength * rodLength - X_cp * X_cp));

  // Posisi pen piston (wrist pin)
  const Y_wrist = Y_cp + rodYDiff;

  // Posisi kepala piston
  const Y_piston = Y_wrist + wristPinOffset;

  // Sudut kemiringan batang piston terhadap sumbu Y
  const rodTilt = Math.atan2(X_cp, rodYDiff);

  return { X_cp, Y_cp, Y_wrist, Y_piston, rodTilt };
}

// =========================================================================
// 4. ANATOMI MEKANIS: BUSI & KATUP
// =========================================================================

// === Spark Plug (Busi Mesin Otomotif) ===
export const SparkPlug: React.FC<{
  position?: [number, number, number];
  isFiring?: boolean;
  fireColor?: string;
  fireIntensity?: number;
}> = ({
  position = [0, 1.38, 0],
  isFiring = false,
  fireColor = "#38bdf8",
  fireIntensity = 12.0,
}) => {
  const frame = useCurrentFrame();
  const sparkFlicker = isFiring ? (Math.sin(frame * 4.0) > -0.2 ? 1.0 : 0.5) : 0;

  return (
    <group position={position}>
      {/* Terminal nut kuningan di puncak */}
      <mesh position={[0, 0.60, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.12, 12]} />
        <meshStandardMaterial color="#fcd34d" metalness={0.88} roughness={0.18} />
        <Outlines thickness={0.014} color="#0f172a" />
      </mesh>

      {/* Insulator keramik putih bersih */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.10, 0.12, 0.34, 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
        <Outlines thickness={0.018} color="#0f172a" />
      </mesh>
      {/* 3 ring insulator keramik */}
      {[-0.06, 0, 0.06].map((y, i) => (
        <mesh key={i} position={[0, 0.38 + y, 0]}>
          <torusGeometry args={[0.115, 0.014, 6, 20]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.2} />
        </mesh>
      ))}

      {/* Hex nut baja bodi busi */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.15, 6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.88} roughness={0.2} />
        <Outlines thickness={0.018} color="#0f172a" />
      </mesh>

      {/* Ulir silinder busi */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.118, 0.118, 0.14, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.75} roughness={0.35} />
      </mesh>

      {/* Jarum elektroda tengah (Iridium) */}
      <mesh position={[0, -0.13, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 0.12, 10]} />
        <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.12} />
      </mesh>
      {/* Elektroda massa ground L-shape */}
      <group position={[0.048, -0.19, 0]}>
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.02, 0.065, 0.022]} />
          <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.12} />
        </mesh>
        <mesh position={[-0.022, 0, 0]}>
          <boxGeometry args={[0.044, 0.02, 0.022]} />
          <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.12} />
        </mesh>
      </group>

      {/* Idle glow halus saat standby */}
      <mesh position={[0, -0.19, 0]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} depthWrite={false} />
      </mesh>

      {/* Percikan Api Listrik Busi Multi-Cabang Saat Firing */}
      {isFiring && (
        <group position={[0, -0.19, 0]}>
          <pointLight
            color={fireColor}
            intensity={sparkFlicker * fireIntensity}
            distance={5.0}
          />
          {/* Inti plasma putih menyilaukan */}
          <mesh>
            <sphereGeometry args={[0.10, 16, 16]} />
            <meshBasicMaterial color="#ffffff" depthWrite={false} />
          </mesh>
          {/* Aura kilau elektrik luar */}
          <mesh>
            <sphereGeometry args={[0.22, 14, 14]} />
            <meshBasicMaterial color={fireColor} transparent opacity={0.85} depthWrite={false} />
          </mesh>
          {/* 8 cabang kilat listrik tajam */}
          {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI / 6, (5 * Math.PI) / 6, Math.PI / 3, (2 * Math.PI) / 3].map(
            (rot, i) => (
              <mesh key={i} rotation={[0, 0, rot]}>
                <cylinderGeometry args={[0.014, 0.014, 0.44, 6]} />
                <meshBasicMaterial color="#ffffff" depthWrite={false} />
              </mesh>
            )
          )}
        </group>
      )}
    </group>
  );
};

// === Engine Valves (Katup Masuk & Buang) ===
export const EngineValves: React.FC<{
  intakeOpen?: boolean;
  exhaustOpen?: boolean;
}> = ({ intakeOpen = false, exhaustOpen = false }) => {
  const intakeY = intakeOpen ? -0.1 : 0;
  const exhaustY = exhaustOpen ? -0.1 : 0;

  return (
    <group position={[0, 1.42, 0]}>
      {/* Katup Intake (kiri) */}
      <group position={[-0.38, 0, 0]} rotation={[0, 0, 0.18]}>
        <mesh position={[0, 0.24 + intakeY, 0]}>
          <cylinderGeometry args={[0.034, 0.034, 0.44, 10]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.85} roughness={0.15} />
        </mesh>
        <mesh position={[0, intakeY, 0]}>
          <cylinderGeometry args={[0.2, 0.05, 0.07, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.75} roughness={0.25} />
          <Outlines thickness={0.016} color="#0f172a" />
        </mesh>
      </group>

      {/* Katup Exhaust (kanan) */}
      <group position={[0.38, 0, 0]} rotation={[0, 0, -0.18]}>
        <mesh position={[0, 0.24 + exhaustY, 0]}>
          <cylinderGeometry args={[0.034, 0.034, 0.44, 10]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.85} roughness={0.15} />
        </mesh>
        <mesh position={[0, exhaustY, 0]}>
          <cylinderGeometry args={[0.18, 0.05, 0.07, 16]} />
          <meshStandardMaterial color="#d97706" metalness={0.7} roughness={0.3} />
          <Outlines thickness={0.016} color="#0f172a" />
        </mesh>
      </group>
    </group>
  );
};

// =========================================================================
// 5. PISTON HEAD (DETAIL REALISTIS SESUAI FOTO ASLI YANG DIUNGGAH PENGGUNA)
// Mahkota Chamfer, 3 Sabuk Ring Terpisah, Rok Samping Lengkung,
// Dudukan Boss & Lubang Pen Piston Lingkaran dengan Pen Baja Mengkilap
// =========================================================================
export const PistonHead: React.FC<{ yPosition: number }> = ({ yPosition }) => {
  return (
    <group position={[0, yPosition, 0]}>
      {/* 1. Mahkota Piston (Piston Crown) — Machined Aluminum dengan Bevel Chamfer Atas */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.718, 0.725, 0.05, 32]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.82} roughness={0.15} />
        <Outlines thickness={0.018} color="#0f172a" />
      </mesh>

      {/* Cekungan Kubah (Crown Dish) & Relief Klep di Atas Mahkota Piston */}
      <mesh position={[0, 0.146, 0]}>
        <cylinderGeometry args={[0.46, 0.42, 0.02, 24]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.65} roughness={0.24} />
      </mesh>

      {/* 2. Sabuk Alur Ring Piston (Ring Lands & 3 Cincin Presisi Sesuai Foto) */}
      {/* Land 1 (Atas) */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.725, 0.725, 0.035, 32]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.82} roughness={0.18} />
      </mesh>

      {/* Ring 1 (Top Compression Ring — Baja Gunmetal Hitam) */}
      <mesh position={[0, 0.055, 0]}>
        <cylinderGeometry args={[0.67, 0.67, 0.024, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.055, 0]}>
        <torusGeometry args={[0.728, 0.014, 6, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.1} />
        <Outlines thickness={0.012} color="#0f172a" />
      </mesh>

      {/* Land 2 (Tengah) */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.725, 0.725, 0.032, 32]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.82} roughness={0.18} />
      </mesh>

      {/* Ring 2 (Second Scraper Ring — Baja Gelap Bergaris) */}
      <mesh position={[0, 0.005, 0]}>
        <cylinderGeometry args={[0.67, 0.67, 0.024, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.005, 0]}>
        <torusGeometry args={[0.728, 0.014, 6, 32]} />
        <meshStandardMaterial color="#334155" metalness={0.90} roughness={0.15} />
        <Outlines thickness={0.012} color="#0f172a" />
      </mesh>

      {/* Land 3 (Bawah) */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.725, 0.725, 0.032, 32]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.82} roughness={0.18} />
      </mesh>

      {/* Ring 3 (Oil Control Ring Assembly — Dual Chrome Rails + Per Spacer Sesuai Foto) */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.038, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      {/* Rel Oli Atas */}
      <mesh position={[0, -0.038, 0]}>
        <torusGeometry args={[0.727, 0.007, 6, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.96} roughness={0.08} />
      </mesh>
      {/* Rel Oli Bawah */}
      <mesh position={[0, -0.062, 0]}>
        <torusGeometry args={[0.727, 0.007, 6, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.96} roughness={0.08} />
      </mesh>

      {/* Land 4 Penutup Sabuk Ring */}
      <mesh position={[0, -0.076, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.02, 32]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 3. Piston Skirt (Rok Samping Kiri & Kanan Saja — DEPAN & BELAKANG TERBUKA LENGKAP) */}
      {/* Skirt Dinding Kiri (Berpusat di -X / theta = 270 deg = 1.5 PI) */}
      <mesh position={[0, -0.20, 0]}>
        <cylinderGeometry
          args={[0.718, 0.718, 0.24, 20, 1, true, Math.PI * 1.25, Math.PI * 0.50]}
        />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.65}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
        <Outlines thickness={0.016} color="#0f172a" />
      </mesh>
      {/* Skirt Dinding Kanan (Berpusat di +X / theta = 90 deg = 0.5 PI) */}
      <mesh position={[0, -0.20, 0]}>
        <cylinderGeometry
          args={[0.718, 0.718, 0.24, 20, 1, true, Math.PI * 0.25, Math.PI * 0.50]}
        />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.65}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
        <Outlines thickness={0.016} color="#0f172a" />
      </mesh>

      {/* 4. Dudukan Pen Piston (Pin Boss) Kiri & Kanan */}
      <mesh position={[-0.28, -WRIST_PIN_OFFSET, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.20, 20]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.78} roughness={0.20} />
        <Outlines thickness={0.014} color="#0f172a" />
      </mesh>
      <mesh position={[0.28, -WRIST_PIN_OFFSET, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.20, 20]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.78} roughness={0.20} />
        <Outlines thickness={0.014} color="#0f172a" />
      </mesh>

      {/* 5. Lubang Dudukan Pen Piston Lingkaran (Pin Bore Hole Sesuai Foto Asli) */}
      <mesh position={[0, -WRIST_PIN_OFFSET, 0.20]}>
        <torusGeometry args={[0.11, 0.022, 8, 24]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.88} roughness={0.18} />
        <Outlines thickness={0.012} color="#0f172a" />
      </mesh>

      {/* 6. Pen Piston Baja Mengkilap (Wrist Pin / Gudgeon Pin) */}
      <mesh position={[0, -WRIST_PIN_OFFSET, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.48, 24]} />
        <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} />
        <Outlines thickness={0.014} color="#0f172a" />
      </mesh>
    </group>
  );
};

// =========================================================================
// 6. CONNECTING ROD (STANG SEHER I-BEAM ASLI SESUAI FOTO)
// Ujung Atas Ber-Bushing Kuningan Mengitari Pen Piston,
// Batang I-Beam Berotot dengan Flensa Krom Terang & Badan Tengah Recessed,
// Ujung Bawah Berongga Mengitari Crankpin Lengkap dengan 2 Baut Klem Emas
// =========================================================================
export const ConnectingRod: React.FC<{
  wristY: number;
  rodTilt: number;
  rodLength?: number;
}> = ({ wristY, rodTilt, rodLength = ROD_LENGTH }) => {
  return (
    // Titik tumpu atas adalah pen piston (wrist pin) pada [0, wristY, 0]
    <group position={[0, wristY, 0]} rotation={[0, 0, rodTilt]}>
      {/* 1. Mata Atas (Small End Eye) Mengitari Pen Piston */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.18, 24]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.88} roughness={0.16} />
        <Outlines thickness={0.016} color="#0f172a" />
      </mesh>
      {/* Bushing Perunggu/Kuningan Mata Atas */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.088, 0.088, 0.182, 20]} />
        <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* 2. Batang I-Beam Berotot (I-Beam Shank Sesuai Foto Referensi Asli) */}
      {/* Badan Tengah I-Beam (Recessed Web — Abu-Abu Logam Satin) */}
      <mesh position={[0, -rodLength * 0.48, 0]}>
        <boxGeometry args={[0.16, rodLength - 0.36, 0.045]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Flensa Sisi Kiri I-Beam (Thick Polished Outer Flange Sesuai Foto) */}
      <mesh position={[-0.095, -rodLength * 0.48, 0]}>
        <boxGeometry args={[0.045, rodLength - 0.32, 0.14]} />
        <meshStandardMaterial color="#ffffff" metalness={0.96} roughness={0.08} />
        <Outlines thickness={0.015} color="#0f172a" />
      </mesh>

      {/* Flensa Sisi Kanan I-Beam (Thick Polished Outer Flange Sesuai Foto) */}
      <mesh position={[0.095, -rodLength * 0.48, 0]}>
        <boxGeometry args={[0.045, rodLength - 0.32, 0.14]} />
        <meshStandardMaterial color="#ffffff" metalness={0.96} roughness={0.08} />
        <Outlines thickness={0.015} color="#0f172a" />
      </mesh>

      {/* Transisi Flare Bahu Bawah dari Shank ke Big End */}
      <mesh position={[0, -rodLength + 0.22, 0]}>
        <cylinderGeometry args={[0.22, 0.30, 0.12, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.88} roughness={0.16} />
      </mesh>

      {/* 3. Mata Bawah Berongga (Hollow Big End Eye Ring Sesuai Foto) */}
      {/* Dinding Luar Rumah Metal Duduk */}
      <mesh position={[0, -rodLength, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.20, 28]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.88} roughness={0.16} />
        <Outlines thickness={0.018} color="#0f172a" />
      </mesh>
      {/* Rongga Metal Duduk (Bearing Shell Dalam Berkilau) */}
      <mesh position={[0, -rodLength, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.134, 0.134, 0.204, 24]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.08} />
      </mesh>

      {/* Garis Pisah Tutup Stang Seher (Parting Line Rod Cap) */}
      <mesh position={[0, -rodLength, 0.102]}>
        <boxGeometry args={[0.52, 0.012, 0.005]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>

      {/* 4. Dua Baut Klem Stang Seher Emas (Heavy Duty Rod Bolts Sesuai Foto) */}
      {/* Bahu Baut Kiri */}
      <mesh position={[-0.20, -rodLength, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 0.22, 12]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.15} />
        <Outlines thickness={0.014} color="#0f172a" />
      </mesh>
      {/* Bahu Baut Kanan */}
      <mesh position={[0.20, -rodLength, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 0.22, 12]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.15} />
        <Outlines thickness={0.014} color="#0f172a" />
      </mesh>
    </group>
  );
};

// =========================================================================
// 7. CRANKSHAFT ASSEMBLY (POROS ENGKOL PRESISI & KONSENTRIS)
// Crankpin Mengisi Rongga Big End 100%, Counterweight Belakang Berlubang Balans,
// Front Cheek Menahan Pin Tanpa Menghalangi Pandangan Batang Piston
// =========================================================================
export const CrankshaftAssembly: React.FC<{
  crankAngle: number;
  crankRadius?: number;
  crankCenterY?: number;
}> = ({
  crankAngle,
  crankRadius = CRANK_RADIUS,
  crankCenterY = CRANK_CENTER_Y,
}) => {
  return (
    <group position={[0, crankCenterY, 0]} rotation={[0, 0, crankAngle]}>
      {/* 1. Poros Utama Tengah (Main Journal Shaft) — Memanjang di Sumbu Z */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.72, 24]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.16} />
        <Outlines thickness={0.016} color="#0f172a" />
      </mesh>

      {/* 2. Bandul Penyeimbang Utama di Sisi Belakang (z = -0.16) */}
      <group position={[0, 0, -0.16]}>
        {/* Hub poros tengah */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.10, 24]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.25} />
          <Outlines thickness={0.016} color="#0f172a" />
        </mesh>

        {/* Lengan penghubung ke arah crankpin */}
        <mesh position={[0, crankRadius * 0.5, 0]}>
          <boxGeometry args={[0.26, crankRadius * 1.05, 0.10]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.25} />
          <Outlines thickness={0.016} color="#0f172a" />
        </mesh>

        {/* Bandul Penyeimbang (Counterweight Lobe) Menghadap ke Arah Sebaliknya */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry
            args={[0.52, 0.52, 0.10, 28, 1, false, Math.PI * 1.5, Math.PI]}
          />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.25} />
          <Outlines thickness={0.018} color="#0f172a" />
        </mesh>

        {/* Tepian Bevel Terang Bandul */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry
            args={[0.525, 0.525, 0.02, 28, 1, false, Math.PI * 1.5, Math.PI]}
          />
          <meshStandardMaterial color="#cbd5e1" metalness={0.88} roughness={0.18} />
        </mesh>

        {/* Lubang Balans Presisi Mesin (Balancing Drill Holes) */}
        {[-0.26, 0.26].map((x, j) => (
          <mesh key={j} position={[x, -0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.11, 14]} />
            <meshStandardMaterial color="#1e293b" metalness={0.92} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* 3. Crankpin Baja Krom Terang (Tempat Mata Bawah Stang Seher Berputar Pas Konsentris) */}
      <mesh position={[0, crankRadius, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.128, 0.128, 0.26, 24]} />
        <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} />
        <Outlines thickness={0.014} color="#0f172a" />
      </mesh>

      {/* 4. Cheek Penyangga Depan Kompak (z = +0.16) — Menahan Crankpin Tanpa Menutupi Stang Seher */}
      <group position={[0, 0, 0.16]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.05, 20]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.25} />
          <Outlines thickness={0.014} color="#0f172a" />
        </mesh>
        <mesh position={[0, crankRadius * 0.5, 0]}>
          <boxGeometry args={[0.22, crankRadius * 1.02, 0.05]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.25} />
          <Outlines thickness={0.014} color="#0f172a" />
        </mesh>
      </group>
    </group>
  );
};

// =========================================================================
// 8. CUTAWAY ENGINE BLOCK (BLOK SILINDER & KARTER — TERBUKA DEPAN)
// =========================================================================
export const CutawayEngineBlock: React.FC<{
  chamberColor?: string;
  chamberOpacity?: number;
}> = ({ chamberColor = "#38bdf8", chamberOpacity = 0.16 }) => {
  return (
    <group>
      {/* 1. Dinding Silinder Belakang & Samping (Bore Cutaway ~200 Derajat Terbuka Depan) */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry
          args={[0.76, 0.76, 2.1, 32, 1, true, Math.PI * 0.38, Math.PI * 1.24]}
        />
        <meshStandardMaterial
          color="#334155"
          metalness={0.65}
          roughness={0.28}
          side={THREE.DoubleSide}
        />
        <Outlines thickness={0.02} color="#0f172a" />
      </mesh>

      {/* Tepian Potongan Bersih Kiri & Kanan */}
      {[-0.66, 0.66].map((x, i) => (
        <mesh key={i} position={[x, 0.25, 0.38]}>
          <boxGeometry args={[0.05, 2.08, 0.05]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.88} roughness={0.16} />
          <Outlines thickness={0.012} color="#0f172a" />
        </mesh>
      ))}

      {/* 2. Dinding Luar Blok Mesin (Body Belakang) */}
      <mesh position={[0, 0.25, -0.42]}>
        <boxGeometry args={[1.9, 2.1, 1.0]} />
        <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.65} />
        <Outlines thickness={0.022} color="#0f172a" />
      </mesh>

      {/* 3. Sirip Pendingin (5 Baris Cooling Fins) */}
      {[-0.45, -0.10, 0.25, 0.60, 0.95].map((y, i) => (
        <mesh key={i} position={[0, y, -0.06]}>
          <cylinderGeometry
            args={[1.06, 1.06, 0.055, 22, 1, false, Math.PI * 0.4, Math.PI * 1.2]}
          />
          <meshStandardMaterial
            color="#475569"
            metalness={0.55}
            roughness={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* 4. Cylinder Head Atas & Valve Cover */}
      <mesh position={[0, 1.44, -0.06]}>
        <boxGeometry args={[1.9, 0.48, 1.2]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.35} />
        <Outlines thickness={0.02} color="#0f172a" />
      </mesh>
      <mesh position={[0, 1.72, -0.06]}>
        <boxGeometry args={[1.7, 0.1, 1.0]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.25} />
        <Outlines thickness={0.016} color="#0f172a" />
      </mesh>

      {/* Saluran Intake & Exhaust Runner */}
      <mesh position={[-0.48, 1.5, -0.03]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.14, 0.14, 0.52, 12]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
        <Outlines thickness={0.016} color="#0f172a" />
      </mesh>
      <mesh position={[0.48, 1.5, -0.03]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.14, 0.14, 0.52, 12]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
        <Outlines thickness={0.016} color="#0f172a" />
      </mesh>

      {/* 5. Bak Karter Engkol Bawah (Crankcase Casing Cradle) — Sumbu Z */}
      <mesh position={[0, CRANK_CENTER_Y, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[0.96, 0.96, 0.72, 24, 1, true, Math.PI * 1.5, Math.PI]}
        />
        <meshStandardMaterial
          color="#334155"
          metalness={0.65}
          roughness={0.35}
          side={THREE.DoubleSide}
        />
        <Outlines thickness={0.018} color="#0f172a" />
      </mesh>
      {/* Flensa Bak Oli Bawah (Oil Pan Base) */}
      <mesh position={[0, CRANK_CENTER_Y - 0.48, -0.1]}>
        <boxGeometry args={[1.7, 0.08, 0.90]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.6} />
        <Outlines thickness={0.016} color="#0f172a" />
      </mesh>

      {/* 6. Gas Campuran Ruang Bakar (Glow Transparan Open-Ended — Zero Depth Conflict) */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.73, 0.73, 0.65, 22, 1, true]} />
        <meshStandardMaterial
          color={chamberColor}
          transparent
          opacity={chamberOpacity}
          roughness={0.1}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// =========================================================================
// SCENE 1: ENGINE CUTAWAY INTRO (HOOK & PENAMPANG MESIN LENGKAP)
// =========================================================================
export const EngineCutawayIntro: React.FC<{ rotationSpeed?: number }> = () => {
  const frame = useCurrentFrame();

  const crankAngle = frame * 0.085;
  const { Y_wrist, Y_piston, rodTilt } = calculateEngineKinematics(crankAngle);
  const rotY = 0.08 + Math.sin(frame * 0.025) * 0.10;
  const isIntakeStroke = (crankAngle % (Math.PI * 2)) < Math.PI;

  return (
    <ThreeErrorBoundary>
      <EngineLightingRig />
      <group position={[0, 0.05, 0]} rotation={[0.05, rotY, 0]}>
        <CutawayEngineBlock chamberColor="#38bdf8" chamberOpacity={0.18} />
        <PistonHead yPosition={Y_piston} />
        <ConnectingRod wristY={Y_wrist} rodTilt={rodTilt} />
        <CrankshaftAssembly crankAngle={crankAngle} />
        <EngineValves intakeOpen={isIntakeStroke} exhaustOpen={false} />
        <SparkPlug position={[0, 1.38, 0]} isFiring={false} />

        {/* Kabut partikel bahan bakar halus */}
        {[...Array(16)].map((_, i) => {
          const posX = ((i % 4) - 1.5) * 0.22;
          const posY = 0.6 + ((i % 4) - 1.5) * 0.18;
          const posZ = ((i % 3) - 1) * 0.18;
          return (
            <mesh key={i} position={[posX, posY, posZ]}>
              <sphereGeometry args={[0.028, 8, 8]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} depthWrite={false} />
            </mesh>
          );
        })}
      </group>
    </ThreeErrorBoundary>
  );
};

// =========================================================================
// SCENE 2: COMPRESSION STROKE (LANGKAH KOMPRESI PISTON NAIK KE PUNCAK)
// =========================================================================
export const CompressionStroke: React.FC<{ rotationSpeed?: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gerakan kompresi kontinu siklik: Piston bergerak naik dari BDC ke TDC
  const cyclePeriod = Math.round(fps * 2.8);
  const cycleFrame = frame % cyclePeriod;
  const progress = interpolate(cycleFrame, [0, cyclePeriod * 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dari BDC (Math.PI) ke TDC (Math.PI * 2)
  const crankAngle = Math.PI + progress * Math.PI;
  const { Y_wrist, Y_piston, rodTilt } = calculateEngineKinematics(crankAngle);

  // Transisi warna ruang bakar dari biru dingin ke amber bertekanan tinggi
  const chamberColor = progress > 0.65 ? "#f59e0b" : "#38bdf8";
  const chamberOpacity = 0.12 + progress * 0.35;
  const particleY = 1.05 + (1 - progress) * 0.30;

  return (
    <ThreeErrorBoundary>
      <EngineLightingRig />
      <group position={[0, 0.05, 0]} rotation={[0.05, 0.06, 0]}>
        <CutawayEngineBlock
          chamberColor={chamberColor}
          chamberOpacity={chamberOpacity}
        />
        <PistonHead yPosition={Y_piston} />
        <ConnectingRod wristY={Y_wrist} rodTilt={rodTilt} />
        <CrankshaftAssembly crankAngle={crankAngle} />
        <EngineValves intakeOpen={false} exhaustOpen={false} />
        <SparkPlug position={[0, 1.38, 0]} isFiring={false} />

        {/* Partikel gas terkompresi makin rapat saat piston naik */}
        {progress > 0.20 &&
          [...Array(16)].map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const r = 0.28 * (1 - progress * 0.45);
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * r,
                  particleY,
                  Math.sin(angle) * r * 0.6,
                ]}
              >
                <sphereGeometry args={[0.024 + progress * 0.014, 8, 8]} />
                <meshBasicMaterial
                  color={chamberColor}
                  transparent
                  opacity={0.65 + progress * 0.35}
                  depthWrite={false}
                />
              </mesh>
            );
          })}

        {/* Glow tekanan tinggi di ruang bakar menjelang TDC */}
        {progress > 0.65 && (
          <pointLight
            position={[0, 1.20, 0.3]}
            color="#f59e0b"
            intensity={progress * 4.5}
            distance={3.5}
          />
        )}
      </group>
    </ThreeErrorBoundary>
  );
};

// =========================================================================
// SCENE 3: ENGINE KNOCKING (DETONASI PREMATUR BERGERIGI & PARTIKEL TAJAM)
// =========================================================================
export const EngineKnocking: React.FC<{ rotationSpeed?: number }> = () => {
  const frame = useCurrentFrame();

  // Getaran kasar / knocking vibration hebat (2 frekuensi tumpang tindih)
  const knockJitter =
    Math.sin(frame * 6.0) * 0.065 + Math.cos(frame * 9.5) * 0.035;

  // Piston terbentur sebelum TMA (crankAngle ~1.82 PI)
  const crankAngle = Math.PI * 1.82 + knockJitter;
  const { Y_wrist, Y_piston, rodTilt } = calculateEngineKinematics(crankAngle);

  // Gelombang kejut tajam berulang-ulang
  const shockP1 = (frame % 7) / 7;
  const shockP2 = ((frame + 3) % 7) / 7;
  const shockScale1 = interpolate(shockP1, [0, 1], [0.2, 4.8]);
  const shockScale2 = interpolate(shockP2, [0, 1], [0.2, 5.2]);

  // Strobing alarm / flash merah-oranye tajam
  const flashIntensity = 8.5 + Math.sin(frame * 6.5) * 6.0;

  // 4 Titik ledakan prematur (Pre-ignition Detonation Centers)
  const hotspots = [
    { pos: [-0.36, 1.15, 0.10], scale: shockScale1, p: shockP1, col: "#ff2200" },
    { pos: [0.34, 1.05, -0.05], scale: shockScale2, p: shockP2, col: "#ff7700" },
    { pos: [0.0, 1.26, 0.08], scale: shockScale1 * 0.9, p: shockP1, col: "#ffea00" },
    { pos: [0.36, 1.22, 0.12], scale: shockScale2 * 0.85, p: shockP2, col: "#ff3b30" },
  ];

  return (
    <ThreeErrorBoundary>
      <EngineLightingRig />
      <group
        position={[0, 0.05, 0]}
        rotation={[
          0.05 + knockJitter * 0.35,
          0.06 + Math.sin(frame * 0.15) * 0.04,
          knockJitter * 0.65,
        ]}
      >
        <CutawayEngineBlock chamberColor="#ef4444" chamberOpacity={0.24} />
        <PistonHead yPosition={Y_piston + knockJitter} />
        <ConnectingRod
          wristY={Y_wrist + knockJitter}
          rodTilt={rodTilt + knockJitter * 0.55}
        />
        <CrankshaftAssembly crankAngle={crankAngle} />
        <EngineValves intakeOpen={false} exhaustOpen={false} />
        {/* Busi MATI — bensin meledak sendiri sebelum busi menyala! */}
        <SparkPlug position={[0, 1.38, 0]} isFiring={false} />

        {/* Strobing Detonation Flash Light di Tengah Ruang Bakar */}
        <pointLight
          position={[0, 1.15, 0.35]}
          color="#ff1e00"
          intensity={flashIntensity}
          distance={5.0}
        />

        {/* Multi-Point Detonation Starbursts (Spike Needles & Sharp Shockwaves) */}
        {hotspots.map((hs, idx) => (
          <group key={idx} position={hs.pos as [number, number, number]}>
            {/* Cincin shockwave tajam melingkar */}
            <mesh scale={[hs.scale, hs.scale, 1]} rotation={[0, idx * 0.3, 0]}>
              <ringGeometry args={[0.04, 0.18, 28]} />
              <meshBasicMaterial
                color={hs.col}
                side={THREE.DoubleSide}
                transparent
                opacity={Math.max(0, 1 - hs.p)}
                depthWrite={false}
              />
            </mesh>

            {/* 8 Jarum-jarum ledakan tajam (Explosion Starburst Needles) — BUKAN BOLA BESAR! */}
            {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map(
              (angle, k) => (
                <mesh key={k} rotation={[0, 0, angle + frame * 0.25]}>
                  <cylinderGeometry args={[0.010, 0.002, 0.34, 4]} />
                  <meshBasicMaterial color={hs.col} depthWrite={false} />
                </mesh>
              )
            )}

            {/* Inti plasma kecil tajam */}
            <mesh>
              <sphereGeometry args={[0.048, 8, 8]} />
              <meshBasicMaterial color="#ffffff" depthWrite={false} />
            </mesh>
          </group>
        ))}

        {/* 50 Partikel Api Liar Mikro Beterbangan Bergejolak Kaotik */}
        {[...Array(50)].map((_, i) => {
          const particleP = ((frame * 3.4 + i * 3.7) % 20) / 20;
          const angle = (i / 50) * Math.PI * 2;
          const r = 0.10 + particleP * 0.62;
          const posX = Math.cos(angle) * r;
          const posZ = Math.sin(angle) * r * 0.7;
          const posY = 1.05 + Math.sin(frame * 0.5 + i) * 0.24;
          const size = Math.max(0.018, 0.055 * (1 - particleP));
          const pColor =
            i % 3 === 0 ? "#ff2200" : i % 3 === 1 ? "#ff7700" : "#ffea00";

          return (
            <mesh key={i} position={[posX, posY, posZ]}>
              <sphereGeometry args={[size, 6, 6]} />
              <meshBasicMaterial color={pColor} depthWrite={false} />
            </mesh>
          );
        })}
      </group>
    </ThreeErrorBoundary>
  );
};

// =========================================================================
// SCENE 4: CONTROLLED COMBUSTION (PEMBAKARAN TERATUR & DIRECTED FLAME JET)
// =========================================================================
export const ControlledCombustion: React.FC<{
  rotationSpeed?: number;
}> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Siklus 4-langkah terkendali (2.4 detik per siklus):
  // 0 - 0.55s: Busi memercik tepat di puncak TMA
  // 0.32s - 2.4s: Langkah tenaga mulus mendorong piston turun
  const cyclePeriod = Math.round(fps * 2.4);
  const cycleFrame = frame % cyclePeriod;
  const isPowerStroke = cycleFrame > Math.round(fps * 0.32);

  const pushProgress = interpolate(
    cycleFrame,
    [Math.round(fps * 0.32), cyclePeriod],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const crankAngle = isPowerStroke
    ? pushProgress * Math.PI
    : Math.PI + (cycleFrame / Math.round(fps * 0.32)) * Math.PI;

  const { Y_wrist, Y_piston, rodTilt } = calculateEngineKinematics(crankAngle);
  const isSparkFiring = cycleFrame <= Math.round(fps * 0.55);

  // Nyala api terarah (Directed Flame Funnel Wave) menyebar dari elektroda busi ke bawah
  const flameProg = isPowerStroke
    ? interpolate(pushProgress, [0, 0.65], [0.15, 1.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0.1;

  const flameHeight = 0.15 + flameProg * 0.40;
  const flameCenterY = 1.30 - flameHeight * 0.5;
  const waveOpacity = Math.max(0.2, 0.9 - pushProgress * 0.45);

  return (
    <ThreeErrorBoundary>
      <EngineLightingRig />
      <group position={[0, 0.05, 0]} rotation={[0.05, -0.06, 0]}>
        <CutawayEngineBlock
          chamberColor={isSparkFiring ? "#38bdf8" : "#f59e0b"}
          chamberOpacity={0.25}
        />
        <PistonHead yPosition={Y_piston} />
        <ConnectingRod wristY={Y_wrist} rodTilt={rodTilt} />
        <CrankshaftAssembly crankAngle={crankAngle} />
        <EngineValves
          intakeOpen={false}
          exhaustOpen={isPowerStroke && pushProgress > 0.8}
        />

        {/* Percikan Busi Terang di Puncak Ruang Bakar Saat Firing */}
        <SparkPlug
          position={[0, 1.38, 0]}
          isFiring={isSparkFiring}
          fireColor="#38bdf8"
          fireIntensity={14.0}
        />

        {/* Nyala Api Terarah dari Busi Mendorong Piston (Directed Flame Wave — BUKAN BOLA BESAR!) */}
        {isPowerStroke && (
          <group position={[0, flameCenterY, 0]}>
            <pointLight color="#f59e0b" intensity={8.5} distance={4.5} />

            {/* Corong Nyala Api Terarah (Inverted Directed Flame Funnel) */}
            <mesh rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.68 * flameProg, flameHeight, 28, 1, true]} />
              <meshBasicMaterial
                color="#fde047"
                transparent
                opacity={waveOpacity}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Lapisan Api Oranye Hangat (Radiant Outer Flame Cone) */}
            <mesh rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.72 * flameProg, flameHeight * 1.05, 24, 1, true]} />
              <meshBasicMaterial
                color="#ea580c"
                transparent
                opacity={waveOpacity * 0.70}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Cincin Jambul Garis Depan Api (Wave Crest Ring) yang Mendorong Mahkota Piston */}
            <mesh position={[0, -flameHeight * 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.68 * flameProg, 0.02, 8, 32]} />
              <meshBasicMaterial
                color="#fef08a"
                transparent
                opacity={waveOpacity}
                depthWrite={false}
              />
            </mesh>
          </group>
        )}

        {/* 40 Butiran Nyala Api Mikro Emas Mengalir Teratur Terarah ke Bawah */}
        {isPowerStroke &&
          [...Array(40)].map((_, i) => {
            const pProg = ((frame * 2.4 + i * 2.2) % 18) / 18;
            const angle = (i / 40) * Math.PI * 2;
            const r = 0.08 + (i % 6) * 0.10 * flameProg;
            const posX = Math.cos(angle) * r;
            const posZ = Math.sin(angle) * r * 0.7;
            const posY = 1.32 - pProg * 0.58;

            return (
              <mesh key={i} position={[posX, posY, posZ]}>
                <sphereGeometry args={[0.022, 6, 6]} />
                <meshBasicMaterial
                  color={i % 2 === 0 ? "#fde047" : "#ea580c"}
                  transparent
                  opacity={0.85 - pProg * 0.4}
                  depthWrite={false}
                />
              </mesh>
            );
          })}

        {/* Garis Aliran Efisiensi Sian/Emas Mengalir Halus di Dinding Silinder */}
        {[...Array(14)].map((_, i) => {
          const streamY = 1.15 - ((frame * 0.05 + i * 0.2) % 1.3);
          const angle = (i / 14) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.70, streamY, Math.sin(angle) * 0.70]}
            >
              <sphereGeometry args={[0.022, 6, 6]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} depthWrite={false} />
            </mesh>
          );
        })}
      </group>
    </ThreeErrorBoundary>
  );
};

// =========================================================================
// SCENE 5: ENGINE PULLOUT CLOSING (PULL-OUT KAMERA & HARMONI MEKANIS)
// =========================================================================
export const EnginePulloutClosing: React.FC<{
  rotationSpeed?: number;
}> = () => {
  const frame = useCurrentFrame();

  const crankAngle = frame * 0.12;
  const { Y_wrist, Y_piston, rodTilt } = calculateEngineKinematics(crankAngle);
  const rotY = 0.08 + Math.sin(frame * 0.03) * 0.05;

  const normalizedAngle = crankAngle % (Math.PI * 4);
  const intakeOpen = normalizedAngle < Math.PI;
  const exhaustOpen = normalizedAngle > Math.PI * 3;

  return (
    <ThreeErrorBoundary>
      <EngineLightingRig />
      <group position={[0, 0.05, 0]} rotation={[0.05, rotY, 0]}>
        <CutawayEngineBlock chamberColor="#38bdf8" chamberOpacity={0.2} />
        <PistonHead yPosition={Y_piston} />
        <ConnectingRod wristY={Y_wrist} rodTilt={rodTilt} />
        <CrankshaftAssembly crankAngle={crankAngle} />
        <EngineValves intakeOpen={intakeOpen} exhaustOpen={exhaustOpen} />
        <SparkPlug
          position={[0, 1.38, 0]}
          isFiring={Math.sin(frame * 0.28) > 0.25}
          fireColor="#38bdf8"
          fireIntensity={8.0}
        />

        {/* Partikel Efisiensi Biru/Emas Mengitari Mesin */}
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 2 + frame * 0.018;
          const radius = 1.25 + (i % 3) * 0.18;
          const posX = Math.cos(angle) * radius;
          const posZ = Math.sin(angle) * radius;
          const posY = -0.25 + (i % 5) * 0.35;
          return (
            <mesh key={i} position={[posX, posY, posZ]}>
              <sphereGeometry args={[0.028, 8, 8]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#38bdf8" : "#fef08a"} depthWrite={false} />
            </mesh>
          );
        })}
      </group>
    </ThreeErrorBoundary>
  );
};
