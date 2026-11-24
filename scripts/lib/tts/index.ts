import { normalizeIndonesianText } from "../normalizer-id";
import { resolveVoiceConfig } from "./presets";
import { EdgeTtsProvider } from "./providers/edge";
import { MockTtsProvider } from "./providers/mock";
import type { TtsOptions, TtsProvider, TtsResult } from "./types";

export * from "./types";
export * from "./presets";

const providers: Map<string, TtsProvider> = new Map();

// Daftarkan provider bawaan
const edge = new EdgeTtsProvider();
const mock = new MockTtsProvider();
providers.set(edge.name, edge);
providers.set(mock.name, mock);

/**
 * Daftarkan provider kustom TTS baru (misal: ElevenLabs, OpenAI TTS, dsb.)
 */
export function registerProvider(name: string, provider: TtsProvider): void {
  providers.set(name.toLowerCase(), provider);
}

/**
 * Ambil provider TTS berdasarkan nama (default: "edge")
 */
export function getProvider(name = "edge"): TtsProvider {
  const p = providers.get(name.toLowerCase());
  if (!p) {
    const available = Array.from(providers.keys()).join(", ");
    throw new Error(
      `TTS Provider "${name}" tidak ditemukan. Provider yang tersedia: ${available}`,
    );
  }
  return p;
}

/**
 * Fungsi utama sintesis TTS.
 * Mendukung opsi lengkap (TtsOptions) maupun string suara untuk kompatibilitas ke belakang.
 */
export async function synthesize(
  text: string,
  voiceOrOptions: string | Partial<TtsOptions>,
  mp3Path: string,
  wordsPath: string,
  rawPath?: string,
  providerName = "edge",
): Promise<TtsResult> {
  const opts: TtsOptions =
    typeof voiceOrOptions === "string"
      ? resolveVoiceConfig({ voice: voiceOrOptions })
      : resolveVoiceConfig(voiceOrOptions);

  // Normalisasi teks bahasa Indonesia sebelum dikirim ke TTS engine
  const normalizedText =
    opts.normalizeText !== false ? normalizeIndonesianText(text) : text;

  const provider = getProvider(providerName);
  const result = await provider.synthesize(
    normalizedText,
    opts,
    mp3Path,
    wordsPath,
    rawPath,
  );

  return {
    ...result,
    normalizedText,
  };
}
