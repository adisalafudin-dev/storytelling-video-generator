---
name: viral-3d-explainer
description: "Standard instruction for 3D vertical explainer videos with Remotion and React Three Fiber. Specifies auto-fetching high-detail 3D models from Poly Pizza & GitHub Open-Source, cinematic framing, and stylized matte rendering."
version: 1.1.0
---

## Mandatory Rule: Anti‑Overwrite Story Files

- **PROHIBITION**: Do not overwrite any existing story JSON file under `src/data/stories/`. When a new story is requested, a new file `<slug>.json` must be created in that folder.
- **AUDIO OUTPUT**: Audio for each story must be generated into `public/audio/<slug>/` and never into a shared location.
- **ENFORCEMENT**: All scripts (`generate‑storyboard‑audio.ts`, any new story‑creation utilities, and the build pipeline) must respect this rule. If a conflict is detected, the process should abort with an error indicating that the story already exists.

---

# SOP Wajib: Viral 3D Explainer & Asset Pipeline

Instruksi ini adalah **SOP permanen** yang wajib dijalankan setiap kali merancang adegan, membuat naskah, atau memperbarui `src/data/storyboard.json` untuk video Remotion 3D.

---

## 1. Aturan Wajib Pengadaan Aset 3D (Multi-Source Pipeline)

Setiap kali membuat atau memperbarui `src/data/storyboard.json`:

1. **Identifikasi Objek 3D Utama:**
   Pilih objek hero dalam cerita yang membutuhkan detail tinggi (misalnya: kerangka paus purba, pohon tropis/palem, burung air, bebatuan gurun, planet, kapal, karakter).

2. **Eksekusi Pengunduhan Otomatis via Terminal:**
   Jalankan perintah berikut:
   ```bash
   bun run fetch-model "<kata-kunci-inggris>" "<nama-file>"
   ```

3. **Strategi 2 Lapis (Multi-Source):**
   - **Prioritas Utama (Poly Pizza CLI):** Mengambil model low-poly berlisensi CC0/CC-BY dari Poly Pizza API.
   - **Fallback Otomatis (GitHub Open-Source Raw Assets):** Jika Poly Pizza limit/500/tidak ditemukan, pipeline otomatis mengunduh file `.glb` dari repositori open-source GitHub resmi (mrdoob/three.js, Khronos glTF Sample Assets, Quaternius).

4. **Validasi Biner Ketat:**
   - Ukuran file wajib > 1 KB (`>= 1024 bytes`).
   - 4 byte pertama file biner wajib persis string `glTF` (magic header glTF binary).
   - Jika terdeteksi halaman HTML 404/500 atau korup, file otomatis dihapus dan fallback diaktifkan.

---

## 2. Standar Integrasi Komponen (`useGLTF`)

1. **Aman dari Crash (Zero‑Crash Guarantee):**
   Bungkus setiap loader dengan `<Suspense fallback={<ProceduralComponent />} />` sehingga render Remotion tidak pernah terhenti meskipun aset eksternal belum dimuat.

2. **Normalisasi & Auto‑Scaling:**
   Sesuaikan skala model dengan ruang adegan dan framing 9:16 vertikal (titik fokus ~40% dari bawah kanvas).

3. **Konsistensi Estetika (Cel‑Shaded & Matte):**
   Pertahankan material matte (`roughness: 1`, `metalness: 0`) dan beri `<Outlines color="#1a1a1a" thickness={0.04} />` untuk menjaga keselarasan art direction kartun 3D.

---

## 3. Standar Motion Design & Diagram Manim

1. **Prinsip Gerak (Anti-Linear)**:
   - Gunakan `manimSpring()` dari `src/utils/motion.ts` untuk entrance UI dan elemen diagram.
   - Settle halus tanpa pusing/memantul berlebihan (`damping: 14-16, mass: 0.7, stiffness: 110`).
   - Gunakan `easeInOutCubic` untuk perpindahan posisi/transformasi state.
2. **Visualisasi Analitis Ala Manim**:
   - Gunakan komponen dari `src/components/2d/ManimVisuals.tsx`:
     - `<ManimFunctionGraph />`: Plot kurva analitis f(x) dengan progressive drawing dan tracer dot.
     - `<ManimMorphShape />`: Transformasi bentuk geometris halus State A -> State B.
     - `<ManimVectorArrow />`: Panah vektor dinamis berarah dan bertumbuh.
     - `<ManimFormula />`: Persamaan analitis dengan sorotan fokus bertahap (aktif glowing, yang lain redup).
     - `<ManimFocusRing />`: Spotlight berdenyut untuk menarik fokus penonton ke titik penting.
3. **Safe Zones (9:16 Vertikal)**:
   - Top (0-22%): `<InfoCard>` / judul bab.
   - Middle (22-74%): Panggung objek 3D hero & diagram Manim.
   - Bottom (74-100%): `<ViralCaptions>` (bottom: 16%) dan UI interaksi.

