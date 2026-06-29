import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// One-time pre-fill of the SiteContent blob with sensible English defaults, so
// the /admin/content editors open already populated. Safe to re-run: only seeds
// when the row is empty.
const DEFAULT_CONTENT = {
  // Global
  site_email: "info@rollerland.brussels",
  social_instagram: "https://www.instagram.com/rollerland.brussels/",
  social_facebook: "https://www.facebook.com/rollerlandbrussels",
  social_tiktok: "https://www.tiktok.com/@rollerland.brussels",
  google_review_url: "https://maps.app.goo.gl/wUYExjkrJLUSWEf88",
  cours_whatsapp_group_url: "",
  // Footer
  footer_tagline: "The roller skating rink in the heart of Brussels.",
  footer_subtitle: "Disco, lessons, birthdays & team building.",
  footer_closed_note: "Mon–Tue–Thu by reservation",
  // Home
  home_location: "Brussels · 1020 Laeken",
  home_hero_lead: "The roller skating rink in the heart of Brussels.\nDisco, lessons, birthdays & team building.",
  home_open_tonight: "OPEN TONIGHT",
  home_tribute_title: "Tribute to",
  home_tribute_body:
    "Rollerland Brussels carries on the legacy of Rollerland Aalst, a Belgian roller skating institution.",
  home_tribute_image: "",
  home_services_title: "Services & Activities",
  home_partners_title: "Our partners",
  home_cta_title: "",
  home_cta_lead: "Book online or by email at info@rollerland.brussels. Quick reply guaranteed.",
  partners: [
    { partner_name: "Be Here", partner_url: "https://www.behere.brussels/", partner_logo: "/partners/be-here.png" },
    { partner_name: "Kinepolis", partner_url: "https://kinepolis.be/", partner_logo: "/partners/kinepolis.png" },
    { partner_name: "Brussels Airlines", partner_url: "https://www.brusselsairlines.com/", partner_logo: "/partners/brussels-airlines.png" },
    { partner_name: "VGC", partner_url: "https://www.vgc.be/", partner_logo: "/partners/vgc.png" },
    { partner_name: "Rollerland Aalst", partner_url: "https://www.rollerland.be/", partner_logo: "/partners/rollerland-aalst.png" },
    { partner_name: "Skate Vlaanderen", partner_url: "https://www.skate.vlaanderen/", partner_logo: "/partners/skate-vlaanderen.png" },
  ],
  // Prices
  tarifs_intro: "All prices are per person. Reservation required for groups. Skates included in all group packages.",
  consume_notice_1: "Please consume locally and support Be Here.",
  consume_notice_2: "Refrain from bringing your own food and drinks.",
  tarif_enfant: "6€",
  tarif_adulte: "8€",
  tarif_protection: "1€/pair",
  tarif_vestiaire: "1€",
  options_supplementaires: [
    { option_label: "Private lesson / animation", option_price: "75€/hour" },
    { option_label: "Karaoke", option_price: "50€/hour" },
  ],
  formules: [
    { formule_slug: "wheels-deal", formule_nom: "Wheels Deal", formule_tagline: "The essentials to roll", formule_description: "Skate rental to freely enjoy the rink.", formule_prix_enfant: "5€", formule_prix_adulte: "7€", formule_highlight: false, formule_image: "", formule_includes: [{ include_item: "Skate rental" }] },
    { formule_slug: "birthday-party", formule_nom: "Birthday Party", formule_tagline: "Your birthday on the rink", formule_description: "The standard birthday package.", formule_prix_enfant: "14€", formule_prix_adulte: "18€", formule_highlight: true, formule_image: "", formule_includes: [{ include_item: "Skate rental" }, { include_item: "Snack" }, { include_item: "Neon bracelet" }] },
  ],
  // Schedule
  horaires_intro: "Outside regular hours, the rink is available by reservation for school groups, team buildings and birthdays.",
  // Practical
  pratique_intro: "Everything you need to know before coming to Rollerland Brussels.",
  parking_text: "Secure parking available at number 160. Book your spot online via ParkBee.",
  parking_url: "https://go.parkbee.net/start-booking/24763",
  rules: [
    { rule_text: "Roller skates are required on the rink." },
    { rule_text: "Protective gear (knee, elbow, wrist) is strongly recommended." },
    { rule_text: "No inline skates on the quad roller rink." },
    { rule_text: "Respect other skaters at all times." },
  ],
  // Lessons
  cours_intro: "Learn to skate or improve your technique with our certified instructors. Skates included.",
  start2ride_desc: "Outdoor training at Parc de Laeken. Practice roller skating in a natural setting with our instructors.",
  cours_own_skates_text: "Bringing your own skates? Protective gear is free. No extra charge.",
  cours_cancellations_text: "Join the lessons WhatsApp group to be informed in real time of cancellations or schedule changes.",
  // Private Events
  pe_intro: "From disco nights to team building and birthdays — Rollerland Brussels adapts to all your private event projects.",
  pe_privatization_title: "Privatize the rink for your event",
  pe_privatization_text: "The rink is available for privatization for large groups and corporate events.",
  // Contact
  contact_intro: "For any reservation, information or question. Reply within 24h by email.",
  contact_email_desc: "For reservations, group quotes and any question. Quick reply guaranteed.",
  contact_socials_desc: "Follow our events, schedule and disco nights.",
  contact_review_desc: "Enjoyed your visit? Leave us a review, it helps us a lot.",
};

async function main() {
  const existing = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const isEmpty = !existing || Object.keys((existing.data as object) ?? {}).length === 0;
  if (!isEmpty) {
    console.log("SiteContent already populated — seed skipped.");
    return;
  }
  await prisma.siteContent.upsert({
    where: { id: 1 },
    create: { id: 1, data: DEFAULT_CONTENT },
    update: { data: DEFAULT_CONTENT },
  });
  console.log("SiteContent seeded with default English content.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
