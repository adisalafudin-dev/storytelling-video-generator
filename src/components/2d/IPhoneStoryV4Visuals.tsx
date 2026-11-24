import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

export type IPhoneStoryV4VisualType =
  | "storyv4-hook-showcase"
  | "storyv4-bridge-question"
  | "storyv4-income-contrast"
  | "storyv4-living-expenses"
  | "storyv4-savings-timeline";

const FONT_STORY = "'Patrick Hand', cursive, sans-serif";
const FONT_NUM = "'Plus Jakarta Sans', sans-serif";

export const IPhoneStoryV4Visuals: React.FC<{
  type: IPhoneStoryV4VisualType;
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
      {type === "storyv4-hook-showcase" && <Scene1HookWorld frame={frame} fps={fps} />}
      {type === "storyv4-bridge-question" && <Scene2BridgeWorld frame={frame} fps={fps} />}
      {type === "storyv4-income-contrast" && <Scene3IncomeWorld frame={frame} fps={fps} />}
      {type === "storyv4-living-expenses" && <Scene4ExpensesWorld frame={frame} fps={fps} />}
      {type === "storyv4-savings-timeline" && <Scene5TimelineWorld frame={frame} fps={fps} />}
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
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 200 230"
        fill="none"
        style={{ overflow: "visible" }}
      >
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
          <path
            d="M70 132 C68 160 74 185 76 200 M130 132 C132 160 126 185 124 200"
            stroke="#FFFBEB"
            strokeWidth="10"
            strokeLinecap="round"
          />
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

          {/* Caping Bambu */}
          <g transform="translate(0, -8)">
            <path
              d="M28 74 Q100 14 172 74 Q100 84 28 74 Z"
              fill="#F59E0B"
              stroke="#1C1917"
              strokeWidth="4"
              strokeLinejoin="round"
            />
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
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 200 230"
        fill="none"
        style={{ overflow: "visible" }}
      >
        <ellipse cx="100" cy="222" rx="74" ry="12" fill="rgba(28, 25, 23, 0.3)" />

        <g transform={`translate(0, ${breathY * 0.5})`}>
          <path
            d="M44 148 C44 128 72 124 100 124 C128 124 156 128 156 148 L162 215 L38 215 Z"
            fill="#1E3A8A"
            stroke="#1C1917"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M84 124 L100 156 L116 124 Z" fill="#FFFBEB" stroke="#1C1917" strokeWidth="2.5" />
          <path d="M96 135 L104 135 L106 185 L100 194 L94 185 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="2" />
        </g>

        <g transform={`translate(0, ${breathY}) rotate(${headBob}, 100, 95)`}>
          <rect x="90" y="110" width="20" height="20" fill="#F59E0B" />
          <ellipse cx="100" cy="92" rx="40" ry="38" fill="#FDE68A" stroke="#1C1917" strokeWidth="3.5" />
          <circle cx="58" cy="94" r="8" fill="#FDE68A" stroke="#1C1917" strokeWidth="3" />
          <circle cx="142" cy="94" r="8" fill="#FDE68A" stroke="#1C1917" strokeWidth="3" />

          <path
            d="M60 80 C58 55 82 44 108 46 C132 48 142 62 140 80 C130 66 112 62 92 64 C78 66 66 72 60 80 Z"
            fill="#1C1917"
          />

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

          {/* Kacamata */}
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
// REUSABLE HAND-DRAWN WORLD BACKDROPS (GAYA #3 WARM & HIDUP)
// =========================================================================
const VillageMorningWorld: React.FC<{ frame: number }> = ({ frame }) => {
  const stalkSway = Math.sin(frame / 9) * 8;
  const cloudX = (frame * 0.4) % 120;
  const birdX = (frame * 2.1) % 1200;

  return (
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="v4DawnSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="42%" stopColor="#FEF08A" />
          <stop offset="75%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#84CC16" />
        </linearGradient>
        <radialGradient id="v4SunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FDE047" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1080" height="1920" fill="url(#v4DawnSky)" />
      <circle cx="540" cy="480" r="300" fill="url(#v4SunGlow)" />
      <circle cx="540" cy="480" r="88" fill="#FFFBEB" />

      {/* Awan Pagi Melayang */}
      <g transform={`translate(${cloudX - 60}, 0)`} opacity="0.85">
        <ellipse cx="240" cy="300" rx="130" ry="38" fill="#FFFBEB" />
        <ellipse cx="300" cy="280" rx="85" ry="32" fill="#FFFBEB" />
        <ellipse cx="860" cy="360" rx="145" ry="42" fill="#FFFBEB" />
      </g>

      {/* Burung Terbang */}
      <g transform={`translate(${birdX - 80}, ${320 + Math.sin(frame / 6) * 14})`} stroke="#1C1917" strokeWidth="4" fill="none">
        <path d="M0 10 Q10 -4 20 10 Q30 -4 40 10" />
        <path d="M60 28 Q68 16 76 28 Q84 16 92 28" />
      </g>

      {/* Bukit Jauh */}
      <path d="M0 920 Q280 760 540 880 T1080 820 L1080 1920 L0 1920 Z" fill="#166534" opacity="0.45" />
      <path d="M0 1020 Q340 860 660 980 T1080 940 L1080 1920 L0 1920 Z" fill="#15803D" opacity="0.7" />

      {/* Sawah Hijau Terasering */}
      <path d="M0 1180 Q540 1080 1080 1200 L1080 1920 L0 1920 Z" fill="#65A30D" stroke="#1C1917" strokeWidth="3" />
      <path d="M0 1320 Q540 1240 1080 1350 L1080 1920 L0 1920 Z" fill="#4D7C0F" stroke="#1C1917" strokeWidth="3" />
      <path d="M0 1480 Q540 1400 1080 1500 L1080 1920 L0 1920 Z" fill="#3F6212" />

      {/* Gubuk Bambu */}
      <g transform="translate(760, 960)">
        <rect x="20" y="70" width="120" height="90" fill="#92400E" stroke="#1C1917" strokeWidth="4" />
        <polygon points="0,75 80,10 160,75" fill="#B45309" stroke="#1C1917" strokeWidth="4" />
      </g>

      {/* Batang Padi Foreground Berayun */}
      <g transform={`translate(${stalkSway}, 0)`} stroke="#1C1917" strokeWidth="3">
        <path d="M-10 1920 Q40 1660 110 1520" stroke="#15803D" strokeWidth="14" fill="none" strokeLinecap="round" />
        <ellipse cx="110" cy="1510" rx="22" ry="11" fill="#FDE047" transform="rotate(-35 110 1510)" />
        <path d="M1090 1920 Q1040 1660 970 1510" stroke="#15803D" strokeWidth="14" fill="none" strokeLinecap="round" />
        <ellipse cx="970" cy="1500" rx="22" ry="11" fill="#FDE047" transform="rotate(35 970 1500)" />
      </g>
    </svg>
  );
};

const CityShopWorld: React.FC<{ frame: number }> = ({ frame }) => {
  const lampSway = Math.sin(frame / 14) * 3;

  return (
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="v4ShopWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="60%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="v4ShopLamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1080" height="1920" fill="url(#v4ShopWall)" />

      {/* Jendela Besar Toko Menghadap Kota */}
      <rect x="260" y="340" width="560" height="540" rx="24" fill="#38BDF8" stroke="#1C1917" strokeWidth="6" />
      <rect x="310" y="540" width="90" height="340" fill="#1E3A8A" opacity="0.65" />
      <rect x="430" y="460" width="110" height="420" fill="#1E3A8A" opacity="0.8" />
      <rect x="570" y="510" width="100" height="370" fill="#1E3A8A" opacity="0.65" />
      <rect x="700" y="580" width="80" height="300" fill="#1E3A8A" opacity="0.75" />
      <line x1="540" y1="340" x2="540" y2="880" stroke="#1C1917" strokeWidth="6" />

      {/* Lampu Gantung Toko Berayun */}
      <g transform={`rotate(${lampSway}, 240, 0)`}>
        <line x1="240" y1="0" x2="240" y2="300" stroke="#1C1917" strokeWidth="5" />
        <path d="M190 320 L290 320 L265 280 L215 280 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="4" />
        <circle cx="240" cy="350" r="120" fill="url(#v4ShopLamp)" />
      </g>
      <g transform={`rotate(${-lampSway}, 840, 0)`}>
        <line x1="840" y1="0" x2="840" y2="300" stroke="#1C1917" strokeWidth="5" />
        <path d="M790 320 L890 320 L865 280 L815 280 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="4" />
        <circle cx="840" cy="350" r="120" fill="url(#v4ShopLamp)" />
      </g>

      {/* Rak Toko di Kiri & Kanan */}
      <rect x="40" y="520" width="170" height="880" rx="12" fill="#B45309" stroke="#1C1917" strokeWidth="4" />
      <line x1="40" y1="700" x2="210" y2="700" stroke="#1C1917" strokeWidth="5" />
      <line x1="40" y1="900" x2="210" y2="900" stroke="#1C1917" strokeWidth="5" />
      <line x1="40" y1="1100" x2="210" y2="1100" stroke="#1C1917" strokeWidth="5" />

      <rect x="870" y="520" width="170" height="880" rx="12" fill="#B45309" stroke="#1C1917" strokeWidth="4" />
      <line x1="870" y1="700" x2="1040" y2="700" stroke="#1C1917" strokeWidth="5" />
      <line x1="870" y1="900" x2="1040" y2="900" stroke="#1C1917" strokeWidth="5" />
      <line x1="870" y1="1100" x2="1040" y2="1100" stroke="#1C1917" strokeWidth="5" />

      {/* Meja Kasir Kayu Hangat */}
      <rect x="0" y="1350" width="1080" height="570" fill="#92400E" stroke="#1C1917" strokeWidth="5" />
      <rect x="0" y="1350" width="1080" height="45" fill="#D97706" stroke="#1C1917" strokeWidth="4" />
    </svg>
  );
};

// =========================================================================
// SCENE 1: HOOK DUA TOKOH & SATU IPHONE (3 BEAT PATTERN INTERRUPT)
// =========================================================================
const Scene1HookWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const isBeat1 = frame < 82;
  const isBeat2 = frame >= 82 && frame < 164;
  const isBeat3 = frame >= 164;

  const camScale1 = interpolate(frame, [0, 82], [1.0, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const camScale2 = interpolate(frame, [82, 164], [1.0, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const camScale3 = interpolate(frame, [164, 246], [1.0, 1.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const titlePop1 = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const titlePop2 = spring({ frame: frame - 82, fps, config: { damping: 14, stiffness: 90 } });
  const titlePop3 = spring({ frame: frame - 164, fps, config: { damping: 14, stiffness: 90 } });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* BEAT 1: PAK BUDI DI SAWAH PAGI */}
      {isBeat1 && (
        <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale1})` }}>
          <VillageMorningWorld frame={frame} />

          <div
            style={{
              position: "absolute",
              top: 230,
              left: 72,
              transform: `scale(${titlePop1})`,
              transformOrigin: "left top",
              backgroundColor: "#FFFBEB",
              border: "4px solid #1C1917",
              borderRadius: 24,
              padding: "18px 34px",
              boxShadow: "8px 8px 0px #1C1917",
              zIndex: 20,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 60, color: "#1C1917", lineHeight: 1.05 }}>
              Pak Budi
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 34, fontWeight: 800, color: "#15803D" }}>
              Petani di Desa
            </div>
          </div>

          <div style={{ position: "absolute", top: 690, left: "50%", transform: "translateX(-50%)", zIndex: 15 }}>
            <CharacterPakBudi frame={frame} size={460} emotion="happy" />
          </div>
        </div>
      )}

      {/* BEAT 2: PAK HENDRA DI TOKO KOTA */}
      {isBeat2 && (
        <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale2})` }}>
          <CityShopWorld frame={frame} />

          <div
            style={{
              position: "absolute",
              top: 230,
              left: "50%",
              transform: `translateX(-50%) scale(${titlePop2})`,
              backgroundColor: "#FFFBEB",
              border: "4px solid #1C1917",
              borderRadius: 24,
              padding: "18px 40px",
              boxShadow: "8px 8px 0px #1C1917",
              textAlign: "center",
              zIndex: 20,
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 60, color: "#1C1917", lineHeight: 1.05 }}>
              Pak Hendra
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 34, fontWeight: 800, color: "#1E3A8A" }}>
              Pemilik Toko
            </div>
          </div>

          <div style={{ position: "absolute", top: 690, left: "50%", transform: "translateX(-50%)", zIndex: 15 }}>
            <CharacterPakHendra frame={frame} size={460} emotion="happy" />
          </div>
        </div>
      )}

      {/* BEAT 3: ETALASE BERSAMA HANGAT (BUKAN LATAR GELAP) */}
      {isBeat3 && (
        <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale3})` }}>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="v4BoutiqueBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="55%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            <rect width="1080" height="1920" fill="url(#v4BoutiqueBg)" />
            <polygon points="540,140 160,1500 920,1500" fill="#FFFBEB" opacity="0.45" />
            <rect x="0" y="1420" width="1080" height="500" fill="#92400E" stroke="#1C1917" strokeWidth="5" />
            <rect x="340" y="1220" width="400" height="220" rx="16" fill="#FFFBEB" stroke="#1C1917" strokeWidth="5" />
          </svg>

          {/* Harga Besar di Atas */}
          <div
            style={{
              position: "absolute",
              top: 220,
              left: "50%",
              transform: `translateX(-50%) scale(${titlePop3})`,
              backgroundColor: "#FFFBEB",
              border: "4px solid #1C1917",
              borderRadius: 28,
              padding: "20px 44px",
              boxShadow: "8px 8px 0px #1C1917",
              textAlign: "center",
              zIndex: 30,
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#1C1917" }}>
              Satu iPhone • Harga Sama Persis
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 66, fontWeight: 800, color: "#DC2626" }}>
              Rp 16,5 Juta
            </div>
          </div>

          {/* iPhone Hand-Drawn */}
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
                  fontSize: 32,
                  fontWeight: 800,
                  padding: "8px 20px",
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
      )}
    </div>
  );
};

// =========================================================================
// SCENE 2: JEMBATAN OBROLAN ("KENAPA GITU? YUK SINI KITA JELASIN!")
// =========================================================================
const Scene2BridgeWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const isCloseUp = frame >= 95;
  const camZoom = interpolate(frame, [95, 204], [1.0, 1.07], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bubblePop = spring({ frame: frame - 98, fps, config: { damping: 12, stiffness: 100 } });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {!isCloseUp ? (
        /* Beat 1: Split World Desa vs Toko */
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
              top: 230,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#FFFBEB",
              border: "4px solid #1C1917",
              borderRadius: 24,
              padding: "16px 36px",
              boxShadow: "8px 8px 0px #1C1917",
              zIndex: 30,
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 54, color: "#1C1917" }}>
              Pengorbanan Beda Jauh!
            </div>
          </div>

          <div style={{ position: "absolute", top: 760, left: 60, zIndex: 20 }}>
            <CharacterPakBudi frame={frame} size={360} emotion="confused" />
          </div>
          <div style={{ position: "absolute", top: 760, right: 60, zIndex: 20 }}>
            <CharacterPakHendra frame={frame} size={360} emotion="happy" />
          </div>
        </div>
      ) : (
        /* Beat 2: Pattern Interrupt Close-up Pak Budi + Balon Dialog Hangat */
        <div style={{ position: "absolute", inset: 0, transform: `scale(${camZoom})` }}>
          <VillageMorningWorld frame={frame} />

          <div
            style={{
              position: "absolute",
              top: 250,
              left: "50%",
              transform: `translateX(-50%) scale(${bubblePop})`,
              width: 860,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 36,
              padding: "32px 44px",
              boxShadow: "10px 10px 0px #1C1917",
              textAlign: "center",
              zIndex: 30,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 58, color: "#1C1917", lineHeight: 1.15 }}>
              &ldquo;Kenapa bisa gitu ya?&rdquo;
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 800, color: "#DC2626", marginTop: 10 }}>
              Yuk sini kita jelasin!
            </div>
          </div>

          {/* Tanda Tanya Mengambang */}
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
      )}
    </div>
  );
};

// =========================================================================
// SCENE 3: KONTRAS PENGHASILAN KOTOR (3 HARI VS 8 BULAN)
// =========================================================================
const Scene3IncomeWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const isBudiFocus = frame >= 126;
  const cardPop1 = spring({ frame: frame - 8, fps, config: { damping: 13, stiffness: 95 } });
  const cardPop2 = spring({ frame: frame - 132, fps, config: { damping: 13, stiffness: 95 } });
  const camScale = interpolate(frame, [0, 264], [1.0, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${camScale})` }}>
      {!isBudiFocus ? (
        /* Beat 1: Dunia Toko Pak Hendra (3 Hari) */
        <div style={{ position: "absolute", inset: 0 }}>
          <CityShopWorld frame={frame} />

          <div
            style={{
              position: "absolute",
              top: 230,
              left: "50%",
              transform: `translateX(-50%) scale(${cardPop1})`,
              width: 840,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 32,
              padding: "28px 40px",
              boxShadow: "10px 10px 0px #1C1917",
              textAlign: "center",
              zIndex: 25,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 48, color: "#1C1917" }}>
              Bagi Pak Hendra:
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 78, fontWeight: 800, color: "#1E3A8A", lineHeight: 1.1 }}>
              CUMA 3 HARI
            </div>
            <div style={{ fontFamily: FONT_STORY, fontSize: 42, color: "#15803D" }}>
              Keuntungan Toko = Rp 16,5 Juta
            </div>
          </div>

          <div style={{ position: "absolute", top: 720, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
            <CharacterPakHendra frame={frame} size={450} emotion="happy" />
          </div>
        </div>
      ) : (
        /* Beat 2: Pattern Interrupt ke Dunia Desa Pak Budi (8 Bulan Tanpa Makan) */
        <div style={{ position: "absolute", inset: 0 }}>
          <VillageMorningWorld frame={frame} />

          <div
            style={{
              position: "absolute",
              top: 230,
              left: "50%",
              transform: `translateX(-50%) scale(${cardPop2})`,
              width: 840,
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 32,
              padding: "28px 40px",
              boxShadow: "10px 10px 0px #1C1917",
              textAlign: "center",
              zIndex: 25,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 48, color: "#1C1917" }}>
              Bagi Pak Budi (Gaji ~2 Jt):
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 78, fontWeight: 800, color: "#DC2626", lineHeight: 1.1 }}>
              8 BULAN PENUH
            </div>
            <div style={{ fontFamily: FONT_STORY, fontSize: 42, color: "#1C1917" }}>
              Kerja Keras Tanpa Makan!
            </div>
          </div>

          <div style={{ position: "absolute", top: 720, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
            <CharacterPakBudi frame={frame} size={450} emotion="shocked" />
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 4: POTONGAN KEBUTUHAN HIDUP DI RUMAH DESA (NO MICRO-TEXT)
// =========================================================================
const Scene4ExpensesWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const showClimax = frame >= 175;
  const item1 = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 95 } });
  const item2 = spring({ frame: frame - 65, fps, config: { damping: 14, stiffness: 95 } });
  const item3 = spring({ frame: frame - 115, fps, config: { damping: 14, stiffness: 95 } });
  const climaxPop = spring({ frame: frame - 175, fps, config: { damping: 12, stiffness: 100 } });
  const camZoom = interpolate(frame, [0, 276], [1.0, 1.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${camZoom})` }}>
      {/* World Interior Rumah Kayu Desa Menghadap Sawah */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v4HomeWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v4HomeWall)" />

        {/* Jendela Terbuka ke Pemandangan Pagi */}
        <rect x="640" y="260" width="340" height="380" rx="20" fill="#38BDF8" stroke="#1C1917" strokeWidth="6" />
        <path d="M640 500 Q800 440 980 510 L980 640 L640 640 Z" fill="#65A30D" />
        <circle cx="880" cy="350" r="36" fill="#FFFBEB" />
        <line x1="810" y1="260" x2="810" y2="640" stroke="#1C1917" strokeWidth="5" />
        <line x1="640" y1="450" x2="980" y2="450" stroke="#1C1917" strokeWidth="5" />

        {/* Meja Kayu Foreground */}
        <rect x="0" y="1380" width="1080" height="540" fill="#92400E" stroke="#1C1917" strokeWidth="5" />
        <rect x="0" y="1380" width="1080" height="44" fill="#D97706" stroke="#1C1917" strokeWidth="4" />
      </svg>

      {/* Karakter Pak Budi */}
      <div style={{ position: "absolute", top: 320, left: 60, zIndex: 15 }}>
        <CharacterPakBudi frame={frame} size={320} emotion={showClimax ? "shocked" : "talking"} />
      </div>

      {!showClimax ? (
        /* Beat 1: Potongan Kebutuhan Harian Bertahap (Teks Besar & Jelas) */
        <div
          style={{
            position: "absolute",
            top: 720,
            left: "50%",
            transform: "translateX(-50%)",
            width: 880,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            zIndex: 25,
          }}
        >
          <div style={{ fontFamily: FONT_STORY, fontSize: 52, color: "#1C1917", textAlign: "center" }}>
            Potongan Wajib Tiap Bulan:
          </div>

          <div
            style={{
              transform: `scale(${item1})`,
              opacity: item1,
              backgroundColor: "#FFFBEB",
              border: "4px solid #1C1917",
              borderRadius: 24,
              padding: "22px 36px",
              boxShadow: "7px 7px 0px #1C1917",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#1C1917" }}>🍚 Beras &amp; Makan</span>
            <span style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 800, color: "#DC2626" }}>-Rp 900rb</span>
          </div>

          <div
            style={{
              transform: `scale(${item2})`,
              opacity: item2,
              backgroundColor: "#FFFBEB",
              border: "4px solid #1C1917",
              borderRadius: 24,
              padding: "22px 36px",
              boxShadow: "7px 7px 0px #1C1917",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#1C1917" }}>⚡ Listrik &amp; Air</span>
            <span style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 800, color: "#DC2626" }}>-Rp 400rb</span>
          </div>

          <div
            style={{
              transform: `scale(${item3})`,
              opacity: item3,
              backgroundColor: "#FFFBEB",
              border: "4px solid #1C1917",
              borderRadius: 24,
              padding: "22px 36px",
              boxShadow: "7px 7px 0px #1C1917",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#1C1917" }}>🎒 Sekolah Anak</span>
            <span style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 800, color: "#DC2626" }}>-Rp 500rb</span>
          </div>
        </div>
      ) : (
        /* Beat 2: Pattern Interrupt — Fokus ke Toples Sisa Tabungan Bersih */
        <div
          style={{
            position: "absolute",
            top: 760,
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
          <div style={{ fontSize: 72, marginBottom: 8 }}>🫙</div>
          <div style={{ fontFamily: FONT_STORY, fontSize: 48, color: "#1C1917" }}>
            Sisa Tabungan Nyata:
          </div>
          <div style={{ fontFamily: FONT_NUM, fontSize: 70, fontWeight: 800, color: "#15803D", marginTop: 6 }}>
            Rp 200rb / bln
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 5: WORLD GOLDEN-HOUR PENUTUP (HIDUP SAMPAI AKHIR, TANPA LAYAR GELAP)
// =========================================================================
const Scene5TimelineWorld: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const isClosing = frame >= 125;
  const camZoom = interpolate(frame, [0, 279], [1.0, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const milestonePop = spring({ frame: frame - 8, fps, config: { damping: 13, stiffness: 95 } });
  const closingPop = spring({ frame: frame - 130, fps, config: { damping: 13, stiffness: 95 } });
  const grassSway = Math.sin(frame / 10) * 7;

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${camZoom})` }}>
      {/* Latar Golden Hour Senja Hangat & Jalan Pedesaan */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v4GoldenSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="45%" stopColor="#FDE68A" />
            <stop offset="80%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v4GoldenSky)" />
        <circle cx="540" cy="640" r="140" fill="#FFFBEB" opacity="0.9" />

        {/* Bukit Hangat */}
        <path d="M0 1080 Q320 960 640 1060 T1080 1000 L1080 1920 L0 1920 Z" fill="#65A30D" stroke="#1C1917" strokeWidth="3" />
        <path d="M0 1260 Q540 1160 1080 1280 L1080 1920 L0 1920 Z" fill="#3F6212" />

        {/* Jalan Berkelok Menuju Cakrawala */}
        <path d="M480 1180 Q580 1320 420 1560 L660 1560 Q680 1320 560 1180 Z" fill="#FDE68A" stroke="#1C1917" strokeWidth="4" />

        {/* Rumput Foreground Berayun */}
        <g transform={`translate(${grassSway}, 0)`}>
          <path d="M20 1920 Q60 1680 130 1560" stroke="#15803D" strokeWidth="16" fill="none" strokeLinecap="round" />
          <path d="M1060 1920 Q1010 1680 950 1560" stroke="#15803D" strokeWidth="16" fill="none" strokeLinecap="round" />
        </g>
      </svg>

      {!isClosing ? (
        /* Beat 1: Perbandingan Waktu Tempuh Nyata (Hampir 7 Tahun!) */
        <div style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              top: 230,
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
            <div style={{ fontFamily: FONT_STORY, fontSize: 48, color: "#1C1917" }}>
              Waktu Menabung Pak Budi:
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 78, fontWeight: 800, color: "#DC2626", lineHeight: 1.1 }}>
              HAMPIR 7 TAHUN
            </div>
            <div style={{ fontFamily: FONT_STORY, fontSize: 42, color: "#15803D", marginTop: 4 }}>
              Cuma Buat 1 Ponsel!
            </div>
          </div>

          <div style={{ position: "absolute", top: 760, left: 60, zIndex: 20 }}>
            <CharacterPakBudi frame={frame} size={380} emotion="shocked" />
          </div>
          <div style={{ position: "absolute", top: 760, right: 60, zIndex: 20 }}>
            <CharacterPakHendra frame={frame} size={380} emotion="happy" />
          </div>
        </div>
      ) : (
        /* Beat 2: Pattern Interrupt Penutup — Pertanyaan Refleksi Hangat di Dunia Golden-Hour */
        <div style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              top: 240,
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
              Harga global sama,
              <br />
              tapi waktu hidupnya beda.
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: 22,
                backgroundColor: "#DC2626",
                color: "#FFFBEB",
                fontFamily: FONT_NUM,
                fontSize: 38,
                fontWeight: 800,
                padding: "16px 36px",
                borderRadius: 50,
                border: "4px solid #1C1917",
              }}
            >
              💬 Masuk akal? Komen ya!
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
