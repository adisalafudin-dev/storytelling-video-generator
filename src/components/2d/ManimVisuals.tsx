import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  easeInOutCubic,
  easeOutExpo,
  manimSpring,
  progressiveProgress,
} from "../../utils/motion";

// =========================================================================
// 1. MANIM FUNCTION GRAPH (PLOT KURVA & FUNGSI MATEMATIS DENGAN TRACER DOT)
// =========================================================================
export interface ManimFunctionGraphProps {
  // Rentang fungsi X dan Y (misal: xMin: 0, xMax: 10, yMin: 0, yMax: 100)
  xDomain?: [number, number];
  yDomain?: [number, number];
  // Fungsi analitis f(x), default: kurva eksponensial naik
  fn?: (x: number) => number;
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
  axesColor?: string;
  gridColor?: string;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  startFrame?: number;
  drawDurationFrames?: number;
  showTracerDot?: boolean;
}

export const ManimFunctionGraph: React.FC<ManimFunctionGraphProps> = ({
  xDomain = [0, 10],
  yDomain = [0, 100],
  fn = (x) => Math.pow(x / 10, 2) * 100,
  width = 640,
  height = 420,
  strokeColor = "#38bdf8",
  fillColor = "rgba(56, 189, 248, 0.12)",
  axesColor = "#94a3b8",
  gridColor = "rgba(148, 163, 184, 0.15)",
  title,
  xLabel = "Waktu / Parameter (X)",
  yLabel = "Output / Tekanan (Y)",
  startFrame = 0,
  drawDurationFrames = 45,
  showTracerDot = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = manimSpring(frame, fps, "settle", startFrame);
  const drawProgress = progressiveProgress(
    frame,
    startFrame + 5,
    drawDurationFrames,
    easeInOutCubic
  );

  const [xMin, xMax] = xDomain;
  const [yMin, yMax] = yDomain;

  const padLeft = 70;
  const padRight = 30;
  const padTop = 40;
  const padBottom = 60;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  // Generate kurva titik-titik analitis
  const steps = 60;
  const points: { x: number; y: number; valX: number; valY: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const valX = xMin + t * (xMax - xMin);
    const valY = fn(valX);
    const px = padLeft + t * plotW;
    const py = padTop + plotH - ((valY - yMin) / (yMax - yMin)) * plotH;
    points.push({ x: px, y: py, valX, valY });
  }

  // Hitung index titik aktif berdasarkan drawProgress
  const activePointIndex = Math.min(
    points.length - 1,
    Math.floor(drawProgress * (points.length - 1))
  );
  const activePt = points[activePointIndex] || points[0];

  // Susun SVG path untuk kurva yang dipotong hingga drawProgress
  const drawnPoints = points.slice(0, activePointIndex + 1);
  const pathD =
    drawnPoints.length > 0
      ? `M ${drawnPoints[0].x} ${drawnPoints[0].y} ` +
        drawnPoints
          .slice(1)
          .map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
          .join(" ")
      : "";

  // Area fill di bawah kurva
  const areaD =
    drawnPoints.length > 0
      ? `${pathD} L ${drawnPoints[drawnPoints.length - 1].x} ${padTop + plotH} L ${padLeft} ${padTop + plotH} Z`
      : "";

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        background: "rgba(15, 23, 42, 0.88)",
        border: "3px solid #334155",
        borderRadius: 20,
        boxShadow: "0 16px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(56, 189, 248, 0.15)",
        overflow: "hidden",
        transform: `scale(${entrance})`,
        opacity: Math.min(1, entrance * 1.2),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Title Header */}
      {title && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: padLeft,
            color: "#f8fafc",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
      )}

      <svg width={width} height={height} style={{ display: "block" }}>
        {/* Grid lines horizontal */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = padTop + plotH * (1 - pct);
          const labelVal = (yMin + pct * (yMax - yMin)).toFixed(0);
          return (
            <g key={`grid-y-${idx}`}>
              <line
                x1={padLeft}
                y1={y}
                x2={padLeft + plotW}
                y2={y}
                stroke={gridColor}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text
                x={padLeft - 10}
                y={y + 4}
                fill={axesColor}
                fontSize={11}
                fontWeight={600}
                textAnchor="end"
              >
                {labelVal}
              </text>
            </g>
          );
        })}

        {/* Grid lines vertical */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const x = padLeft + plotW * pct;
          const labelVal = (xMin + pct * (xMax - xMin)).toFixed(0);
          return (
            <g key={`grid-x-${idx}`}>
              <line
                x1={x}
                y1={padTop}
                x2={x}
                y2={padTop + plotH}
                stroke={gridColor}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text
                x={x}
                y={padTop + plotH + 20}
                fill={axesColor}
                fontSize={11}
                fontWeight={600}
                textAnchor="middle"
              >
                {labelVal}
              </text>
            </g>
          );
        })}

        {/* Main Axes */}
        <line
          x1={padLeft}
          y1={padTop}
          x2={padLeft}
          y2={padTop + plotH}
          stroke={axesColor}
          strokeWidth={2}
        />
        <line
          x1={padLeft}
          y1={padTop + plotH}
          x2={padLeft + plotW}
          y2={padTop + plotH}
          stroke={axesColor}
          strokeWidth={2}
        />

        {/* Area fill */}
        {areaD && <path d={areaD} fill={fillColor} />}

        {/* Graph Line */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Tracer Dot at front of curve */}
        {showTracerDot && drawnPoints.length > 0 && (
          <g transform={`translate(${activePt.x}, ${activePt.y})`}>
            {/* Outer pulse aura */}
            <circle
              r={12}
              fill={strokeColor}
              opacity={0.35 + Math.sin(frame * 0.2) * 0.15}
            />
            {/* Solid core dot */}
            <circle r={6} fill="#ffffff" stroke={strokeColor} strokeWidth={3} />
          </g>
        )}
      </svg>

      {/* Axis Labels */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 12,
          fontWeight: 700,
          color: axesColor,
          letterSpacing: "0.03em",
        }}
      >
        {xLabel}
      </div>
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: 12,
          transform: "rotate(-90deg) translateX(-50%)",
          transformOrigin: "left center",
          fontSize: 12,
          fontWeight: 700,
          color: axesColor,
          letterSpacing: "0.03em",
        }}
      >
        {yLabel}
      </div>

      {/* Floating Coordinate Badge */}
      {showTracerDot && drawnPoints.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: padRight,
            background: "rgba(56, 189, 248, 0.2)",
            border: `1.5px solid ${strokeColor}`,
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 800,
            color: strokeColor,
          }}
        >
          X: {activePt.valX.toFixed(1)} | Y: {activePt.valY.toFixed(1)}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 2. MANIM MORPH SHAPE (TRANSFORMASI BENTUK GEOMETRIS BERTALIAN STATE A -> B)
// =========================================================================
export interface ManimMorphShapeProps {
  // Interpolasi koordinat poligon State A -> State B
  pointsA: [number, number][];
  pointsB: [number, number][];
  width?: number;
  height?: number;
  colorA?: string;
  colorB?: string;
  startFrame?: number;
  morphDurationFrames?: number;
  labelA?: string;
  labelB?: string;
}

export const ManimMorphShape: React.FC<ManimMorphShapeProps> = ({
  pointsA,
  pointsB,
  width = 500,
  height = 360,
  colorA = "#38bdf8",
  colorB = "#f59e0b",
  startFrame = 0,
  morphDurationFrames = 30,
  labelA = "Bentuk Awal",
  labelB = "Transformasi Baru",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = manimSpring(frame, fps, "settle", startFrame);
  const t = progressiveProgress(
    frame,
    startFrame + 10,
    morphDurationFrames,
    easeInOutCubic
  );

  const maxPoints = Math.max(pointsA.length, pointsB.length);
  const interpolated: [number, number][] = [];

  for (let i = 0; i < maxPoints; i++) {
    const ptA = pointsA[i % pointsA.length];
    const ptB = pointsB[i % pointsB.length];
    const ix = ptA[0] + (ptB[0] - ptA[0]) * t;
    const iy = ptA[1] + (ptB[1] - ptA[1]) * t;
    interpolated.push([ix, iy]);
  }

  const pathD =
    interpolated.length > 0
      ? `M ${interpolated[0][0]} ${interpolated[0][1]} ` +
        interpolated
          .slice(1)
          .map((p) => `L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
          .join(" ") +
        " Z"
      : "";

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(15, 23, 42, 0.8)",
        border: "3px solid #334155",
        borderRadius: 20,
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
        transform: `scale(${entrance})`,
        opacity: entrance,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <svg width={width} height={height - 50}>
        <path
          d={pathD}
          fill={t < 0.5 ? "rgba(56, 189, 248, 0.2)" : "rgba(245, 158, 11, 0.2)"}
          stroke={t < 0.5 ? colorA : colorB}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* Render vertex handles */}
        {interpolated.map(([vx, vy], idx) => (
          <circle
            key={idx}
            cx={vx}
            cy={vy}
            r={5}
            fill="#ffffff"
            stroke={t < 0.5 ? colorA : colorB}
            strokeWidth={2}
          />
        ))}
      </svg>

      {/* Label transisi State A -> State B */}
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          fontSize: 14,
          fontWeight: 800,
          color: "#f8fafc",
          marginBottom: 10,
        }}
      >
        <span style={{ opacity: 1 - t * 0.7, color: colorA }}>{labelA}</span>
        <span style={{ color: "#94a3b8" }}>➔</span>
        <span style={{ opacity: 0.3 + t * 0.7, color: colorB }}>{labelB}</span>
      </div>
    </div>
  );
};

// =========================================================================
// 3. MANIM VECTOR ARROW (PANAH VEKTOR DENGAN PERTUMBUHAN & KOMPONEN)
// =========================================================================
export interface ManimVectorArrowProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  strokeWidth?: number;
  label?: string;
  startFrame?: number;
  durationFrames?: number;
}

export const ManimVectorArrow: React.FC<ManimVectorArrowProps> = ({
  startX,
  startY,
  endX,
  endY,
  color = "#fbbf24",
  strokeWidth = 4,
  label,
  startFrame = 0,
  durationFrames = 25,
}) => {
  const frame = useCurrentFrame();

  const progress = progressiveProgress(
    frame,
    startFrame,
    durationFrames,
    easeOutExpo
  );

  const curEndX = startX + (endX - startX) * progress;
  const curEndY = startY + (endY - startY) * progress;

  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx);
  const headLength = 16;

  // Arrowhead coordinates
  const hx1 = curEndX - headLength * Math.cos(angle - Math.PI / 7);
  const hy1 = curEndY - headLength * Math.sin(angle - Math.PI / 7);
  const hx2 = curEndX - headLength * Math.cos(angle + Math.PI / 7);
  const hy2 = curEndY - headLength * Math.sin(angle + Math.PI / 7);

  const midX = (startX + curEndX) / 2;
  const midY = (startY + curEndY) / 2 - 14;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 25,
      }}
    >
      {/* Batang Vektor */}
      <line
        x1={startX}
        y1={startY}
        x2={curEndX}
        y2={curEndY}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Kepala Panah */}
      {progress > 0.1 && (
        <polygon
          points={`${curEndX},${curEndY} ${hx1},${hy1} ${hx2},${hy2}`}
          fill={color}
        />
      )}
      {/* Label Vektor */}
      {label && progress > 0.4 && (
        <text
          x={midX}
          y={midY}
          fill={color}
          fontSize={14}
          fontWeight={800}
          textAnchor="middle"
          style={{
            fontFamily: "'Inter', sans-serif",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {label}
        </text>
      )}
    </svg>
  );
};

// =========================================================================
// 4. MANIM FORMULA (PERSAMAAN & RUMUS DENGAN SOROTAN FOKUS BERTAPAH)
// Menyorot suku/variabel aktif dengan pill highlight, meredupkan yang lain
// =========================================================================
export interface FormulaTerm {
  symbol: string;
  label?: string;
  color?: string;
}

export interface ManimFormulaProps {
  terms: FormulaTerm[];
  focusIndex?: number;
  title?: string;
  explanation?: string;
  startFrame?: number;
}

export const ManimFormula: React.FC<ManimFormulaProps> = ({
  terms,
  focusIndex = 0,
  title,
  explanation,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = manimSpring(frame, fps, "settle", startFrame);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(15, 23, 42, 0.92)",
        border: "3px solid #334155",
        borderRadius: 22,
        padding: "24px 36px",
        boxShadow: "0 14px 34px rgba(0, 0, 0, 0.55), 0 0 28px rgba(251, 191, 36, 0.15)",
        transform: `scale(${entrance})`,
        opacity: entrance,
        fontFamily: "'Inter', monospace",
        maxWidth: 680,
      }}
    >
      {/* Judul Analitis / Rumus */}
      {title && (
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: "#94a3b8",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {title}
        </div>
      )}

      {/* Baris Rumus dengan Fokus Interaktif */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 32,
          fontWeight: 900,
        }}
      >
        {terms.map((term, idx) => {
          const isFocused = focusIndex === idx;
          const termColor = term.color || (isFocused ? "#fbbf24" : "#f8fafc");

          return (
            <div
              key={idx}
              style={{
                position: "relative",
                padding: "6px 12px",
                borderRadius: 12,
                background: isFocused
                  ? "rgba(251, 191, 36, 0.18)"
                  : "transparent",
                border: isFocused ? "2px solid #fbbf24" : "2px solid transparent",
                color: termColor,
                opacity: isFocused ? 1 : 0.35,
                transform: isFocused ? "scale(1.08)" : "scale(1.0)",
                transition: "all 0.25s ease-out",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>{term.symbol}</span>
              {term.label && isFocused && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fbbf24",
                    marginTop: 4,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {term.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Penjelasan Suku yang Sedang Disorot */}
      {explanation && (
        <div
          style={{
            marginTop: 18,
            fontSize: 14,
            fontWeight: 600,
            color: "#cbd5e1",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 520,
            borderTop: "1px solid rgba(148, 163, 184, 0.2)",
            paddingTop: 12,
          }}
        >
          💡 {explanation}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 5. MANIM FOCUS RING (LINGKARAN SPOTLIGHT / CIRCUMSCRIBE PADA AREA DIAGRAM)
// =========================================================================
export const ManimFocusRing: React.FC<{
  xPercent: number;
  yPercent: number;
  radius?: number;
  color?: string;
  startFrame?: number;
  label?: string;
}> = ({
  xPercent,
  yPercent,
  radius = 60,
  color = "#38bdf8",
  startFrame = 0,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const entrance = manimSpring(frame, fps, "highlightPop", startFrame);
  const pulse = Math.sin((frame - startFrame) * 0.18) * 4;

  const cx = (xPercent / 100) * width;
  const cy = (yPercent / 100) * height;

  return (
    <div
      style={{
        position: "absolute",
        left: cx - (radius + pulse),
        top: cy - (radius + pulse),
        width: (radius + pulse) * 2,
        height: (radius + pulse) * 2,
        borderRadius: "50%",
        border: `3px dashed ${color}`,
        boxShadow: `0 0 24px ${color}66, inset 0 0 16px ${color}33`,
        transform: `scale(${entrance})`,
        opacity: entrance,
        pointerEvents: "none",
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label && (
        <div
          style={{
            position: "absolute",
            bottom: -28,
            background: color,
            color: "#0f172a",
            fontWeight: 800,
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 6,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
