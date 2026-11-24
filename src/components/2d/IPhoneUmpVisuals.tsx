import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type IPhoneUmpVisualType =
  | "iphone-hook-contrast"
  | "ump-days-comparison"
  | "cost-of-living-deduction"
  | "real-savings-timeline"
  | "ump-closing-summary";

export const IPhoneUmpVisuals: React.FC<{
  type: IPhoneUmpVisualType;
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
        width: 940,
        height: 760,
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
      {type === "iphone-hook-contrast" && <Scene1HookContrast frame={frame} fps={fps} />}
      {type === "ump-days-comparison" && <Scene2UmpComparison frame={frame} fps={fps} />}
      {type === "cost-of-living-deduction" && <Scene3CostDeduction frame={frame} fps={fps} />}
      {type === "real-savings-timeline" && <Scene4RealTimeline frame={frame} fps={fps} />}
      {type === "ump-closing-summary" && <Scene5ClosingSummary frame={frame} fps={fps} />}
    </div>
  );
};

// =========================================================================
// SCENE 1: HOOK KONTRAS (IPHONE RESMI SAMA, HARI KERJA BEDA)
// =========================================================================
const Scene1HookContrast: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const phoneEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 100 },
  });

  const badgeLeft = spring({
    frame: frame - 24,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 110 },
  });

  const badgeRight = spring({
    frame: frame - 46,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 110 },
  });

  const diffBanner = spring({
    frame: frame - 72,
    fps,
    config: { damping: 10, mass: 0.7, stiffness: 130 },
  });

  // Subtle floating motion for phone
  const floatY = Math.sin(frame / 15) * 6;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. Center iPhone Mockup */}
      <div
        style={{
          transform: `scale(${phoneEntrance}) translateY(${floatY}px)`,
          opacity: Math.min(1, phoneEntrance * 1.5),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 270,
            height: 480,
            backgroundColor: "#0F172A",
            borderRadius: 44,
            border: "5px solid #334155",
            boxShadow:
              "0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.15)",
            padding: 14,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              width: 80,
              height: 22,
              backgroundColor: "#020617",
              borderRadius: 12,
              marginBottom: 20,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />

          {/* Screen Content */}
          <div
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#090D16",
              borderRadius: 30,
              border: "1px solid #1E293B",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle Screen Grid */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(circle at center, rgba(56, 189, 248, 0.08) 0%, transparent 70%)",
              }}
            />

            {/* Apple / Smartphone Icon SVG */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.38c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.02.62-2.66 1.37-.56.65-1.06 1.71-.93 2.74 1.03.08 2.06-.51 2.67-1.26z"
                fill="#38BDF8"
              />
            </svg>

            {/* Uniform Price Tag */}
            <div
              style={{
                marginTop: 14,
                backgroundColor: "#FBBF24",
                color: "#0F172A",
                padding: "4px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Harga Resmi Sama
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 24,
                fontWeight: 900,
                color: "#F8FAFC",
                letterSpacing: "-0.5px",
              }}
            >
              Rp 16.499.000
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 12,
                color: "#94A3B8",
                fontWeight: 600,
              }}
            >
              iPhone 15 128GB
            </div>
          </div>
        </div>
      </div>

      {/* 2. Left Region Badge (Jakarta) */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: "35%",
          transform: `scale(${Math.max(0, badgeLeft)}) translateY(-50%)`,
          opacity: Math.max(0, Math.min(1, badgeLeft)),
          width: 300,
          backgroundColor: "#0F172A",
          border: "2px solid #0EA5E9",
          borderRadius: 20,
          padding: "16px 20px",
          boxShadow:
            "0 16px 36px rgba(0,0,0,0.5), 0 0 20px rgba(14, 165, 233, 0.25)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#0EA5E9",
            color: "#FFFFFF",
            fontSize: 11,
            fontWeight: 800,
            padding: "3px 10px",
            borderRadius: 6,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 6,
          }}
        >
          📍 DKI JAKARTA
        </div>
        <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600 }}>
          UMP ~Rp 5,06 Juta
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 28,
            fontWeight: 900,
            color: "#38BDF8",
            letterSpacing: "-0.5px",
          }}
        >
          ⏱️ 65 Hari
        </div>
        <div style={{ color: "#64748B", fontSize: 12, fontWeight: 500 }}>
          Kerja Penuh (Gross)
        </div>
      </div>

      {/* 3. Right Region Badge (Jawa Tengah) */}
      <div
        style={{
          position: "absolute",
          right: 10,
          top: "35%",
          transform: `scale(${Math.max(0, badgeRight)}) translateY(-50%)`,
          opacity: Math.max(0, Math.min(1, badgeRight)),
          width: 300,
          backgroundColor: "#0F172A",
          border: "2px solid #EF4444",
          borderRadius: 20,
          padding: "16px 20px",
          boxShadow:
            "0 16px 36px rgba(0,0,0,0.5), 0 0 20px rgba(239, 68, 68, 0.25)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#EF4444",
            color: "#FFFFFF",
            fontSize: 11,
            fontWeight: 800,
            padding: "3px 10px",
            borderRadius: 6,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 6,
          }}
        >
          📍 JAWA TENGAH
        </div>
        <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600 }}>
          UMP ~Rp 2,03 Juta
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 28,
            fontWeight: 900,
            color: "#F87171",
            letterSpacing: "-0.5px",
          }}
        >
          ⏱️ 162 Hari
        </div>
        <div style={{ color: "#64748B", fontSize: 12, fontWeight: 500 }}>
          Kerja Penuh (Gross)
        </div>
      </div>

      {/* 4. Bottom Staged Difference Callout Banner */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          transform: `scale(${Math.max(0, diffBanner)})`,
          opacity: Math.max(0, Math.min(1, diffBanner)),
          backgroundColor: "#FBBF24",
          color: "#0F172A",
          padding: "14px 32px",
          borderRadius: 16,
          fontWeight: 900,
          fontSize: 22,
          letterSpacing: "-0.3px",
          boxShadow: "0 12px 30px rgba(251, 191, 36, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span>⚡ SELISIH: +97 HARI KERJA (2,5× LIPAT)</span>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 2: PERBANDINGAN HARI KERJA (SPLIT COMPARISON BARS DENGAN COUNTER)
// =========================================================================
const Scene2UmpComparison: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 100 },
  });

  const barGrowth = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, mass: 1.0, stiffness: 70 },
  });

  const ratioBadge = spring({
    frame: frame - 65,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 120 },
  });

  const clampedGrowth = Math.max(0, Math.min(1, barGrowth));
  const jktDays = Math.round(interpolate(clampedGrowth, [0, 1], [0, 65]));
  const jatengDays = Math.round(interpolate(clampedGrowth, [0, 1], [0, 162]));

  // 162 days is 100% width, 65 days is (65 / 162) * 100% = 40.1%
  const jktBarWidth = clampedGrowth * 40.1;
  const jatengBarWidth = clampedGrowth * 100;

  return (
    <div
      style={{
        transform: `scale(${cardEntrance})`,
        opacity: Math.max(0, Math.min(1, cardEntrance)),
        width: 880,
        backgroundColor: "#0F172A",
        borderRadius: 28,
        border: "2px solid #1E293B",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Card Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#FBBF24",
              color: "#0F172A",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 6,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 8,
            }}
          >
            SIMULASI 100% GAJI KOTOR
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#F8FAFC" }}>
            Hari Kerja untuk 1 Unit iPhone
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 600 }}>Patokan Harga</div>
          <div style={{ fontSize: 20, color: "#38BDF8", fontWeight: 800 }}>Rp 16.499.000</div>
        </div>
      </div>

      {/* Bar 1: DKI Jakarta */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#38BDF8" }}>
              📍 DKI JAKARTA
            </span>
            <span style={{ fontSize: 14, color: "#94A3B8" }}>UMP Rp 5.067.381</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#38BDF8" }}>
            {jktDays} HARI (~3,2 Bln)
          </div>
        </div>
        {/* Track */}
        <div
          style={{
            width: "100%",
            height: 48,
            backgroundColor: "#020617",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #1E293B",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${jktBarWidth}%`,
              height: "100%",
              background: "linear-gradient(90deg, #0EA5E9 0%, #10B981 100%)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 14,
              boxSizing: "border-box",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
            }}
          >
            {jktBarWidth > 15 && (
              <span style={{ color: "#0F172A", fontWeight: 900, fontSize: 14 }}>65 HARI</span>
            )}
          </div>
        </div>
      </div>

      {/* Bar 2: Jawa Tengah */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#EF4444" }}>
              📍 JAWA TENGAH
            </span>
            <span style={{ fontSize: 14, color: "#94A3B8" }}>UMP Rp 2.036.947</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#EF4444" }}>
            {jatengDays} HARI (~8,1 Bln)
          </div>
        </div>
        {/* Track */}
        <div
          style={{
            width: "100%",
            height: 48,
            backgroundColor: "#020617",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #1E293B",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${jatengBarWidth}%`,
              height: "100%",
              background: "linear-gradient(90deg, #F97316 0%, #EF4444 100%)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 14,
              boxSizing: "border-box",
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
            }}
          >
            {jatengBarWidth > 20 && (
              <span style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 14 }}>162 HARI</span>
            )}
          </div>
        </div>
      </div>

      {/* Ratio Callout Footer */}
      <div
        style={{
          marginTop: 6,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 16,
          borderTop: "1px solid #1E293B",
        }}
      >
        <div style={{ fontSize: 13, color: "#64748B" }}>
          *Asumsi 20 hari kerja aktif per bulan, 100% gaji tanpa makan & tempat tinggal
        </div>
        <div
          style={{
            transform: `scale(${Math.max(0, ratioBadge)})`,
            backgroundColor: "#FBBF24",
            color: "#0F172A",
            padding: "8px 18px",
            borderRadius: 12,
            fontWeight: 900,
            fontSize: 16,
            boxShadow: "0 6px 18px rgba(251, 191, 36, 0.3)",
          }}
        >
          🔥 2,5× LIPAT LEBIH LAMA
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 3: EFEK POTONGAN BIAYA HIDUP (INCOME BAR MORPH & DEDUCTION CHIPS)
// =========================================================================
const Scene3CostDeduction: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 100 },
  });

  const chipFood = spring({ frame: frame - 18, fps, config: { damping: 12, stiffness: 110 } });
  const chipRent = spring({ frame: frame - 38, fps, config: { damping: 12, stiffness: 110 } });
  const chipTrans = spring({ frame: frame - 58, fps, config: { damping: 12, stiffness: 110 } });
  const alertBox = spring({ frame: frame - 85, fps, config: { damping: 10, stiffness: 120 } });

  // Progressive compression of remaining savings
  // Starts at 100%, after food drops to 55%, after rent drops to 20%, after transport drops to 10%
  const foodProgress = Math.max(0, Math.min(1, chipFood));
  const rentProgress = Math.max(0, Math.min(1, chipRent));
  const transProgress = Math.max(0, Math.min(1, chipTrans));

  const foodWidth = foodProgress * 45;
  const rentWidth = rentProgress * 35;
  const transWidth = transProgress * 10;
  const remainingSavings = Math.max(10, 100 - foodWidth - rentWidth - transWidth);

  return (
    <div
      style={{
        transform: `scale(${cardEntrance})`,
        opacity: Math.max(0, Math.min(1, cardEntrance)),
        width: 880,
        backgroundColor: "#0F172A",
        borderRadius: 28,
        border: "2px solid #1E293B",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div>
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#EF4444",
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: 900,
            padding: "4px 12px",
            borderRadius: 6,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 8,
          }}
        >
          REALITAS BIAYA HIDUP
        </div>
        <div style={{ fontSize: 26, fontWeight: 900, color: "#F8FAFC" }}>
          Gaji UMP vs Pengeluaran Pokok Nyata
        </div>
      </div>

      {/* Multi-segment Expense Breakdown Bar */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: 700,
            color: "#94A3B8",
            marginBottom: 8,
          }}
        >
          <span>ALOKASI PENDAPATAN 100%</span>
          <span style={{ color: remainingSavings <= 15 ? "#10B981" : "#FBBF24" }}>
            Sisa Tabungan: ~{Math.round(remainingSavings)}%
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: 48,
            backgroundColor: "#020617",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #1E293B",
            display: "flex",
          }}
        >
          {/* Food */}
          <div
            style={{
              width: `${foodWidth}%`,
              height: "100%",
              backgroundColor: "#F97316",
              transition: "none",
            }}
          />
          {/* Rent */}
          <div
            style={{
              width: `${rentWidth}%`,
              height: "100%",
              backgroundColor: "#EF4444",
              transition: "none",
            }}
          />
          {/* Transport */}
          <div
            style={{
              width: `${transWidth}%`,
              height: "100%",
              backgroundColor: "#A855F7",
              transition: "none",
            }}
          />
          {/* Net Savings */}
          <div
            style={{
              flex: 1,
              height: "100%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#0F172A", fontWeight: 900, fontSize: 13 }}>TABUNGAN</span>
          </div>
        </div>
      </div>

      {/* Deduction Chips Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {/* Chip 1 */}
        <div
          style={{
            transform: `scale(${Math.max(0, chipFood)})`,
            backgroundColor: "#1E293B",
            borderLeft: "4px solid #F97316",
            borderRadius: 12,
            padding: "12px 14px",
          }}
        >
          <div style={{ color: "#F97316", fontSize: 12, fontWeight: 800 }}>MAKAN & MINUM</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#F8FAFC", marginTop: 4 }}>
            45% Gaji
          </div>
          <div style={{ fontSize: 11, color: "#64748B" }}>Kebutuhan harian</div>
        </div>

        {/* Chip 2 */}
        <div
          style={{
            transform: `scale(${Math.max(0, chipRent)})`,
            backgroundColor: "#1E293B",
            borderLeft: "4px solid #EF4444",
            borderRadius: 12,
            padding: "12px 14px",
          }}
        >
          <div style={{ color: "#EF4444", fontSize: 12, fontWeight: 800 }}>KOS / TEMPAT TINGGAL</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#F8FAFC", marginTop: 4 }}>
            35% Gaji
          </div>
          <div style={{ fontSize: 11, color: "#64748B" }}>Sewa kamar & listrik</div>
        </div>

        {/* Chip 3 */}
        <div
          style={{
            transform: `scale(${Math.max(0, chipTrans)})`,
            backgroundColor: "#1E293B",
            borderLeft: "4px solid #A855F7",
            borderRadius: 12,
            padding: "12px 14px",
          }}
        >
          <div style={{ color: "#A855F7", fontSize: 12, fontWeight: 800 }}>TRANSPORT & LAINNYA</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#F8FAFC", marginTop: 4 }}>
            10% Gaji
          </div>
          <div style={{ fontSize: 11, color: "#64748B" }}>Bensin & kuota</div>
        </div>
      </div>

      {/* Alert Impact Banner */}
      <div
        style={{
          transform: `scale(${Math.max(0, alertBox)})`,
          backgroundColor: "rgba(239, 68, 68, 0.12)",
          border: "1.5px solid #EF4444",
          borderRadius: 16,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontSize: 26 }}>⚠️</span>
        <div>
          <div style={{ color: "#F87171", fontSize: 15, fontWeight: 800 }}>
            Tabungan Bersih Hanya Tersisa ~10% (Rp 200rb - 500rb/bulan)
          </div>
          <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 2 }}>
            Waktu riil yang dibutuhkan untuk menabung melesat berkali-kali lipat!
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 4: REALITAS ANGKA DI LAPANGAN (DUAL TIMELINE PATHS)
// =========================================================================
const Scene4RealTimeline: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 100 },
  });

  const track1 = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 90 } });
  const track2 = spring({ frame: frame - 35, fps, config: { damping: 14, stiffness: 90 } });
  const stampAnim = spring({ frame: frame - 65, fps, config: { damping: 10, stiffness: 130 } });

  const progress1 = Math.max(0, Math.min(1, track1));
  const progress2 = Math.max(0, Math.min(1, track2));

  return (
    <div
      style={{
        transform: `scale(${cardEntrance})`,
        opacity: Math.max(0, Math.min(1, cardEntrance)),
        width: 880,
        backgroundColor: "#0F172A",
        borderRadius: 28,
        border: "2px solid #1E293B",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 26,
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#10B981",
            color: "#0F172A",
            fontSize: 12,
            fontWeight: 900,
            padding: "4px 12px",
            borderRadius: 6,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 8,
          }}
        >
          TIMELINE PENYELENGGARAAN RIIL
        </div>
        <div style={{ fontSize: 26, fontWeight: 900, color: "#F8FAFC" }}>
          Berapa Lama Menabung dari Sisa Bersih?
        </div>
      </div>

      {/* Path 1: Jakarta Real Savings */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 800, color: "#38BDF8" }}>
            📍 JAKARTA (Sisa Tabungan ~Rp 1 - 1,5 Jt/bln)
          </span>
          <span style={{ fontSize: 18, fontWeight: 900, color: "#10B981" }}>
            ~11 - 16 Bulan (1 - 1,3 Thn)
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: 24,
            backgroundColor: "#020617",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            border: "1px solid #1E293B",
          }}
        >
          <div
            style={{
              width: `${progress1 * 40}%`,
              height: "100%",
              backgroundColor: "#0EA5E9",
              borderRadius: 12,
              boxShadow: "0 0 16px rgba(14, 165, 233, 0.5)",
            }}
          />
        </div>
      </div>

      {/* Path 2: Low UMP Region Real Savings */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 800, color: "#EF4444" }}>
            📍 DAERAH UMP RENDAH (Sisa Tabungan ~Rp 200 - 400 Rb/bln)
          </span>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#EF4444" }}>
            ~40 - 55 Bulan (HAMPIR 2 - 4 TAHUN!)
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: 24,
            backgroundColor: "#020617",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            border: "1px solid #1E293B",
          }}
        >
          <div
            style={{
              width: `${progress2 * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #F97316 0%, #EF4444 100%)",
              borderRadius: 12,
              boxShadow: "0 0 16px rgba(239, 68, 68, 0.5)",
            }}
          />
        </div>
      </div>

      {/* Giant Stamp Warning */}
      <div
        style={{
          transform: `scale(${Math.max(0, stampAnim)}) rotate(-2deg)`,
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          padding: "16px 28px",
          borderRadius: 16,
          fontWeight: 900,
          fontSize: 20,
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(239, 68, 68, 0.4)",
          letterSpacing: "-0.3px",
        }}
      >
        🚨 BUTUH HINGGA HAMPIR 2 TAHUN BEKERJA HANYA UNTUK 1 UNIT HP!
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: CLOSING & DISKUSI (RECAP & ENGAGEMENT CTA)
// =========================================================================
const Scene5ClosingSummary: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 100 },
  });

  const ctaPulse = spring({
    frame: frame - 25,
    fps,
    config: { damping: 10, mass: 0.7, stiffness: 120 },
  });

  const bounce = Math.sin(frame / 8) * 4;

  return (
    <div
      style={{
        transform: `scale(${cardEntrance})`,
        opacity: Math.max(0, Math.min(1, cardEntrance)),
        width: 880,
        backgroundColor: "#0F172A",
        borderRadius: 28,
        border: "2px solid #1E293B",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          backgroundColor: "#FBBF24",
          color: "#0F172A",
          fontSize: 12,
          fontWeight: 900,
          padding: "4px 14px",
          borderRadius: 6,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        DISKUSI TERBUKA • DAYA BELI
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: 900,
          color: "#F8FAFC",
          lineHeight: 1.25,
          maxWidth: 720,
        }}
      >
        Adilkah Patokan Harga Gadget Global dengan Standar Upah Daerah Kita?
      </div>

      {/* Comparison Recap Pills */}
      <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
        <div
          style={{
            backgroundColor: "#020617",
            border: "1px solid #0EA5E9",
            borderRadius: 16,
            padding: "12px 20px",
            textAlign: "left",
          }}
        >
          <div style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800 }}>JAKARTA</div>
          <div style={{ color: "#F8FAFC", fontSize: 18, fontWeight: 900 }}>65 Hari Teori</div>
          <div style={{ color: "#64748B", fontSize: 11 }}>~1 Tahun Riil</div>
        </div>

        <div
          style={{
            backgroundColor: "#020617",
            border: "1px solid #EF4444",
            borderRadius: 16,
            padding: "12px 20px",
            textAlign: "left",
          }}
        >
          <div style={{ color: "#EF4444", fontSize: 12, fontWeight: 800 }}>JAWA TENGAH / DAERAH</div>
          <div style={{ color: "#F8FAFC", fontSize: 18, fontWeight: 900 }}>162 Hari Teori</div>
          <div style={{ color: "#64748B", fontSize: 11 }}>~2 Tahun Riil</div>
        </div>
      </div>

      {/* Interactive Comment CTA */}
      <div
        style={{
          transform: `scale(${Math.max(0, ctaPulse)}) translateY(${bounce}px)`,
          marginTop: 6,
          backgroundColor: "#38BDF8",
          color: "#0F172A",
          padding: "16px 36px",
          borderRadius: 16,
          fontWeight: 900,
          fontSize: 20,
          boxShadow: "0 10px 24px rgba(56, 189, 248, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span>💬</span>
        <span>TULIS PENDAPATMU DI KOLOM KOMENTAR!</span>
      </div>

      <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
        Kanal @adi.salafudin • Data UMP 2024 & Standar Ritel Resmi
      </div>
    </div>
  );
};
