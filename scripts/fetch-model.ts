import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const API_KEY = process.env.POLY_PIZZA_API_KEY;
const query = process.argv[2];
const customFilename = process.argv[3];

if (!query) {
  console.error("❌ Masukkan kata kunci model! Contoh: bun run fetch-model 'palm tree' 'palm-tree'");
  process.exit(1);
}

// Koleksi fallback model open-source (Three.js & Khronos CC0/MIT)
const GITHUB_FALLBACK_CATALOG: Record<string, string> = {
  // Fauna
  horse: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Horse.glb",
  flamingo: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Flamingo.glb",
  parrot: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Parrot.glb",
  stork: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Stork.glb",
  duck: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb",
  // Sci-fi / Space / Objects
  astronaut: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Astronaut/glTF-Binary/Astronaut.glb",
  earth: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Planets/Earth_1_12756.glb",
  cube: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Box/glTF-Binary/Box.glb",
  lantern: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Lantern/glTF-Binary/Lantern.glb",
  avocado: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Avocado/glTF-Binary/Avocado.glb",
};

/**
 * Validasi ketat biner glTF (.glb)
 * Wajib memiliki magic header "glTF" dan ukuran minimal 1 KB.
 */
function validateGlbBinary(buffer: Buffer): { valid: boolean; reason?: string } {
  if (buffer.length < 1024) {
    return { valid: false, reason: `Ukuran file terlalu kecil (${buffer.length} bytes, minimal 1024 bytes)` };
  }
  const magic = buffer.subarray(0, 4).toString("utf8");
  if (magic !== "glTF") {
    const preview = buffer.subarray(0, 60).toString("utf8").replace(/\r|\n/g, " ");
    return { valid: false, reason: `Header biner bukan 'glTF' (ditemukan: "${preview}...")` };
  }
  return { valid: true };
}

async function queryPolyPizza(q: string) {
  if (!API_KEY) return null;
  const searchUrl = `https://api.poly.pizza/v1.1/search/${encodeURIComponent(q)}`;
  try {
    const res = await fetch(searchUrl, {
      headers: { "x-auth-token": API_KEY },
    });
    return res;
  } catch {
    return null;
  }
}

async function tryPolyPizza(searchQuery: string): Promise<Buffer | null> {
  console.log(`🔍 [Lapis 1] Mencari di Poly Pizza API: "${searchQuery}"...`);

  let res = await queryPolyPizza(searchQuery);

  // Fallback sinonim jika query umum gagal (misal 500 error)
  if (!res || !res.ok) {
    const synonyms: Record<string, string[]> = {
      "pine tree": ["fir", "oak", "palm tree"],
      "pine": ["fir", "oak", "evergreen"],
      "tree": ["oak", "fir", "palm"],
      "palm tree": ["palm", "tropical tree"],
      "desert rock": ["rock", "stone", "boulder"],
      "whale skeleton": ["whale", "fossil", "skeleton"],
      "cloud": ["low poly cloud", "cumulus", "smoke"],
      "grass": ["tuft", "plant", "bush"],
    };

    const alternatives = synonyms[searchQuery.toLowerCase()] || searchQuery.split(" ");
    for (const alt of alternatives) {
      console.log(`🔄 Poly Pizza fallback kata kunci: "${alt}"...`);
      res = await queryPolyPizza(alt);
      if (res && res.ok) break;
    }
  }

  if (!res || !res.ok) {
    console.warn(`⚠️ Poly Pizza tidak merespon (Status: ${res ? res.status : "offline"}). Melanjutkan ke fallback...`);
    return null;
  }

  const data = (await res.json()) as {
    results?: Array<{
      Title?: string;
      Creator?: string | { Username?: string };
      Licence?: string;
      Download?: string;
    }>;
  };
  const results = data.results || [];
  if (results.length === 0) return null;

  const topModel = results.find((m) => m.Download) || results[0];
  if (!topModel?.Download) return null;

  const creatorName =
    typeof topModel.Creator === "object"
      ? topModel.Creator?.Username || "Unknown"
      : topModel.Creator || "Unknown";
  console.log(`✅ [Poly Pizza] Ditemukan: "${topModel.Title}" oleh ${creatorName} (${topModel.Licence || "Free"})`);

  const fileRes = await fetch(topModel.Download);
  if (!fileRes.ok) return null;

  const arrayBuffer = await fileRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const check = validateGlbBinary(buffer);
  if (!check.valid) {
    console.warn(`❌ [Poly Pizza] File tidak lolos validasi: ${check.reason}`);
    return null;
  }

  return buffer;
}

async function tryGitHubFallback(searchQuery: string): Promise<Buffer | null> {
  console.log(`🌐 [Lapis 2] Mencari di GitHub Open-Source Repositories untuk: "${searchQuery}"...`);

  const qLower = searchQuery.toLowerCase();
  // Cek katalog GitHub
  let matchedUrl: string | undefined;
  for (const [key, url] of Object.entries(GITHUB_FALLBACK_CATALOG)) {
    if (qLower.includes(key) || key.includes(qLower)) {
      matchedUrl = url;
      break;
    }
  }

  if (!matchedUrl) {
    // Coba tebak nama model dari Three.js examples (PascalCase)
    const pascalName = searchQuery
      .split(/[\s-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("");
    matchedUrl = `https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/${pascalName}.glb`;
  }

  try {
    console.log(`📥 Mengunduh dari GitHub: ${matchedUrl}...`);
    const res = await fetch(matchedUrl);
    if (!res.ok) {
      console.warn(`⚠️ GitHub HTTP ${res.status} untuk ${matchedUrl}`);
      return null;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const check = validateGlbBinary(buffer);
    if (!check.valid) {
      console.warn(`❌ [GitHub] File tidak valid: ${check.reason}`);
      return null;
    }

    console.log(`✅ [GitHub] Berhasil mengunduh model open-source valid!`);
    return buffer;
  } catch (err: any) {
    console.warn(`⚠️ Gagal fetch dari GitHub: ${err.message}`);
    return null;
  }
}

async function runPipeline() {
  const modelsDir = join(process.cwd(), "public", "models");
  await mkdir(modelsDir, { recursive: true });

  const safeName = (customFilename || query.toLowerCase().replace(/[^a-z0-9]+/g, "-")) + ".glb";
  const outputPath = join(modelsDir, safeName);

  // 1. Coba Poly Pizza
  let modelBuffer: Buffer | null = await tryPolyPizza(query);

  // 2. Coba GitHub Open-Source Fallback jika Lapis 1 gagal
  if (!modelBuffer) {
    modelBuffer = await tryGitHubFallback(query);
  }

  if (!modelBuffer) {
    throw new Error(
      `Semua sumber gagal mengunduh model untuk "${query}". Komponen 3D akan otomatis menggunakan procedural geometry fallback.`
    );
  }

  // Tulis file ke public/models/
  await writeFile(outputPath, modelBuffer);

  // Validasi akhir di filesystem
  if (existsSync(outputPath)) {
    const finalCheck = validateGlbBinary(modelBuffer);
    if (!finalCheck.valid) {
      await unlink(outputPath);
      throw new Error(`File ${outputPath} korup dan telah dihapus: ${finalCheck.reason}`);
    }
  }

  console.log(`🎉 SUKSES: Model tersimpan di public/models/${safeName} (${(modelBuffer.length / 1024).toFixed(1)} KB)`);
}

runPipeline().catch((err) => {
  console.error("❌ Pipeline Error:", err.message);
  process.exit(1);
});
