import path from "node:path";
import { synthesize } from "./lib/tts";

const VOICE = "id-ID-ArdiNeural";

const scenes = [
  {
    name: "monalisa/scene1",
    text: "Kenapa lukisan seorang wanita biasa dari tahun 1503 ini bisa jadi karya seni paling mahal dan paling dijaga di seluruh dunia?",
  },
  {
    name: "monalisa/scene2",
    text: "Lukisan ini dipesan oleh pedagang sutra Italia untuk potret istrinya. Tapi Da Vinci begitu terobsesi hingga melukisnya lebih dari 16 tahun!",
  },
  {
    name: "monalisa/scene3",
    text: "Rahasia senyumnya ada di ilusi optik. Da Vinci mengoleskan puluhan lapisan cat ultra tipis tanpa garis batas tegas, sehingga senyumnya tampak hidup dan berubah-ubah.",
  },
  {
    name: "monalisa/scene4",
    text: "Mona Lisa sebenarnya baru viral dan terkenal di seluruh dunia setelah dicuri dari museum Louvre pada tahun 1911 dan hilang dua tahun penuh!",
  },
  {
    name: "monalisa/scene5",
    text: "Hari ini, Mona Lisa dilindungi kaca antipeluru dengan nilai asuransi hampir 14 triliun rupiah. Ikuti akun ini untuk fakta sejarah dan dunia lainnya!",
  },
];

async function main() {
  for (const s of scenes) {
    const mp3 = path.resolve("public", "audio", `${s.name}.mp3`);
    const words = path.resolve("public", "audio", `${s.name}.words.json`);
    const raw = path.resolve("scripts", "out", `${s.name}.raw.json`);
    console.log(`🎙️ Mensintesis ${s.name}...`);
    const res = await synthesize(s.text, VOICE, mp3, words, raw);
    console.log(
      `✅ ${s.name} selesai (~${res.audioSec.toFixed(2)}s, ${res.words} kata, last: ${res.lastEndSec.toFixed(2)}s)`
    );
  }
}

main().catch(console.error);
