import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

export type BocoranUangStoryV1VisualType =
  | "bocoran-hook-desk"
  | "bocoran-bridge-notebook"
  | "bocoran-daily-leaks"
  | "bocoran-savings-impact"
  | "bocoran-morning-solution";

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

export const BocoranUangStoryV1Visuals: React.FC<{
  type: BocoranUangStoryV1VisualType;
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
      {type === "bocoran-hook-desk" && (
        <Scene1HookDesk frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "bocoran-bridge-notebook" && (
        <Scene2BridgeNotebook frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "bocoran-daily-leaks" && (
        <Scene3DailyLeaks frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "bocoran-savings-impact" && (
        <Scene4SavingsImpact frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "bocoran-morning-solution" && (
        <Scene5MorningSolution frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
    </div>
  );
};

// =========================================================================
// KARAKTER UTAMA: RAKA (Gaya #3 Hand-Drawn Personal Storytelling)
// =========================================================================
type RakaEmotion = "calm" | "confused" | "shocked" | "relieved";
type RakaPose = "desk" | "pointing" | "holding_cup" | "morning_stretch";

const CharacterRaka: React.FC<{
  size?: number;
  frame: number;
  emotion?: RakaEmotion;
  pose?: RakaPose;
}> = ({ size = 420, frame, emotion = "calm", pose = "desk" }) => {
  const breathY = Math.sin(frame / 12) * 4;
  const headTilt =
    emotion === "confused"
      ? Math.sin(frame / 10) * 3.5 - 4
      : Math.sin(frame / 11) * 2.2;
  const isBlinking = frame % 85 < 5;
  const mouthOpen = 3 + Math.abs(Math.sin(frame / 4.2)) * 7;

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
        {/* Bayangan Lantai/Meja */}
        <ellipse cx="110" cy="236" rx="72" ry="12" fill="rgba(28, 25, 23, 0.25)" />

        {/* Badan & Kaos Hangat */}
        <g transform={`translate(0, ${breathY * 0.6})`}>
          {/* Lengan Kiri */}
          <path
            d={
              pose === "morning_stretch"
                ? "M62 152 Q30 120 40 94"
                : "M62 152 Q36 176 52 204"
            }
            stroke="#0F766E"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx={pose === "morning_stretch" ? 40 : 52}
            cy={pose === "morning_stretch" ? 94 : 204}
            r="11"
            fill="#FDBA74"
            stroke="#1C1917"
            strokeWidth="3.5"
          />

          {/* Lengan Kanan */}
          <path
            d={
              pose === "pointing"
                ? "M158 152 Q186 138 196 116"
                : pose === "morning_stretch"
                ? "M158 152 Q190 120 180 94"
                : "M158 152 Q182 178 164 204"
            }
            stroke="#0F766E"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx={
              pose === "pointing"
                ? 196
                : pose === "morning_stretch"
                ? 180
                : 164
            }
            cy={
              pose === "pointing"
                ? 116
                : pose === "morning_stretch"
                ? 94
                : 204
            }
            r="11"
            fill="#FDBA74"
            stroke="#1C1917"
            strokeWidth="3.5"
          />

          {/* Torso Kaos */}
          <path
            d="M58 148 Q110 132 162 148 L170 228 Q110 236 50 228 Z"
            fill="#14B8A6"
            stroke="#1C1917"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Kerah */}
          <path
            d="M90 142 Q110 158 130 142"
            fill="none"
            stroke="#1C1917"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* Kepala & Ekspresi */}
        <g transform={`translate(0, ${breathY}) rotate(${headTilt}, 110, 120)`}>
          {/* Leher */}
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

          {/* Telinga */}
          <circle cx="64" cy="96" r="10" fill="#FDBA74" stroke="#1C1917" strokeWidth="4" />
          <circle cx="156" cy="96" r="10" fill="#FDBA74" stroke="#1C1917" strokeWidth="4" />

          {/* Wajah */}
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

          {/* Rambut Hand-Drawn */}
          <path
            d="M62 76 Q64 32 110 30 Q156 32 158 76 Q142 54 114 58 Q88 60 62 76 Z"
            fill="#1C1917"
          />
          <path
            d="M94 34 Q108 20 124 32"
            stroke="#1C1917"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Alis */}
          {emotion === "confused" ? (
            <>
              <path d="M80 74 Q90 66 100 72" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
              <path d="M120 68 Q130 62 140 70" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : emotion === "shocked" ? (
            <>
              <path d="M80 66 Q90 58 100 66" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
              <path d="M120 66 Q130 58 140 66" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M80 72 Q90 68 100 72" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
              <path d="M120 72 Q130 68 140 72" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
            </>
          )}

          {/* Mata */}
          {isBlinking ? (
            <>
              <path d="M82 88 Q90 92 98 88" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
              <path d="M122 88 Q130 92 138 88" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="90" cy="88" r="6" fill="#1C1917" />
              <circle cx="88" cy="86" r="2" fill="#FFFBEB" />
              <circle cx="130" cy="88" r="6" fill="#1C1917" />
              <circle cx="128" cy="86" r="2" fill="#FFFBEB" />
            </>
          )}

          {/* Pipi Hangat */}
          <ellipse cx="78" cy="102" rx="7" ry="4" fill="#FB7185" opacity="0.45" />
          <ellipse cx="142" cy="102" rx="7" ry="4" fill="#FB7185" opacity="0.45" />

          {/* Mulut */}
          {emotion === "confused" ? (
            <path
              d="M98 112 Q110 107 122 113"
              stroke="#1C1917"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          ) : emotion === "shocked" ? (
            <ellipse
              cx="110"
              cy="112"
              rx="8"
              ry={mouthOpen}
              fill="#7F1D1D"
              stroke="#1C1917"
              strokeWidth="3.5"
            />
          ) : (
            <path
              d="M96 108 Q110 120 124 108"
              stroke="#1C1917"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Simbol bingung / keringat */}
          {emotion === "confused" && (
            <text
              x="166"
              y="56"
              fill="#DC2626"
              fontSize="34"
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
// SCENE 1: HOOK MEJA KERJA (00:00–00:07)
// Slow dolly-in menuju layar ponsel & ekspresi bingung Raka + asap cangkir
// =========================================================================
const Scene1HookDesk: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Slow dolly-in halus (clamped)
  const dollyScale = interpolate(frame, [0, durationInFrames], [1.0, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dollyY = interpolate(frame, [0, durationInFrames], [0, -18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pergerakan cahaya lampu & asap cangkir
  const lampPulse = 0.85 + Math.sin(frame / 14) * 0.12;
  const steam1Y = ((frame * 1.1) % 70);
  const steam2Y = (((frame + 35) * 1.1) % 70);

  // Transisi saldo adem -> seret di tengah scene
  const isEndMonth = frame >= Math.round(durationInFrames * 0.48);
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.7 },
  });
  const phonePop = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 15, stiffness: 90, mass: 0.7 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `scale(${dollyScale * exitScale}) translateY(${dollyY}px)`,
        opacity: exitOpacity,
      }}
    >
      {/* BACKGROUND LAYER: Dinding & Jendela Sore Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s1Wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="55%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>
          <radialGradient id="s1LampGlow" cx="50%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity={0.45 * lampPulse} />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity={0.14 * lampPulse} />
            <stop offset="100%" stopColor="#451A03" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#s1Wall)" />

        {/* Jendela Sore di Belakang */}
        <rect x="110" y="340" width="380" height="440" rx="22" fill="#F59E0B" stroke="#1C1917" strokeWidth="6" />
        <rect x="128" y="358" width="344" height="404" rx="14" fill="#FDE68A" opacity="0.85" />
        <line x1="300" y1="340" x2="300" y2="780" stroke="#1C1917" strokeWidth="6" />
        <line x1="110" y1="560" x2="490" y2="560" stroke="#1C1917" strokeWidth="6" />

        {/* Lampu Meja & Kerucut Cahaya Hangat */}
        <polygon points="820,450 560,1150 1040,1150" fill="url(#s1LampGlow)" />
        <path d="M840 360 L840 500 Q840 520 820 520" stroke="#1C1917" strokeWidth="8" fill="none" />
        <path d="M760 450 L880 450 L850 385 L790 385 Z" fill="#FDE047" stroke="#1C1917" strokeWidth="5" />

        {/* Partikel Debu Cahaya Melayang */}
        <circle cx={680 + Math.sin(frame / 18) * 14} cy={620 + Math.cos(frame / 20) * 12} r="5" fill="#FEF3C7" opacity="0.55" />
        <circle cx={790 + Math.cos(frame / 15) * 16} cy={740 + Math.sin(frame / 17) * 14} r="4" fill="#FEF3C7" opacity="0.45" />
        <circle cx={620 + Math.sin(frame / 22) * 12} cy={830 + Math.cos(frame / 19) * 10} r="6" fill="#FEF3C7" opacity="0.35" />
      </svg>

      {/* TOP SAFE ZONE HEADER (0% - 22%) */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 80,
          right: 160,
          transform: `scale(${cardSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: isEndMonth ? "#DC2626" : "#F59E0B",
            color: isEndMonth ? "#FFFBEB" : "#1C1917",
            fontFamily: FONT_NUM,
            fontSize: 28,
            fontWeight: 800,
            padding: "8px 22px",
            borderRadius: 999,
            border: "4px solid #1C1917",
            boxShadow: "4px 4px 0px #1C1917",
            marginBottom: 14,
          }}
        >
          {isEndMonth ? "AKHIR BULAN" : "TANGGAL 5 GAJIAN"}
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 64,
            lineHeight: 1.08,
            color: "#FFFBEB",
            textShadow: "4px 4px 0px #1C1917",
          }}
        >
          {isEndMonth
            ? "Kok mendadak seret?"
            : "Saldo baru masuk, masih adem!"}
        </div>
      </div>

      {/* MIDGROUND LAYER: Karakter Raka di Belakang Meja */}
      <div
        style={{
          position: "absolute",
          top: 660,
          left: 110,
          zIndex: 18,
        }}
      >
        <CharacterRaka
          frame={frame}
          size={430}
          emotion={isEndMonth ? "confused" : "calm"}
          pose="desk"
        />
      </div>

      {/* MIDGROUND PROP: Layar Ponsel Saldo */}
      <div
        style={{
          position: "absolute",
          top: 670,
          right: 165,
          transform: `scale(${phonePop}) translateY(${Math.sin(frame / 10) * 6}px)`,
          zIndex: 22,
        }}
      >
        <div
          style={{
            width: 310,
            height: 410,
            borderRadius: 34,
            backgroundColor: "#FFFBEB",
            border: "6px solid #1C1917",
            boxShadow: "10px 12px 0px #1C1917",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: FONT_NUM, fontSize: 24, fontWeight: 800, color: "#57534E" }}>
              SALDO
            </span>
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: isEndMonth ? "#DC2626" : "#16A34A",
                border: "3px solid #1C1917",
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: FONT_NUM,
                fontSize: isEndMonth ? 52 : 56,
                fontWeight: 800,
                color: isEndMonth ? "#DC2626" : "#15803D",
                lineHeight: 1.05,
              }}
            >
              {isEndMonth ? "Rp 185 rb" : "Rp 5,2 Jt"}
            </div>
            <div
              style={{
                fontFamily: FONT_STORY,
                fontSize: 34,
                color: "#1C1917",
                marginTop: 10,
              }}
            >
              {isEndMonth ? "Padahal nggak beli barang mahal..." : "Aman buat sebulan"}
            </div>
          </div>

          {/* Bar Indikator Saldo */}
          <div
            style={{
              width: "100%",
              height: 22,
              backgroundColor: "#E7E5E4",
              borderRadius: 12,
              border: "3px solid #1C1917",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: isEndMonth ? "14%" : "92%",
                height: "100%",
                backgroundColor: isEndMonth ? "#DC2626" : "#16A34A",
              }}
            />
          </div>
        </div>
      </div>

      {/* FOREGROUND LAYER: Meja Kayu + Cangkir Kopi Hangat dengan Asap */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0, zIndex: 25 }}
      >
        {/* Meja Kayu */}
        <path
          d="M-20 1110 L1100 1110 L1100 1920 L-20 1920 Z"
          fill="#92400E"
          stroke="#1C1917"
          strokeWidth="6"
        />
        <line x1="0" y1="1150" x2="1080" y2="1150" stroke="#78350F" strokeWidth="6" />

        {/* Cangkir Kopi & Asap */}
        <g transform="translate(150, 1020)">
          {/* Asap Kopi 1 */}
          <path
            d={`M35 ${-10 - steam1Y} Q52 ${-30 - steam1Y} 38 ${-50 - steam1Y}`}
            stroke="#FFFBEB"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity={interpolate(steam1Y, [0, 35, 70], [0, 0.7, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          {/* Asap Kopi 2 */}
          <path
            d={`M68 ${-6 - steam2Y} Q50 ${-26 - steam2Y} 66 ${-46 - steam2Y}`}
            stroke="#FFFBEB"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity={interpolate(steam2Y, [0, 35, 70], [0, 0.6, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          <rect x="0" y="0" width="96" height="86" rx="16" fill="#FFFBEB" stroke="#1C1917" strokeWidth="5" />
          <path d="M96 18 Q126 18 126 42 Q126 66 96 66" stroke="#1C1917" strokeWidth="6" fill="none" />
        </g>

        {/* Siluet Tanaman Foreground di Pojok Kanan Bawah */}
        <path
          d="M1080 1920 Q960 1760 880 1830 Q970 1660 1080 1720 Z"
          fill="#14532D"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 2: JEMBATAN RASA PENASARAN (00:07–00:13)
// Pan menyamping lembut ke arah buku catatan saat titik kebocoran disorot
// =========================================================================
const Scene2BridgeNotebook: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Pan menyamping lembut (X-axis clamped)
  const panX = interpolate(frame, [0, durationInFrames], [45, -35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const noteSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.7 },
  });

  const point1 = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 100 } });
  const point2 = spring({ frame: Math.max(0, frame - 68), fps, config: { damping: 14, stiffness: 100 } });
  const point3 = spring({ frame: Math.max(0, frame - 108), fps, config: { damping: 14, stiffness: 100 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* BACKGROUND: Ruang Santai Hangat dengan Parallax Pan */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s2Bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="65%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s2Bg)" />

        {/* Rak Buku & Bingkai Dinding (Parallax 0.4x) */}
        <g transform={`translate(${panX * 0.4}, 0)`}>
          <rect x="90" y="340" width="260" height="22" rx="8" fill="#78350F" stroke="#1C1917" strokeWidth="4" />
          <rect x="115" y="255" width="38" height="85" rx="6" fill="#0F766E" stroke="#1C1917" strokeWidth="4" />
          <rect x="158" y="270" width="34" height="70" rx="6" fill="#DC2626" stroke="#1C1917" strokeWidth="4" />
          <rect x="198" y="248" width="44" height="92" rx="6" fill="#F59E0B" stroke="#1C1917" strokeWidth="4" />
        </g>
      </svg>

      {/* TOP SAFE ZONE HEADLINE */}
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
            display: "inline-block",
            backgroundColor: "#1C1917",
            color: "#FDE047",
            fontFamily: FONT_NUM,
            fontSize: 26,
            fontWeight: 800,
            padding: "8px 22px",
            borderRadius: 999,
            marginBottom: 12,
          }}
        >
          YUK BONGKAR POLANYA
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 62,
            lineHeight: 1.08,
            color: "#1C1917",
          }}
        >
          Bukan satu belanja besar, tapi...
        </div>
      </div>

      {/* MIDGROUND: Karakter Raka Menunjuk Buku Catatan */}
      <div
        style={{
          position: "absolute",
          top: 730,
          left: 20 + panX * 0.6,
          zIndex: 20,
        }}
      >
        <CharacterRaka frame={frame} size={360} emotion="calm" pose="pointing" />
      </div>

      {/* BUKU SAKU / PAPAN CATATAN HANGAT (Panning smoothly) */}
      <div
        style={{
          position: "absolute",
          top: 440,
          right: 155 - panX * 0.8,
          width: 560,
          backgroundColor: "#FFFBEB",
          border: "6px solid #1C1917",
          borderRadius: 28,
          padding: "32px 34px",
          boxShadow: "12px 14px 0px #1C1917",
          transform: `scale(${noteSpring}) rotate(-1.5deg)`,
          zIndex: 24,
        }}
      >
        {/* Spiral Buku */}
        <div style={{ display: "flex", gap: 22, marginBottom: 18 }}>
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: "#F59E0B",
                border: "3px solid #1C1917",
              }}
            />
          ))}
        </div>

        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 48,
            color: "#1C1917",
            borderBottom: "4px dashed #D6D3D1",
            paddingBottom: 12,
            marginBottom: 22,
          }}
        >
          Catatan Kebiasaan Kecil
        </div>

        {/* 3 Titik Kebocoran yang Disorot Satu Per Satu */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: point1,
              transform: `translateX(${(1 - point1) * 30}px)`,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                backgroundColor: "#DC2626",
                border: "3px solid #1C1917",
                flexShrink: 0,
              }}
            />
            <div style={{ fontFamily: FONT_NUM, fontSize: 34, fontWeight: 800, color: "#1C1917" }}>
              Jajan kecil tiap hari
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: point2,
              transform: `translateX(${(1 - point2) * 30}px)`,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                backgroundColor: "#F59E0B",
                border: "3px solid #1C1917",
                flexShrink: 0,
              }}
            />
            <div style={{ fontFamily: FONT_NUM, fontSize: 34, fontWeight: 800, color: "#1C1917" }}>
              Kelihatannya sepele
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: point3,
              transform: `translateX(${(1 - point3) * 30}px)`,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                backgroundColor: "#0F766E",
                border: "3px solid #1C1917",
                flexShrink: 0,
              }}
            />
            <div style={{ fontFamily: FONT_NUM, fontSize: 34, fontWeight: 800, color: "#DC2626" }}>
              Ngumpet di rutinitas!
            </div>
          </div>
        </div>
      </div>

      {/* FOREGROUND: Tepian Meja Santai */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0, zIndex: 28 }}
      >
        <path d="M-20 1200 L1100 1200 L1100 1920 L-20 1920 Z" fill="#78350F" stroke="#1C1917" strokeWidth="6" />
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 3: KEBOCORAN KECIL HARIAN (00:13–00:23)
// Pattern interrupt antar-beat (Warung Sore -> Meja Malam -> Akumulasi)
// =========================================================================
const Scene3DailyLeaks: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Pattern interrupt 3 beat dalam scene
  const beat1End = Math.round(durationInFrames * 0.34);
  const beat2End = Math.round(durationInFrames * 0.68);
  const isNightBeat = frame >= beat1End;
  const isAccumulateBeat = frame >= beat2End;

  const beatLocalFrame = isAccumulateBeat
    ? frame - beat2End
    : isNightBeat
    ? frame - beat1End
    : frame;

  // Perubahan framing (pattern interrupt zoom/pan) tiap beat
  const camScale = interpolate(beatLocalFrame, [0, 80], [1.02, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const reveal1 = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 14, stiffness: 100 } });
  const reveal2 = spring({ frame: Math.max(0, frame - beat1End + 6), fps, config: { damping: 14, stiffness: 100 } });
  const reveal3 = spring({ frame: Math.max(0, frame - beat2End + 6), fps, config: { damping: 13, stiffness: 110 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * camScale})`,
      }}
    >
      {/* BACKGROUND BERGANTI ALAMI: Sore Jalan/Warung -> Malam Lembur */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s3Sore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="55%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="s3Night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="65%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill={isNightBeat ? "url(#s3Night)" : "url(#s3Sore)"} />

        {!isNightBeat ? (
          /* Suasana Warung / Jalan Sore */
          <g>
            <circle cx="820" cy="360" r="85" fill="#FFFBEB" opacity="0.85" />
            <path d="M0 1080 L1080 1080 L1080 1920 L0 1920 Z" fill="#57534E" stroke="#1C1917" strokeWidth="5" />
            {/* Kanopi Warung */}
            <path d="M80 420 L760 420 L800 500 L40 500 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="5" />
          </g>
        ) : (
          /* Suasana Meja Malam Lembur */
          <g>
            <circle cx="840" cy="360" r="54" fill="#FEF3C7" opacity="0.9" />
            <circle cx="320" cy="320" r="4" fill="#FFFBEB" opacity="0.7" />
            <circle cx="510" cy="270" r="5" fill="#FFFBEB" opacity="0.6" />
            <path d="M0 1120 L1080 1120 L1080 1920 L0 1920 Z" fill="#451A03" stroke="#1C1917" strokeWidth="5" />
          </g>
        )}
      </svg>

      {/* TOP SAFE ZONE HEADLINE */}
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
            display: "inline-block",
            backgroundColor: "#FDE047",
            color: "#1C1917",
            fontFamily: FONT_NUM,
            fontSize: 26,
            fontWeight: 800,
            padding: "8px 22px",
            borderRadius: 999,
            border: "4px solid #1C1917",
            marginBottom: 12,
          }}
        >
          {isAccumulateBeat
            ? "DIULANG TIAP HARI"
            : isNightBeat
            ? "MALAM PAS LEMBUR"
            : "SORE PANAS-PANAS"}
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 60,
            lineHeight: 1.08,
            color: isNightBeat ? "#FFFBEB" : "#1C1917",
            textShadow: isNightBeat ? "3px 3px 0px #1C1917" : "none",
          }}
        >
          {isAccumulateBeat
            ? "Sekali enteng, sebulan numpuk!"
            : "Kebocoran kecil harian:"}
        </div>
      </div>

      {/* STAGED REVEAL ANGKA HARIAN YANG MEMBESAR BERTAHAP */}
      <div
        style={{
          position: "absolute",
          top: 430,
          left: 80,
          right: 170,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 24,
        }}
      >
        {/* Item 1: Minuman Es */}
        <div
          style={{
            backgroundColor: "#FFFBEB",
            border: "5px solid #1C1917",
            borderRadius: 24,
            padding: "20px 28px",
            boxShadow: "8px 8px 0px #1C1917",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: reveal1,
            transform: `scale(${reveal1})`,
          }}
        >
          <div style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#1C1917" }}>
            🥤 Es kopi / minuman
          </div>
          <div style={{ fontFamily: FONT_NUM, fontSize: 42, fontWeight: 800, color: "#DC2626" }}>
            Rp 18 rb
          </div>
        </div>

        {/* Item 2: Camilan & Ongkir */}
        {isNightBeat && (
          <div
            style={{
              backgroundColor: "#FFFBEB",
              border: "5px solid #1C1917",
              borderRadius: 24,
              padding: "20px 28px",
              boxShadow: "8px 8px 0px #1C1917",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: reveal2,
              transform: `scale(${reveal2})`,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 44, color: "#1C1917" }}>
              🍪 Camilan + ongkir
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 42, fontWeight: 800, color: "#DC2626" }}>
              Rp 27 rb
            </div>
          </div>
        )}

        {/* Item 3: Total Bulanan Membesar */}
        {isAccumulateBeat && (
          <div
            style={{
              backgroundColor: "#DC2626",
              border: "6px solid #1C1917",
              borderRadius: 28,
              padding: "26px 32px",
              boxShadow: "10px 10px 0px #1C1917",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: reveal3,
              transform: `scale(${reveal3 * 1.03})`,
            }}
          >
            <div style={{ fontFamily: FONT_STORY, fontSize: 46, color: "#FFFBEB" }}>
              × 30 hari =
            </div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 58, fontWeight: 800, color: "#FDE047" }}>
              Rp 1,35 Jt
            </div>
          </div>
        )}
      </div>

      {/* MIDGROUND CHARACTER RAKA */}
      <div
        style={{
          position: "absolute",
          top: 900,
          left: isNightBeat ? 480 : 120,
          zIndex: 22,
        }}
      >
        <CharacterRaka
          frame={frame}
          size={340}
          emotion={isAccumulateBeat ? "shocked" : "calm"}
          pose={isNightBeat ? "desk" : "holding_cup"}
        />
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 4: DAMPAK NYATA AKHIR BULAN (00:23–00:34)
// Slow dolly-out ringan + toples tabungan menyusut (porsi aman vs tergerus)
// =========================================================================
const Scene4SavingsImpact: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Slow dolly-out ringan (1.06 -> 1.00 clamped)
  const dollyOut = interpolate(frame, [0, durationInFrames], [1.06, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Level cairan/isi toples tabungan menyusut pelan mengikuti alur cerita
  const jarFillPct = interpolate(
    frame,
    [15, Math.round(durationInFrames * 0.72)],
    [0.78, 0.24],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const labelSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const fillHeight = Math.round(330 * jarFillPct);
  const fillY = 820 + (330 - fillHeight);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * dollyOut})`,
      }}
    >
      {/* BACKGROUND: Ruang Tamu / Meja Makan Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s4Room" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="70%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s4Room)" />

        {/* Meja Makan */}
        <path d="M-20 1120 L1100 1120 L1100 1920 L-20 1920 Z" fill="#92400E" stroke="#1C1917" strokeWidth="6" />
      </svg>

      {/* TOP SAFE ZONE HEADLINE */}
      <div
        style={{
          position: "absolute",
          top: 205,
          left: 80,
          right: 160,
          transform: `scale(${labelSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#DC2626",
            color: "#FFFBEB",
            fontFamily: FONT_NUM,
            fontSize: 26,
            fontWeight: 800,
            padding: "8px 22px",
            borderRadius: 999,
            border: "4px solid #1C1917",
            marginBottom: 12,
          }}
        >
          DAMPAK AKHIR BULAN
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 60,
            lineHeight: 1.08,
            color: "#1C1917",
          }}
        >
          Tabungan ikut kepangkas, rencana ketunda
        </div>
      </div>

      {/* TOPLES TABUNGAN MENYUSUT (Porsi Aman vs Tergerus) */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0, zIndex: 22 }}
      >
        {/* Bayangan Toples */}
        <ellipse cx="360" cy="1175" rx="150" ry="20" fill="rgba(28, 25, 23, 0.25)" />

        {/* Area Target Aman (Garis Putus-putus Atas) */}
        <rect
          x="230"
          y="780"
          width="260"
          height="380"
          rx="36"
          fill="#FFFBEB"
          fillOpacity="0.65"
          stroke="#1C1917"
          strokeWidth="6"
        />

        {/* Porsi Tergerus (Merah Transparan di Atas) */}
        <rect
          x="242"
          y="820"
          width="236"
          height={Math.max(0, 330 - fillHeight)}
          rx="16"
          fill="#FCA5A5"
          opacity="0.7"
        />

        {/* Porsi Aman Tersisa (Hijau) */}
        <rect
          x="242"
          y={fillY}
          width="236"
          height={fillHeight}
          rx="20"
          fill="#16A34A"
          stroke="#1C1917"
          strokeWidth="4"
        />

        {/* Tutup Toples */}
        <rect x="250" y="742" width="220" height="44" rx="12" fill="#F59E0B" stroke="#1C1917" strokeWidth="5" />

        {/* Label Toples */}
        <rect x="270" y="945" width="180" height="62" rx="14" fill="#FFFBEB" stroke="#1C1917" strokeWidth="4" />
        <text
          x="360"
          y="987"
          textAnchor="middle"
          fill="#1C1917"
          fontSize="30"
          fontWeight="800"
          fontFamily={FONT_NUM}
        >
          TABUNGAN
        </text>
      </svg>

      {/* LABEL KONTRAS BESAR (Tanpa menumpuk banyak card kecil) */}
      <div
        style={{
          position: "absolute",
          top: 760,
          right: 165,
          width: 380,
          display: "flex",
          flexDirection: "column",
          gap: 26,
          zIndex: 26,
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFBEB",
            border: "5px solid #1C1917",
            borderRadius: 24,
            padding: "20px 26px",
            boxShadow: "8px 8px 0px #1C1917",
          }}
        >
          <div style={{ fontFamily: FONT_STORY, fontSize: 34, color: "#DC2626" }}>
            Tergerus jajan kecil
          </div>
          <div style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 800, color: "#1C1917" }}>
            -{Math.round((1 - jarFillPct) * 100)}%
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#15803D",
            border: "5px solid #1C1917",
            borderRadius: 24,
            padding: "20px 26px",
            boxShadow: "8px 8px 0px #1C1917",
          }}
        >
          <div style={{ fontFamily: FONT_STORY, fontSize: 34, color: "#FEF3C7" }}>
            Porsi aman tersisa
          </div>
          <div style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 800, color: "#FDE047" }}>
            {Math.round(jarFillPct * 100)}%
          </div>
        </div>
      </div>

      {/* KARAKTER RAKA TERKEJUT MELIHAT TOPLES */}
      <div style={{ position: "absolute", top: 960, right: 170, zIndex: 25 }}>
        <CharacterRaka frame={frame} size={310} emotion="shocked" pose="desk" />
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: SOLUSI PRAKTIS & PENUTUP (00:34–00:42)
// Slow pan ke cahaya pagi hangat di teras rumah + pertanyaan terbuka
// =========================================================================
const Scene5MorningSolution: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Slow pan ke arah cahaya pagi hangat
  const panX = interpolate(frame, [0, durationInFrames], [-35, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const habitSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 14, stiffness: 95 },
  });
  const ctaSpring = spring({
    frame: Math.max(0, frame - Math.round(durationInFrames * 0.5)),
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
      {/* BACKGROUND: Pagi Cerah di Teras Rumah */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s5Morning" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="48%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
          <radialGradient id="s5Sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FDE047" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#s5Morning)" />

        <g transform={`translate(${panX * 0.5}, 0)`}>
          <circle cx="820" cy="400" r="280" fill="url(#s5Sun)" />
          <circle cx="820" cy="400" r="80" fill="#FFFBEB" />
          {/* Bukit & Pepohonan Pagi */}
          <path d="M-120 1060 Q320 920 680 1040 T1200 980 L1200 1920 L-120 1920 Z" fill="#15803D" opacity="0.65" />
        </g>

        {/* Lantai Teras Rumah */}
        <path d="M-40 1150 L1120 1150 L1120 1920 L-40 1920 Z" fill="#FDE68A" stroke="#1C1917" strokeWidth="6" />

        {/* Daun Foreground di Kiri */}
        <g transform={`translate(${panX * 1.2}, 0)`}>
          <path d="M0 1920 Q90 1680 170 1560 Q140 1760 40 1920 Z" fill="#14532D" />
        </g>
      </svg>

      {/* TOP SAFE ZONE HEADLINE */}
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
            display: "inline-block",
            backgroundColor: "#15803D",
            color: "#FFFBEB",
            fontFamily: FONT_NUM,
            fontSize: 26,
            fontWeight: 800,
            padding: "8px 22px",
            borderRadius: 999,
            border: "4px solid #1C1917",
            marginBottom: 12,
          }}
        >
          LANGKAH REALISTIS
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 60,
            lineHeight: 1.08,
            color: "#1C1917",
          }}
        >
          Nggak perlu nahan diri sampai stres
        </div>
      </div>

      {/* 2 KEBIASAAN RINGAN */}
      <div
        style={{
          position: "absolute",
          top: 430,
          left: 80,
          right: 170,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          transform: `scale(${habitSpring})`,
          zIndex: 24,
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFBEB",
            border: "5px solid #1C1917",
            borderRadius: 24,
            padding: "20px 28px",
            boxShadow: "8px 8px 0px #1C1917",
            fontFamily: FONT_NUM,
            fontSize: 34,
            fontWeight: 800,
            color: "#1C1917",
          }}
        >
          1. Pasang batas wajar buat jajan
        </div>

        <div
          style={{
            backgroundColor: "#FFFBEB",
            border: "5px solid #1C1917",
            borderRadius: 24,
            padding: "20px 28px",
            boxShadow: "8px 8px 0px #1C1917",
            fontFamily: FONT_NUM,
            fontSize: 34,
            fontWeight: 800,
            color: "#15803D",
          }}
        >
          2. Cek aliran kecil 1× seminggu
        </div>
      </div>

      {/* PERTANYAAN TERBUKA PEMANTIK KOMENTAR */}
      <div
        style={{
          position: "absolute",
          top: 710,
          left: 80,
          right: 170,
          backgroundColor: "#FDE047",
          border: "6px solid #1C1917",
          borderRadius: 28,
          padding: "24px 30px",
          boxShadow: "10px 10px 0px #1C1917",
          transform: `scale(${ctaSpring})`,
          opacity: ctaSpring,
          zIndex: 28,
        }}
      >
        <div style={{ fontFamily: FONT_STORY, fontSize: 48, lineHeight: 1.15, color: "#1C1917" }}>
          Pos kecil apa yang paling sering bikin bocor di kamu? 👇
        </div>
      </div>

      {/* KARAKTER RAKA TENANG DI TERAS PAGI */}
      <div
        style={{
          position: "absolute",
          top: 930,
          right: 180 - panX * 0.6,
          zIndex: 25,
        }}
      >
        <CharacterRaka frame={frame} size={340} emotion="relieved" pose="morning_stretch" />
      </div>
    </div>
  );
};
