import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { IPhoneUmpVisuals, IPhoneUmpVisualType } from "./IPhoneUmpVisuals";
import {
  IPhoneCharacterStoryVisuals,
  IPhoneCharacterVisualType,
} from "./IPhoneCharacterStoryVisuals";
import {
  IPhoneWorldVisuals,
  IPhoneWorldVisualType,
} from "./IPhoneWorldVisuals";
import {
  IPhoneRealVisuals,
  IPhoneRealVisualType,
} from "./IPhoneRealVisuals";
import {
  IPhoneStoryV3Visuals,
  IPhoneStoryV3VisualType,
} from "./IPhoneStoryV3Visuals";
import {
  IPhoneStoryV4Visuals,
  IPhoneStoryV4VisualType,
} from "./IPhoneStoryV4Visuals";
import {
  IPhoneStoryV5Visuals,
  IPhoneStoryV5VisualType,
} from "./IPhoneStoryV5Visuals";
import {
  IPhoneStoryV6Visuals,
  IPhoneStoryV6VisualType,
} from "./IPhoneStoryV6Visuals";
import {
  IPhoneStoryV7Visuals,
  IPhoneStoryV7VisualType,
} from "./IPhoneStoryV7Visuals";

export type DiagramType =
  | "smartphone-surge"
  | "split-comparison"
  | "cash-flow"
  | "chip-network"
  | "timeline-trend"
  | IPhoneUmpVisualType
  | IPhoneCharacterVisualType
  | IPhoneWorldVisualType
  | IPhoneRealVisualType
  | IPhoneStoryV3VisualType
  | IPhoneStoryV4VisualType
  | IPhoneStoryV5VisualType
  | IPhoneStoryV6VisualType
  | IPhoneStoryV7VisualType;

export const Diagram2D: React.FC<{
  type: DiagramType;
  accentColor?: string;
}> = ({ type, accentColor = "#FFD600" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Specialized iPhone UMP (Editorial Bars)
  if (
    type === "iphone-hook-contrast" ||
    type === "ump-days-comparison" ||
    type === "cost-of-living-deduction" ||
    type === "real-savings-timeline" ||
    type === "ump-closing-summary"
  ) {
    return <IPhoneUmpVisuals type={type} />;
  }

  // Specialized Character-Driven Storytelling (Pak Budi vs Pak Anu)
  if (
    type === "character-hook-showcase" ||
    type === "character-bridge-question" ||
    type === "character-income-contrast" ||
    type === "character-living-expenses" ||
    type === "character-savings-timeline"
  ) {
    return <IPhoneCharacterStoryVisuals type={type} />;
  }

  // Specialized Full-Bleed World Storytelling (Tanpa Grid & Watermark)
  if (
    type === "world-hook-showcase" ||
    type === "world-bridge-question" ||
    type === "world-income-contrast" ||
    type === "world-living-expenses" ||
    type === "world-savings-timeline"
  ) {
    return <IPhoneWorldVisuals type={type} />;
  }

  // Specialized Real Character Storytelling (Pak Budi vs Pak Hendra)
  if (
    type === "real-hook-showcase" ||
    type === "real-bridge-question" ||
    type === "real-income-contrast" ||
    type === "real-living-expenses" ||
    type === "real-timeline-calculation"
  ) {
    return <IPhoneRealVisuals type={type} />;
  }

  // Specialized Gaya #3: Hand-Drawn Personal Storytelling (V3)
  if (
    type === "storyv3-hook-showcase" ||
    type === "storyv3-bridge-question" ||
    type === "storyv3-income-contrast" ||
    type === "storyv3-living-expenses" ||
    type === "storyv3-savings-timeline"
  ) {
    return <IPhoneStoryV3Visuals type={type} />;
  }

  // Specialized Gaya #3: Hand-Drawn Personal Storytelling (V4)
  if (
    type === "storyv4-hook-showcase" ||
    type === "storyv4-bridge-question" ||
    type === "storyv4-income-contrast" ||
    type === "storyv4-living-expenses" ||
    type === "storyv4-savings-timeline"
  ) {
    return <IPhoneStoryV4Visuals type={type} />;
  }

  // Specialized Gaya #3: Hand-Drawn Personal Storytelling (V5)
  if (
    type === "storyv5-hook-showcase" ||
    type === "storyv5-bridge-question" ||
    type === "storyv5-income-contrast" ||
    type === "storyv5-living-expenses" ||
    type === "storyv5-savings-timeline"
  ) {
    return <IPhoneStoryV5Visuals type={type} />;
  }

  // Specialized Gaya #3: Hand-Drawn Personal Storytelling (V6)
  if (
    type === "storyv6-hook-showcase" ||
    type === "storyv6-bridge-question" ||
    type === "storyv6-income-contrast" ||
    type === "storyv6-living-expenses" ||
    type === "storyv6-savings-timeline"
  ) {
    return <IPhoneStoryV6Visuals type={type} />;
  }

  // Specialized Gaya #3: Hand-Drawn Personal Storytelling (V7)
  if (
    type === "storyv7-hook-showcase" ||
    type === "storyv7-bridge-question" ||
    type === "storyv7-income-contrast" ||
    type === "storyv7-living-expenses" ||
    type === "storyv7-savings-timeline"
  ) {
    return <IPhoneStoryV7Visuals type={type} />;
  }

  const anim = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.9, stiffness: 90 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "42%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 680,
        height: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {type === "smartphone-surge" && <SmartphoneSurgeDiagram anim={anim} frame={frame} accentColor={accentColor} />}
      {type === "split-comparison" && <SplitComparisonDiagram anim={anim} frame={frame} />}
      {type === "cash-flow" && <CashFlowDiagram anim={anim} frame={frame} />}
      {type === "chip-network" && <ChipNetworkDiagram anim={anim} frame={frame} />}
      {type === "timeline-trend" && <TimelineTrendDiagram anim={anim} />}
    </div>
  );
};

// =========================================================================
// 1. SMARTPHONE DENGAN GRAFIK LONJAKAN HARGA KUNING (PERSIS FEED INSTAGRAM)
// =========================================================================
const SmartphoneSurgeDiagram: React.FC<{ anim: number; frame: number; accentColor?: string }> = ({
  anim,
  frame,
  accentColor = "#FFD600",
}) => {
  // Animasi garis kurva grafik naik
  const lineProgress = Math.min(1, anim * 1.2);
  const pulse = 1 + Math.sin(frame * 0.15) * 0.04;

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        height: 520,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${anim})`,
      }}
    >
      {/* Outer Phone Bezel */}
      <div
        style={{
          width: 300,
          height: 500,
          borderRadius: 42,
          backgroundColor: "#0F172A",
          border: "4px solid #334155",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(14, 165, 233, 0.2)",
          position: "relative",
          overflow: "hidden",
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Phone Notch */}
        <div
          style={{
            width: 90,
            height: 18,
            backgroundColor: "#1E293B",
            borderRadius: 10,
            alignSelf: "center",
            marginBottom: 12,
          }}
        />

        {/* Screen Content: Grid Lines */}
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            backgroundColor: "#080E18",
            border: "1.5px solid rgba(56, 189, 248, 0.15)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Subtle Grid inside screen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* SVG Lonjakan Grafik Garis Kuning Naik Tajam */}
          <svg
            viewBox="0 0 240 320"
            style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
          >
            <defs>
              <linearGradient id="yellowGlow" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#FFD600" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#FFD600" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Area Fill Glow */}
            <path
              d={`M 20 280 Q 80 260 130 180 T 220 50 L 220 280 Z`}
              fill="url(#yellowGlow)"
              opacity={lineProgress}
            />

            {/* Main Thick Growth Line */}
            <path
              d="M 20 280 Q 80 260 130 180 T 220 50"
              fill="none"
              stroke={accentColor}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset={400 * (1 - lineProgress)}
            />

            {/* Tip Glowing Dot */}
            {lineProgress > 0.8 && (
              <circle cx="220" cy="50" r="9" fill={accentColor} filter={`drop-shadow(0 0 8px ${accentColor})`} />
            )}
          </svg>
        </div>
      </div>

      {/* Floating Badge Tag: "HARGA MAHAL ▲" (Persis Desain Feed) */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: -25,
          backgroundColor: "#FFD600",
          color: "#000000",
          padding: "10px 18px",
          borderRadius: 8,
          fontWeight: 900,
          fontSize: 20,
          letterSpacing: "0.5px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
          transform: `scale(${pulse}) rotate(4deg)`,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>HARGA MAHAL</span>
        <span style={{ fontSize: 16 }}>▲</span>
      </div>
    </div>
  );
};

// =========================================================================
// 2. SPLIT COMPARISON: ALOKASI CHIP SERVER AI (80%) VS HP (20%)
// =========================================================================
const SplitComparisonDiagram: React.FC<{ anim: number; frame: number }> = ({ anim }) => {
  const barAI = Math.min(80, anim * 80);
  const barPhone = Math.min(20, anim * 20);

  return (
    <div
      style={{
        width: 580,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transform: `scale(${anim})`,
      }}
    >
      {/* Pillar 1: Server AI (Prioritas Utama) */}
      <div
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          border: "2px solid #FFD600",
          borderRadius: 18,
          padding: "20px 24px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32 }}>🤖</span>
            <div>
              <div style={{ color: "#F8FAFC", fontSize: 22, fontWeight: 900 }}>
                SERVER AI & CHATBOT
              </div>
              <div style={{ color: "#94A3B8", fontSize: 15, fontWeight: 600 }}>
                OpenAI, Google, Microsoft
              </div>
            </div>
          </div>
          <div style={{ color: "#FFD600", fontSize: 36, fontWeight: 900 }}>
            {Math.round(barAI)}%
          </div>
        </div>

        {/* Bar Progress AI */}
        <div
          style={{
            height: 14,
            backgroundColor: "#1E293B",
            borderRadius: 8,
            marginTop: 14,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${barAI}%`,
              height: "100%",
              backgroundColor: "#FFD600",
              borderRadius: 8,
              boxShadow: "0 0 12px #FFD600",
            }}
          />
        </div>
      </div>

      {/* Pillar 2: Smartphone Konsumen (Terpinggirkan) */}
      <div
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          border: "1.5px solid rgba(148, 163, 184, 0.2)",
          borderRadius: 18,
          padding: "20px 24px",
          opacity: 0.85,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32 }}>📱</span>
            <div>
              <div style={{ color: "#F8FAFC", fontSize: 22, fontWeight: 900 }}>
                SMARTPHONE & LAPTOP
              </div>
              <div style={{ color: "#94A3B8", fontSize: 15, fontWeight: 600 }}>
                Pasar Konsumen Biasa
              </div>
            </div>
          </div>
          <div style={{ color: "#94A3B8", fontSize: 36, fontWeight: 900 }}>
            {Math.round(barPhone)}%
          </div>
        </div>

        {/* Bar Progress Phone */}
        <div
          style={{
            height: 14,
            backgroundColor: "#1E293B",
            borderRadius: 8,
            marginTop: 14,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${barPhone}%`,
              height: "100%",
              backgroundColor: "#64748B",
              borderRadius: 8,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. CASH FLOW: 1 CHIP AI = CUAN 5X LIPAT (TUMPUKAN KOIN EMAS)
// =========================================================================
const CashFlowDiagram: React.FC<{ anim: number; frame: number }> = ({ anim, frame }) => {
  const floatOffset = Math.sin(frame * 0.1) * 6;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${anim}) translateY(${floatOffset}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid #38BDF8",
          borderRadius: 24,
          padding: "24px 36px",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Chip AI Icon */}
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 20,
            backgroundColor: "#0369A1",
            border: "3px solid #38BDF8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 25px rgba(56, 189, 248, 0.4)",
          }}
        >
          <span style={{ fontSize: 38 }}>⚡</span>
          <span style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 13, marginTop: 4 }}>
            H100 / B200
          </span>
        </div>

        {/* Panah Cuan Panas */}
        <div style={{ color: "#FFD600", fontSize: 32, fontWeight: 900 }}>➔</div>

        {/* Tumpukan Cuan Emas */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ color: "#94A3B8", fontSize: 16, fontWeight: 700 }}>
            HARGA JUAL PER KEPING
          </div>
          <div style={{ color: "#FFD600", fontSize: 44, fontWeight: 900 }}>
            $30.000+
          </div>
          <div style={{ color: "#34D399", fontSize: 18, fontWeight: 800 }}>
            Rp480 JUTA / UNIT
          </div>
        </div>
      </div>

      {/* Pill Keterangan Bawah */}
      <div
        style={{
          marginTop: 18,
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          border: "1.5px solid #EF4444",
          color: "#FF4D4D",
          padding: "8px 20px",
          borderRadius: 20,
          fontWeight: 800,
          fontSize: 18,
        }}
      >
        Chip HP Biasa Hanya Laku $50 (Rp800 Ribu)
      </div>
    </div>
  );
};

// =========================================================================
// 4. CHIP NETWORK: SIRKUIT & PERINGATAN STOK RAM/STORAGE MENIPIS
// =========================================================================
const ChipNetworkDiagram: React.FC<{ anim: number; frame: number }> = ({ anim, frame }) => {
  const pulse = Math.sin(frame * 0.18) > 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${anim})`,
      }}
    >
      {/* Vektor Chip Semikonduktor */}
      <div
        style={{
          width: 220,
          height: 220,
          backgroundColor: "#0F172A",
          border: "4px solid #EF4444",
          borderRadius: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 35px rgba(239, 68, 68, 0.35)",
          position: "relative",
        }}
      >
        <span style={{ fontSize: 52 }}>💾</span>
        <span style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 20, marginTop: 8 }}>
          LPDDR5 & NAND
        </span>
        <span style={{ color: "#94A3B8", fontSize: 14, fontWeight: 600 }}>
          RAM & Storage HP
        </span>
      </div>

      {/* Warning Alert Badge */}
      <div
        style={{
          marginTop: 24,
          backgroundColor: pulse ? "#EF4444" : "#B91C1C",
          color: "#FFFFFF",
          padding: "12px 28px",
          borderRadius: 12,
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: "1px",
          boxShadow: "0 8px 25px rgba(239, 68, 68, 0.5)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span>⚠️</span>
        <span>PASOKAN MEMORI LANGKA</span>
      </div>
    </div>
  );
};

// =========================================================================
// 5. TIMELINE TREND: STRATEGI & REKOMENDASI TAHUN 2024 - 2026
// =========================================================================
const TimelineTrendDiagram: React.FC<{ anim: number }> = ({ anim }) => {
  return (
    <div
      style={{
        width: 560,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        border: "2px solid #38BDF8",
        borderRadius: 24,
        padding: "28px 32px",
        boxShadow: "0 12px 35px rgba(0, 0, 0, 0.5)",
        transform: `scale(${anim})`,
      }}
    >
      <div style={{ color: "#38BDF8", fontSize: 18, fontWeight: 800, letterSpacing: "1px" }}>
        PREDIKSI SIKLUS HARGA GADGET
      </div>

      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 900,
              fontSize: 16,
              color: "#FFF",
            }}
          >
            !
          </div>
          <div>
            <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800 }}>
              2025 – 2026: Puncak Kenaikan
            </div>
            <div style={{ color: "#94A3B8", fontSize: 15, fontWeight: 600 }}>
              Harga HP Flagship & Laptop naik 15% – 30%
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#10B981",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 900,
              fontSize: 16,
              color: "#000",
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ color: "#FFD600", fontSize: 20, fontWeight: 800 }}>
              Saran: Rawat Gadget Lamamu
            </div>
            <div style={{ color: "#94A3B8", fontSize: 15, fontWeight: 600 }}>
              Tunda ganti HP jika performanya masih cukup
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
