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

  // ── CMS v3 (WordPress-editable, single-language EN; site auto-translates) ──
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
  // Tarifs — structured repeaters
  options_supplementaires?: Array<Record<string, unknown>>;
  formules?: Array<Record<string, unknown>>;
  // Pratique — rules repeater
  rules?: Array<Record<string, unknown>>;
  // Single-language editable text fields (footer_*, home_*, *_intro, …).
  [key: string]: unknown;
}

export type Locale = "en" | "fr" | "nl";

// Read a single-language ACF text field (English). Translation to FR/NL happens
// at render time via lib/translate. Returns "" if unset.
export function pick(acf: WPAcf, base: string): string {
  const val = acf[base as keyof WPAcf];
  return typeof val === "string" ? val.trim() : "";
}

// Read a string value from a repeater row (single-language).
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
