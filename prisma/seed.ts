import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mirrors the previous hardcoded FALLBACK_EVENTS from app/disco-roller/page.tsx
// so a fresh database starts with sensible content.
const SEED_EVENTS = [
  { date: "2026-05-23", day: "Samedi", theme: "Soirée Classics", dj: "DJ Retro", time: "17h00 – 00h00", special: false, description: "Les meilleurs classiques des années 80-90 sur la piste." },
  { date: "2026-05-29", day: "Vendredi", theme: "Disco Night", dj: "DJ Funky", time: "17h00 – 00h00", special: true, description: "La vraie soirée disco — tenues flashy bienvenues !" },
  { date: "2026-05-30", day: "Samedi", theme: "80s Party", dj: "DJ Retro", time: "17h00 – 00h00", special: false, description: "Synthés, néons et patins — une plongée dans les années 80." },
  { date: "2026-06-06", day: "Vendredi", theme: "Hip-Hop Session", dj: "DJ Fresh", time: "17h00 – 00h00", special: false, description: "Beats urbains et grooves pour une session hip-hop." },
  { date: "2026-06-07", day: "Samedi", theme: "Latin Fever", dj: "DJ Caliente", time: "17h00 – 00h00", special: true, description: "Salsa, reggaeton et zouk — la chaleur latine sur la piste !" },
  { date: "2026-06-13", day: "Samedi", theme: "Summer Opening", dj: "DJ Summer", time: "17h00 – 00h00", special: true, description: "Ouverture de la saison estivale — le plus grand événement de l'année." },
];

async function main() {
  const count = await prisma.discoEvent.count();
  if (count > 0) {
    console.log(`Seed skipped: ${count} disco events already present.`);
    return;
  }
  for (const e of SEED_EVENTS) {
    await prisma.discoEvent.create({
      data: { ...e, date: new Date(e.date + "T00:00:00Z") },
    });
  }
  console.log(`Seeded ${SEED_EVENTS.length} disco events.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
