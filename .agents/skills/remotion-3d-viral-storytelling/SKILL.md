---
name: remotion-3d-viral-storytelling
description: >-
  Generates high-retention, viral-ready 3D video storytelling code using Remotion
  with Three.js / React Three Fiber. Covers cinematic camera dynamics, engaging
  text/subtitle animations, storyboard-driven architecture, and pacing strategies
  optimized for TikTok/Reels/Shorts. Use when creating explainer videos, product
  showcases, educational content, or any narrative 3D video that must maximize
  viewer retention and shareability.
version: 1.0.0
---

# Remotion 3D Viral Storytelling

This skill generates **production-ready Remotion code** for 3D storytelling videos
optimized for maximum viewer retention and virality. It integrates Three.js /
React Three Fiber with cinematic camera work, engaging text overlays, karaoke
captions, and data-driven storyboard architecture.

Before writing any code, also load:
- [Remotion Markup Best Practices](../remotion-best-practices/remotion-markup/REFERENCE.md) for animation and sequencing rules
- [Remotion 3D](../remotion-best-practices/remotion-markup/3d.md) for ThreeCanvas constraints
- [Remotion Captions](../remotion-best-practices/remotion-captions/REFERENCE.md) for subtitle/caption display

---

## Table of Contents

1. [Core Architecture](#core-architecture)
2. [Viral Pacing & Retention Science](#viral-pacing--retention-science)
3. [Storyboard Data Format](#storyboard-data-format)
4. [3D Scene System (Three.js / R3F)](#3d-scene-system)
5. [Cinematic Camera System](#cinematic-camera-system)
6. [Text & Subtitle System](#text--subtitle-system)
7. [Beat Overlay System](#beat-overlay-system)
8. [Transition & Visual Effects](#transition--visual-effects)
9. [Environment & Mood System](#environment--mood-system)
10. [Audio & Narration Integration](#audio--narration-integration)
11. [Template Recipes](#template-recipes)
12. [Anti-Patterns & Gotchas](#anti-patterns--gotchas)

---

## Core Architecture

The system follows a **data-driven, storyboard-first** architecture:

```
Storyboard (Markdown/JSON)
    ↓ parse
Storyboard Data (TypeScript types)
    ↓ feed
Composition (ScriptVideo)
    ↓ split into
Chapters (grouped scenes sharing one 3D world)
    ↓ each renders
ChapterView = Background + ThreeCanvas(CameraRig + WorldMesh) + Overlays(Beats + Captions)
```

### Key Principles

1. **Storyboard drives everything** — scenes, cameras, beats, captions are all data
2. **One ThreeCanvas per chapter** — scenes in the same chapter share the 3D world
3. **All animation driven by `useCurrentFrame()`** — NEVER use `useFrame()` from R3F
4. **Frame-deterministic** — every pixel must be identical for the same frame number
5. **Overlays are HTML on top of WebGL** — beats, captions, titles are DOM elements

### Component Hierarchy

```
RemotionRoot
└── Composition (ScriptVideo)
    └── TransitionSeries
        └── TransitionSeries.Sequence (per chapter)
            └── ChapterView
                ├── Background (CSS gradients / images / procedural)
                ├── ThreeCanvas
                │   ├── CameraRig (keyframe-driven position)
                │   ├── EnvironmentRig (lights, fog, particles)
                │   └── WorldMesh (shape/model/kit)
                └── Sequence (per scene, layout="none")
                    ├── Audio
                    ├── BeatLayer (title, tag, stat, quote, checklist, callout)
                    └── KaraokeCaption / Caption
```

---

## Viral Pacing & Retention Science

### The 3-Second Hook Rule

The first 3 seconds determine whether a viewer stays. Every video MUST start with:

1. **Visual movement** — camera flying in, object appearing, zoom
2. **Text hook** — eyebrow + bold title with the promise of value
3. **Audio hook** — narration starting immediately with the most compelling sentence

### Pacing Formula for High Retention

```
Scene Duration Targets:
├── Hook scene:        2.5 – 3.5 seconds
├── Concept scenes:    3 – 5 seconds each
├── Climax/reveal:     4 – 6 seconds
└── Closing/CTA:       2 – 3 seconds

Total target:  30-90 seconds (Shorts/Reels optimal)
```

### Retention Triggers (apply every 3-5 seconds)

| Trigger | Implementation |
|---------|---------------|
| **Camera move** | Dolly in/out, orbit, crane shot via `cameraKeys` |
| **New visual element** | Model swap, kit change, prop appearance |
| **Text beat** | Title, stat, quote, checklist appearing |
| **Audio beat** | Sound effect, narration emphasis |
| **Color shift** | Background gradient change, lighting mood |
| **3D motion** | Object rotation speed change, motion preset |

### Pacing Pattern: "Breathe-Punch-Breathe"

```
[PUNCH] Hook — fast camera move + bold title (0-3s)
[BREATHE] Explain — slower orbit + narration (3-7s)
[PUNCH] Reveal — camera zoom + stat/quote card (7-10s)
[BREATHE] Detail — gentle float + caption (10-14s)
[PUNCH] Climax — dramatic dolly + checklist (14-18s)
[CLOSE] CTA — fade + closing title (18-21s)
```

---

## Storyboard Data Format

The storyboard is a Markdown file with YAML frontmatter that gets parsed into typed JSON.

### Frontmatter

```yaml
---
title: "Video Title"
fps: 30
width: 1080      # Vertical for Shorts/Reels/TikTok
height: 1920
voice: id-ID-ArdiNeural   # Edge TTS voice (optional)
---
```

### Aspect Ratio Guidance

| Platform | Width × Height | Use |
|----------|---------------|-----|
| TikTok / Reels / Shorts | 1080 × 1920 | Vertical, maximum reach |
| YouTube | 1920 × 1080 | Horizontal, long-form |
| Square | 1080 × 1080 | Instagram feed |

### Scene Definition

Each `##` heading is a scene. Properties are `- key: value` lines:

```markdown
## Scene Title

- chapter: chapter-name       # Group scenes into one 3D world
- duration: 4                 # Seconds (or "auto" = 3s)
- shape: model                # box | sphere | torus | model
- model: models/product.glb   # Path under public/ (when shape=model)
- animation: idle              # Animation clip name or index
- animationSpeed: 1
- modelRotate: true
- rotationSpeed: 0.3          # Radians/sec
- color: "#4a9eff"            # For primitive shapes
- camera: 2, 3, 5             # Starting [x, y, z]
- cameraTo: -1, 2, 4          # End position (simple move)
- cameraEase: ease-in-out     # linear | ease-in | ease-out | ease-in-out
- transition: fade             # none | fade | slide | wipe
- transitionDuration: 0.35
- background: gradient(#07111f, #142b45, 180deg)
- theme: space                 # space|farm|city|ocean|forest|desert|indoor|lab|highway
- themeDetail: high            # low | high
- time: night                  # dawn | day | dusk | night
- weather: clear               # clear | rain | fog | snow | dust
- audio: audio/bgm.mp3
- audioVolume: 0.3
- narration: "The text the voice reads for this scene."

## Advanced Camera (cameraKeys)

For multi-point camera paths within a scene:

  > 0.0 camera: 2, 3, 5 ease-in-out
  > 1.5 camera: 0, 4, 3 ease-out
  > 3.0 camera: -1, 2, 4 ease-in

## Beats (timed overlays)

  @ 0.2 title eyebrow="STEP 1" text="How *GPUs* work" for=2.8
  @ 0.5 tag text="EXPLAINED" for=2
  @ 1.0 stat value="10×" label="*Faster* than CPU" for=2.5
  @ 2.0 quote text="Parallelism is the *future*" by="Jensen Huang" for=3
  @ 1.5 checklist items="Vertex,Pixel,Compute" for=3
  @ 0.3 callout text="GPU Core" at="0.5, 0.3, 0" for=2

## Motion presets

  @ 0 motion=fall-into for=2 ease=ease-out
  @ 2 motion=orbit turns=1 for=3 ease=ease-in-out
  @ 5 motion=float for=2

## Kit-based scenes (procedural 3D worlds)

- kit: flow                    # layers | road | flow
  + node id="cpu" label="CPU" model="models/CPU.glb" pos="-1.5, 1, 0" color=#4dabf7
  + node id="gpu" label="GPU" model="models/gpu.glb" pos="0, 0, 0" color=#63e6be
  + link from="cpu" to="gpu"
  @ 0.5 focus node="cpu" for=1
  @ 1.5 send from="cpu" to="gpu" for=1.2
```

### TypeScript Types (src/script/types.ts)

The key types that the storyboard parses into:

```typescript
type Vec3 = [number, number, number];
type CameraEase = "linear" | "ease-in" | "ease-out" | "ease-in-out";
type TransitionType = "none" | "fade" | "slide" | "wipe";
type CameraKey = { time: number; pos: Vec3; ease: CameraEase };
type MotionPreset = "fall-into" | "launch" | "fly-to" | "drive" | "orbit" | "float";
type Beat = { start: number; end: number } & (
  | { type: "title"; eyebrow?: string; text: string }
  | { type: "tag"; text: string }
  | { type: "badge"; text: string }
  | { type: "quote"; text: string; by?: string }
  | { type: "stat"; value: string; label: string }
  | { type: "checklist"; items: string[] }
  | { type: "callout"; text: string; x?: number; y?: number; at?: Vec3 }
);

type SceneData = {
  title: string;
  chapter?: string;
  duration: number | "auto";
  shape: "box" | "sphere" | "torus" | "model";
  model?: string;
  camera: Vec3;
  cameraTo?: Vec3;
  cameraKeys?: CameraKey[];
  cameraEase: CameraEase;
  transition: TransitionType;
  transitionDuration: number;
  background: string;
  caption: string;
  words?: Caption[];
  beats?: Beat[];
  audio?: string;
  audioVolume: number;
  theme?: ThemeName;
  time: TimeOfDay;
  weather: Weather;
  motion: MotionAction[];
  // ... (see src/script/types.ts for full definition)
};

type Storyboard = {
  title: string;
  fps: number;
  width: number;
  height: number;
  scenes: SceneData[];
};
```

---

## 3D Scene System

### ThreeCanvas Setup (CRITICAL RULES)

```tsx
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig, useCurrentFrame } from "remotion";

// MUST provide width and height
const { width, height } = useVideoConfig();

<ThreeCanvas
  width={width}
  height={height}
  shadows={true}             // enable for realistic lighting
  camera={{ position: [2, 3, 5], fov: 50, near: 0.1, far: 100 }}
>
  {/* CameraRig controls position each frame */}
  <CameraRig points={cameraPoints} />

  {/* Lighting */}
  <ambientLight intensity={0.6} />
  <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

  {/* 3D Content */}
  <WorldMesh scene={sceneData} tracks={actionTracks} />
</ThreeCanvas>
```

### Animation Rules (CRITICAL)

```tsx
// ✅ CORRECT: All animation driven by useCurrentFrame()
const frame = useCurrentFrame();
const rotationY = frame * 0.02;
<mesh rotation={[0, rotationY, 0]}>

// ❌ FORBIDDEN: useFrame() from @react-three/fiber
// This causes flickering during render!
useFrame((state) => { /* NEVER DO THIS */ });

// ❌ FORBIDDEN: Self-animating shaders/models
// All animation must be frame-deterministic

// ✅ CORRECT: Sequence inside ThreeCanvas needs layout="none"
<Sequence layout="none" from={30} durationInFrames={60}>
  <mesh>...</mesh>
</Sequence>
```

### Automated 3D Model Fetching & Asset Pipeline (Poly Pizza)

Whenever creating or updating `storyboard.json`, follow this mandatory workflow:
1. **Identify Hero 3D Objects**: Spot objects that require high visual fidelity (e.g., whale skeleton, pine tree, dinosaur fossil, ancient ship, character, desert rock).
2. **Fetch Model via CLI**: Run `bun run fetch-model "<english query>" "<filename>"` to download the low-poly `.glb` asset directly to `public/models/<filename>.glb`.
3. **Load with Fallback**: In React Three Fiber components, load using `useGLTF(staticFile('models/<filename>.glb'))` (or wrapped in `GLTFModel` with Suspense and an ErrorBoundary / procedural fallback) so the render never breaks if a model is missing.

```tsx
import React, { Suspense } from "react";
import { staticFile } from "remotion";
import { useGLTF } from "@react-three/drei";

export const GLTFModel: React.FC<{
  modelPath: string;
  fallback?: React.ReactNode;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ modelPath, fallback = null, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <Suspense fallback={fallback}>
      <ModelInner modelPath={modelPath} scale={scale} position={position} rotation={rotation} />
    </Suspense>
  );
};

const ModelInner: React.FC<{
  modelPath: string;
  scale: number | [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
}> = ({ modelPath, scale, position, rotation }) => {
  const fileUrl = modelPath.startsWith("http") ? modelPath : staticFile(modelPath.replace(/^\//, ""));
  const { scene } = useGLTF(fileUrl);
  return <primitive object={scene.clone()} scale={scale} position={position} rotation={rotation} />;
};
```

### Loading 3D Models

```tsx
import { useGLTF } from "@react-three/drei";

const ModelMesh: React.FC<{ path: string }> = ({ path }) => {
  const { scene, animations } = useGLTF(staticFile(path));
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Drive animation by frame, not by clock
  useMemo(() => {
    if (animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      const action = mixer.clipAction(animations[0]);
      action.play();
      mixer.setTime(frame / fps);  // Frame-deterministic!
    }
  }, [frame]);

  return <primitive object={scene.clone()} />;
};
```

### Procedural Shapes with Viral Appeal

```tsx
// Glowing sphere with dynamic color
const GlowSphere: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hue = (frame / fps) * 60; // Slowly shift hue
  const pulse = 1 + Math.sin(frame * 0.1) * 0.05; // Subtle pulse

  return (
    <mesh scale={[pulse, pulse, pulse]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color={`hsl(${hue}, 80%, 60%)`}
        emissive={`hsl(${hue}, 90%, 30%)`}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};
```

---

## Cinematic Camera System

The camera system uses **keyframe interpolation** with named easing curves.

### Camera Point Structure

```typescript
type CameraPoint = {
  frame: number;    // Chapter-local frame
  pos: Vec3;        // [x, y, z] position
  ease: CameraEase; // Easing for the move TO this point
};
```

### CameraRig Component

```tsx
import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import { cameraAt } from "../script/camera";

export const CameraRig: React.FC<{ points: CameraPoint[] }> = ({ points }) => {
  const camera = useThree((state) => state.camera);
  const frame = useCurrentFrame();
  const [x, y, z] = cameraAt(points, frame);

  useLayoutEffect(() => {
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);        // Always looks at origin
    camera.updateMatrixWorld();
  }, [camera, x, y, z]);

  return null;
};
```

### Camera Interpolation (Pure Function)

```typescript
import { Easing } from "remotion";

const EASINGS: Record<CameraEase, (t: number) => number> = {
  linear: Easing.linear,
  "ease-in": Easing.in(Easing.cubic),
  "ease-out": Easing.out(Easing.cubic),
  "ease-in-out": Easing.inOut(Easing.cubic),
};

export const cameraAt = (points: CameraPoint[], frame: number): Vec3 => {
  if (frame <= points[0].frame) return points[0].pos;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (frame <= b.frame) {
      const t = EASINGS[b.ease]((frame - a.frame) / (b.frame - a.frame));
      return [
        a.pos[0] + (b.pos[0] - a.pos[0]) * t,
        a.pos[1] + (b.pos[1] - a.pos[1]) * t,
        a.pos[2] + (b.pos[2] - a.pos[2]) * t,
      ];
    }
  }
  return points[points.length - 1].pos;
};
```

### Cinematic Camera Recipes

| Shot Type | Camera Start | Camera End | Ease | Duration | Viral Impact |
|-----------|-------------|------------|------|----------|-------------|
| **Dolly In** | `0, 2, 8` | `0, 1.5, 3` | ease-in-out | 3-4s | High — creates intimacy |
| **Crane Up** | `2, 0, 5` | `2, 5, 5` | ease-out | 2-3s | High — reveals scale |
| **Orbit** | `5, 2, 0` | `-5, 2, 0` | ease-in-out | 4-5s | Medium — shows all sides |
| **Push Through** | `0, 0, 10` | `0, 0, 1` | ease-in | 2s | Very High — dramatic |
| **Dutch Angle Rise** | `3, -1, 4` | `-2, 4, 3` | ease-out | 3s | High — dynamic energy |
| **Flyby** | `6, 3, -2` | `-6, 1, 4` | linear | 5s | Medium — cinematic |

### Multi-Point Camera Path Example

```markdown
## Epic Reveal Scene
- camera: 0, 1, 10
- cameraEase: ease-in-out
  > 0.0 camera: 0, 1, 10 ease-in         # Start far
  > 1.5 camera: 3, 3, 5 ease-in-out      # Swing right and up
  > 3.0 camera: 0, 2, 2 ease-out         # Push in close
  > 4.5 camera: -2, 4, 4 ease-in-out     # Pull up and left
```

---

## Text & Subtitle System

### Karaoke Captions (TikTok Style)

The `KaraokeCaption` component creates word-by-word highlighting synchronized
with narration audio:

```tsx
import { createTikTokStyleCaptions } from "@remotion/captions";

const KaraokeCaption: React.FC<{ words: Caption[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const nowMs = (frame / fps) * 1000;

  const { pages } = useMemo(
    () => createTikTokStyleCaptions({
      captions: words,
      combineTokensWithinMilliseconds: 1200,
    }),
    [words],
  );

  // Find current page and active word
  // Render with highlight on active word, dim upcoming words
  // Add "pop" scale animation on active word (frame-driven, not CSS)
};
```

### Caption Styling for Viral Videos

```tsx
// High-contrast, mobile-readable caption styling
const captionStyle = {
  maxWidth: width * 0.88,
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "center",
  gap: `${fontSize * 0.1}px ${fontSize * 0.08}px`,
  padding: `${fontSize * 0.32}px ${fontSize * 0.45}px`,
  background: "rgba(18, 18, 18, 0.82)",     // Dark semi-transparent
  borderRadius: fontSize * 0.55,
  fontFamily: "Inter, system-ui, sans-serif",
  fontWeight: 700,
  fontSize: width * 0.062,                   // ~6.2% of width for readability
  lineHeight: 1.15,
};

// Active word highlight
const activeStyle = {
  background: "#ffd43b",    // Yellow highlight
  color: "#141414",
  borderRadius: fontSize * 0.3,
  transform: `scale(${pop})`,  // Driven by interpolate()
};
```

### Text with Bold/Highlight Markdown

Use `*asterisks*` in beat text for inline highlights:

```tsx
const Highlighted: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*[^*]+\*)/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} style={{ color: ACCENT }}>{part.slice(1, -1)}</span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};
```

---

## Beat Overlay System

Beats are **timed visual elements** that appear over the 3D scene. They are the
primary retention mechanism — something new appearing every 3-5 seconds.

### Beat Types & Usage

| Type | Visual | When to Use | Retention Power |
|------|--------|------------|----------------|
| `title` | Centered headline with eyebrow | Opening hook, section headers | ★★★★★ |
| `tag` | Pill badge, left-aligned | Categorization, labels | ★★★ |
| `badge` | Pill badge, right-aligned | Status, type indicators | ★★★ |
| `stat` | Big number + label card | Data points, comparisons | ★★★★★ |
| `quote` | Quoted text card with attribution | Expert opinions, testimonials | ★★★★ |
| `checklist` | Staggered check items | Steps, features, benefits | ★★★★ |
| `callout` | Dot + label anchored to 3D point | Labeling parts of a model | ★★★★★ |

### Beat Motion System (Enter/Exit Animations)

All beats use a shared motion system driven by frame count:

```tsx
const ENTER_FRAMES = 10;  // ~0.33s at 30fps
const EXIT_FRAMES = 8;

export const useBeatMotion = (
  localFrame: number,
  durationInFrames: number,
  delay: number = 0,
) => {
  const enterStart = delay;
  const enterEnd = delay + ENTER_FRAMES;
  const exitStart = durationInFrames - EXIT_FRAMES;

  // Enter: slide up + fade in
  const enterProgress = Math.min(1, Math.max(0,
    (localFrame - enterStart) / ENTER_FRAMES
  ));
  // Exit: fade out
  const exitProgress = Math.min(1, Math.max(0,
    (localFrame - exitStart) / EXIT_FRAMES
  ));

  const eased = Easing.out(Easing.cubic)(enterProgress);
  const exitEased = Easing.in(Easing.cubic)(exitProgress);

  return {
    opacity: eased * (1 - exitEased),
    translateY: (1 - eased) * 30,      // Slide up 30px
    scale: 0.85 + eased * 0.15,        // Scale from 85% to 100%
  };
};
```

### 3D-Anchored Callouts

Callouts can track a 3D point in screen space using perspective projection:

```tsx
const projectToScreen = (
  at: Vec3,
  cam: Cam,
  sceneFrame: number,
  width: number,
  height: number,
) => {
  const [px, py, pz] = cameraAt(cam.points, cam.offset + sceneFrame);
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.set(px, py, pz);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  const v = new THREE.Vector3(...at).project(camera);
  return {
    x: ((v.x + 1) / 2) * width,
    y: ((1 - v.y) / 2) * height,
    visible: v.z < 1,
  };
};
```

---

## Transition & Visual Effects

### Scene Transitions

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

// Transition between chapter sequences
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={120} name="Hook">
    <ChapterView chapter={hookChapter} />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 10 })}
  />
  <TransitionSeries.Sequence durationInFrames={150} name="Explain">
    <ChapterView chapter={explainChapter} />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

### Viral-Ready Transition Timing

| Context | Type | Duration (frames@30fps) | Why |
|---------|------|------------------------|-----|
| Hook → Content | `fade` | 8-12 | Smooth, doesn't distract |
| Section → Section | `slide` | 12-15 | Creates sense of progression |
| Reveal moment | `wipe` | 10-12 | Dramatic unveiling |
| Similar content | `fade` | 6-8 | Quick, keeps momentum |

### Visual Effects (from @remotion/effects)

Enhance scenes with post-processing effects on supported components:

```tsx
import { vignette } from "@remotion/effects/vignette";
import { glow } from "@remotion/effects/glow";
import { chromaticAberration } from "@remotion/effects/chromatic-aberration";

// Add cinematic vignette to a scene wrapper
<HtmlInCanvas
  width={width}
  height={height}
  effects={[
    vignette({ intensity: interpolate(frame, [0, 60], [0, 0.4], {
      extrapolateRight: "clamp",
    }) }),
  ]}
>
  {/* Scene content */}
</HtmlInCanvas>
```

---

## Environment & Mood System

### Theme Presets

The environment system provides complete mood setups:

| Theme | Sky Colors | Lighting | Best For |
|-------|-----------|----------|----------|
| `space` | Deep purple → black | Low ambient + point lights | Sci-fi, tech |
| `farm` | Blue sky + green ground | Warm directional | Nature, organic |
| `city` | Grey → blue | Cool directional + ambient | Business, urban |
| `ocean` | Light blue → teal | Blue-tinted + caustics | Environment, calm |
| `forest` | Green canopy | Dappled + ambient | Nature, growth |
| `desert` | Orange → blue | Harsh directional | Heat, challenge |
| `indoor` | Neutral | Even studio lighting | Product showcase |
| `lab` | Blue-white | Clinical fluorescent | Science, tech |
| `highway` | Sky gradient | Road-level + headlights | Motion, journey |

### Time of Day + Weather

```markdown
- theme: ocean
- time: dusk          # dawn | day | dusk | night
- weather: fog        # clear | rain | fog | snow | dust
- themeDetail: high   # low (performance) | high (visual quality)
```

### Procedural Backgrounds

```tsx
// Space background with parallax stars
if (scene.theme === "space") {
  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse at 50% 45%, #24134b 0%, #090819 48%, #02030b 100%)"
    }}>
      {Array.from({ length: 220 }, (_, i) => {
        const x = random(i * 3 + 17) * 100;
        const y = random(i * 5 + 29) * 100;
        const drift = (x + frame * (0.001 + (i % 4) * 0.0004)) % 100;
        return <i key={i} style={{
          position: "absolute",
          left: `${drift}%`,
          top: `${y}%`,
          width: size,
          height: size,
          borderRadius: "50%",
          background: "white",
          opacity: twinkle,
          boxShadow: "0 0 8px #b8c9ff",
        }} />;
      })}
    </AbsoluteFill>
  );
}
```

---

## Audio & Narration Integration

### Edge TTS Narration Pipeline

1. Write narration text in storyboard (`- narration: "..."`)
2. Run `npm run narrate` to generate audio + word timings
3. Word timings are injected as `words` in each scene for karaoke captions
4. Audio files go to `public/audio/`

### Audio Synchronization

```tsx
// Scene audio plays within its Sequence
<Sequence from={chapterOffset} durationInFrames={sceneDuration} layout="none">
  {scene.audio && <Audio src={staticFile(scene.audio)} volume={scene.audioVolume} />}
  {scene.words && <KaraokeCaption words={scene.words} />}
</Sequence>
```

### Duration Calculation with "auto"

When `duration: auto`, the scene duration is calculated from the narration audio length.
Otherwise, the storyboard author specifies it explicitly.

```typescript
export const sceneFrames = (duration: number | "auto", fps: number) =>
  Math.round((duration === "auto" ? 3 : duration) * fps);
```

---

## Template Recipes

### Recipe 1: Explainer Video (Educational, Vertical)

```markdown
---
title: "How X Works"
fps: 30
width: 1080
height: 1920
---

## Hook
- duration: 3
- shape: model
- model: models/product.glb
- camera: 0, 3, 8
- cameraTo: 0, 1.5, 3
- cameraEase: ease-in-out
- background: gradient(#0a1628, #1a3a5c, 180deg)
- theme: space
- time: night
- narration: "The most compelling opening sentence."
  @ 0.2 title eyebrow="DID YOU KNOW?" text="How *X* actually works" for=2.5

## Step 1 — Concept
- chapter: main
- duration: 4
- transition: fade
- transitionDuration: 0.35
- shape: model
- model: models/step1.glb
- rotationSpeed: 0.3
- camera: 2, 2, 5
- cameraTo: -1, 1, 4
- cameraEase: ease-in-out
- narration: "First, the system does X..."
  @ 0.3 title eyebrow="STEP 1" text="The *foundation*" for=2.5

## Step 2 — Process
- chapter: main
- duration: 4
- camera: -1, 1, 4
- cameraTo: 1, 3, 3
- cameraEase: ease-in-out
- narration: "Then it processes Y..."
  @ 0.3 stat value="10×" label="*Faster* processing" for=2.5

## Step 3 — Result
- chapter: main
- duration: 4
- camera: 1, 3, 3
- cameraTo: 0, 2, 2
- cameraEase: ease-out
- narration: "The result is Z..."
  @ 0.3 checklist items="Speed,Quality,Scale" for=3

## Closing
- duration: 3
- transition: fade
- transitionDuration: 0.5
- shape: model
- model: models/product.glb
- camera: 0, 2, 5
- cameraTo: 0, 1, 3
- cameraEase: ease-out
- narration: "And that's how X works."
  @ 0.3 title eyebrow="SUMMARY" text="Follow for more *tech* explained" for=2.5
```

### Recipe 2: Product Showcase (Vertical)

```markdown
---
title: "Product Launch"
fps: 30
width: 1080
height: 1920
---

## Reveal
- duration: 3.5
- shape: model
- model: models/product.glb
- camera: 0, 0, 10
- cameraTo: 1.5, 1, 3
- cameraEase: ease-in
- theme: indoor
- time: day
  @ 0 motion=fall-into for=1.5 ease=ease-out
  @ 0.2 title eyebrow="NEW" text="Introducing *ProductX*" for=3

## Feature 1
- chapter: features
- duration: 4
- transition: fade
- camera: 1.5, 1, 3
- cameraTo: -1, 2, 2
- cameraEase: ease-in-out
  @ 0.3 callout text="Ultra-fast chip" at="0.2, 0.5, 0" for=2.5
  @ 0.3 tag text="PERFORMANCE" for=2

## Feature 2
- chapter: features
- camera: -1, 2, 2
- cameraTo: 0, 0.5, 2
  @ 0.3 callout text="All-day battery" at="-0.3, -0.2, 0" for=2.5
  @ 0.3 stat value="24h" label="Battery *life*" for=2.5
```

### Recipe 3: Flow Diagram (Process Visualization)

```markdown
## Data Pipeline
- kit: flow
- camera: 0, 0, 10
- cameraTo: 0, 0, 8
- theme: lab
- time: day
  + node id="input" label="Raw Data" pos="-2, 1, 0" color=#4dabf7 shape=sphere
  + node id="process" label="AI Model" pos="0, 0, 0" color=#63e6be shape=box
  + node id="output" label="Results" pos="2, -1, 0" color=#ffd43b shape=sphere
  + link from="input" to="process"
  + link from="process" to="output"
  @ 0.5 focus node="input" for=1.5
  @ 2.0 send from="input" to="process" for=1.5
  @ 3.5 focus node="process" for=1.5
  @ 5.0 send from="process" to="output" for=1.5
```

---

## Anti-Patterns & Gotchas

### ❌ NEVER Do These

1. **Never use `useFrame()` from R3F** — causes flickering during render
2. **Never use CSS `transition` or `animation`** — not frame-deterministic
3. **Never use Tailwind animation classes** — same reason
4. **Never have self-animating shaders** — must be driven by `useCurrentFrame()`
5. **Never put `<Sequence>` inside `<ThreeCanvas>` without `layout="none"`**
6. **Never create a `<ThreeCanvas>` without `width` and `height` props**
7. **Never combine captions from multiple clips into one overlay outside the scene**
8. **Never use `transform: scale(...)` or `transform: translateY(...)`** — use `scale`, `translate`, `rotate` CSS properties for Studio editability
9. **Never extract interpolate() calls into variables** — keep them inline in `style` props

### ✅ Always Do These

1. **Keep `useCurrentFrame()` in the smallest component** — prevents unnecessary re-renders
2. **Get `fps` from `useVideoConfig()`** for all time calculations
3. **Use `staticFile()` for all assets** in `public/`
4. **Use `Easing.bezier()` or `Easing.spring()`** for organic motion
5. **Apply `extrapolateLeft: "clamp"` and `extrapolateRight: "clamp"`** on all interpolations
6. **Test at target FPS** — timing depends on frame rate
7. **Use `npx remotion add`** to install @remotion/* packages (gets correct version)

### Performance Tips

- Use `themeDetail: "low"` during development, `"high"` for final render
- Limit particle counts (stars, rain) to 100-200 for smooth playback
- Use `--gl=angle` flag when rendering on Windows
- Clone models with `scene.clone()` when reusing in multiple positions

---

## Workflow Summary

```
1. Write storyboard markdown → storyboard/<name>.md
2. Parse to JSON           → npm run parse (or npm run dev for auto-parse + studio)
3. Preview in Studio       → npx remotion studio (opens browser)
4. Add narration           → npm run narrate (Edge TTS)
5. Re-parse with timings   → npm run parse
6. Final render            → npm run render (outputs MP4)
```

For more details on each subsystem, see the [references](./references/) directory.
