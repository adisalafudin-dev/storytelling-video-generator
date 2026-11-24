import path from "node:path";
import { synthesize } from "./lib/tts";

const VOICE = "id-ID-ArdiNeural";

const scenes = [
  {
    name: "titanic/scene1",
    text: "Dengan teknologi super canggih hari ini, kenapa tidak ada satu pun negara yang berani mengangkat bangkai Titanic?",
  },
  {
    name: "titanic/scene2",
    text: "Di kedalaman ini, tekanan airnya mencapai 400 kali lipat permukaan laut, setara ditindih 50 pesawat jet jumbo sekaligus.",
  },
  {
    name: "titanic/scene3",
    text: "Bukan cuma tekanan, bangkai kapal raksasa ini sedang dimakan hidup-hidup oleh bakteri langka pemakan besi.",
  },
  {
    name: "titanic/scene4",
    text: "Jika dipaksa ditarik ke atas, struktur besinya yang sudah rapuh akan langsung hancur berantakan sebelum sampai permukaan.",
  },
  {
    name: "titanic/scene5",
    text: "Para ilmuwan memprediksi seluruh struktur kapal ini akan lenyap sepenuhnya dimakan bakteri pada tahun 2030.",
  },
  {
    name: "titanic/scene6",
    text: "Karena itulah Titanic dibiarkan beristirahat selamanya sebagai monumen bawah laut.",
  },
];

async function main() {
  for (const s of scenes) {
    const mp3 = path.resolve("public", "audio", `${s.name}.mp3`);
    const words = path.resolve("public", "audio", `${s.name}.words.json`);
    const raw = path.resolve("scripts", "out", `${s.name}.raw.json`);
    console.log(`🎙️ Mensintesis ${s.name}...`);
    const res = await synthesize(s.text, VOICE, mp3, words, raw);
    console.log(`✅ ${s.name} selesai (~${res.audioSec.toFixed(2)}s, ${res.words} kata)`);
  }
}

main().catch(console.error);
