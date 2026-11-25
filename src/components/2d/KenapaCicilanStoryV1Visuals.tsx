import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

export type KenapaCicilanStoryV1VisualType =
  | "cicilan-hook-checkout"
  | "cicilan-bridge-notebook"
  | "cicilan-snowball-stack"
  | "cicilan-narrow-space"
  | "cicilan-morning-choice";

const FONT_STORY = "'Patrick Hand', cursive, sans-serif";
const FONT_NUM = "'Plus Jakarta Sans', sans-serif";

const useCleanExit = (frame: number, sceneFrames: number) => {
  const safeEnd = Math.max(24, sceneFrames);
  const exitOpacity = interpolate(
    frame,
    [safeEnd - 16, safeEnd - 8],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitScale = interpolate(
    frame,
    [safeEnd - 16, safeEnd - 8],
    [1, 0.96],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return { exitOpacity, exitScale };
};

export const KenapaCicilanStoryV1Visuals: React.FC<{
  type: KenapaCicilanStoryV1VisualType;
}> = ({ type }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

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
      {type === "cicilan-hook-checkout" && (
        <Scene1HookCheckout frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "cicilan-bridge-notebook" && (
        <Scene2BridgeNotebook frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "cicilan-snowball-stack" && (
        <Scene3SnowballStack frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "cicilan-narrow-space" && (
        <Scene4NarrowSpace frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "cicilan-morning-choice" && (
        <Scene5MorningChoice frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
    </div>
  );
};

// =========================================================================
// KARAKTER UTAMA: DIMAS (Gaya #3 Hand-Drawn Personal Storytelling)
// =========================================================================
type DimasEmotion = "happy" | "thinking" | "worried" | "relieved";
type DimasPose = "desk" | "explaining" | "looking" | "morning";

const CharacterDimas: React.FC<{
  size?: number;
  frame: number;
  emotion?: DimasEmotion;
  pose?: DimasPose;
}> = ({ size = 420, frame, emotion = "happy", pose = "desk" }) => {
  const breathY = Math.sin(frame / 12) * 4;
  const headTilt =
    emotion === "thinking"
      ? Math.sin(frame / 10) * 3.5 - 5
      : emotion === "worried"
      ? Math.sin(frame / 11) * 2.5 + 3
      : Math.sin(frame / 12) * 2;
  const isBlinking = frame % 84 < 5;

  return (
    <div
      style={{
        width: size,
        height: size * 1.12,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size * 1.12}
        viewBox="0 0 220 246"
        fill="none"
        style={{ overflow: "visible" }}
      >
        <ellipse cx="110" cy="236" rx="70" ry="11" fill="rgba(28, 25, 23, 0.24)" />

        {/* Badan & Hoodie Hangat */}
        <g transform={`translate(0, ${breathY * 0.6})`}>
          {/* Lengan Kiri */}
          <path
            d={
              pose === "morning"
                ? "M60 152 Q34 124 44 96"
                : "M60 152 Q38 178 54 206"
            }
            stroke="#B45309"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx={pose === "morning" ? 44 : 54}
            cy={pose === "morning" ? 96 : 206}
            r="11"
            fill="#FDBA74"
            stroke="#1C1917"
            strokeWidth="3.5"
          />

          {/* Lengan Kanan */}
          <path
            d={
              pose === "explaining"
                ? "M160 152 Q188 138 196 116"
                : pose === "morning"
                ? "M160 152 Q186 124 176 96"
                : "M160 152 Q182 178 166 206"
            }
            stroke="#B45309"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx={pose === "explaining" ? 196 : pose === "morning" ? 176 : 166}
            cy={pose === "explaining" ? 116 : pose === "morning" ? 96 : 206}
            r="11"
            fill="#FDBA74"
            stroke="#1C1917"
            strokeWidth="3.5"
          />

          {/* Torso Hoodie Amber */}
          <path
            d="M56 148 Q110 132 164 148 L172 228 Q110 236 48 228 Z"
            fill="#D97706"
            stroke="#1C1917"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Tali Hoodie */}
          <line x1="98" y1="154" x2="96" y2="184" stroke="#FFFBEB" strokeWidth="4" strokeLinecap="round" />
          <line x1="122" y1="154" x2="124" y2="184" stroke="#FFFBEB" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Kepala & Ekspresi */}
        <g transform={`translate(0, ${breathY}) rotate(${headTilt}, 110, 120)`}>
          <rect
            x="98"
            y="122"
            width="24"
            height="24"
            rx="8"
            fill="#FDBA74"
            stroke="#1C1917"
            strokeWidth="4"
          />
          <circle cx="64" cy="96" r="10" fill="#FDBA74" stroke="#1C1917" strokeWidth="4" />
          <circle cx="156" cy="96" r="10" fill="#FDBA74" stroke="#1C1917" strokeWidth="4" />

          <rect
            x="66"
            y="44"
            width="88"
            height="86"
            rx="42"
            fill="#FDBA74"
            stroke="#1C1917"
            strokeWidth="4.5"
          />

          {/* Kacamata Tipis Dimas */}
          <rect x="76" y="77" width="28" height="22" rx="7" fill="none" stroke="#1C1917" strokeWidth="3.5" />
          <rect x="116" y="77" width="28" height="22" rx="7" fill="none" stroke="#1C1917" strokeWidth="3.5" />
          <line x1="104" y1="87" x2="116" y2="87" stroke="#1C1917" strokeWidth="3.5" />

          {/* Rambut Hand-Drawn */}
          <path
            d="M62 76 Q66 30 112 28 Q158 30 158 74 Q142 52 114 54 Q84 56 62 76 Z"
            fill="#1C1917"
          />

          {/* Alis */}
          {emotion === "thinking" || emotion === "worried" ? (
            <>
              <path d="M78 70 Q90 64 102 70" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M118 66 Q130 60 142 68" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M78 68 Q90 64 102 68" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M118 68 Q130 64 142 68" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
            </>
          )}

          {/* Mata */}
          {isBlinking ? (
            <>
              <path d="M84 88 Q90 92 96 88" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M124 88 Q130 92 136 88" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="90" cy="88" r="5" fill="#1C1917" />
              <circle cx="130" cy="88" r="5" fill="#1C1917" />
            </>
          )}

          {/* Mulut */}
          {emotion === "thinking" ? (
            <path d="M98 112 Q110 108 122 112" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
          ) : emotion === "worried" ? (
            <path d="M96 115 Q110 105 124 115" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M95 107 Q110 120 125 107" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
          )}

          {emotion === "thinking" && (
            <text
              x="164"
              y="54"
              fill="#FDE047"
              fontSize="36"
              fontWeight="800"
              fontFamily={FONT_STORY}
              transform={`translate(0, ${Math.sin(frame / 7) * 4})`}
            >
              ?
            </text>
          )}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 1: HOOK KONTRAS (00:00–00:07)
// Meja malam + cahaya HP hangat + keranjang belanja + Dimas senyum -> mikir
// =========================================================================
const Scene1HookCheckout: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  const dollyScale = interpolate(frame, [0, durationInFrames], [1.0, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dollyY = interpolate(frame, [0, durationInFrames], [0, -16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isFlip = frame >= Math.round(durationInFrames * 0.46);
  const glowPulse = 0.85 + Math.sin(frame / 12) * 0.12;
  const headSpring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const phoneSpring = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 15, stiffness: 90 } });
  const steamRise = (frame * 1.1) % 64;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${dollyScale * exitScale}) translateY(${dollyY}px)`,
      }}
    >
      {/* BACKGROUND: Ruang Malam Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="c1Night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="55%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>
          <radialGradient id="c1PhoneGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity={0.42 * glowPulse} />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#c1Night)" />

        {/* Jendela Malam + Bulan Sabit */}
        <rect x="90" y="340" width="320" height="390" rx="20" fill="#1E3A8A" stroke="#1C1917" strokeWidth="6" />
        <circle cx="290" cy="430" r="32" fill="#FEF3C7" opacity="0.9" />
        <circle cx="170" cy="410" r="4" fill="#FFFBEB" opacity="0.8" />
        <circle cx="210" cy="480" r="3" fill="#FFFBEB" opacity="0.7" />
        <line x1="250" y1="340" x2="250" y2="730" stroke="#1C1917" strokeWidth="5" />
        <line x1="90" y1="535" x2="410" y2="535" stroke="#1C1917" strokeWidth="5" />

        {/* Cahaya Layar HP ke Wajah Dimas */}
        <circle cx="640" cy="840" r="340" fill="url(#c1PhoneGlow)" />
      </svg>

      {/* TOP SAFE ZONE HEADLINE (Tanpa Kotak Kaku) */}
      <div
        style={{
          position: "absolute",
          top: 205,
          left: 80,
          right: 160,
          transform: `scale(${headSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 54,
            fontWeight: 800,
            color: isFlip ? "#FCA5A5" : "#FDE047",
            lineHeight: 1.05,
            textShadow: "4px 4px 0px #1C1917",
          }}
        >
          {isFlip ? "Awal bulan udah kepotong?" : "Cuma Rp 200 ribuan/bln"}
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 52,
            color: "#FFFBEB",
            marginTop: 8,
            textShadow: "3px 3px 0px #1C1917",
          }}
        >
          {isFlip ? "Kok gaji berasa langsung nipis..." : "Pas checkout rasanya enteng banget!"}
        </div>
      </div>

      {/* MIDGROUND: Karakter Dimas */}
      <div style={{ position: "absolute", top: 650, left: 100, zIndex: 20 }}>
        <CharacterDimas
          frame={frame}
          size={420}
          emotion={isFlip ? "thinking" : "happy"}
          pose="desk"
        />
      </div>

      {/* MIDGROUND PROP: Layar HP Checkout + Keranjang Belanja */}
      <div
        style={{
          position: "absolute",
          top: 630,
          right: 165,
          transform: `scale(${phoneSpring}) translateY(${Math.sin(frame / 9) * 6}px)`,
          zIndex: 22,
        }}
      >
        <svg width="310" height="440" viewBox="0 0 310 440" style={{ overflow: "visible" }}>
          {/* Badan HP */}
          <rect x="10" y="10" width="290" height="420" rx="36" fill="#FFFBEB" stroke="#1C1917" strokeWidth="7" />
          <rect x="105" y="24" width="100" height="12" rx="6" fill="#1C1917" />

          {/* Ikon Keranjang Belanja */}
          <g transform="translate(105, 68)">
            <path d="M10 14 L26 14 L38 66 L90 66 L100 28 L30 28" stroke="#1C1917" strokeWidth="6" fill="#FDE047" strokeLinejoin="round" />
            <circle cx="44" cy="82" r="8" fill="#1C1917" />
            <circle cx="84" cy="82" r="8" fill="#1C1917" />
          </g>

          {/* Angka Besar di Layar */}
          <text
            x="155"
            y="222"
            textAnchor="middle"
            fill={isFlip ? "#DC2626" : "#15803D"}
            fontSize="44"
            fontWeight="800"
            fontFamily={FONT_NUM}
          >
            {isFlip ? "-Rp 1,1 Jt" : "Rp 220 rb"}
          </text>
          <text
            x="155"
            y="266"
            textAnchor="middle"
            fill="#57534E"
            fontSize="28"
            fontFamily={FONT_STORY}
          >
            {isFlip ? "Potongan otomatis..." : "per bulan · 0%"}
          </text>

          {/* Tombol Checkout / Status */}
          <rect
            x="40"
            y="306"
            width="230"
            height="68"
            rx="20"
            fill={isFlip ? "#DC2626" : "#16A34A"}
            stroke="#1C1917"
            strokeWidth="5"
          />
          <text
            x="155"
            y="350"
            textAnchor="middle"
            fill="#FFFBEB"
            fontSize="28"
            fontWeight="800"
            fontFamily={FONT_NUM}
          >
            {isFlip ? "GAJI TERPOTONG" : "CHECKOUT ✓"}
          </text>
        </svg>
      </div>

      {/* FOREGROUND: Meja Kayu Malam & Gelas Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 25 }}>
        <path d="M-20 1110 L1100 1110 L1100 1920 L-20 1920 Z" fill="#78350F" stroke="#1C1917" strokeWidth="6" />
        <g transform="translate(140, 1030)">
          <path
            d={`M35 ${-8 - steamRise} Q52 ${-28 - steamRise} 38 ${-48 - steamRise}`}
            stroke="#FFFBEB"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity={interpolate(steamRise, [0, 32, 64], [0, 0.65, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          <rect x="0" y="0" width="84" height="76" rx="14" fill="#FFFBEB" stroke="#1C1917" strokeWidth="5" />
          <path d="M84 16 Q110 16 110 38 Q110 60 84 60" stroke="#1C1917" strokeWidth="5" fill="none" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 2: BRIDGE PENJELASAN (00:07–00:13)
// Pan menyamping ke meja kayu hangat dengan buku catatan terbuka & pulpen
// =========================================================================
const Scene2BridgeNotebook: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  const panX = interpolate(frame, [0, durationInFrames], [45, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bookSpring = spring({ frame: Math.max(0, frame - 6), fps, config: { damping: 14, stiffness: 90 } });
  const dot1 = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 14, stiffness: 100 } });
  const dot2 = spring({ frame: Math.max(0, frame - 75), fps, config: { damping: 14, stiffness: 100 } });
  const dot3 = spring({ frame: Math.max(0, frame - 115), fps, config: { damping: 14, stiffness: 100 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* BACKGROUND: Meja Kayu Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="c2Bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="65%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#c2Bg)" />
        <path d="M-40 1120 L1120 1120 L1120 1920 L-40 1920 Z" fill="#92400E" stroke="#1C1917" strokeWidth="6" />
      </svg>

      {/* TOP SAFE ZONE BRIDGE */}
      <div
        style={{
          position: "absolute",
          top: 205,
          left: 80,
          right: 160,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 64,
            lineHeight: 1.05,
            color: "#1C1917",
          }}
        >
          &ldquo;Kenapa bisa gitu ya?&rdquo;
        </div>
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 42,
            fontWeight: 800,
            color: "#DC2626",
            marginTop: 8,
          }}
        >
          Yuk sini kita urai pelan-pelan
        </div>
      </div>

      {/* BUKU CATATAN TERBUKA + PULPEN (Organik di atas meja, tanpa kotak kaku) */}
      <div
        style={{
          position: "absolute",
          top: 440,
          left: 80 + panX * 0.65,
          width: 780,
          transform: `scale(${bookSpring})`,
          zIndex: 22,
        }}
      >
        <svg width="780" height="580" viewBox="0 0 780 580" style={{ overflow: "visible" }}>
          {/* Bayangan Buku */}
          <rect x="24" y="28" width="730" height="500" rx="22" fill="rgba(28,25,23,0.22)" />
          {/* Cover Kulit */}
          <rect x="10" y="10" width="730" height="500" rx="20" fill="#78350F" stroke="#1C1917" strokeWidth="6" />
          {/* Halaman Kertas Terbuka */}
          <rect x="28" y="26" width="342" height="468" rx="10" fill="#FFFBEB" stroke="#1C1917" strokeWidth="4" />
          <rect x="378" y="26" width="344" height="468" rx="10" fill="#FEF3C7" stroke="#1C1917" strokeWidth="4" />
          {/* Garis Tengah Lipatan */}
          <line x1="374" y1="26" x2="374" y2="494" stroke="#1C1917" strokeWidth="5" />

          {/* Garis Tulis Halaman Kiri */}
          <line x1="56" y1="120" x2="340" y2="120" stroke="#D6D3D1" strokeWidth="3" />
          <line x1="56" y1="210" x2="340" y2="210" stroke="#D6D3D1" strokeWidth="3" />
          <line x1="56" y1="300" x2="340" y2="300" stroke="#D6D3D1" strokeWidth="3" />
          <line x1="56" y1="390" x2="340" y2="390" stroke="#D6D3D1" strokeWidth="3" />

          <text x="58" y="88" fill="#1C1917" fontSize="34" fontFamily={FONT_STORY}>
            Bukan 1 tagihan...
          </text>

          {/* Titik Tagihan Muncul Satu per Satu */}
          <g opacity={dot1} transform={`translate(0, ${(1 - dot1) * 14})`}>
            <circle cx="80" cy="168" r="14" fill="#DC2626" stroke="#1C1917" strokeWidth="3" />
            <text x="110" y="178" fill="#1C1917" fontSize="34" fontWeight="800" fontFamily={FONT_NUM}>
              Rp 220 rb
            </text>
          </g>

          <g opacity={dot2} transform={`translate(0, ${(1 - dot2) * 14})`}>
            <circle cx="80" cy="258" r="14" fill="#F59E0B" stroke="#1C1917" strokeWidth="3" />
            <text x="110" y="268" fill="#1C1917" fontSize="34" fontWeight="800" fontFamily={FONT_NUM}>
              Rp 195 rb
            </text>
          </g>

          <g opacity={dot3} transform={`translate(0, ${(1 - dot3) * 14})`}>
            <circle cx="80" cy="348" r="14" fill="#0F766E" stroke="#1C1917" strokeWidth="3" />
            <text x="110" y="358" fill="#1C1917" fontSize="34" fontWeight="800" fontFamily={FONT_NUM}>
              + tagihan lain!
            </text>
          </g>

          {/* Halaman Kanan: Sketsa Panah & Pulpen */}
          <text x="410" y="130" fill="#1C1917" fontSize="38" fontFamily={FONT_STORY}>
            Jalan bareng
          </text>
          <text x="410" y="180" fill="#DC2626" fontSize="42" fontFamily={FONT_STORY}>
            tiap bulan!
          </text>

          {/* Pulpen di Atas Buku */}
          <g transform="translate(520, 260) rotate(28)">
            <rect x="0" y="0" width="22" height="190" rx="8" fill="#1E3A8A" stroke="#1C1917" strokeWidth="4" />
            <polygon points="0,190 22,190 11,222" fill="#FDE047" stroke="#1C1917" strokeWidth="4" />
          </g>
        </svg>
      </div>

      {/* KARAKTER DIMAS */}
      <div style={{ position: "absolute", top: 890, right: 165 - panX * 0.4, zIndex: 25 }}>
        <CharacterDimas frame={frame} size={320} emotion="thinking" pose="explaining" />
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 3: EFEK SALJU TAGIHAN (00:13–00:24)
// Pos-pos kecil tersusun alami di meja (tanpa kotak card tebal) -> total tegas
// =========================================================================
const Scene3SnowballStack: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  const beat2Start = Math.round(durationInFrames * 0.35);
  const beat3Start = Math.round(durationInFrames * 0.68);
  const isBeat2 = frame >= beat2Start;
  const isBeat3 = frame >= beat3Start;

  // Pattern interrupt pergeseran sudut pandang antar-beat
  const camScale = isBeat3
    ? interpolate(frame, [beat3Start, durationInFrames], [1.02, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : isBeat2
    ? interpolate(frame, [beat2Start, beat3Start], [1.0, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(frame, [0, beat2Start], [1.0, 1.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const s1 = spring({ frame: Math.max(0, frame - 6), fps, config: { damping: 14, stiffness: 100 } });
  const s2 = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 14, stiffness: 100 } });
  const s3 = spring({ frame: Math.max(0, frame - beat2Start), fps, config: { damping: 14, stiffness: 100 } });
  const s4 = spring({ frame: Math.max(0, frame - beat2Start - 28), fps, config: { damping: 14, stiffness: 100 } });
  const totalSpring = spring({ frame: Math.max(0, frame - beat3Start), fps, config: { damping: 13, stiffness: 110 } });

  const items = [
    { label: "📱 Cicilan gadget", price: "Rp 320 rb", color: "#0F766E", anim: s1, rot: -2 },
    { label: "🛍️ Paylater jajan", price: "Rp 240 rb", color: "#D97706", anim: s2, rot: 1.5 },
    { label: "🎧 Langganan app", price: "Rp 180 rb", color: "#1D4ED8", anim: s3, rot: -1 },
    { label: "📦 Cicilan kebutuhan", price: "Rp 410 rb", color: "#DC2626", anim: s4, rot: 2 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * camScale})`,
      }}
    >
      {/* BACKGROUND: Meja Kerja dari Sudut Atas-Depan */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="c3Table" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#c3Table)" />
        {/* Tekstur Serat Kayu Organik */}
        <line x1="0" y1="420" x2="1080" y2="410" stroke="#78350F" strokeWidth="4" opacity="0.5" />
        <line x1="0" y1="780" x2="1080" y2="795" stroke="#78350F" strokeWidth="4" opacity="0.5" />
        <line x1="0" y1="1120" x2="1080" y2="1110" stroke="#78350F" strokeWidth="4" opacity="0.5" />
      </svg>

      {/* TOP SAFE ZONE */}
      <div
        style={{
          position: "absolute",
          top: 205,
          left: 80,
          right: 160,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 58,
            color: "#FDE047",
            lineHeight: 1.05,
            textShadow: "3px 3px 0px #1C1917",
          }}
        >
          {isBeat3 ? "Gabung jadi beban tetap:" : "4 pos kecil jalan bareng:"}
        </div>
      </div>

      {/* STRUK / SLIP KERTAS ORGANIK DI ATAS MEJA (Tanpa kotak card tebal) */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 80,
          right: 170,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 22,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "#FFFBEB",
              borderLeft: `14px solid ${item.color}`,
              borderRadius: "6px 18px 18px 6px",
              padding: "16px 26px",
              boxShadow: "0 8px 20px rgba(28,25,23,0.28)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: item.anim,
              transform: `scale(${item.anim}) rotate(${item.rot}deg)`,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 40, color: "#1C1917" }}>
              {item.label}
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 38, fontWeight: 800, color: item.color }}>
              {item.price}
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL ANGKA BULANAN TEGAS (PAYOFF) */}
      {isBeat3 && (
        <div
          style={{
            position: "absolute",
            top: 840,
            left: 80,
            right: 170,
            transform: `scale(${totalSpring})`,
            opacity: totalSpring,
            zIndex: 28,
          }}
        >
          <div
            style={{
              fontFamily: FONT_STORY,
              fontSize: 42,
              color: "#FEF3C7",
              textShadow: "2px 2px 0px #1C1917",
            }}
          >
            Total potongan rutin tiap bulan:
          </div>
          <div
            style={{
              fontFamily: FONT_NUM,
              fontSize: 82,
              fontWeight: 800,
              color: "#FDE047",
              lineHeight: 1.02,
              textShadow: "6px 6px 0px #1C1917",
              marginTop: 6,
            }}
          >
            Rp 1,15 Jt/bln
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 4: RUANG GERAK YANG MENYEMPIT (00:24–00:34)
// Slow dolly-out + Dimas menatap kalender & tabungan yang dikunci masa lalu
// =========================================================================
const Scene4NarrowSpace: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  const dollyOut = interpolate(frame, [0, durationInFrames], [1.06, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bar ruang gerak menyempit karena porsi "bayar masa lalu" meluas
  const lockedPct = interpolate(frame, [12, Math.round(durationInFrames * 0.7)], [0.35, 0.72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const freePct = 1 - lockedPct;

  const titleSpring = spring({ frame: Math.max(0, frame - 6), fps, config: { damping: 14, stiffness: 95 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * dollyOut})`,
      }}
    >
      {/* BACKGROUND: Ruang Tamu Sore Hari Teduh */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="c4Afternoon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="55%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#c4Afternoon)" />

        {/* Lantai Ruang Tamu */}
        <path d="M-20 1130 L1100 1130 L1100 1920 L-20 1920 Z" fill="#92400E" stroke="#1C1917" strokeWidth="6" />

        {/* Kalender Dinding */}
        <g transform="translate(110, 410)">
          <rect x="0" y="0" width="260" height="280" rx="20" fill="#FFFBEB" stroke="#1C1917" strokeWidth="6" />
          <rect x="0" y="0" width="260" height="68" rx="16" fill="#DC2626" stroke="#1C1917" strokeWidth="6" />
          <text x="130" y="46" textAnchor="middle" fill="#FFFBEB" fontSize="30" fontWeight="800" fontFamily={FONT_NUM}>
            AWAL BULAN
          </text>
          <text x="130" y="168" textAnchor="middle" fill="#1C1917" fontSize="72" fontWeight="800" fontFamily={FONT_NUM}>
            01
          </text>
          <text x="130" y="232" textAnchor="middle" fill="#DC2626" fontSize="30" fontFamily={FONT_STORY}>
            Tagihan jatuh tempo
          </text>
        </g>
      </svg>

      {/* TOP SAFE ZONE */}
      <div
        style={{
          position: "absolute",
          top: 205,
          left: 80,
          right: 160,
          transform: `scale(${titleSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 62,
            lineHeight: 1.06,
            color: "#1C1917",
          }}
        >
          Uangmu keburu dikunci buat bayar masa lalu
        </div>
      </div>

      {/* VISUAL RUANG GERAK MENYEMPIT (Tanpa Card Menumpuk) */}
      <div
        style={{
          position: "absolute",
          top: 740,
          left: 80,
          right: 170,
          zIndex: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: FONT_NUM, fontSize: 32, fontWeight: 800, color: "#DC2626" }}>
            🔒 Bayar masa lalu ({Math.round(lockedPct * 100)}%)
          </span>
          <span style={{ fontFamily: FONT_NUM, fontSize: 32, fontWeight: 800, color: "#15803D" }}>
            Nabung ({Math.round(freePct * 100)}%)
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: 74,
            backgroundColor: "#FFFBEB",
            border: "6px solid #1C1917",
            borderRadius: 24,
            overflow: "hidden",
            display: "flex",
            boxShadow: "8px 8px 0px #1C1917",
          }}
        >
          <div
            style={{
              width: `${lockedPct * 100}%`,
              height: "100%",
              backgroundColor: "#DC2626",
            }}
          />
          <div
            style={{
              width: `${freePct * 100}%`,
              height: "100%",
              backgroundColor: "#16A34A",
            }}
          />
        </div>
      </div>

      {/* KARAKTER DIMAS MENATAP KALENDER & BAR */}
      <div style={{ position: "absolute", top: 830, right: 170, zIndex: 22 }}>
        <CharacterDimas frame={frame} size={340} emotion="worried" pose="looking" />
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: ARAH BALIK & PENUTUP (00:34–00:42)
// Slow pan ke cahaya pagi hangat di teras + pertanyaan dua sisi
// =========================================================================
const Scene5MorningChoice: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  const panX = interpolate(frame, [0, durationInFrames], [-35, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const choiceSpring = spring({
    frame: Math.max(0, frame - Math.round(durationInFrames * 0.44)),
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* BACKGROUND: Pagi Cerah Teras Rumah */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="c5Morning" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
          <radialGradient id="c5Sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FDE047" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#c5Morning)" />
        <g transform={`translate(${panX * 0.5}, 0)`}>
          <circle cx="820" cy="400" r="270" fill="url(#c5Sun)" />
          <circle cx="820" cy="400" r="76" fill="#FFFBEB" />
          <path d="M-120 1050 Q350 930 700 1040 T1200 980 L1200 1920 L-120 1920 Z" fill="#15803D" opacity="0.65" />
        </g>
        <path d="M-40 1150 L1120 1150 L1120 1920 L-40 1920 Z" fill="#FDE68A" stroke="#1C1917" strokeWidth="6" />
      </svg>

      {/* TOP SAFE ZONE */}
      <div
        style={{
          position: "absolute",
          top: 205,
          left: 80,
          right: 160,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 60,
            lineHeight: 1.06,
            color: "#1C1917",
          }}
        >
          Boleh nyicil, asal di batas aman!
        </div>
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 38,
            fontWeight: 800,
            color: "#15803D",
            marginTop: 8,
          }}
        >
          Total cicilan tetap ≤ 20–30% gaji
        </div>
      </div>

      {/* PERTANYAAN DUA SISI PEMANTIK KOMENTAR */}
      <div
        style={{
          position: "absolute",
          top: 470,
          left: 80,
          right: 170,
          transform: `scale(${choiceSpring})`,
          opacity: choiceSpring,
          zIndex: 26,
        }}
      >
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 52,
            color: "#1C1917",
            marginBottom: 20,
          }}
        >
          Kalau kamu tim yang mana? 👇
        </div>

        <div style={{ display: "flex", gap: 22 }}>
          <div
            style={{
              flex: 1,
              backgroundColor: "#15803D",
              color: "#FFFBEB",
              borderRadius: 24,
              padding: "24px 20px",
              border: "5px solid #1C1917",
              boxShadow: "8px 8px 0px #1C1917",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: FONT_NUM, fontSize: 34, fontWeight: 800 }}>
              TUNAI
            </div>
            <div style={{ fontFamily: FONT_STORY, fontSize: 32, marginTop: 4 }}>
              Nunggu dulu
            </div>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "#FDE047",
              color: "#1C1917",
              borderRadius: 24,
              padding: "24px 20px",
              border: "5px solid #1C1917",
              boxShadow: "8px 8px 0px #1C1917",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: FONT_NUM, fontSize: 34, fontWeight: 800 }}>
              NYICIL
            </div>
            <div style={{ fontFamily: FONT_STORY, fontSize: 32, marginTop: 4 }}>
              Asal ringan
            </div>
          </div>
        </div>
      </div>

      {/* KARAKTER DIMAS LEGA DI TERAS PAGI */}
      <div style={{ position: "absolute", top: 880, right: 180 - panX * 0.6, zIndex: 24 }}>
        <CharacterDimas frame={frame} size={340} emotion="relieved" pose="morning" />
      </div>
    </div>
  );
};
