import fs from "node:fs";
import path from "node:path";
import { synthesize } from "./lib/tts";

async function run() {
  const storyboardPath = path.resolve("src/data/storyboard.json");
  const data = JSON.parse(fs.readFileSync(storyboardPath, "utf-8"));
  const voice = "id-ID-ArdiNeural";

  const narrations = [
    "Tahukah kamu, dunia sedang mengalami lonjakan komputasi terbesar?",
    "Hanya dalam satu dekade, kecepatan chip meningkat secara eksponensial!",
    "Arsitektur silikon baru mampu memproses triliunan koneksi per detik.",
    "Follow sekarang untuk update inovasi teknologi terdepan!"
  ];

  const outDir = path.resolve("public/audio/storytelling");
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < data.scenes.length; i++) {
    const text = narrations[i];
    const mp3Name = `scene${i + 1}.mp3`;
    const wordsName = `scene${i + 1}.words.json`;
    const mp3Path = path.join(outDir, mp3Name);
    const wordsPath = path.join(outDir, wordsName);

    console.log(`Synthesizing scene ${i + 1}: "${text}"...`);
    try {
      const result = await synthesize(text, voice, mp3Path, wordsPath);
      console.log(`Scene ${i + 1} done: ${result.words} words, duration ${result.audioSec.toFixed(2)}s`);

      const words = JSON.parse(fs.readFileSync(wordsPath, "utf-8"));
      data.scenes[i].audio = `audio/storytelling/${mp3Name}`;
      data.scenes[i].duration = Math.max(3.2, Math.ceil(result.audioSec * 10) / 10 + 0.3);
      data.scenes[i].captions = words.map((w: any) => ({
        text: w.text.trim(),
        startMs: w.startMs,
        endMs: w.endMs,
      }));
    } catch (err) {
      console.warn(`TTS synthesis warning for scene ${i + 1}, using existing timings:`, err);
    }
  }

  fs.writeFileSync(storyboardPath, JSON.stringify(data, null, 2));
  console.log("Updated src/data/storyboard.json with audio and word timestamps!");
}

run();
