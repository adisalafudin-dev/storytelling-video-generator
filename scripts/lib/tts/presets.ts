import type { TtsOptions } from "./types";

export type VoicePreset = {
  name: string;
  voice: string;
  rate: string;
  pitch: string;
  description: string;
};

export const VOICE_PRESETS: Record<string, VoicePreset> = {
  "gadis-fast": {
    name: "gadis-fast",
    voice: "id-ID-GadisNeural",
    rate: "+18%",
    pitch: "+0Hz",
    description: "Wanita energik & cepat (~170 wpm), sangat cocok untuk hook viral & fakta menarik",
  },
  "gadis-punchy": {
    name: "gadis-punchy",
    voice: "id-ID-GadisNeural",
    rate: "+18%",
    pitch: "+0Hz",
    description: "Wanita punchy (identik dengan gadis-fast)",
  },
  "gadis-natural": {
    name: "gadis-natural",
    voice: "id-ID-GadisNeural",
    rate: "+8%",
    pitch: "+0Hz",
    description: "Wanita santai, ramah & artikulasi jernih (~150 wpm)",
  },
  "ardi-punchy": {
    name: "ardi-punchy",
    voice: "id-ID-ArdiNeural",
    rate: "+16%",
    pitch: "+0Hz",
    description: "Pria tegas, dinamis & punchy (~165 wpm), sangat pas untuk explainer & misteri sejarah",
  },
  "ardi-fast": {
    name: "ardi-fast",
    voice: "id-ID-ArdiNeural",
    rate: "+18%",
    pitch: "+0Hz",
    description: "Pria tempo cepat (~170 wpm)",
  },
  "ardi-calm": {
    name: "ardi-calm",
    voice: "id-ID-ArdiNeural",
    rate: "+0%",
    pitch: "-1Hz",
    description: "Pria tenang, santai & naratif",
  },
  "ardi-deep": {
    name: "ardi-deep",
    voice: "id-ID-ArdiNeural",
    rate: "+6%",
    pitch: "-2Hz",
    description: "Pria sinematik dokumenter dengan nada lebih berat",
  },
};

export const DEFAULT_PRESET = "ardi-punchy";

/**
 * Menyelesaikan konfigurasi suara dari preset, konfigurasi parsial, atau fallback default.
 */
export function resolveVoiceConfig(
  input?: Partial<TtsOptions> & { preset?: string },
): TtsOptions {
  const presetKey = input?.preset ? input.preset.toLowerCase() : undefined;
  const basePreset = presetKey && VOICE_PRESETS[presetKey]
    ? VOICE_PRESETS[presetKey]
    : VOICE_PRESETS[DEFAULT_PRESET];

  return {
    voice: input?.voice || basePreset.voice,
    rate: input?.rate !== undefined ? input.rate : basePreset.rate,
    pitch: input?.pitch !== undefined ? input.pitch : basePreset.pitch,
    volume: input?.volume ?? "default",
    preset: presetKey || basePreset.name,
    normalizeText: input?.normalizeText ?? true,
    trimSilence: input?.trimSilence ?? true,
    leadBufferMs: input?.leadBufferMs ?? 60,
    tailBufferMs: input?.tailBufferMs ?? 180,
    normalizeLoudness: input?.normalizeLoudness ?? true,
  };
}
