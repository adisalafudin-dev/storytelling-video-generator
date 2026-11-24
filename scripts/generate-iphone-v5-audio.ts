import path from "node:path";
import fs from "node:fs";
import { synthesize } from "./lib/tts";

const VOICE_CONFIG = { preset: "ardi-punchy" };

const scenes = [
  {
    name: "iphone-ump-id-story-v5/scene1",
    text: "Pagi buta di sawah, Pak Budi udah turun ke lumpur. Di tempat lain, Pak Hendra baru buka pintu usahanya. Anehnya, mereka berdua lagi ngincer satu barang yang sama: iPhone enam belas setengah juta.",
  },
  {
    name: "iphone-ump-id-story-v5/scene2",
    text: "Harga resminya sama, tapi jalannya beda jauh. Kenapa bisa gitu ya? Yuk sini kita jelasin pelan-pelan.",
  },
  {
    name: "iphone-ump-id-story-v5/scene3",
    text: "Buat Pak Hendra, angka segitu bisa keuber dalam hitungan hari dari perputaran usahanya. Tapi buat Pak Budi yang penghasilannya di kisaran dua juta sebulan, butuh berbulan-bulan kerja keras.",
  },
  {
    name: "iphone-ump-id-story-v5/scene4",
    text: "Itu pun kalau gajinya utuh. Faktanya, tiap bulan ada beras, listrik, dan kebutuhan keluarga yang harus jalan dulu. Tinggal sisa sekitar dua ratus ribu yang beneran bisa ditabung.",
  },
  {
    name: "iphone-ump-id-story-v5/scene5",
    text: "Kalau ditabung pelan-pelan dari sisa segitu, ngejar iPhone enam belas setengah juta bisa makan waktu hampir tujuh tahun. Menurutmu, di posisi kayak gini, barang kayak gitu masih worth it atau mending dialihin?",
  },
];

async function main() {
  const audioDir = path.resolve("public", "audio", "iphone-ump-id-story-v5");
  const rawDir = path.resolve("scripts", "out", "iphone-ump-id-story-v5");
  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
  if (!fs.existsSync(rawDir)) fs.mkdirSync(rawDir, { recursive: true });

  const results: Array<{ name: string; durationSec: number; words: number }> = [];

  for (const s of scenes) {
    const mp3 = path.resolve("public", "audio", `${s.name}.mp3`);
    const words = path.resolve("public", "audio", `${s.name}.words.json`);
    const raw = path.resolve("scripts", "out", `${s.name}.raw.json`);
    console.log(`🎙️ Mensintesis ${s.name}...`);
    const res = await synthesize(s.text, VOICE_CONFIG, mp3, words, raw);
    console.log(`✅ ${s.name} selesai (~${res.audioSec.toFixed(2)}s, ${res.words} kata)`);
    results.push({ name: s.name, durationSec: res.audioSec, words: res.words });
  }

  console.log("\n📊 Ringkasan Sintesis Audio (iphone-ump-id-story-v5):");
  console.table(results);
}

main().catch(console.error);
