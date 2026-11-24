import fs from "node:fs";
import path from "node:path";

function readWords(sceneNum: number) {
  const p = path.resolve(`public/audio/iphone-ump-id-story/scene${sceneNum}.words.json`);
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

const story = {
  title: "Pak Budi vs Pak Anu: Harga iPhone Sama, Pengorbanan Beda Jauh",
  channel: "@adi.salafudin",
  niche: "CERITA REALITAS & DAYA BELI",
  fps: 30,
  width: 1080,
  height: 1920,
  totalEstimatedDurationSec: 43.4,
  bgm: "audio/bgm/ambient-mystery.mp3",
  bgmVolume: 0.12,
  scenes: [
    {
      id: "scene-1",
      duration: 8.2,
      theme: "tech",
      nicheTag: "CERITA DUA TOKOH",
      narration:
        "Bayangin Pak Budi seorang petani di desa, dan Pak Anu seorang pebisnis, sama-sama lagi menatap satu unit iPhone yang harganya sama persis, enam belas juta setengah rupiah.",
      infoCard: {
        type: "info",
        badge: "CERITA DUA TOKOH",
        title: "Satu HP • Dua Nasib Berbeda",
        metric: "Rp 16.500.000",
      },
      diagram: {
        type: "character-hook-showcase",
      },
      audio: "audio/iphone-ump-id-story/scene1.mp3",
      captions: readWords(1),
    },
    {
      id: "scene-2",
      duration: 7.1,
      theme: "money",
      nicheTag: "JEMBATAN REALITAS",
      narration:
        "Tapi buat membawanya pulang, pengorbanan mereka beda bumi dan langit. Kenapa gitu? Yuk sini kita jelasin!",
      infoCard: {
        type: "quote",
        badge: "OBROLAN SANTAI",
        title: "Pengorbanan Beda Jauh",
        metric: "Yuk Sini Kita Jelasin!",
      },
      diagram: {
        type: "character-bridge-question",
      },
      audio: "audio/iphone-ump-id-story/scene2.mp3",
      captions: readWords(2),
    },
    {
      id: "scene-3",
      duration: 9.0,
      theme: "money",
      nicheTag: "SIMULASI GAJI KOTOR",
      narration:
        "Bagi Pak Anu, enam belas juta itu cuma setara tiga hari omzet bisnisnya. Tapi buat Pak Budi dengan penghasilan dua jutaan, ini setara delapan bulan kerja penuh tanpa makan.",
      infoCard: {
        type: "stat",
        badge: "NILAI TUKAR KERINGAT",
        title: "Pak Anu vs Pak Budi",
        metric: "3 HARI vs 8 BULAN",
      },
      diagram: {
        type: "character-income-contrast",
      },
      audio: "audio/iphone-ump-id-story/scene3.mp3",
      captions: readWords(3),
    },
    {
      id: "scene-4",
      duration: 9.5,
      theme: "tech",
      nicheTag: "REALITAS PENGELUARAN",
      narration:
        "Nah di dunia nyata, Pak Budi kan harus beli beras, bayar listrik, dan sekolah anak. Begitu dipotong kebutuhan pokok, sisa uang yang bisa ditabung cuma dua ratus ribu sebulan.",
      infoCard: {
        type: "info",
        badge: "BIAYA HIDUP NYATA",
        title: "Dipotong Kebutuhan Pokok",
        metric: "SISA Rp 200.000 / BLN",
      },
      diagram: {
        type: "character-living-expenses",
      },
      audio: "audio/iphone-ump-id-story/scene4.mp3",
      captions: readWords(4),
    },
    {
      id: "scene-5",
      duration: 9.6,
      theme: "default",
      nicheTag: "REFLEKSI & DISKUSI",
      narration:
        "Artinya, Pak Budi butuh menabung hampir tujuh tahun cuma buat satu ponsel! Menurut kamu, apakah patokan harga global ini masuk akal? Tulis pendapatmu di komentar ya!",
      infoCard: {
        type: "quote",
        badge: "DISKUSI TERBUKA",
        title: "Harga Global vs Upah Lokal",
        metric: "@adi.salafudin",
      },
      diagram: {
        type: "character-savings-timeline",
      },
      audio: "audio/iphone-ump-id-story/scene5.mp3",
      captions: readWords(5),
    },
  ],
};

const outPath = path.resolve("src/data/stories/iphone-ump-id-story.json");
fs.writeFileSync(outPath, JSON.stringify(story, null, 2), "utf-8");
console.log(`✅ File story berhasil dibuat di: ${outPath}`);
