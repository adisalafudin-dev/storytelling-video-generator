import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type IPhoneCharacterVisualType =
  | "character-hook-showcase"
  | "character-bridge-question"
  | "character-income-contrast"
  | "character-living-expenses"
  | "character-savings-timeline";

export const IPhoneCharacterStoryVisuals: React.FC<{
  type: IPhoneCharacterVisualType;
}> = ({ type }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top: "47%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1000,
        height: 820,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        pointerEvents: "none",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {type === "character-hook-showcase" && <Scene1CharacterHook frame={frame} fps={fps} />}
      {type === "character-bridge-question" && <Scene2BridgeQuestion frame={frame} fps={fps} />}
      {type === "character-income-contrast" && <Scene3IncomeContrast frame={frame} fps={fps} />}
      {type === "character-living-expenses" && <Scene4LivingExpenses frame={frame} fps={fps} />}
      {type === "character-savings-timeline" && <Scene5SavingsTimeline frame={frame} fps={fps} />}
    </div>
  );
};

// =========================================================================
// 1. ELEMEN DUNIA VISUAL (WORLD-BUILDING ENVIRONMENTS)
// =========================================================================

// --- A. DUNIA DESA PAK BUDI (RURAL VILLAGE WORLD) ---
const VillageWorldBackdrop: React.FC<{ frame: number }> = ({ frame }) => {
  const sunPulse = 1 + Math.sin(frame / 18) * 0.05;
  const cloud1X = (frame * 0.5) % 600 - 100;
  const cloud2X = ((frame * 0.3) % 700) + 100;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 36,
        overflow: "hidden",
        background: "linear-gradient(180deg, #1E1B4B 0%, #78350F 55%, #14532D 100%)",
        border: "3px solid #84CC16",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7), inset 0 0 60px rgba(0,0,0,0.5)",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1000 820" preserveAspectRatio="none">
        <defs>
          {/* Sun Glow */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
          {/* Paddy Gradient */}
          <linearGradient id="paddyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#65A30D" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>
        </defs>

        {/* 1. Latar Jauh: Matahari Terbit & Sinar Fajar */}
        <circle cx="500" cy="340" r="140" fill="url(#sunGlow)" transform={`scale(${sunPulse})`} style={{ transformOrigin: "500px 340px" }} />
        <circle cx="500" cy="340" r="45" fill="#FEF08A" />

        {/* Awan Pagi Mengambang */}
        <path d={`M ${cloud1X} 200 Q ${cloud1X + 40} 180 ${cloud1X + 90} 200 Q ${cloud1X + 130} 190 ${cloud1X + 160} 200 Q ${cloud1X + 80} 230 ${cloud1X} 200 Z`} fill="#FEF3C7" opacity="0.35" />
        <path d={`M ${cloud2X} 260 Q ${cloud2X + 50} 240 ${cloud2X + 110} 260 Q ${cloud2X + 170} 250 ${cloud2X + 200} 260 Q ${cloud2X + 100} 290 ${cloud2X} 260 Z`} fill="#FEF3C7" opacity="0.25" />

        {/* 2. Pegunungan Biru Berkabut */}
        <path d="M 0 460 Q 250 360 500 440 Q 750 370 1000 450 L 1000 820 L 0 820 Z" fill="#1E293B" opacity="0.65" />
        <path d="M 0 510 Q 300 430 620 490 Q 820 450 1000 520 L 1000 820 L 0 820 Z" fill="#0F172A" opacity="0.85" />

        {/* 3. Latar Tengah: Terasering Sawah Hijau Berundak */}
        <path d="M 0 570 Q 280 520 600 560 Q 840 530 1000 580 L 1000 820 L 0 820 Z" fill="url(#paddyGrad)" />
        <path d="M 0 650 Q 360 610 720 640 Q 880 620 1000 660 L 1000 820 L 0 820 Z" fill="#365314" />

        {/* Pematang Tanah & Gubuk Bambu di Kejauhan */}
        <path d="M 120 540 L 170 540 L 180 570 L 110 570 Z" fill="#78350F" opacity="0.8" />
        <path d="M 145 515 L 185 540 L 105 540 Z" fill="#D97706" opacity="0.9" />

        {/* Jalan Setapak Tanah Tempat Pak Budi Berdiri */}
        <path d="M 320 820 L 420 660 L 580 660 L 680 820 Z" fill="#78350F" opacity="0.6" />
      </svg>
    </div>
  );
};

// --- B. DUNIA KOTA PAK ANU (METROPOLITAN CITY WORLD) ---
const CityWorldBackdrop: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 36,
        overflow: "hidden",
        background: "linear-gradient(180deg, #0284C7 0%, #0F172A 60%, #020617 100%)",
        border: "3px solid #38BDF8",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7), inset 0 0 60px rgba(2, 132, 199, 0.25)",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1000 820" preserveAspectRatio="none">
        <defs>
          <linearGradient id="skylineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0B1120" />
          </linearGradient>
        </defs>

        {/* 1. Latar Jauh: Siluet Pencakar Langit Modern */}
        <rect x="80" y="240" width="120" height="450" fill="url(#skylineGrad)" rx="8" />
        <rect x="230" y="160" width="150" height="530" fill="url(#skylineGrad)" rx="8" />
        <polygon points="230,160 305,80 380,160" fill="#334155" />
        <rect x="410" y="220" width="180" height="470" fill="url(#skylineGrad)" rx="8" />
        <rect x="620" y="140" width="140" height="550" fill="url(#skylineGrad)" rx="8" />
        <rect x="790" y="200" width="130" height="490" fill="url(#skylineGrad)" rx="8" />

        {/* Titik Lampu Jendela Gedung Menyala */}
        {[
          [110, 280], [150, 280], [110, 320], [150, 360],
          [260, 220], [310, 220], [260, 270], [310, 270], [310, 330],
          [440, 260], [490, 260], [530, 260], [440, 320], [490, 370],
          [650, 190], [700, 190], [650, 250], [700, 310], [650, 360],
          [820, 240], [860, 240], [820, 290], [860, 350],
        ].map(([x, y], idx) => (
          <rect
            key={idx}
            x={x}
            y={y}
            width="14"
            height="18"
            rx="3"
            fill={idx % 2 === 0 ? "#FDE047" : "#38BDF8"}
            opacity={0.6 + Math.sin(frame / 10 + idx) * 0.25}
          />
        ))}

        {/* 2. Latar Tengah: Interior Kantor / Lantai Eksekutif Glossy */}
        <rect x="0" y="650" width="1000" height="170" fill="#0B132B" />
        <line x1="0" y1="650" x2="1000" y2="650" stroke="#38BDF8" strokeWidth="3" opacity="0.6" />

        {/* Garis Refleksi Kaca Lantai */}
        <line x1="120" y1="680" x2="880" y2="680" stroke="#1E293B" strokeWidth="2" />
        <line x1="60" y1="740" x2="940" y2="740" stroke="#1E293B" strokeWidth="2" />
      </svg>
    </div>
  );
};

// --- C. DUNIA RETAIL FLAGSHIP STORE (SHOWCASE DUNIA BERSAMA) ---
const ShowcaseWorldBackdrop: React.FC<{ frame: number }> = ({ frame }) => {
  const spotlightBeam = 0.35 + Math.sin(frame / 14) * 0.08;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 36,
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 20%, #1E293B 0%, #0F172A 50%, #020617 100%)",
        border: "3px solid #38BDF8",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.25)",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1000 820" preserveAspectRatio="none">
        {/* Spotlight Cone dari Langit-Langit */}
        <polygon points="500,0 280,820 720,820" fill="url(#storeSpotlight)" opacity={spotlightBeam} />
        <defs>
          <linearGradient id="storeSpotlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Lantai Ritel Marmer Glossy dengan Refleksi */}
        <rect x="0" y="660" width="1000" height="160" fill="#0A0F1D" />
        <ellipse cx="500" cy="690" rx="280" ry="24" fill="#38BDF8" opacity="0.12" />
      </svg>
    </div>
  );
};

// =========================================================================
// 2. KOMPONEN KARAKTER 2D BESAR, EKSPRESIF, & BERANIMASI: PAK BUDI
// =========================================================================
export type CharacterEmotion = "happy" | "confused" | "shocked" | "thinking" | "talking";

interface CharacterProps {
  size?: number;
  frame: number;
  emotion?: CharacterEmotion;
}

export const CharacterPakBudi: React.FC<CharacterProps> = ({
  size = 380,
  frame,
  emotion = "happy",
}) => {
  const breathY = Math.sin(frame / 12) * 4;
  const headBob = Math.sin(frame / 9) * 2;
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
        {/* Soft Ground Shadow */}
        <ellipse cx="100" cy="222" rx="68" ry="10" fill="rgba(0,0,0,0.4)" />

        {/* Body (Tubuh Petani dengan Kemeja Kerja Hijau) */}
        <g transform={`translate(0, ${breathY * 0.5})`}>
          {/* Torso */}
          <path
            d="M48 148 C48 128 74 124 100 124 C126 124 152 128 152 148 L158 215 L42 215 Z"
            fill="#4D7C0F"
            stroke="#1E3A0F"
            strokeWidth="3.5"
          />
          {/* Kerah Kemeja Kuning */}
          <path d="M85 124 L100 150 L115 124" stroke="#FEF08A" strokeWidth="4" fill="none" />
          {/* Handuk Putih Melingkar di Pundak */}
          <path
            d="M70 132 C68 160 74 185 76 200 M130 132 C132 160 126 185 124 200"
            stroke="#F8FAFC"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </g>

        {/* Head & Face (Kepala dengan Animasi Anggukan & Emosi) */}
        <g transform={`translate(0, ${breathY}) rotate(${headBob}, 100, 95)`}>
          <rect x="90" y="110" width="20" height="20" fill="#FBBF24" />
          <ellipse cx="100" cy="92" rx="40" ry="38" fill="#FDE047" stroke="#B45309" strokeWidth="3" />
          <circle cx="58" cy="94" r="8" fill="#FDE047" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="142" cy="94" r="8" fill="#FDE047" stroke="#B45309" strokeWidth="2.5" />

          {/* Alis Berdasarkan Emosi */}
          {emotion === "confused" ? (
            <>
              <path d="M74 72 Q86 64 96 74" stroke="#451A03" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M106 78 Q116 75 126 80" stroke="#451A03" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : emotion === "shocked" ? (
            <>
              <path d="M74 68 Q85 60 95 68" stroke="#451A03" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M105 68 Q115 60 126 68" stroke="#451A03" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <path d="M75 74 Q85 68 95 74" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M105 74 Q115 68 125 74" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Mata */}
          {isBlinking ? (
            <>
              <path d="M78 88 L92 88" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M108 88 L122 88" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : emotion === "shocked" ? (
            <>
              <circle cx="85" cy="87" r="7" fill="#FFFFFF" stroke="#451A03" strokeWidth="2.5" />
              <circle cx="85" cy="87" r="3.5" fill="#451A03" />
              <circle cx="115" cy="87" r="7" fill="#FFFFFF" stroke="#451A03" strokeWidth="2.5" />
              <circle cx="115" cy="87" r="3.5" fill="#451A03" />
            </>
          ) : (
            <>
              <ellipse cx="85" cy="87" rx="4.5" ry="5.5" fill="#451A03" />
              <circle cx="83.5" cy="85.5" r="1.8" fill="#FFFFFF" />
              <ellipse cx="115" cy="87" rx="4.5" ry="5.5" fill="#451A03" />
              <circle cx="113.5" cy="85.5" r="1.8" fill="#FFFFFF" />
            </>
          )}

          {/* Hidung */}
          <path d="M98 90 Q102 96 98 100" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Mulut */}
          {emotion === "confused" ? (
            <path d="M88 108 Q94 112 100 107 Q106 102 112 108" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          ) : emotion === "shocked" ? (
            <ellipse cx="100" cy="110" rx="9" ry="13" fill="#451A03" stroke="#B45309" strokeWidth="2" />
          ) : emotion === "talking" ? (
            <ellipse cx="100" cy="108" rx="11" ry={6 + Math.abs(Math.sin(frame / 3)) * 6} fill="#991B1B" stroke="#451A03" strokeWidth="2.5" />
          ) : (
            <path d="M86 105 Q100 118 114 105" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}

          <circle cx="73" cy="98" r="6" fill="#F43F5E" opacity="0.35" />
          <circle cx="127" cy="98" r="6" fill="#F43F5E" opacity="0.35" />

          {/* Tetesan Keringat Jika Bingung / Shocked */}
          {(emotion === "confused" || emotion === "shocked") && (
            <g transform={`translate(${135 + Math.sin(frame / 6) * 2}, ${70 + breathY})`}>
              <path d="M0 0 C4 6 6 12 0 16 C-6 12 -4 6 0 0 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            </g>
          )}

          {/* Topi Caping Petani Ikonik */}
          <g>
            <path d="M100 20 L180 76 L20 76 Z" fill="#D97706" stroke="#78350F" strokeWidth="4" strokeLinejoin="round" />
            <path d="M100 20 L100 76" stroke="#92400E" strokeWidth="2.5" />
            <path d="M60 48 L140 48" stroke="#92400E" strokeWidth="2" />
            <path d="M42 62 L158 62" stroke="#92400E" strokeWidth="2" />
            <path d="M38 76 Q45 110 90 120 M162 76 Q155 110 110 120" stroke="#78350F" strokeWidth="2.5" fill="none" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 3. KOMPONEN KARAKTER 2D BESAR, EKSPRESIF, & BERANIMASI: PAK ANU
// =========================================================================
export const CharacterPakAnu: React.FC<CharacterProps> = ({
  size = 380,
  frame,
  emotion = "happy",
}) => {
  const breathY = Math.sin(frame / 12 + 1.5) * 4;
  const headBob = Math.sin(frame / 9 + 1.5) * 2;
  const isBlinking = (frame + 30) % 85 < 5;

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
        {/* Soft Ground Shadow */}
        <ellipse cx="100" cy="222" rx="68" ry="10" fill="rgba(0,0,0,0.4)" />

        {/* Body (Jas Navy & Dasi Merah Rapi) */}
        <g transform={`translate(0, ${breathY * 0.5})`}>
          <path
            d="M48 145 C48 126 74 122 100 122 C126 122 152 126 152 145 L158 215 L42 215 Z"
            fill="#1E3A8A"
            stroke="#0F172A"
            strokeWidth="3.5"
          />
          <path d="M84 122 L100 160 L116 122 Z" fill="#F8FAFC" />
          <path d="M96 136 L104 136 L108 175 L100 185 L92 175 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
          <path d="M68 124 L94 165 L84 165 Z" fill="#172554" />
          <path d="M132 124 L106 165 L116 165 Z" fill="#172554" />
        </g>

        {/* Head & Face */}
        <g transform={`translate(0, ${breathY}) rotate(${headBob}, 100, 95)`}>
          <rect x="91" y="108" width="18" height="18" fill="#FDBA74" />
          <path d="M54 75 C54 40 80 32 100 32 C120 32 146 40 146 75 Z" fill="#0F172A" />
          <ellipse cx="100" cy="90" rx="38" ry="36" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.8" />
          <circle cx="60" cy="92" r="7" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <circle cx="140" cy="92" r="7" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />

          <path d="M56 70 C70 48 115 42 144 65 C130 52 90 48 64 68 Z" fill="#0F172A" />
          <path d="M76 72 Q86 67 95 71" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M105 71 Q114 67 124 72" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Mata */}
          {isBlinking ? (
            <>
              <path d="M78 85 L92 85" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M108 85 L122 85" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx="85" cy="84" rx="4.5" ry="5.5" fill="#0F172A" />
              <circle cx="83.5" cy="82.5" r="1.8" fill="#FFFFFF" />
              <ellipse cx="115" cy="84" rx="4.5" ry="5.5" fill="#0F172A" />
              <circle cx="113.5" cy="82.5" r="1.8" fill="#FFFFFF" />
            </>
          )}

          <path d="M98 87 Q102 93 98 97" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {emotion === "talking" ? (
            <ellipse cx="100" cy="106" rx="10" ry={5 + Math.abs(Math.sin(frame / 3)) * 5} fill="#991B1B" stroke="#0F172A" strokeWidth="2.5" />
          ) : (
            <path d="M88 102 Q100 114 112 102" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}

          {/* Kacamata Elegan */}
          <rect x="74" y="76" width="22" height="18" rx="4" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
          <rect x="104" y="76" width="22" height="18" rx="4" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
          <path d="M96 84 L104 84" stroke="#38BDF8" strokeWidth="2.5" />
          <path d="M74 84 L62 80 M126 84 L138 80" stroke="#38BDF8" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 1: HOOK DUA TOKOH DALAM DUNIANYA (STAGED BEAT-BY-BEAT)
// =========================================================================
const Scene1CharacterHook: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Beat 1: Pak Budi di Dunianya (Frame 0 - 68, 0s - 2.2s)
  // Beat 2: Pak Anu di Dunianya (Frame 68 - 136, 2.2s - 4.5s)
  // Beat 3: Pertemuan di Etalase Tokoh (Frame 136 - 246, 4.5s - 8.2s)

  const isBeat1 = frame < 68;
  const isBeat2 = frame >= 68 && frame < 136;
  const isBeat3 = frame >= 136;

  // Kamera Dolly-in Sinematik (1.0 -> 1.05)
  const dollyScale = interpolate(
    isBeat1 ? frame : isBeat2 ? frame - 68 : frame - 136,
    [0, 80],
    [1.0, 1.05],
    { extrapolateRight: "clamp" }
  );

  // Entrance spring per beat
  const budiSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const anuSpring = spring({ frame: frame - 68, fps, config: { damping: 14, stiffness: 100 } });
  const sharedSpring = spring({ frame: frame - 136, fps, config: { damping: 14, stiffness: 95 } });
  const phoneDrop = spring({ frame: frame - 150, fps, config: { damping: 12, mass: 0.8, stiffness: 110 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ---------------- BEAT 1: DUNIA PEDESAAN PAK BUDI ---------------- */}
      {isBeat1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${dollyScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VillageWorldBackdrop frame={frame} />
          <div
            style={{
              position: "relative",
              zIndex: 10,
              transform: `scale(${budiSpring})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <CharacterPakBudi frame={frame} size={420} emotion="happy" />
            <div
              style={{
                marginTop: 20,
                backgroundColor: "#84CC16",
                color: "#0F172A",
                fontSize: 22,
                fontWeight: 900,
                padding: "10px 32px",
                borderRadius: 999,
                letterSpacing: "0.5px",
                boxShadow: "0 12px 30px rgba(132, 204, 22, 0.4)",
              }}
            >
              🌾 PAK BUDI • PETANI DESA
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 26,
                fontWeight: 800,
                color: "#F8FAFC",
                textShadow: "0 4px 12px rgba(0,0,0,0.8)",
              }}
            >
              Upah Setara UMP ~Rp 2 Juta / Bulan
            </div>
          </div>
        </div>
      )}

      {/* ---------------- BEAT 2: DUNIA PERKOTAAN PAK ANU ---------------- */}
      {isBeat2 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${dollyScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CityWorldBackdrop frame={frame} />
          <div
            style={{
              position: "relative",
              zIndex: 10,
              transform: `scale(${anuSpring})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <CharacterPakAnu frame={frame} size={420} emotion="happy" />
            <div
              style={{
                marginTop: 20,
                backgroundColor: "#38BDF8",
                color: "#0F172A",
                fontSize: 22,
                fontWeight: 900,
                padding: "10px 32px",
                borderRadius: 999,
                letterSpacing: "0.5px",
                boxShadow: "0 12px 30px rgba(56, 189, 248, 0.4)",
              }}
            >
              💼 PAK ANU • PEBISNIS KOTA
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 26,
                fontWeight: 800,
                color: "#F8FAFC",
                textShadow: "0 4px 12px rgba(0,0,0,0.8)",
              }}
            >
              Omzet Bisnis Puluhan Juta / Bulan
            </div>
          </div>
        </div>
      )}

      {/* ---------------- BEAT 3: PANGGUNG SHOWCASE BERSAMA (IPHONE ETALASE) ---------------- */}
      {isBeat3 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${dollyScale})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShowcaseWorldBackdrop frame={frame} />
          <div
            style={{
              position: "relative",
              zIndex: 10,
              transform: `scale(${sharedSpring})`,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 30px",
              boxSizing: "border-box",
            }}
          >
            {/* Pak Budi di Kiri */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <CharacterPakBudi frame={frame} size={300} emotion="shocked" />
              <div
                style={{
                  backgroundColor: "#84CC16",
                  color: "#0F172A",
                  fontSize: 15,
                  fontWeight: 900,
                  padding: "6px 18px",
                  borderRadius: 10,
                  marginTop: 6,
                }}
              >
                PAK BUDI
              </div>
            </div>

            {/* Centerpiece: Enormous Glowing iPhone 15 */}
            <div
              style={{
                transform: `scale(${phoneDrop})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 20,
              }}
            >
              <div
                style={{
                  width: 270,
                  height: 450,
                  backgroundColor: "#0F172A",
                  borderRadius: 44,
                  border: "5px solid #38BDF8",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 50px rgba(56, 189, 248, 0.4)",
                  padding: 14,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                {/* Dynamic Island */}
                <div
                  style={{
                    width: 76,
                    height: 20,
                    backgroundColor: "#020617",
                    borderRadius: 10,
                    marginBottom: 20,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                {/* Screen */}
                <div
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "#090D16",
                    borderRadius: 28,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 14,
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ fontSize: 46 }}>📱</div>
                  <div
                    style={{
                      marginTop: 10,
                      backgroundColor: "#FBBF24",
                      color: "#0F172A",
                      fontSize: 12,
                      fontWeight: 900,
                      padding: "4px 12px",
                      borderRadius: 999,
                      letterSpacing: "0.5px",
                    }}
                  >
                    HARGA RESMI SAMA
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 24,
                      fontWeight: 900,
                      color: "#FFFFFF",
                    }}
                  >
                    Rp 16.500.000
                  </div>
                </div>
              </div>
            </div>

            {/* Pak Anu di Kanan */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <CharacterPakAnu frame={frame} size={300} emotion="happy" />
              <div
                style={{
                  backgroundColor: "#38BDF8",
                  color: "#0F172A",
                  fontSize: 15,
                  fontWeight: 900,
                  padding: "6px 18px",
                  borderRadius: 10,
                  marginTop: 6,
                }}
              >
                PAK ANU
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 2: JEMBATAN OBROLAN ALAMI ("KENAPA GITU? YUK SINI KITA JELASIN!")
// =========================================================================
const Scene2BridgeQuestion: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardEntrance = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const questionPop = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 110 } });
  const bridgePill = spring({ frame: frame - 40, fps, config: { damping: 10, mass: 0.7, stiffness: 125 } });

  const bounce = Math.sin(frame / 6) * 5;

  return (
    <div
      style={{
        transform: `scale(${cardEntrance})`,
        width: 940,
        backgroundColor: "#0F172A",
        borderRadius: 36,
        border: "3px solid #1E293B",
        padding: "36px 36px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 18,
      }}
    >
      {/* Two Animated Characters Interacting */}
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {/* Pak Budi Bingung */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CharacterPakBudi frame={frame} size={240} emotion="confused" />
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#F87171",
              fontSize: 16,
              fontWeight: 800,
              padding: "4px 16px",
              borderRadius: 8,
              marginTop: 4,
            }}
          >
            "Waduh, berat banget..."
          </div>
        </div>

        <div style={{ fontSize: 38, color: "#64748B", fontWeight: 900 }}>VS</div>

        {/* Pak Anu Santai */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CharacterPakAnu frame={frame} size={240} emotion="happy" />
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              color: "#34D399",
              fontSize: 16,
              fontWeight: 800,
              padding: "4px 16px",
              borderRadius: 8,
              marginTop: 4,
            }}
          >
            "Santai, beberapa hari beres"
          </div>
        </div>
      </div>

      {/* Main Question Heading */}
      <div
        style={{
          transform: `scale(${Math.max(0, questionPop)})`,
          fontSize: 32,
          fontWeight: 900,
          color: "#F8FAFC",
          lineHeight: 1.25,
          maxWidth: 820,
        }}
      >
        Harga struk sama persis, tapi pengorbanan mereka beda bumi dan langit!
      </div>

      {/* Giant Conversational Bridge Button */}
      <div
        style={{
          transform: `scale(${Math.max(0, bridgePill)}) translateY(${bounce}px)`,
          backgroundColor: "#FBBF24",
          color: "#0F172A",
          padding: "18px 48px",
          borderRadius: 22,
          fontSize: 28,
          fontWeight: 900,
          boxShadow: "0 12px 36px rgba(251, 191, 36, 0.5)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span>💡</span>
        <span>Kenapa gitu? Yuk, sini kita jelasin!</span>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 3: NILAI TUKAR KERINGAT KOTOR (3 HARI VS 8 BULAN PENUH)
// =========================================================================
const Scene3IncomeContrast: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardEntrance = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const barGrowth = spring({ frame: frame - 15, fps, config: { damping: 15, mass: 1.0, stiffness: 70 } });
  const badgeSpring = spring({ frame: frame - 65, fps, config: { damping: 11, stiffness: 120 } });

  const clampedGrowth = Math.max(0, Math.min(1, barGrowth));
  const budiMonths = (clampedGrowth * 8.25).toFixed(1);

  return (
    <div
      style={{
        transform: `scale(${cardEntrance})`,
        width: 940,
        backgroundColor: "#0F172A",
        borderRadius: 32,
        border: "3px solid #1E293B",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#F8FAFC" }}>
          Nilai Tukar Keringat (100% Gaji Kotor)
        </div>
        <div
          style={{
            backgroundColor: "#FBBF24",
            color: "#0F172A",
            fontSize: 14,
            fontWeight: 900,
            padding: "5px 14px",
            borderRadius: 6,
          }}
        >
          TARGET: Rp 16.500.000
        </div>
      </div>

      {/* Row Pak Anu */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <CharacterPakAnu frame={frame} size={120} emotion="happy" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#38BDF8" }}>
              Pak Anu (Pebisnis Kota)
            </span>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#10B981" }}>
              ⚡ CUMA 3 HARI OMZET
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "#020617",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #1E293B",
            }}
          >
            <div
              style={{
                width: `${clampedGrowth * 14}%`,
                height: "100%",
                backgroundColor: "#10B981",
                borderRadius: 10,
                boxShadow: "0 0 16px rgba(16, 185, 129, 0.5)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Row Pak Budi */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <CharacterPakBudi frame={frame} size={120} emotion="shocked" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#F87171" }}>
              Pak Budi (Petani Desa)
            </span>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#EF4444" }}>
              🔥 {budiMonths} BULAN PENUH (~245 HARI)
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "#020617",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #1E293B",
            }}
          >
            <div
              style={{
                width: `${clampedGrowth * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #F97316 0%, #EF4444 100%)",
                borderRadius: 10,
                boxShadow: "0 0 16px rgba(239, 68, 68, 0.5)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Takeaway */}
      <div
        style={{
          transform: `scale(${Math.max(0, badgeSpring)})`,
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          padding: "14px 24px",
          borderRadius: 16,
          fontSize: 18,
          fontWeight: 900,
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(239, 68, 68, 0.4)",
        }}
      >
        ⚠️ Pak Budi butuh 80× lipat lebih lama... itu pun kalau 100% gaji ditabung tanpa makan!
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 4: REALITAS POTONGAN BIAYA POKOK (DOMPET MENYUSUT)
// =========================================================================
const Scene4LivingExpenses: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardEntrance = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const chip1 = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 110 } });
  const chip2 = spring({ frame: frame - 35, fps, config: { damping: 12, stiffness: 110 } });
  const chip3 = spring({ frame: frame - 55, fps, config: { damping: 12, stiffness: 110 } });
  const resultSpring = spring({ frame: frame - 75, fps, config: { damping: 11, stiffness: 120 } });

  return (
    <div
      style={{
        transform: `scale(${cardEntrance})`,
        width: 940,
        backgroundColor: "#0F172A",
        borderRadius: 32,
        border: "3px solid #1E293B",
        padding: "34px 38px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 26, fontWeight: 900, color: "#F8FAFC" }}>
          Realitas Dompet Bulanan Pak Budi
        </div>
        <div
          style={{
            backgroundColor: "#84CC16",
            color: "#0F172A",
            fontSize: 16,
            fontWeight: 900,
            padding: "6px 16px",
            borderRadius: 8,
          }}
        >
          Pemasukan: Rp 2.000.000
        </div>
      </div>

      {/* Character Center with 3 Big Deductions */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <CharacterPakBudi frame={frame} size={220} emotion="confused" />

        {/* 3 Clear Expense Chips */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Chip 1 */}
          <div
            style={{
              transform: `scale(${Math.max(0, chip1)})`,
              backgroundColor: "#1E293B",
              borderLeft: "6px solid #F97316",
              borderRadius: 14,
              padding: "12px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 800, color: "#F8FAFC" }}>
              🍚 Beras & Dapur Keluarga
            </span>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#F97316" }}>
              -Rp 900.000
            </span>
          </div>

          {/* Chip 2 */}
          <div
            style={{
              transform: `scale(${Math.max(0, chip2)})`,
              backgroundColor: "#1E293B",
              borderLeft: "6px solid #FBBF24",
              borderRadius: 14,
              padding: "12px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 800, color: "#F8FAFC" }}>
              ⚡ Listrik & Air Rumah
            </span>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#FBBF24" }}>
              -Rp 400.000
            </span>
          </div>

          {/* Chip 3 */}
          <div
            style={{
              transform: `scale(${Math.max(0, chip3)})`,
              backgroundColor: "#1E293B",
              borderLeft: "6px solid #EC4899",
              borderRadius: 14,
              padding: "12px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 800, color: "#F8FAFC" }}>
              🎒 Sekolah & Kebutuhan Anak
            </span>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#EC4899" }}>
              -Rp 500.000
            </span>
          </div>
        </div>
      </div>

      {/* Sisa Bersih Tabungan */}
      <div
        style={{
          transform: `scale(${Math.max(0, resultSpring)})`,
          backgroundColor: "#020617",
          border: "2.5px solid #10B981",
          borderRadius: 20,
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 36 }}>🪙</span>
          <div>
            <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 700 }}>
              SISA UANG BERSIH DI DOMPET
            </div>
            <div style={{ color: "#10B981", fontSize: 28, fontWeight: 900 }}>
              HANYA ~Rp 200.000 / BULAN
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#10B981",
            color: "#0F172A",
            padding: "8px 18px",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 900,
          }}
        >
          Tabungan Nyata
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: WAKTU MENABUNG RIIL & CLOSING REFLEKTIF
// =========================================================================
const Scene5SavingsTimeline: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardEntrance = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const stampEntrance = spring({ frame: frame - 25, fps, config: { damping: 10, mass: 0.7, stiffness: 130 } });
  const ctaBounce = Math.sin(frame / 6) * 5;

  return (
    <div
      style={{
        transform: `scale(${cardEntrance})`,
        width: 940,
        backgroundColor: "#0F172A",
        borderRadius: 36,
        border: "3px solid #1E293B",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 20,
      }}
    >
      {/* Both Characters Reacting */}
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <CharacterPakBudi frame={frame} size={160} emotion="shocked" />

        {/* Calculation Pill */}
        <div
          style={{
            backgroundColor: "#020617",
            border: "2px solid #334155",
            borderRadius: 18,
            padding: "12px 24px",
            fontSize: 22,
            fontWeight: 900,
            color: "#94A3B8",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>Rp 16,5 Juta</span>
          <span>÷</span>
          <span style={{ color: "#10B981" }}>Rp 200rb/bln</span>
          <span>=</span>
          <span style={{ color: "#EF4444", fontSize: 26 }}>82,5 BULAN</span>
        </div>

        <CharacterPakAnu frame={frame} size={160} emotion="happy" />
      </div>

      {/* Giant Red Stamp */}
      <div
        style={{
          transform: `scale(${Math.max(0, stampEntrance)}) rotate(-2deg)`,
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          padding: "16px 40px",
          borderRadius: 20,
          fontWeight: 900,
          fontSize: 26,
          boxShadow: "0 12px 36px rgba(239, 68, 68, 0.45)",
          letterSpacing: "-0.5px",
        }}
      >
        📅 HAMPIR 7 TAHUN MENABUNG UNTUK 1 HP!
      </div>

      {/* Grounded Reflection Question */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: "#F8FAFC",
          lineHeight: 1.3,
          maxWidth: 780,
        }}
      >
        Menurut kamu, apakah patokan harga gadget global ini masuk akal buat masyarakat kita?
      </div>

      {/* Interactive CTA Pill */}
      <div
        style={{
          transform: `translateY(${ctaBounce}px)`,
          backgroundColor: "#38BDF8",
          color: "#0F172A",
          padding: "14px 36px",
          borderRadius: 18,
          fontWeight: 900,
          fontSize: 20,
          boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span>💬</span>
        <span>TULIS PENDAPATMU DI KOLOM KOMENTAR YA!</span>
      </div>

      <div style={{ fontSize: 13, color: "#64748B" }}>
        Kanal @adi.salafudin • Refleksi Daya Beli & Cerita Nyata
      </div>
    </div>
  );
};
