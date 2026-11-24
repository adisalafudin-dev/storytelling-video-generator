import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_PRESET,
  VOICE_PRESETS,
  resolveVoiceConfig,
  synthesize,
  type TtsOptions,
} from "./lib/tts";
import { normalizeIndonesianText } from "./lib/normalizer-id";

// --- CLI Argument Parsing ---
const args = process.argv.slice(2);

function printHelp() {
  console.log(`
======================================================================
  Short-Form 3D Video Audio Generator (Indonesian TTS Engine)
======================================================================

Penggunaan:
  tsx scripts/generate-audio.ts --story=<slug> [opsi...]

Opsi Tersedia:
  --story=<slug|path>       Slug cerita (misal: monalisa, sahara-remake)
                            atau path ke file JSON storyboard.
  --voice=<voice>           Pilih suara Edge TTS langsung (misal: id-ID-GadisNeural, id-ID-ArdiNeural).
  --preset=<preset>         Gunakan preset suara siap pakai untuk video pendek:
`);
  Object.values(VOICE_PRESETS).forEach((p) => {
    console.log(`    - ${p.name.padEnd(15)} : ${p.description}`);
  });
  console.log(`
  --rate=<rate>             Kecepatan bicara (misal: +16%, +20%, 1.15).
  --pitch=<pitch>           Tinggi nada (misal: +0Hz, +2Hz, -1Hz).
  --provider=<provider>     TTS Provider (default: "edge", opsi: "mock").
  --no-trim                 Nonaktifkan pemangkasan jeda hening FFmpeg.
  --no-normalize            Nonaktifkan normalisasi teks Indonesia.
  --no-loudnorm             Nonaktifkan normalisasi loudness audio.
  --dry-run                 Pratinjau normalisasi teks tanpa memanggil TTS API.
  --help, -h                Tampilkan panduan ini.

Contoh:
  # Sintesis cerita monalisa dengan suara wanita cepat & punchy
  tsx scripts/generate-audio.ts --story=monalisa --preset=gadis-fast

  # Sintesis cerita sahara dengan suara pria berwibawa
  tsx scripts/generate-audio.ts --story=sahara-remake --preset=ardi-punchy

  # Pratinjau teks lisan normalisasi tanpa memproses audio
  tsx scripts/generate-audio.ts --story=monalisa --dry-run
======================================================================
`);
}

if (args.includes("--help") || args.includes("-h")) {
  printHelp();
  process.exit(0);
}

let storyArg = "";
let voiceArg = "";
let presetArg = "";
let rateArg = "";
let pitchArg = "";
let providerArg = "edge";
let trimSilence = true;
let normalizeText = true;
let normalizeLoudness = true;
let dryRun = false;

for (const a of args) {
  if (a.startsWith("--story=")) {
    storyArg = a.split("=")[1].trim();
  } else if (a.startsWith("--voice=")) {
    voiceArg = a.split("=")[1].trim();
  } else if (a.startsWith("--preset=")) {
    presetArg = a.split("=")[1].trim();
  } else if (a.startsWith("--rate=")) {
    rateArg = a.split("=")[1].trim();
  } else if (a.startsWith("--pitch=")) {
    pitchArg = a.split("=")[1].trim();
  } else if (a.startsWith("--provider=")) {
    providerArg = a.split("=")[1].trim();
  } else if (a === "--no-trim") {
    trimSilence = false;
  } else if (a === "--no-normalize") {
    normalizeText = false;
  } else if (a === "--no-loudnorm") {
    normalizeLoudness = false;
  } else if (a === "--dry-run") {
    dryRun = true;
  } else if (!a.startsWith("--") && !storyArg) {
    storyArg = a.trim();
  }
}

if (!storyArg) {
  console.error("Kesalahan: Parameter --story=<slug> wajib diisi.");
  console.error("Ketik 'tsx scripts/generate-audio.ts --help' untuk bantuan.");
  process.exit(1);
}

// Cari letak storyboard JSON
let storyboardPath = "";
let slug = storyArg;

if (fs.existsSync(storyArg)) {
  storyboardPath = path.resolve(storyArg);
  slug = path.basename(storyArg, ".json");
} else if (
  fs.existsSync(path.resolve("src/data/stories", `${storyArg}.json`))
) {
  storyboardPath = path.resolve("src/data/stories", `${storyArg}.json`);
  slug = storyArg;
} else if (fs.existsSync(path.resolve("src/data", `${storyArg}.json`))) {
  storyboardPath = path.resolve("src/data", `${storyArg}.json`);
  slug = storyArg;
} else {
  console.error(`Berkas storyboard tidak ditemukan untuk: "${storyArg}"`);
  console.error(`Sudah dicek di:`);
  console.error(` - src/data/stories/${storyArg}.json`);
  console.error(` - src/data/${storyArg}.json`);
  process.exit(1);
}

const storyboardRaw = fs.readFileSync(storyboardPath, "utf-8");
const data = JSON.parse(storyboardRaw);

if (!data.scenes || !Array.isArray(data.scenes)) {
  console.error(`Storyboard di ${storyboardPath} tidak memiliki array 'scenes'.`);
  process.exit(1);
}

// Konfigurasi suara dasar: prioritaskan CLI, lalu storyboard, lalu default preset
const configuredPreset =
  presetArg || data.voicePreset || data.preset || DEFAULT_PRESET;
const configuredVoice = voiceArg || data.voice;
const configuredRate = rateArg || data.voiceRate;
const configuredPitch = pitchArg || data.voicePitch;

const baseVoiceConfig = resolveVoiceConfig({
  preset: configuredPreset,
  voice: configuredVoice,
  rate: configuredRate,
  pitch: configuredPitch,
  normalizeText,
  trimSilence,
  normalizeLoudness,
});

const outDir = path.resolve("public/audio", slug);
fs.mkdirSync(outDir, { recursive: true });

console.log("\n=======================================================");
console.log(`🎬 Audio Generator: "${data.title || slug}" (${slug})`);
console.log(`🎙️ Voice Preset   : ${baseVoiceConfig.preset}`);
console.log(`🗣️ Voice Model    : ${baseVoiceConfig.voice}`);
console.log(`⚡ Speed Rate     : ${baseVoiceConfig.rate}`);
console.log(`🎵 Pitch          : ${baseVoiceConfig.pitch}`);
console.log(`🔌 Provider       : ${providerArg}`);
console.log(`✂️ FFmpeg Trim    : ${trimSilence ? "Aktif" : "Nonaktif"}`);
console.log(`📝 Normalizer     : ${normalizeText ? "Aktif" : "Nonaktif"}`);
console.log(`📂 Output Folder  : ${path.relative(process.cwd(), outDir)}`);
if (dryRun) {
  console.log(`🔍 MODE           : DRY RUN (Hanya simulasi teks lisan)`);
}
console.log("=======================================================\n");

async function main() {
  let totalWordsCount = 0;
  let totalAudioDuration = 0;

  for (let i = 0; i < data.scenes.length; i++) {
    const scene = data.scenes[i];
    const rawText = (scene.narration || scene.caption || "").trim();

    if (!rawText) {
      console.warn(`[Scene ${i + 1}] Tidak memiliki narasi, dilewati.`);
      continue;
    }

    const normalized = normalizeIndonesianText(rawText);
    const spokenText = normalizeText ? normalized : rawText;

    console.log(`-------------------------------------------------------`);
    console.log(`📍 Scene ${i + 1}/${data.scenes.length}: ${scene.id || `scene-${i + 1}`}`);
    console.log(`📖 Teks Asli   : "${rawText}"`);
    if (normalizeText && normalized !== rawText) {
      console.log(`🗣️ Teks Lisan  : "${spokenText}"`);
    }

    if (dryRun) {
      const approxWords = spokenText.split(/\s+/).filter(Boolean).length;
      const approxSec = (approxWords / 165) * 60;
      console.log(`⏱️ Estimasi    : ~${approxWords} kata, ~${approxSec.toFixed(2)} detik`);
      continue;
    }

    const mp3Name = `scene${i + 1}.mp3`;
    const wordsName = `scene${i + 1}.words.json`;
    const mp3Path = path.join(outDir, mp3Name);
    const wordsPath = path.join(outDir, wordsName);
    const rawPath = path.resolve("scripts/out", `${slug}-scene${i + 1}.raw.json`);

    // Konfigurasi spesifik per scene jika ada override di scene
    const sceneVoiceConfig: TtsOptions = {
      ...baseVoiceConfig,
      voice: scene.voice || baseVoiceConfig.voice,
      rate: scene.voiceRate !== undefined ? scene.voiceRate : baseVoiceConfig.rate,
      pitch: scene.voicePitch !== undefined ? scene.voicePitch : baseVoiceConfig.pitch,
    };

    try {
      console.log(`⏳ Mensintesis audio...`);
      const result = await synthesize(
        rawText,
        sceneVoiceConfig,
        mp3Path,
        wordsPath,
        rawPath,
        providerArg,
      );

      console.log(
        `✅ Berhasil: ${result.words} kata, durasi audio ${result.audioSec.toFixed(2)}s` +
          (result.trimmedStartSec ? ` (trim start: ${result.trimmedStartSec.toFixed(3)}s)` : ""),
      );

      totalWordsCount += result.words;
      totalAudioDuration += result.audioSec;

      const words = JSON.parse(fs.readFileSync(wordsPath, "utf-8"));

      // Update data scene di memory tanpa merusak properti lain
      scene.audio = `audio/${slug}/${mp3Name}`;
      // Pacing vertikal TikTok/Reels: berikan buffer jeda lembut ~0.25s di akhir scene
      scene.duration = Math.max(
        2.5,
        Math.ceil(result.audioSec * 10) / 10 + 0.25,
      );
      scene.captions = words.map((w: any) => ({
        text: w.text.trim(),
        startMs: w.startMs,
        endMs: w.endMs,
      }));
      // Simpan words juga untuk kompatibilitas script lama jika dibutuhkan
      scene.words = words;
    } catch (err) {
      console.error(
        `❌ Gagal sintesis Scene ${i + 1}:`,
        err instanceof Error ? err.message : err,
      );
    }
  }

  if (!dryRun) {
    // Perbarui storyboard JSON dengan durasi baru dan captions
    fs.writeFileSync(storyboardPath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`\n=======================================================`);
    console.log(`🎉 Selesai! Berkas storyboard diperbarui:`);
    console.log(`📄 ${storyboardPath}`);
    console.log(`📊 Total Kata     : ${totalWordsCount} kata`);
    console.log(`⏱️ Total Audio    : ${totalAudioDuration.toFixed(2)} detik`);
    console.log(`=======================================================\n`);
  } else {
    console.log(`\n[DRY RUN SELESAI] Tidak ada file yang diubah.`);
  }
}

main().catch((err) => {
  console.error("Kesalahan tak terduga:", err);
  process.exit(1);
});
