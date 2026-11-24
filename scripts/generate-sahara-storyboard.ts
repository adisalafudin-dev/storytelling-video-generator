import fs from "node:fs";
import path from "node:path";
import { synthesize } from "./lib/tts";

async function main() {
  const voice = "id-ID-ArdiNeural";
  const outDir = path.resolve("public/audio/sahara");
  fs.mkdirSync(outDir, { recursive: true });

  const rawScenes = [
    {
      id: "scene-1",
      title: "Hook: Fosil di Bawah Pasir",
      narration: "Di tengah gurun paling mematikan di bumi, ilmuwan justru menemukan fosil paus purba dan jejak sungai raksasa yang terkubur di bawah pasir.",
      background: "radial-gradient(ellipse at 50% 25%, #451a03 0%, #1c0a02 70%, #080301 100%)",
      camera: {
        start: [0, 5, 8],
        end: [0, 0.4, 2.8],
        ease: "ease-out"
      },
      model: {
        type: "sahara-fossil",
        rotationSpeed: 0.15
      },
      infoCard: {
        type: "source",
        label: "PENEMUAN ILMIAH",
        text: "Wadi Al-Hitan (Lembah Paus Purba)",
        source: "UNESCO World Heritage Site",
        startSec: 0.5,
        durationSec: 5.5
      }
    },
    {
      id: "scene-2",
      title: "Fakta Kontras: Sahara Hijau",
      narration: "Enam ribu tahun yang lalu, Sahara bukanlah lautan pasir tandus, melainkan surga tropis hijau lebat dengan Danau Mega-Chad yang luasnya melebihi Laut Kaspia.",
      background: "radial-gradient(ellipse at 50% 30%, #064e3b 0%, #022c22 70%, #01140e 100%)",
      camera: {
        start: [2.5, 3.5, 6],
        end: [-1.5, 1.8, 4.2],
        ease: "ease-in-out"
      },
      model: {
        type: "green-sahara",
        rotationSpeed: 0.2
      },
      infoCard: {
        type: "quote",
        text: "6.000 Tahun Lalu: Gurun Sahara adalah Hutan Hijau Tropis.",
        author: "African Humid Period",
        startSec: 0.4,
        durationSec: 6.5
      }
    },
    {
      id: "scene-3",
      title: "Mekanisme 3D: Kemiringan Poros Bumi",
      narration: "Penyebabnya adalah perubahan kemiringan poros bumi yang bergeser dari 24,1 derajat ke 23,5 derajat, memicu pergeseran angin monsun yang menyiram Sahara dengan hujan lebat.",
      background: "radial-gradient(ellipse at 50% 30%, #1e1b4b 0%, #0f0d26 70%, #05040f 100%)",
      camera: {
        start: [0, 3, 6],
        end: [0, 1.5, 3.8],
        ease: "ease-in-out"
      },
      model: {
        type: "earth-tilt",
        rotationSpeed: 0.35
      },
      callout: {
        text: "Monsun Afrika Bergeser",
        subtext: "Kemiringan Poros Bumi: 24,1° → 23,5°",
        xPercent: 50,
        yPercent: 38,
        startSec: 0.8,
        durationSec: 7.0
      }
    },
    {
      id: "scene-4",
      title: "Dampak Global: Nutrisi Amazon",
      narration: "Kini setelah mengering, dasar danau kuno tersebut menghasilkan jutaan ton debu kaya fosfor yang terbang melintasi Samudra Atlantik untuk menyuburkan Hutan Amazon.",
      background: "radial-gradient(ellipse at 50% 30%, #14352b 0%, #061c16 70%, #010a08 100%)",
      camera: {
        start: [3.5, 2.5, 5.5],
        end: [-2.0, 1.6, 4.5],
        ease: "ease-in-out"
      },
      model: {
        type: "dust-stream",
        rotationSpeed: 0.25
      },
      infoCard: {
        type: "stat",
        value: "27 Juta Ton",
        label: "Debu fosfor Sahara per tahun menyuburkan Hutan Amazon",
        startSec: 0.5,
        durationSec: 6.5
      }
    },
    {
      id: "scene-5",
      title: "Kesimpulan: Siklus 20.000 Tahun",
      narration: "Menurut perhitungan orbital siklus Milankovitch, fenomena ini berulang setiap dua puluh ribu tahun, dan Sahara diprediksi akan kembali menghijau di masa depan.",
      background: "radial-gradient(ellipse at 50% 30%, #2e1065 0%, #170733 75%, #05010d 100%)",
      camera: {
        start: [0, 1.5, 4.2],
        end: [0, 3.5, 8.5],
        ease: "ease-out"
      },
      model: {
        type: "earth-pullout",
        rotationSpeed: 0.2
      },
      infoCard: {
        type: "quote",
        text: "Siklus 20.000 Tahun akan mengembalikan Sahara menjadi hijau lagi.",
        author: "Nature Geoscience Review",
        startSec: 0.5,
        durationSec: 6.8
      }
    },
    {
      id: "scene-6",
      title: "Call To Action & Pertanyaan",
      narration: "Bumi selalu menyimpan rahasia luar biasa yang mengubah cara kita memandang dunia. Follow sekarang untuk rahasia sains menakjubkan lainnya!",
      background: "radial-gradient(ellipse at 50% 30%, #0f2b38 0%, #05141c 75%, #010508 100%)",
      camera: {
        start: [0, 2.5, 5.5],
        end: [0, 1.2, 3.2],
        ease: "ease-out"
      },
      model: {
        type: "green-sahara",
        rotationSpeed: 0.25
      },
      infoCard: {
        type: "quote",
        text: "Apakah peradaban manusia siap menyambut Sahara hijau berikutnya?",
        author: "Follow @TechStory3D",
        startSec: 0.3,
        durationSec: 6.0
      }
    }
  ];

  const processedScenes = [];
  let totalVideoSec = 0;

  for (let i = 0; i < rawScenes.length; i++) {
    const s = rawScenes[i];
    const mp3Name = `scene${i + 1}.mp3`;
    const wordsName = `scene${i + 1}.words.json`;
    const mp3Path = path.join(outDir, mp3Name);
    const wordsPath = path.join(outDir, wordsName);

    console.log(`[${i + 1}/${rawScenes.length}] Synthesizing TTS: "${s.title}"...`);
    const res = await synthesize(s.narration, voice, mp3Path, wordsPath);
    console.log(`  -> Duration: ${res.audioSec.toFixed(2)}s (${res.words} words)`);

    const words = JSON.parse(fs.readFileSync(wordsPath, "utf-8"));
    const sceneDuration = Math.ceil((res.audioSec + 0.4) * 10) / 10;
    totalVideoSec += sceneDuration;

    processedScenes.push({
      ...s,
      duration: sceneDuration,
      audio: `audio/sahara/${mp3Name}`,
      captions: words.map((w: any) => ({
        text: w.text.trim(),
        startMs: w.startMs,
        endMs: w.endMs,
      })),
    });
  }

  const finalStoryboard = {
    title: "Rahasia di Bawah Pasir Gurun Sahara",
    fps: 30,
    width: 1080,
    height: 1920,
    totalEstimatedDurationSec: totalVideoSec,
    scenes: processedScenes,
  };

  const destPath = path.resolve("src/data/storyboard.json");
  fs.writeFileSync(destPath, JSON.stringify(finalStoryboard, null, 2));
  console.log(`\nSuccessfully wrote 6 scenes to ${destPath}`);
  console.log(`Total video length: ~${totalVideoSec.toFixed(1)}s (~${Math.round(totalVideoSec * 30)} frames)`);
}

main().catch(console.error);
