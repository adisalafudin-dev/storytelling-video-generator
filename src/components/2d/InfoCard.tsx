import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type InfoCardData = {
  type?: "quote" | "stat" | "source" | "info" | "badge";
  title?: string;
  badge?: string;
  metric?: string;
  value?: string;
  label?: string;
  text?: string;
  description?: string;
  author?: string;
  source?: string;
  startSec?: number;
  durationSec?: number;
};

export const InfoCard: React.FC<{ data: InfoCardData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Safety check: if card has literally no text content, do not render an empty box!
  const hasContent = Boolean(
    data.title ||
    data.badge ||
    data.metric ||
    data.value ||
    data.label ||
    data.text ||
    data.description ||
    data.author ||
    data.source
  );
  if (!hasContent) {
    return null;
  }

  const startFrame = Math.round((data.startSec ?? 0) * fps);
  // Default to staying visible for the scene unless explicitly shortened
  const durationFrames = data.durationSec != null
    ? Math.round(data.durationSec * fps)
    : 999999;
  const endFrame = startFrame + durationFrames;

  // Render strictly within the active window
  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const localFrame = frame - startFrame;
  const exitFrames = 10;
  const remainingFrames = endFrame - frame;

  // Spring entrance with subtle elastic overshoot
  const entranceSpring = spring({
    frame: localFrame,
    fps,
    config: {
      damping: 13,
      mass: 0.65,
      stiffness: 140,
    },
  });

  // Smooth exit fade and slide
  const exitProgress = interpolate(
    remainingFrames,
    [0, exitFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const opacity = Math.min(1, Math.max(0, entranceSpring * exitProgress));
  const translateY = (1 - entranceSpring) * 30 - (1 - exitProgress) * 15;
  const scale = 0.94 + entranceSpring * 0.06;

  // Responsive unit based on 1080x1920
  const u = Math.min(width, height);

  // Badge text resolution
  const badgeText = data.badge || (data.type === "stat" ? "STATISTIK GLOBAL" : data.type === "source" ? "DOKUMEN RESMI" : null);

  // Big metric / value
  const metricText = data.metric || data.value;

  // Primary title / headline
  const titleText = data.title;

  // Body text / description
  const bodyText = data.description || data.text || data.label;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: height * 0.09,
        zIndex: 30,
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: Math.min(u * 0.90, 680),
          // Bright High-Contrast White Card with Bold Cel-Shaded Border
          background: "#ffffff",
          border: "4px solid #0f172a",
          borderRadius: 22,
          boxShadow: "0 8px 0 #0f172a, 0 16px 28px rgba(0, 0, 0, 0.22)",
          padding: `${u * 0.034}px ${u * 0.046}px`,
          color: "#0f172a",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          transformOrigin: "center top",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Badge */}
        {badgeText && (
          <div style={{ marginBottom: 8 }}>
            <span
              style={{
                display: "inline-block",
                background: "#fef08a",
                color: "#854d0e",
                border: "2px solid #ca8a04",
                borderRadius: 999,
                fontSize: Math.max(14, u * 0.026),
                fontWeight: 900,
                padding: "3px 12px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {badgeText}
            </span>
          </div>
        )}

        {/* Big Metric Display (e.g. RON 90 vs RON 92, Detonasi Liar) */}
        {metricText && (
          <div
            style={{
              fontSize: Math.min(52, u * 0.068),
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#dc2626",
              letterSpacing: "-0.02em",
              marginBottom: titleText || bodyText ? 6 : 0,
            }}
          >
            {metricText}
          </div>
        )}

        {/* Main Title / Headline */}
        {titleText && (
          <div
            style={{
              fontSize: Math.min(38, u * 0.046),
              fontWeight: 900,
              lineHeight: 1.25,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              marginBottom: bodyText ? 6 : 0,
            }}
          >
            {titleText}
          </div>
        )}

        {/* Descriptive Body Text */}
        {bodyText && (
          <div
            style={{
              fontSize: Math.min(26, u * 0.033),
              fontWeight: 700,
              color: "#334155",
              lineHeight: 1.38,
              letterSpacing: "-0.01em",
            }}
          >
            {bodyText}
          </div>
        )}

        {/* Sub-tag / Source / Author */}
        {(data.source || data.author) && (
          <div
            style={{
              marginTop: 8,
              fontSize: Math.min(22, u * 0.028),
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {data.source ? `📍 ${data.source}` : `— ${data.author}`}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
