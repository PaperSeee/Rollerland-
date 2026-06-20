import { prisma } from "@/lib/prisma";

// Shape consumed by app/disco-roller/page.tsx. `date` is an ISO YYYY-MM-DD
// string so the page's formatDate(date + "T00:00:00") keeps working.
export interface DiscoEventView {
  id: string;
  date: string;
  day: string;
  theme: string;
  dj: string;
  time: string;
  special: boolean;
  desc: string;
  image: string | null;
  imagePosition: string | null;
}

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Returns events ordered by date ascending. Returns [] on any DB error so the
// page can fall back to its hardcoded list (resilient to a cold/missing DB).
export async function getDiscoEvents(): Promise<DiscoEventView[]> {
  try {
    const events = await prisma.discoEvent.findMany({ orderBy: { date: "asc" } });
    return events.map((e) => ({
      id: e.id,
      date: toISODate(e.date),
      day: e.day,
      theme: e.theme,
      dj: e.dj ?? "",
      time: e.time,
      special: e.special,
      desc: e.description,
      image: e.image,
      imagePosition: e.imagePosition,
    }));
  } catch (err) {
    console.error("getDiscoEvents failed:", err);
    return [];
  }
}
