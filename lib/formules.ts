import { SITE } from "@/lib/site";

// Single source of truth for the pricing formules: powers both the /tarifs
// table rows and the /tarifs/[slug] detail pages (DRY).
//
// TODO(client): vérifier chaque formule, le contenu (includes) et les prix
// par rapport à l'ancien site, et fournir une image par formule.

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
  ctaLabel: "Réserver cette formule",
  ctaHref: SITE.reservationUrl,
};

export const FORMULES: Formule[] = [
  {
    slug: "wheels-deal",
    name: "Wheels Deal",
    tagline: "L'essentiel pour rouler",
    desc: "La formule la plus simple : la location de patins pour profiter librement de la piste.",
    priceKids: "5€",
    priceAdults: "7€",
    highlight: false,
    includes: ["Location de patins"],
    image: null,
    ...RESERVE,
  },
  {
    slug: "refresh-yourself",
    name: "Refresh Yourself",
    tagline: "Patins, boissons & snack",
    desc: "De quoi patiner et se rafraîchir : patins, deux boissons au choix et un snack.",
    priceKids: "10€",
    priceAdults: "14€",
    highlight: false,
    includes: ["Location de patins", "2 boissons au choix", "Snack"],
    image: null,
    ...RESERVE,
  },
  {
    slug: "birthday-party",
    name: "Birthday Party",
    tagline: "L'anniversaire sur la piste",
    desc: "La formule anniversaire standard pour fêter ça en patins avec vos invités.",
    priceKids: "14€",
    priceAdults: "18€",
    highlight: true,
    includes: ["Location de patins", "Snack", "Bracelet néon"],
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg",
    ...RESERVE,
  },
  {
    slug: "birthday-party-plus",
    name: "Birthday Party Plus",
    tagline: "L'anniversaire premium",
    desc: "La formule anniversaire premium, avec pizza pour régaler toute la bande.",
    priceKids: "20€",
    priceAdults: "24€",
    highlight: true,
    includes: ["Location de patins", "Pizza", "Bracelet néon"],
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg",
    ...RESERVE,
  },
  {
    slug: "team-building",
    name: "Team Building",
    tagline: "Cohésion d'équipe en roller",
    desc: "Une activité originale pour souder votre équipe : patins, animation et encadrement.",
    priceKids: "16€",
    priceAdults: "23€",
    highlight: false,
    includes: ["Location de patins", "Animation", "Encadrement"],
    image: "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg",
    ...RESERVE,
  },
  {
    slug: "after-work",
    name: "After Work",
    tagline: "Décompresser entre collègues",
    desc: "La soirée afterwork tout inclus pour décompresser en patins le vendredi soir.",
    priceKids: "—",
    priceAdults: "30€",
    highlight: false,
    includes: ["Location de patins", "Boissons incluses", "Animation"],
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.25.jpeg",
    ...RESERVE,
  },
  {
    slug: "school-deal",
    name: "School Deal",
    tagline: "Les sorties scolaires",
    desc: "Formule pour les groupes scolaires (7€ pour les +16 ans), avec encadrement pédagogique possible.",
    priceKids: "5€",
    priceAdults: "—",
    highlight: false,
    includes: ["Location de patins", "Encadrement pédagogique disponible", "Accès libre encadrant"],
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.20.jpeg",
    ...RESERVE,
  },
];

export function getFormule(slug: string): Formule | undefined {
  return FORMULES.find((f) => f.slug === slug);
}
