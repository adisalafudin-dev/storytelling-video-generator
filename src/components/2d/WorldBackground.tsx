import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type WorldTheme = "museum" | "studio" | "canvas" | "heist" | "vault";

export const WorldBackground: React.FC<{
  theme?: WorldTheme;
  children?: React.ReactNode;
}> = ({ theme = "museum", children }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Subtle floating light motes / atmospheric dust
  const mote1Y = interpolate(frame % 200, [0, 200], [height * 0.8, height * 0.2]);
  const mote1X = 200 + Math.sin(frame * 0.05) * 30;
  const mote2Y = interpolate((frame + 70) % 220, [0, 220], [height * 0.75, height * 0.15]);
  const mote2X = width * 0.7 + Math.cos(frame * 0.04) * 25;
  const mote3Y = interpolate((frame + 130) % 180, [0, 180], [height * 0.85, height * 0.3]);
  const mote3X = width * 0.4 + Math.sin(frame * 0.06) * 40;

  // Ambient light breathing
  const lightBreath = 0.85 + Math.sin(frame * 0.07) * 0.12;
  const rayAngle = Math.sin(frame * 0.03) * 3;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#070B14",
        pointerEvents: "none",
      }}
    >
      {/* 1. Theme-Specific Wall & Architectural Background Texture */}
      {theme === "museum" && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Deep Classical Louvre Gallery Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 30%, #151E33 0%, #0A0F1D 60%, #03060E 100%)",
            }}
          />
          {/* Subtle Classical Damask / Diamond Wall Texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(45deg, rgba(255, 255, 255, 0.02) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(255, 255, 255, 0.02) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.02) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.02) 75%)
              `,
              backgroundSize: "60px 60px",
              backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
              opacity: 0.6,
            }}
          />
          {/* Gallery Wainscoting & Ceiling Moulding */}
          <div
            style={{
              position: "absolute",
              top: "14%",
              left: "4%",
              right: "4%",
              height: "72%",
              border: "2px solid rgba(212, 175, 55, 0.12)",
              borderRadius: 20,
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.8)",
            }}
          />
        </div>
      )}

      {theme === "studio" && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Warm Renaissance Stone Castle Room */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 30% 35%, #251B14 0%, #140E0A 60%, #0A0705 100%)",
            }}
          />
          {/* Stone Block Texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(217, 119, 6, 0.04) 2px, transparent 2px),
                linear-gradient(90deg, rgba(217, 119, 6, 0.04) 2px, transparent 2px)
              `,
              backgroundSize: "90px 45px",
              opacity: 0.8,
            }}
          />
        </div>
      )}

      {theme === "canvas" && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Deep Dark Macro Inspection Room */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at center, #1E1B18 0%, #0D0A08 70%, #040302 100%)",
            }}
          />
          {/* Subtle Canvas Poplar Grain */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 6px),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 6px)
              `,
              opacity: 0.9,
            }}
          />
        </div>
      )}

      {theme === "heist" && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Ominous Crime Scene Dark Atmosphere */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 40% 40%, #20120D 0%, #120A07 55%, #080403 100%)",
            }}
          />
          {/* Alert Red Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(239, 68, 68, 0.15) 100%)",
            }}
          />
        </div>
      )}

      {theme === "vault" && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* High Tech Modern Louvre Salle des États */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 35%, #0B1E3B 0%, #071124 50%, #020612 100%)",
            }}
          />
          {/* Clean Tech Security Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(56, 189, 248, 0.05) 1.5px, transparent 1.5px),
                linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1.5px, transparent 1.5px)
              `,
              backgroundSize: "60px 60px",
              opacity: 0.8,
            }}
          />
        </div>
      )}

      {/* 2. Dynamic Volumetric Spotlight Rays */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "35%",
          width: 550,
          height: 1200,
          background:
            theme === "studio"
              ? "linear-gradient(135deg, rgba(251, 191, 36, 0.22) 0%, rgba(217, 119, 6, 0.06) 45%, transparent 75%)"
              : theme === "vault"
              ? "linear-gradient(135deg, rgba(56, 189, 248, 0.20) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 80%)"
              : "linear-gradient(135deg, rgba(254, 240, 138, 0.24) 0%, rgba(250, 204, 21, 0.06) 45%, transparent 75%)",
          filter: "blur(45px)",
          transform: `rotate(${rayAngle}deg)`,
          transformOrigin: "top center",
          opacity: lightBreath,
        }}
      />

      {/* 3. Floating Ambient Dust / Light Motes (Life in the Air) */}
      <div
        style={{
          position: "absolute",
          left: mote1X,
          top: mote1Y,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#FEF08A",
          boxShadow: "0 0 12px #FEF08A",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: mote2X,
          top: mote2Y,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#FDE047",
          boxShadow: "0 0 16px #FDE047",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: mote3X,
          top: mote3Y,
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 0 10px #FFFFFF",
          opacity: 0.7,
        }}
      />

      {/* Embedded Scene Content */}
      {children}
    </div>
  );
};
