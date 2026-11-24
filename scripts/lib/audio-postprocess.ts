import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { Caption } from "@remotion/captions";

let ffmpegChecked: boolean | null = null;

export function isFfmpegAvailable(): boolean {
  if (ffmpegChecked !== null) return ffmpegChecked;
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    ffmpegChecked = true;
  } catch {
    ffmpegChecked = false;
  }
  return ffmpegChecked;
}

/**
 * Mengambil durasi file audio dalam detik menggunakan ffprobe.
 * Fallback ke perkiraan bitrate jika ffprobe tidak tersedia.
 */
export function getAudioDuration(audioPath: string): number {
  if (!fs.existsSync(audioPath)) return 0;

  try {
    const cmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`;
    const out = execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    const dur = parseFloat(out);
    if (!isNaN(dur) && dur > 0) return dur;
  } catch {
    // ffprobe failed, fallback to file size
  }

  // Fallback: MP3 96kbps / 128kbps estimation
  const stat = fs.statSync(audioPath);
  return (stat.size * 8) / (96 * 1000);
}

export type AudioProcessOptions = {
  trimSilence?: boolean;
  leadBufferMs?: number; // buffer sebelum kata pertama (default: 60ms)
  tailBufferMs?: number; // buffer setelah kata terakhir (default: 180ms)
  normalizeLoudness?: boolean; // filter loudnorm untuk suara punchy mobile
};

export type ProcessedAudioResult = {
  audioSec: number;
  captions: Caption[];
  trimmedStartSec: number;
  trimmedEndSec: number;
};

/**
 * Memangkas jeda hening berlebih di awal & akhir audio serta menyelaraskan
 * word-level timestamps sehingga sinkron sempurna dengan <ViralCaptions/>.
 */
export function postProcessAudio(
  audioPath: string,
  captions: Caption[],
  options: AudioProcessOptions = {},
): ProcessedAudioResult {
  const {
    trimSilence = true,
    leadBufferMs = 60,
    tailBufferMs = 180,
    normalizeLoudness = true,
  } = options;

  const originalDur = getAudioDuration(audioPath);

  if (!trimSilence || !isFfmpegAvailable() || !captions || captions.length === 0) {
    return {
      audioSec: originalDur,
      captions,
      trimmedStartSec: 0,
      trimmedEndSec: 0,
    };
  }

  const firstWordStartMs = captions[0].startMs;
  const lastWordEndMs = captions[captions.length - 1].endMs;
  const totalAudioMs = Math.round(originalDur * 1000);

  const leadTrimMs = Math.max(0, firstWordStartMs - leadBufferMs);
  const targetEndMs = Math.min(totalAudioMs, lastWordEndMs + tailBufferMs);
  const tailTrimMs = Math.max(0, totalAudioMs - targetEndMs);

  const leadTrimSec = leadTrimMs / 1000;
  const targetEndSec = targetEndMs / 1000;

  // Jika selisih hening sangat kecil (<35ms di awal dan <60ms di akhir), lewati pemotongan
  if (leadTrimMs < 35 && tailTrimMs < 60 && !normalizeLoudness) {
    return {
      audioSec: originalDur,
      captions,
      trimmedStartSec: 0,
      trimmedEndSec: 0,
    };
  }

  const tmpOut = path.join(
    path.dirname(audioPath),
    `temp_${Date.now()}_${path.basename(audioPath)}`,
  );

  try {
    const audioFilter = normalizeLoudness
      ? `-af "loudnorm=I=-16:TP=-1.5:LRA=11"`
      : "";

    const cmd = `ffmpeg -y -ss ${leadTrimSec.toFixed(3)} -to ${targetEndSec.toFixed(3)} -i "${audioPath}" ${audioFilter} -c:a libmp3lame -b:a 128k "${tmpOut}"`;
    execSync(cmd, { stdio: "ignore" });

    if (fs.existsSync(tmpOut) && fs.statSync(tmpOut).size > 1024) {
      fs.copyFileSync(tmpOut, audioPath);
      fs.unlinkSync(tmpOut);
    }
  } catch (err) {
    if (fs.existsSync(tmpOut)) {
      try {
        fs.unlinkSync(tmpOut);
      } catch {}
    }
    console.warn(`[audio-postprocess] FFmpeg warning:`, err);
    // Kembalikan audio asli jika terjadi kendala pemrosesan
    return {
      audioSec: originalDur,
      captions,
      trimmedStartSec: 0,
      trimmedEndSec: 0,
    };
  }

  // Hitung ulang durasi pasti setelah pemangkasan
  const finalDur = getAudioDuration(audioPath);

  // Geser seluruh timestamp kata sesuai waktu yang dipangkas di awal
  const adjustedCaptions: Caption[] = captions.map((c) => {
    const startMs = Math.max(0, Math.round(c.startMs - leadTrimMs));
    const endMs = Math.max(startMs + 50, Math.round(c.endMs - leadTrimMs));
    return {
      ...c,
      startMs,
      endMs,
      timestampMs: Math.round((startMs + endMs) / 2),
    };
  });

  return {
    audioSec: finalDur,
    captions: adjustedCaptions,
    trimmedStartSec: leadTrimSec,
    trimmedEndSec: tailTrimMs / 1000,
  };
}
