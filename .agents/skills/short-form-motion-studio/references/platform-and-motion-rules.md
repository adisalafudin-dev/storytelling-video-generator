# Cross-Platform & Deterministic Motion Rules

Dokumen ini adalah referensi teknis mendalam untuk pembuatan video vertikal **9:16 (1080x1920, 30fps)** lintas platform (**YouTube Shorts, TikTok, Instagram Reels, dan Facebook Reels**) menggunakan **Remotion** dan **React Three Fiber**.

---

## 1. Peta Safe Zone Universal Lintas Platform

Setiap platform memiliki tata letak antarmuka (UI overlay) yang berbeda di layar ponsel penonton. Konten video wajib menaati **Universal Safe Zone** agar elemen kunci tidak terpotong atau tertutup tombol aplikasi.

```
+------------------------------------------+ (Y = 0px, Top)
| [X] Top UI Header Margin (0% - 8%)       | <- Profil, tombol kembali, search bar
+------------------------------------------+ (Y ~ 150px)
| TOP SAFE ZONE (8% - 22%)                 |
| [!] <InfoCard />, Badge Niche, Hook Text | <- Tempat kartu info utama
+------------------------------------------+ (Y ~ 422px)
|                                          |
| CORE ACTION STAGE ZONE (22% - 74%)       |
|                                          |
| - Objek 3D Hero (R3F)                    | <- Area pandang utama
| - Diagram & Grafik Manim                 |    Aman dari semua UI platform
| - Formula Matematis & Morfisme           |
|                                          |
|                      [X] Right UI Bar    | <- Like, Comment, Share, Audio
|                          Buffer: 160px   |    (Jangan letakkan teks di tepi kanan)
+------------------------------------------+ (Y ~ 1420px)
| BOTTOM SAFE ZONE (74% - 88%)             |
| [*] <ViralCaptions /> (bottom: 16%)      | <- Karaoke subtitle dinamis
+------------------------------------------+ (Y ~ 1680px)
| [X] Bottom UI Margin (88% - 100%)        | <- Nama akun, deskripsi, audio ticker
+------------------------------------------+ (Y = 1920px, Bottom)
```

### Rincian Batas Platform:
1. **YouTube Shorts**:
   - Atas: Tombol Search & Kamera (~120px).
   - Kanan: Tombol Like, Dislike, Comments, Share, Remix (~160px dari tepi kanan).
   - Bawah: Judul Shorts, Tombol Subscribe, Audio Track (~240px dari bawah).
2. **TikTok**:
   - Atas: Tab Following/For You, Live, Search (~150px).
   - Kanan: Avatar Creator, Love, Comment, Save/Bookmark, Share, Piringan Vinyl (~160px dari tepi kanan).
   - Bawah: Username `@handle`, Caption 2 baris, Music Ticker (~280px dari bawah).
3. **Instagram Reels**:
   - Atas: Reels Header, Audio Icon, Camera (~120px).
   - Kanan: Like, Comment, Share/DM, 3-Dots (~150px dari tepi kanan).
   - Bawah: Creator Tag, Deskripsi pendek, Audio Name (~260px dari bawah).
4. **Facebook Reels**:
   - Serupa dengan Instagram Reels dengan tambahan banner interaksi di bagian bawah (~250px).

### Aturan Universal Proyek:
- `<InfoCard />`: Letakkan pada `top: 8%` hingga `top: 10%`, maksimal tinggi `18%`.
- `<ViralCaptions />`: Letakkan pada `bottom: 16%` (sekitar Y = 1550px – 1650px).
- Panggung 3D / Manim: Pusatkan pada rentang $Y \in [450\text{px}, 1400\text{px}]$.
- Margin Horizontal: Berikan padding minimal 65px (6%) di kiri dan 160px di kanan jika ada teks penjelas.

---

## 2. Sains Retensi & Visual Hook (0–2 Detik Pertama)

Rata-rata pengguna swipe video dalam 1.2 hingga 1.8 detik jika tidak ada stimulasi visual atau rasa ingin tahu yang kuat.

### Formula Hook 3 Lapis:
1. **Verbal Hook (Voiceover)**:
   - Mulai di frame 0 tanpa jeda hening.
   - Gunakan pernyataan kontraintuitif atau paradoks.
   - *Contoh Bagus*: "Banyak yang mengira beda Pertalite dan Pertamax cuma di warna atau harga. Padahal di dalam mesinmu, ada pertarungan fisika yang menentukan umur kendaraanmu!"
   - *Contoh Buruk*: "Halo guys, selamat datang di channel saya, kali ini kita akan membahas..." (dijamin penonton swipe).
2. **Visual Disruption (3D Hero Motion)**:
   - Tampilkan objek 3D utama langsung bergerak aktif di frame 0 (misal: piston bergerak naik-turun kencang dengan percikan kompresi, atau kapal Titanic mulai terbelah).
   - Hindari kamera diam statis di detik pertama; gunakan pergerakan kamera halus (*subtle dolly-in*).
3. **Curiosity Gap (HeroCard / InfoCard)**:
   - Tampilkan badge topik kontras tinggi di bagian atas (`RON 90 vs RON 92` atau `TARIF 25%`) untuk memberikan kejelasan topik secara instan kepada penonton yang menonton tanpa suara.

---

## 3. Gerak Deterministik Berbasis Frame (Remotion Frame-Based Motion)

Dalam Remotion, render video dilakukan frame demi frame oleh browser headless (Puppeteer). Animasi waktu nyata berbasis CSS atau JavaScript timer **pasti menghasilkan frame drop atau desinkronisasi**.

### Aturan Baku:
1. **Wajib Memakai `useCurrentFrame()`**:
   Seluruh nilai posisi, skala, rotasi, opasitas, dan warna wajib berupa fungsi deterministik dari `frame`:
   $$Value = f(\text{frame})$$
2. **Gunakan `spring()` untuk Kemunculan (Entrance)**:
   Hindari gerakan linear mentah. Gunakan konfigurasi redaman terstandarisasi:
   ```tsx
   import { spring, useCurrentFrame, useVideoConfig } from "remotion";

   const frame = useCurrentFrame();
   const { fps } = useVideoConfig();

   // Settle sempurna: masuk tegas tanpa memantul liar
   const entrance = spring({
     frame,
     fps,
     config: { damping: 15, mass: 0.7, stiffness: 110 },
   });
   ```
3. **Gunakan `interpolate()` dengan Clamping**:
   Selalu berikan opsi `extrapolateLeft: "clamp"` dan `extrapolateRight: "clamp"` agar nilai tidak bocor di luar rentang:
   ```tsx
   import { interpolate, Easing } from "remotion";

   const t = interpolate(frame, [0, 30], [0, 1], {
     extrapolateLeft: "clamp",
     extrapolateRight: "clamp",
     easing: Easing.inOut(Easing.cubic),
   });
   ```
4. **Dilarang Keras**:
   - `transition: all 0.3s ease` pada file CSS/inline style (Puppeteer tidak menunggu transisi CSS selesai per frame).
   - `animation: spin 2s infinite linear` via CSS keyframes.
   - `setTimeout`, `setInterval`, `requestAnimationFrame`, atau `Date.now()`.
5. **Stabilitas Layout (Anti-Reflow & Anti-Jitter)**:
   - Elemen angka atau caption yang berubah dinamis wajib memiliki `minWidth` atau `fontVariantNumeric: "tabular-nums"` agar lebar teks tidak goyang (*jitter*) saat angka bertambah.
   - Subtitle wajib menggunakan pembagian chunk yang bersih agar kata tidak tertinggal antar-frame.

---

## 4. Diagram & Transformasi Ala Manim

Untuk materi analitis (otomotif, ekonomi, sains, fisika, sejarah), terapkan 3 pilar Manim:

1. **Staged Reveal (Muncul Bertahap)**:
   - Frame 0–10: Garis sumbu dan grid koordinat terbentuk.
   - Frame 10–40: Kurva fungsi digambar bertahap (*progressive stroke draw*).
   - Frame 25–50: Titik pelacak (*tracer dot*) dan label koordinat aktif mengikuti ujung kurva.
2. **Selective Focus & Dimming (Manim Attention Guidance)**:
   - Saat membahas satu variabel atau suku formula (misal Tekanan $P$ dalam rumus $P \times V = nRT$), perbesar suku tersebut (`scale(1.08)`) dan beri sorotan pill terang.
   - Redupkan suku lainnya ke `opacity: 0.35` agar atensi penonton langsung tertuju pada variabel yang sedang dijelaskan voiceover.
3. **Smooth Morphing (Transformasi Bentuk)**:
   - Ubah bentuk State A ke State B dengan interpolasi titik-titik poligon atau kurva Bezier secara mulus menggunakan parameter $t \in [0, 1]$ ber-kurva `easeInOutCubic`.

---

## 5. Tata Cahaya & Kamera 3D untuk Layar Smartphone

Layar smartphone berukuran kecil dan sering dilihat di luar ruangan dengan kecerahan tinggi. Aset 3D memerlukan pencahayaan studio yang tegas:

1. **Four-Point Studio Lighting Rig**:
   - **Key Light**: Dari atas-depan-kanan (intensitas 3.0, putih bersih).
   - **Fill Light**: Dari kiri-depan (intensitas 2.2, biru/abu-abu netral) untuk melunakkan bayangan gelap.
   - **Bottom Uplight**: Dari bawah-tengah (intensitas 3.0) agar connecting rod, kruk as, atau kolong objek terlihat jelas.
   - **Rim/Back Light**: Dari belakang (intensitas 2.0, aksen cyan/biru) untuk memisahkan siluet objek 3D dari latar belakang gelap.
2. **Batas Aman Kamera (Anti-Clipping)**:
   - Jarak kamera $Z$ yang ideal pada rasio 9:16 adalah $Z \in [4.20, 4.80]$.
   - Bidikan vertikal kamera (`camY` dan `lookAtY`) harus dijaga pada $Y \in [0.05, 0.25]$ agar puncak objek tidak terpotong atau tertutup `<InfoCard />`.

---

## 6. Standar World-Building Berlapis & Koreografi Kamera (2D & 3D)

Karakter dan objek hero tidak boleh ditempatkan di dalam kotak diagram kaku atau ruang kosong. Setiap adegan harus membentuk dunia visual yang kohesif:

1. **Struktur 4 Lapisan Lingkungan (Layered Environment)**:
   - **Foreground (Latar Depan)**: Elemen pembingkai alami (misal: rumpun padi melengkung di desa, sudut meja kantor/laptop di kota, tepian konter etalase toko) untuk menghadirkan rasa kedalaman (*depth of field*).
   - **Midground (Panggung Hero)**: Karakter 2D proporsional (~320–420px) dengan pakaian & properti khas kontekstual, berdiri di atas bayangan jatuh realistis (*ground shadow*).
   - **Background (Latar Belakang)**: Pemandangan alam/kota berlapis (langit fajar dengan bias matahari lembut, siluet pegunungan/gedung bertingkat).
   - **Atmosphere & Lighting**: Gradasi pencahayaan sinematik (warna hangat untuk desa, biru dingin untuk kota metropolitan) ditambah partikel atmosfer halus (*soft sun rays / light dust*).
2. **Koreografi Kamera Sinematik (Frame Math)**:
   - **Slow Dolly-In**: Skala panggung bergerak maju perlahan dari `1.0` ke `1.05` (`interpolate(frame, [0, dur], [1.0, 1.05], { extrapolateRight: "clamp" })`) agar adegan terasa hidup dan menarik perhatian penonton.
   - **Gentle Pan Transisi**: Transisi antar-tokoh menggunakan geser horizontal berkurva ease-out (`spring({ damping: 14, stiffness: 90 })`), menciptakan kesan penjelajahan dunia dari desa ke kota.
3. **Secondary Motion Karakter & Lingkungan**:
   - Napas ritmis (`translateY(Math.sin(frame / 12) * 4px)`).
   - Anggukan kepala & tilt emosi (`rotate(Math.sin(frame / 9) * 2.5deg)`).
   - Kedipan mata acak alami (`frame % 80 < 5`).
   - Gestur dinamis: garuk kepala bingung, tersenyum santai, atau menunjuk ke audiens.
4. **Keselarasan Audio & SFX**:
   - Pacing narasi ~160–175 wpm.
   - Ambient BGM berirama tenang bervolume rendah (`0.10–0.12`).
   - Transisi kamera disertai SFX *whoosh* lembut, dan kemunculan poin penting diiringi SFX *pop* renyah.
