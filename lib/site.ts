// ── Central site configuration ───────────────────────────────────────────
// Single source of truth for contact details, social links and key URLs.
// Edit here instead of hunting through individual pages/components.

export const SITE = {
  name: "RollerlandBrussels",
  email: "info@rollerland.brussels",
  address: {
    line1: "Rue Dieudonné Lefèvre 4",
    line2: "B-1020 Laeken, Bruxelles",
    mapsUrl: "https://maps.app.goo.gl/wUYExjkrJLUSWEf88",
  },
  // Online reservation form (Google Form)
  reservationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform",
  reservationEmbedUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform?embedded=true",
  // Social networks. TODO(client): confirm/replace these handles with the
  // real Rollerland Brussels accounts.
  socials: {
    instagram: "https://www.instagram.com/rollerland.brussels/",
    facebook: "https://www.facebook.com/rollerlandbrussels",
    tiktok: "https://www.tiktok.com/@rollerland.brussels",
  },
  // "Laisser un avis" button. TODO(client): replace with the real Google
  // Maps "write a review" link for the venue.
  googleReviewUrl: "https://maps.app.goo.gl/wUYExjkrJLUSWEf88",
  // WhatsApp group used ONLY for course cancellations (kept per spec).
  // TODO(client): paste the real WhatsApp group invite link here.
  coursWhatsappGroupUrl: "",
} as const;

export type SiteConfig = typeof SITE;
