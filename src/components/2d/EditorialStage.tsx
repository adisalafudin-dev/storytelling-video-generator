import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type EditorialTheme = "tech" | "money" | "game" | "world" | "default";

const THEME_ACCENTS: Record<EditorialTheme, { glow: string; grid: string; tagBg: string; tagText: string }> = {
  tech: {
    glow: "rgba(14, 165, 233, 0.22)",
    grid: "rgba(56, 189, 248, 0.07)",
    tagBg: "#FFD600",
    tagText: "#000000",
  },
  money: {
    glow: "rgba(234, 179, 8, 0.24)",
    grid: "rgba(250, 204, 21, 0.08)",
    tagBg: "#FFD600",
    tagText: "#000000",
  },
  game: {
    glow: "rgba(236, 72, 153, 0.22)",
    grid: "rgba(244, 114, 182, 0.08)",
    tagBg: "#FF2A5F",
    tagText: "#FFFFFF",
  },
  world: {
    glow: "rgba(16, 185, 129, 0.22)",
    grid: "rgba(52, 211, 153, 0.08)",
    tagBg: "#10B981",
    tagText: "#000000",
  },
  default: {
    glow: "rgba(59, 130, 246, 0.20)",
    grid: "rgba(148, 163, 184, 0.06)",
    tagBg: "#FFD600",
    tagText: "#000000",
  },
};

export const EditorialStage: React.FC<{
  theme?: EditorialTheme;
  nicheTag?: string;
  zoomDirection?: "in" | "out" | "pan";
  showGrid?: boolean;
  showWatermark?: boolean;
  children: React.ReactNode;
}> = ({
  theme = "tech",
  nicheTag = "FAKTA HARIAN",
  zoomDirection = "in",
  showGrid = true,
  showWatermark = true,
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const cfg = THEME_ACCENTS[theme] || THEME_ACCENTS.default;

  // Kamera zoom / pan halus 2D
  const zoomScale = interpolate(
    frame,
    [0, Math.max(1, durationInFrames - 1)],
    zoomDirection === "in" ? [1.0, 1.05] : zoomDirection === "out" ? [1.05, 1.0] : [1.0, 1.03],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const panY = interpolate(
    frame,
    [0, Math.max(1, durationInFrames - 1)],
    zoomDirection === "pan" ? [-10, 10] : [0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070B14",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Dynamic Zooming Canvas Wrapper */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${zoomScale}) translateY(${panY}px)`,
          transformOrigin: "center center",
          position: "relative",
        }}
      >
        {/* Subtle Editorial Tech Grid Background (Conditional) */}
        {showGrid && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(${cfg.grid} 1.5px, transparent 1.5px),
                linear-gradient(90deg, ${cfg.grid} 1.5px, transparent 1.5px)
              `,
              backgroundSize: "60px 60px",
              backgroundPosition: "center center",
              opacity: 0.85,
            }}
          />
        )}

        {/* Center Glow Lighting Effect */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: width * 0.85,
            height: height * 0.55,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Content Container */}
        {children}
      </div>

      {/* Fixed Static Header UI (Identitas Feed @adi.salafudin) - Conditional */}
      {showWatermark && (
        <div
          style={{
            position: "absolute",
            top: "5.5%",
            left: "6%",
            right: "6%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          {/* Watermark Akun (Hanya @adi.salafudin) */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#FFD600",
                boxShadow: "0 0 10px #FFD600",
              }}
            />
            <span
              style={{
                color: "#F8FAFC",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "0.5px",
                opacity: 0.95,
              }}
            >
              @adi.salafudin
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
