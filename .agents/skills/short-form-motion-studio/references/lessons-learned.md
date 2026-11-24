# Lessons Learned & Pre-Render Quality Checklist

Dokumen ini mencatat pola bug visual, kesalahan tata letak, dan jebakan teknis yang pernah terjadi selama iterasi produksi video vertikal 3D di workspace ini, beserta solusi pencegahannya.

---

## 1. Studi Kasus & Pola Bug yang Pernah Ditemukan

### Kasus 1: Orientasi Sudut Three.js CylinderGeometry (Front Cutaway Tertutup Dinding)
- **Gejala Bug**: Batang piston (connecting rod) dan pen piston mendadak hilang atau terputus di tengah, tertutup oleh dinding abu-abu/putih datar.
- **Penyebab**:
  Dalam Three.js `cylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)`:
  - $\theta = 0$ berada di sumbu **$+Z$ (menghadap langsung ke arah kamera)**, bukan $+X$.
  - $\theta = \pi/2$ (90°) berada di $+X$ (sisi kanan).
  - $\theta = \pi$ (180°) berada di $-Z$ (sisi belakang).
  - $\theta = 3\pi/2$ (270°) berada di $-X$ (sisi kiri).
  Kode sebelumnya menulis `thetaStart = -0.40 * Math.PI` dengan panjang `0.80 * Math.PI`. Sudut ini berpusat persis di $\theta = 0$ ($+Z$), sehingga menciptakan plat solid tepat di depan kamera yang menutupi stang seher di belakangnya!
- **Solusi**:
  Dinding samping (rok piston) wajib ditempatkan di sisi Kiri ($\theta = 1.25\pi - 1.75\pi$) dan sisi Kanan ($\theta = 0.25\pi - 0.75\pi$). Sisi depan ($\theta = -0.25\pi - +0.25\pi$) **wajib dibiarkan terbuka (open arch)**.

---

### Kasus 2: Disparitas Proporsi Batang Seher (The Invisible Needle Rod)
- **Gejala Bug**: Saat video dilihat di layar ponsel, batang piston tampak seperti kawat tipis atau jarum putus yang tidak terlihat menghubungkan piston ke kruk as.
- **Penyebab**:
  Piston memiliki diameter 1.44 unit, sementara connecting rod sebelumnya dibuat dengan lebar `0.088` dan tebal `0.036` (16 kali lebih kecil!). Pada jarak kamera $Z = 4.5$, objek selebar 0.088 hanya setebal 4–6 piksel sehingga tenggelam oleh bayangan dinding silinder.
- **Solusi**:
  Gunakan proporsi teknik nyata:
  - Batang piston wajib memiliki lebar 0.24 – 0.34 unit (sekitar 20–25% diameter silinder).
  - Terapkan struktur **I-Beam** nyata: Badan tengah (*recessed web*) abu-abu satin flanked oleh dua flensa krom samping yang tebal (`#ffffff`) dengan highlight specular terang.
  - Mata bawah (*big end*) harus memiliki rongga (*bore*) yang melingkari crankpin secara konsentris dengan sepasang baut klem emas (`#fbbf24`).

---

### Kasus 3: Sudut Pandang Kamera Terlalu Tinggi (Tabrakan dengan `<InfoCard />`)
- **Gejala Bug**: Ruang bakar, busi, dan kepala silinder terpotong atau tertutup sebagian oleh kartu putih `<InfoCard />` di bagian atas.
- **Penyebab**:
  Nilai `camY` dan `lookAtY` disetel pada $Y = 0.65 - 0.75$. Pada rasio 9:16, titik $Y = 0.70$ terproyeksi ke layar di atas 80% tinggi layar, tepat di bawah posisi kartu `<InfoCard />`.
- **Solusi**:
  Jaga bidikan kamera vertikal:
  - `lookAt` Y optimal berada di rentang $[0.02, 0.22]$.
  - `camY` optimal berada di rentang $[0.08, 0.28]$.
  - Jarak kamera $Z$ berada di rentang $[4.25, 4.65]$.
  Dengan koordinat ini, ruang bakar berada di zona emas $Y \approx +0.30 - +0.40$ (bebas dari kartu atas) dan kruk as berada di $Y \approx -0.40$ (bebas dari caption bawah).

---

### Kasus 4: Format Angka pada Subtitle / Captions
- **Gejala Bug**: Caption menampilkan teks panjang seperti "sembilan puluh dua" yang memakan 3 baris layar dan menumpuk di atas objek 3D.
- **Penyebab**:
  Transkripsi Whisper mentah sering mengeja angka panjang dalam bahasa Indonesia.
- **Solusi**:
  Format angka analitis/teknis sebagai angka numerik (`90`, `92`, `25%`, `Rp 15.000`) di dalam file JSON storyboard sambil mempertahankan sinkronisasi `startMs` dan `endMs` voiceover.

---

### Kasus 5: Error Render Remotion EACCES di Windows
- **Gejala Bug**: Perintah `remotion render` gagal seketika dengan error `EACCES: permission denied` atau timeout koneksi Puppeteer.
- **Penyebab**:
  Di sistem operasi Windows, proses headless Chrome Puppeteer membutuhkan pembukaan port TCP loopback lokal untuk DevTools protocol.
- **Solusi**:
  Jalankan perintah render Remotion dengan mode `BypassSandbox: true`:
  ```bash
  npx remotion render build <CompositionId> out/<output>.mp4 --gl=angle
  ```

---

### Kasus 6: Keamanan Multi-Story (Anti-Overwrite)
- **Gejala Bug**: Cerita lama (misal `sahara.json` atau `monalisa.json`) tertimpa data cerita baru, merusak video yang sudah jadi.
- **Solusi**:
  Sistem `src/Root.tsx` menggunakan Webpack `require.context` untuk memuat semua file JSON di `src/data/stories/`. Setiap cerita baru **wajib** dibuat pada file baru `src/data/stories/<slug-baru>.json` dan folder audio `public/audio/<slug-baru>/`.

---

## 2. Checklist Kualitas Sebelum Render (Pre-Render Checklist)

Sebelum menjalankan render video final, verifikasi 10 poin berikut:

- [ ] **1. Safe Zone Atas**: Apakah elemen tertinggi 3D/2D berada di bawah batas $Y \le 22\%$ (tidak tertutup `<InfoCard />`)?
- [ ] **2. Safe Zone Bawah**: Apakah bagian bawah mekanisme 3D berada di atas posisi caption ($Y \ge 74\%$ / `bottom: 16%`)?
- [ ] **3. Buffer Kanan**: Apakah ada teks atau label penting yang menempel di 160px tepi kanan (zona tombol like/share platform)?
- [ ] **4. Hook 2 Detik**: Apakah ada visual bergerak aktif dan narasi tanpa jeda hening di detik ke 00:00–00:02?
- [ ] **5. Deterministik Frame**: Apakah seluruh animasi memakai `frame`, `spring()`, atau `interpolate()` dengan clamping (tanpa timer JS/CSS transition)?
- [ ] **6. Kontras Pencahayaan 3D**: Apakah objek 3D memiliki uplight dari bawah dan rim light dari belakang agar tidak tenggelam di layar smartphone?
- [ ] **7. Manim Selective Focus**: Apakah formula atau diagram analitis meredupkan bagian pasif (`opacity: 0.35`) saat menyorot bagian aktif?
- [ ] **8. Angka Subtitle**: Apakah angka teknis (oktan, persen, tahun, harga) tampil ringkas sebagai angka numerik (bukan dieja panjang)?
- [ ] **9. Kompilasi TypeScript**: Apakah `npx tsc --noEmit` lolos dengan 0 error?
- [ ] **10. Remotion Bundle**: Apakah `npx remotion bundle src/index.ts` sukses sebelum render?
