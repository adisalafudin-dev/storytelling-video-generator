# Perpustakaan Acuan Gaya Penceritaan Video Pendek (Sample References Library)

Dokumen ini merangkum analisis pola penceritaan dari sampel video viral di direktori `sample/`. Dokumen ini menjadi pedoman baku (*master blueprint*) bagi perancangan storyboard, struktur narasi, pacing, dan pemilihan mode visual (2D Editorial vs. 3D Stylized Three.js) di proyek ini.

---

## Ringkasan Prinsip Viralitas & Retensi

1. **3-Detik Pertama (Hook Mutlak)**: Wajib menghadirkan kontras visual, teks berani (*bold claim/question*), dan kalimat pertama yang langsung memicu rasa ingin tahu (*curiosity gap*).
2. **Pacing Anti-Flatline**: Ritme narasi dijaga pada ~160–175 kata per menit (*wpm*). Setiap 2–4 detik harus ada stimulus baru (pergerakan kamera, perubahan infografis, transisi beat, atau SFX renyah).
3. **Pemisahan Cerita Bersih (Strict Anti-Overwrite)**:
   - File konfigurasi cerita baru disimpan mandiri di `src/data/stories/<slug>.json`.
   - Aset voiceover dan metadata kata berada di `public/audio/<slug>/`.

---

## 1. Referensi A: Escalation Masalah → Solusi Bertahap (The Iterative Problem-Solver)

- **Video Acuan**: `sample/Video by bertahan_hidup_3d.mp4` (*Pola Rumah Panggung Bambu*)
- **Durasi Khas**: 60–110 detik (5–8 adegan)
- **Karakteristik Narasi**:
  - Menggunakan pola **"Tantangan Baru $\rightarrow$ Respons Teknis Spesifik"** secara berulang setiap 1–2 kalimat.
  - Alur berjalan seperti tangga bertingkat: tantangan fondasi $\rightarrow$ tantangan struktural $\rightarrow$ tantangan eksternal ekstrem (badai/beban berat) $\rightarrow$ pembuktian akhir.
  - Menggunakan kata sambung pemicu urgensi: *"Tapi kalau cuma...", "Masalahnya...", "Maka dari itu...", "Namun ada satu risiko lagi..."*.
  - **Closing**: Menutup dengan kalkulasi ketahanan atau pertanyaan interaktif ke penonton (*"Kira-kira konstruksi ini bisa bertahan berapa puluh tahun?"*).

### Kesesuaian Topik & Mode Visual
- **Mode 3D (R3F)**:
  - *Pertalite vs Pertamax*: Tekanan kompresi silinder $\rightarrow$ risiko knocking $\rightarrow$ peran oktan $\rightarrow$ penumpukan deposit kerak $\rightarrow$ efisiensi jangka panjang mesin.
  - *Cara Kerja Mesin/Arsitektur Komputer*: Alur transfer instruksi CPU $\rightarrow$ bottleneck memori $\rightarrow$ penambahan cache bertingkat.
- **Mode 2D (Editorial Motion Graphic)**:
  - *Hitungan Hari Kerja UMP untuk Beli iPhone*: Upah harian kotor $\rightarrow$ potongan biaya kos/makan $\rightarrow$ sisa tabungan harian $\rightarrow$ akumulasi waktu riil.

### Blueprint Naskah & Beat Scene
```markdown
Scene 1 (Hook Masalah Utama): Menampilkan kondisi krisis / ancaman langsung.
Scene 2 (Solusi Tahap 1 + Risiko Baru): Solusi diterapkan, namun memicu kendala berikutnya.
Scene 3 (Solusi Tahap 2 + Penguatan): Penambahan mekanisme penyeimbang/penguat.
Scene 4 (Ujian Ekstrem): Faktor cuaca/beban puncak menguji seluruh sistem.
Scene 5 (Resolusi & Interaksi): Hasil akhir kokoh + pertanyaan evaluasi ke audiens.
```

---

## 2. Referensi B: Mekanisme Tersembunyi di Balik Fenomena (The Behind-the-Scenes Causal Chain)

- **Video Acuan**:
  - `sample/Video by ceritapakkato.mp4` (*Mata Air Sadiman*)
  - `sample/Video by byteside404.mp4` (*Rantai Lonjakan Harga RAM*)
- **Durasi Khas**: 60–90 detik (5–6 adegan)
- **Karakteristik Narasi**:
  - Membuka dengan fenomena yang terkesan gila, ganjil, atau lonjakan harga anomali di permukaan.
  - Membongkar **rantai kausalitas sebab-akibat multi-level** yang tidak terlihat oleh orang awam:
    1. *Level 1 (Pemicu Tersembunyi)*: Peristiwa mikro di hulu (kekeringan lokal / banjir pabrik kimia wafer).
    2. *Level 2 (Efek Domino / Bottleneck)*: Rantai pasok bergeser, alokasi kapasitas industri berubah, atau akar pohon mengikat air tanah.
    3. *Level 3 (Dampak Makro ke Penonton)*: Mengapa hal itu akhirnya menguras dompet penonton atau menyelamatkan desa.
  - Mengubah rasa bingung menjadi pemahaman mendalam (*"Aha! moment"*).

### Kesesuaian Topik & Mode Visual
- **Mode 3D (R3F)**:
  - *Perang Dagang AS–China & Rantai Pasok HP*: Mesin litografi ultraviolet ekstrim AS/Belanda $\rightarrow$ kelangkaan cip Taiwan $\rightarrow$ kenaikan harga gadget di konter lokal.
  - *Misteri Sahara Subur & Amazon*: Fosil danau purba Afrika $\rightarrow$ debu fosfor diterbangkan badai Atlantik $\rightarrow$ pupuk alami kanopi Amazon.
- **Mode 2D (Editorial Motion Graphic)**:
  - *Siapa yang Sebenarnya Membayar Utang Negara*: Penerbitan SBN $\rightarrow$ bank sentral beli obligasi $\rightarrow$ ekspansi jumlah uang beredar $\rightarrow$ inflasi tersembunyi yang mengikis daya beli gaji pekerja.

### Blueprint Naskah & Beat Scene
```markdown
Scene 1 (Hook Fenomena Aneh): "Kakek ini dianggap gila 20 tahun..." / "Kenapa harga barang ini melonjak 3x lipat?"
Scene 2 (Lapisan Permukaan vs Kenyataan): Mengapa penjelasan umum di publik itu keliru atau belum lengkap.
Scene 3 (Pemicu Awal di Balik Layar): Menelusuri rantai kausalitas level 1.
Scene 4 (Efek Domino): Bagaimana pemicu awal merambat melalui sistem ekonomi / ekologis.
Scene 5 (Dampak Konkret & Pembuktian): Hasil akhir yang kini dinikmati atau dirasakan audiens.
Scene 6 (Takeaway Reflektif): Pelajaran strategis di balik fenomena tersebut.
```

---

## 3. Referensi C: Kontras Ekspektasi vs Realitas / Ironi (The Expectation Flip)

- **Video Acuan**:
  - `sample/Video by yukngulikin.mp4` (*Misteri Borobudur & Danau Purba*)
  - `sample/Video by wearefactoid.mp4` (*Penghormatan Kartel Meksiko untuk Akira Toriyama*)
- **Durasi Khas**: 60–120 detik (5–7 adegan)
- **Karakteristik Narasi**:
  - Menghadirkan **benturan tajam antara anggapan umum (mitos) dengan realitas faktual**.
  - Pacing dibuka dengan nada reflektif/misterius, lalu membalikkan ekspektasi penonton 180 derajat dengan bukti ilmiah atau fakta historis tak terduga.
  - Kontras dramatis: Kelompok kriminal paling kejam yang mendadak damai demi kartun masa kecil, atau candi megah di pegunungan yang ternyata aslinya berdiri di tepi danau purba.
  - Menggunakan formula hook: *"Banyak yang mengira X, tapi catatan sejarah/sains membuktikan sebaliknya..."*

### Kesesuaian Topik & Mode Visual
- **Mode 2D (Editorial Motion Graphic)**:
  - *Harga iPhone Sama, Tapi Hari Kerja Beda Jauh*: Nominal angka di struk toko terlihat seragam, namun harga sebenarnya diukur dari ratusan jam waktu hidup yang harus ditukar oleh pekerja antar-negara.
  - *Siapa Bayar Utang Negara*: Anggapan bahwa utang dibayar nanti oleh cucu kita vs fakta bahwa daya beli kita sudah dipotong hari ini lewat inflasi.
- **Mode 3D (R3F)**:
  - *Tenggelamnya Titanic*: Anggapan populer gunung es raksasa vs temuan metalurgi tentang paku keling (*rivets*) besi rapuh berkualitas rendah.

### Blueprint Naskah & Beat Scene
```markdown
Scene 1 (Hook Persepsi Umum): Menampilkan mitos / keyakinan umum yang dipercaya banyak orang.
Scene 2 (Titik Anomali / Keraguan): Menemukan satu celah janggal dalam keyakinan tersebut.
Scene 3 (Pembongkaran Fakta / The Twist): Membuka data geologis, sejarah, atau ekonomi yang sesungguhnya.
Scene 4 (Rekonstruksi Kejadian): Menunjukkan visualisasi bagaimana peristiwa sebenarnya terjadi.
Scene 5 (Refleksi Filosofis): Mengapa persepsi manusia bisa salah dan apa arti temuan ini bagi kita hari ini.
```

---

## 4. Referensi D: Ritme Satire / Parodi Cepat (The High-Velocity Punchline)

- **Video Acuan**:
  - `sample/Video by buzzirat.mp4`
  - `sample/Video by lowpolyshortz.mp4`
- **Durasi Khas**: 30–50 detik (4–6 adegan singkat)
- **Karakteristik Narasi**:
  - **Lompatan Tempo Sangat Cepat**: Kalimat pendek-padat berdurasi rata-rata 1.5–2.5 detik per kalimat.
  - Gaya bahasa satir, lugas, *deadpan*, atau komedi sinis berbasis data akurat.
  - Kontras tinggi antara pernyataan serius dengan visual komikal atau analogi ekstrem.
  - Setiap pergantian adegan diisi transisi *snap/whip* dengan sound effect yang renyah (*pop, whip, click*).

### Kesesuaian Topik & Mode Visual
- **Mode 2D & 3D**:
  - Perbandingan biaya gaya hidup vs tabungan riil.
  - Sindiran fenomena kecerdasan buatan (AI) yang menggantikan tugas remeh vs tugas berat.
  - Komparasi cepat spesifikasi gadget vs kebutuhan riil pengguna.

### Blueprint Naskah & Beat Scene
```markdown
Scene 1 (Hook Sarkastik / Pukulan Awal): 2 detik pertama langsung melontarkan premis kontradiktif.
Scene 2 (Fakta Kering 1): Data disajikan sebagai sindiran lugas.
Scene 3 (Eskalasi Komikal / Analogi Ekstrem): Perbandingan situasi yang kian menggelikan namun nyata.
Scene 4 (Punchline Puncak): Fakta pamungkas yang menampar logika umum.
Scene 5 (Closing Celetukan): Ajakan interaksi bernada santai / provokatif.
```

---

## 5. Referensi E: Storytelling Tokoh & Jembatan Penjelasan (The Character-Driven Conversational Explainer)

- **Video Acuan (Folder `sample/2d/`)**:
  - `sample/2d/Video by akaldanotak.mp4` (*Karakter Kartun Minimalis & Dialog Situasional*)
  - `sample/2d/Video by logikabayi.mp4` (*Kebiasaan Nyata Sehari-hari & Hook Rasa Ingin Tahu*)
  - `sample/2d/Video by scandulu.id.mp4` (*Pengalaman Indrawi Manusiawi Menuju Sains Membumi*)
  - `sample/2d/Video by titikmind.mp4` & `sample/2d/Video by undonesia.id.mp4` (*Metafora Visual Progresif: Katak Direbus & Organ Tubuh*)
  - `sample/2d/Video by nirmalaprojectid.mp4` (*Paper Cut-Out Character & Narasi Cerita Rakyat/Urban*)
- **Durasi Khas**: 40–70 detik (5 adegan terstruktur)
- **Karakteristik Narasi**:
  - **Hook Tokoh / Situasi Konkret**: Alih-alih membuka dengan tabel statistik dingin, grafik ekonomi rumit, atau definisi kamus, video **langsung memperkenalkan 1–2 figur manusia nyata** atau skenario kehidupan sehari-hari yang mudah diimajinasikan penonton (misal: *Pak Budi sang petani desa* vs *Pak Anu sang pebisnis kota* yang sama-sama menatap etalase toko).
  - **Jembatan Obrolan Alami (*Conversational Bridge*)**: Transisi dari hook menuju inti pembahasan tidak terasa seperti presentasi kuliah, melainkan ajakan ngobrol santai yang akrab:
    - *"Kenapa bisa gitu? Yuk kita bahas."*
    - *"Kenapa gitu? Yuk sini kita jelasin!"*
    - *"Loh kok bisa? Nah, coba kita bedah bareng-bareng."*
  - **Penjelasan Konsep Bertahap Tanpa Dashboard Kaku**:
    - Menghindari tumpukan teks kecil dan matriks angka padat seperti spreadsheet Excel.
    - Menjelaskan konsep lapis demi lapis (*progressive reveal*):
      1. *Lapis 1*: Nominal sama di etalase, tapi nilai tukar keringat berbeda.
      2. *Lapis 2*: Simulasi tanpa makan (gaji kotor) sebagai batas teoritis.
      3. *Lapis 3*: Realitas potongan kebutuhan primer (makan, sewa/rumah, listrik, sekolah anak).
      4. *Lapis 4*: Sisa dompet bersih yang menipis drastis dan melipatgandakan waktu tempuh riil.
  - **Kartu Visual Ringkas & Terbaca di HP**: Kartu grafis berformat ringkas (*single punchy idea per beat*), tipografi tebal, ikon karakter kontras, dan warna berani yang nyaman dipandang di layar vertikal 9:16.
  - **Pola Dunia Berlapis (Layered World-Building)**: Setiap karakter berada di ekosistem visualnya (foreground, midground, background, pencahayaan sinematik). Panduan lengkap didokumentasikan di `sample/2d/world-breakdown.md`.
  - **Koreografi Kamera Sinematik**: Pergerakan kamera dinamis (slow dolly-in 1.0 ke 1.05, gentle pan X-axis, dan transisi kamera menyambung) dengan secondary motion halus pada karakter (napas, kedip, anggukan, gestur tangan).
  - **Gaya Penutup Reflektif & Humanis**: Menutup bukan dengan kesimpulan sepihak, melainkan pertanyaan empati yang membumi untuk memicu percakapan alami penonton di kolom komentar (*"Menurut kamu, adil nggak patokan harga global ini buat daya beli masyarakat kita? Tulis di komentar ya!"*).

### Blueprint Naskah & Beat Scene
```markdown
Scene 1 (Hook Tokoh Konkret): Memperkenalkan 2 figur nyata dengan latar belakang berbeda yang menghadapi 1 objek / masalah yang sama.
Scene 2 (Jembatan Obrolan Alami): Lontaran rasa heran yang mewakili audiens + jembatan ajakan hangat ("Kenapa gitu? Yuk sini kita jelasin!").
Scene 3 (Selisih Kapasitas Dasar / Gross): Membedah perbandingan nominal pendapatan kotor vs harga objek.
Scene 4 (Potongan Realitas Kehidupan): Memasukkan biaya hidup nyata yang menguras dompet sebelum bisa menabung.
Scene 5 (Waktu Riil & Refleksi Hangat): Menunjukkan waktu tempuh akumulasi riil + ajakan berdiskusi di kolom komentar.
```

---

## 6. Matriks Pengambilan Keputusan (Decision Matrix)

| Topik Rencana Video | Pola Acuan Terbaik | Mode Visual Rekomendasi | Voice Preset Rekomendasi | Elemen Kunci yang Wajib Muncul |
| :--- | :--- | :--- | :--- | :--- |
| **Pertalite vs Pertamax** | **Referensi A & B** | 3D (Silinder Mesin + Molekul Oktan) | `ardi-punchy` / `gadis-fast` | Eskalasi knocking mesin $\rightarrow$ visualisasi residu kerak $\rightarrow$ kalkulasi hemat jangka panjang. |
| **Perang Dagang AS–China & Harga HP** | **Referensi B** | 3D (Cip Silikon + Kapal Kargo + Globe) | `ardi-punchy` | Rantai kausalitas litografi $\rightarrow$ sanksi ekspor $\rightarrow$ kenaikan harga ritel HP di tangan audiens. |
| **Harga iPhone: Pak Budi vs Pak Anu** | **Referensi E** | 2D (Karakter Flat + Dompet/Keranjang Riil) | `ardi-punchy` / `gadis-natural` | Karakter Pak Budi vs Pak Anu $\rightarrow$ jembatan "Yuk kita jelasin" $\rightarrow$ keranjang belanja harian $\rightarrow$ timeline riil bertahun-tahun. |
| **Harga iPhone Sama, Hari Kerja Beda Jauh** | **Referensi C** | 2D (Editorial Split Screen + Grafik Jam) | `gadis-fast` / `gadis-natural` | Kontras nominal harga vs ratusan jam kerja UMP antar negara $\rightarrow$ infografis kalender kerja. |
| **Siapa yang Bayar Utang Negara** | **Referensi B & C** | 2D (Diagram Alir Fiskal + Uang Kertas) | `ardi-punchy` / `ardi-calm` | Penyingkapan inflasi tersembunyi sebagai "pajak tak terlihat" yang dibayar harian oleh masyarakat. |

---

## 7. Protokol Pembuatan Cerita Baru (Checklist Wajib)

Ketika merancang naskah dan file JSON baru di `src/data/stories/<slug>.json`:

1. **Pilih 1 Gaya Utama dari Acuan Ini**: Tentukan apakah video menggunakan Referensi A, B, C, atau D.
2. **Kembangkan Naskah Sesuai Karakter Topik**: Jangan menyalin mentah kalimat contoh, melainkan adaptasi ritme, hook, dan eskalasinya.
3. **Pemisahan File Mandiri (Anti-Overwrite)**:
   - Buat file baru: `src/data/stories/<slug>.json`. Dilarang menimpa file cerita yang sudah ada.
   - Generate audio ke folder tersendiri: `public/audio/<slug>/`.
4. **Eksekusi Normalisasi & Audio**:
   Jalankan generator audio dengan preset yang sesuai:
   ```bash
   npm run audio -- --story=<slug> --preset=ardi-punchy
   ```
5. **Validasi Rendering**:
   Pastikan komposisi Remotion `Story-<slug>` dapat dimuat di studio tanpa tabrakan audio antara voiceover, BGM, dan SFX.
