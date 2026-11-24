import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { WorldBackground, WorldTheme } from "./WorldBackground";

export type WorldEnvironment =
  | "museum-gallery"
  | "florence-studio"
  | "canvas-sfumato"
  | "heist-1911"
  | "high-security-vault";

export const World2D: React.FC<{
  environment: WorldEnvironment;
}> = ({ environment }) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // Snappy entrance spring
  const anim = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 90 },
  });

  // Smooth cinematic 2D camera pan / zoom for parallax depth
  const cameraZoom = interpolate(frame, [0, durationInFrames], [1.0, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanX = interpolate(frame, [0, durationInFrames], [-8, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [0, durationInFrames], [-4, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const themeMap: Record<WorldEnvironment, WorldTheme> = {
    "museum-gallery": "museum",
    "florence-studio": "studio",
    "canvas-sfumato": "canvas",
    "heist-1911": "heist",
    "high-security-vault": "vault",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* 2D World Atmospheric Layer with Textured Walls & Floating Light Motes */}
      <WorldBackground theme={themeMap[environment]}>
        {/* Parallax Parallactic Props Container */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${cameraZoom}) translate(${cameraPanX}px, ${cameraPanY}px)`,
            transformOrigin: "center center",
          }}
        >
          {environment === "museum-gallery" && (
            <MuseumGalleryWorld anim={anim} frame={frame} height={height} />
          )}
          {environment === "florence-studio" && (
            <FlorenceStudioWorld anim={anim} frame={frame} width={width} height={height} />
          )}
          {environment === "canvas-sfumato" && (
            <CanvasSfumatoWorld anim={anim} frame={frame} width={width} height={height} />
          )}
          {environment === "heist-1911" && (
            <Heist1911World anim={anim} frame={frame} width={width} height={height} />
          )}
          {environment === "high-security-vault" && (
            <HighSecurityVaultWorld anim={anim} frame={frame} width={width} height={height} />
          )}
        </div>
      </WorldBackground>
    </div>
  );
};

// =========================================================================
// 1. MUSEUM GALLERY (SCENE 1: HOOK)
// =========================================================================
const MuseumGalleryWorld: React.FC<{ anim: number; frame: number; height: number }> = ({
  anim,
  frame,
}) => {
  const lightPulse = 0.85 + Math.sin(frame * 0.08) * 0.08;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Spotlight Halo over the Masterpiece */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "36%",
          transform: "translateX(-50%)",
          width: 480,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(254, 240, 138, 0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: lightPulse,
        }}
      />

      {/* Center Ornate Golden Baroque Frame with Mona Lisa */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "36%",
          transform: `translate(-50%, -50%) scale(${anim})`,
          width: 350,
          height: 490,
          borderRadius: 14,
          padding: 16,
          background: "linear-gradient(135deg, #D4AF37 0%, #AA771C 40%, #5B4010 70%, #F5DE7B 100%)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(212, 175, 55, 0.35)",
          border: "4px solid #85581A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Inner Frame Relief */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 6,
            border: "3px solid #3E2723",
            overflow: "hidden",
            position: "relative",
            backgroundColor: "#1C1917",
          }}
        >
          <MonaLisaPaintingSVG />
        </div>

        {/* Small Museum Brass Label Plaque */}
        <div
          style={{
            position: "absolute",
            bottom: -32,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#D4AF37",
            color: "#1C1917",
            padding: "5px 16px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: "1px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          LEONARDO DA VINCI • 1503
        </div>
      </div>

      {/* Museum Velvet Rope & Brass Stanchions */}
      <svg
        viewBox="0 0 1080 300"
        style={{
          position: "absolute",
          bottom: "16%",
          left: 0,
          width: "100%",
          zIndex: 15,
        }}
      >
        <rect x="80" y="80" width="18" height="200" fill="#D4AF37" rx="6" />
        <circle cx="89" cy="80" r="16" fill="#F5DE7B" />
        <ellipse cx="89" cy="280" rx="36" ry="12" fill="#AA771C" />

        <rect x="620" y="80" width="18" height="200" fill="#D4AF37" rx="6" />
        <circle cx="629" cy="80" r="16" fill="#F5DE7B" />
        <ellipse cx="629" cy="280" rx="36" ry="12" fill="#AA771C" />

        <path
          d="M 89 95 Q 350 210 629 95"
          fill="none"
          stroke="#991B1B"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 89 95 Q 350 210 629 95"
          fill="none"
          stroke="#DC2626"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// =========================================================================
// 2. FLORENCE STUDIO 1503 (SCENE 2: DA VINCI'S WORKSHOP)
// =========================================================================
const FlorenceStudioWorld: React.FC<{ anim: number; frame: number; width: number; height: number }> = ({
  anim,
  frame,
}) => {
  const cloudShift = interpolate(frame % 300, [0, 300], [-30, 30]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Arched Renaissance Window overlooking Tuscan Sunset */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "8%",
          width: 240,
          height: 380,
          borderRadius: "120px 120px 8px 8px",
          border: "12px solid #292524",
          overflow: "hidden",
          boxShadow: "0 0 50px rgba(245, 158, 11, 0.3), inset 0 0 20px rgba(0,0,0,0.6)",
          zIndex: 5,
        }}
      >
        {/* Sunset Sky Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, #7C2D12 0%, #D97706 45%, #FDE047 80%, #65A30D 100%)",
          }}
        />
        {/* Tuscan Rolling Hills & Trees */}
        <svg viewBox="0 0 240 380" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <circle cx="160" cy="220" r="32" fill="#FEF08A" opacity="0.9" />
          <ellipse cx={120 + cloudShift} cy="160" rx="40" ry="12" fill="rgba(255,255,255,0.4)" />
          <path d="M -20 320 Q 60 270 140 310 Q 200 330 260 300 L 260 380 L -20 380 Z" fill="#365314" />
          <path d="M -20 340 Q 80 320 180 350 L 260 350 L 260 380 L -20 380 Z" fill="#14532D" />
          <path d="M 40 310 L 46 260 L 52 310 Z" fill="#052E16" />
          <path d="M 54 315 L 59 275 L 64 315 Z" fill="#052E16" />
          <path d="M 190 325 L 195 280 L 200 325 Z" fill="#052E16" />
          <line x1="120" y1="0" x2="120" y2="380" stroke="#292524" strokeWidth="8" />
          <line x1="0" y1="200" x2="240" y2="200" stroke="#292524" strokeWidth="8" />
        </svg>
      </div>

      {/* Wooden Easel holding Canvas in Progress */}
      <div
        style={{
          position: "absolute",
          top: "43%",
          left: "45%",
          transform: `translate(-50%, -50%) scale(${anim})`,
          width: 300,
          height: 480,
          zIndex: 10,
        }}
      >
        <svg viewBox="0 0 300 480" style={{ width: "100%", height: "100%" }}>
          <line x1="150" y1="40" x2="40" y2="470" stroke="#78350F" strokeWidth="16" strokeLinecap="round" />
          <line x1="150" y1="40" x2="260" y2="470" stroke="#78350F" strokeWidth="16" strokeLinecap="round" />
          <line x1="150" y1="40" x2="150" y2="480" stroke="#451A03" strokeWidth="12" strokeLinecap="round" />
          <rect x="20" y="320" width="260" height="20" rx="6" fill="#92400E" stroke="#451A03" strokeWidth="3" />
        </svg>

        {/* Canvas on Easel */}
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 35,
            width: 230,
            height: 320,
            backgroundColor: "#292524",
            border: "6px solid #B45309",
            borderRadius: 6,
            boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
            overflow: "hidden",
          }}
        >
          <MonaLisaPaintingSVG />
        </div>
      </div>

      {/* Wooden Table with Alchemy Pigment Bottles & Anatomy Scroll */}
      <div
        style={{
          position: "absolute",
          bottom: "16%",
          left: "2%",
          width: 280,
          height: 180,
          zIndex: 8,
        }}
      >
        <svg viewBox="0 0 280 180" style={{ width: "100%", height: "100%" }}>
          <rect x="10" y="70" width="260" height="22" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="4" />
          <line x1="30" y1="92" x2="30" y2="180" stroke="#451A03" strokeWidth="12" />
          <line x1="240" y1="92" x2="240" y2="180" stroke="#451A03" strokeWidth="12" />

          {/* Blue Lapis Lazuli Pigment Flask */}
          <path d="M 50 70 L 65 35 L 75 35 L 90 70 Z" fill="rgba(59, 130, 246, 0.75)" stroke="#1E40AF" strokeWidth="2" />
          <rect x="64" y="28" width="12" height="8" rx="2" fill="#B45309" />

          {/* Red Ochre Jar */}
          <rect x="110" y="40" width="28" height="30" rx="4" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" />

          {/* Leonardo's Anatomical Manuscript Scroll */}
          <ellipse cx="180" cy="58" rx="14" ry="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <rect x="180" y="50" width="60" height="16" rx="3" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

// =========================================================================
// 3. CANVAS SFUMATO ZOOM-IN (SCENE 3: OPTICAL ILLUSION EXPLAINED)
// =========================================================================
const CanvasSfumatoWorld: React.FC<{ anim: number; frame: number; width: number; height: number }> = ({
  anim,
  frame,
}) => {
  const scanX = interpolate(frame % 120, [0, 60, 120], [0, 180, 0]);
  const glazeOpacity = 0.45 + Math.sin(frame * 0.1) * 0.2;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Extreme Close-up of Mona Lisa Face with Poplar Panel Texture */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${anim * 1.15})`,
          width: 440,
          height: 480,
          borderRadius: 24,
          border: "4px solid #D4AF37",
          boxShadow: "0 30px 80px rgba(0,0,0,0.85), 0 0 50px rgba(212, 175, 55, 0.3)",
          overflow: "hidden",
          backgroundColor: "#18181B",
          zIndex: 10,
        }}
      >
        <div style={{ transform: "scale(1.9) translateY(40px)", transformOrigin: "center center" }}>
          <MonaLisaPaintingSVG />
        </div>

        {/* Animated Semi-transparent Glazing Sfumato Layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
            transform: `translateX(${scanX - 90}px)`,
            opacity: glazeOpacity,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Circular Magnifier Inspection Ring focusing on the smile */}
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 130,
            height: 90,
            borderRadius: "50%",
            border: "3px dashed #FFD600",
            boxShadow: "0 0 25px rgba(255, 214, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -24,
              backgroundColor: "#FFD600",
              color: "#000",
              fontSize: 12,
              fontWeight: 900,
              padding: "2px 8px",
              borderRadius: 4,
              letterSpacing: "0.5px",
            }}
          >
            SFUMATO GLOW
          </div>
        </div>
      </div>

      {/* Floating Micro-Layer Info Pill */}
      <div
        style={{
          position: "absolute",
          top: "66%",
          left: "50%",
          transform: `translateX(-50%) scale(${anim})`,
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          border: "2px solid #FFD600",
          borderRadius: 16,
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "#FFD600",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 22,
          }}
        >
          🔍
        </div>
        <div>
          <div style={{ color: "#FFD600", fontSize: 18, fontWeight: 900 }}>
            30+ LAPISAN CAT ULTRA TIPIS
          </div>
          <div style={{ color: "#CBD5E1", fontSize: 14, fontWeight: 600 }}>
            Tebal 1/50 helai rambut manusia (tanpa garis kuas kasar)
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. HEIST 1911 (SCENE 4: EMPTY WALL & FLYING NEWSPAPERS)
// =========================================================================
const Heist1911World: React.FC<{ anim: number; frame: number; width: number; height: number }> = ({
  anim,
  frame,
}) => {
  const paperRot1 = Math.sin(frame * 0.1) * 8 - 12;
  const paperRot2 = Math.cos(frame * 0.08) * 6 + 10;
  const wireSway = Math.sin(frame * 0.15) * 12;

  // Snappy paper entrance
  const paperSpring = spring({
    frame: Math.max(0, frame - 15),
    fps: 30,
    config: { damping: 12, mass: 0.7, stiffness: 100 },
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Faded Dust Silhouette where Mona Lisa once hung */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "40%",
          transform: `translate(-50%, -50%) scale(${anim})`,
          width: 320,
          height: 460,
          border: "3px dashed rgba(239, 68, 68, 0.7)",
          borderRadius: 8,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.8), 0 0 30px rgba(239, 68, 68, 0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <circle cx="20" cy="20" r="8" fill="#78350F" />
        <circle cx="300" cy="20" r="8" fill="#78350F" />
        <circle cx="20" cy="440" r="8" fill="#78350F" />
        <circle cx="300" cy="440" r="8" fill="#78350F" />

        <svg
          viewBox="0 0 320 200"
          style={{ position: "absolute", top: 0, width: "100%", height: 200 }}
        >
          <path
            d={`M 160 0 Q ${160 + wireSway} 80 ${150 + wireSway * 1.5} 140`}
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
        </svg>

        {/* Big Alert Stamp */}
        <div
          style={{
            transform: "rotate(-12deg)",
            border: "5px solid #EF4444",
            color: "#EF4444",
            padding: "8px 22px",
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: "2px",
            backgroundColor: "rgba(127, 29, 29, 0.3)",
            borderRadius: 8,
          }}
        >
          LUKISAN DICURI!
        </div>

        <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 12, fontWeight: 700 }}>
          21 AGUSTUS 1911 • MUSÉE DU LOUVRE
        </div>
      </div>

      {/* Flying Vintage French Newspaper 1 (Le Figaro / Paris Journal) */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          right: "8%",
          width: 260,
          backgroundColor: "#FEF3C7",
          border: "2px solid #78350F",
          borderRadius: 6,
          padding: 14,
          boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
          transform: `scale(${paperSpring}) rotate(${paperRot1}deg)`,
          zIndex: 18,
          fontFamily: "'Times New Roman', serif",
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 900, borderBottom: "1px solid #78350F", paddingBottom: 4 }}>
          LE FIGARO — PARIS, 1911
        </div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#1F2937", marginTop: 6, lineHeight: 1.1 }}>
          LA JOCONDE A DISPARU DU LOUVRE!
        </div>
        <div style={{ fontSize: 10, color: "#4B5563", marginTop: 4 }}>
          60 detektif dikerahkan, Pablo Picasso sempat dituduh sebagai tersangka.
        </div>
      </div>

      {/* Flying Vintage Newspaper 2 */}
      <div
        style={{
          position: "absolute",
          bottom: "24%",
          left: "6%",
          width: 250,
          backgroundColor: "#F3F4F6",
          border: "2px solid #374151",
          borderRadius: 6,
          padding: 12,
          boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
          transform: `scale(${paperSpring}) rotate(${paperRot2}deg)`,
          zIndex: 18,
          fontFamily: "'Times New Roman', serif",
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 900, borderBottom: "1px solid #374151", paddingBottom: 4 }}>
          NEW YORK TIMES — WORLD HEADLINE
        </div>
        <div style={{ fontSize: 15, fontWeight: 900, color: "#111827", marginTop: 6, lineHeight: 1.1 }}>
          MONA LISA MISSING FOR 2 YEARS!
        </div>
        <div style={{ fontSize: 10, color: "#4B5563", marginTop: 4 }}>
          Ribuan orang antre di museum hanya untuk melihat dinding kosong.
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 5. HIGH SECURITY VAULT (SCENE 5: MODERN BULLETPROOF SHIELD & VALUATION)
// =========================================================================
const HighSecurityVaultWorld: React.FC<{ anim: number; frame: number; width: number; height: number }> = ({
  anim,
  frame,
}) => {
  const laserPulse = 0.6 + Math.sin(frame * 0.1) * 0.3;
  const glassGlare = interpolate(frame % 90, [0, 45, 90], [-100, 250, -100]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Bulletproof Enclosure Holding Mona Lisa */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "35%",
          transform: `translate(-50%, -50%) scale(${anim})`,
          width: 350,
          height: 500,
          borderRadius: 16,
          backgroundColor: "rgba(15, 23, 42, 0.7)",
          border: "4px solid #38BDF8",
          boxShadow: "0 25px 70px rgba(0,0,0,0.8), 0 0 40px rgba(56, 189, 248, 0.3)",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <div style={{ width: "100%", height: "100%", padding: 24 }}>
          <MonaLisaPaintingSVG />
        </div>

        {/* Glare Line on Bulletproof Glass */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
            transform: `skewX(-25deg) translateX(${glassGlare}px)`,
            pointerEvents: "none",
          }}
        />

        {/* Red Security Laser Beam */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: "#EF4444",
            boxShadow: "0 0 10px #EF4444, 0 0 20px #EF4444",
            opacity: laserPulse,
          }}
        />

        {/* Shield Protection Badge */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            backgroundColor: "rgba(14, 165, 233, 0.2)",
            border: "1.5px solid #38BDF8",
            color: "#38BDF8",
            padding: "4px 10px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.5px",
          }}
        >
          🛡️ KACA BULLETPROOF 4 CM
        </div>
      </div>

      {/* Massive Valuation Card */}
      <div
        style={{
          position: "absolute",
          top: "66%",
          left: "50%",
          transform: `translateX(-50%) scale(${anim})`,
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          border: "2px solid #FFD600",
          borderRadius: 20,
          padding: "18px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 15px 40px rgba(0,0,0,0.7), 0 0 25px rgba(255, 214, 0, 0.3)",
          zIndex: 20,
        }}
      >
        <div style={{ color: "#94A3B8", fontSize: 14, fontWeight: 800, letterSpacing: "1px" }}>
          ESTIMASI NILAI ASURANSI DUNIA
        </div>
        <div style={{ color: "#FFD600", fontSize: 44, fontWeight: 900, lineHeight: 1.1, marginTop: 4 }}>
          Rp14 TRILIUN
        </div>
        <div style={{ color: "#38BDF8", fontSize: 15, fontWeight: 700, marginTop: 4 }}>
          ($900 JUTA+ • KARYA SENI TERMAHAL DI BUMI)
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// VECTOR ARTWORK: MONA LISA (STYLIZED HISTORICAL ICON)
// =========================================================================
export const MonaLisaPaintingSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 300 420" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="mlSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="60%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="mlFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>
      </defs>

      <rect width="300" height="420" fill="url(#mlSky)" />
      <path d="M 0 240 Q 60 190 150 220 Q 240 180 300 230 L 300 420 L 0 420 Z" fill="#4B5563" opacity="0.6" />
      <path d="M 0 270 Q 80 230 180 260 Q 250 240 300 270 L 300 420 L 0 420 Z" fill="#2E382A" />
      <path d="M 230 250 Q 245 280 220 300 Q 260 320 280 350" fill="none" stroke="#60A5FA" strokeWidth="6" />

      <g id="mona-lisa-figure">
        <path
          d="M 90 120 C 70 200, 60 300, 40 420 L 260 420 C 240 300, 230 200, 210 120 C 190 60, 110 60, 90 120 Z"
          fill="#1C1917"
        />
        <path
          d="M 85 240 C 115 220, 185 220, 215 240 L 255 420 L 45 420 Z"
          fill="#1F2E22"
        />
        <path d="M 105 235 Q 150 265 195 235" fill="none" stroke="#D4AF37" strokeWidth="5" />

        <ellipse cx="140" cy="380" rx="36" ry="18" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />
        <ellipse cx="165" cy="385" rx="36" ry="18" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />

        <rect x="135" y="180" width="30" height="40" fill="#FDBA74" />
        <ellipse cx="150" cy="150" rx="42" ry="52" fill="url(#mlFace)" />
        <ellipse cx="150" cy="115" rx="44" ry="10" fill="rgba(255,255,255,0.25)" />

        <ellipse cx="134" cy="144" rx="7" ry="5" fill="#451A03" />
        <circle cx="132" cy="142" r="2" fill="#FFFFFF" />
        <ellipse cx="166" cy="144" rx="7" ry="5" fill="#451A03" />
        <circle cx="164" cy="142" r="2" fill="#FFFFFF" />

        <path d="M 150 144 L 146 158 L 154 158" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M 138 172 Q 150 178 162 172"
          fill="none"
          stroke="#9A3412"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
