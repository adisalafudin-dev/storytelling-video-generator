import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

export type IPhoneStoryV7VisualType =
  | "storyv7-hook-showcase"
  | "storyv7-bridge-question"
  | "storyv7-income-contrast"
  | "storyv7-living-expenses"
  | "storyv7-savings-timeline";

const FONT_STORY = "'Patrick Hand', cursive, sans-serif";
const FONT_NUM = "'Plus Jakarta Sans', sans-serif";

/**
 * Clean exit BEFORE TransitionSeries's 12-frame fade begins (at sceneFrames - 12).
 * Guarantees zero card/character overlap across cuts.
 */
const useCleanExit = (frame: number, sceneFrames: number) => {
  const exitOpacity = interpolate(
    frame,
    [sceneFrames - 20, sceneFrames - 12],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitScale = interpolate(
    frame,
    [sceneFrames - 20, sceneFrames - 12],
    [1, 0.94],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return { exitOpacity, exitScale };
};

export const IPhoneStoryV7Visuals: React.FC<{
  type: IPhoneStoryV7VisualType;
}> = ({ type }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 10,
        pointerEvents: "none",
        fontFamily: FONT_NUM,
      }}
    >
      {type === "storyv7-hook-showcase" && <Scene1HookWorld frame={frame} fps={fps} />}
      {type === "storyv7-bridge-question" && <Scene2BridgeWorld frame={frame} fps={fps} />}
      {type === "storyv7-income-contrast" && <Scene3IncomeWorld frame={frame} fps={fps} />}
      {type === "storyv7-living-expenses" && <Scene4ExpensesWorld frame={frame} fps={fps} />}
      {type === "storyv7-savings-timeline" && <Scene5TimelineWorld frame={frame} fps={fps} />}
    </div>
  );
};

// =========================================================================
// KARAKTER INTERAKTIF GAYA #3 (PAK BUDI & PAK HENDRA)
// =========================================================================
type Emotion = "happy" | "confused" | "shocked" | "talking";
type BudiAction = "idle" | "farming" | "counting" | "walking";
type HendraAction = "idle" | "waving" | "counting";

const CharacterPakBudi: React.FC<{
  size?: number;
  frame: number;
  emotion?: Emotion;
  action?: BudiAction;
}> = ({ size = 440, frame, emotion = "happy", action = "idle" }) => {
  const isWalking = action === "walking";
  const walkBob = isWalking ? Math.abs(Math.sin(frame / 5)) * 12 : 0;
  const walkTilt = isWalking ? Math.sin(frame / 5) * 3.5 : 0;
  const breathY = isWalking ? -walkBob : Math.sin(frame / 11) * 5;
  const headBob = Math.sin(frame / 8) * 3;
  const isBlinking = frame % 82 < 5;
  const armWave = Math.sin(frame / 7) * 14;

  return (
    <div
      style={{
        width: size,
        height: size * 1.15,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `rotate(${walkTilt}deg)`,
      }}
    >
      <svg width={size} height={size * 1.15} viewBox="0 0 200 230" fill="none" style={{ overflow: "visible" }}>
        <ellipse cx="100" cy="222" rx={isWalking ? 64 : 74} ry="12" fill="rgba(28, 25, 23, 0.34)" />

        {action === "farming" && (
          <g transform={`translate(142, ${105 + Math.sin(frame / 8) * 6}) rotate(${Math.sin(frame / 8) * 8}, 0, 80)`}>
            <line x1="0" y1="0" x2="10" y2="115" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
            <path d="M-18 4 L16 -4 L12 14 L-16 14 Z" fill="#64748B" stroke="#1C1917" strokeWidth="3" />
          </g>
        )}

        <g transform={`translate(0, ${breathY * 0.6})`}>
          <path
            d="M52 146 Q30 165 36 188"
            stroke="#15803D"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            transform={
              action === "walking"
                ? `rotate(${armWave}, 52, 146)`
                : action === "counting"
                ? `rotate(${-15 + Math.sin(frame / 6) * 8}, 52, 146)`
                : undefined
            }
          />
          <path
            d="M148 146 Q170 165 162 188"
            stroke="#15803D"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            transform={
              action === "walking"
                ? `rotate(${-armWave}, 148, 146)`
                : action === "farming"
                ? `rotate(${Math.sin(frame / 8) * 10 - 15}, 148, 146)`
                : action === "counting"
                ? `rotate(${15 - Math.sin(frame / 6) * 8}, 148, 146)`
                : undefined
            }
          />

          <path
            d="M48 148 C48 128 74 124 100 124 C126 124 152 128 152 148 L158 215 L42 215 Z"
            fill="#15803D"
            stroke="#1C1917"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M85 124 L100 150 L115 124" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M70 132 C68 160 74 185 76 200 M130 132 C132 160 126 185 124 200" stroke="#FFFBEB" strokeWidth="10" strokeLinecap="round" />
        </g>

        <g transform={`translate(0, ${breathY}) rotate(${headBob}, 100, 95)`}>
          <rect x="90" y="110" width="20" height="20" fill="#F59E0B" />
          <ellipse cx="100" cy="92" rx="40" ry="38" fill="#FDE047" stroke="#1C1917" strokeWidth="3.5" />
          <circle cx="58" cy="94" r="8" fill="#FDE047" stroke="#1C1917" strokeWidth="3" />
          <circle cx="142" cy="94" r="8" fill="#FDE047" stroke="#1C1917" strokeWidth="3" />

          {emotion === "confused" ? (
            <>
              <path d="M74 72 Q86 64 96 74" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M106 78 Q116 75 126 80" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </>
          ) : emotion === "shocked" ? (
            <>
              <path d="M74 68 Q85 60 95 68" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M105 68 Q115 60 126 68" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <path d="M75 74 Q85 68 95 74" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M105 74 Q115 68 125 74" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          )}

          {isBlinking ? (
            <>
              <path d="M78 88 L92 88" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
              <path d="M108 88 L122 88" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : emotion === "shocked" ? (
            <>
              <circle cx="85" cy="87" r="8" fill="#FFFFFF" stroke="#1C1917" strokeWidth="3" />
              <circle cx="85" cy="87" r="3.5" fill="#1C1917" />
              <circle cx="115" cy="87" r="8" fill="#FFFFFF" stroke="#1C1917" strokeWidth="3" />
              <circle cx="115" cy="87" r="3.5" fill="#1C1917" />
            </>
          ) : (
            <>
              <ellipse cx="85" cy="87" rx="5" ry="6" fill="#1C1917" />
              <circle cx="83.5" cy="85.5" r="2" fill="#FFFFFF" />
              <ellipse cx="115" cy="87" rx="5" ry="6" fill="#1C1917" />
              <circle cx="113.5" cy="85.5" r="2" fill="#FFFFFF" />
            </>
          )}

          <path d="M98 90 Q102 96 98 100" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" fill="none" />

          {emotion === "confused" ? (
            <path d="M88 108 Q94 112 100 107 Q106 102 112 108" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
          ) : emotion === "shocked" ? (
            <ellipse cx="100" cy="110" rx="9" ry="14" fill="#DC2626" stroke="#1C1917" strokeWidth="3" />
          ) : emotion === "talking" ? (
            <ellipse cx="100" cy="108" rx="11" ry={6 + Math.abs(Math.sin(frame / 3)) * 6} fill="#DC2626" stroke="#1C1917" strokeWidth="3" />
          ) : (
            <path d="M86 105 Q100 118 114 105" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
          )}

          {emotion === "confused" && (
            <path
              d="M144 58 C144 58 150 68 150 74 C150 78 147 81 144 81 C141 81 138 78 138 74 C138 68 144 58 144 58 Z"
              fill="#38BDF8"
              stroke="#1C1917"
              strokeWidth="2.5"
              transform={`translate(0, ${Math.sin(frame / 5) * 4})`}
            />
          )}

          <g transform="translate(0, -8)">
            <path d="M28 74 Q100 14 172 74 Q100 84 28 74 Z" fill="#F59E0B" stroke="#1C1917" strokeWidth="4" strokeLinejoin="round" />
            <path d="M55 62 Q100 44 145 62" stroke="#B45309" strokeWidth="3" fill="none" />
            <path d="M75 48 Q100 36 125 48" stroke="#B45309" strokeWidth="2.5" fill="none" />
          </g>
        </g>
      </svg>
    </div>
  );
};

const CharacterPakHendra: React.FC<{
  size?: number;
  frame: number;
  emotion?: Emotion;
  action?: HendraAction;
}> = ({ size = 440, frame, emotion = "happy", action = "idle" }) => {
  const breathY = Math.sin((frame + 15) / 12) * 5;
  const headBob = Math.sin((frame + 10) / 9) * 2.5;
  const isBlinking = (frame + 30) % 90 < 5;
  const waveAngle = Math.sin(frame / 6) * 16;

  return (
    <div
      style={{
        width: size,
        height: size * 1.15,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg width={size} height={size * 1.15} viewBox="0 0 200 230" fill="none" style={{ overflow: "visible" }}>
        <ellipse cx="100" cy="222" rx="74" ry="12" fill="rgba(28, 25, 23, 0.34)" />

        <g transform={`translate(0, ${breathY * 0.6})`}>
          <path d="M46 148 Q24 166 32 190" stroke="#1E3A8A" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path
            d={action === "waving" ? "M154 148 Q178 122 170 96" : "M154 148 Q174 166 168 190"}
            stroke="#1E3A8A"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            transform={action === "waving" ? `rotate(${waveAngle}, 154, 148)` : undefined}
          />

          <path d="M44 148 C44 128 72 124 100 124 C128 124 156 128 156 148 L162 215 L38 215 Z" fill="#1E3A8A" stroke="#1C1917" strokeWidth="4" strokeLinejoin="round" />
          <path d="M84 124 L100 156 L116 124 Z" fill="#FFFBEB" stroke="#1C1917" strokeWidth="2.5" />
          <path d="M96 135 L104 135 L106 185 L100 194 L94 185 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="2" />
        </g>

        <g transform={`translate(0, ${breathY}) rotate(${headBob}, 100, 95)`}>
          <rect x="90" y="110" width="20" height="20" fill="#F59E0B" />
          <ellipse cx="100" cy="92" rx="40" ry="38" fill="#FDE68A" stroke="#1C1917" strokeWidth="3.5" />
          <circle cx="58" cy="94" r="8" fill="#FDE68A" stroke="#1C1917" strokeWidth="3" />
          <circle cx="142" cy="94" r="8" fill="#FDE68A" stroke="#1C1917" strokeWidth="3" />
          <path d="M60 80 C58 55 82 44 108 46 C132 48 142 62 140 80 C130 66 112 62 92 64 C78 66 66 72 60 80 Z" fill="#1C1917" />
          <path d="M74 75 Q85 70 94 75" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M106 75 Q115 70 126 75" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {isBlinking ? (
            <>
              <path d="M78 88 L92 88" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
              <path d="M108 88 L122 88" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx="85" cy="87" rx="5" ry="6" fill="#1C1917" />
              <circle cx="83.5" cy="85.5" r="2" fill="#FFFFFF" />
              <ellipse cx="115" cy="87" rx="5" ry="6" fill="#1C1917" />
              <circle cx="113.5" cy="85.5" r="2" fill="#FFFFFF" />
            </>
          )}

          <rect x="70" y="77" width="26" height="20" rx="5" stroke="#1C1917" strokeWidth="3.5" fill="rgba(255,255,255,0.2)" />
          <rect x="104" y="77" width="26" height="20" rx="5" stroke="#1C1917" strokeWidth="3.5" fill="rgba(255,255,255,0.2)" />
          <line x1="96" y1="86" x2="104" y2="86" stroke="#1C1917" strokeWidth="3.5" />
          <path d="M99 90 L101 98" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" />

          {emotion === "talking" ? (
            <ellipse cx="100" cy="109" rx="11" ry={6 + Math.abs(Math.sin(frame / 3)) * 5} fill="#DC2626" stroke="#1C1917" strokeWidth="3" />
          ) : (
            <path d="M84 106 Q100 120 116 105" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
          )}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// PARALLAX LAYERED WORLDS WITH SECONDARY MOTION
// =========================================================================
const VillageMorningWorld: React.FC<{ frame: number; panX?: number }> = ({ frame, panX = 0 }) => {
  const stalkSway = Math.sin(frame / 8) * 14;
  const palmSway = Math.sin(frame / 11) * 4;
  const cloudX = (frame * 0.75) % 200;
  const birdX = (frame * 2.8) % 1240;
  const sunRayRotate = frame * 0.15;

  return (
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="v7DawnSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="44%" stopColor="#FEF08A" />
          <stop offset="76%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#84CC16" />
        </linearGradient>
        <radialGradient id="v7SunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FDE047" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* BACKGROUND (0.2x Parallax) */}
      <rect width="1080" height="1920" fill="url(#v7DawnSky)" />
      <g transform={`translate(${panX * 0.2}, 0)`}>
        <circle cx="540" cy="490" r="340" fill="url(#v7SunGlow)" />
        <g transform={`rotate(${sunRayRotate}, 540, 490)`} opacity="0.22">
          <polygon points="540,490 470,120 610,120" fill="#FFFBEB" />
          <polygon points="540,490 880,380 880,520" fill="#FFFBEB" />
          <polygon points="540,490 200,380 200,520" fill="#FFFBEB" />
        </g>
        <circle cx="540" cy="490" r="92" fill="#FFFBEB" />

        <g transform={`translate(${cloudX - 100}, 0)`} opacity="0.88">
          <ellipse cx="220" cy="290" rx="145" ry="40" fill="#FFFBEB" />
          <ellipse cx="280" cy="270" rx="90" ry="34" fill="#FFFBEB" />
          <ellipse cx="860" cy="360" rx="155" ry="44" fill="#FFFBEB" />
        </g>

        <g transform={`translate(${birdX - 80}, ${320 + Math.sin(frame / 6) * 14})`} stroke="#1C1917" strokeWidth="4" fill="none">
          <path d="M0 10 Q10 -4 20 10 Q30 -4 40 10" />
          <path d="M60 28 Q68 16 76 28 Q84 16 92 28" />
        </g>

        <path d="M-120 920 Q280 750 560 880 T1200 810 L1200 1920 L-120 1920 Z" fill="#166534" opacity="0.45" />
      </g>

      {/* MIDGROUND (0.7x Parallax) */}
      <g transform={`translate(${panX * 0.7}, 0)`}>
        <path d="M-120 1020 Q340 860 660 980 T1200 940 L1200 1920 L-120 1920 Z" fill="#15803D" opacity="0.72" />
        <path d="M-120 1180 Q540 1080 1200 1200 L1200 1920 L-120 1920 Z" fill="#65A30D" stroke="#1C1917" strokeWidth="3" />
        <path d="M-120 1320 Q540 1240 1200 1350 L1200 1920 L-120 1920 Z" fill="#4D7C0F" stroke="#1C1917" strokeWidth="3" />

        {/* Pohon Kelapa Bergoyang Angin */}
        <g transform={`translate(80, 790) rotate(${palmSway}, 40, 240)`}>
          <path d="M40 240 Q55 130 30 30" stroke="#78350F" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M30 30 Q-30 10 -50 60 M30 30 Q90 0 120 50 M30 30 Q40 -30 80 -10" stroke="#15803D" strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>
        {/* Gubuk Bambu */}
        <g transform="translate(780, 950)">
          <rect x="20" y="70" width="130" height="95" fill="#92400E" stroke="#1C1917" strokeWidth="4" />
          <polygon points="0,75 85,10 170,75" fill="#B45309" stroke="#1C1917" strokeWidth="4" />
        </g>
      </g>

      {/* FOREGROUND (1.6x Parallax + Wind Sway) */}
      <g transform={`translate(${panX * 1.6 + stalkSway}, 0)`} stroke="#1C1917" strokeWidth="3">
        <path d="M-140 1490 Q540 1420 1220 1510 L1220 1920 L-140 1920 Z" fill="#3F6212" />
        <path d="M-10 1920 Q45 1640 120 1490" stroke="#15803D" strokeWidth="16" fill="none" strokeLinecap="round" />
        <ellipse cx="120" cy="1480" rx="24" ry="12" fill="#FDE047" transform="rotate(-35 120 1480)" />
        <path d="M60 1920 Q110 1700 170 1570" stroke="#15803D" strokeWidth="12" fill="none" strokeLinecap="round" />
        <ellipse cx="170" cy="1560" rx="20" ry="10" fill="#FDE047" transform="rotate(-25 170 1560)" />

        <path d="M1090 1920 Q1035 1640 960 1480" stroke="#15803D" strokeWidth="16" fill="none" strokeLinecap="round" />
        <ellipse cx="960" cy="1470" rx="24" ry="12" fill="#FDE047" transform="rotate(35 960 1470)" />
        <path d="M1020 1920 Q970 1700 910 1560" stroke="#15803D" strokeWidth="12" fill="none" strokeLinecap="round" />
        <ellipse cx="910" cy="1550" rx="20" ry="10" fill="#FDE047" transform="rotate(25 910 1550)" />
      </g>
    </svg>
  );
};

const CityShopWorld: React.FC<{ frame: number; panX?: number }> = ({ frame, panX = 0 }) => {
  const lampSway = Math.sin(frame / 12) * 4.5;
  const signSway = Math.sin(frame / 10) * 5;

  return (
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="v7ShopWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="60%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="v7ShopLamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1080" height="1920" fill="url(#v7ShopWall)" />
      <g transform={`translate(${panX * 0.25}, 0)`}>
        <rect x="260" y="340" width="560" height="540" rx="24" fill="#38BDF8" stroke="#1C1917" strokeWidth="6" />
        <rect x="310" y="540" width="90" height="340" fill="#1E3A8A" opacity="0.65" />
        <rect x="430" y="460" width="110" height="420" fill="#1E3A8A" opacity="0.8" />
        <rect x="570" y="510" width="100" height="370" fill="#1E3A8A" opacity="0.65" />
        <rect x="700" y="580" width="80" height="300" fill="#1E3A8A" opacity="0.75" />
        <line x1="540" y1="340" x2="540" y2="880" stroke="#1C1917" strokeWidth="6" />
        {/* Papan Gantung BUKA di Jendela */}
        <g transform={`translate(540, 480) rotate(${signSway})`}>
          <rect x="-70" y="20" width="140" height="54" rx="10" fill="#DC2626" stroke="#1C1917" strokeWidth="4" />
        </g>
      </g>

      <g transform={`translate(${panX * 0.75}, 0)`}>
        <g transform={`rotate(${lampSway}, 240, 0)`}>
          <line x1="240" y1="0" x2="240" y2="300" stroke="#1C1917" strokeWidth="5" />
          <path d="M190 320 L290 320 L265 280 L215 280 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="4" />
          <circle cx="240" cy="350" r="130" fill="url(#v7ShopLamp)" />
        </g>
        <g transform={`rotate(${-lampSway}, 840, 0)`}>
          <line x1="840" y1="0" x2="840" y2="300" stroke="#1C1917" strokeWidth="5" />
          <path d="M790 320 L890 320 L865 280 L815 280 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="4" />
          <circle cx="840" cy="350" r="130" fill="url(#v7ShopLamp)" />
        </g>

        <rect x="30" y="520" width="180" height="880" rx="12" fill="#B45309" stroke="#1C1917" strokeWidth="4" />
        <rect x="55" y="640" width="55" height="60" rx="6" fill="#DC2626" stroke="#1C1917" strokeWidth="3" />
        <rect x="125" y="655" width="55" height="45" rx="6" fill="#15803D" stroke="#1C1917" strokeWidth="3" />
        <line x1="30" y1="700" x2="210" y2="700" stroke="#1C1917" strokeWidth="5" />
        <line x1="30" y1="900" x2="210" y2="900" stroke="#1C1917" strokeWidth="5" />
        <line x1="30" y1="1100" x2="210" y2="1100" stroke="#1C1917" strokeWidth="5" />

        <rect x="870" y="520" width="180" height="880" rx="12" fill="#B45309" stroke="#1C1917" strokeWidth="4" />
        <rect x="895" y="640" width="55" height="60" rx="6" fill="#1E3A8A" stroke="#1C1917" strokeWidth="3" />
        <rect x="965" y="655" width="55" height="45" rx="6" fill="#FDE047" stroke="#1C1917" strokeWidth="3" />
        <line x1="870" y1="700" x2="1050" y2="700" stroke="#1C1917" strokeWidth="5" />
        <line x1="870" y1="900" x2="1050" y2="900" stroke="#1C1917" strokeWidth="5" />
        <line x1="870" y1="1100" x2="1050" y2="1100" stroke="#1C1917" strokeWidth="5" />
      </g>

      <g transform={`translate(${panX * 1.5}, 0)`}>
        <rect x="-120" y="1350" width="1320" height="570" fill="#92400E" stroke="#1C1917" strokeWidth="5" />
        <rect x="-120" y="1350" width="1320" height="45" fill="#D97706" stroke="#1C1917" strokeWidth="4" />
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 1: HOOK & DUA DUNIA (PODIUM HANGAT MENYATU + ANIMASI BERSAMAAN)
// =========================================================================
const Scene1HookWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, 336);

  const isBeat1 = frame < 105;
  const isBeat2 = frame >= 105 && frame < 205;
  const isBeat3 = frame >= 205;

  const camScale1 = interpolate(frame, [0, 105], [1.0, 1.11], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pan1 = interpolate(frame, [0, 105], [-42, 42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const camScale2 = interpolate(frame, [105, 205], [1.0, 1.11], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pan2 = interpolate(frame, [105, 205], [42, -42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const camScale3 = interpolate(frame, [205, 336], [1.0, 1.09], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pan3 = interpolate(frame, [205, 336], [-24, 24], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const titlePop1 = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const titlePop2 = spring({ frame: Math.max(0, frame - 107), fps, config: { damping: 14, stiffness: 90 } });
  const showcasePop = spring({ frame: Math.max(0, frame - 207), fps, config: { damping: 13, stiffness: 95 } });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {isBeat1 && (
        <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale1})` }}>
          <VillageMorningWorld frame={frame} panX={pan1} />

          <div
            style={{
              position: "absolute",
              top: 225,
              left: "50%",
              transform: `translateX(-50%) scale(${titlePop1})`,
              width: 820,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 28,
              padding: "20px 40px",
              boxShadow: "10px 10px 0px #1C1917",
              textAlign: "center",
              zIndex: 20,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 62, color: "#1C1917", lineHeight: 1.05 }}>
              Pak Budi
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 38, fontWeight: 800, color: "#15803D" }}>
              Pagi Buta di Sawah
            </div>
          </div>

          <div style={{ position: "absolute", top: 690, left: "50%", transform: "translateX(-50%)", zIndex: 15 }}>
            <CharacterPakBudi frame={frame} size={460} emotion="happy" action="farming" />
          </div>
        </div>
      )}

      {isBeat2 && (
        <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale2})` }}>
          <CityShopWorld frame={frame} panX={pan2} />

          <div
            style={{
              position: "absolute",
              top: 225,
              left: "50%",
              transform: `translateX(-50%) scale(${titlePop2})`,
              width: 820,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 28,
              padding: "20px 40px",
              boxShadow: "10px 10px 0px #1C1917",
              textAlign: "center",
              zIndex: 20,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 62, color: "#1C1917", lineHeight: 1.05 }}>
              Pak Hendra
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 38, fontWeight: 800, color: "#1E3A8A" }}>
              Buka Pintu Usahanya
            </div>
          </div>

          <div style={{ position: "absolute", top: 690, left: "50%", transform: "translateX(-50%)", zIndex: 15 }}>
            <CharacterPakHendra frame={frame} size={460} emotion="happy" action="waving" />
          </div>
        </div>
      )}

      {isBeat3 && (
        <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale3})` }}>
          {/* Latar Etalase Butik Hangat Berlapis */}
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="v7BoutiqueBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="55%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            <rect width="1080" height="1920" fill="url(#v7BoutiqueBg)" />
            <g transform={`translate(${pan3 * 0.4}, 0)`}>
              <polygon points="540,140 160,1500 920,1500" fill="#FFFBEB" opacity="0.48" />
            </g>
            <g transform={`translate(${pan3 * 1.2}, 0)`}>
              <rect x="-100" y="1320" width="1280" height="600" fill="#92400E" stroke="#1C1917" strokeWidth="5" />
              <rect x="-100" y="1320" width="1280" height="38" fill="#D97706" stroke="#1C1917" strokeWidth="4" />
            </g>
          </svg>

          <div style={{ opacity: exitOpacity, transform: `scale(${exitScale})`, position: "absolute", inset: 0 }}>
            {/* Label Harga Atas */}
            <div
              style={{
                position: "absolute",
                top: 220,
                left: "50%",
                transform: `translateX(-50%) scale(${showcasePop})`,
                width: 860,
                backgroundColor: "#FFFBEB",
                border: "5px solid #1C1917",
                borderRadius: 30,
                padding: "20px 44px",
                boxShadow: "10px 10px 0px #1C1917",
                textAlign: "center",
                zIndex: 30,
              }}
            >
              <div style={{ fontFamily: FONT_STORY, fontSize: 48, color: "#1C1917" }}>
                Target Barang yang Sama:
              </div>
              <div style={{ fontFamily: FONT_NUM, fontSize: 68, fontWeight: 800, color: "#DC2626" }}>
                Rp 16,5 Juta
              </div>
            </div>

            {/* Podium Kayu Hangat + Contact Shadow + iPhone (Muncul BERSAMAAN, Menempel di Meja y=1320) */}
            <div
              style={{
                position: "absolute",
                top: 720,
                left: "50%",
                transform: `translateX(-50%) scale(${showcasePop})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 20,
              }}
            >
              {/* iPhone Hand-Drawn Mengambang Halus di Atas Podium */}
              <div
                style={{
                  transform: `translateY(${Math.sin(frame / 8) * 10}px)`,
                  width: 230,
                  height: 400,
                  borderRadius: 38,
                  backgroundColor: "#1C1917",
                  border: "6px solid #FFFBEB",
                  boxShadow: "12px 14px 0px rgba(28,25,23,0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 18,
                  gap: 14,
                  zIndex: 22,
                }}
              >
                <div style={{ fontSize: 72 }}>📱</div>
                <div
                  style={{
                    backgroundColor: "#FDE047",
                    color: "#1C1917",
                    fontFamily: FONT_NUM,
                    fontSize: 32,
                    fontWeight: 800,
                    padding: "8px 20px",
                    borderRadius: 16,
                  }}
                >
                  Rp 16,5 Jt
                </div>
              </div>

              {/* Podium Kayu Hangat Berlapis dengan Label & Contact Shadow Jelas */}
              <svg width="380" height="215" viewBox="0 0 380 215" style={{ marginTop: 10, overflow: "visible" }}>
                {/* Contact Shadow di Atas Meja */}
                <ellipse cx="190" cy="196" rx="180" ry="22" fill="rgba(28, 25, 23, 0.45)" />
                {/* Badan Podium Kayu Hangat */}
                <rect x="40" y="36" width="300" height="156" rx="14" fill="#78350F" stroke="#1C1917" strokeWidth="5" />
                <rect x="24" y="14" width="332" height="32" rx="10" fill="#D97706" stroke="#1C1917" strokeWidth="5" />
                {/* Plakat Hangat di Podium (Tidak Kosong!) */}
                <rect x="78" y="80" width="224" height="72" rx="14" fill="#FEF3C7" stroke="#1C1917" strokeWidth="4" />
                <text
                  x="190"
                  y="126"
                  textAnchor="middle"
                  fill="#1C1917"
                  fontSize="30"
                  fontWeight="800"
                  fontFamily={FONT_NUM}
                >
                  HARGA RESMI
                </text>
              </svg>
            </div>

            <div style={{ position: "absolute", top: 960, left: 30, opacity: showcasePop, zIndex: 25 }}>
              <CharacterPakBudi frame={frame} size={320} emotion="shocked" action="counting" />
            </div>
            <div style={{ position: "absolute", top: 960, right: 30, opacity: showcasePop, zIndex: 25 }}>
              <CharacterPakHendra frame={frame} size={320} emotion="happy" action="waving" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 2: JEMBATAN OBROLAN (GENTLE ZOOM-IN & PARALLAX)
// =========================================================================
const Scene2BridgeWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, 216);
  const isCloseUp = frame >= 95;
  const enterDelay = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, stiffness: 95 } });
  const camZoom = interpolate(frame, [95, 216], [1.0, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panX = interpolate(frame, [95, 216], [-32, 32], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bubblePop = spring({ frame: Math.max(0, frame - 98), fps, config: { damping: 12, stiffness: 100 } });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {!isCloseUp ? (
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, clipPath: "inset(0 50% 0 0)" }}>
            <VillageMorningWorld frame={frame} panX={interpolate(frame, [0, 95], [-20, 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          </div>
          <div style={{ position: "absolute", inset: 0, clipPath: "inset(0 0 0 50%)" }}>
            <CityShopWorld frame={frame} panX={interpolate(frame, [0, 95], [20, -20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          </div>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 8, backgroundColor: "#1C1917", transform: "translateX(-50%)", zIndex: 18 }} />

          <div
            style={{
              position: "absolute",
              top: 225,
              left: "50%",
              transform: `translateX(-50%) scale(${enterDelay})`,
              width: 820,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 28,
              padding: "20px 40px",
              boxShadow: "10px 10px 0px #1C1917",
              textAlign: "center",
              zIndex: 30,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 58, color: "#1C1917" }}>
              Jalannya Beda Jauh!
            </div>
          </div>

          <div style={{ position: "absolute", top: 760, left: 60, zIndex: 20, opacity: enterDelay }}>
            <CharacterPakBudi frame={frame} size={360} emotion="confused" action="counting" />
          </div>
          <div style={{ position: "absolute", top: 760, right: 60, zIndex: 20, opacity: enterDelay }}>
            <CharacterPakHendra frame={frame} size={360} emotion="happy" action="waving" />
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", inset: 0, transform: `scale(${camZoom})` }}>
          <VillageMorningWorld frame={frame} panX={panX} />

          <div style={{ opacity: exitOpacity, transform: `scale(${exitScale})`, position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                top: 235,
                left: "50%",
                transform: `translateX(-50%) scale(${bubblePop})`,
                width: 860,
                backgroundColor: "#FFFBEB",
                border: "5px solid #1C1917",
                borderRadius: 34,
                padding: "30px 44px",
                boxShadow: "10px 10px 0px #1C1917",
                textAlign: "center",
                zIndex: 30,
              }}
            >
              <div style={{ fontFamily: FONT_STORY, fontSize: 58, color: "#1C1917", lineHeight: 1.15 }}>
                &ldquo;Kenapa bisa gitu ya?&rdquo;
              </div>
              <div style={{ fontFamily: FONT_NUM, fontSize: 42, fontWeight: 800, color: "#DC2626", marginTop: 10 }}>
                Yuk sini kita jelasin pelan-pelan
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: 610,
                right: 160,
                fontFamily: FONT_STORY,
                fontSize: 110,
                color: "#DC2626",
                textShadow: "4px 4px 0px #FFFBEB",
                transform: `translateY(${Math.sin(frame / 6) * 12}px) rotate(12deg)`,
                zIndex: 25,
              }}
            >
              ?
            </div>

            <div style={{ position: "absolute", top: 720, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
              <CharacterPakBudi frame={frame} size={460} emotion="confused" action="counting" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 3: KONTRAS KECEPATAN (TOKO VS SAWAH + PROGRESS BAR TEBAL TANPA TEKS MIKRO)
// =========================================================================
const Scene3IncomeWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, 285);
  const isBudiFocus = frame >= 135;
  const cardPop1 = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 13, stiffness: 95 } });
  const cardPop2 = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 13, stiffness: 95 } });
  const camScale = interpolate(frame, [0, 285], [1.0, 1.10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panX = interpolate(frame, [0, 285], [-45, 45], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barFill = interpolate(frame, [145, 250], [10, 92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale})` }}>
      {!isBudiFocus ? (
        <div style={{ position: "absolute", inset: 0 }}>
          <CityShopWorld frame={frame} panX={panX} />

          <div
            style={{
              position: "absolute",
              top: 225,
              left: "50%",
              transform: `translateX(-50%) scale(${cardPop1})`,
              width: 860,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 32,
              padding: "28px 40px",
              boxShadow: "10px 10px 0px #1C1917",
              textAlign: "center",
              zIndex: 25,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 50, color: "#1C1917" }}>
              Buat Pak Hendra:
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 74, fontWeight: 800, color: "#1E3A8A", lineHeight: 1.1 }}>
              HITUNGAN HARI
            </div>
            <div style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#15803D" }}>
              Dari Perputaran Usahanya
            </div>
          </div>

          <div style={{ position: "absolute", top: 720, left: "50%", transform: "translateX(-50%)", opacity: cardPop1, zIndex: 20 }}>
            <CharacterPakHendra frame={frame} size={450} emotion="happy" action="waving" />
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", inset: 0 }}>
          <VillageMorningWorld frame={frame} panX={panX} />

          <div style={{ opacity: exitOpacity, transform: `scale(${exitScale})`, position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                top: 220,
                left: "50%",
                transform: `translateX(-50%) scale(${cardPop2})`,
                width: 860,
                backgroundColor: "#FFFBEB",
                border: "5px solid #1C1917",
                borderRadius: 32,
                padding: "28px 40px",
                boxShadow: "10px 10px 0px #1C1917",
                textAlign: "center",
                zIndex: 25,
              }}
            >
              <div style={{ fontFamily: FONT_STORY, fontSize: 50, color: "#1C1917" }}>
                Buat Pak Budi (~Rp 2 Jt/bln):
              </div>
              <div style={{ fontFamily: FONT_NUM, fontSize: 70, fontWeight: 800, color: "#DC2626", lineHeight: 1.1 }}>
                BERBULAN-BULAN
              </div>
              {/* Bar Progres Tebal Tanpa Teks Mikro di Dalamnya */}
              <div
                style={{
                  marginTop: 18,
                  width: "100%",
                  height: 28,
                  backgroundColor: "#FEF3C7",
                  border: "4px solid #1C1917",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${barFill}%`,
                    height: "100%",
                    backgroundColor: "#DC2626",
                  }}
                />
              </div>
            </div>

            <div style={{ position: "absolute", top: 730, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
              <CharacterPakBudi frame={frame} size={450} emotion="shocked" action="farming" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 4: MEJA MAKAN HANGAT (1 FOKUS BESAR PER BEAT, TANPA WADAH KOSONG)
// =========================================================================
const Scene4ExpensesWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, 309);
  const enterDelay = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, stiffness: 95 } });
  const camZoom = interpolate(frame, [0, 309], [1.0, 1.09], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panX = interpolate(frame, [0, 309], [-36, 36], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const expenseIndex = frame < 72 ? 0 : frame < 132 ? 1 : frame < 195 ? 2 : 3;
  const beatStart = expenseIndex === 0 ? 15 : expenseIndex === 1 ? 72 : expenseIndex === 2 ? 132 : 195;
  const focalPop = spring({ frame: Math.max(0, frame - beatStart), fps, config: { damping: 12, stiffness: 100 } });

  const expenses = [
    { icon: "🍚", label: "Beras & Makan", amount: "-Rp 900rb", color: "#DC2626" },
    { icon: "⚡", label: "Listrik Rumah", amount: "-Rp 400rb", color: "#DC2626" },
    { icon: "👨‍👩‍👧", label: "Kebutuhan Keluarga", amount: "-Rp 500rb", color: "#DC2626" },
    { icon: "🫙", label: "Sisa Tabungan Nyata:", amount: "Rp 200rb / bln", color: "#15803D" },
  ];
  const current = expenses[expenseIndex];

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${camZoom})` }}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v7HomeWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v7HomeWall)" />

        <g transform={`translate(${panX * 0.65}, 0)`}>
          <rect x="-100" y="0" width="1280" height="75" fill="#92400E" stroke="#1C1917" strokeWidth="4" />
          <rect x="680" y="540" width="320" height="340" rx="20" fill="#38BDF8" stroke="#1C1917" strokeWidth="6" />
          <path d="M680 760 Q840 700 1000 770 L1000 880 L680 880 Z" fill="#65A30D" />
          <circle cx="910" cy="620" r="34" fill="#FFFBEB" />
          <line x1="840" y1="540" x2="840" y2="880" stroke="#1C1917" strokeWidth="5" />
          <line x1="680" y1="710" x2="1000" y2="710" stroke="#1C1917" strokeWidth="5" />
        </g>

        <g transform={`translate(${panX * 1.4}, 0)`}>
          <rect x="-140" y="1380" width="1360" height="540" fill="#92400E" stroke="#1C1917" strokeWidth="5" />
          <rect x="-140" y="1380" width="1360" height="44" fill="#D97706" stroke="#1C1917" strokeWidth="4" />
          <rect x="820" y="1300" width="76" height="80" rx="12" fill="#FFFBEB" stroke="#1C1917" strokeWidth="4" />
          <path d="M896 1320 Q925 1340 896 1360" stroke="#1C1917" strokeWidth="5" fill="none" />
          <path d="M845 1285 Q835 1260 850 1240" stroke="#FFFBEB" strokeWidth="4" fill="none" opacity="0.8" transform={`translate(0, ${Math.sin(frame / 6) * 6})`} />
        </g>
      </svg>

      <div style={{ opacity: exitOpacity, transform: `scale(${exitScale})`, position: "absolute", inset: 0 }}>
        <div
          style={{
            position: "absolute",
            top: 225,
            left: "50%",
            transform: `translateX(-50%) scale(${focalPop})`,
            width: 860,
            backgroundColor: "#FFFBEB",
            border: "5px solid #1C1917",
            borderRadius: 34,
            padding: "28px 44px",
            boxShadow: "12px 12px 0px #1C1917",
            textAlign: "center",
            zIndex: 30,
          }}
        >
          <div style={{ fontSize: 64, lineHeight: 1.1 }}>{current.icon}</div>
          <div style={{ fontFamily: FONT_STORY, fontSize: 52, color: "#1C1917", marginTop: 4 }}>
            {current.label}
          </div>
          <div style={{ fontFamily: FONT_NUM, fontSize: 78, fontWeight: 800, color: current.color, lineHeight: 1.1 }}>
            {current.amount}
          </div>
        </div>

        <div style={{ position: "absolute", top: 865, left: "50%", transform: "translateX(-50%)", opacity: enterDelay, zIndex: 20 }}>
          <CharacterPakBudi
            frame={frame}
            size={440}
            emotion={expenseIndex === 3 ? "shocked" : "talking"}
            action="counting"
          />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: JALAN SETAPAK CAKRAWALA SORE (HIDUP SAMPAI FRAME TERAKHIR)
// =========================================================================
const Scene5TimelineWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const isClosing = frame >= 150;
  const camZoom = interpolate(frame, [0, 315], [1.0, 1.11], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panX = interpolate(frame, [0, 315], [-45, 45], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const milestonePop = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 13, stiffness: 95 } });
  const closingPop = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 13, stiffness: 95 } });
  const grassSway = Math.sin(frame / 8) * 12;

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${camZoom})` }}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v7GoldenSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="45%" stopColor="#FDE68A" />
            <stop offset="80%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v7GoldenSky)" />

        <g transform={`translate(${panX * 0.25}, 0)`}>
          <circle cx="540" cy="640" r="145" fill="#FFFBEB" opacity="0.92" />
          <ellipse cx="260" cy="400" rx="135" ry="34" fill="#FFFBEB" opacity="0.72" />
          <ellipse cx="820" cy="460" rx="155" ry="38" fill="#FFFBEB" opacity="0.72" />
        </g>

        <g transform={`translate(${panX * 0.75}, 0)`}>
          <path d="M-120 1080 Q320 960 640 1060 T1200 1000 L1200 1920 L-120 1920 Z" fill="#65A30D" stroke="#1C1917" strokeWidth="3" />
          <path d="M-120 1260 Q540 1160 1200 1280 L1200 1920 L-120 1920 Z" fill="#3F6212" />
          <path d="M480 1180 Q580 1320 420 1560 L660 1560 Q680 1320 560 1180 Z" fill="#FDE68A" stroke="#1C1917" strokeWidth="4" />
        </g>

        <g transform={`translate(${panX * 1.5 + grassSway}, 0)`}>
          <path d="M20 1920 Q60 1680 130 1560" stroke="#15803D" strokeWidth="16" fill="none" strokeLinecap="round" />
          <path d="M1060 1920 Q1010 1680 950 1560" stroke="#15803D" strokeWidth="16" fill="none" strokeLinecap="round" />
        </g>

        {/* Kunang-Kunang Senja Hangat */}
        <circle cx={220 + Math.sin(frame / 14) * 30} cy={920 + Math.cos(frame / 10) * 20} r="8" fill="#FFFBEB" opacity="0.85" />
        <circle cx={860 + Math.cos(frame / 12) * 35} cy={880 + Math.sin(frame / 11) * 25} r="7" fill="#FEF08A" opacity="0.8" />
      </svg>

      {!isClosing ? (
        <div style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              top: 225,
              left: "50%",
              transform: `translateX(-50%) scale(${milestonePop})`,
              width: 880,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 34,
              padding: "30px 44px",
              boxShadow: "10px 10px 0px #1C1917",
              textAlign: "center",
              zIndex: 30,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 50, color: "#1C1917" }}>
              Perjalanan Panjang Menabung:
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 78, fontWeight: 800, color: "#DC2626", lineHeight: 1.1 }}>
              HAMPIR 7 TAHUN
            </div>
            <div style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#15803D", marginTop: 4 }}>
              Cuma Buat 1 Ponsel!
            </div>
          </div>

          <div style={{ position: "absolute", top: 760, left: 60, opacity: milestonePop, zIndex: 20 }}>
            <CharacterPakBudi frame={frame} size={380} emotion="shocked" action="walking" />
          </div>
          <div style={{ position: "absolute", top: 760, right: 60, opacity: milestonePop, zIndex: 20 }}>
            <CharacterPakHendra frame={frame} size={380} emotion="happy" action="waving" />
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              top: 235,
              left: "50%",
              transform: `translateX(-50%) scale(${closingPop})`,
              width: 880,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 36,
              padding: "34px 44px",
              boxShadow: "12px 12px 0px #1C1917",
              textAlign: "center",
              zIndex: 30,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 56, color: "#1C1917", lineHeight: 1.18 }}>
              Masih worth it,
              <br />
              atau mending dialihin?
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: 22,
                backgroundColor: "#DC2626",
                color: "#FFFBEB",
                fontFamily: FONT_NUM,
                fontSize: 40,
                fontWeight: 800,
                padding: "16px 38px",
                borderRadius: 50,
                border: "4px solid #1C1917",
              }}
            >
              💬 Tulis Pendapatmu Ya!
            </div>
          </div>

          <div style={{ position: "absolute", top: 780, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
            <CharacterPakBudi frame={frame} size={440} emotion="talking" action="walking" />
          </div>
        </div>
      )}
    </div>
  );
};
