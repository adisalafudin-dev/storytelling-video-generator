---
name: short-form-motion-studio
description: End-to-end framework for creating viral, high-retention vertical 3D & 2D explainer videos (1080x1920, 30fps) for YouTube Shorts, TikTok, Instagram Reels, and Facebook Reels with Remotion and React Three Fiber.
version: 1.0.0
---

# Short-Form Motion & Storytelling Studio

Framework ini adalah panduan terpadu untuk merancang, memproduksi, dan merender video vertikal pendek **9:16 (1080x1920, 30fps)** berkualitas tinggi yang dioptimalkan untuk algoritma retensi **YouTube Shorts, TikTok, Instagram Reels, dan Facebook Reels** menggunakan **Remotion** dan **React Three Fiber (Three.js)**.

---

## 1. Quick Navigation & Referensi Pendukung

Agar instruksi tetap tajam dan mudah dieksekusi, detail teknis mendalam dipecah ke dalam referensi terpisah:

- [Aturan Platform, Safe Zones, & Motion Deterministik](./references/platform-and-motion-rules.md)
  *Peta layout safe zone lintas platform, sains visual hook 0–2 detik, aturan gerak berbasis frame Remotion, dan pola tata cahaya studio 3D.*
- [Pola Bug & Checklist Kualitas Sebelum Render](./references/lessons-learned.md)
  *Catatan kasus bug nyata (orientasi silinder Three.js, proporsi stang seher, tabrakan kamera vs kartu atas) dan 10 poin checklist sebelum render final.*
- [Pustaka Motion & Manim Visuals](../../src/components/2d/ManimVisuals.tsx)
  *Komponen siap pakai: kurva fungsi f(x) bertracer, morphing bentuk, vektor bertumbuh, formula berfokus bertahap, dan focus ring.*

---

## 2. Empat Pilar Utama Produksi

### A. Hook & Retensi Lintas Platform (0–2 Detik Pertama)
1. **Verbal Hook di Frame 0**: Narasi langsung masuk ke inti konflik atau fakta mengejutkan tanpa salam pembuka klise.
2. **Visual Disruption**: Objek 3D atau diagram analitis langsung bergerak aktif di detik pertama; hindari kamera diam statis.
3. **Safe Zone Universal (9:16)**:
   - **Top (0% – 22%)**: Tempatkan `<InfoCard />` dan badge niche.
   - **Center Stage (22% – 74%)**: Panggung utama untuk objek 3D hero, diagram Manim, dan visual perbandingan.
   - **Bottom (74% – 100%)**: Direservasi untuk `<ViralCaptions />` (`bottom: 16%`) dan bebas dari tombol platform.
   - **Right Buffer (160px)**: Hindari meletakkan teks penting di tepi kanan agar tidak tertutup tombol like/share/komentar aplikasi.

### B. Gerak Deterministik Berbasis Frame (Remotion Motion)
1. **Wajib `useCurrentFrame()`**: Semua pergerakan harus merupakan fungsi murni dari frame saat ini.
2. **Hindari Gerakan Linear**:
   - Gunakan `spring()` dari `src/utils/motion.ts` untuk entrance UI dengan redaman mantap (`damping: 14–16`, `mass: 0.7`) agar mendarat rapi tanpa guncangan liar (*no nauseating bounce*).
   - Gunakan `interpolate()` dengan kurva `easeInOutCubic` untuk perpindahan posisi atau transisi state.
   - Selalu sertakan `extrapolateLeft: "clamp"` dan `extrapolateRight: "clamp"`.
3. **Dilarang Keras**: Menggunakan CSS transition/animation, `setTimeout`, `setInterval`, atau `Date.now()`.

### C. Diagram & Transformasi Ala Manim
1. **Staged Reveal**: Elemen diagram muncul bertahap (sumbu $\to$ garis grid $\to$ gambar kurva $\to$ titik pelacak).
2. **Selective Focus & Dimming**: Saat voiceover membahas satu variabel atau suku rumus, sorot bagian tersebut (`scale(1.08)` + pill warna terang) dan redupkan bagian pasif ke `opacity: 0.35`.
3. **Smooth Morphing**: Ubah bentuk State A ke State B secara parametrik dengan interpolasi titik poligon halus.

### D. 3D/R3F & Isolasi Cerita (Multi-Story Architecture)
1. **Pencahayaan Kontras Tinggi**: Selalu gunakan kombinasi Key Light (atas-depan), Fill Light (kiri), Bottom Uplight (bawah-tengah), dan Rim Light (belakang) agar objek 3D tidak tenggelam di layar ponsel.
2. **Batas Aman Kamera**: Jaga jarak kamera $Z \in [4.25, 4.65]$ dan bidikan vertikal $Y \in [0.05, 0.25]$ untuk mencegah clipping dan tabrakan dengan UI.
3. **Isolasi Mutlak File Cerita**:
   - Dilarang menimpa file cerita lama di `src/data/stories/`.
   - Cerita baru wajib disimpan di `src/data/stories/<slug-baru>.json`.
   - Audio narasi wajib disimpan di `public/audio/<slug-baru>/`.

### E. World-Building Berlapis & Koreografi Kamera Sinematik (2D & 3D)
1. **World & Background Berlapis (Zero Empty Boxes)**:
   - Setiap adegan karakter atau objek hero wajib memiliki ekosistem dunia (*environment*) yang menyatu:
     - **Foreground**: Elemen pembingkai depan (siluet dedaunan/tanaman, pagar, atau tepian meja) yang memberi kedalaman ruang (*depth of field*).
     - **Midground**: Karakter proporsional berukuran besar (~320–420px) dengan properti kontekstual (caping/alat tani untuk pedesaan, laptop/jas untuk perkotaan).
     - **Background & Atmosphere**: Gradasi langit fajar/senja, siluet lanskap/gedung, partikel debu cahaya melayang (*atmospheric glow*).
   - Dilarang keras menampilkan karakter kecil di dalam kartu diagram statis atau di atas ruang kosong.
2. **Koreografi Kamera Sinematik**:
   - **Slow Dolly-In**: Skala kamera maju perlahan (1.0 $\to$ 1.05) menggunakan `interpolate()` ter-clamp untuk mempertahankan tensi visual.
   - **Gentle Pan ($X$-axis)**: Transisi antar-lingkungan menggunakan pergeseran halus berkurva ease-out (`spring({ damping: 14, stiffness: 90 })`).
   - **Secondary Motion Alami**: Tubuh karakter memiliki napas halus (`translateY`), anggukan kepala ringan (`rotate`), kedipan mata alami, dan perubahan emosi wajah (`happy`, `confused`, `shocked`, `talking`).
3. **Naskah & Emosi Cerita (Conversational Storytelling)**:
   - Buka dengan tokoh / situasi nyata yang dekat dengan penonton.
   - Gunakan jembatan obrolan alami (*"Kenapa gitu? Yuk sini kita jelasin!"*) sebelum membedah data/konsep.
   - Jaga teks layar tetap ringkas, bersih, dan bebas teks mikro berulang agar dunia visual tetap menjadi pusat perhatian.
4. **Audio, SFX, & Ritme**:
   - Voiceover pada ritme ~160–175 wpm.
   - BGM latar bervolume rendah (~0.10–0.12) agar vokal tetap renyah.
   - SFX transisi (*whoosh* saat kamera pan, *pop* saat chip pengeluaran muncul).

---

## 3. Alur Kerja Standar Membuat Video Baru (Step-by-Step)

Ketika diminta membuat video baru:

1. **Tentukan Slug Unik**:
   Misal: `bagaimana-transmisi-bekerja` atau `kenapa-mata-uang-runtuh`.
2. **Siapkan Naskah & Storyboard**:
   Tulis narasi dengan hook tajam 2 detik pertama dan rancang 4–6 adegan berdurasi total 40–55 detik.
3. **Generate Audio & Subtitle**:
   Hasilkan file audio per adegan ke `public/audio/<slug>/` dan catat timestamp kata per kata (*word-level timing*) untuk `<ViralCaptions />`.
4. **Susun File Cerita**:
   Simpan spesifikasi adegan, kamera, kartu info, dan caption ke `src/data/stories/<slug>.json`.
5. **Implementasikan Visual 3D / Diagram Manim**:
   - Jika membutuhkan model 3D realistis: jalankan `bun run fetch-model "<keyword>" "<filename>"`.
   - Jika membutuhkan visual analitis: gunakan komponen dari `src/components/2d/ManimVisuals.tsx`.
6. **Verifikasi Kualitas**:
   - Cek 10 poin di [Checklist Kualitas](./references/lessons-learned.md).
   - Jalankan `npx tsc --noEmit` untuk memastikan bebas error tipe.
   - Jalankan `npx remotion bundle src/index.ts`.
7. **Eksekusi Render**:
   ```bash
   npx remotion render build <SlugComposition> out/<slug>.mp4 --gl=angle
   ```
   *(Gunakan mode BypassSandbox: true pada Windows).*
