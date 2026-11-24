import fs from "node:fs";
import path from "node:path";

function readWords(sceneNum: number) {
  const p = path.resolve(`public/audio/iphone-ump-id-real/scene${sceneNum}.words.json`);
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

const story = {
  title: "Pak Budi vs Pak Hendra: Harga iPhone Sama, Realitas Beda Jauh",
  channel: "@adi.salafudin",
  niche: "CERITA REALITAS & DAYA BELI",
  fps: 30,
  width: 1080,
  height: 1920,
  showGrid: false,
  showWatermark: false,
  totalEstimatedDurationSec: 42.2,
  bgm: "audio/bgm/ambient-mystery.mp3",
  bgmVolume: 0.12,
  scenes: [
    {
      id: "scene-1",
      duration: 8.2,
      theme: "tech",
      nicheTag: "CERITA DUA TOKOH",
      narration:
        "Bayangin Pak Budi seorang petani di desa, dan Pak Hendra seorang pemilik toko, sama-sama lagi menatap satu unit iPhone yang harganya sama persis, enam belas juta setengah rupiah.",
      diagram: {
        type: "real-hook-showcase",
      },
      audio: "audio/iphone-ump-id-real/scene1.mp3",
      captions: readWords(1),
    },
    {
      id: "scene-2",
      duration: 6.8,
      theme: "money",
      nicheTag: "JEMBATAN REALITAS",
      narration:
        "Tapi buat membawanya pulang, pengorbanan mereka beda bumi dan langit. Kenapa gitu? Yuk sini kita jelasin!",
      diagram: {
        type: "real-bridge-question",
      },
      audio: "audio/iphone-ump-id-real/scene2.mp3",
      captions: readWords(2),
    },
    {
      id: "scene-3",
      duration: 8.8,
      theme: "money",
      nicheTag: "SIMULASI GAJI KOTOR",
      narration:
        "Bagi Pak Hendra, enam belas juta itu cuma setara tiga hari keuntungan tokonya. Tapi buat Pak Budi dengan penghasilan dua jutaan, ini setara delapan bulan kerja penuh tanpa makan.",
      diagram: {
        type: "real-income-contrast",
      },
      audio: "audio/iphone-ump-id-real/scene3.mp3",
      captions: readWords(3),
    },
    {
      id: "scene-4",
      duration: 9.2,
      theme: "tech",
      nicheTag: "REALITAS PENGELUARAN",
      narration:
        "Nah di dunia nyata, Pak Budi kan harus beli beras, bayar listrik, dan sekolah anak. Begitu dipotong kebutuhan pokok, sisa uang yang bisa ditabung cuma dua ratus ribu sebulan.",
      diagram: {
        type: "real-living-expenses",
      },
      audio: "audio/iphone-ump-id-real/scene4.mp3",
      captions: readWords(4),
    },
    {
      id: "scene-5",
      duration: 9.3,
      theme: "default",
      nicheTag: "REFLEKSI & DISKUSI",
      narration:
        "Artinya, Pak Budi butuh menabung hampir tujuh tahun cuma buat satu ponsel! Menurut kamu, apakah patokan harga global ini masuk akal? Tulis pendapatmu di komentar ya!",
      diagram: {
        type: "real-timeline-calculation",
      },
      audio: "audio/iphone-ump-id-real/scene5.mp3",
      captions: readWords(5),
    },
  ],
};

fs.writeFileSync(
  "src/data/stories/iphone-ump-id-real.json",
  JSON.stringify(story, null, 2),
  "utf-8"
);
console.log("✅ Sukses membuat src/data/stories/iphone-ump-id-real.json");
