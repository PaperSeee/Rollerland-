import { PrismaClient } from "@prisma/client";
import { DEFAULT_CONTENT } from "../lib/defaults";

const prisma = new PrismaClient();

// One-time pre-fill of the SiteContent blob with the canonical defaults from
// lib/defaults.ts (shared with the admin forms), so the /admin/content editors
// open already populated. Safe to re-run: only seeds when the row is empty.
async function main() {
  const existing = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const isEmpty = !existing || Object.keys((existing.data as object) ?? {}).length === 0;
  if (!isEmpty) {
    console.log("SiteContent already populated — seed skipped.");
    return;
  }
  await prisma.siteContent.upsert({
    where: { id: 1 },
    create: { id: 1, data: DEFAULT_CONTENT as object },
    update: { data: DEFAULT_CONTENT as object },
  });
  console.log("SiteContent seeded with default English content.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
