import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type WordCaption = {
  text: string;
  startMs: number;
  endMs: number;
};

export const ViralCaptions: React.FC<{
  captions?: WordCaption[];
  fallbackText?: string;
}> = ({ captions = [], fallbackText }) => {
  const frame = useCurrentFrame(); // strictly scene-local frame inside Sequence
  const { fps, width, height } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;
  const u = Math.min(width, height);
  const fontSize = Math.round(u * 0.062);

  if (captions && captions.length > 0) {
    const firstCaptionStart = captions[0].startMs;
    const lastCaptionEnd = captions[captions.length - 1].endMs;

    // Strict boundary: hide before first word starts and after last word ends
    if (currentTimeMs < Math.max(0, firstCaptionStart - 150) || currentTimeMs > lastCaptionEnd + 200) {
      return null;
    }

    // Smart chunking: respect sentence breaks, natural pauses (>350ms), and max 4 words
    const chunks: WordCaption[][] = [];
    let curChunk: WordCaption[] = [];

    for (let i = 0; i < captions.length; i++) {
      const w = captions[i];
      curChunk.push(w);
      const nextWord = captions[i + 1];

      const isPunctuationEnd = /[.!?]$/.test(w.text.trim());
      const isSignificantPause = nextWord && nextWord.startMs - w.endMs > 350;
      const isNewSentenceCapital =
        nextWord && /^[A-Z]/.test(nextWord.text.trim()) && nextWord.startMs - w.endMs > 250;
      const isLengthLimit = curChunk.length >= 4;

      if (isPunctuationEnd || isSignificantPause || isNewSentenceCapital || isLengthLimit) {
        chunks.push(curChunk);
        curChunk = [];
      }
    }
    if (curChunk.length > 0) {
      chunks.push(curChunk);
    }

    // Find the currently active chunk strictly within its time window without lingering
    const activeChunk = chunks.find((chunk) => {
      const chunkStart = chunk[0].startMs - 60;
      const chunkEnd = chunk[chunk.length - 1].endMs + 80;
      return currentTimeMs >= chunkStart && currentTimeMs <= chunkEnd;
    });

    // If in a silent pause between chunks or after speech, leave no remnants
    if (!activeChunk || activeChunk.length === 0) {
      return null;
    }

    return (
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bottom: "16%",
          top: "auto",
          transform: "translateY(50%)",
          height: "auto",
        }}
      >
        <div
          style={{
            maxWidth: width * 0.9,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: `${fontSize * 0.22}px ${fontSize * 0.18}px`,
            padding: `${fontSize * 0.2}px ${fontSize * 0.4}px`,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 900,
            fontSize,
            lineHeight: 1.25,
            textAlign: "center",
          }}
        >
          {activeChunk.map((word, idx) => {
            const isSpoken = currentTimeMs > word.endMs;
            const isActive =
              currentTimeMs >= word.startMs && currentTimeMs <= word.endMs;

            const popScale = isActive
              ? interpolate(
                  currentTimeMs - word.startMs,
                  [0, 80, 160],
                  [1.0, 1.14, 1.06],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                )
              : 1.0;

            return (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  padding: isActive
                    ? `${fontSize * 0.08}px ${fontSize * 0.28}px`
                    : "0 4px",
                  borderRadius: 10,
                  // Signature Red/Pink Pill Highlight for active word (Viral Explainer Style)
                  background: isActive ? "#ff2a5f" : "transparent",
                  color: "#ffffff",
                  transform: `scale(${popScale})`,
                  textShadow: isActive
                    ? "0 2px 14px rgba(255, 42, 95, 0.85)"
                    : isSpoken
                    ? "-2.5px -2.5px 0 #000000, 2.5px -2.5px 0 #000000, -2.5px 2.5px 0 #000000, 2.5px 2.5px 0 #000000, 0 3px 0 #000000"
                    : "-2px -2px 0 rgba(0,0,0,0.65), 2px -2px 0 rgba(0,0,0,0.65), -2px 2px 0 rgba(0,0,0,0.65), 2px 2px 0 rgba(0,0,0,0.65)",
                  boxShadow: isActive ? "0 4px 18px rgba(255, 42, 95, 0.5)" : "none",
                  opacity: isActive ? 1 : isSpoken ? 0.95 : 0.7,
                }}
              >
                {word.text.trim()}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  if (fallbackText) {
    return (
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bottom: "16%",
          top: "auto",
          transform: "translateY(50%)",
          height: "auto",
        }}
      >
        <div
          style={{
            maxWidth: width * 0.85,
            padding: `${fontSize * 0.25}px ${fontSize * 0.45}px`,
            color: "#ffffff",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize,
            textAlign: "center",
            textShadow:
              "-2.5px -2.5px 0 #1a1a1a, 2.5px -2.5px 0 #1a1a1a, -2.5px 2.5px 0 #1a1a1a, 2.5px 2.5px 0 #1a1a1a, 0 4px 0 #1a1a1a",
          }}
        >
          {fallbackText}
        </div>
      </AbsoluteFill>
    );
  }

  return null;
};
