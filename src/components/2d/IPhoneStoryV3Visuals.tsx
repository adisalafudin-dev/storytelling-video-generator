import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type IPhoneStoryV3VisualType =
  | "storyv3-hook-showcase"
  | "storyv3-bridge-question"
  | "storyv3-income-contrast"
  | "storyv3-living-expenses"
  | "storyv3-savings-timeline";

export const IPhoneStoryV3Visuals: React.FC<{
  type: IPhoneStoryV3VisualType;
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
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif",
      }}
    >
      {type === "storyv3-hook-showcase" && <Scene1StoryV3Hook frame={frame} fps={fps} />}
      {type === "storyv3-bridge-question" && <Scene2StoryV3Bridge frame={frame} fps={fps} />}
      {type === "storyv3-income-contrast" && <Scene3StoryV3Contrast frame={frame} fps={fps} />}
      {type === "storyv3-living-expenses" && <Scene4StoryV3Expenses frame={frame} fps={fps} />}
      {type === "storyv3-savings-timeline" && <Scene5StoryV3Timeline frame={frame} fps={fps} />}
    </div>
  );
};

// =========================================================================
// GAYA #3: KARAKTER HAND-DRAWN / STORYTELLING PERSONAL
// =========================================================================
type Emotion = "happy" | "confused" | "shocked" | "talking";

export const CharacterPakBudi: React.FC<{
  size?: number;
  frame: number;
  emotion?: Emotion;
}> = ({ size = 420, frame, emotion = "happy" }) => {
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
        {/* Soft Organic Shadow */}
        <ellipse cx="100" cy="222" rx="72" ry="12" fill="rgba(28, 25, 23, 0.35)" />

        {/* Tubuh Pak Budi (Kemeja Tani Hijau Lumut & Handuk Pundak) */}
        <g transform={`translate(0, ${breathY * 0.5})`}>
          <path
            d="M48 148 C48 128 74 124 100 124 C126 124 152 128 152 148 L158 215 L42 215 Z"
            fill="#3F6212"
            stroke="#1A2E05"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M85 124 L100 150 L115 124" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path
            d="M70 132 C68 160 74 185 76 200 M130 132 C132 160 126 185 124 200"
            stroke="#FDFBF7"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </g>

        {/* Kepala & Wajah Hangat */}
        <g transform={`translate(0, ${breathY}) rotate(${headBob}, 100, 95)`}>
          <rect x="90" y="110" width="20" height="20" fill="#FBBF24" />
          <ellipse cx="100" cy="92" rx="40" ry="38" fill="#FDE047" stroke="#9A3412" strokeWidth="3" />
          <circle cx="58" cy="94" r="8" fill="#FDE047" stroke="#9A3412" strokeWidth="2.5" />
          <circle cx="142" cy="94" r="8" fill="#FDE047" stroke="#9A3412" strokeWidth="2.5" />

          {/* Alis Ekspresif */}
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
              <circle cx="85" cy="87" r="7.5" fill="#FFFFFF" stroke="#451A03" strokeWidth="2.5" />
              <circle cx="85" cy="87" r="3.5" fill="#451A03" />
              <circle cx="115" cy="87" r="7.5" fill="#FFFFFF" stroke="#451A03" strokeWidth="2.5" />
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

          <path d="M98 90 Q102 96 98 100" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Mulut */}
          {emotion === "confused" ? (
            <path d="M88 108 Q94 112 100 107 Q106 102 112 108" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          ) : emotion === "shocked" ? (
            <ellipse cx="100" cy="110" rx="9" ry="14" fill="#451A03" stroke="#9A3412" strokeWidth="2" />
          ) : emotion === "talking" ? (
            <ellipse cx="100" cy="108" rx="11" ry={6 + Math.abs(Math.sin(frame / 3)) * 6} fill="#991B1B" stroke="#451A03" strokeWidth="2.5" />
          ) : (
            <path d="M86 105 Q100 118 114 105" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}

          <circle cx="73" cy="98" r="6" fill="#F43F5E" opacity="0.35" />
          <circle cx="127" cy="98" r="6" fill="#F43F5E" opacity="0.35" />

          {/* Tetesan Keringat */}
          {(emotion === "confused" || emotion === "shocked") && (
            <g transform={`translate(${135 + Math.sin(frame / 6) * 2}, ${70 + breathY})`}>
              <path d="M0 0 C4 6 6 12 0 16 C-6 12 -4 6 0 0 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            </g>
          )}

          {/* Topi Caping Bambu Anyam */}
          <g>
            <path d="M100 18 L184 76 L16 76 Z" fill="#D97706" stroke="#78350F" strokeWidth="4" strokeLinejoin="round" />
            <path d="M100 18 L100 76" stroke="#92400E" strokeWidth="2.5" />
            <path d="M60 48 L140 48" stroke="#92400E" strokeWidth="2" />
            <path d="M42 62 L158 62" stroke="#92400E" strokeWidth="2" />
            <path d="M38 76 Q45 110 90 120 M162 76 Q155 110 110 120" stroke="#78350F" strokeWidth="2.5" fill="none" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const CharacterPakHendra: React.FC<{
  size?: number;
  frame: number;
  emotion?: Emotion;
}> = ({ size = 420, frame, emotion = "happy" }) => {
  const breathY = Math.sin(frame / 12 + 1.5) * 4;
  const headBob = Math.sin(frame / 9 + 1.5) * 2.5;
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
        <ellipse cx="100" cy="222" rx="72" ry="12" fill="rgba(28, 25, 23, 0.35)" />

        {/* Tubuh Pak Hendra (Polo Shirt Biru & Rompi Kerja Toko) */}
        <g transform={`translate(0, ${breathY * 0.5})`}>
          <path
            d="M48 145 C48 126 74 122 100 122 C126 122 152 126 152 145 L158 215 L42 215 Z"
            fill="#0284C7"
            stroke="#0369A1"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M48 145 L80 215 L42 215 Z" fill="#1E293B" />
          <path d="M152 145 L120 215 L158 215 Z" fill="#1E293B" />
          <path d="M84 122 L100 148 L116 122" stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M92 144 L100 170 L108 144" stroke="#FBBF24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <rect x="94" y="170" width="12" height="16" rx="2" fill="#FBBF24" />
        </g>

        {/* Kepala & Wajah Pak Hendra */}
        <g transform={`translate(0, ${breathY}) rotate(${headBob}, 100, 95)`}>
          <rect x="91" y="108" width="18" height="18" fill="#FDBA74" />
          <path d="M54 75 C54 38 80 30 100 30 C120 30 146 38 146 75 Z" fill="#1E293B" />
          <ellipse cx="100" cy="90" rx="38" ry="36" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.8" />
          <circle cx="60" cy="92" r="7" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <circle cx="140" cy="92" r="7" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />

          {/* Rambut Depan Sisir Rapi */}
          <path d="M56 68 C70 45 115 40 144 62 C130 50 90 45 64 65 Z" fill="#1E293B" />
          <path d="M76 72 Q86 67 95 71" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M105 71 Q114 67 124 72" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Mata */}
          {isBlinking ? (
            <>
              <path d="M78 85 L92 85" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M108 85 L122 85" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx="85" cy="84" rx="4.5" ry="5.5" fill="#1E293B" />
              <circle cx="83.5" cy="82.5" r="1.8" fill="#FFFFFF" />
              <ellipse cx="115" cy="84" rx="4.5" ry="5.5" fill="#1E293B" />
              <circle cx="113.5" cy="82.5" r="1.8" fill="#FFFFFF" />
            </>
          )}

          <path d="M98 87 Q102 93 98 97" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {emotion === "talking" ? (
            <ellipse cx="100" cy="106" rx="10" ry={5 + Math.abs(Math.sin(frame / 3)) * 5} fill="#991B1B" stroke="#1E293B" strokeWidth="2.5" />
          ) : (
            <path d="M88 102 Q100 114 112 102" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}

          {/* Kacamata Pemilik Toko */}
          <rect x="74" y="76" width="22" height="18" rx="4" fill="none" stroke="#0284C7" strokeWidth="2.5" />
          <rect x="104" y="76" width="22" height="18" rx="4" fill="none" stroke="#0284C7" strokeWidth="2.5" />
          <path d="M96 84 L104 84" stroke="#0284C7" strokeWidth="2.5" />
          <path d="M74 84 L62 80 M126 84 L138 80" stroke="#0284C7" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 1: HOOK DUA TOKOH (SAWAH DESA -> TOKO KOTA -> SHOWROOM)
// =========================================================================
const Scene1StoryV3Hook: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const isBeat1 = frame < 68;
  const isBeat2 = frame >= 68 && frame < 136;
  const isBeat3 = frame >= 136;

  const currentBeatFrame = isBeat1 ? frame : isBeat2 ? frame - 68 : frame - 136;
  const dollyScale = interpolate(currentBeatFrame, [0, 80], [1.0, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Secondary Motion: Padi berayun ditiup angin
  const windSway = Math.sin(frame / 8) * 8;
  const lampSway = Math.sin(frame / 12) * 5;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        transform: `scale(${dollyScale})`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. BEAT 1: SAWAH ASRI PAK BUDI (NUANSA HANGAT FAJAR) */}
      {isBeat1 && (
        <div style={{ position: "absolute", inset: 0 }}>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="v3VillageSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="25%" stopColor="#38BDF8" />
                <stop offset="48%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#FEF08A" />
                <stop offset="88%" stopColor="#84CC16" />
                <stop offset="100%" stopColor="#4D7C0F" />
              </linearGradient>
              <radialGradient id="v3Sun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#FBBF24" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="1080" height="1920" fill="url(#v3VillageSky)" />

            {/* Matahari Pagi Hangat */}
            <circle
              cx="540"
              cy="440"
              r="220"
              fill="url(#v3Sun)"
              transform={`scale(${1 + Math.sin(frame / 15) * 0.04})`}
              style={{ transformOrigin: "540px 440px" }}
            />
            <circle cx="540" cy="440" r="65" fill="#FEF08A" />

            {/* Burung Pagi Melayang */}
            <path
              d={`M ${(frame * 1.5) % 1300 - 100} 320 Q ${(frame * 1.5) % 1300 - 90} 310 ${(frame * 1.5) % 1300 - 80} 320 Q ${(frame * 1.5) % 1300 - 70} 310 ${(frame * 1.5) % 1300 - 60} 320`}
              stroke="#0F172A"
              strokeWidth="2.5"
              fill="none"
              opacity="0.6"
            />
            <path
              d={`M ${(frame * 1.3) % 1300 - 40} 350 Q ${(frame * 1.3) % 1300 - 30} 342 ${(frame * 1.3) % 1300 - 20} 350 Q ${(frame * 1.3) % 1300 - 10} 342 ${(frame * 1.3) % 1300} 350`}
              stroke="#0F172A"
              strokeWidth="2.2"
              fill="none"
              opacity="0.5"
            />

            {/* Awan Putih Lembut */}
            <path
              d={`M ${(frame * 0.4) % 1200 - 150} 380 Q ${(frame * 0.4) % 1200 - 80} 330 ${(frame * 0.4) % 1200 + 40} 380 Q ${(frame * 0.4) % 1200 + 120} 350 ${(frame * 0.4) % 1200 + 200} 380 Q ${(frame * 0.4) % 1200 + 80} 440 ${(frame * 0.4) % 1200 - 150} 380 Z`}
              fill="#FFFFFF"
              opacity="0.45"
            />

            {/* Pegunungan Berkabut */}
            <path d="M 0 780 Q 280 620 540 720 Q 820 600 1080 760 L 1080 1920 L 0 1920 Z" fill="#1E3A8A" opacity="0.6" />
            <path d="M 0 880 Q 320 760 680 840 Q 900 770 1080 890 L 1080 1920 L 0 1920 Z" fill="#1E293B" opacity="0.75" />

            {/* Terasering Sawah Hijau Berundak */}
            <path d="M 0 1000 Q 350 920 720 980 Q 940 940 1080 1010 L 1080 1920 L 0 1920 Z" fill="#4D7C0F" />
            <path d="M 0 1160 Q 420 1090 820 1140 Q 980 1110 1080 1180 L 1080 1920 L 0 1920 Z" fill="#365314" />
            <path d="M 0 1340 Q 360 1270 740 1320 Q 960 1290 1080 1360 L 1080 1920 L 0 1920 Z" fill="#14532D" />

            {/* Jalan Setapak Tanah */}
            <path d="M 280 1920 L 440 1300 L 640 1300 L 800 1920 Z" fill="#78350F" opacity="0.75" />

            {/* Rumpun Padi Foreground Berayun di Kiri & Kanan */}
            <g transform={`translate(${windSway}, 0)`}>
              <path d="M 40 1920 Q 80 1700 120 1600 M 60 1920 Q 110 1720 160 1620 M 20 1920 Q 70 1750 90 1650" stroke="#84CC16" strokeWidth="8" strokeLinecap="round" />
            </g>
            <g transform={`translate(${-windSway}, 0)`}>
              <path d="M 1040 1920 Q 1000 1700 960 1600 M 1020 1920 Q 970 1720 920 1620" stroke="#84CC16" strokeWidth="8" strokeLinecap="round" />
            </g>
          </svg>

          {/* Konteks Tipografi Organik (Tanpa Card Box) */}
          <div
            style={{
              position: "absolute",
              top: 180,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              zIndex: 20,
            }}
          >
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 36,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textShadow: "0 4px 18px rgba(0,0,0,0.65)",
              }}
            >
              🌾 Pak Budi
            </div>
            <div
              style={{
                color: "#FEF08A",
                fontSize: 22,
                fontWeight: 700,
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              }}
            >
              Petani di Desa • Penghasilan ~Rp 2 Juta/Bln
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 660,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 15,
            }}
          >
            <CharacterPakBudi frame={frame} size={460} emotion="happy" />
          </div>
        </div>
      )}

      {/* 2. BEAT 2: TOKO PAK HENDRA (HANGAT DENGAN LAMPU GANTUNG & ETALASE) */}
      {isBeat2 && (
        <div style={{ position: "absolute", inset: 0 }}>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="v3ShopWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="45%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <radialGradient id="v3LampGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FDE047" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="1080" height="1920" fill="url(#v3ShopWall)" />

            {/* Lampu Gantung Berayun Halus */}
            <g transform={`rotate(${lampSway}, 300, 0)`}>
              <line x1="300" y1="0" x2="300" y2="380" stroke="#94A3B8" strokeWidth="3" />
              <ellipse cx="300" cy="400" rx="35" ry="15" fill="#F59E0B" />
              <circle cx="300" cy="430" r="140" fill="url(#v3LampGlow)" />
            </g>

            <g transform={`rotate(${-lampSway}, 780, 0)`}>
              <line x1="780" y1="0" x2="780" y2="380" stroke="#94A3B8" strokeWidth="3" />
              <ellipse cx="780" cy="400" rx="35" ry="15" fill="#F59E0B" />
              <circle cx="780" cy="430" r="140" fill="url(#v3LampGlow)" />
            </g>

            {/* Rak Display Produk Toko di Kiri & Kanan */}
            <rect x="60" y="550" width="180" height="850" fill="#475569" rx="8" />
            <line x1="60" y1="720" x2="240" y2="720" stroke="#F1F5F9" strokeWidth="6" />
            <line x1="60" y1="920" x2="240" y2="920" stroke="#F1F5F9" strokeWidth="6" />
            <line x1="60" y1="1120" x2="240" y2="1120" stroke="#F1F5F9" strokeWidth="6" />

            <rect x="840" y="550" width="180" height="850" fill="#475569" rx="8" />
            <line x1="840" y1="720" x2="1020" y2="720" stroke="#F1F5F9" strokeWidth="6" />
            <line x1="840" y1="920" x2="1020" y2="920" stroke="#F1F5F9" strokeWidth="6" />
            <line x1="840" y1="1120" x2="1020" y2="1120" stroke="#F1F5F9" strokeWidth="6" />

            {/* Meja Kasir Kayu */}
            <rect x="0" y="1360" width="1080" height="560" fill="#78350F" />
            <rect x="0" y="1360" width="1080" height="40" fill="#B45309" />
          </svg>

          {/* Konteks Tipografi Organik */}
          <div
            style={{
              position: "absolute",
              top: 180,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              zIndex: 20,
            }}
          >
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 36,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textShadow: "0 4px 18px rgba(0,0,0,0.65)",
              }}
            >
              🏪 Pak Hendra
            </div>
            <div
              style={{
                color: "#7DD3FC",
                fontSize: 22,
                fontWeight: 700,
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              }}
            >
              Pemilik Toko • Omzet Puluhan Juta/Bln
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 660,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 15,
            }}
          >
            <CharacterPakHendra frame={frame} size={460} emotion="happy" />
          </div>
        </div>
      )}

      {/* 3. BEAT 3: KEDUANYA MENATAP IPHONE 15 PRO (SOROT LAMPU SHOWROOM) */}
      {isBeat3 && (
        <div style={{ position: "absolute", inset: 0 }}>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="v3ShowroomSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B1329" />
                <stop offset="50%" stopColor="#070B18" />
                <stop offset="100%" stopColor="#02040A" />
              </linearGradient>
              <linearGradient id="v3SpotCone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>
            </defs>

            <rect width="1080" height="1920" fill="url(#v3ShowroomSky)" />
            <polygon points="540,100 240,1600 840,1600" fill="url(#v3SpotCone)" />
            <rect x="0" y="1420" width="1080" height="500" fill="#050811" />
            <ellipse cx="540" cy="1440" rx="360" ry="40" fill="#38BDF8" opacity="0.15" />
          </svg>

          {/* Judul Hero Bersih */}
          <div
            style={{
              position: "absolute",
              top: 200,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              zIndex: 30,
            }}
          >
            <div
              style={{
                color: "#E2E8F0",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              📱 SATU IPHONE • HARGA SAMA
            </div>
            <div
              style={{
                color: "#F43F5E",
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: "-1px",
                textShadow: "0 0 30px rgba(244, 63, 94, 0.4)",
              }}
            >
              Rp 16.500.000
            </div>
          </div>

          {/* Model iPhone Raksasa Mengambang */}
          <div
            style={{
              position: "absolute",
              top: "48%",
              left: "50%",
              transform: `translate(-50%, -50%) translateY(${Math.sin(frame / 10) * 8}px)`,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 250,
                height: 480,
                borderRadius: 44,
                background: "linear-gradient(145deg, #1E293B, #0F172A)",
                border: "5px solid #64748B",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(56, 189, 248, 0.35)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 16,
              }}
            >
              <div
                style={{
                  width: 75,
                  height: 20,
                  backgroundColor: "#000000",
                  borderRadius: 14,
                  marginTop: 4,
                }}
              />
              <div
                style={{
                  marginTop: 50,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 44 }}>📱</div>
                <div
                  style={{
                    backgroundColor: "#FFD600",
                    color: "#000000",
                    padding: "4px 12px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 900,
                  }}
                >
                  HARGA RESMI SAMA
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800 }}>
                  Rp 16.500.000
                </div>
              </div>
            </div>
          </div>

          {/* Pak Budi di Kiri */}
          <div
            style={{
              position: "absolute",
              top: 720,
              left: 40,
              zIndex: 25,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CharacterPakBudi frame={frame} size={400} emotion="shocked" />
            <div
              style={{
                color: "#BEF264",
                fontSize: 22,
                fontWeight: 900,
                marginTop: -10,
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              🌾 Pak Budi
            </div>
          </div>

          {/* Pak Hendra di Kanan */}
          <div
            style={{
              position: "absolute",
              top: 720,
              right: 40,
              zIndex: 25,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CharacterPakHendra frame={frame} size={400} emotion="happy" />
            <div
              style={{
                color: "#7DD3FC",
                fontSize: 22,
                fontWeight: 900,
                marginTop: -10,
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              🏪 Pak Hendra
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 2: JEMBATAN DIALOG MEMBUMI (PATTERN INTERRUPT: CLOSE SPLIT FOCUS)
// =========================================================================
const Scene2StoryV3Bridge: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 90 },
  });

  const questionBounce = Math.sin(frame / 6) * 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v3BridgeSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#1C2541" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v3BridgeSky)" />
        <ellipse cx="540" cy="1480" rx="420" ry="40" fill="#000000" opacity="0.5" />
      </svg>

      {/* Pak Budi di Kiri */}
      <div
        style={{
          position: "absolute",
          top: 680,
          left: 40,
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ color: "#FBBF24", fontSize: 48, fontWeight: 900, transform: `translateY(${questionBounce}px)`, marginBottom: -15 }}>
          ❓
        </div>
        <CharacterPakBudi frame={frame} size={420} emotion="confused" />
        <span style={{ color: "#BEF264", fontSize: 20, fontWeight: 800 }}>Pak Budi (Bingung)</span>
      </div>

      {/* Pak Hendra di Kanan */}
      <div
        style={{
          position: "absolute",
          top: 680,
          right: 40,
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CharacterPakHendra frame={frame} size={420} emotion="talking" />
        <span style={{ color: "#7DD3FC", fontSize: 20, fontWeight: 800 }}>Pak Hendra (Menjelaskan)</span>
      </div>

      {/* Balon Dialog Alami */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${cardSpring})`,
          zIndex: 25,
          width: 860,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          backdropFilter: "blur(16px)",
          border: "3px solid #FBBF24",
          borderRadius: 36,
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 50px rgba(251, 191, 36, 0.25)",
        }}
      >
        <div style={{ fontSize: 44 }}>🤔💡</div>
        <div
          style={{
            color: "#FDE047",
            fontSize: 42,
            fontWeight: 900,
            textAlign: "center",
          }}
        >
          Kenapa Bisa Gitu?
        </div>
        <div
          style={{
            backgroundColor: "#38BDF8",
            color: "#020617",
            fontSize: 26,
            fontWeight: 900,
            padding: "10px 32px",
            borderRadius: 50,
          }}
        >
          Yuk, Sini Kita Jelasin!
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 3: KONTRAS KEUNTUNGAN TOKO VS HASIL SAWAH (PATTERN INTERRUPT: TIMELINE METAPHOR)
// =========================================================================
const Scene3StoryV3Contrast: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const hendraProgress = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const budiProgress = spring({ frame: frame - 25, fps, config: { damping: 16, stiffness: 60 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v3ContrastSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B0F19" />
            <stop offset="50%" stopColor="#111827" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v3ContrastSky)" />
        <ellipse cx="540" cy="960" rx="480" ry="260" fill="#38BDF8" opacity="0.06" />
      </svg>

      {/* Header Info */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 30,
        }}
      >
        <div
          style={{
            color: "#FDE047",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "1px",
          }}
        >
          NILAI TUKAR KERINGAT
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: "-1px",
          }}
        >
          3 Hari Toko vs 8 Bulan Sawah
        </div>
      </div>

      {/* Komparasi */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 960,
          display: "flex",
          flexDirection: "column",
          gap: 36,
          zIndex: 20,
        }}
      >
        {/* Row Pak Hendra */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            borderRadius: 28,
            border: "2px solid #38BDF8",
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
          }}
        >
          <CharacterPakHendra frame={frame} size={150} emotion="happy" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#38BDF8", fontSize: 24, fontWeight: 800 }}>
                Pak Hendra (Pemilik Toko)
              </span>
              <span style={{ color: "#4ADE80", fontSize: 22, fontWeight: 900 }}>
                ⚡ CUMA 3 HARI UNTUNG TOKO
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 36,
                backgroundColor: "#1E293B",
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, Math.max(0, hendraProgress * 15))}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #10B981, #34D399)",
                  borderRadius: 18,
                }}
              />
            </div>
          </div>
        </div>

        {/* Row Pak Budi */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            borderRadius: 28,
            border: "2px solid #FB923C",
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
          }}
        >
          <CharacterPakBudi frame={frame} size={150} emotion="shocked" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#FB923C", fontSize: 24, fontWeight: 800 }}>
                Pak Budi (Petani Desa)
              </span>
              <span style={{ color: "#F87171", fontSize: 22, fontWeight: 900 }}>
                🔥 8 BULAN HASIL SAWAH
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 36,
                backgroundColor: "#1E293B",
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, Math.max(0, budiProgress * 100))}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #F97316, #EF4444)",
                  borderRadius: 18,
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "2px solid #EF4444",
            borderRadius: 20,
            padding: "16px 24px",
            color: "#FCA5A5",
            fontSize: 20,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          ⚠️ Pak Budi butuh 80× lipat lebih lama... itu pun kalau 100% penghasilan ditabung tanpa makan!
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 4: REALITAS BIAYA HIDUP PAK BUDI (PATTERN INTERRUPT: THE VANISHING WALLET)
// =========================================================================
const Scene4StoryV3Expenses: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const card1 = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 90 } });
  const card2 = spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 90 } });
  const card3 = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 90 } });
  const climaxCard = spring({ frame: frame - 58, fps, config: { damping: 12, stiffness: 100 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v3LivingSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#090D1A" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v3LivingSky)" />
        <circle cx="540" cy="700" r="300" fill="#F59E0B" opacity="0.08" />
      </svg>

      {/* Header Info */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 30,
        }}
      >
        <div
          style={{
            color: "#BEF264",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "1px",
          }}
        >
          REALITAS BIAYA HIDUP
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: "-1px",
          }}
        >
          Sisa Rp 200.000 / Bulan
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 960,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 20,
        }}
      >
        {/* Status Dompet */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            borderRadius: 24,
            padding: "16px 28px",
            border: "2px solid #84CC16",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <CharacterPakBudi frame={frame} size={130} emotion="confused" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#F7FEE7", fontSize: 24, fontWeight: 800 }}>Dompet Pak Budi</span>
              <span style={{ color: "#94A3B8", fontSize: 18 }}>Petani di Desa</span>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#84CC16",
              color: "#000000",
              fontSize: 22,
              fontWeight: 900,
              padding: "8px 20px",
              borderRadius: 20,
            }}
          >
            Pemasukan: Rp 2.000.000
          </div>
        </div>

        {/* 3 Potongan Pengeluaran Konkret */}
        <div
          style={{
            transform: `scale(${card1})`,
            opacity: card1,
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: "6px solid #F43F5E",
          }}
        >
          <span style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700 }}>🍚 Beras & Dapur Keluarga</span>
          <span style={{ color: "#FB7185", fontSize: 24, fontWeight: 900 }}>-Rp 900.000</span>
        </div>

        <div
          style={{
            transform: `scale(${card2})`,
            opacity: card2,
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: "6px solid #F59E0B",
          }}
        >
          <span style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700 }}>⚡ Listrik & Air Rumah</span>
          <span style={{ color: "#FBBF24", fontSize: 24, fontWeight: 900 }}>-Rp 400.000</span>
        </div>

        <div
          style={{
            transform: `scale(${card3})`,
            opacity: card3,
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: "6px solid #EC4899",
          }}
        >
          <span style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700 }}>🎒 Sekolah & Kebutuhan Anak</span>
          <span style={{ color: "#F472B6", fontSize: 24, fontWeight: 900 }}>-Rp 500.000</span>
        </div>

        {/* Tabungan Bersih */}
        <div
          style={{
            transform: `scale(${climaxCard})`,
            opacity: climaxCard,
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "3px solid #10B981",
            borderRadius: 24,
            padding: "24px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 0 35px rgba(16, 185, 129, 0.3)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#6EE7B7", fontSize: 18, fontWeight: 800 }}>SISA TABUNGAN BERSIH</span>
            <span style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900 }}>HANYA ~Rp 200.000 / BULAN</span>
          </div>
          <div
            style={{
              backgroundColor: "#10B981",
              color: "#000000",
              fontSize: 18,
              fontWeight: 900,
              padding: "8px 18px",
              borderRadius: 20,
            }}
          >
            Tabungan Nyata
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: TIMELINE NYATA & PERTANYAAN DISKUSI
// =========================================================================
const Scene5StoryV3Timeline: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const formulaSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 90 } });
  const bannerSpring = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 100 } });
  const ctaSpring = spring({ frame: frame - 45, fps, config: { damping: 12, stiffness: 100 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="v3TimelineSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#v3TimelineSky)" />
        <ellipse cx="540" cy="960" rx="460" ry="240" fill="#F43F5E" opacity="0.08" />
      </svg>

      {/* Header Info */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 30,
        }}
      >
        <div
          style={{
            color: "#FDE047",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "1px",
          }}
        >
          DISKUSI TERBUKA
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: "-1px",
          }}
        >
          Harga Global vs Upah Lokal
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          zIndex: 20,
        }}
      >
        {/* Pak Budi & Pak Hendra dengan Rumus di Tengah */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <CharacterPakBudi frame={frame} size={220} emotion="shocked" />

          <div
            style={{
              transform: `scale(${formulaSpring})`,
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "2px solid #64748B",
              borderRadius: 24,
              padding: "24px 36px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#E2E8F0", fontSize: 26, fontWeight: 900 }}>Rp 16,5 Juta</div>
              <div style={{ color: "#94A3B8", fontSize: 14 }}>Harga HP</div>
            </div>
            <div style={{ color: "#38BDF8", fontSize: 32, fontWeight: 900 }}>÷</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#4ADE80", fontSize: 26, fontWeight: 900 }}>Rp 200rb</div>
              <div style={{ color: "#94A3B8", fontSize: 14 }}>Sisa/Bln</div>
            </div>
            <div style={{ color: "#38BDF8", fontSize: 32, fontWeight: 900 }}>=</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#F43F5E", fontSize: 36, fontWeight: 900 }}>82,5 BLN</div>
              <div style={{ color: "#94A3B8", fontSize: 14 }}>Waktu Tabung</div>
            </div>
          </div>

          <CharacterPakHendra frame={frame} size={220} emotion="happy" />
        </div>

        {/* Banner Penegas */}
        <div
          style={{
            transform: `scale(${bannerSpring})`,
            backgroundColor: "#EF4444",
            color: "#FFFFFF",
            padding: "16px 36px",
            borderRadius: 50,
            fontSize: 28,
            fontWeight: 900,
            textAlign: "center",
            boxShadow: "0 10px 35px rgba(239, 68, 68, 0.45)",
          }}
        >
          🗓️ HAMPIR 7 TAHUN MENABUNG UNTUK 1 HP!
        </div>

        {/* Pertanyaan Refleksi */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            border: "1.5px solid rgba(255, 255, 255, 0.15)",
            borderRadius: 24,
            padding: "24px 32px",
            textAlign: "center",
            color: "#F8FAFC",
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          Menurut kamu, apakah patokan harga gadget global ini masuk akal buat masyarakat kita?
        </div>

        {/* CTA */}
        <div
          style={{
            transform: `scale(${ctaSpring})`,
            backgroundColor: "#38BDF8",
            color: "#020617",
            padding: "14px 40px",
            borderRadius: 50,
            fontSize: 24,
            fontWeight: 900,
            boxShadow: "0 10px 30px rgba(56, 189, 248, 0.4)",
          }}
        >
          💬 TULIS PENDAPATMU DI KOLOM KOMENTAR YA!
        </div>
      </div>
    </div>
  );
};
