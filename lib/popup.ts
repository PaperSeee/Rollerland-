import { prisma } from "@/lib/prisma";

export interface PopupView {
  title: string;
  body: string;
  imageUrl: string | null;
  imagePosition: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  version: string; // updatedAt timestamp — used to key the once-per-visitor flag
}

// Returns the popup config only when it exists and is enabled, otherwise null.
// Resilient to DB errors so the whole site never fails because of the popup.
export async function getPopup(): Promise<PopupView | null> {
  try {
    const p = await prisma.popupSettings.findUnique({ where: { id: 1 } });
    if (!p || !p.enabled || !p.title) return null;
    return {
      title: p.title,
      body: p.body,
      imageUrl: p.imageUrl,
      imagePosition: p.imagePosition,
      ctaLabel: p.ctaLabel,
      ctaUrl: p.ctaUrl,
      version: String(p.updatedAt.getTime()),
    };
  } catch (err) {
    console.error("getPopup failed:", err);
    return null;
  }
}
