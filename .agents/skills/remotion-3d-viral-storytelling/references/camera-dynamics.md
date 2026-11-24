# Camera Dynamics Reference

## Philosophy: "The camera is the viewer's body"

In viral 3D storytelling, every camera movement must serve a **narrative purpose**.
Random motion creates confusion; purposeful motion creates engagement.

## Camera Motion Language

### Emotional Mapping

| Emotion | Camera Movement | Speed | Ease |
|---------|----------------|-------|------|
| **Wonder/Awe** | Slow crane up + pull out | 0.3-0.5 units/sec | ease-out |
| **Urgency** | Fast dolly in | 1-2 units/sec | ease-in |
| **Revelation** | Orbit 90-180° + zoom | 0.5-0.8 units/sec | ease-in-out |
| **Calm/Explain** | Gentle float/drift | 0.1-0.2 units/sec | linear |
| **Impact** | Quick push-in then hold | 1+ units/sec → still | ease-in → clamp |
| **Transition** | Fly-over or pull-back | 0.5-1 units/sec | ease-in-out |

### The "Never Stop Moving" Rule

Viral 3D videos ALWAYS have the camera in subtle motion. Even during "static"
explanation moments, apply a micro-drift:

```markdown
# Subtle drift (barely perceptible but keeps the scene alive)
- camera: 2, 3, 5
- cameraTo: 2.1, 3.05, 4.9
- cameraEase: linear
```

The drift should be < 5% of the camera distance over the scene duration.

### Camera Distance Guidelines

| Subject | Near | Medium | Far | Establishing |
|---------|------|--------|-----|-------------|
| Single object | 2-3 | 4-5 | 6-8 | 10+ |
| Kit/flow | 4-6 | 7-9 | 10-14 | 16+ |
| Environment | 3-5 | 6-8 | 10-12 | 15+ |

### Multi-Point Camera Choreography

For scenes longer than 4 seconds, use `cameraKeys` for multi-point paths:

```markdown
# 6-second scene with 3-point camera path
  > 0.0 camera: 3, 2, 6 ease-in-out     # Start wide
  > 2.0 camera: 1, 1, 3 ease-out         # Push in to detail
  > 5.0 camera: -2, 3, 5 ease-in-out     # Pull up to new angle
```

### Hook Camera Patterns

The first 2-3 seconds need the most dramatic camera movement:

**Pattern A: "The Swoop"**
```
Start: High and far (0, 6, 10)
End: Low and close (0, 1, 3)
Ease: ease-in-out
Duration: 2.5s
```

**Pattern B: "The Reveal"**
```
Start: Behind the object (0, 2, -5)
End: In front showing the object (0, 2, 5)
Ease: ease-out
Duration: 3s
```

**Pattern C: "The Orbit Reveal"**
```
Point 1 (0s): Side view (5, 2, 0)
Point 2 (1.5s): Front view (0, 2, 5)
Point 3 (3s): Dramatic angle (-3, 3, 4)
```

## Look-At Strategies

The default camera always looks at origin `(0, 0, 0)`. To create more dynamic
compositions:

1. **Center the subject at origin** — the standard approach
2. **Offset the subject** — creates natural off-center framing
3. **Use motion presets** — `orbit`, `float` move the subject while camera tracks

## Depth of Field Illusion

Since Remotion's ThreeCanvas doesn't natively support DoF, create the illusion:

1. **Foreground blur**: CSS `filter: blur()` on the Background component
2. **Atmospheric fog**: Three.js `Fog` via environment system
3. **Layered backgrounds**: Multiple gradient layers at different opacities
