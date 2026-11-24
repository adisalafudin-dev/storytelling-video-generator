import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export type FactCardData = {
  heroHeadline: string; // Teks headline tebal besar di atas (misal: "HP-mu Naik Harga Gara-gara Chatbot")
  accentWord?: string;  // Kata yang diberi warna kuning cerah
  bigNumber?: string;   // Angka raksasa (misal: "+30%", "5X LIPAT", "Rp300 T")
  subLabel?: string;    // Penjelasan kecil di bawah angka (misal: "ALOKASI SERVER AI")
  badgeText?: string;   // Label pill kecil (misal: "FAKTA BISNIS")
  comparison?: {
    leftTitle: string;
    leftValue: string;
    rightTitle: string;
    rightValue: string;
    highlight?: "left" | "right";
  };
};

export const FactHeroCard: React.FC<{
  data: FactCardData;
}> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy spring entrance
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 100 },
  });

  const translateY = (1 - entranceSpring) * 30;
  const opacity = Math.min(1, entranceSpring * 1.5);

  // Helper untuk mewarnai accentWord di dalam heroHeadline
  const renderHeadline = () => {
    if (!data.accentWord) {
      return data.heroHeadline;
    }
    const parts = data.heroHeadline.split(new RegExp(`(${data.accentWord})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === data.accentWord?.toLowerCase() ? (
        <span key={i} style={{ color: "#FFD600", textDecoration: "underline", textUnderlineOffset: "6px" }}>
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "13%",
        left: "6%",
        right: "6%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        zIndex: 20,
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: "none",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Optional Top Badge */}
      {data.badgeText && (
        <div
          style={{
            backgroundColor: "rgba(255, 214, 0, 0.15)",
            border: "1.5px solid #FFD600",
            color: "#FFD600",
            padding: "4px 16px",
            borderRadius: 20,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          {data.badgeText}
        </div>
      )}

      {/* Main Punchy Headline */}
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: 44,
          fontWeight: 900,
          lineHeight: 1.15,
          margin: 0,
          letterSpacing: "-0.5px",
          textTransform: "uppercase",
          maxWidth: "95%",
          textShadow: "0 4px 16px rgba(0, 0, 0, 0.8)",
        }}
      >
        {renderHeadline()}
      </h1>

      {/* Big Hero Number Card */}
      {data.bigNumber && (
        <div
          style={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              color: "#FFD600",
              lineHeight: 0.95,
              letterSpacing: "-1px",
              textShadow: "0 0 25px rgba(255, 214, 0, 0.4)",
            }}
          >
            {data.bigNumber}
          </div>
          {data.subLabel && (
            <div
              style={{
                color: "#94A3B8",
                fontSize: 18,
                fontWeight: 700,
                marginTop: 6,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
              }}
            >
              {data.subLabel}
            </div>
          )}
        </div>
      )}

      {/* Two-Sided Comparison Card (Misal 2013 vs 2026 atau Server AI vs HP) */}
      {data.comparison && (
        <div
          style={{
            marginTop: 20,
            width: "100%",
            maxWidth: 600,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {/* Sisi Kiri */}
          <div
            style={{
              backgroundColor:
                data.comparison.highlight === "left"
                  ? "rgba(255, 214, 0, 0.15)"
                  : "rgba(30, 41, 59, 0.7)",
              border:
                data.comparison.highlight === "left"
                  ? "2px solid #FFD600"
                  : "1.5px solid rgba(148, 163, 184, 0.2)",
              borderRadius: 14,
              padding: "12px 16px",
              textAlign: "center",
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 15, fontWeight: 700 }}>
              {data.comparison.leftTitle}
            </div>
            <div
              style={{
                color: data.comparison.highlight === "left" ? "#FFD600" : "#FFFFFF",
                fontSize: 28,
                fontWeight: 900,
                marginTop: 4,
              }}
            >
              {data.comparison.leftValue}
            </div>
          </div>

          {/* Sisi Kanan */}
          <div
            style={{
              backgroundColor:
                data.comparison.highlight === "right"
                  ? "rgba(255, 42, 95, 0.18)"
                  : "rgba(30, 41, 59, 0.7)",
              border:
                data.comparison.highlight === "right"
                  ? "2px solid #FF2A5F"
                  : "1.5px solid rgba(148, 163, 184, 0.2)",
              borderRadius: 14,
              padding: "12px 16px",
              textAlign: "center",
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 15, fontWeight: 700 }}>
              {data.comparison.rightTitle}
            </div>
            <div
              style={{
                color: data.comparison.highlight === "right" ? "#FF2A5F" : "#FFFFFF",
                fontSize: 28,
                fontWeight: 900,
                marginTop: 4,
              }}
            >
              {data.comparison.rightValue}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
