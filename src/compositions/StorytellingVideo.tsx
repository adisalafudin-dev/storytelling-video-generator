/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import defaultStoryboard from "../data/storyboard.json";
import { EditorialStage, EditorialTheme } from "../components/2d/EditorialStage";
import { FactHeroCard, FactCardData } from "../components/2d/FactHeroCard";
import { Diagram2D, DiagramType } from "../components/2d/Diagram2D";
import { World2D, WorldEnvironment } from "../components/2d/World2D";
import {
  NarratorCharacter,
  CharacterRole,
  CharacterGesture,
} from "../components/2d/NarratorCharacter";
import { ViralCaptions, WordCaption } from "../components/2d/ViralCaptions";
import { InfoCard, InfoCardData } from "../components/2d/InfoCard";
import { CalloutLabel, CalloutLabelData } from "../components/2d/CalloutLabel";
import { StylizedScene } from "../components/3d/StylizedScene";
import { Models } from "../components/3d/Models";

export type StoryboardData = typeof defaultStoryboard;

export const StorytellingVideo: React.FC<{
  storyboard?: StoryboardData;
}> = ({ storyboard = defaultStoryboard }) => {
  const { fps } = useVideoConfig();
  const rawStoryboard = storyboard as any;
  const scenes = rawStoryboard.scenes;
  const transitionDurationFrames = 12;

  const zoomDirections: ("in" | "out" | "pan")[] = ["in", "out", "pan"];

  // BGM Configuration: support custom BGM path, disable ("none" or false), and adjustable low volume
  const bgmConfig = rawStoryboard.bgm;
  const isBgmDisabled = bgmConfig === "none" || bgmConfig === false;
  const bgmSrc =
    typeof bgmConfig === "string" && bgmConfig.length > 0
      ? bgmConfig
      : "audio/bgm/ambient-mystery.mp3";
  const baseBgmVolume = rawStoryboard.bgmVolume ?? 0.10;

  return (
    <AbsoluteFill style={{ backgroundColor: "#070B14" }}>
      {/* 1. Continuous Cinematic Ambient Mystery BGM across entire video (Soft Volume ~0.10 to prevent clashing) */}
      {!isBgmDisabled && (
        <Audio
          src={staticFile(bgmSrc)}
          volume={(f) => {
            const totalFrames = scenes.reduce(
              (acc: number, s: any) =>
                acc + Math.round(s.duration * fps),
              0,
            );
            if (f < 30) return (f / 30) * baseBgmVolume;
            if (f > totalFrames - 45) {
              return Math.max(0, ((totalFrames - f) / 45) * baseBgmVolume);
            }
            return baseBgmVolume;
          }}
        />
      )}

      <TransitionSeries>
        {scenes.flatMap((scene: any, index: number) => {
          const durationInFrames = Math.max(1, Math.round(scene.duration * fps));
          const items: React.ReactElement[] = [];

          // Transition between scenes
          if (index > 0) {
            items.push(
              <TransitionSeries.Transition
                key={`trans-${index}`}
                presentation={fade()}
                timing={linearTiming({ durationInFrames: transitionDurationFrames })}
              />
            );
          }

          const zoomDirection = zoomDirections[index % zoomDirections.length];
          const is3DScene = Boolean(scene.camera && scene.model);

          // Main Scene Sequence
          items.push(
            <TransitionSeries.Sequence
              key={`scene-${scene.id || index}`}
              durationInFrames={durationInFrames}
            >
              {is3DScene ? (
                <AbsoluteFill style={{ background: scene.background || "#000000" }}>
                  {/* 3D Scene Layer */}
                  <StylizedScene
                    camera={{
                      start: scene.camera.start as [number, number, number],
                      end: scene.camera.end as [number, number, number],
                      ease:
                        (scene.camera.ease as
                          | "linear"
                          | "ease-in"
                          | "ease-out"
                          | "ease-in-out") || "ease-in-out",
                      lookAt: scene.camera.lookAt as [number, number, number] | undefined,
                      lookAtEnd: scene.camera.lookAtEnd as [number, number, number] | undefined,
                    }}
                  >
                    <Models
                      type={scene.model.type}
                      rotationSpeed={scene.model.rotationSpeed}
                    />
                  </StylizedScene>

                  {/* 2D Info Card Overlay */}
                  {scene.infoCard && (
                    <InfoCard data={scene.infoCard as unknown as InfoCardData} />
                  )}

                  {/* 2D Callout Label */}
                  {scene.callout && (
                    <CalloutLabel data={scene.callout as unknown as CalloutLabelData} />
                  )}
                </AbsoluteFill>
              ) : (
                <EditorialStage
                  theme={(scene.theme as EditorialTheme) || "world"}
                  nicheTag={scene.nicheTag || "SEJARAH & DUNIA"}
                  zoomDirection={zoomDirection}
                  showGrid={scene.showGrid ?? rawStoryboard.showGrid ?? true}
                  showWatermark={scene.showWatermark ?? rawStoryboard.showWatermark ?? true}
                >
                  {/* 2D World Environment with textured background & lighting */}
                  {"world" in scene && Boolean(scene.world) && (
                    <World2D
                      environment={
                        (scene.world as { environment: WorldEnvironment }).environment
                      }
                    />
                  )}

                  {/* 2D Fact Hero Card (Top Area) */}
                  {scene.heroCard && (
                    <FactHeroCard data={scene.heroCard as unknown as FactCardData} />
                  )}

                  {/* 2D Animated Character (Narrator, Da Vinci, Guard, etc.) */}
                  {"character" in scene && Boolean(scene.character) && (
                    <NarratorCharacter
                      role={(scene.character as { role: CharacterRole }).role}
                      gesture={(scene.character as { gesture: CharacterGesture }).gesture}
                      position={
                        (scene.character as { position?: "left" | "right" | "center" })
                          .position || "right"
                      }
                      scale={(scene.character as { scale?: number }).scale || 1.0}
                      isSpeaking={true}
                    />
                  )}

                  {/* 2D Diagram / Vector Illustration fallback if present */}
                  {"diagram" in scene && Boolean(scene.diagram) && (
                    <Diagram2D
                      type={(scene as { diagram: { type: DiagramType } }).diagram.type}
                    />
                  )}

                  {/* 2D Info Card Overlay */}
                  {scene.infoCard && (
                    <InfoCard data={scene.infoCard as unknown as InfoCardData} />
                  )}

                  {/* 2D Callout Label */}
                  {scene.callout && (
                    <CalloutLabel data={scene.callout as unknown as CalloutLabelData} />
                  )}
                </EditorialStage>
              )}

              {/* Overlays & Audios strictly scoped inside this Scene's timeframe */}
              <Sequence layout="none" durationInFrames={durationInFrames}>
                {/* Subtle Sound Effects (Light SFX balanced so they never overpower voiceover) */}
                {scene.sfx !== false && (
                  <>
                    {/* Scene Transition Whoosh SFX at frame 0 */}
                    <Sequence durationInFrames={12} layout="none">
                      <Audio
                        src={staticFile(scene.sfx?.whooshSrc || "audio/sfx/whoosh.mp3")}
                        volume={scene.sfx?.whooshVolume ?? 0.22}
                      />
                    </Sequence>

                    {/* Pop SFX when Card enters */}
                    <Sequence from={4} durationInFrames={8} layout="none">
                      <Audio
                        src={staticFile(scene.sfx?.popSrc || "audio/sfx/pop.mp3")}
                        volume={scene.sfx?.popVolume ?? 0.20}
                      />
                    </Sequence>

                    {/* Climax Chime SFX in Scene 4 & 5 or explicit scene.sfx.chime */}
                    {(scene.sfx?.chime || index === 3 || index === 4) && (
                      <Sequence from={18} durationInFrames={36} layout="none">
                        <Audio
                          src={staticFile(scene.sfx?.chimeSrc || "audio/sfx/chime.mp3")}
                          volume={scene.sfx?.chimeVolume ?? 0.22}
                        />
                      </Sequence>
                    )}
                  </>
                )}

                {/* Viral Subtitles (Safe bottom zone 16%) */}
                {scene.captions && (
                  <ViralCaptions captions={scene.captions as unknown as WordCaption[]} />
                )}

                {/* Voiceover Audio with customizable volume */}
                {"audio" in scene && Boolean(scene.audio) && (
                  <Audio
                    src={staticFile(scene.audio as string)}
                    volume={scene.audioVolume ?? 1.0}
                  />
                )}
              </Sequence>
            </TransitionSeries.Sequence>
          );

          return items;
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
