import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type IPhoneWorldVisualType =
  | "world-hook-showcase"
  | "world-bridge-question"
  | "world-income-contrast"
  | "world-living-expenses"
  | "world-savings-timeline";

export const IPhoneWorldVisuals: React.FC<{
  type: IPhoneWorldVisualType;
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
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {type === "world-hook-showcase" && <Scene1WorldHook frame={frame} fps={fps} />}
      {type === "world-bridge-question" && <Scene2WorldBridge frame={frame} fps={fps} />}
      {type === "world-income-contrast" && <Scene3WorldIncomeContrast frame={frame} fps={fps} />}
      {type === "world-living-expenses" && <Scene4WorldLivingExpenses frame={frame} fps={fps} />}
      {type === "world-savings-timeline" && <Scene5WorldSavingsTimeline frame={frame} fps={fps} />}
    </div>
  );
};

// =========================================================================
// KARAKTER 2D BESAR & EKSPRESIF
// =========================================================================
type CharacterEmotion = "happy" | "confused" | "shocked" | "talking";

interface CharacterProps {
  size?: number;
  frame: number;
  emotion?: CharacterEmotion;
}

export const CharacterPakBudi: React.FC<CharacterProps> = ({
  size = 420,
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
        {/* Ground Shadow */}
        <ellipse cx="100" cy="222" rx="72" ry="12" fill="rgba(0,0,0,0.45)" />

        {/* Tubuh Petani dengan Kemeja Kerja Hijau */}
        <g transform={`translate(0, ${breathY * 0.5})`}>
          <path
            d="M48 148 C48 128 74 124 100 124 C126 124 152 128 152 148 L158 215 L42 215 Z"
            fill="#4D7C0F"
            stroke="#1E3A0F"
            strokeWidth="3.5"
          />
          <path d="M85 124 L100 150 L115 124" stroke="#FEF08A" strokeWidth="4" fill="none" />
          {/* Handuk Putih Melingkar di Pundak */}
          <path
            d="M70 132 C68 160 74 185 76 200 M130 132 C132 160 126 185 124 200"
            stroke="#F8FAFC"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </g>

        {/* Kepala & Wajah */}
        <g transform={`translate(0, ${breathY}) rotate(${headBob}, 100, 95)`}>
          <rect x="90" y="110" width="20" height="20" fill="#FBBF24" />
          <ellipse cx="100" cy="92" rx="40" ry="38" fill="#FDE047" stroke="#B45309" strokeWidth="3" />
          <circle cx="58" cy="94" r="8" fill="#FDE047" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="142" cy="94" r="8" fill="#FDE047" stroke="#B45309" strokeWidth="2.5" />

          {/* Alis */}
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

          {/* Hidung */}
          <path d="M98 90 Q102 96 98 100" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Mulut */}
          {emotion === "confused" ? (
            <path d="M88 108 Q94 112 100 107 Q106 102 112 108" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          ) : emotion === "shocked" ? (
            <ellipse cx="100" cy="110" rx="9" ry="14" fill="#451A03" stroke="#B45309" strokeWidth="2" />
          ) : emotion === "talking" ? (
            <ellipse cx="100" cy="108" rx="11" ry={6 + Math.abs(Math.sin(frame / 3)) * 6} fill="#991B1B" stroke="#451A03" strokeWidth="2.5" />
          ) : (
            <path d="M86 105 Q100 118 114 105" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}

          <circle cx="73" cy="98" r="6" fill="#F43F5E" opacity="0.35" />
          <circle cx="127" cy="98" r="6" fill="#F43F5E" opacity="0.35" />

          {/* Keringat Saat Shocked / Confused */}
          {(emotion === "confused" || emotion === "shocked") && (
            <g transform={`translate(${135 + Math.sin(frame / 6) * 2}, ${70 + breathY})`}>
              <path d="M0 0 C4 6 6 12 0 16 C-6 12 -4 6 0 0 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            </g>
          )}

          {/* Topi Caping Petani */}
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

export const CharacterPakAnu: React.FC<CharacterProps> = ({
  size = 420,
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
        {/* Ground Shadow */}
        <ellipse cx="100" cy="222" rx="72" ry="12" fill="rgba(0,0,0,0.45)" />

        {/* Tubuh: Jas Navy & Dasi Merah */}
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

        {/* Kepala & Wajah */}
        <g transform={`translate(0, ${breathY}) rotate(${headBob}, 100, 95)`}>
          <rect x="91" y="108" width="18" height="18" fill="#FDBA74" />
          <path d="M54 75 C54 40 80 32 100 32 C120 32 146 40 146 75 Z" fill="#0F172A" />
          <ellipse cx="100" cy="90" rx="38" ry="36" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.8" />
          <circle cx="60" cy="92" r="7" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <circle cx="140" cy="92" r="7" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />

          {/* Rambut & Alis */}
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

          {/* Kacamata */}
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
// SCENE 1: HOOK DUA TOKOH DI DALAM DUNIA NYATA (FULL IMMERSION)
// =========================================================================
const Scene1WorldHook: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Beat 1: Pak Budi di Dunianya (Frame 0 - 68)
  // Beat 2: Pak Anu di Dunianya (Frame 68 - 136)
  // Beat 3: Keduanya menatap iPhone impian (Frame 136 - 246)
  const isBeat1 = frame < 68;
  const isBeat2 = frame >= 68 && frame < 136;
  const isBeat3 = frame >= 136;

  const currentBeatFrame = isBeat1 ? frame : isBeat2 ? frame - 68 : frame - 136;
  const dollyScale = interpolate(currentBeatFrame, [0, 80], [1.0, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* 1. BEAT 1: DUNIA SAWAH & PEDESAAN PAK BUDI */}
      {isBeat1 && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Latar Langit Pagi Penuh */}
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="villageSkyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="22%" stopColor="#38BDF8" />
                <stop offset="45%" stopColor="#F59E0B" />
                <stop offset="68%" stopColor="#FEF08A" />
                <stop offset="85%" stopColor="#84CC16" />
                <stop offset="100%" stopColor="#4D7C0F" />
              </linearGradient>
              <radialGradient id="morningSun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#FBBF24" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Langit Fajar Hangat & Alami */}
            <rect width="1080" height="1920" fill="url(#villageSkyGrad)" />

            {/* Matahari Pagi Bersinar di Langit Atas */}
            <circle
              cx="540"
              cy="440"
              r="220"
              fill="url(#morningSun)"
              transform={`scale(${1 + Math.sin(frame / 15) * 0.04})`}
              style={{ transformOrigin: "540px 440px" }}
            />
            <circle cx="540" cy="440" r="65" fill="#FEF08A" />

            {/* Burung-Burung Pagi Melintasi Langit */}
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

            {/* Awan Pagi Mengambang */}
            <path
              d={`M ${(frame * 0.4) % 1200 - 150} 380 Q ${(frame * 0.4) % 1200 - 80} 330 ${(frame * 0.4) % 1200 + 40} 380 Q ${(frame * 0.4) % 1200 + 120} 350 ${(frame * 0.4) % 1200 + 200} 380 Q ${(frame * 0.4) % 1200 + 80} 440 ${(frame * 0.4) % 1200 - 150} 380 Z`}
              fill="#FFFFFF"
              opacity="0.45"
            />
            <path
              d={`M ${((frame * 0.25) % 1200) + 200} 460 Q ${((frame * 0.25) % 1200) + 290} 420 ${((frame * 0.25) % 1200) + 400} 460 Q ${((frame * 0.25) % 1200) + 500} 430 ${((frame * 0.25) % 1200) + 600} 460 Q ${((frame * 0.25) % 1200) + 420} 520 ${((frame * 0.25) % 1200) + 200} 460 Z`}
              fill="#FFFFFF"
              opacity="0.35"
            />

            {/* Pegunungan Berkabut */}
            <path d="M 0 780 Q 280 620 540 720 Q 820 600 1080 760 L 1080 1920 L 0 1920 Z" fill="#1E3A8A" opacity="0.6" />
            <path d="M 0 880 Q 320 760 680 840 Q 900 770 1080 890 L 1080 1920 L 0 1920 Z" fill="#1E293B" opacity="0.75" />

            {/* Terasering Sawah Hijau Berundak */}
            <path d="M 0 1000 Q 350 920 720 980 Q 940 940 1080 1010 L 1080 1920 L 0 1920 Z" fill="#4D7C0F" />
            <path d="M 0 1160 Q 420 1090 820 1140 Q 980 1110 1080 1180 L 1080 1920 L 0 1920 Z" fill="#365314" />
            <path d="M 0 1340 Q 360 1270 740 1320 Q 960 1290 1080 1360 L 1080 1920 L 0 1920 Z" fill="#14532D" />

            {/* Pematang Tanah Tempat Berdiri */}
            <path d="M 280 1920 L 440 1300 L 640 1300 L 800 1920 Z" fill="#78350F" opacity="0.7" />
          </svg>

          {/* Konteks Narasi Alami (Tanpa Pill Badge Kaku Ber-Border) */}
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
                fontSize: 34,
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

          {/* Karakter Pak Budi Berdiri di Sawah */}
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

      {/* 2. BEAT 2: DUNIA KOTA METROPOLITAN PAK ANU */}
      {isBeat2 && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Latar Senja Kota Penuh */}
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="citySkyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#020617" />
                <stop offset="30%" stopColor="#0F172A" />
                <stop offset="65%" stopColor="#0369A1" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id="towerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#070D1A" />
              </linearGradient>
            </defs>

            <rect width="1080" height="1920" fill="url(#citySkyGrad)" />

            {/* Siluet Pencakar Langit Megah */}
            <rect x="60" y="550" width="160" height="900" fill="url(#towerGrad)" rx="10" />
            <rect x="240" y="400" width="200" height="1050" fill="url(#towerGrad)" rx="10" />
            <polygon points="240,400 340,280 440,400" fill="#334155" />
            <rect x="460" y="480" width="220" height="970" fill="url(#towerGrad)" rx="10" />
            <rect x="700" y="360" width="180" height="1090" fill="url(#towerGrad)" rx="10" />
            <rect x="900" y="460" width="160" height="990" fill="url(#towerGrad)" rx="10" />

            {/* Jendela Gedung Menyala */}
            {[
              [100, 600], [140, 600], [100, 660], [140, 720], [100, 780],
              [280, 480], [340, 480], [280, 560], [340, 560], [340, 640],
              [500, 540], [560, 540], [620, 540], [500, 620], [560, 700],
              [740, 440], [800, 440], [740, 520], [800, 600], [740, 680],
              [940, 520], [980, 520], [940, 600], [980, 680],
            ].map(([x, y], idx) => (
              <rect
                key={idx}
                x={x}
                y={y}
                width="20"
                height="26"
                rx="4"
                fill={idx % 2 === 0 ? "#FDE047" : "#38BDF8"}
                opacity={0.65 + Math.sin((frame + idx * 8) / 10) * 0.3}
              />
            ))}

            {/* Lantai Eksekutif / Balkon Penthouse */}
            <rect x="0" y="1380" width="1080" height="540" fill="#0A0F1D" />
            <line x1="0" y1="1380" x2="1080" y2="1380" stroke="#38BDF8" strokeWidth="4" opacity="0.6" />
            <line x1="120" y1="1440" x2="960" y2="1440" stroke="#1E293B" strokeWidth="3" />
            <line x1="60" y1="1520" x2="1020" y2="1520" stroke="#1E293B" strokeWidth="3" />
          </svg>

          {/* Konteks Narasi Alami (Tanpa Pill Badge Kaku Ber-Border) */}
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
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textShadow: "0 4px 18px rgba(0,0,0,0.65)",
              }}
            >
              💼 Pak Anu
            </div>
            <div
              style={{
                color: "#7DD3FC",
                fontSize: 22,
                fontWeight: 700,
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              }}
            >
              Pebisnis Kota • Omzet Puluhan Juta/Bln
            </div>
          </div>

          {/* Karakter Pak Anu Berdiri di Penthouse */}
          <div
            style={{
              position: "absolute",
              top: 660,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 15,
            }}
          >
            <CharacterPakAnu frame={frame} size={460} emotion="happy" />
          </div>
        </div>
      )}

      {/* 3. BEAT 3: PERTEMUAN KEDUANYA MENATAP IPHONE 15 PRO */}
      {isBeat3 && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Latar Showroom Ritel Mewah */}
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="showroomSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B1329" />
                <stop offset="50%" stopColor="#070B18" />
                <stop offset="100%" stopColor="#02040A" />
              </linearGradient>
              <linearGradient id="spotCone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>
            </defs>

            <rect width="1080" height="1920" fill="url(#showroomSky)" />

            {/* Spotlight Cahaya Memancar dari Atas Menyorot iPhone */}
            <polygon points="540,100 240,1600 840,1600" fill="url(#spotCone)" />

            {/* Lantai Marmer Glossy */}
            <rect x="0" y="1420" width="1080" height="500" fill="#050811" />
            <ellipse cx="540" cy="1440" rx="360" ry="40" fill="#38BDF8" opacity="0.15" />
          </svg>

          {/* Top Banner: Satu HP • Harga Resmi Sama */}
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
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(12px)",
                border: "2px solid #E2E8F0",
                borderRadius: 50,
                padding: "8px 24px",
                color: "#E2E8F0",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              📱 SATU IPHONE • HARGA RESMI SAMA
            </div>
            <div
              style={{
                color: "#F43F5E",
                fontSize: 48,
                fontWeight: 900,
                letterSpacing: "-1px",
                textShadow: "0 0 30px rgba(244, 63, 94, 0.4)",
              }}
            >
              Rp 16.500.000
            </div>
          </div>

          {/* Pusat: Model iPhone 15 Raksasa Mengambang */}
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
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 16,
              }}
            >
              {/* Dynamic Island */}
              <div
                style={{
                  width: 75,
                  height: 20,
                  backgroundColor: "#000000",
                  borderRadius: 14,
                  marginTop: 4,
                }}
              />
              {/* Layar Tampilan */}
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
                <div
                  style={{
                    color: "#FFFFFF",
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  Rp 16.500.000
                </div>
              </div>
            </div>
          </div>

          {/* Pak Budi di Kiri (Shocked) */}
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
                backgroundColor: "#84CC16",
                color: "#000000",
                fontSize: 18,
                fontWeight: 900,
                padding: "4px 18px",
                borderRadius: 20,
                marginTop: -10,
              }}
            >
              PAK BUDI
            </div>
          </div>

          {/* Pak Anu di Kanan (Santai) */}
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
            <CharacterPakAnu frame={frame} size={400} emotion="happy" />
            <div
              style={{
                backgroundColor: "#38BDF8",
                color: "#000000",
                fontSize: 18,
                fontWeight: 900,
                padding: "4px 18px",
                borderRadius: 20,
                marginTop: -10,
              }}
            >
              PAK ANU
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
const Scene2WorldBridge: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.9, stiffness: 100 },
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
      {/* Background Suasana Studio / Diskusi Hangat Tanpa Grid */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="bridgeSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#1C2541" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
          <radialGradient id="bridgeGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#bridgeSky)" />
        <rect width="1080" height="1920" fill="url(#bridgeGlow)" />
        <ellipse cx="540" cy="1480" rx="420" ry="40" fill="#000000" opacity="0.5" />
      </svg>

      {/* Karakter Pak Budi di Kiri (Bingung Menggaruk Kepala) */}
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
        {/* Tanda Tanya Mengambang */}
        <div
          style={{
            color: "#FBBF24",
            fontSize: 48,
            fontWeight: 900,
            transform: `translateY(${questionBounce}px)`,
            marginBottom: -15,
          }}
        >
          ❓
        </div>
        <CharacterPakBudi frame={frame} size={420} emotion="confused" />
        <div
          style={{
            backgroundColor: "#84CC16",
            color: "#000000",
            fontSize: 18,
            fontWeight: 900,
            padding: "4px 18px",
            borderRadius: 20,
            marginTop: -10,
          }}
        >
          PAK BUDI (BINGUNG)
        </div>
      </div>

      {/* Karakter Pak Anu di Kanan (Mengajak Berbicara) */}
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
        <CharacterPakAnu frame={frame} size={420} emotion="talking" />
        <div
          style={{
            backgroundColor: "#38BDF8",
            color: "#000000",
            fontSize: 18,
            fontWeight: 900,
            padding: "4px 18px",
            borderRadius: 20,
            marginTop: -10,
          }}
        >
          PAK ANU (MENJELASKAN)
        </div>
      </div>

      {/* Kartu Speech Bubble Sentral */}
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
            letterSpacing: "-0.5px",
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
            boxShadow: "0 10px 25px rgba(56, 189, 248, 0.35)",
          }}
        >
          Yuk, Sini Kita Jelasin!
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 3: NILAI TUKAR KERINGAT (3 HARI VS 8 BULAN)
// =========================================================================
const Scene3WorldIncomeContrast: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const anuProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 80 },
  });

  const budiProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 16, mass: 1.0, stiffness: 60 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* Background Sinematik Tanpa Grid */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="contrastSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B0F19" />
            <stop offset="50%" stopColor="#111827" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#contrastSky)" />
        <ellipse cx="540" cy="960" rx="480" ry="260" fill="#38BDF8" opacity="0.06" />
      </svg>

      {/* Header Info Besar */}
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
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(12px)",
            border: "2px solid #FBBF24",
            borderRadius: 50,
            padding: "8px 24px",
            color: "#FDE047",
            fontSize: 22,
            fontWeight: 800,
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
            textShadow: "0 0 30px rgba(255,255,255,0.2)",
          }}
        >
          3 HARI vs 8 BULAN
        </div>
      </div>

      {/* Kontainer Komparasi Utama */}
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
        {/* Row Pak Anu: Cuma 3 Hari */}
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
          <CharacterPakAnu frame={frame} size={150} emotion="happy" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#38BDF8", fontSize: 24, fontWeight: 800 }}>
                Pak Anu (Pebisnis Kota)
              </span>
              <span style={{ color: "#4ADE80", fontSize: 22, fontWeight: 900 }}>
                ⚡ CUMA 3 HARI OMZET
              </span>
            </div>
            {/* Bar Pendek Hijau */}
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
                  width: `${Math.min(100, Math.max(0, anuProgress * 15))}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #10B981, #34D399)",
                  borderRadius: 18,
                }}
              />
            </div>
          </div>
        </div>

        {/* Row Pak Budi: 8.3 Bulan Penuh */}
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
                🔥 8.3 BULAN PENUH (~245 HARI)
              </span>
            </div>
            {/* Bar Panjang Oranye */}
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

        {/* Banner Penegas Bawah */}
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
          ⚠️ Pak Budi butuh 80× lipat lebih lama... itu pun kalau 100% gaji ditabung tanpa makan!
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 4: REALITAS BIAYA HIDUP PAK BUDI (POTONGAN KEBUTUHAN POKOK)
// =========================================================================
const Scene4WorldLivingExpenses: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
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
      {/* Background Suasana Rumah Pedesaan Hangat */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="livingSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#090D1A" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#livingSky)" />
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
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(12px)",
            border: "2px solid #84CC16",
            borderRadius: 50,
            padding: "8px 24px",
            color: "#BEF264",
            fontSize: 22,
            fontWeight: 800,
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

      {/* Kontainer Utama */}
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
        {/* Karakter Pak Budi Sedang Menghitung Pengeluaran */}
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

        {/* Daftar 3 Potongan Pengeluaran Konkret */}
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

        {/* Hasil Sisa Riil */}
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
// SCENE 5: TIMELINE KALKULASI & PERTANYAAN DISKUSI TERBUKA
// =========================================================================
const Scene5WorldSavingsTimeline: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
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
      {/* Background Senja Renungan Tanpa Grid */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="timelineSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#timelineSky)" />
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
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(12px)",
            border: "2px solid #FBBF24",
            borderRadius: 50,
            padding: "8px 24px",
            color: "#FDE047",
            fontSize: 22,
            fontWeight: 800,
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

      {/* Kontainer Rumus & Tokoh */}
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
        {/* Tokoh Berdampingan dengan Rumus Matematika di Tengah */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <CharacterPakBudi frame={frame} size={220} emotion="shocked" />

          {/* Kotak Rumus Hitungan */}
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

          <CharacterPakAnu frame={frame} size={220} emotion="happy" />
        </div>

        {/* Banner Penegas: Hampir 7 Tahun Menabung! */}
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

        {/* Kartu Pertanyaan Refleksi */}
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

        {/* CTA Interaktif Kolom Komentar */}
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
