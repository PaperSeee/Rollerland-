import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

// Auto-translation: content is authored in English; the site renders FR/NL by
// machine-translating via DeepL, cached in the DB so each unique string is only
// translated once. If DEEPL_API_KEY is missing or DeepL errors, we fall back to
// the English source (the site never breaks).

type Locale = "en" | "fr" | "nl";

const DEEPL_LANG: Record<Exclude<Locale, "en">, string> = { fr: "FR", nl: "NL" };

function keyFor(locale: string, source: string): string {
  return createHash("sha256").update(`${locale}::${source}`).digest("hex");
}

// Translate a single string. EN → returned as-is. Empty → "".
export async function translate(text: string | null | undefined, locale: string): Promise<string> {
  const source = (text ?? "").trim();
  if (!source) return "";
  if (locale === "en" || !(locale in DEEPL_LANG)) return source;

  const [out] = await translateMany([source], locale);
  return out ?? source;
}

// Translate many strings at once (one DeepL request for all cache-misses).
// Order of results matches the input order.
export async function translateMany(texts: string[], locale: string): Promise<string[]> {
  if (locale === "en" || !(locale in DEEPL_LANG)) return texts.map((t) => t ?? "");

  const sources = texts.map((t) => (t ?? "").trim());
  const results = new Array<string>(sources.length);
  const missingIdx: number[] = [];

  // 1) Look up the cache.
  await Promise.all(
    sources.map(async (src, i) => {
      if (!src) {
        results[i] = "";
        return;
      }
      try {
        const hit = await prisma.translation.findUnique({ where: { hash: keyFor(locale, src) } });
        if (hit) results[i] = hit.result;
        else missingIdx.push(i);
      } catch {
        missingIdx.push(i);
      }
    }),
  );

  if (missingIdx.length === 0) return results;

  // 2) Translate cache-misses via DeepL (fallback to source on any failure).
  const toTranslate = missingIdx.map((i) => sources[i]);
  let translated: string[];
  try {
    translated = await deeplTranslate(toTranslate, DEEPL_LANG[locale as "fr" | "nl"]);
  } catch (e) {
    console.error("DeepL translate failed:", e);
    missingIdx.forEach((i) => (results[i] = sources[i])); // fallback: English
    return results;
  }

  // 3) Fill results + persist to cache.
  await Promise.all(
    missingIdx.map(async (origIdx, k) => {
      const src = sources[origIdx];
      const res = translated[k] ?? src;
      results[origIdx] = res;
      try {
        await prisma.translation.upsert({
          where: { hash: keyFor(locale, src) },
          create: { hash: keyFor(locale, src), locale, source: src, result: res },
          update: { result: res },
        });
      } catch {
        /* cache write best-effort */
      }
    }),
  );

  return results;
}

async function deeplTranslate(texts: string[], targetLang: string): Promise<string[]> {
  const key = process.env.DEEPL_API_KEY;
  if (!key) throw new Error("DEEPL_API_KEY missing");

  // Free keys end with ":fx" and use api-free; paid keys use api.
  const endpoint = key.endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: texts, source_lang: "EN", target_lang: targetLang }),
    // Translations are cached in our DB; no need to cache the HTTP call.
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`DeepL ${res.status}`);
  const data = (await res.json()) as { translations: Array<{ text: string }> };
  return data.translations.map((t) => t.text);
}
