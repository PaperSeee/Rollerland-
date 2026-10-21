import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Loads the snapshot of the live site content (prisma/content/*.json) into the database:
// - SiteContent (all texts, prices, schedule, menus, images edited in /admin/content)
// - PopupSettings (promo popup)
// Images referenced by the snapshot are in public/content-images/.
// Safe by default: does nothing if the database already has content. Use --force to overwrite.
async function main() {
  const force = process.argv.includes("--force");
  const dir = join(__dirname, "content");
  const content = JSON.parse(readFileSync(join(dir, "site-content.json"), "utf8"));
  const popup = JSON.parse(readFileSync(join(dir, "popup.json"), "utf8"));

  const existing = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const hasContent = existing && Object.keys((existing.data as object) ?? {}).length > 0;
  if (hasContent && !force) {
    console.log("SiteContent already has data — nothing imported (use --force to overwrite).");
    return;
  }
  await prisma.siteContent.upsert({ where: { id: 1 }, create: { id: 1, data: content }, update: { data: content } });
  await prisma.popupSettings.upsert({ where: { id: 1 }, create: { id: 1, ...popup }, update: popup });
  console.log(`Imported ${Object.keys(content).length} content fields and the promo popup.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
