import path from "node:path";
import { synthesize } from "./lib/tts";

const VOICE = "id-ID-ArdiNeural";

const scenes = [
  {
    name: "tech-ai/scene1",
    text: "Kalau kamu berencana beli HP atau laptop baru tahun ini, siap-siap kaget karena harganya diprediksi bakal melonjak drastis.",
  },
  {
    name: "tech-ai/scene2",
    text: "Penyebabnya bukan perang atau kelangkaan bahan, tapi pabrik chip dunia kini memprioritaskan pesanan raksasa AI seperti OpenAI dan Google.",
  },
  {
    name: "tech-ai/scene3",
    text: "Satu keping chip server AI bisa dijual seharga ratusan juta rupiah dengan keuntungan lima kali lipat dibanding chip smartphone biasa.",
  },
  {
    name: "tech-ai/scene4",
    text: "Akibatnya pasokan memori RAM dan storage untuk ponsel jadi langka, dan biaya produksinya langsung dibebankan ke dompet kita.",
  },
  {
    name: "tech-ai/scene5",
    text: "Jadi kalau gadget lamamu masih bagus, rawat baik-baik. Ikuti akun ini untuk fakta teknologi dan uang lainnya tiap hari.",
  },
];

async function main() {
  for (const s of scenes) {
    const mp3 = path.resolve("public", "audio", `${s.name}.mp3`);
    const words = path.resolve("public", "audio", `${s.name}.words.json`);
    const raw = path.resolve("scripts", "out", `${s.name}.raw.json`);
    console.log(`🎙️ Mensintesis ${s.name}...`);
    const res = await synthesize(s.text, VOICE, mp3, words, raw);
    console.log(`✅ ${s.name} selesai (~${res.audioSec.toFixed(2)}s, ${res.words} kata, last: ${res.lastEndSec.toFixed(2)}s)`);
  }
}

main().catch(console.error);
