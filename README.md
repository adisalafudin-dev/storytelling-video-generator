# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

### Multi‑Story Architecture (Anti‑Overwrite)

- **Story files** are now stored per‑topic under `src/data/stories/<slug>.json` instead of a single `src/data/storyboard.json`.
- **Audio assets** for each story are generated into `public/audio/<slug>/`.
- The project automatically discovers all story JSONs via `import.meta.glob('./data/stories/*.json', { eager: true })` and registers a separate Remotion composition for each story.
- To render a specific story use the `--props` flag, e.g.:
  ```bash
  npx remotion render src/index.ts StorytellingVideo out/monalisa.mp4 \
    --props='{"storyId":"monalisa"}' --gl=angle
  ```
- The legacy `script-to-video` workflow still works; the first discovered story is used as the default for `ScriptVideo`.

---

## Commands

**Install Dependencies**

```console
npm i --loglevel=error
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
