import type { Caption } from "@remotion/captions";

export type TtsOptions = {
  voice: string;
  rate?: string | number; // e.g. "+16%", 1.15
  pitch?: string; // e.g. "+0Hz", "+2Hz"
  volume?: string | number;
  preset?: string;
  normalizeText?: boolean;
  trimSilence?: boolean;
  leadBufferMs?: number;
  tailBufferMs?: number;
  normalizeLoudness?: boolean;
};

export type TtsResult = {
  mode: "word" | "sentence-estimate";
  words: number;
  lastEndSec: number;
  audioSec: number;
  trimmedStartSec?: number;
  trimmedEndSec?: number;
  normalizedText?: string;
  captions?: Caption[];
};

export interface TtsProvider {
  readonly name: string;
  synthesize(
    text: string,
    options: TtsOptions,
    mp3Path: string,
    wordsPath: string,
    rawPath?: string,
  ): Promise<TtsResult>;
}
