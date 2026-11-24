import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type CalloutLabelData = {
  text?: string;
  subtext?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  xPercent?: number;
  yPercent?: number;
  direction?: "left" | "right" | "top";
  startSec?: number;
  durationSec?: number;
};

export const CalloutLabel: React.FC<{ data: CalloutLabelData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleText = data.text || data.title;
  const subText = data.subtext || data.subtitle || data.description;

  if (!titleText && !subText) {
    return null;
  }

  const startFrame = Math.round((data.startSec ?? 0) * fps);
  const durationFrames = data.durationSec != null
    ? Math.round(data.durationSec * fps)
    : 999999;
  const endFrame = startFrame + durationFrames;

  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const localFrame = frame - startFrame;
  const exitFrames = 10;
  const remainingFrames = endFrame - frame;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 140 },
  });

  const exitOpacity = remainingFrames < exitFrames ? remainingFrames / exitFrames : 1;
  const opacity = Math.min(1, Math.max(0, entrance * exitOpacity));

  const xPercent = data.xPercent ?? 50;
  const yPercent = data.yPercent ?? 26;
  const cx = (xPercent / 100) * width;
  const cy = (yPercent / 100) * height;

  const pulsePeriod = 40;
  const pulsePhase = (localFrame % pulsePeriod) / pulsePeriod;
  const ringSize = 20 + pulsePhase * 44;
  const ringOpacity = (1 - pulsePhase) * opacity * 0.9;

  // Perfectly centered on mobile 1080x1920 with safe screen bounds
  const cardWidth = Math.min(width * 0.88, 640);
  const cardLeft = Math.max(24, Math.min(width - cardWidth - 24, cx - cardWidth / 2));

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 35 }}>
      {/* Target Pin Point (only if custom coords or explicit) */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Pulsing Sonar Ring */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: ringSize,
            height: ringSize,
            borderRadius: "50%",
            border: "3px solid #ef4444",
            transform: "translate(-50%, -50%)",
            opacity: ringOpacity,
          }}
        />
        {/* Center Glow Dot */}
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#ef4444",
            border: "2.5px solid #ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            opacity,
            transform: `scale(${entrance})`,
          }}
        />
      </div>

      {/* Floating Callout Badge (White Card Centered Horizontally) */}
      <div
        style={{
          position: "absolute",
          left: cardLeft,
          top: cy - 95,
          width: cardWidth,
          opacity,
          transform: `translateY(${(1 - entrance) * 16}px) scale(${entrance})`,
          transformOrigin: "center bottom",
          background: "#ffffff",
          border: "4px solid #0f172a",
          boxShadow: "0 8px 0 #0f172a, 0 16px 28px rgba(0, 0, 0, 0.22)",
          borderRadius: 20,
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 6,
          boxSizing: "border-box",
        }}
      >
        {titleText && (
          <div
            style={{
              color: "#dc2626",
              fontSize: 28,
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 1.2,
            }}
          >
            {titleText}
          </div>
        )}
        {subText && (
          <div
            style={{
              color: "#334155",
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.01em",
              lineHeight: 1.35,
            }}
          >
            {subText}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
