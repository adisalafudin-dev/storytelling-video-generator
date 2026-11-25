import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

export type TidurDelapanJamStoryV1VisualType =
  | "tidur-hook-pagi"
  | "tidur-bridge-pola"
  | "tidur-celah-layar"
  | "tidur-dampak-siang"
  | "tidur-langkah-ringan";

const FONT_STORY = "'Patrick Hand', cursive, sans-serif";
const FONT_NUM = "'Plus Jakarta Sans', sans-serif";

const useCleanExit = (frame: number, sceneFrames: number) => {
  const safeEnd = Math.max(24, sceneFrames);
  const exitOpacity = interpolate(
    frame,
    [safeEnd - 14, safeEnd - 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitScale = interpolate(
    frame,
    [safeEnd - 14, safeEnd - 4],
    [1, 0.97],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return { exitOpacity, exitScale };
};

export const TidurDelapanJamStoryV1Visuals: React.FC<{
  type: TidurDelapanJamStoryV1VisualType;
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
      {type === "tidur-hook-pagi" && (
        <Scene1HookPagi frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "tidur-bridge-pola" && (
        <Scene2BridgePola frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "tidur-celah-layar" && (
        <Scene3CelahLayar frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "tidur-dampak-siang" && (
        <Scene4DampakSiang frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "tidur-langkah-ringan" && (
        <Scene5LangkahRingan frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
    </div>
  );
};

// =========================================================================
// KARAKTER UTAMA: NADIA (Hand-Drawn Personal Storytelling)
// =========================================================================
type NadiaEmotion = "yawning" | "tired" | "phone" | "drained" | "calm";

const CharacterNadia: React.FC<{
  size?: number;
  frame: number;
  emotion?: NadiaEmotion;
}> = ({ size = 380, frame, emotion = "tired" }) => {
  const breathY = Math.sin(frame / 12) * 3.5;
  const headTilt =
    emotion === "yawning"
      ? Math.sin(frame / 14) * 2.5 - 4
      : emotion === "drained"
      ? Math.sin(frame / 11) * 3 + 5
      : emotion === "calm"
      ? Math.sin(frame / 15) * 2 - 2
      : Math.sin(frame / 12) * 2;
  const isBlinking = frame % 86 < 5;
  const yawnOpen =
    emotion === "yawning"
      ? interpolate(Math.sin(frame / 10), [-1, 1], [6, 15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <div
      style={{
        width: size,
        height: size * 1.08,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size * 1.08}
        viewBox="0 0 220 238"
        fill="none"
        style={{ overflow: "visible" }}
      >
        {/* Bayangan lembut */}
        <ellipse cx="110" cy="226" rx="68" ry="10" fill="rgba(28, 25, 23, 0.22)" />

        {/* Rambut belakang + cepol santai */}
        <g transform={`translate(0, ${breathY}) rotate(${headTilt}, 110, 110)`}>
          <circle cx="110" cy="30" r="22" fill="#292524" stroke="#1C1917" strokeWidth="4" />
          <path
            d="M62 88 Q52 135 66 154 L154 154 Q168 135 158 88 Z"
            fill="#292524"
            stroke="#1C1917"
            strokeWidth="4"
          />
        </g>

        {/* Badan & Sweater/Piyama Hangat */}
        <g transform={`translate(0, ${breathY * 0.6})`}>
          {/* Lengan Kiri */}
          <path
            d={
              emotion === "yawning"
                ? "M60 152 Q36 132 50 108"
                : emotion === "drained"
                ? "M60 152 Q38 182 54 206"
                : "M60 152 Q42 178 60 202"
            }
            stroke="#9F1239"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx={emotion === "yawning" ? 50 : emotion === "drained" ? 54 : 60}
            cy={emotion === "yawning" ? 108 : emotion === "drained" ? 206 : 202}
            r="10"
            fill="#FED7AA"
            stroke="#1C1917"
            strokeWidth="3.5"
          />

          {/* Lengan Kanan */}
          <path
            d={
              emotion === "phone"
                ? "M160 152 Q182 172 152 190"
                : emotion === "calm"
                ? "M160 152 Q184 168 172 198"
                : "M160 152 Q182 178 164 204"
            }
            stroke="#9F1239"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx={emotion === "phone" ? 152 : emotion === "calm" ? 172 : 164}
            cy={emotion === "phone" ? 190 : emotion === "calm" ? 198 : 204}
            r="10"
            fill="#FED7AA"
            stroke="#1C1917"
            strokeWidth="3.5"
          />

          {/* Torso Sweater Terracotta / Rose */}
          <path
            d="M58 148 Q110 134 162 148 L170 220 Q110 228 50 220 Z"
            fill="#BE123C"
            stroke="#1C1917"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Kerah Putih */}
          <path
            d="M88 142 Q110 156 132 142"
            stroke="#FFFBEB"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Kepala & Ekspresi Nadia */}
        <g transform={`translate(0, ${breathY}) rotate(${headTilt}, 110, 110)`}>
          <rect
            x="98"
            y="122"
            width="24"
            height="22"
            rx="8"
            fill="#FED7AA"
            stroke="#1C1917"
            strokeWidth="3.5"
          />
          <circle
            cx="110"
            cy="88"
            r="46"
            fill="#FED7AA"
            stroke="#1C1917"
            strokeWidth="4.5"
          />
          {/* Poni rambut hand-drawn */}
          <path
            d="M64 82 Q72 42 110 40 Q148 42 156 82 Q138 62 114 66 Q90 60 64 82 Z"
            fill="#292524"
            stroke="#1C1917"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Mata */}
          {isBlinking || emotion === "calm" ? (
            <>
              <path
                d="M84 88 Q92 94 100 88"
                stroke="#1C1917"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M120 88 Q128 94 136 88"
                stroke="#1C1917"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : emotion === "yawning" || emotion === "tired" || emotion === "drained" ? (
            <>
              {/* Mata setengah sayu + kantung mata tipis */}
              <path
                d="M83 84 Q92 80 101 84"
                stroke="#1C1917"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="92" cy="90" r="4.5" fill="#1C1917" />
              <path
                d="M85 98 Q92 101 99 98"
                stroke="#9A3412"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.55"
                fill="none"
              />
              <path
                d="M119 84 Q128 80 137 84"
                stroke="#1C1917"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="128" cy="90" r="4.5" fill="#1C1917" />
              <path
                d="M121 98 Q128 101 135 98"
                stroke="#9A3412"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.55"
                fill="none"
              />
            </>
          ) : (
            <>
              <circle cx="92" cy="88" r="5" fill="#1C1917" />
              <circle cx="128" cy="88" r="5" fill="#1C1917" />
              <circle cx="90" cy="86" r="1.8" fill="#FFFBEB" />
              <circle cx="126" cy="86" r="1.8" fill="#FFFBEB" />
            </>
          )}

          {/* Alis ekspresif */}
          <path
            d={emotion === "drained" ? "M82 74 Q92 78 100 73" : "M82 76 Q92 72 100 76"}
            stroke="#1C1917"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={emotion === "drained" ? "M120 73 Q128 78 138 74" : "M120 76 Q128 72 138 76"}
            stroke="#1C1917"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Mulut */}
          {emotion === "yawning" ? (
            <ellipse
              cx="110"
              cy="112"
              rx="10"
              ry={yawnOpen}
              fill="#7F1D1D"
              stroke="#1C1917"
              strokeWidth="3.5"
            />
          ) : emotion === "calm" ? (
            <path
              d="M98 109 Q110 119 122 109"
              stroke="#1C1917"
              strokeWidth="3.8"
              strokeLinecap="round"
              fill="none"
            />
          ) : emotion === "drained" || emotion === "tired" ? (
            <path
              d="M100 114 Q110 108 120 114"
              stroke="#1C1917"
              strokeWidth="3.8"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <path
              d="M101 112 L119 112"
              stroke="#1C1917"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
          )}

          {/* Rona pipi hangat */}
          <ellipse cx="78" cy="100" rx="8" ry="4.5" fill="#FB7185" opacity="0.4" />
          <ellipse cx="142" cy="100" rx="8" ry="4.5" fill="#FB7185" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 1: HOOK KONTRAS PAGI HARI (00:00–00:07)
// Kamar pagi hangat, jendela + gorden bergerak, alarm 06:00, Nadia menguap
// =========================================================================
const Scene1HookPagi: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Slow dolly-in halus
  const dollyScale = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isContrastFlip = frame > 95;
  const headSpring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const alarmShake = isContrastFlip ? Math.sin(frame * 1.4) * 5 : Math.sin(frame * 0.25) * 1.5;
  const curtainSway = Math.sin(frame / 18) * 12;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * dollyScale})`,
        transformOrigin: "center 45%",
      }}
    >
      {/* BACKGROUND: Kamar Pagi Hangat + Jendela Matahari */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s1Wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="65%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="s1Sunbeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s1Wall)" />

        {/* Jendela Kamar */}
        <g transform="translate(590, 390)">
          <rect x="0" y="0" width="330" height="430" rx="18" fill="#BAE6FD" stroke="#78350F" strokeWidth="10" />
          <line x1="165" y1="0" x2="165" y2="430" stroke="#78350F" strokeWidth="8" />
          <line x1="0" y1="215" x2="330" y2="215" stroke="#78350F" strokeWidth="8" />
          {/* Matahari pagi */}
          <circle cx="245" cy="95" r="46" fill="#FDE047" opacity="0.9" />
          {/* Gorden Bergerak Pelan */}
          <path
            d={`M-14 -10 Q${48 + curtainSway} 190 22 440 L-14 440 Z`}
            fill="#FFFBEB"
            stroke="#1C1917"
            strokeWidth="4"
            opacity="0.9"
          />
        </g>

        {/* Sinar Matahari Diagonal & Debu Cahaya Melayang */}
        <polygon points="590,390 920,390 360,1260 60,1260" fill="url(#s1Sunbeam)" />
        {[0, 1, 2, 3, 4].map((i) => {
          const dx = 220 + i * 110 + Math.sin(frame / 22 + i) * 18;
          const dy = 560 + i * 95 + Math.cos(frame / 18 + i) * 14;
          return (
            <circle
              key={i}
              cx={dx}
              cy={dy}
              r={5 + (i % 2) * 3}
              fill="#FFFBEB"
              opacity={0.45 + Math.sin(frame / 15 + i) * 0.25}
            />
          );
        })}
      </svg>

      {/* TOP SAFE ZONE: Hierarki Angka Kunci Tanpa Kotak Kaku */}
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
            fontSize: 92,
            fontWeight: 800,
            color: isContrastFlip ? "#B91C1C" : "#1C1917",
            lineHeight: 1.0,
            letterSpacing: "-2px",
          }}
        >
          {isContrastFlip ? "KEPALA BERAT" : "8 JAM PENUH"}
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 52,
            color: "#451A03",
            marginTop: 8,
            lineHeight: 1.12,
          }}
        >
          {isContrastFlip
            ? "Pas alarm bunyi, badan berasa remuk..."
            : "Di catatan tidur udah pas banget!"}
        </div>
      </div>

      {/* MIDGROUND: Bantal, Kasur, & Nadia Menguap */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 15 }}>
        {/* Sandaran Kasur */}
        <rect x="80" y="880" width="600" height="280" rx="28" fill="#92400E" stroke="#1C1917" strokeWidth="6" />
        {/* Bantal Empuk */}
        <rect x="130" y="940" width="260" height="120" rx="40" fill="#FFFBEB" stroke="#1C1917" strokeWidth="5" />
      </svg>

      <div style={{ position: "absolute", top: 690, left: 130, zIndex: 20 }}>
        <CharacterNadia
          frame={frame}
          size={390}
          emotion={isContrastFlip ? "yawning" : "tired"}
        />
      </div>

      {/* MIDGROUND PROP: Jam Alarm Pagi (Bergetar) */}
      <div
        style={{
          position: "absolute",
          top: 840,
          right: 170,
          transform: `rotate(${alarmShake}deg)`,
          zIndex: 22,
        }}
      >
        <svg width="210" height="220" viewBox="0 0 210 220" style={{ overflow: "visible" }}>
          {/* Lonceng Atas */}
          <path d="M40 52 Q24 22 64 26" stroke="#1C1917" strokeWidth="6" fill="#F59E0B" />
          <path d="M170 52 Q186 22 146 26" stroke="#1C1917" strokeWidth="6" fill="#F59E0B" />
          {/* Badan Jam */}
          <circle cx="105" cy="115" r="76" fill="#FFFBEB" stroke="#1C1917" strokeWidth="7" />
          <circle cx="105" cy="115" r="62" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          {/* Jarum Jam 06:00 */}
          <line x1="105" y1="115" x2="105" y2="72" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
          <line x1="105" y1="115" x2="105" y2="152" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
          <circle cx="105" cy="115" r="7" fill="#1C1917" />
          {isContrastFlip && (
            <text
              x="105"
              y="214"
              textAnchor="middle"
              fill="#B91C1C"
              fontSize="30"
              fontWeight="800"
              fontFamily={FONT_NUM}
            >
              KRING! 06:00
            </text>
          )}
        </svg>
      </div>

      {/* FOREGROUND: Selimut Kasur Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 25 }}>
        <path
          d="M-20 1110 Q280 1070 580 1115 L1100 1125 L1100 1920 L-20 1920 Z"
          fill="#E11D48"
          stroke="#1C1917"
          strokeWidth="6"
        />
        <path
          d="M-20 1110 Q280 1070 580 1115 L1100 1125 L1100 1170 L-20 1155 Z"
          fill="#FFFBEB"
          stroke="#1C1917"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 2: BRIDGE RASA PENASARAN (00:07–00:13)
// Pan menyamping ke meja kamar dengan buku catatan terbuka & garis waktu
// =========================================================================
const Scene2BridgePola: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  const panX = interpolate(frame, [0, durationInFrames], [48, -36], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bookSpring = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 14, stiffness: 90 } });
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
      {/* BACKGROUND: Meja Kayu Kamar Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s2Bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s2Bg)" />
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
            color: "#1C1917",
            lineHeight: 1.08,
          }}
        >
          Kenapa bisa gitu ya?
        </div>
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 48,
            fontWeight: 800,
            color: "#B45309",
            marginTop: 10,
          }}
        >
          Yuk sini kita cek polanya.
        </div>
      </div>

      {/* MIDGROUND: Buku Catatan Terbuka + Garis Waktu Malam-ke-Pagi (Pan Halus) */}
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 60,
          right: 120,
          transform: `translateX(${panX}px) scale(${bookSpring})`,
          zIndex: 20,
        }}
      >
        <svg width="880" height="620" viewBox="0 0 880 620" style={{ overflow: "visible" }}>
          {/* Bayangan Buku */}
          <rect x="44" y="64" width="800" height="490" rx="24" fill="rgba(28, 25, 23, 0.2)" />
          {/* Sampul & Halaman Kertas Bergaris */}
          <rect x="30" y="45" width="800" height="490" rx="22" fill="#FFFBEB" stroke="#1C1917" strokeWidth="6" />
          <line x1="430" y1="45" x2="430" y2="535" stroke="#D6D3D1" strokeWidth="5" />

          {/* Judul Tulisan Tangan di Buku */}
          <text x="90" y="128" fill="#1C1917" fontSize="38" fontFamily={FONT_STORY}>
            Pola Tidur Nadia (22:00 → 06:00)
          </text>

          {/* Garis Waktu Horizontal Malam-ke-Pagi */}
          <line x1="90" y1="295" x2="770" y2="295" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
          <text x="90" y="346" fill="#57534E" fontSize="28" fontWeight="800" fontFamily={FONT_NUM}>
            22:00
          </text>
          <text x="705" y="346" fill="#57534E" fontSize="28" fontWeight="800" fontFamily={FONT_NUM}>
            06:00
          </text>

          {/* Titik Celah 1 */}
          <g transform={`translate(210, 295) scale(${dot1})`}>
            <circle cx="0" cy="0" r="24" fill="#38BDF8" stroke="#1C1917" strokeWidth="5" />
            <text x="0" y="-44" textAnchor="middle" fill="#0369A1" fontSize="30" fontWeight="800" fontFamily={FONT_NUM}>
              Scroll HP
            </text>
          </g>

          {/* Titik Celah 2 */}
          <g transform={`translate(440, 295) scale(${dot2})`}>
            <circle cx="0" cy="0" r="24" fill="#F59E0B" stroke="#1C1917" strokeWidth="5" />
            <text x="0" y="-44" textAnchor="middle" fill="#B45309" fontSize="30" fontWeight="800" fontFamily={FONT_NUM}>
              Kebangun
            </text>
          </g>

          {/* Titik Celah 3 */}
          <g transform={`translate(645, 295) scale(${dot3})`}>
            <circle cx="0" cy="0" r="24" fill="#DC2626" stroke="#1C1917" strokeWidth="5" />
            <text x="0" y="-44" textAnchor="middle" fill="#DC2626" fontSize="30" fontWeight="800" fontFamily={FONT_NUM}>
              Tidur Dangkal
            </text>
          </g>

          {/* Pena Kayu di Samping Buku */}
          <g transform="translate(755, 130) rotate(18)">
            <rect x="0" y="0" width="22" height="230" rx="8" fill="#1D4ED8" stroke="#1C1917" strokeWidth="4" />
            <polygon points="0,230 22,230 11,264" fill="#FED7AA" stroke="#1C1917" strokeWidth="4" />
          </g>
        </svg>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 3: CELAH YANG MENGGERUS TIDUR (00:13–00:24)
// Kamar malam teduh, cahaya biru HP di foreground, jam dinding, pattern interrupt
// =========================================================================
const Scene3CelahLayar: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Pattern interrupt 3 beat
  const beat = frame < 95 ? 1 : frame < 205 ? 2 : 3;
  const beatZoom =
    beat === 1
      ? interpolate(frame, [0, 95], [1.0, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : beat === 2
      ? interpolate(frame, [95, 205], [1.05, 1.01], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : interpolate(frame, [205, durationInFrames], [1.01, 1.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const splitReveal = spring({
    frame: Math.max(0, frame - 205),
    fps,
    config: { damping: 14, stiffness: 95 },
  });

  const phonePulse = 0.65 + Math.sin(frame / 8) * 0.2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * beatZoom})`,
      }}
    >
      {/* BACKGROUND: Kamar Malam Teduh + Jendela Malam */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s3Night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <radialGradient id="s3BlueGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity={phonePulse} />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s3Night)" />

        {/* Jendela Malam (Background) */}
        <g transform="translate(650, 410)">
          <rect x="0" y="0" width="260" height="340" rx="16" fill="#020617" stroke="#334155" strokeWidth="8" />
          <path d="M180 65 A34 34 0 1 0 210 105 A26 26 0 1 1 180 65 Z" fill="#FDE047" />
          <circle cx="70" cy="85" r="4" fill="#FFFBEB" />
          <circle cx="120" cy="145" r="3" fill="#FFFBEB" />
          <circle cx="200" cy="210" r="4" fill="#FFFBEB" />
        </g>

        {/* Jam Dinding Midground */}
        <g transform="translate(210, 520)">
          <circle cx="0" cy="0" r="78" fill="#1E293B" stroke="#94A3B8" strokeWidth="6" />
          <line x1="0" y1="0" x2="0" y2="-46" stroke="#F8FAFC" strokeWidth="6" strokeLinecap="round" />
          <line
            x1="0"
            y1="0"
            x2={beat === 1 ? 35 : 0}
            y2={beat === 1 ? -15 : -54}
            stroke="#38BDF8"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="6" fill="#F8FAFC" />
        </g>

        {/* Cahaya Biru Layar HP */}
        <circle cx="480" cy="960" r="340" fill="url(#s3BlueGlow)" />
      </svg>

      {/* TOP SAFE ZONE: Angka Kunci Bertahap */}
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
            fontFamily: FONT_NUM,
            fontSize: 82,
            fontWeight: 800,
            color: beat === 1 ? "#38BDF8" : beat === 2 ? "#FBBF24" : "#F87171",
            lineHeight: 1.02,
          }}
        >
          {beat === 1
            ? "-1 JAM SCROLL"
            : beat === 2
            ? "KEPOTONG-POTONG"
            : "8 JAM ≠ NYENYAK"}
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 48,
            color: "#F8FAFC",
            marginTop: 8,
            lineHeight: 1.12,
          }}
        >
          {beat === 1
            ? "Sebelum merem, mata kena cahaya layar..."
            : beat === 2
            ? "Ditambah kebangun tengah malam."
            : "Di kasur 8 jam, nyenyaknya kepangkas."}
        </div>
      </div>

      {/* MIDGROUND: Nadia dengan Layar HP di Malam Hari */}
      <div style={{ position: "absolute", top: 650, left: 120, zIndex: 20 }}>
        <CharacterNadia frame={frame} size={370} emotion={beat === 1 ? "phone" : "tired"} />
      </div>

      {/* STAGED REVEAL PEMISAH DURASI (Muncul di Beat 3 tanpa kotak kaku) */}
      {beat === 3 && (
        <div
          style={{
            position: "absolute",
            top: 660,
            right: 165,
            width: 390,
            transform: `scale(${splitReveal})`,
            zIndex: 25,
          }}
        >
          <div style={{ fontFamily: FONT_NUM, fontSize: 30, fontWeight: 800, color: "#94A3B8" }}>
            DI KASUR
          </div>
          <div
            style={{
              height: 36,
              width: "100%",
              backgroundColor: "#334155",
              borderRadius: 12,
              border: "3px solid #F8FAFC",
              marginTop: 6,
              display: "flex",
              alignItems: "center",
              paddingLeft: 14,
              color: "#FFFBEB",
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            8 JAM
          </div>

          <div
            style={{
              fontFamily: FONT_NUM,
              fontSize: 30,
              fontWeight: 800,
              color: "#FBBF24",
              marginTop: 22,
            }}
          >
            TIDUR NYENYAK
          </div>
          <div
            style={{
              height: 36,
              width: "68%",
              backgroundColor: "#DC2626",
              borderRadius: 12,
              border: "3px solid #F8FAFC",
              marginTop: 6,
              display: "flex",
              alignItems: "center",
              paddingLeft: 14,
              color: "#FFFBEB",
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            ~5,5 JAM
          </div>
        </div>
      )}

      {/* FOREGROUND: Layar HP Bersinar Biru */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 28 }}>
        <g transform="translate(390, 990) rotate(-14)">
          <rect x="0" y="0" width="120" height="185" rx="18" fill="#0284C7" stroke="#0F172A" strokeWidth="6" />
          <rect x="12" y="16" width="96" height="145" rx="10" fill="#BAE6FD" />
          <line x1="26" y1="48" x2="94" y2="48" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
          <line x1="26" y1="74" x2="80" y2="74" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 4: DAMPAK KE HARI BERIKUTNYA (00:24–00:34)
// Meja kerja/kuliah siang hari, cangkir kopi, Nadia kehilangan fokus, slow dolly-out
// =========================================================================
const Scene4DampakSiang: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Slow dolly-out ringan
  const dollyOut = interpolate(frame, [0, durationInFrames], [1.06, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cycleSpin = interpolate(frame, [0, durationInFrames], [0, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const step1 = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 95 } });
  const step2 = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 14, stiffness: 95 } });
  const step3 = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 14, stiffness: 95 } });
  const steamOffset = (frame * 1.4) % 50;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * dollyOut})`,
      }}
    >
      {/* BACKGROUND: Meja Kerja / Kuliah Siang Hari */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s4Day" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="65%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s4Day)" />
        {/* Meja Kerja */}
        <path d="M-20 1090 L1100 1090 L1100 1920 L-20 1920 Z" fill="#78350F" stroke="#1C1917" strokeWidth="6" />
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
            fontFamily: FONT_NUM,
            fontSize: 78,
            fontWeight: 800,
            color: "#9F1239",
            lineHeight: 1.02,
          }}
        >
          SIKLUS MUTER TERUS
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 48,
            color: "#1C1917",
            marginTop: 8,
            lineHeight: 1.12,
          }}
        >
          Fokus buyar, kopi nambah, malamnya keulang lagi.
        </div>
      </div>

      {/* MIDGROUND: Nadia Kehilangan Fokus */}
      <div style={{ position: "absolute", top: 690, left: 95, zIndex: 20 }}>
        <CharacterNadia frame={frame} size={370} emotion="drained" />
      </div>

      {/* MIDGROUND: Siklus Berulang Organik Tanpa Card Tebal */}
      <div style={{ position: "absolute", top: 530, right: 165, width: 410, zIndex: 22 }}>
        <svg width="410" height="440" viewBox="0 0 410 440" style={{ overflow: "visible" }}>
          {/* Lingkaran Putus-Putus Siklus */}
          <g transform={`translate(205, 220) rotate(${cycleSpin})`}>
            <circle
              cx="0"
              cy="0"
              r="140"
              stroke="#1C1917"
              strokeWidth="5"
              strokeDasharray="16 14"
              fill="none"
              opacity="0.45"
            />
          </g>

          {/* Label 1: Fokus Buyar */}
          <g transform={`translate(205, 80) scale(${step1})`}>
            <text x="0" y="0" textAnchor="middle" fill="#1C1917" fontSize="34" fontWeight="800" fontFamily={FONT_NUM}>
              1. FOKUS BUYAR
            </text>
          </g>

          {/* Label 2: Cari Kopi */}
          <g transform={`translate(285, 240) scale(${step2})`}>
            <text x="0" y="0" textAnchor="middle" fill="#92400E" fontSize="34" fontWeight="800" fontFamily={FONT_NUM}>
              2. CARI KOPI
            </text>
          </g>

          {/* Label 3: Malam Keulang */}
          <g transform={`translate(160, 365) scale(${step3})`}>
            <text x="0" y="0" textAnchor="middle" fill="#BE123C" fontSize="34" fontWeight="800" fontFamily={FONT_NUM}>
              3. KEULANG LAGI
            </text>
          </g>
        </svg>
      </div>

      {/* FOREGROUND: Cangkir Kopi Berasap + Catatan Tugas */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 26 }}>
        <g transform="translate(650, 1015)">
          <path
            d={`M35 ${-10 - steamOffset} Q55 ${-30 - steamOffset} 38 ${-52 - steamOffset}`}
            stroke="#FFFBEB"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity={interpolate(steamOffset, [0, 25, 50], [0, 0.75, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          <rect x="0" y="0" width="84" height="78" rx="14" fill="#FFFBEB" stroke="#1C1917" strokeWidth="5" />
          <path d="M84 18 Q112 18 112 40 Q112 62 84 62" stroke="#1C1917" strokeWidth="5" fill="none" />
          <rect x="8" y="8" width="68" height="14" rx="6" fill="#78350F" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 5: LANGKAH RINGAN & PENUTUP (00:34–00:42)
// Senja/malam tenang, HP ditaruh di meja terpisah (30 menit), slow pan halus
// =========================================================================
const Scene5LangkahRingan: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Slow pan halus ke suasana kamar yang lebih lapang
  const panX = interpolate(frame, [0, durationInFrames], [-26, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeSpring = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 14, stiffness: 90 } });
  const ctaSpring = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 14, stiffness: 90 } });
  const lampPulse = 0.45 + Math.sin(frame / 16) * 0.08;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale}) translateX(${panX}px)`,
      }}
    >
      {/* BACKGROUND: Suasana Senja/Malam Tenang & Lampu Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s5Calm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="65%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
          <radialGradient id="s5LampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity={lampPulse} />
            <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s5Calm)" />
        <circle cx="770" cy="760" r="320" fill="url(#s5LampGlow)" />
        <path d="M-40 1120 L1120 1120 L1120 1920 L-40 1920 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="6" />
      </svg>

      {/* TOP SAFE ZONE: Angka 30 MENIT + Pertanyaan Penutup */}
      <div
        style={{
          position: "absolute",
          top: 205,
          left: 80,
          right: 160,
          transform: `scale(${badgeSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 88,
            fontWeight: 800,
            color: "#FDE047",
            lineHeight: 1.0,
          }}
        >
          30 MENIT
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 50,
            color: "#FFFBEB",
            marginTop: 8,
            lineHeight: 1.12,
          }}
        >
          Taruh HP agak jauh sebelum tidur.
        </div>

        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 44,
            color: "#BAE6FD",
            marginTop: 22,
            transform: `scale(${ctaSpring})`,
            transformOrigin: "left center",
          }}
        >
          Paling susah nahan scroll jam berapa? 💬
        </div>
      </div>

      {/* MIDGROUND: Nadia Tenang & Relaks */}
      <div style={{ position: "absolute", top: 690, left: 110, zIndex: 20 }}>
        <CharacterNadia frame={frame} size={380} emotion="calm" />
      </div>

      {/* MIDGROUND PROP: Meja Terpisah dengan Lampu Hangat & HP Diletakkan Jauh */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 22 }}>
        {/* Meja Samping Terpisah */}
        <rect x="610" y="960" width="290" height="165" rx="14" fill="#78350F" stroke="#1C1917" strokeWidth="5" />
        {/* Lampu Meja Hangat */}
        <polygon points="730,800 810,800 832,870 708,870" fill="#FDE047" stroke="#1C1917" strokeWidth="5" />
        <rect x="762" y="870" width="16" height="90" fill="#D6D3D1" stroke="#1C1917" strokeWidth="4" />
        <ellipse cx="770" cy="960" rx="40" ry="10" fill="#1C1917" />
        {/* HP Tertidur / Menghadap Bawah */}
        <rect x="638" y="940" width="90" height="22" rx="8" fill="#475569" stroke="#1C1917" strokeWidth="4" />
        <text x="683" y="925" textAnchor="middle" fill="#BAE6FD" fontSize="22" fontWeight="800" fontFamily={FONT_NUM}>
          OFF 🌙
        </text>
      </svg>
    </div>
  );
};
