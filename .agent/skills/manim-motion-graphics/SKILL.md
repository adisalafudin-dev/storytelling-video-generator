---
name: manim-motion-graphics
description: Motion design principles and Manim-style progressive animation patterns for vertical 3D explainer videos (1080x1920, 30fps) with Remotion and React Three Fiber.
version: 1.0.0
---

# Manim Motion Graphics & Motion Design Guide

Panduan ini mendokumentasikan prinsip gerak motion design modern (berdasarkan [motion-design-skill](https://github.com/lottiefiles/motion-design-skill)) dan pola animasi matematis/diagram analitis ala [Manim](https://github.com/adithya-s-k/manim_skill) untuk video vertikal 9:16 (1080x1920, 30fps) berbasis **Remotion** dan **React Three Fiber (R3F)**.

---

## 1. Prinsip Gerak (Motion Design Foundations)

### A. Larangan Gerakan Linear Kaku
- **Aturan Mutlak**: Hindari `interpolate()` linear mentah untuk pergerakan UI, kartu informasi, diagram, kamera, atau perubahan bentuk.
- **Entrance (Kemunculan Elemen)**:
  Gunakan `spring()` dengan parameter terkalibrasi atau `interpolate()` dengan kurva `ease-out` (misal: `Easing.out(Easing.cubic)` atau `easeOutExpo`):
  ```tsx
  // Rekomendasi Spring Entrance (Settle tanpa pusing / over-bounce)
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 110 },
  });
  ```
- **State Transition / Perpindahan Posisi**:
  Gunakan kurva `easeInOutCubic` agar perpindahan objek dari titik A ke titik B terasa alami dan berbobot:
  ```tsx
  const t = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  ```

### B. Antisipasi & Settle Halus (Anti-Jitter)
- **Anticipation**: Berikan tarikan mundur sangat tipis (1-2%) sebelum elemen melesat maju untuk memberi kesan daya dorong fisik.
- **Settle**: Elemen harus mendarat dengan redaman yang pas (`damping >= 14`). Dilarang keras memantul liar (bouncy) yang membuat teks atau angka berguncang dan sulit dibaca oleh penonton TikTok/Reels/Shorts.

### C. Staggering & Attention Guidance
- Jangan memunculkan semua elemen diagram secara serentak.
- Berikan jeda bertingkat (*stagger*) 2–4 frame antar-elemen (misal: Sumbu koordinat muncul di frame 0 → garis grid di frame 3 → kurva mulai menggambar di frame 6 → dot pelacak aktif di frame 10).

### D. Safe Zones Video Vertikal 9:16 (1080x1920)
| Zona Layar | Rentang Tinggi (Y) | Penggunaan Khusus |
| :--- | :--- | :--- |
| **Top Safe Zone** | 0% – 22% (Y: 0 – 422px) | Direservasi untuk `<InfoCard>`, badge niche, dan judul bab. |
| **Core Action Stage** | 22% – 74% (Y: 422 – 1420px) | **Panggung utama**: Objek 3D hero, diagram Manim, grafik kurva, dan formula matematis. |
| **Bottom Safe Zone** | 74% – 100% (Y: 1420 – 1920px) | Direservasi untuk `<ViralCaptions>` (posisi `bottom: 16%`) dan UI platform (like/comment/share). |
| **Margin Horizontal** | Kiri & Kanan 6% (65px) | Padding aman agar teks tidak terpotong bezel layar smartphone. |

---

## 2. Pola Visual Ala Manim (Mathematical & Analytical Storytelling)

Helper dan komponen telah disediakan di `src/utils/motion.ts` dan `src/components/2d/ManimVisuals.tsx`.

### A. Progressive Function Graphing (`<ManimFunctionGraph />`)
Visualisasi kurva fungsi matematika ($f(x)$) atau lonjakan data yang tergambar bertahap mengikuti narasi:
- **Teknik Animasi**: Menggunakan kalkulasi analitis titik kurva yang dipotong mengikuti `drawProgress` via `useCurrentFrame()`.
- **Tracer Dot**: Titik pelacak aktif di ujung kurva lengkap dengan aura denyut (*pulse ring*) dan badge koordinat melayang.
- **Contoh Pemakaian**:
  ```tsx
  import { ManimFunctionGraph } from "../components/2d/ManimVisuals";

  <ManimFunctionGraph
    title="KURVA TEKANAN KOMPRESI VS OKTAN"
    xDomain={[0, 10]}
    yDomain={[0, 100]}
    fn={(x) => Math.pow(x / 10, 2.2) * 100}
    strokeColor="#38bdf8"
    xLabel="Rasio Kompresi"
    yLabel="Tekanan Silinder (Bar)"
    drawDurationFrames={45}
    showTracerDot={true}
  />
  ```

### B. Progressive Morphing & Transitions (`<ManimMorphShape />`)
Perubahan bentuk geometris (State A $\to$ State B) secara mulus (setara dengan `ReplacementTransform` pada Manim):
- **Teknik Animasi**: Interpolasi titik-titik poligon secara parametrik menggunakan kurva `easeInOutCubic`:
  $$P(t) = (1 - t) \cdot P_A + t \cdot P_B$$
- **Contoh Pemakaian**:
  ```tsx
  import { ManimMorphShape } from "../components/2d/ManimVisuals";

  <ManimMorphShape
    pointsA={[[250, 80], [380, 220], [120, 220]]} // Segitiga
    pointsB={[[150, 80], [350, 80], [350, 240], [150, 240]]} // Persegi
    colorA="#38bdf8"
    colorB="#f59e0b"
    labelA="Sistem Barter"
    labelB="Sistem Mata Uang"
    morphDurationFrames={35}
  />
  ```

### C. Vektor & Arah Panah Bertumbuh (`<ManimVectorArrow />`)
Visualisasi gaya, arah pergerakan, atau transfer energi dengan kepala panah otomatis menghitung sudut $\theta = \operatorname{atan2}(\Delta y, \Delta x)$:
- **Contoh Pemakaian**:
  ```tsx
  import { ManimVectorArrow } from "../components/2d/ManimVisuals";

  <ManimVectorArrow
    startX={200}
    startY={600}
    endX={480}
    endY={350}
    color="#fbbf24"
    label="Vektor Dorong Piston (F)"
    durationFrames={30}
  />
  ```

### D. Formula Matematis dengan Sorotan Bertahap (`<ManimFormula />`)
Menampilkan persamaan matematis analitis dengan fokus bertahap (setara `Indicate` / `TransformMatchingShapes` di Manim):
- **Attention Management**: Suku yang sedang dibahas disorot dengan pill terang dan membesar halus (`scale(1.08)`), sementara suku lain meredup ke `opacity: 0.35`.
- **Contoh Pemakaian**:
  ```tsx
  import { ManimFormula } from "../components/2d/ManimVisuals";

  <ManimFormula
    title="PERSAMAAN GAS IDEAL DALAM SILINDER"
    terms={[
      { symbol: "P", label: "Tekanan", color: "#ef4444" },
      { symbol: "×", color: "#94a3b8" },
      { symbol: "V", label: "Volume Ruang", color: "#38bdf8" },
      { symbol: "=", color: "#94a3b8" },
      { symbol: "n R", color: "#94a3b8" },
      { symbol: "×", color: "#94a3b8" },
      { symbol: "T", label: "Suhu Ekstrem", color: "#f59e0b" },
    ]}
    focusIndex={0} // 0 = Sorot P (Tekanan), 2 = Sorot V (Volume), 6 = Sorot T (Suhu)
    explanation="Saat volume silinder menyusut drastis, tekanan (P) melesat memicu panas ekstrem."
  />
  ```

### E. Spotlight & Focus Ring (`<ManimFocusRing />`)
Memberikan lingkaran bergaris putus-putus beranimasi denyut (*circumscribe*) untuk mengarahkan pandangan penonton ke koordinat tertentu pada layar:
- **Contoh Pemakaian**:
  ```tsx
  import { ManimFocusRing } from "../components/2d/ManimVisuals";

  <ManimFocusRing
    xPercent={50}
    yPercent={42}
    radius={70}
    color="#38bdf8"
    label="AREA DETONASI PREMATUR"
  />
  ```

---

## 3. Aturan Keamanan & Isolasi Cerita (Multi-Story Architecture)

1. **Anti-Overwrite**:
   - Dilarang menimpa file cerita yang sudah ada di `src/data/stories/` (`sahara.json`, `sahara-remake.json`, `monalisa.json`, `pertalite-vs-pertamax.json`, dsb.).
   - Setiap cerita baru **wajib** menggunakan slug baru, misalnya:
     - Data cerita: `src/data/stories/<slug-baru>.json`
     - Aset audio: `public/audio/<slug-baru>/`
2. **Import Dinamis**:
   - `src/Root.tsx` secara otomatis memuat semua file JSON di folder `src/data/stories/` menggunakan Webpack `require.context`. Cukup tambahkan file JSON baru dengan slug unik, dan komposisi akan langsung tersedia di Remotion Studio.
3. **Penyusunan Adegan**:
   - Gunakan `Safe Zone Stage` di tengah (22% – 74%) untuk meletakkan visual Manim agar tidak menabrak kartu atas atau teks narasi bawah.
