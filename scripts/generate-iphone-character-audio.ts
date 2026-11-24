import path from "node:path";
import fs from "node:fs";
import { synthesize } from "./lib/tts";

const VOICE_CONFIG = { preset: "ardi-punchy" };

const scenes = [
  {
    name: "iphone-ump-id-story/scene1",
    text: "Bayangin Pak Budi seorang petani di desa, dan Pak Anu seorang pebisnis, sama-sama lagi menatap satu unit iPhone yang harganya sama persis, enam belas juta setengah rupiah.",
  },
  {
    name: "iphone-ump-id-story/scene2",
    text: "Tapi buat membawanya pulang, pengorbanan mereka beda bumi dan langit. Kenapa gitu? Yuk sini kita jelasin!",
  },
  {
    name: "iphone-ump-id-story/scene3",
    text: "Bagi Pak Anu, enam belas juta itu cuma setara tiga hari omzet bisnisnya. Tapi buat Pak Budi dengan penghasilan dua jutaan, ini setara delapan bulan kerja penuh tanpa makan.",
  },
  {
    name: "iphone-ump-id-story/scene4",
    text: "Nah di dunia nyata, Pak Budi kan harus beli beras, bayar listrik, dan sekolah anak. Begitu dipotong kebutuhan pokok, sisa uang yang bisa ditabung cuma dua ratus ribu sebulan.",
  },
  {
    name: "iphone-ump-id-story/scene5",
    text: "Artinya, Pak Budi butuh menabung hampir tujuh tahun cuma buat satu ponsel! Menurut kamu, apakah patokan harga global ini masuk akal? Tulis pendapatmu di komentar ya!",
  },
];

async function main() {
  const audioDir = path.resolve("public", "audio", "iphone-ump-id-story");
  const rawDir = path.resolve("scripts", "out", "iphone-ump-id-story");
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

  console.log("\n📊 Ringkasan Sintesis Audio (Pak Budi vs Pak Anu):");
  console.table(results);
}

main().catch(console.error);
