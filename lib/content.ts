import { prisma } from "@/lib/prisma";
import type { WPAcf } from "@/lib/wordpress";
import { DEFAULT_CONTENT } from "@/lib/defaults";

// All editable site content lives in a single SiteContent row (id = 1) as JSON,
// shaped like WPAcf. Edited from /admin/content/*, read by getRollerland().

// Read the content blob. Returns {} on any error so pages fall back to defaults.
export async function getContent(): Promise<WPAcf> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
    return ((row?.data as WPAcf) ?? {}) as WPAcf;
  } catch (err) {
    console.error("getContent failed:", err);
    return {};
  }
}

// Content for the admin FORMS: the canonical defaults with the saved DB values
// merged on top. This makes every editor open already showing the current
// (or default) content — including lists like the menu, footer and prices —
// instead of an empty form. The public site still uses getContent() so its own
// component-level fallbacks remain in charge of what visitors see.
export async function getEditableContent(): Promise<Record<string, unknown>> {
  const db = (await getContent()) as Record<string, unknown>;
  return { ...DEFAULT_CONTENT, ...db };
}

// Merge a partial update into the content blob (shallow merge of top-level keys).
export async function saveContent(patch: Record<string, unknown>): Promise<void> {
  const current = await getContent();
  const next = { ...current, ...patch };
  await prisma.siteContent.upsert({
    where: { id: 1 },
    create: { id: 1, data: next as object },
    update: { data: next as object },
  });
}
