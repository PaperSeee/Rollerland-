import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Pre-fill the existing site images (from retro.brussels) into SiteContent so the
// admin opens with the current photos already in place (not empty upload slots).
// Only fills image fields that are currently empty — never overwrites a logo the
// client already uploaded.
const R = "https://retro.brussels/wp-content/uploads";

const IMAGES: Record<string, string> = {
  hero_image: `${R}/2025/01/roller-party2-scaled.jpg`,
  home_disco_feature_image: `${R}/2023/10/WhatsApp-Image-2023-10-30-at-22.57.16.jpeg`,
  home_tribute_image: `${R}/2024/10/IMG_20231112_111005-scaled.jpg`,
  disco_hero_image: `${R}/2025/01/roller-party2-scaled.jpg`,
  reglement_image: `${R}/2024/04/roller-rules-Aida-724x1024.jpeg`,
};

const GALLERY = [
  `${R}/2025/01/roller-party2-scaled.jpg`,
  `${R}/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg`,
  `${R}/2023/10/WhatsApp-Image-2023-09-12-at-09.22.29.jpeg`,
  `${R}/2023/10/WhatsApp-Image-2023-09-12-at-09.22.20.jpeg`,
  `${R}/2024/10/IMG_20231112_111005-scaled.jpg`,
  `${R}/2023/10/WhatsApp-Image-2023-09-12-at-09.22.25.jpeg`,
];

async function main() {
  const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const data = ((row?.data as Record<string, unknown>) ?? {});

  let changed = 0;
  for (const [key, url] of Object.entries(IMAGES)) {
    if (!data[key]) {
      data[key] = url;
      changed++;
    }
  }
  // Gallery rows ({ src }) — only set if empty.
  const existingGallery = Array.isArray(data.gallery_images_rows) ? data.gallery_images_rows : [];
  if (existingGallery.length === 0) {
    data.gallery_images_rows = GALLERY.map((src) => ({ src }));
    changed++;
  }

  await prisma.siteContent.upsert({
    where: { id: 1 },
    create: { id: 1, data: data as object },
    update: { data: data as object },
  });
  console.log(`Image pre-fill done (${changed} field(s) set).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
