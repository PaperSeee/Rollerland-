const WP_BASE = "https://retro.brussels/wp-json/wp/v2";

export interface WPAcf {
  // Général
  hero_tagline?: string;
  hero_image?: string;
  gallery_images?: string[];
  whatsapp_number?: string;
  reservation_url?: string;
  // Horaires
  horaire_mercredi?: string;
  horaire_vendredi?: string;
  horaire_samedi?: string;
  horaire_dimanche?: string;
  horaire_note_dimanche?: string;
  fermetures_exceptionnelles?: Array<{ periode: string; raison: string }>;
  // Tarifs
  tarif_enfant?: string;
  tarif_adulte?: string;
  tarif_protection?: string;
  tarif_vestiaire?: string;
  forfaits_groupe?: Array<{ nom: string; description: string; prix_enfant: string; prix_adulte: string }>;
  menu_boissons?: Array<{ nom: string; prix: string }>;
  menu_nourriture?: Array<{ nom: string; prix: string }>;
  // Disco Roller
  disco_hero_image?: string;
  disco_evenements?: Array<{
    date: string;
    jour: string;
    theme: string;
    description: string;
    dj?: string;
    horaire: string;
    special: boolean;
    image?: string;
  }>;
  // Services
  services_liste?: Array<{ titre: string; horaire: string; description: string; image?: string }>;
  // Cours
  cours_image?: string;
  cours_enfants_prix?: string;
  cours_enfants_horaire?: string;
  cours_adultes_prix?: string;
  cours_adultes_horaire?: string;
  cours_tickettailor_url?: string;
  start2ride_actif?: boolean;
  start2ride_date?: string;
  start2ride_image?: string;
  start2ride_url?: string;
  // Pratique
  reglement_image?: string;
  parking_url?: string;

  // ── CMS v2 (WordPress-editable, EN/FR/NL triplets) ──────────────────
  // Global settings (neutral)
  site_email?: string;
  social_instagram?: string;
  social_facebook?: string;
  social_tiktok?: string;
  google_review_url?: string;
  cours_whatsapp_group_url?: string;
  // Home — structured
  home_tribute_image?: string;
  partners?: Array<{ partner_name: string; partner_logo?: string; partner_url?: string }>;
  // Tarifs — structured repeaters (sub-field text values are localized triplets)
  options_supplementaires?: Array<Record<string, unknown>>;
  formules?: Array<Record<string, unknown>>;
  // Pratique — rules repeater (each row has rule_text_{en,fr,nl})
  rules?: Array<Record<string, unknown>>;
  // Triplet text fields (footer_*, home_*) accessed via pick(); declared as an
  // index signature so any "<base>_<locale>" key type-checks.
  [key: `${string}_en`]: unknown;
  [key: `${string}_fr`]: unknown;
  [key: `${string}_nl`]: unknown;
}

export type Locale = "en" | "fr" | "nl";

// Pick a localized ACF text field: tries `<base>_<locale>`, then FR, then EN.
// Returns "" if none set, so callers can fall back to their own default.
export function pick(acf: WPAcf, base: string, locale: string): string {
  const order = [locale, "fr", "en"];
  for (const loc of order) {
    const val = acf[`${base}_${loc}` as keyof WPAcf];
    if (typeof val === "string" && val.trim()) return val;
  }
  return "";
}

// Same as pick() but for a repeater row object (e.g. a formule / option / rule).
export function pickRow(row: Record<string, unknown>, base: string, locale: string): string {
  for (const loc of [locale, "fr", "en"]) {
    const val = row[`${base}_${loc}`];
    if (typeof val === "string" && val.trim()) return val;
  }
  return "";
}

// Read a plain (non-localized) string value from a repeater row.
export function rowStr(row: Record<string, unknown>, key: string): string {
  const v = row[key];
  return typeof v === "string" ? v : "";
}

export async function getRollerland(): Promise<WPAcf> {
  try {
    const res = await fetch(
      `${WP_BASE}/pages?slug=rollerland-brussels&_fields=id,slug,acf&_=${Date.now()}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.error("WP fetch failed:", res.status, res.statusText);
      return {};
    }
    const text = await res.text();
    console.log("WP raw response (first 500):", text.slice(0, 500));
    const pages: Array<{ acf?: WPAcf }> = JSON.parse(text);
    console.log("WP pages length:", pages.length, "acf keys:", Object.keys(pages[0]?.acf ?? {}));
    return pages[0]?.acf ?? {};
  } catch (e) {
    console.error("WP fetch error:", e);
    return {};
  }
}
