import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

export type OverthinkingHabisNgobrolStoryV1VisualType =
  | "overthinking-hook-kamar"
  | "overthinking-bridge-kafe"
  | "overthinking-spotlight-effect"
  | "overthinking-replay-jebakan"
  | "overthinking-langkah-lega";

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

export const OverthinkingHabisNgobrolStoryV1Visuals: React.FC<{
  type: OverthinkingHabisNgobrolStoryV1VisualType;
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
      {type === "overthinking-hook-kamar" && (
        <Scene1HookKamar frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "overthinking-bridge-kafe" && (
        <Scene2BridgeKafe frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "overthinking-spotlight-effect" && (
        <Scene3SpotlightEffect frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "overthinking-replay-jebakan" && (
        <Scene4ReplayJebakan frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
      {type === "overthinking-langkah-lega" && (
        <Scene5LangkahLega frame={frame} fps={fps} durationInFrames={durationInFrames} />
      )}
    </div>
  );
};

// =========================================================================
// KARAKTER UTAMA: SINTA (Hand-Drawn Personal Storytelling)
// =========================================================================
type SintaEmotion = "awkward" | "thinking" | "spotlight" | "exhausted" | "relieved";

const CharacterSinta: React.FC<{
  size?: number;
  frame: number;
  emotion?: SintaEmotion;
  hugKnees?: boolean;
}> = ({ size = 370, frame, emotion = "awkward", hugKnees = false }) => {
  const breathRate = emotion === "relieved" ? 16 : 11;
  const breathAmp = emotion === "relieved" ? 4.5 : 3.0;
  const breathY = Math.sin(frame / breathRate) * breathAmp;

  const headTilt =
    emotion === "awkward"
      ? Math.sin(frame / 13) * 2.5 - 3
      : emotion === "thinking"
      ? Math.sin(frame / 15) * 2 + 5
      : emotion === "spotlight"
      ? Math.sin(frame / 8) * 1.5
      : emotion === "exhausted"
      ? Math.sin(frame / 14) * 2 + 6
      : Math.sin(frame / 16) * 2 - 2;

  const isBlinking = frame % 84 < 5;

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
        <ellipse cx="110" cy="226" rx="68" ry="10" fill="rgba(15, 23, 42, 0.28)" />

        {/* Rambut belakang sebahu bergaya hand-drawn */}
        <g transform={`translate(0, ${breathY}) rotate(${headTilt}, 110, 110)`}>
          <path
            d="M58 84 Q44 134 62 162 L158 162 Q176 134 162 84 Z"
            fill="#1E1B18"
            stroke="#1C1917"
            strokeWidth="4.2"
            strokeLinejoin="round"
          />
          {/* Jepit rambut kecil */}
          <rect
            x="140"
            y="64"
            width="16"
            height="6"
            rx="3"
            transform="rotate(24, 148, 67)"
            fill="#FDE047"
            stroke="#1C1917"
            strokeWidth="2.5"
          />
        </g>

        {/* Badan & Sweater Hangat */}
        <g transform={`translate(0, ${breathY * 0.6})`}>
          {hugKnees ? (
            <>
              {/* Lutut ditekuk saat duduk di tepi kasur */}
              <path
                d="M66 196 Q110 156 154 196 L160 222 Q110 230 60 222 Z"
                fill="#334155"
                stroke="#1C1917"
                strokeWidth="4.2"
                strokeLinejoin="round"
              />
              {/* Torso sweater */}
              <path
                d="M62 146 Q110 134 158 146 L162 198 Q110 206 58 198 Z"
                fill="#E11D48"
                stroke="#1C1917"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              {/* Lengan memeluk lutut */}
              <path
                d="M60 154 Q46 184 88 196"
                stroke="#BE123C"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M160 154 Q174 184 132 196"
                stroke="#BE123C"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="90" cy="196" r="9.5" fill="#FED7AA" stroke="#1C1917" strokeWidth="3.2" />
              <circle cx="130" cy="196" r="9.5" fill="#FED7AA" stroke="#1C1917" strokeWidth="3.2" />
            </>
          ) : (
            <>
              {/* Lengan Kiri */}
              <path
                d={
                  emotion === "spotlight"
                    ? "M60 152 Q36 168 48 194"
                    : emotion === "exhausted"
                    ? "M60 152 Q40 184 56 208"
                    : "M60 152 Q42 178 60 202"
                }
                stroke="#BE123C"
                strokeWidth="19"
                strokeLinecap="round"
                fill="none"
              />
              <circle
                cx={emotion === "spotlight" ? 48 : emotion === "exhausted" ? 56 : 60}
                cy={emotion === "spotlight" ? 194 : emotion === "exhausted" ? 208 : 202}
                r="10"
                fill="#FED7AA"
                stroke="#1C1917"
                strokeWidth="3.5"
              />

              {/* Lengan Kanan */}
              <path
                d={
                  emotion === "thinking"
                    ? "M160 152 Q184 134 142 122"
                    : emotion === "relieved"
                    ? "M160 152 Q184 166 170 198"
                    : "M160 152 Q182 178 164 204"
                }
                stroke="#BE123C"
                strokeWidth="19"
                strokeLinecap="round"
                fill="none"
              />
              <circle
                cx={emotion === "thinking" ? 142 : emotion === "relieved" ? 170 : 164}
                cy={emotion === "thinking" ? 122 : emotion === "relieved" ? 198 : 204}
                r="10"
                fill="#FED7AA"
                stroke="#1C1917"
                strokeWidth="3.5"
              />

              {/* Torso Sweater */}
              <path
                d="M58 148 Q110 134 162 148 L170 220 Q110 228 50 220 Z"
                fill="#E11D48"
                stroke="#1C1917"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Kerah Hangat */}
          <path
            d="M88 142 Q110 156 132 142"
            stroke="#FFFBEB"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Kepala & Ekspresi Sinta */}
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
            d="M64 82 Q72 40 110 38 Q148 40 156 82 Q136 62 114 66 Q88 60 64 82 Z"
            fill="#1E1B18"
            stroke="#1C1917"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Alis */}
          {emotion === "awkward" || emotion === "exhausted" ? (
            <>
              <path d="M80 73 Q90 68 99 74" stroke="#1C1917" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <path d="M121 74 Q130 68 140 73" stroke="#1C1917" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            </>
          ) : emotion === "spotlight" ? (
            <>
              <path d="M80 68 Q90 62 100 68" stroke="#1C1917" strokeWidth="3.4" strokeLinecap="round" fill="none" />
              <path d="M120 68 Q130 62 140 68" stroke="#1C1917" strokeWidth="3.4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <path d="M82 74 Q91 71 100 74" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M120 74 Q129 71 138 74" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Mata */}
          {isBlinking || emotion === "relieved" ? (
            <>
              <path d="M83 89 Q92 95 101 89" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M119 89 Q128 95 137 89" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : emotion === "exhausted" ? (
            <>
              <path d="M82 88 Q92 84 101 88" stroke="#1C1917" strokeWidth="3.8" strokeLinecap="round" fill="none" />
              <path d="M119 88 Q128 84 138 88" stroke="#1C1917" strokeWidth="3.8" strokeLinecap="round" fill="none" />
              <circle cx="91" cy="92" r="3.5" fill="#1C1917" />
              <circle cx="129" cy="92" r="3.5" fill="#1C1917" />
              {/* Kantung mata tipis */}
              <path d="M84 99 Q92 102 99 99" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55" />
              <path d="M121 99 Q128 102 136 99" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55" />
            </>
          ) : emotion === "spotlight" ? (
            <>
              <circle cx="91" cy="88" r="9.5" fill="#FFFBEB" stroke="#1C1917" strokeWidth="3" />
              <circle cx="91" cy="88" r="4.5" fill="#1C1917" />
              <circle cx="129" cy="88" r="9.5" fill="#FFFBEB" stroke="#1C1917" strokeWidth="3" />
              <circle cx="129" cy="88" r="4.5" fill="#1C1917" />
            </>
          ) : (
            <>
              {/* Melirik canggung ke samping */}
              <circle cx="94" cy="88" r="5" fill="#1C1917" />
              <circle cx="132" cy="88" r="5" fill="#1C1917" />
              <circle cx="95.5" cy="86.5" r="1.8" fill="#FFFFFF" />
              <circle cx="133.5" cy="86.5" r="1.8" fill="#FFFFFF" />
            </>
          )}

          {/* Mulut */}
          {emotion === "relieved" ? (
            <path d="M97 109 Q110 119 123 109" stroke="#1C1917" strokeWidth="3.8" strokeLinecap="round" fill="none" />
          ) : emotion === "awkward" ? (
            <path d="M98 113 Q104 109 110 113 Q116 117 122 112" stroke="#1C1917" strokeWidth="3.6" strokeLinecap="round" fill="none" />
          ) : emotion === "spotlight" ? (
            <ellipse cx="110" cy="113" rx="7" ry="8.5" fill="#7F1D1D" stroke="#1C1917" strokeWidth="3.2" />
          ) : emotion === "exhausted" ? (
            <path d="M99 115 Q110 109 121 115" stroke="#1C1917" strokeWidth="3.6" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M101 112 L119 112" stroke="#1C1917" strokeWidth="3.6" strokeLinecap="round" />
          )}

          {/* Rona pipi & keringat canggung */}
          <ellipse
            cx="78"
            cy="101"
            rx="8.5"
            ry="4.8"
            fill="#FB7185"
            opacity={emotion === "awkward" || emotion === "spotlight" ? 0.65 : 0.35}
          />
          <ellipse
            cx="142"
            cy="101"
            rx="8.5"
            ry="4.8"
            fill="#FB7185"
            opacity={emotion === "awkward" || emotion === "spotlight" ? 0.65 : 0.35}
          />
          {(emotion === "awkward" || emotion === "spotlight") && (
            <path
              d="M148 68 Q154 78 148 84 Q142 78 148 68 Z"
              fill="#7DD3FC"
              stroke="#0369A1"
              strokeWidth="2"
              transform={`translate(0, ${Math.sin(frame / 7) * 3})`}
            />
          )}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 1: HOOK KONTRAS PULANG NONGKRONG (00:00–00:07)
// Kamar malam teduh, jaket & tas di kursi, bias lampu jalan, Sinta memeluk lutut
// =========================================================================
const Scene1HookKamar: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Slow dolly-in halus ke wajah Sinta & bias lampu jalan
  const dollyScale = interpolate(frame, [0, durationInFrames], [1.0, 1.07], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Beat flip saat "lampu dimatiin" (~detik 2.7 / frame 80)
  const isLightsOff = frame > 78;
  const dimOpacity = interpolate(frame, [70, 92], [0, 0.42], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headSpring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const replaySpring = spring({ frame: Math.max(0, frame - 88), fps, config: { damping: 13, stiffness: 100 } });
  const curtainSway = Math.sin(frame / 18) * 11;
  const tapeSpin = frame * 3.2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * dollyScale})`,
        transformOrigin: "45% 48%",
      }}
    >
      {/* BACKGROUND: Dinding Kamar Malam & Jendela Bias Lampu Jalan */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s1NightWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="62%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>
          <linearGradient id="s1StreetGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s1NightWall)" />

        {/* Jendela Kamar dengan Cahaya Lampu Jalan */}
        <g transform="translate(610, 410)">
          <rect x="0" y="0" width="320" height="420" rx="16" fill="#1E3A5F" stroke="#0F172A" strokeWidth="10" />
          {/* Bias lampu jalan oranye hangat di luar */}
          <circle cx="235" cy="110" r="36" fill="#FDE68A" opacity="0.85" />
          <circle cx="235" cy="110" r="85" fill="#F59E0B" opacity="0.22" />
          <line x1="160" y1="0" x2="160" y2="420" stroke="#0F172A" strokeWidth="8" />
          <line x1="0" y1="210" x2="320" y2="210" stroke="#0F172A" strokeWidth="8" />
          {/* Tirai bergerak lembut */}
          <path
            d={`M-16 -10 Q${52 + curtainSway} 195 20 430 L-16 430 Z`}
            fill="#334155"
            stroke="#0F172A"
            strokeWidth="4"
            opacity="0.92"
          />
          <path
            d={`M336 -10 Q${278 - curtainSway * 0.7} 195 304 430 L336 430 Z`}
            fill="#334155"
            stroke="#0F172A"
            strokeWidth="4"
            opacity="0.92"
          />
        </g>

        {/* Bias cahaya diagonal lampu jalan + partikel melayang */}
        <polygon points="610,410 930,410 340,1320 40,1320" fill="url(#s1StreetGlow)" />
        {[0, 1, 2, 3, 4].map((i) => {
          const dx = 220 + i * 118 + Math.sin(frame / 22 + i) * 16;
          const dy = 560 + i * 95 + Math.cos(frame / 18 + i) * 14;
          return (
            <circle
              key={i}
              cx={dx}
              cy={dy}
              r={4 + (i % 2) * 2.5}
              fill="#FDE68A"
              opacity={0.35 + Math.sin(frame / 16 + i) * 0.22}
            />
          );
        })}

        {/* Lapisan redup saat lampu kamar dimatikan */}
        <rect width="1080" height="1920" fill="#020617" opacity={dimOpacity} />
      </svg>

      {/* TOP SAFE ZONE: Tipografi Kunci Berhierarki Jelas (Tanpa Kotak Kosong) */}
      <div
        style={{
          position: "absolute",
          top: 195,
          left: 80,
          right: 160,
          transform: `scale(${headSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 82,
            fontWeight: 800,
            color: isLightsOff ? "#FB7185" : "#FDE68A",
            lineHeight: 1.02,
            letterSpacing: "-2px",
            textShadow: "0 4px 20px rgba(2, 6, 23, 0.75)",
          }}
        >
          {isLightsOff ? "1 KALIMAT SALAH UCAP" : "TADI KETAWA BARENG"}
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 48,
            color: "#FFFBEB",
            marginTop: 10,
            lineHeight: 1.15,
            textShadow: "0 2px 12px rgba(2, 6, 23, 0.7)",
          }}
        >
          {isLightsOff
            ? "Begitu lampu dimatiin, langsung keputar ulang..."
            : "Pas nongkrong rasanya biasa aja."}
        </div>
      </div>

      {/* MIDGROUND: Kursi dengan Jaket & Tas + Kasur + Sinta */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 15 }}>
        {/* Kursi di kanan dengan jaket & tas sepulang beraktivitas */}
        <g transform="translate(690, 960)">
          <rect x="20" y="0" width="16" height="160" rx="6" fill="#78350F" stroke="#0F172A" strokeWidth="4" />
          <rect x="20" y="135" width="150" height="20" rx="8" fill="#92400E" stroke="#0F172A" strokeWidth="4" />
          <line x1="36" y1="155" x2="36" y2="275" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
          <line x1="154" y1="155" x2="154" y2="275" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
          {/* Jaket tergeletak */}
          <path d="M12 10 Q75 -6 105 55 L110 135 L25 135 Z" fill="#3B82F6" stroke="#0F172A" strokeWidth="4" />
          {/* Tas selempang */}
          <rect x="92" y="102" width="66" height="52" rx="10" fill="#D97706" stroke="#0F172A" strokeWidth="4" />
        </g>

        {/* Tepi Kasur & Bantal */}
        <rect x="70" y="1050" width="560" height="240" rx="28" fill="#1E293B" stroke="#0F172A" strokeWidth="6" />
        <rect x="110" y="1010" width="230" height="86" rx="34" fill="#FFFBEB" stroke="#0F172A" strokeWidth="5" opacity="0.92" />
      </svg>

      {/* Karakter Sinta duduk di tepi kasur memeluk lutut */}
      <div style={{ position: "absolute", top: 750, left: 165, zIndex: 20 }}>
        <CharacterSinta size={370} frame={frame} emotion="awkward" hugKnees={true} />
      </div>

      {/* Ikon Kaset Rusak / Replay Loop di atas kepala saat lampu dimatikan */}
      {isLightsOff && (
        <div
          style={{
            position: "absolute",
            top: 635,
            left: 350,
            transform: `scale(${replaySpring})`,
            zIndex: 25,
          }}
        >
          <svg width="240" height="130" viewBox="0 0 240 130" fill="none">
            <rect
              x="14"
              y="14"
              width="212"
              height="102"
              rx="18"
              fill="#FFFBEB"
              stroke="#1C1917"
              strokeWidth="4.5"
            />
            {/* Reel Kaset Berputar */}
            <g transform={`translate(76, 65) rotate(${tapeSpin})`}>
              <circle cx="0" cy="0" r="22" fill="#1E293B" stroke="#1C1917" strokeWidth="3" />
              <line x1="-14" y1="0" x2="14" y2="0" stroke="#FDE68A" strokeWidth="3" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#FDE68A" strokeWidth="3" />
            </g>
            <g transform={`translate(164, 65) rotate(${tapeSpin})`}>
              <circle cx="0" cy="0" r="22" fill="#1E293B" stroke="#1C1917" strokeWidth="3" />
              <line x1="-14" y1="0" x2="14" y2="0" stroke="#FDE68A" strokeWidth="3" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#FDE68A" strokeWidth="3" />
            </g>
            <text
              x="120"
              y="36"
              textAnchor="middle"
              fill="#DC2626"
              fontSize="20"
              fontWeight="800"
              fontFamily={FONT_NUM}
            >
              REPLAY...
            </text>
          </svg>
        </div>
      )}

      {/* FOREGROUND: Siluet Nakas & Lampu Tidur di sudut bawah */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 28 }}>
        <rect x="-20" y="1240" width="210" height="220" rx="18" fill="#090D16" opacity="0.88" />
        <path d="M40 1165 L125 1165 L140 1240 L25 1240 Z" fill="#1E293B" opacity="0.92" />
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 2: BRIDGE RASA PENASARAN (00:07–00:13)
// Pan menyamping mulus dari kamar menuju sketsa meja kafe & gelembung dialog membesar
// =========================================================================
const Scene2BridgeKafe: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Pan menyamping lembut mengikuti gelembung dialog
  const panX = interpolate(frame, [0, durationInFrames * 0.72], [75, -28], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headSpring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  // Gelembung dialog kecil membesar secara berlebihan di pikiran Sinta
  const bubbleScale = interpolate(frame, [20, durationInFrames * 0.78], [0.55, 1.38], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
      {/* BACKGROUND: Transisi organik dari sudut malam ke sketsa hangat kafe */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s2Bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s2Bg)" />

        {/* Elemen sketsa kafe bergeser sesuai pan kamera */}
        <g transform={`translate(${panX}, 0)`}>
          {/* Lampu gantung kafe */}
          {[240, 560, 880].map((lx, idx) => {
            const sway = Math.sin(frame / 16 + idx) * 5;
            return (
              <g key={idx} transform={`translate(${lx}, 340) rotate(${sway}, 0, -340)`}>
                <line x1="0" y1="-340" x2="0" y2="85" stroke="#451A03" strokeWidth="4" />
                <path d="M-26 85 L26 85 L40 120 L-40 120 Z" fill="#78350F" stroke="#1C1917" strokeWidth="3.5" />
                <circle cx="0" cy="128" r="14" fill="#FFFBEB" opacity="0.9" />
              </g>
            );
          })}

          {/* Siluet teman-teman di meja kafe */}
          <g opacity="0.82">
            <circle cx="770" cy="790" r="40" fill="#78350F" />
            <path d="M715 920 Q770 845 825 920 Z" fill="#78350F" />
            <circle cx="910" cy="810" r="36" fill="#92400E" />
            <path d="M860 930 Q910 860 960 930 Z" fill="#92400E" />
          </g>
        </g>
      </svg>

      {/* TOP SAFE ZONE */}
      <div
        style={{
          position: "absolute",
          top: 195,
          left: 80,
          right: 160,
          transform: `scale(${headSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 78,
            fontWeight: 800,
            color: "#1C1917",
            lineHeight: 1.04,
            letterSpacing: "-2px",
          }}
        >
          KENAPA BISA AWET?
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 50,
            color: "#7C2D12",
            marginTop: 10,
            lineHeight: 1.15,
          }}
        >
          Obrolannya cuma lewat beberapa detik. Yuk bedah polanya!
        </div>
      </div>

      {/* MIDGROUND: Sinta + Gelembung Dialog Kecil yang Membesar Berlebihan */}
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 110 + panX * 0.5,
          zIndex: 20,
        }}
      >
        <CharacterSinta size={360} frame={frame} emotion="thinking" />
      </div>

      {/* Gelembung dialog membesar */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 440 + panX * 0.7,
          transform: `scale(${bubbleScale})`,
          transformOrigin: "bottom left",
          zIndex: 25,
        }}
      >
        <svg width="340" height="210" viewBox="0 0 340 210" fill="none">
          <path
            d="M28 24 H312 Q328 24 328 40 V146 Q328 162 312 162 H105 L54 196 L68 162 H28 Q12 162 12 146 V40 Q12 24 28 24 Z"
            fill="#FFFBEB"
            stroke="#DC2626"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <text
            x="170"
            y="84"
            textAnchor="middle"
            fill="#DC2626"
            fontSize="36"
            fontWeight="800"
            fontFamily={FONT_NUM}
          >
            "Tadi aneh
          </text>
          <text
            x="170"
            y="128"
            textAnchor="middle"
            fill="#1C1917"
            fontSize="32"
            fontFamily={FONT_STORY}
          >
            banget nggak ya?!"
          </text>
        </svg>
      </div>

      {/* FOREGROUND: Meja Kafe & Cangkir Kopi Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 28 }}>
        <path
          d="M0 1180 Q540 1140 1080 1180 L1080 1420 L0 1420 Z"
          fill="#78350F"
          stroke="#1C1917"
          strokeWidth="6"
        />
        {/* Cangkir di meja foreground */}
        <g transform="translate(730, 1110)">
          <rect x="0" y="20" width="76" height="64" rx="12" fill="#FFFBEB" stroke="#1C1917" strokeWidth="4.5" />
          <path d="M76 32 Q98 32 98 52 Q98 72 76 72" stroke="#1C1917" strokeWidth="4.5" fill="none" />
          <path
            d={`M24 8 Q18 -14 28 -28`}
            stroke="#FFFBEB"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity={0.55 + Math.sin(frame / 10) * 0.25}
          />
          <path
            d={`M50 8 Q56 -16 44 -32`}
            stroke="#FFFBEB"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity={0.55 + Math.cos(frame / 10) * 0.25}
          />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 3: EFEK LAMPU SOROT (SPOTLIGHT EFFECT) (00:13–00:24)
// Pattern interrupt tiap beberapa detik + staged reveal mengecilkan sorotan raksasa
// =========================================================================
const Scene3SpotlightEffect: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Pattern interrupt 3 beat:
  // Beat 1 (0..95): Lampu sorot raksasa di Sinta
  // Beat 2 (95..200): Zoom ringan ke siluet teman-teman sibuk dengan pikiran sendiri
  // Beat 3 (200..end): Staged reveal mengecilkan sorotan raksasa jadi porsi realistis
  const cameraScale = interpolate(
    frame,
    [0, 90, 110, 195, 220, durationInFrames],
    [1.0, 1.05, 1.02, 1.07, 1.0, 1.03],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Lebar kerucut lampu sorot mengecil saat masuk fase realistis
  const coneHalfWidth = interpolate(frame, [195, 245], [330, 88], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isRealisticReveal = frame > 205;
  const isFriendsThoughtBeat = frame > 95;
  const headSpring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * cameraScale})`,
        transformOrigin: "center 50%",
      }}
    >
      {/* BACKGROUND: Panggung Imajinatif Gelap + Siluet Teman */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s3Stage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1120" />
            <stop offset="70%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="s3SpotCone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#FDE047" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FDE047" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s3Stage)" />

        {/* Siluet Teman-Teman di Background dengan Gelembung Pikiran Sendiri */}
        {[
          { x: 185, y: 760, thought: "Besok kerjaan..." },
          { x: 875, y: 745, thought: "Saldo menipis..." },
          { x: 840, y: 980, thought: "Tadi aku aneh?" },
        ].map((friend, idx) => {
          const floatY = Math.sin(frame / 14 + idx * 2) * 6;
          const thoughtOpacity = interpolate(
            frame,
            [90 + idx * 14, 115 + idx * 14],
            [0.15, 0.95],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <g key={idx}>
              <circle cx={friend.x} cy={friend.y} r="36" fill="#475569" opacity="0.7" />
              <path
                d={`M${friend.x - 48} ${friend.y + 110} Q${friend.x} ${friend.y + 38} ${friend.x + 48} ${friend.y + 110} Z`}
                fill="#475569"
                opacity="0.7"
              />
              {isFriendsThoughtBeat && (
                <g transform={`translate(${friend.x - 105}, ${friend.y - 105 + floatY})`} opacity={thoughtOpacity}>
                  <rect x="0" y="0" width="210" height="58" rx="22" fill="#334155" stroke="#94A3B8" strokeWidth="2.5" />
                  <text
                    x="105"
                    y="36"
                    textAnchor="middle"
                    fill="#F8FAFC"
                    fontSize="24"
                    fontFamily={FONT_STORY}
                  >
                    {friend.thought}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Kerucut Lampu Sorot Panggung (Staged Reveal: Raksasa -> Realistis) */}
        <polygon
          points={`540,320 ${540 - coneHalfWidth},1240 ${540 + coneHalfWidth},1240`}
          fill="url(#s3SpotCone)"
        />
        <ellipse
          cx="540"
          cy="1240"
          rx={coneHalfWidth}
          ry="34"
          fill="#FEF08A"
          opacity={isRealisticReveal ? 0.25 : 0.42}
        />
      </svg>

      {/* TOP SAFE ZONE */}
      <div
        style={{
          position: "absolute",
          top: 195,
          left: 80,
          right: 160,
          transform: `scale(${headSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 80,
            fontWeight: 800,
            color: "#FEF08A",
            lineHeight: 1.02,
            letterSpacing: "-2px",
            textShadow: "0 4px 18px rgba(2, 6, 23, 0.8)",
          }}
        >
          SPOTLIGHT EFFECT
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 48,
            color: "#FFFBEB",
            marginTop: 10,
            lineHeight: 1.15,
          }}
        >
          {isRealisticReveal
            ? "Aslinya sorotan orang lain ke kita cuma sekecil ini."
            : isFriendsThoughtBeat
            ? "Padahal semua orang sibuk mikirin dirinya sendiri."
            : "Kita ngerasa jadi pusat panggung setiap saat."}
        </div>
      </div>

      {/* MIDGROUND: Sinta di bawah sorotan */}
      <div style={{ position: "absolute", top: 760, left: 355, zIndex: 20 }}>
        <CharacterSinta
          size={370}
          frame={frame}
          emotion={isRealisticReveal ? "relieved" : "spotlight"}
        />
      </div>

      {/* FOREGROUND: Tepi meja & cangkir di sudut bawah sebagai pembingkai */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 28 }}>
        <rect x="-20" y="1220" width="260" height="190" rx="22" fill="#090D16" opacity="0.88" />
        <rect x="850" y="1240" width="250" height="170" rx="22" fill="#090D16" opacity="0.88" />
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 4: JEBAKAN REPLAY BERULANG (00:24–00:34)
// Slow dolly-out ringan, jam lewat tengah malam, coretan skenario, energi sosial habis
// =========================================================================
const Scene4ReplayJebakan: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Slow dolly-out ringan
  const dollyOutScale = interpolate(frame, [0, durationInFrames], [1.05, 0.99], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headSpring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const energyPct = Math.round(
    interpolate(frame, [20, durationInFrames * 0.85], [72, 14], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const clockSecondDeg = frame * 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale * dollyOutScale})`,
        transformOrigin: "center 50%",
      }}
    >
      {/* BACKGROUND: Kamar Menjelang Larut + Jam Lewat Tengah Malam */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s4Night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="65%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s4Night)" />

        {/* Jam Dinding Melewati Tengah Malam (00:25) */}
        <g transform="translate(830, 500)">
          <circle cx="0" cy="0" r="82" fill="#FFFBEB" stroke="#0F172A" strokeWidth="7" />
          <line x1="0" y1="0" x2="4" y2="-42" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
          <line x1="0" y1="0" x2="36" y2="28" stroke="#1C1917" strokeWidth="5" strokeLinecap="round" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-56"
            stroke="#DC2626"
            strokeWidth="2.5"
            transform={`rotate(${clockSecondDeg})`}
          />
          <circle cx="0" cy="0" r="6" fill="#DC2626" />
          <text x="0" y="118" textAnchor="middle" fill="#FDE68A" fontSize="28" fontWeight="700" fontFamily={FONT_NUM}>
            00:25
          </text>
        </g>

        {/* Coretan skenario melayang (organik tanpa kotak card tebal) */}
        {[
          { text: '"Harusnya tadi jawab ini..."', x: 110, y: 510, delay: 12 },
          { text: '"Kenapa ngomong gitu?!"', x: 520, y: 650, delay: 45 },
          { text: '"Besok malu ketemu lagi..."', x: 140, y: 720, delay: 80 },
        ].map((scribble, idx) => {
          const op = interpolate(frame, [scribble.delay, scribble.delay + 24], [0, 0.92], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const floatY = Math.sin(frame / 15 + idx * 1.8) * 8;
          return (
            <text
              key={idx}
              x={scribble.x}
              y={scribble.y + floatY}
              fill="#FDA4AF"
              fontSize="38"
              fontFamily={FONT_STORY}
              opacity={op}
            >
              {scribble.text}
            </text>
          );
        })}
      </svg>

      {/* TOP SAFE ZONE */}
      <div
        style={{
          position: "absolute",
          top: 195,
          left: 80,
          right: 160,
          transform: `scale(${headSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 80,
            fontWeight: 800,
            color: "#FB7185",
            lineHeight: 1.02,
            letterSpacing: "-2px",
          }}
        >
          JEBAKAN REPLAY
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 48,
            color: "#FFFBEB",
            marginTop: 10,
            lineHeight: 1.15,
          }}
        >
          Otak nganggep bahaya besar—energi sosial langsung habis.
        </div>
      </div>

      {/* MIDGROUND: Sinta Makin Lelah + Indikator Energi Sosial Menurun */}
      <div style={{ position: "absolute", top: 785, left: 355, zIndex: 20 }}>
        <CharacterSinta size={365} frame={frame} emotion="exhausted" />
      </div>

      {/* Bar Energi Sosial Minimalis (tanpa card kotak besar) */}
      <div
        style={{
          position: "absolute",
          top: 1205,
          left: 260,
          width: 560,
          zIndex: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#FFFBEB",
            fontSize: 30,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          <span>ENERGI SOSIAL</span>
          <span style={{ color: energyPct < 30 ? "#FB7185" : "#FDE68A" }}>{energyPct}%</span>
        </div>
        <div
          style={{
            width: "100%",
            height: 24,
            borderRadius: 12,
            background: "rgba(255,255,255,0.14)",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          <div
            style={{
              width: `${energyPct}%`,
              height: "100%",
              background: energyPct < 30 ? "#E11D48" : "#F59E0B",
              borderRadius: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: LANGKAH RINGAN & PENUTUP (00:34–00:42)
// Kamar tenang & lapang, jendela terbuka, cahaya hangat lembut, gelas air, Sinta lega
// =========================================================================
const Scene5LangkahLega: React.FC<{
  frame: number;
  fps: number;
  durationInFrames: number;
}> = ({ frame, fps, durationInFrames }) => {
  const { exitOpacity, exitScale } = useCleanExit(frame, durationInFrames);

  // Slow pan halus ke ruang kamar yang terasa lega
  const panX = interpolate(frame, [0, durationInFrames], [-16, 14], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headSpring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const promptSpring = spring({
    frame: Math.max(0, frame - 95),
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const curtainBreeze = Math.sin(frame / 16) * 14;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* BACKGROUND: Kamar Tenang & Lapang dengan Cahaya Hangat Lembut */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s5CalmBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="55%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <radialGradient id="s5WarmLamp" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#s5CalmBg)" />

        <g transform={`translate(${panX}, 0)`}>
          {/* Jendela Terbuka + Angin Malam Sejuk */}
          <g transform="translate(610, 420)">
            <rect x="0" y="0" width="320" height="410" rx="18" fill="#0F172A" stroke="#78350F" strokeWidth="10" />
            {/* Bintang lembut di langit */}
            <circle cx="80" cy="95" r="4" fill="#FFFBEB" opacity="0.85" />
            <circle cx="215" cy="70" r="5" fill="#FDE68A" opacity="0.9" />
            <circle cx="255" cy="160" r="3.5" fill="#FFFBEB" opacity="0.75" />
            {/* Tirai melambai tenang */}
            <path
              d={`M-12 -10 Q${64 + curtainBreeze} 185 26 420 L-12 420 Z`}
              fill="#FFFBEB"
              opacity="0.82"
            />
          </g>

          {/* Cahaya hangat lembut dari lampu nakas */}
          <circle cx="235" cy="940" r="220" fill="url(#s5WarmLamp)" />

          {/* Nakas & Gelas Air */}
          <g transform="translate(135, 1020)">
            <rect x="0" y="60" width="210" height="180" rx="16" fill="#78350F" stroke="#0F172A" strokeWidth="5" />
            {/* Gelas air */}
            <path d="M125 60 L133 8 L175 8 L183 60 Z" fill="#BAE6FD" stroke="#0F172A" strokeWidth="3.5" opacity="0.9" />
            <path d="M128 60 L132 28 L176 28 L180 60 Z" fill="#38BDF8" opacity="0.6" />
          </g>
        </g>
      </svg>

      {/* TOP SAFE ZONE */}
      <div
        style={{
          position: "absolute",
          top: 195,
          left: 80,
          right: 160,
          transform: `scale(${headSpring})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT_NUM,
            fontSize: 80,
            fontWeight: 800,
            color: "#A7F3D0",
            lineHeight: 1.02,
            letterSpacing: "-2px",
          }}
        >
          INGAT MINGGU LALU?
        </div>
        <div
          style={{
            fontFamily: FONT_STORY,
            fontSize: 48,
            color: "#FFFBEB",
            marginTop: 10,
            lineHeight: 1.15,
          }}
        >
          Kesalahan kecil temanmu aja nggak ingat, kan?
        </div>
      </div>

      {/* MIDGROUND: Sinta Menarik Napas Lega & Tersenyum Tipis */}
      <div style={{ position: "absolute", top: 755, left: 375 + panX * 0.6, zIndex: 20 }}>
        <CharacterSinta size={370} frame={frame} emotion="relieved" />
      </div>

      {/* Ajakan Komentar Santai (di atas safe zone caption) */}
      <div
        style={{
          position: "absolute",
          top: 1210,
          left: 110,
          right: 160,
          textAlign: "center",
          transform: `scale(${promptSpring})`,
          zIndex: 28,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "14px 28px",
            borderRadius: 999,
            background: "rgba(15, 23, 42, 0.85)",
            border: "2.5px solid #A7F3D0",
            color: "#A7F3D0",
            fontFamily: FONT_STORY,
            fontSize: 38,
          }}
        >
          Momen canggung apa yang paling sering kepikiran?
        </span>
      </div>

      {/* FOREGROUND: Daun tanaman di pojok jendela untuk depth */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 29 }}>
        <path d="M980 1280 Q910 1180 960 1100 Q1030 1180 980 1280 Z" fill="#065F46" opacity="0.85" />
        <path d="M1010 1300 Q1060 1190 1090 1130 Q1090 1240 1010 1300 Z" fill="#047857" opacity="0.85" />
      </svg>
    </div>
  );
};
