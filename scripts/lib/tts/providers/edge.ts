import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { edgeMetadataToCaptions } from "../../edge-words";
import { postProcessAudio } from "../../audio-postprocess";
import type { TtsOptions, TtsProvider, TtsResult } from "../types";

export class EdgeTtsProvider implements TtsProvider {
  readonly name = "edge";

  async synthesize(
    text: string,
    options: TtsOptions,
    mp3Path: string,
    wordsPath: string,
    rawPath?: string,
  ): Promise<TtsResult> {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "tts-edge-"));
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(
        options.voice,
        OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3,
        {
          wordBoundaryEnabled: true,
          sentenceBoundaryEnabled: true,
        },
      );

      const prosody: Record<string, any> = {};
      if (options.rate !== undefined) prosody.rate = options.rate;
      if (options.pitch !== undefined) prosody.pitch = options.pitch;
      if (options.volume !== undefined) prosody.volume = options.volume;

      const { audioFilePath, metadataFilePath } = await tts.toFile(
        tmp,
        text,
        prosody,
      );
      tts.close();

      if (!metadataFilePath) {
        throw new Error("Layanan TTS Edge tidak mengembalikan berkas metadata.");
      }

      fs.mkdirSync(path.dirname(mp3Path), { recursive: true });
      fs.copyFileSync(audioFilePath, mp3Path);

      if (rawPath) {
        fs.mkdirSync(path.dirname(rawPath), { recursive: true });
        fs.copyFileSync(metadataFilePath, rawPath);
      }

      const metadata = JSON.parse(fs.readFileSync(metadataFilePath, "utf8"));
      const { captions: initialCaptions, mode } =
        edgeMetadataToCaptions(metadata);

      // Pemangkasan jeda hening dan penyelarasan waktu kata dengan FFmpeg
      const processed = postProcessAudio(mp3Path, initialCaptions, {
        trimSilence: options.trimSilence ?? true,
        leadBufferMs: options.leadBufferMs ?? 60,
        tailBufferMs: options.tailBufferMs ?? 180,
        normalizeLoudness: options.normalizeLoudness ?? true,
      });

      fs.mkdirSync(path.dirname(wordsPath), { recursive: true });
      fs.writeFileSync(
        wordsPath,
        JSON.stringify(processed.captions, null, 2),
        "utf8",
      );

      const finalCaptions = processed.captions;
      const lastEndSec =
        finalCaptions.length > 0
          ? finalCaptions[finalCaptions.length - 1].endMs / 1000
          : processed.audioSec;

      return {
        mode,
        words: finalCaptions.length,
        lastEndSec,
        audioSec: processed.audioSec,
        trimmedStartSec: processed.trimmedStartSec,
        trimmedEndSec: processed.trimmedEndSec,
        captions: finalCaptions,
      };
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
}
