import path from "node:path";
import fs from "node:fs";
import { synthesize } from "./lib/tts";

const VOICE_CONFIG = { preset: "ardi-punchy" };

const scenes = [
  {
    name: "iphone-ump-id-2d/scene1",
    text: "Harga resmi satu iPhone di Indonesia itu sama di mana saja. Tapi kalau dihitung pakai hari kerja UMP, hasilnya bisa beda jauh.",
  },
  {
    name: "iphone-ump-id-2d/scene2",
    text: "Di Jakarta dengan UMP lima juta rupiah, butuh sekitar enam puluh lima hari kerja penuh. Sementara di Jawa Tengah dengan UMP dua jutaan, butuh lebih dari seratus enam puluh hari kerja untuk satu perangkat yang sama.",
  },
  {
    name: "iphone-ump-id-2d/scene3",
    text: "Dan itu kalau seluruh gaji ditabung tanpa makan. Begitu dipotong biaya hidup nyata seperti kos, makan, dan transportasi, waktu yang dibutuhkan bisa berlipat ganda.",
  },
  {
    name: "iphone-ump-id-2d/scene4",
    text: "Secara riil, pekerja di kota dengan UMP rendah butuh menabung hingga hampir dua tahun hanya untuk membeli barang tersier ini.",
  },
  {
    name: "iphone-ump-id-2d/scene5",
    text: "Jadi, menurut kamu, apakah patokan harga gadget global ini adil dengan standar upah kita? Tulis di kolom komentar!",
  },
];

async function main() {
  const audioDir = path.resolve("public", "audio", "iphone-ump-id-2d");
  const rawDir = path.resolve("scripts", "out", "iphone-ump-id-2d");
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

  console.log("\n📊 Ringkasan Sintesis Audio:");
  console.table(results);
}

main().catch(console.error);
