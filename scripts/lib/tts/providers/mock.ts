import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { Caption } from "@remotion/captions";
import { isFfmpegAvailable } from "../../audio-postprocess";
import type { TtsOptions, TtsProvider, TtsResult } from "../types";

export class MockTtsProvider implements TtsProvider {
  readonly name = "mock";

  async synthesize(
    text: string,
    options: TtsOptions,
    mp3Path: string,
    wordsPath: string,
  ): Promise<TtsResult> {
    const words = text.split(/\s+/).filter(Boolean);
    // Asumsi ~165 wpm = ~360ms per kata
    const msPerWord = 360;
    const captions: Caption[] = [];

    let cursor = 80;
    for (const w of words) {
      const dur = Math.max(200, Math.round((w.length / 5) * msPerWord));
      const startMs = cursor;
      const endMs = startMs + dur;
      captions.push({
        text: ` ${w}`,
        startMs,
        endMs,
        timestampMs: Math.round((startMs + endMs) / 2),
        confidence: 1,
      });
      cursor = endMs + 40;
    }

    const totalSec = Math.max(1, (cursor + 150) / 1000);

    fs.mkdirSync(path.dirname(mp3Path), { recursive: true });
    if (isFfmpegAvailable()) {
      execSync(
        `ffmpeg -y -f lavfi -i anullsrc=r=24000:cl=mono -t ${totalSec.toFixed(2)} -c:a libmp3lame -b:a 96k "${mp3Path}"`,
        { stdio: "ignore" },
      );
    } else {
      // Dummy MP3 frame fallback jika ffmpeg tidak ada
      fs.writeFileSync(mp3Path, Buffer.alloc(1024, 0));
    }

    fs.mkdirSync(path.dirname(wordsPath), { recursive: true });
    fs.writeFileSync(wordsPath, JSON.stringify(captions, null, 2), "utf8");

    return {
      mode: "sentence-estimate",
      words: captions.length,
      lastEndSec: (cursor - 40) / 1000,
      audioSec: totalSec,
      trimmedStartSec: 0,
      trimmedEndSec: 0,
      captions,
    };
  }
}
