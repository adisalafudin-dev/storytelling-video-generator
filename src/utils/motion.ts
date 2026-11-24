import { Easing, spring } from "remotion";

/**
 * Safe Zones for 9:16 Vertical Video (1080x1920, 30fps)
 * Ensures UI overlays, 3D heroes, and captions never collide.
 */
export const VERTICAL_SAFE_ZONES = {
  // Top 0% - 22%: Reserved for <InfoCard>, niche badges, topic headlines
  topReserved: {
    topPercent: 0,
    bottomPercent: 22,
    recommendedTop: 8, // ~8% from top
    maxHeightPercent: 18,
  },
  // Middle 22% - 74%: The Core Visual Stage for 3D scenes, Manim diagrams, and formulas
  stageZone: {
    topPercent: 22,
    bottomPercent: 74,
    centerPercent: 48,
    heightPercent: 52,
  },
  // Bottom 74% - 100%: Reserved for <ViralCaptions> (16% from bottom) and platform UI
  captionZone: {
    topPercent: 74,
    bottomPercent: 96,
    recommendedBottom: 14, // ~14% - 16% from bottom
  },
  // Horizontal safety margin (padding left/right)
  horizontalPaddingPercent: 6,
} as const;

/**
 * Motion Design Skill Presets
 * Calibrated for smooth entrance, settle, and zero-fatigue viewing.
 */
export const springPresets = {
  // Settle smoothly without distracting bounce (UI Cards, Callouts, Badges)
  settle: {
    damping: 15,
    mass: 0.7,
    stiffness: 110,
  },
  // Snappy response for quick focal transitions and pops
  snappy: {
    damping: 12,
    mass: 0.5,
    stiffness: 160,
  },
  // Gentle progressive entrance for mathematical graphs and diagrams
  gentle: {
    damping: 18,
    mass: 1.0,
    stiffness: 90,
  },
  // Manim writing / drawing speed (controlled, no overshoot)
  manimDraw: {
    damping: 24,
    mass: 1.0,
    stiffness: 85,
  },
  // Subtle scale pop for active highlighting (Indicate / Focus)
  highlightPop: {
    damping: 10,
    mass: 0.4,
    stiffness: 180,
  },
} as const;

export type SpringPresetName = keyof typeof springPresets;

/**
 * Helper to compute tuned spring with preset configurations.
 */
export function manimSpring(
  frame: number,
  fps: number,
  preset: SpringPresetName = "settle",
  delayFrames = 0
): number {
  const localFrame = Math.max(0, frame - delayFrames);
  return spring({
    frame: localFrame,
    fps,
    config: springPresets[preset],
  });
}

/**
 * Standard cubic ease-out for entering elements.
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Symmetric cubic ease-in-out for morphs and state transitions.
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Anticipation ease: subtle wind-up before accelerating smoothly forward.
 */
export function anticipateEase(t: number, anticipation = 0.1): number {
  return t < 0.2
    ? -Math.sin((t / 0.2) * Math.PI) * anticipation
    : Easing.out(Easing.cubic)((t - 0.2) / 0.8);
}

/**
 * Stagger helper: returns local progress with a stepped frame delay per index.
 */
export function staggerDelay(
  index: number,
  currentFrame: number,
  baseFrame = 0,
  stepFrames = 3
): number {
  const start = baseFrame + index * stepFrames;
  return Math.max(0, currentFrame - start);
}

/**
 * Normalized 0 -> 1 progress with custom easing.
 */
export function progressiveProgress(
  frame: number,
  startFrame: number,
  durationFrames: number,
  easing: (t: number) => number = easeInOutCubic
): number {
  if (frame <= startFrame) return 0;
  if (frame >= startFrame + durationFrames) return 1;
  const rawT = (frame - startFrame) / durationFrames;
  return Math.min(1, Math.max(0, easing(rawT)));
}
