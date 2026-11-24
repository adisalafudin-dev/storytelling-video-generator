import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

export type IPhoneStoryV5VisualType =
  | "storyv5-hook-showcase"
  | "storyv5-bridge-question"
  | "storyv5-income-contrast"
  | "storyv5-living-expenses"
  | "storyv5-savings-timeline";

const FONT_STORY = "'Patrick Hand', cursive, sans-serif";
const FONT_NUM = "'Plus Jakarta Sans', sans-serif";

/**
 * Clean exit BEFORE TransitionSeries's 12-frame fade begins (at sceneFrames - 12).
 * Prevents any card/character overlap at 00:14, 00:23, and 00:30-00:31.
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

export const IPhoneStoryV5Visuals: React.FC<{
  type: IPhoneStoryV5VisualType;
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
      {type === "storyv5-hook-showcase" && <Scene1HookWorld frame={frame} fps={fps} />}
      {type === "storyv5-bridge-question" && <Scene2BridgeWorld frame={frame} fps={fps} />}
      {type === "storyv5-income-contrast" && <Scene3IncomeWorld frame={frame} fps={fps} />}
      {type === "storyv5-living-expenses" && <Scene4ExpensesWorld frame={frame} fps={fps} />}
      {type === "storyv5-savings-timeline" && <Scene5TimelineWorld frame={frame} fps={fps} />}
    </div>
  );
};

// =========================================================================
// KARAKTER HAND-DRAWN (PAK BUDI & PAK HENDRA)
// =========================================================================
type Emotion = "happy" | "confused" | "shocked" | "talking";

const CharacterPakBudi: React.FC<{
  size?: number;
  frame: number;
  emotion?: Emotion;
}> = ({ size = 440, frame, emotion = "happy" }) => {
  const breathY = Math.sin(frame / 12) * 4;
  const headBob = Math.sin(frame / 9) * 2.5;
  const isBlinking = frame % 85 < 5;

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
        <ellipse cx="100" cy="222" rx="72" ry="12" fill="rgba(28, 25, 23, 0.3)" />

        <g transform={`translate(0, ${breathY * 0.5})`}>
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
}> = ({ size = 440, frame, emotion = "happy" }) => {
  const breathY = Math.sin((frame + 15) / 13) * 4;
  const headBob = Math.sin((frame + 10) / 10) * 2;
  const isBlinking = (frame + 30) % 90 < 5;

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
        <ellipse cx="100" cy="222" rx="74" ry="12" fill="rgba(28, 25, 23, 0.3)" />

        <g transform={`translate(0, ${breathY * 0.5})`}>
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
// PARALLAX LAYERED WORLDS (SAWAH, TOKO, RUMAH, GOLDEN HOUR)
// =========================================================================
const VillageMorningWorld: React.FC<{ frame: number; panX?: number }> = ({ frame, panX = 0 }) => {
  const stalkSway = Math.sin(frame / 9) * 10;
  const cloudX = (frame * 0.45) % 140;
  const birdX = (frame * 2.2) % 1200;

  return (
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="v5DawnSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="44%" stopColor="#FEF08A" />
          <stop offset="76%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#84CC16" />
        </linearGradient>
        <radialGradient id="v5SunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FDE047" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* BACKGROUND LAYER (0.25x Parallax) */}
      <rect width="1080" height="1920" fill="url(#v5DawnSky)" />
      <g transform={`translate(${panX * 0.25}, 0)`}>
        <circle cx="540" cy="490" r="320" fill="url(#v5SunGlow)" />
        <circle cx="540" cy="490" r="90" fill="#FFFBEB" />

        {/* Awan Berlapis */}
        <g transform={`translate(${cloudX - 60}, 0)`} opacity="0.88">
          <ellipse cx="220" cy="290" rx="140" ry="40" fill="#FFFBEB" />
          <ellipse cx="280" cy="270" rx="90" ry="34" fill="#FFFBEB" />
          <ellipse cx="860" cy="360" rx="150" ry="44" fill="#FFFBEB" />
        </g>

        {/* Burung Terbang */}
        <g transform={`translate(${birdX - 80}, ${320 + Math.sin(frame / 6) * 14})`} stroke="#1C1917" strokeWidth="4" fill="none">
          <path d="M0 10 Q10 -4 20 10 Q30 -4 40 10" />
          <path d="M60 28 Q68 16 76 28 Q84 16 92 28" />
        </g>

        {/* Pegunungan Jauh */}
        <path d="M-80 920 Q280 750 560 880 T1160 810 L1160 1920 L-80 1920 Z" fill="#166534" opacity="0.45" />
      </g>

      {/* MIDGROUND LAYER (0.6x Parallax) */}
      <g transform={`translate(${panX * 0.6}, 0)`}>
        <path d="M-80 1020 Q340 860 660 980 T1160 940 L1160 1920 L-80 1920 Z" fill="#15803D" opacity="0.72" />
        <path d="M-80 1180 Q540 1080 1160 1200 L1160 1920 L-80 1920 Z" fill="#65A30D" stroke="#1C1917" strokeWidth="3" />
        <path d="M-80 1320 Q540 1240 1160 1350 L1160 1920 L-80 1920 Z" fill="#4D7C0F" stroke="#1C1917" strokeWidth="3" />

        {/* Pohon Kelapa & Gubuk Bambu */}
        <g transform="translate(80, 790)">
          <path d="M40 240 Q55 130 30 30" stroke="#78350F" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M30 30 Q-30 10 -50 60 M30 30 Q90 0 120 50 M30 30 Q40 -30 80 -10" stroke="#15803D" strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>
        <g transform="translate(780, 950)">
          <rect x="20" y="70" width="130" height="95" fill="#92400E" stroke="#1C1917" strokeWidth="4" />
          <polygon points="0,75 85,10 170,75" fill="#B45309" stroke="#1C1917" strokeWidth="4" />
        </g>
      </g>

      {/* FOREGROUND LAYER (1.2x Parallax + Wind Sway) */}
      <g transform={`translate(${panX * 1.2 + stalkSway}, 0)`} stroke="#1C1917" strokeWidth="3">
        <path d="M-80 1490 Q540 1420 1160 1510 L1160 1920 L-80 1920 Z" fill="#3F6212" />
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
  const lampSway = Math.sin(frame / 14) * 3.5;

  return (
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="v5ShopWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="60%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="v5ShopLamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* BACKGROUND */}
      <rect width="1080" height="1920" fill="url(#v5ShopWall)" />
      <g transform={`translate(${panX * 0.3}, 0)`}>
        <rect x="260" y="340" width="560" height="540" rx="24" fill="#38BDF8" stroke="#1C1917" strokeWidth="6" />
        <rect x="310" y="540" width="90" height="340" fill="#1E3A8A" opacity="0.65" />
        <rect x="430" y="460" width="110" height="420" fill="#1E3A8A" opacity="0.8" />
        <rect x="570" y="510" width="100" height="370" fill="#1E3A8A" opacity="0.65" />
        <rect x="700" y="580" width="80" height="300" fill="#1E3A8A" opacity="0.75" />
        <line x1="540" y1="340" x2="540" y2="880" stroke="#1C1917" strokeWidth="6" />
      </g>

      {/* MIDGROUND (Lampu Gantung & Rak Barang) */}
      <g transform={`translate(${panX * 0.65}, 0)`}>
        <g transform={`rotate(${lampSway}, 240, 0)`}>
          <line x1="240" y1="0" x2="240" y2="300" stroke="#1C1917" strokeWidth="5" />
          <path d="M190 320 L290 320 L265 280 L215 280 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="4" />
          <circle cx="240" cy="350" r="130" fill="url(#v5ShopLamp)" />
        </g>
        <g transform={`rotate(${-lampSway}, 840, 0)`}>
          <line x1="840" y1="0" x2="840" y2="300" stroke="#1C1917" strokeWidth="5" />
          <path d="M790 320 L890 320 L865 280 L815 280 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="4" />
          <circle cx="840" cy="350" r="130" fill="url(#v5ShopLamp)" />
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

      {/* FOREGROUND (Meja Kasir & Awning Atas) */}
      <g transform={`translate(${panX * 1.1}, 0)`}>
        <rect x="-60" y="1350" width="1200" height="570" fill="#92400E" stroke="#1C1917" strokeWidth="5" />
        <rect x="-60" y="1350" width="1200" height="45" fill="#D97706" stroke="#1C1917" strokeWidth="4" />
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 1: HOOK DUA TOKOH & SATU IPHONE (CLEAN BEAT TRANSITIONS)
// =========================================================================
const Scene1HookWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, 336);

  const isBeat1 = frame < 105;
  const isBeat2 = frame >= 105 && frame < 205;
  const isBeat3 = frame >= 205;

  // Slow dolly-in + smooth horizontal pan per beat
  const camScale1 = interpolate(frame, [0, 105], [1.0, 1.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pan1 = interpolate(frame, [0, 105], [-18, 18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const camScale2 = interpolate(frame, [105, 205], [1.0, 1.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pan2 = interpolate(frame, [105, 205], [18, -18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const camScale3 = interpolate(frame, [205, 336], [1.0, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const titlePop1 = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const titlePop2 = spring({ frame: Math.max(0, frame - 107), fps, config: { damping: 14, stiffness: 90 } });
  const titlePop3 = spring({ frame: Math.max(0, frame - 207), fps, config: { damping: 14, stiffness: 90 } });

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
              Petani di Desa
            </div>
          </div>

          <div style={{ position: "absolute", top: 690, left: "50%", transform: "translateX(-50%)", zIndex: 15 }}>
            <CharacterPakBudi frame={frame} size={460} emotion="happy" />
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
              Pemilik Toko
            </div>
          </div>

          <div style={{ position: "absolute", top: 690, left: "50%", transform: "translateX(-50%)", zIndex: 15 }}>
            <CharacterPakHendra frame={frame} size={460} emotion="happy" />
          </div>
        </div>
      )}

      {isBeat3 && (
        <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale3})` }}>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="v5BoutiqueBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="55%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            <rect width="1080" height="1920" fill="url(#v5BoutiqueBg)" />
            <polygon points="540,140 160,1500 920,1500" fill="#FFFBEB" opacity="0.45" />
            <rect x="0" y="1420" width="1080" height="500" fill="#92400E" stroke="#1C1917" strokeWidth="5" />
            <rect x="340" y="1220" width="400" height="220" rx="16" fill="#FFFBEB" stroke="#1C1917" strokeWidth="5" />
          </svg>

          <div style={{ opacity: exitOpacity, transform: `scale(${exitScale})`, position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                top: 220,
                left: "50%",
                transform: `translateX(-50%) scale(${titlePop3})`,
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
                Satu iPhone • Harga Sama Persis
              </div>
              <div style={{ fontFamily: FONT_NUM, fontSize: 68, fontWeight: 800, color: "#DC2626" }}>
                Rp 16,5 Juta
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: "51%",
                left: "50%",
                transform: `translate(-50%, -50%) translateY(${Math.sin(frame / 8) * 10}px)`,
                zIndex: 20,
              }}
            >
              <div
                style={{
                  width: 240,
                  height: 440,
                  borderRadius: 40,
                  backgroundColor: "#1C1917",
                  border: "6px solid #FFFBEB",
                  boxShadow: "12px 14px 0px rgba(28,25,23,0.45)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 72 }}>📱</div>
                <div
                  style={{
                    backgroundColor: "#FDE047",
                    color: "#1C1917",
                    fontFamily: FONT_NUM,
                    fontSize: 34,
                    fontWeight: 800,
                    padding: "8px 22px",
                    borderRadius: 16,
                  }}
                >
                  Rp 16,5 Jt
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", top: 960, left: 30, zIndex: 25 }}>
              <CharacterPakBudi frame={frame} size={320} emotion="shocked" />
            </div>
            <div style={{ position: "absolute", top: 960, right: 30, zIndex: 25 }}>
              <CharacterPakHendra frame={frame} size={320} emotion="happy" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 2: JEMBATAN OBROLAN (CLEAN EXIT AT 00:14!)
// =========================================================================
const Scene2BridgeWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, 216);
  const isCloseUp = frame >= 95;
  const enterDelay = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, stiffness: 95 } });
  const camZoom = interpolate(frame, [95, 216], [1.0, 1.07], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panX = interpolate(frame, [95, 216], [-14, 14], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bubblePop = spring({ frame: Math.max(0, frame - 98), fps, config: { damping: 12, stiffness: 100 } });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {!isCloseUp ? (
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, clipPath: "inset(0 50% 0 0)" }}>
            <VillageMorningWorld frame={frame} />
          </div>
          <div style={{ position: "absolute", inset: 0, clipPath: "inset(0 0 0 50%)" }}>
            <CityShopWorld frame={frame} />
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
              Pengorbanan Beda Jauh!
            </div>
          </div>

          <div style={{ position: "absolute", top: 760, left: 60, zIndex: 20, opacity: enterDelay }}>
            <CharacterPakBudi frame={frame} size={360} emotion="confused" />
          </div>
          <div style={{ position: "absolute", top: 760, right: 60, zIndex: 20, opacity: enterDelay }}>
            <CharacterPakHendra frame={frame} size={360} emotion="happy" />
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
              <CharacterPakBudi frame={frame} size={460} emotion="confused" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 3: KONTRAS PENGHASILAN KOTOR (CLEAN ENTRY & EXIT)
// =========================================================================
const Scene3IncomeWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, 285);
  const isBudiFocus = frame >= 135;
  const cardPop1 = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 13, stiffness: 95 } });
  const cardPop2 = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 13, stiffness: 95 } });
  const camScale = interpolate(frame, [0, 285], [1.0, 1.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panX = interpolate(frame, [0, 285], [-18, 18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
            <CharacterPakHendra frame={frame} size={450} emotion="happy" />
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", inset: 0 }}>
          <VillageMorningWorld frame={frame} panX={panX} />

          <div style={{ opacity: exitOpacity, transform: `scale(${exitScale})`, position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                top: 225,
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
              <div style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#1C1917" }}>
                Kerja Keras Bertahap
              </div>
            </div>

            <div style={{ position: "absolute", top: 720, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
              <CharacterPakBudi frame={frame} size={450} emotion="shocked" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 4: RUMAH KAYU DESA & POTONGAN HIDUP (CLEAN EXIT AT 00:30-00:31!)
// =========================================================================
const Scene4ExpensesWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, 309);
  const showClimax = frame >= 195;
  const enterDelay = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, stiffness: 95 } });
  const item1 = spring({ frame: Math.max(0, frame - 24), fps, config: { damping: 14, stiffness: 95 } });
  const item2 = spring({ frame: Math.max(0, frame - 78), fps, config: { damping: 14, stiffness: 95 } });
  const item3 = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 14, stiffness: 95 } });
  const climaxPop = spring({ frame: Math.max(0, frame - 198), fps, config: { damping: 12, stiffness: 100 } });
  const camZoom = interpolate(frame, [0, 309], [1.0, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panX = interpolate(frame, [0, 309], [-12, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${camZoom})` }}>
      {/* Latar Rumah Kayu Desa dengan Jendela Sawah & Cangkir Teh Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v5HomeWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v5HomeWall)" />

        {/* Balok Kayu Rumah (Midground) */}
        <g transform={`translate(${panX * 0.5}, 0)`}>
          <rect x="0" y="0" width="1080" height="75" fill="#92400E" stroke="#1C1917" strokeWidth="4" />
          <rect x="640" y="250" width="340" height="390" rx="20" fill="#38BDF8" stroke="#1C1917" strokeWidth="6" />
          <path d="M640 500 Q800 440 980 510 L980 640 L640 640 Z" fill="#65A30D" />
          <circle cx="880" cy="340" r="38" fill="#FFFBEB" />
          <line x1="810" y1="250" x2="810" y2="640" stroke="#1C1917" strokeWidth="5" />
          <line x1="640" y1="450" x2="980" y2="450" stroke="#1C1917" strokeWidth="5" />
        </g>

        {/* Meja Kayu & Cangkir Teh Hangat (Foreground Parallax) */}
        <g transform={`translate(${panX * 1.1}, 0)`}>
          <rect x="-60" y="1380" width="1200" height="540" fill="#92400E" stroke="#1C1917" strokeWidth="5" />
          <rect x="-60" y="1380" width="1200" height="44" fill="#D97706" stroke="#1C1917" strokeWidth="4" />
          {/* Cangkir Teh */}
          <rect x="820" y="1300" width="76" height="80" rx="12" fill="#FFFBEB" stroke="#1C1917" strokeWidth="4" />
          <path d="M896 1320 Q925 1340 896 1360" stroke="#1C1917" strokeWidth="5" fill="none" />
          <path d="M845 1285 Q835 1260 850 1240" stroke="#FFFBEB" strokeWidth="4" fill="none" opacity="0.8" transform={`translate(0, ${Math.sin(frame / 6) * 6})`} />
        </g>
      </svg>

      {/* Karakter + Kartu dengan Clean Exit sebelum Scene 5 */}
      <div style={{ opacity: exitOpacity, transform: `scale(${exitScale})`, position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", top: 310, left: 60, opacity: enterDelay, zIndex: 15 }}>
          <CharacterPakBudi frame={frame} size={320} emotion={showClimax ? "shocked" : "talking"} />
        </div>

        {!showClimax ? (
          <div
            style={{
              position: "absolute",
              top: 710,
              left: "50%",
              transform: "translateX(-50%)",
              width: 880,
              display: "flex",
              flexDirection: "column",
              gap: 24,
              zIndex: 25,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 56, color: "#1C1917", textAlign: "center" }}>
              Potongan Wajib Tiap Bulan:
            </div>

            <div
              style={{
                transform: `scale(${item1})`,
                opacity: item1,
                backgroundColor: "#FFFBEB",
                border: "5px solid #1C1917",
                borderRadius: 24,
                padding: "22px 36px",
                boxShadow: "8px 8px 0px #1C1917",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: FONT_STORY, fontSize: 46, color: "#1C1917" }}>🍚 Beras &amp; Makan</span>
              <span style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 800, color: "#DC2626" }}>-Rp 900rb</span>
            </div>

            <div
              style={{
                transform: `scale(${item2})`,
                opacity: item2,
                backgroundColor: "#FFFBEB",
                border: "5px solid #1C1917",
                borderRadius: 24,
                padding: "22px 36px",
                boxShadow: "8px 8px 0px #1C1917",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: FONT_STORY, fontSize: 46, color: "#1C1917" }}>⚡ Listrik &amp; Air</span>
              <span style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 800, color: "#DC2626" }}>-Rp 400rb</span>
            </div>

            <div
              style={{
                transform: `scale(${item3})`,
                opacity: item3,
                backgroundColor: "#FFFBEB",
                border: "5px solid #1C1917",
                borderRadius: 24,
                padding: "22px 36px",
                boxShadow: "8px 8px 0px #1C1917",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: FONT_STORY, fontSize: 46, color: "#1C1917" }}>🎒 Sekolah Anak</span>
              <span style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 800, color: "#DC2626" }}>-Rp 500rb</span>
            </div>
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: 750,
              left: "50%",
              transform: `translateX(-50%) scale(${climaxPop})`,
              width: 860,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 36,
              padding: "40px 44px",
              boxShadow: "12px 12px 0px #1C1917",
              textAlign: "center",
              zIndex: 30,
            }}
          >
            <div style={{ fontSize: 76, marginBottom: 8 }}>🫙</div>
            <div style={{ fontFamily: FONT_STORY, fontSize: 52, color: "#1C1917" }}>
              Sisa Tabungan Nyata:
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 72, fontWeight: 800, color: "#15803D", marginTop: 6 }}>
              Rp 200rb / bln
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: WORLD GOLDEN-HOUR PENUTUP (CLEAN ENTRY + HIDUP SAMPAI AKHIR)
// =========================================================================
const Scene5TimelineWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const isClosing = frame >= 150;
  const camZoom = interpolate(frame, [0, 315], [1.0, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panX = interpolate(frame, [0, 315], [-16, 16], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const milestonePop = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 13, stiffness: 95 } });
  const closingPop = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 13, stiffness: 95 } });
  const grassSway = Math.sin(frame / 10) * 8;

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${camZoom})` }}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v5GoldenSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="45%" stopColor="#FDE68A" />
            <stop offset="80%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v5GoldenSky)" />

        <g transform={`translate(${panX * 0.3}, 0)`}>
          <circle cx="540" cy="640" r="140" fill="#FFFBEB" opacity="0.9" />
          <ellipse cx="260" cy="400" rx="130" ry="34" fill="#FFFBEB" opacity="0.7" />
          <ellipse cx="820" cy="460" rx="150" ry="38" fill="#FFFBEB" opacity="0.7" />
        </g>

        <g transform={`translate(${panX * 0.65}, 0)`}>
          <path d="M-80 1080 Q320 960 640 1060 T1160 1000 L1160 1920 L-80 1920 Z" fill="#65A30D" stroke="#1C1917" strokeWidth="3" />
          <path d="M-80 1260 Q540 1160 1160 1280 L1160 1920 L-80 1920 Z" fill="#3F6212" />
          <path d="M480 1180 Q580 1320 420 1560 L660 1560 Q680 1320 560 1180 Z" fill="#FDE68A" stroke="#1C1917" strokeWidth="4" />
        </g>

        <g transform={`translate(${panX * 1.15 + grassSway}, 0)`}>
          <path d="M20 1920 Q60 1680 130 1560" stroke="#15803D" strokeWidth="16" fill="none" strokeLinecap="round" />
          <path d="M1060 1920 Q1010 1680 950 1560" stroke="#15803D" strokeWidth="16" fill="none" strokeLinecap="round" />
        </g>
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
              Waktu Menabung Pak Budi:
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 78, fontWeight: 800, color: "#DC2626", lineHeight: 1.1 }}>
              HAMPIR 7 TAHUN
            </div>
            <div style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#15803D", marginTop: 4 }}>
              Cuma Buat 1 Ponsel!
            </div>
          </div>

          <div style={{ position: "absolute", top: 760, left: 60, opacity: milestonePop, zIndex: 20 }}>
            <CharacterPakBudi frame={frame} size={380} emotion="shocked" />
          </div>
          <div style={{ position: "absolute", top: 760, right: 60, opacity: milestonePop, zIndex: 20 }}>
            <CharacterPakHendra frame={frame} size={380} emotion="happy" />
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
            <CharacterPakBudi frame={frame} size={440} emotion="talking" />
          </div>
        </div>
      )}
    </div>
  );
};
