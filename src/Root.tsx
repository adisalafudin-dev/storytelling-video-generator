import React from "react";
import { Composition } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { z } from "zod";
import { ScriptVideo } from "./compositions/ScriptVideo";
import { StorytellingVideo } from "./compositions/StorytellingVideo";
import pertaliteVsPertamaxJson from "./data/stories/pertalite-vs-pertamax.json";
import iphoneUmpJson from "./data/stories/iphone-ump-id-2d.json";
import iphoneCharacterStoryJson from "./data/stories/iphone-ump-id-story.json";
import iphoneWorldJson from "./data/stories/iphone-ump-id-world.json";
import iphoneRealJson from "./data/stories/iphone-ump-id-real.json";
import iphoneStoryV3Json from "./data/stories/iphone-ump-id-story-v3.json";
import iphoneStoryV4Json from "./data/stories/iphone-ump-id-story-v4.json";
import iphoneStoryV5Json from "./data/stories/iphone-ump-id-story-v5.json";
import iphoneStoryV6Json from "./data/stories/iphone-ump-id-story-v6.json";
import iphoneStoryV7Json from "./data/stories/iphone-ump-id-story-v7.json";
import iphoneStoryV8Json from "./data/stories/iphone-ump-id-story-v8.json";
import bocoranUangStoryV1Json from "./data/stories/bocoran-uang-bulanan-story-v1.json";
import kenapaCicilanStoryV1Json from "./data/stories/kenapa-cicilan-kecil-menjebak-story-v1.json";
import tidurDelapanJamStoryV1Json from "./data/stories/tidur-delapan-jam-tapi-masih-capek-story-v1.json";
import overthinkingHabisNgobrolStoryV1Json from "./data/stories/overthinking-habis-ngobrol-story-v1.json";

// Dynamic import of story JSONs (multi‑story architecture) using webpack's require.context
const requireContext = typeof (require as any).context === "function"
  ? (require as any).context('./data/stories', false, /\.json$/)
  : null;
const storyModules: Record<string, any> = requireContext
  ? requireContext.keys().reduce((acc: Record<string, any>, key: string) => {
      acc[key] = requireContext(key);
      return acc;
    }, {} as Record<string, any>)
  : { "./pertalite-vs-pertamax.json": pertaliteVsPertamaxJson };

import type { Storyboard } from "./script/types";
import { totalFrames } from "./script/timing";

// Use first story as default for legacy compositions
const defaultStory = Object.values(storyModules)[0] || pertaliteVsPertamaxJson;
const storyboard = defaultStory as unknown as Storyboard;
// Keep a variable name expected by older code
const newStoryboardJson = defaultStory || pertaliteVsPertamaxJson;

type Props = { storyboard: Storyboard };

const calculateMetadata: CalculateMetadataFunction<Props> = ({ props }) => ({
  durationInFrames: Math.max(1, totalFrames(props.storyboard)),
  fps: props.storyboard.fps,
  width: props.storyboard.width,
  height: props.storyboard.height,
});

const ScriptVideoSchema = z.object({
  storyboard: z.object({
    title: z.string(),
    chapter: z.string().optional(),
    fps: z.number(),
    width: z.number(),
    height: z.number(),
    scenes: z.array(
      z.object({
        title: z.string(),
        duration: z.preprocess(
          (val) =>
            typeof val === "string"
              ? val.trim() === "auto"
                ? "auto"
                : Number(val)
              : val,
          z.union([z.number(), z.literal("auto")]),
        ),
        shape: z.enum(["box", "sphere", "torus", "model"]),
        model: z.string().optional(),
        animation: z.union([z.string(), z.number()]).optional(),
        animationSpeed: z.number(),
        modelRotate: z.boolean(),
        color: z.string(),
        rotationSpeed: z.number(),
        camera: z.array(z.number()),
        cameraTo: z.array(z.number()).optional(),
        cameraEase: z.enum(["linear", "ease-in", "ease-out", "ease-in-out"]),
        // eslint-disable-next-line @remotion/non-pure-animation
        transition: z.enum(["none", "fade", "slide", "wipe"]),
        transitionDuration: z.number(),
        audio: z.string().optional(),
        audioVolume: z.number(),
        background: z.string(),
        theme: z.enum(["space", "farm", "city", "ocean", "forest", "desert", "indoor", "lab", "highway"]).optional(),
        themeDetail: z.enum(["low", "high"]),
        time: z.enum(["dawn", "day", "dusk", "night"]),
        weather: z.enum(["clear", "rain", "fog", "snow", "dust"]),
        motion: z.array(
          z.object({
            start: z.number(),
            end: z.number(),
            preset: z.enum(["fall-into", "launch", "fly-to", "drive", "orbit", "float"]),
            target: z.array(z.number()).optional(),
            from: z.array(z.number()).optional(),
            ease: z.enum(["linear", "ease-in", "ease-out", "ease-in-out"]),
            turns: z.number(),
            tumble: z.number(),
            loop: z.boolean(),
          }),
        ),
        poses: z.array(
          z.object({
            start: z.number(),
            end: z.number(),
            style: z.enum(["flail", "float", "run", "wave"]),
            amount: z.number(),
            fallbackTumble: z.boolean(),
          }),
        ),
        props: z.array(
          z.discriminatedUnion("type", [
            z.object({ type: z.literal("planet"), color: z.string(), radius: z.number(), pos: z.array(z.number()), ring: z.boolean() }),
            z.object({ type: z.literal("blackhole"), radius: z.number(), pos: z.array(z.number()) }),
          ]),
        ),
        caption: z.string(),
        words: z.array(
          z.object({
            text: z.string(),
            startMs: z.number(),
            endMs: z.number(),
            timestampMs: z.number().nullable(),
            confidence: z.number().nullable(),
          }),
        ).optional(),
        cameraKeys: z.array(
          z.object({
            time: z.number(),
            pos: z.array(z.number()),
            ease: z.enum(["linear", "ease-in", "ease-out", "ease-in-out"]),
          }),
        ).optional(),
        beats: z.array(
          z.object({
            type: z.enum(["title", "tag", "badge", "quote", "stat", "checklist", "callout"]),
            start: z.number(),
            end: z.number(),
            text: z.string().optional(),
            eyebrow: z.string().optional(),
            by: z.string().optional(),
            value: z.string().optional(),
            label: z.string().optional(),
            items: z.array(z.string()).optional(),
            x: z.number().optional(),
            y: z.number().optional(),
            at: z.array(z.number()).optional(),
          }),
        ).optional(),
        kit: z.enum(["layers", "road", "flow"]).optional(),
        kitParts: z.array(
          z.object({
            type: z.enum(["layer", "rain", "car", "node", "link"]),
            name: z.string().optional(),
            id: z.string().optional(),
            label: z.string().optional(),
            pos: z.array(z.number()).optional(),
            shape: z.enum(["box", "sphere"]).optional(),
            model: z.string().optional(),
            rotation: z.array(z.number()).optional(),
            from: z.string().optional(),
            to: z.string().optional(),
            color: z.string().optional(),
            thickness: z.number().optional(),
            intensity: z.number().optional(),
          }),
        ).optional(),
        kitActions: z.array(
          z.object({
            type: z.enum(["explode", "highlight", "drive", "rain", "focus", "send"]),
            start: z.number(),
            end: z.number(),
            amount: z.number().optional(),
            layer: z.string().optional(),
            node: z.string().optional(),
            from: z.string().optional(),
            to: z.union([z.number(), z.string()]).optional(),
            intensity: z.number().optional(),
          }),
        ).optional(),
      }),
    ),
  }),
});

export const RemotionRoot: React.FC = () => {
  const calcStorytellingFrames = (data: any) => {
    const fps = data.fps || 30;
    const transitionFrames = 12;
    const totalSceneFrames = data.scenes.reduce(
      (acc: number, scene: any) => acc + Math.round(scene.duration * fps),
      0,
    );
    const totalOverlap = Math.max(0, data.scenes.length - 1) * transitionFrames;
    return Math.max(1, totalSceneFrames - totalOverlap);
  };

  const compositions: React.ReactElement[] = [];

  // Register each story as its own composition
  Object.entries(storyModules).forEach(([path, mod]) => {
    const slug = path.replace(/^\.\//, "").replace(/\.json$/, "");
    const storyData = mod as any;
    const duration = calcStorytellingFrames(storyData);
    compositions.push(
      <Composition
        key={slug}
        id={`Story-${slug}`}
        component={StorytellingVideo}
        fps={storyData.fps || 30}
        width={storyData.width || 1080}
        height={storyData.height || 1920}
        durationInFrames={duration}
        defaultProps={{ storyboard: storyData }}
      />,
    );
  });

  // Default legacy compositions (kept for compatibility)
  const storytellingDuration = calcStorytellingFrames(newStoryboardJson);
  return (
    <>
      {compositions}
      <Composition
        id="OverthinkingHabisNgobrolStoryV1"
        component={StorytellingVideo}
        fps={overthinkingHabisNgobrolStoryV1Json.fps || 30}
        width={overthinkingHabisNgobrolStoryV1Json.width || 1080}
        height={overthinkingHabisNgobrolStoryV1Json.height || 1920}
        durationInFrames={calcStorytellingFrames(overthinkingHabisNgobrolStoryV1Json)}
        defaultProps={{
          storyboard: overthinkingHabisNgobrolStoryV1Json as any,
        }}
      />
      <Composition
        id="TidurDelapanJamTapiMasihCapekStoryV1"
        component={StorytellingVideo}
        fps={tidurDelapanJamStoryV1Json.fps || 30}
        width={tidurDelapanJamStoryV1Json.width || 1080}
        height={tidurDelapanJamStoryV1Json.height || 1920}
        durationInFrames={calcStorytellingFrames(tidurDelapanJamStoryV1Json)}
        defaultProps={{
          storyboard: tidurDelapanJamStoryV1Json as any,
        }}
      />
      <Composition
        id="KenapaCicilanKecilMenjebakStoryV1"
        component={StorytellingVideo}
        fps={kenapaCicilanStoryV1Json.fps || 30}
        width={kenapaCicilanStoryV1Json.width || 1080}
        height={kenapaCicilanStoryV1Json.height || 1920}
        durationInFrames={calcStorytellingFrames(kenapaCicilanStoryV1Json)}
        defaultProps={{
          storyboard: kenapaCicilanStoryV1Json as any,
        }}
      />
      <Composition
        id="BocoranUangBulananStoryV1"
        component={StorytellingVideo}
        fps={bocoranUangStoryV1Json.fps || 30}
        width={bocoranUangStoryV1Json.width || 1080}
        height={bocoranUangStoryV1Json.height || 1920}
        durationInFrames={calcStorytellingFrames(bocoranUangStoryV1Json)}
        defaultProps={{
          storyboard: bocoranUangStoryV1Json as any,
        }}
      />
      <Composition
        id="IphoneUmpIdStoryV8"
        component={StorytellingVideo}
        fps={iphoneStoryV8Json.fps || 30}
        width={iphoneStoryV8Json.width || 1080}
        height={iphoneStoryV8Json.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneStoryV8Json)}
        defaultProps={{
          storyboard: iphoneStoryV8Json as any,
        }}
      />
      <Composition
        id="IphoneUmpIdStoryV7"
        component={StorytellingVideo}
        fps={iphoneStoryV7Json.fps || 30}
        width={iphoneStoryV7Json.width || 1080}
        height={iphoneStoryV7Json.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneStoryV7Json)}
        defaultProps={{
          storyboard: iphoneStoryV7Json as any,
        }}
      />
      <Composition
        id="IphoneUmpIdStoryV6"
        component={StorytellingVideo}
        fps={iphoneStoryV6Json.fps || 30}
        width={iphoneStoryV6Json.width || 1080}
        height={iphoneStoryV6Json.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneStoryV6Json)}
        defaultProps={{
          storyboard: iphoneStoryV6Json as any,
        }}
      />
      <Composition
        id="IphoneUmpIdStoryV5"
        component={StorytellingVideo}
        fps={iphoneStoryV5Json.fps || 30}
        width={iphoneStoryV5Json.width || 1080}
        height={iphoneStoryV5Json.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneStoryV5Json)}
        defaultProps={{
          storyboard: iphoneStoryV5Json as any,
        }}
      />
      <Composition
        id="IphoneUmpIdStoryV4"
        component={StorytellingVideo}
        fps={iphoneStoryV4Json.fps || 30}
        width={iphoneStoryV4Json.width || 1080}
        height={iphoneStoryV4Json.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneStoryV4Json)}
        defaultProps={{
          storyboard: iphoneStoryV4Json as any,
        }}
      />
      <Composition
        id="IphoneUmpIdStoryV3"
        component={StorytellingVideo}
        fps={iphoneStoryV3Json.fps || 30}
        width={iphoneStoryV3Json.width || 1080}
        height={iphoneStoryV3Json.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneStoryV3Json)}
        defaultProps={{
          storyboard: iphoneStoryV3Json as any,
        }}
      />
      <Composition
        id="IphoneUmpIdReal"
        component={StorytellingVideo}
        fps={iphoneRealJson.fps || 30}
        width={iphoneRealJson.width || 1080}
        height={iphoneRealJson.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneRealJson)}
        defaultProps={{
          storyboard: iphoneRealJson as any,
        }}
      />
      <Composition
        id="IphoneUmpIdWorld"
        component={StorytellingVideo}
        fps={iphoneWorldJson.fps || 30}
        width={iphoneWorldJson.width || 1080}
        height={iphoneWorldJson.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneWorldJson)}
        defaultProps={{
          storyboard: iphoneWorldJson as any,
        }}
      />
      <Composition
        id="IphoneUmpIdStory"
        component={StorytellingVideo}
        fps={iphoneCharacterStoryJson.fps || 30}
        width={iphoneCharacterStoryJson.width || 1080}
        height={iphoneCharacterStoryJson.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneCharacterStoryJson)}
        defaultProps={{
          storyboard: iphoneCharacterStoryJson as any,
        }}
      />
      <Composition
        id="IphoneUmpId2D"
        component={StorytellingVideo}
        fps={iphoneUmpJson.fps || 30}
        width={iphoneUmpJson.width || 1080}
        height={iphoneUmpJson.height || 1920}
        durationInFrames={calcStorytellingFrames(iphoneUmpJson)}
        defaultProps={{
          storyboard: iphoneUmpJson as any,
        }}
      />
      <Composition
        id="PertaliteVsPertamax"
        component={StorytellingVideo}
        fps={30}
        width={1080}
        height={1920}
        durationInFrames={calcStorytellingFrames(
          storyModules["./pertalite-vs-pertamax.json"] || newStoryboardJson,
        )}
        defaultProps={{
          storyboard:
            storyModules["./pertalite-vs-pertamax.json"] || newStoryboardJson,
        }}
      />
      <Composition
        id="ViralStory3D"
        component={StorytellingVideo}
        fps={newStoryboardJson.fps || 30}
        width={newStoryboardJson.width || 1080}
        height={newStoryboardJson.height || 1920}
        durationInFrames={storytellingDuration}
      />
      <Composition
        id="StorytellingVideo"
        component={StorytellingVideo}
        fps={newStoryboardJson.fps || 30}
        width={newStoryboardJson.width || 1080}
        height={newStoryboardJson.height || 1920}
        durationInFrames={storytellingDuration}
      />
      <Composition
        id="ScriptVideo"
        component={ScriptVideo}
        defaultProps={{ storyboard }}
        schema={ScriptVideoSchema}
        fps={storyboard.fps}
        width={storyboard.width}
        height={storyboard.height}
        durationInFrames={Math.max(1, totalFrames(storyboard))}
        calculateMetadata={calculateMetadata}
      />
    </>
  );
};
