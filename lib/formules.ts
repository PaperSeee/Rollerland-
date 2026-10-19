import { SITE } from "@/lib/site";
import { translateMany } from "@/lib/translate";

// Single source of truth for the pricing formules: powers both the /tarifs
// table rows and the /tarifs/[slug] detail pages (DRY).
//
// Fallback only: the live content comes from admin → Prices ("formules").
// Written in English like all content; translateFormule() localises it.

export interface Formule {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  priceKids: string; // "—" if not applicable
  priceAdults: string; // "—" if not applicable
  highlight: boolean;
  includes: string[];
  image: string | null;
  ctaLabel: string;
  ctaHref: string;
}

const RESERVE: Pick<Formule, "ctaLabel" | "ctaHref"> = {
  ctaLabel: "Book this package",
  ctaHref: SITE.reservationUrl,
};

export const FORMULES: Formule[] = [
  {
    slug: "wheels-deal",
    name: "Wheels Deal",
    tagline: "The essentials to roll",
    desc: "The simplest package: skate rental to freely enjoy the rink.",
    priceKids: "5€",
    priceAdults: "7€",
    highlight: false,
    includes: ["Skate rental"],
    image: null,
    ...RESERVE,
  },
  {
    slug: "refresh-yourself",
    name: "Refresh Yourself",
    tagline: "Skates, drinks & a snack",
    desc: "Skate and refresh: skates, two drinks of your choice and a snack.",
    priceKids: "10€",
    priceAdults: "14€",
    highlight: false,
    includes: ["Skate rental", "2 drinks of your choice", "Snack"],
    image: null,
    ...RESERVE,
  },
  {
    slug: "birthday-party",
    name: "Birthday Party",
    tagline: "Your birthday on the rink",
    desc: "The standard birthday package to celebrate on skates with your guests.",
    priceKids: "14€",
    priceAdults: "18€",
    highlight: true,
    includes: ["Skate rental", "Snack", "Neon bracelet"],
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg",
    ...RESERVE,
  },
  {
    slug: "birthday-party-plus",
    name: "Birthday Party Plus",
    tagline: "The premium birthday",
    desc: "The premium birthday package, with pizza for the whole gang.",
    priceKids: "20€",
    priceAdults: "24€",
    highlight: true,
    includes: ["Skate rental", "Pizza", "Neon bracelet"],
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg",
    ...RESERVE,
  },
  {
    slug: "team-building",
    name: "Team Building",
    tagline: "Team spirit on skates",
    desc: "An original activity to bring your team together: skates, animation and supervision.",
    priceKids: "16€",
    priceAdults: "23€",
    highlight: false,
    includes: ["Skate rental", "Animation", "Supervision"],
    image: "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg",
    ...RESERVE,
  },
  {
    slug: "after-work",
    name: "After Work",
    tagline: "Unwind with colleagues",
    desc: "The all-inclusive after-work evening to unwind on skates on Friday night.",
    priceKids: "—",
    priceAdults: "30€",
    highlight: false,
    includes: ["Skate rental", "Drinks included", "Animation"],
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.25.jpeg",
    ...RESERVE,
  },
  {
    slug: "school-deal",
    name: "School Deal",
    tagline: "School trips",
    desc: "Package for school groups (7€ for over-16s), with optional educational supervision.",
    priceKids: "5€",
    priceAdults: "—",
    highlight: false,
    includes: ["Skate rental", "Educational supervision available", "Free entry for supervisors"],
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.20.jpeg",
    ...RESERVE,
  },
];

// Localise a fallback formule (English source → FR/NL via the translation cache).
export async function translateFormule(f: Formule, locale: string): Promise<Formule> {
  const out = await translateMany([f.tagline, f.desc, f.ctaLabel, ...f.includes], locale);
  return { ...f, tagline: out[0] || f.tagline, desc: out[1] || f.desc, ctaLabel: out[2] || f.ctaLabel, includes: f.includes.map((x, i) => out[3 + i] || x) };
}

export function getFormule(slug: string): Formule | undefined {
  return FORMULES.find((f) => f.slug === slug);
}
