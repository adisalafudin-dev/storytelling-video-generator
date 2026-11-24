# Antigravity Agent Guidelines: 3D Storytelling Video Engine

This workspace builds viral vertical 3D explainer videos using **Remotion**, **React Three Fiber (Three.js)**, and data-driven storytelling (`src/data/storyboard.json`).

---

## SOP Wajib Pengadaan Aset 3D (Multi-Source Pipeline)

Setiap kali Anda diminta membuat atau memperbarui naskah / `src/data/storyboard.json`:

1. **Identifikasi Objek 3D Hero Berdetail Tinggi**:
   Pilih objek penting dalam cerita yang memerlukan visual realistis/low-poly detail (misal: kerangka paus purba, pohon palem tropis, burung air, batuan gurun, planet, kapal, karakter manusia).

2. **Jalankan Download Otomatis via Terminal**:
   ```bash
   bun run fetch-model "<kata-kunci-inggris>" "<nama-file>"
   ```
   Pipeline `scripts/fetch-model.ts` mengeksekusi strategi 2 lapis:
   - **Lapis 1 (Poly Pizza CLI)**: API pencarian model low-poly CC0/CC-BY.
   - **Lapis 2 (GitHub Open-Source Fallback)**: Mengunduh dari repositori raw GitHub (mrdoob/three.js, Khronos glTF Sample Assets, Quaternius).

3. **Validasi Biner Wajib**:
   - File `.glb` di `public/models/` harus memiliki ukuran minimal 1.024 byte (1 KB).
   - 4 byte pertama harus berupa magic header `glTF` (bukan halaman HTML 404/500).

4. **Integrasi Komponen (`useGLTF`)**:
   - Wajib dibungkus `<Suspense fallback={<ProceduralComponent />} />` agar render Remotion bebas crash.
   - Normalisasi skala objek terhadap framing 9:16 vertikal (fokus kamera di ~40% dari bawah).
   - Terapkan material matte cel-shaded (`roughness: 1`, `metalness: 0`) dan `<Outlines color="#1a1a1a" thickness={0.04} />`.
