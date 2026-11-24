import fs from "node:fs";
import path from "node:path";

function readWords(sceneNum: number) {
  const p = path.resolve(`public/audio/iphone-ump-id-2d/scene${sceneNum}.words.json`);
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

const story = {
  title: "Harga iPhone Sama, Hari Kerjanya Beda Jauh",
  channel: "@adi.salafudin",
  niche: "EKONOMI & DAYA BELI",
  fps: 30,
  width: 1080,
  height: 1920,
  totalEstimatedDurationSec: 40.1,
  bgm: "audio/bgm/ambient-mystery.mp3",
  bgmVolume: 0.12,
  scenes: [
    {
      id: "scene-1",
      duration: 7.2,
      theme: "tech",
      nicheTag: "DAYA BELI & UMP",
      narration:
        "Harga resmi satu iPhone di Indonesia itu sama di mana saja. Tapi kalau dihitung pakai hari kerja UMP, hasilnya bisa beda jauh.",
      infoCard: {
        type: "info",
        badge: "DAYA BELI GADGET",
        title: "Harga Sama • Hari Kerja Beda Jauh",
        metric: "Rp 16.499.000",
        description: "Standar Ritel Resmi Nasional iPhone 15",
      },
      diagram: {
        type: "iphone-hook-contrast",
      },
      audio: "audio/iphone-ump-id-2d/scene1.mp3",
      captions: readWords(1),
    },
    {
      id: "scene-2",
      duration: 10.5,
      theme: "money",
      nicheTag: "SIMULASI HARI KERJA",
      narration:
        "Di Jakarta dengan UMP 5 juta rupiah, butuh sekitar 65 hari kerja penuh. Sementara di Jawa Tengah dengan UMP 2 jutaan, butuh lebih dari 160 hari kerja untuk satu perangkat yang sama.",
      infoCard: {
        type: "stat",
        badge: "PERBANDINGAN GROSS",
        title: "Perbandingan Hari Kerja UMP",
        metric: "65 vs 162 HARI",
        description: "DKI Jakarta vs Jawa Tengah (100% Gaji Kotor)",
      },
      diagram: {
        type: "ump-days-comparison",
      },
      audio: "audio/iphone-ump-id-2d/scene2.mp3",
      captions: readWords(2),
    },
    {
      id: "scene-3",
      duration: 9.6,
      theme: "money",
      nicheTag: "REALITAS PENGELUARAN",
      narration:
        "Dan itu kalau seluruh gaji ditabung tanpa makan. Begitu dipotong biaya hidup nyata seperti kos, makan, dan transportasi, waktu yang dibutuhkan bisa berlipat ganda.",
      infoCard: {
        type: "info",
        badge: "BIAYA HIDUP NYATA",
        title: "Realitas Potongan Biaya Hidup",
        metric: "SISA HANYA ~10%",
        description: "Makan, sewa kos, dan transportasi menyerap ~90% UMP",
      },
      diagram: {
        type: "cost-of-living-deduction",
      },
      audio: "audio/iphone-ump-id-2d/scene3.mp3",
      captions: readWords(3),
    },
    {
      id: "scene-4",
      duration: 5.8,
      theme: "tech",
      nicheTag: "TIMELINE RIIL",
      narration:
        "Secara riil, pekerja di kota dengan UMP rendah butuh menabung hingga hampir dua tahun hanya untuk membeli barang tersier ini.",
      infoCard: {
        type: "stat",
        badge: "WAKTU MENABUNG NYATA",
        title: "Garis Waktu Tabungan Riil",
        metric: "HAMPIR 2 TAHUN",
        description: "Dengan sisa bersih tabungan ~Rp 200rb-400rb/bulan",
      },
      diagram: {
        type: "real-savings-timeline",
      },
      audio: "audio/iphone-ump-id-2d/scene4.mp3",
      captions: readWords(4),
    },
    {
      id: "scene-5",
      duration: 7.0,
      theme: "default",
      nicheTag: "DISKUSI & REFLEKSI",
      narration:
        "Jadi, menurut kamu, apakah patokan harga gadget global ini adil dengan standar upah kita? Tulis di kolom komentar!",
      infoCard: {
        type: "quote",
        badge: "DISKUSI TERBUKA",
        title: "Standar Global vs Upah Lokal",
        metric: "@adi.salafudin",
        description: "Bagikan sudut pandangmu di kolom komentar!",
      },
      diagram: {
        type: "ump-closing-summary",
      },
      audio: "audio/iphone-ump-id-2d/scene5.mp3",
      captions: readWords(5),
    },
  ],
};

const outPath = path.resolve("src/data/stories/iphone-ump-id-2d.json");
fs.writeFileSync(outPath, JSON.stringify(story, null, 2), "utf-8");
console.log(`✅ File story berhasil dibuat di: ${outPath}`);
