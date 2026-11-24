import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

interface WordItem {
  text: string;
  startMs: number;
  endMs: number;
}

async function loadWords(sceneName: string): Promise<WordItem[]> {
  const filePath = path.resolve("public", "audio", `${sceneName}.words.json`);
  const raw = await readFile(filePath, "utf-8");
  const data = JSON.parse(raw) as { text: string; startMs: number; endMs: number }[];
  return data.map((w) => ({
    text: w.text.trim(),
    startMs: w.startMs,
    endMs: w.endMs,
  }));
}

async function run() {
  const words1 = await loadWords("monalisa/scene1");
  const words2 = await loadWords("monalisa/scene2");
  const words3 = await loadWords("monalisa/scene3");
  const words4 = await loadWords("monalisa/scene4");
  const words5 = await loadWords("monalisa/scene5");

  const storyboard = {
    title: "Misteri di Balik Senyum Mona Lisa",
    channel: "@adi.salafudin",
    niche: "Game • Teknologi • Uang • Dunia",
    fps: 30,
    width: 1080,
    height: 1920,
    totalEstimatedDurationSec: 42.0,
    scenes: [
      {
        id: "scene-1",
        duration: 7.2,
        theme: "world",
        nicheTag: "SEJARAH & DUNIA",
        narration:
          "Kenapa lukisan seorang wanita biasa dari tahun 1503 ini bisa jadi karya seni paling mahal dan paling dijaga di seluruh dunia?",
        heroCard: {
          badgeText: "FAKTA SENI & SEJARAH",
          heroHeadline: "Misteri di Balik Senyum Mona Lisa",
          accentWord: "Mona Lisa",
          bigNumber: "1503",
          subLabel: "Tahun Pertama Kali Dilukis di Florence",
        },
        world: {
          environment: "museum-gallery",
        },
        character: {
          role: "narrator",
          gesture: "point",
          position: "right",
          scale: 1.05,
        },
        audio: "audio/monalisa/scene1.mp3",
        captions: words1,
      },
      {
        id: "scene-2",
        duration: 9.0,
        theme: "world",
        nicheTag: "STUDIO DA VINCI 1503",
        narration:
          "Lukisan ini dipesan oleh pedagang sutra Italia untuk potret istrinya. Tapi Da Vinci begitu terobsesi hingga melukisnya lebih dari 16 tahun!",
        heroCard: {
          badgeText: "OBSESI SANG GENIUS",
          heroHeadline: "Da Vinci Melukisnya Selama 16 Tahun",
          accentWord: "16 Tahun",
          comparison: {
            leftTitle: "TARGET AWAL KLIEN",
            leftValue: "1 TAHUN",
            rightTitle: "WAKTU YANG DIPAKAI",
            rightValue: "16+ TAHUN",
            highlight: "right",
          },
        },
        world: {
          environment: "florence-studio",
        },
        character: {
          role: "davinci",
          gesture: "paint",
          position: "right",
          scale: 1.05,
        },
        audio: "audio/monalisa/scene2.mp3",
        captions: words2,
      },
      {
        id: "scene-3",
        duration: 10.4,
        theme: "tech",
        nicheTag: "TEKNOLOGI ILUSI OPTIK",
        narration:
          "Rahasia senyumnya ada di ilusi optik. Da Vinci mengoleskan puluhan lapisan cat ultra tipis tanpa garis batas tegas, sehingga senyumnya tampak hidup dan berubah-ubah.",
        heroCard: {
          badgeText: "RAHASIA ILUSI OPTIK",
          heroHeadline: "Senyumnya Berubah Saat Dilihat",
          accentWord: "Berubah",
          bigNumber: "30+",
          subLabel: "Lapisan Cat Sfumato Ultra Tipis",
        },
        world: {
          environment: "canvas-sfumato",
        },
        character: {
          role: "narrator",
          gesture: "explain",
          position: "left",
          scale: 0.95,
        },
        audio: "audio/monalisa/scene3.mp3",
        captions: words3,
      },
      {
        id: "scene-4",
        duration: 8.0,
        theme: "world",
        nicheTag: "PENCURIAN TERBESAR 1911",
        narration:
          "Mona Lisa sebenarnya baru viral dan terkenal di seluruh dunia setelah dicuri dari museum Louvre pada tahun 1911 dan hilang dua tahun penuh!",
        heroCard: {
          badgeText: "VIRAL GARA-GARA MALING",
          heroHeadline: "Hilang Dicuri Selama 2 Tahun Penuh",
          accentWord: "Hilang Dicuri",
          bigNumber: "2 TAHUN",
          subLabel: "Mona Lisa Lenyap dari Museum Louvre",
        },
        world: {
          environment: "heist-1911",
        },
        character: {
          role: "guard",
          gesture: "shock",
          position: "right",
          scale: 1.05,
        },
        audio: "audio/monalisa/scene4.mp3",
        captions: words4,
      },
      {
        id: "scene-5",
        duration: 9.6,
        theme: "money",
        nicheTag: "REKOR ASURANSI DUNIA",
        narration:
          "Hari ini, Mona Lisa dilindungi kaca antipeluru dengan nilai asuransi hampir 14 triliun rupiah. Ikuti akun ini untuk fakta sejarah dan dunia lainnya!",
        heroCard: {
          badgeText: "STATUS HARI INI",
          heroHeadline: "Karya Seni Termahal di Muka Bumi",
          accentWord: "Termahal",
          bigNumber: "Rp14 T",
          subLabel: "Nilai Perlindungan Asuransi Tertinggi",
        },
        world: {
          environment: "high-security-vault",
        },
        character: {
          role: "narrator",
          gesture: "explain",
          position: "right",
          scale: 1.05,
        },
        audio: "audio/monalisa/scene5.mp3",
        captions: words5,
      },
    ],
  };

  const outPath = path.resolve("src", "data", "storyboard.json");
  await writeFile(outPath, JSON.stringify(storyboard, null, 2), "utf-8");
  console.log("✅ src/data/storyboard.json berhasil diperbarui untuk kisah Mona Lisa!");
}

run().catch(console.error);
