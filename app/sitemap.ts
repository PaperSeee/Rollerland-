import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { FORMULES } from "@/lib/formules";
import { getContent } from "@/lib/content";

const BASE = "https://www.rollerland.brussels";

// Re-generated hourly so package pages added in the admin show up without a deploy.
export const revalidate = 3600;

// Date of the last real content change — update by hand when pages change
// (never new Date(): every build would announce every page as modified).
const UPDATED = "2026-10-19";

const PAGES = ["", "/horaires", "/pratique", "/tarifs", "/cours", "/private-events", "/disco-roller", "/contact"];

// EN has no prefix (/tarifs); FR and NL are prefixed (/fr/tarifs, /nl/tarifs).
function url(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Package detail pages: built-in packages + any slug added in admin → Prices.
  const content = await getContent();
  const dbSlugs = (Array.isArray(content.formules) ? content.formules : [])
    .map((f) => (typeof f.formule_slug === "string" ? f.formule_slug.trim() : ""))
    .filter(Boolean);
  const slugs = Array.from(new Set([...FORMULES.map((f) => f.slug), ...dbSlugs]));

  const paths = [...PAGES, ...slugs.map((s) => `/tarifs/${s}`)];

  return paths.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(routing.locales.map((l) => [l, url(l, path)])),
      "x-default": url(routing.defaultLocale, path),
    };
    return routing.locales.map((locale) => ({
      url: url(locale, path),
      lastModified: UPDATED,
      changeFrequency: ["", "/disco-roller", "/horaires"].includes(path) ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/tarifs/") ? 0.6 : 0.8,
      alternates: { languages },
    }));
  });
}
