/**
 * Normalizer Teks Bahasa Indonesia untuk TTS Video Pendek (Short-form)
 * Mengubah angka, mata uang, persentase, singkatan, dan satuan teknis
 * menjadi bentuk lisan yang luwes, alami, dan konsisten saat dibacakan TTS.
 */

/**
 * Mengubah bilangan bulat non-negatif menjadi teks lisan bahasa Indonesia.
 */
export function numberToWordsId(n: number): string {
  if (n === 0) return "nol";
  if (n < 0) return "minus " + numberToWordsId(Math.abs(n));

  const ones = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
  ];

  if (n < 12) return ones[n];
  if (n < 20) return ones[n - 10] + " belas";
  if (n < 100) {
    const rem = n % 10;
    return ones[Math.floor(n / 10)] + " puluh" + (rem > 0 ? " " + ones[rem] : "");
  }
  if (n < 200) {
    const rem = n % 100;
    return "seratus" + (rem > 0 ? " " + numberToWordsId(rem) : "");
  }
  if (n < 1000) {
    const rem = n % 100;
    return (
      ones[Math.floor(n / 100)] +
      " ratus" +
      (rem > 0 ? " " + numberToWordsId(rem) : "")
    );
  }
  if (n < 2000) {
    const rem = n % 1000;
    return "seribu" + (rem > 0 ? " " + numberToWordsId(rem) : "");
  }
  if (n < 1_000_000) {
    const thousands = Math.floor(n / 1000);
    const rem = n % 1000;
    return (
      numberToWordsId(thousands) +
      " ribu" +
      (rem > 0 ? " " + numberToWordsId(rem) : "")
    );
  }
  if (n < 1_000_000_000) {
    const millions = Math.floor(n / 1_000_000);
    const rem = n % 1_000_000;
    return (
      numberToWordsId(millions) +
      " juta" +
      (rem > 0 ? " " + numberToWordsId(rem) : "")
    );
  }
  if (n < 1_000_000_000_000) {
    const billions = Math.floor(n / 1_000_000_000);
    const rem = n % 1_000_000_000;
    return (
      numberToWordsId(billions) +
      " miliar" +
      (rem > 0 ? " " + numberToWordsId(rem) : "")
    );
  }
  const trillions = Math.floor(n / 1_000_000_000_000);
  const rem = n % 1_000_000_000_000;
  return (
    numberToWordsId(trillions) +
    " triliun" +
    (rem > 0 ? " " + numberToWordsId(rem) : "")
  );
}

/**
 * Normalisasi teks Indonesia sebelum masuk ke Text-to-Speech:
 * 1. Menghilangkan dash dan simbol aneh
 * 2. Mengubah satuan dan pengukuran menjadi kata penuh
 * 3. Menangani rentang angka (misal: 1911-1913 -> 1911 sampai 1913)
 * 4. Mengubah bilangan bertingkat/ordinal (ke-1 -> pertama, ke-2 -> kedua)
 * 5. Mengubah mata uang (Rp 14 triliun -> empat belas triliun rupiah)
 * 6. Mengubah persentase (50% -> lima puluh persen)
 * 7. Mengubah angka desimal (2,5 miliar -> dua koma lima miliar)
 * 8. Mengubah angka bulat ke bentuk lisan
 * 9. Mengembangkan singkatan & akronim umum (AI, dll, thn, km/jam)
 */
export function normalizeIndonesianText(text: string): string {
  if (!text || typeof text !== "string") return "";

  let s = text;

  // 1. Standarisasi tanda kutip dan tanda hubung
  s = s.replace(/[\u2013\u2014]/g, "-");
  s = s.replace(/[\u2018\u2019]/g, "'");
  s = s.replace(/[\u201C\u201D]/g, '"');

  // 2. Satuan & pengukuran dengan angka di depannya (agar spasi terjaga)
  s = s.replace(/(\d+)\s*(?:°C|derajat\s+C)\b/gi, "$1 derajat celsius");
  s = s.replace(/(\d+)\s*km\/jam\b/gi, "$1 kilometer per jam");
  s = s.replace(/(\d+)\s*km[²2]\b/gi, "$1 kilometer persegi");
  s = s.replace(/(\d+)\s*m[²2]\b/gi, "$1 meter persegi");
  s = s.replace(/(\d+)\s*km\b/gi, "$1 kilometer");
  s = s.replace(/(\d+)\s*cm\b/gi, "$1 sentimeter");
  s = s.replace(/(\d+)\s*mm\b/gi, "$1 milimeter");
  s = s.replace(/(\d+)\s*kg\b/gi, "$1 kilogram");
  s = s.replace(/(\d+)\s*gr\b/gi, "$1 gram");
  s = s.replace(/(\d+)\s*wpm\b/gi, "$1 kata per menit");
  s = s.replace(/(\d+)\s*fps\b/gi, "$1 frame per detik");
  s = s.replace(/(\d+)\s*rb\b/gi, "$1 ribu");
  s = s.replace(/(\d+)\s*jt\b/gi, "$1 juta");
  s = s.replace(/(\d+)\s*k\b/gi, "$1 ribu");

  // 3. Rentang angka: 1911-1913 -> 1911 sampai 1913, 10-15 -> 10 sampai 15
  s = s.replace(/(\b\d+)\s*-\s*(\d+\b)/g, "$1 sampai $2");

  // 4. Bilangan ordinal/tingkat: ke-1 -> pertama, ke-2 -> kedua, ke-21 -> kedua puluh satu
  s = s.replace(/\bke-(\d+)\b/gi, (_, num) => {
    const n = parseInt(num, 10);
    if (n === 1) return "pertama";
    return "ke" + numberToWordsId(n);
  });

  // Angka Romawi untuk abad / generasi
  const romanMap: Record<string, number> = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9,
    X: 10,
    XI: 11,
    XII: 12,
    XIII: 13,
    XIV: 14,
    XV: 15,
    XVI: 16,
    XVII: 17,
    XVIII: 18,
    XIX: 19,
    XX: 20,
    XXI: 21,
  };
  s = s.replace(
    /\b(abad|generasi|peringkat)\s+(?:ke-)?([IVXLCDM]+)\b/gi,
    (match, prefix, roman) => {
      const val = romanMap[roman.toUpperCase()];
      if (val) {
        return (
          `${prefix} ` + (val === 1 ? "pertama" : "ke" + numberToWordsId(val))
        );
      }
      return match;
    },
  );

  // 5. Nominal uang
  // Rp 14 triliun -> empat belas triliun rupiah, Rp 50.000 -> lima puluh ribu rupiah
  s = s.replace(
    /\bRp\.?\s*([\d.,]+)\s*(triliun|miliar|juta|ribu)?\b/gi,
    (_, amount, unit) => {
      const clean = amount.replace(/\./g, "").replace(",", ".");
      const num = parseFloat(clean);
      const spoken = isNaN(num) ? amount : numberToWordsId(Math.round(num));
      if (unit) {
        return `${spoken} ${unit.toLowerCase()} rupiah`;
      }
      return `${spoken} rupiah`;
    },
  );

  // $100 -> seratus dolar, $2.5 juta -> dua koma lima juta dolar
  s = s.replace(
    /\$\s*([\d.,]+)\s*(triliun|miliar|juta|ribu)?\b/gi,
    (_, amount, unit) => {
      const clean = amount.replace(/\./g, "").replace(",", ".");
      const num = parseFloat(clean);
      const spoken = isNaN(num) ? amount : numberToWordsId(Math.round(num));
      if (unit) {
        return `${spoken} ${unit.toLowerCase()} dolar`;
      }
      return `${spoken} dolar`;
    },
  );

  // 6. Persentase: 50% -> lima puluh persen, 2,5% -> dua koma lima persen
  s = s.replace(/(\d+(?:[.,]\d+)?)\s*%/g, (_, val) => {
    if (val.includes(",") || val.includes(".")) {
      const parts = val.replace(",", ".").split(".");
      const whole = numberToWordsId(parseInt(parts[0], 10));
      const decimalDigits = parts[1]
        .split("")
        .map((d: string) => numberToWordsId(parseInt(d, 10)))
        .join(" ");
      return `${whole} koma ${decimalDigits} persen`;
    }
    return `${numberToWordsId(parseInt(val, 10))} persen`;
  });

  // 7. Angka desimal dengan satuan besar: 2,5 miliar -> dua koma lima miliar
  s = s.replace(
    /(\d+)[.,](\d+)\s*(triliun|miliar|juta|ribu)\b/gi,
    (_, whole, dec, unit) => {
      const wholeSpoken = numberToWordsId(parseInt(whole, 10));
      const decSpoken = dec
        .split("")
        .map((d: string) => numberToWordsId(parseInt(d, 10)))
        .join(" ");
      return `${wholeSpoken} koma ${decSpoken} ${unit.toLowerCase()}`;
    },
  );

  // Desimal mandiri: 3,5 meter -> tiga koma lima meter (hindari separator ribuan titik)
  s = s.replace(/(\b\d+)[.,](\d+)\b/g, (match, whole, dec) => {
    // Jika format ribuan (3 digit setelah titik dan bilangan bulat positif), jangan anggap desimal
    if (dec.length === 3 && parseInt(whole, 10) > 0 && match.includes(".")) {
      return match;
    }
    const wholeSpoken = numberToWordsId(parseInt(whole, 10));
    const decSpoken = dec
      .split("")
      .map((d: string) => numberToWordsId(parseInt(d, 10)))
      .join(" ");
    return `${wholeSpoken} koma ${decSpoken}`;
  });

  // 8. Angka ribuan berformat titik (misal: 10.000 atau 1.500.000)
  s = s.replace(/\b(\d{1,3}(?:\.\d{3})+)\b/g, (_, numStr) => {
    const n = parseInt(numStr.replace(/\./g, ""), 10);
    return isNaN(n) ? numStr : numberToWordsId(n);
  });

  // Angka bilangan bulat biasa (misal: 1503, 16, 2)
  s = s.replace(/\b(\d+)\b/g, (_, numStr) => {
    const n = parseInt(numStr, 10);
    return isNaN(n) ? numStr : numberToWordsId(n);
  });

  // 9. Singkatan umum & akronim dalam narasi video
  const abbrevs: [RegExp, string][] = [
    [/\bdll\.?/gi, "dan lain-lain"],
    [/\bdsb\.?/gi, "dan sebagainya"],
    [/\bdst\.?/gi, "dan seterusnya"],
    [/\bdkk\.?/gi, "dan kawan-kawan"],
    [/\btsb\.?/gi, "tersebut"],
    [/\byg\b/gi, "yang"],
    [/\bdgn\b/gi, "dengan"],
    [/\butk\b/gi, "untuk"],
    [/\bthn\.?/gi, "tahun"],
    [/\bbln\.?/gi, "bulan"],
    [/\bno\.?\s*([a-zA-Z0-9]+)/gi, "nomor $1"],
    [/\bAI\b/g, "A I"],
    [/\b3D\b/gi, "tiga D"],
    [/\b2D\b/gi, "dua D"],
    [/\bNASA\b/g, "Nasa"],
    [/\bBMKG\b/g, "B M K G"],
    [/\bPBB\b/g, "P B B"],
    [/\bFBI\b/g, "F B I"],
    [/\bCIA\b/g, "C I A"],
    [/\bWHO\b/g, "W H O"],
    [/\bKPK\b/g, "K P K"],
    [/\bCovid-19\b|\bCOVID-19\b/gi, "Kovid sembilan belas"],
  ];
  for (const [re, replacement] of abbrevs) {
    s = s.replace(re, replacement);
  }

  // 10. Bersihkan spasi berlebih
  s = s.replace(/\s+/g, " ").trim();

  return s;
}
