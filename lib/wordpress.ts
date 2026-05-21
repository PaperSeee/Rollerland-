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
}

export async function getRollerland(): Promise<WPAcf> {
  try {
    const res = await fetch(
      `${WP_BASE}/pages?slug=rollerland-brussels&_fields=id,slug,acf`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return {};
    const pages: Array<{ acf?: WPAcf }> = await res.json();
    return pages[0]?.acf ?? {};
  } catch {
    return {};
  }
}
