// Remplit le cache de traduction (table Translation) avec cloudflare/traductions.json : la clé DeepL de Vercel est
// illisible ; sans cache, les pages FR/NL afficheraient l'anglais. Usage : npx tsx cloudflare/charger-traductions.ts
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const T: Record<string, [string, string]> = JSON.parse(readFileSync(process.argv[2] || "cloudflare/traductions.json", "utf8"));
const cle = (locale: string, source: string) => createHash("sha256").update(`${locale}::${source}`).digest("hex");

async function main() {
  let n = 0;
  for (const [source, [fr, nl]] of Object.entries(T)) {
    for (const [locale, result] of [["fr", fr], ["nl", nl]] as const) {
      const src = source.trim();
      await prisma.translation.upsert({
        where: { hash: cle(locale, src) },
        create: { hash: cle(locale, src), locale, source: src, result },
        update: {}, // ne jamais écraser une traduction existante (ex. DeepL du client)
      });
      n++;
    }
  }
  console.log(`${n} traductions enregistrées`);
}
main().finally(() => prisma.$disconnect());
