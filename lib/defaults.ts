// ── Canonical default site content ───────────────────────────────────────
// Single source of truth for the values the public site falls back to when the
// DB has nothing set. Admin forms merge this UNDER the DB content so every form
// opens already showing the current/default content (easier to tweak than a
// blank form). The seed also writes this on a fresh install.
//
// Keep this in sync with the fallbacks used in the page/Navbar/Footer components.

export const DEFAULT_CONTENT: Record<string, unknown> = {
  // ── Header / Navigation ──
  nav_logo: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.29.jpeg",
  nav_book_label: "Book now",
  nav_book_url:
    "https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform",
  nav_links: [
    { nav_label: "Schedule", nav_href: "/horaires", nav_hot: false },
    { nav_label: "Practical", nav_href: "/pratique", nav_hot: false },
    { nav_label: "Prices", nav_href: "/tarifs", nav_hot: false },
    { nav_label: "Contact", nav_href: "/contact", nav_hot: false },
    { nav_label: "Lessons", nav_href: "/cours", nav_hot: false },
    { nav_label: "Private Events", nav_href: "/private-events", nav_hot: false },
    { nav_label: "Disco Roller", nav_href: "/disco-roller", nav_hot: true },
  ],

  // ── Global ──
  site_email: "info@rollerland.brussels",
  social_instagram: "https://www.instagram.com/rollerland.brussels/",
  social_facebook: "https://www.facebook.com/rollerlandbrussels",
  social_tiktok: "https://www.tiktok.com/@rollerland.brussels",
  google_review_url: "https://maps.app.goo.gl/wUYExjkrJLUSWEf88",
  cours_whatsapp_group_url: "",
  reservation_url:
    "https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform",
  reserve_label: "Book now",
  hero_image: "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg",
  gallery_images_rows: [
    { src: "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg" },
    { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg" },
    { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.29.jpeg" },
    { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.20.jpeg" },
    { src: "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg" },
    { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.25.jpeg" },
  ],

  // ── Footer ──
  footer_brand: "RollerlandBrussels",
  footer_tagline: "The roller skating rink in the heart of Brussels.",
  footer_subtitle: "Disco, lessons, birthdays & team building.",
  footer_address: "Rue Dieudonné Lefèvre 4 · B-1020 Laeken, Bruxelles",
  footer_closed_note: "Mon–Tue–Thu by reservation",
  footer_rights: "Rollerland Brussels · Retro Brussels asbl",
  footer_privacy_label: "Privacy policy",
  footer_privacy_url: "https://retro.brussels/privacy-policy/",
  footer_hours: [
    { stat_label: "Wednesday", stat_value: "12h–20h" },
    { stat_label: "Friday", stat_value: "17h–00h" },
    { stat_label: "Saturday", stat_value: "12h–00h" },
    { stat_label: "Sunday", stat_value: "16h–20h" },
  ],
  footer_links: [
    { nav_label: "Schedule", nav_href: "/horaires" },
    { nav_label: "Practical", nav_href: "/pratique" },
    { nav_label: "Prices", nav_href: "/tarifs" },
    { nav_label: "Contact", nav_href: "/contact" },
    { nav_label: "Lessons", nav_href: "/cours" },
    { nav_label: "Private Events", nav_href: "/private-events" },
    { nav_label: "Disco Roller", nav_href: "/disco-roller" },
  ],
  footer_socials: [
    { social_label: "Instagram", social_url: "https://www.instagram.com/rollerland.brussels/" },
    { social_label: "Facebook", social_url: "https://www.facebook.com/rollerlandbrussels" },
    { social_label: "TikTok", social_url: "https://www.tiktok.com/@rollerland.brussels" },
  ],

  // ── Home ──
  home_location: "Brussels · 1020 Laeken",
  home_hero_lead:
    "The roller skating rink in the heart of Brussels.\nDisco, lessons, birthdays & team building.",
  home_open_tonight: "OPEN TONIGHT",
  home_tribute_title: "Tribute to",
  home_tribute_body:
    "Rollerland Brussels carries on the legacy of Rollerland Aalst, a Belgian roller skating institution.",
  home_tribute_image: "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg",
  home_disco_feature_image:
    "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-30-at-22.57.16.jpeg",
  home_services_title: "Services & Activities",
  home_partners_title: "Our partners",
  home_cta_title: "",
  home_cta_lead: "Book online or by email at info@rollerland.brussels. Quick reply guaranteed.",
  home_stats: [
    { stat_label: "Wednesday", stat_value: "12h–20h", stat_sub: "Lessons + free access" },
    { stat_label: "Friday", stat_value: "17h–24h", stat_sub: "Disco Roller" },
    { stat_label: "Saturday", stat_value: "12h–24h", stat_sub: "Lessons + Disco" },
    { stat_label: "Sunday", stat_value: "16h–20h", stat_sub: "Free access" },
  ],
  home_services: [
    { service_title: "Disco Roller", service_desc: "Friday & Saturday — music, lights, rink open until midnight.", service_href: "/disco-roller", service_accent: true },
    { service_title: "Roller Lessons", service_desc: "Kids & adults, Wednesday and Saturday. Skates included.", service_href: "/cours", service_accent: false },
    { service_title: "Birthdays", service_desc: "Tailor-made Birthday Party packages for young and old.", service_href: "/private-events", service_accent: false },
    { service_title: "Team Building", service_desc: "An original team-cohesion activity with animation.", service_href: "/private-events", service_accent: false },
    { service_title: "After Work", service_desc: "Unwind on skates with your colleagues on Friday.", service_href: "/private-events", service_accent: false },
    { service_title: "School Groups", service_desc: "School Deal at 5€/pupil with educational support.", service_href: "/private-events", service_accent: false },
  ],
  partners: [
    { partner_name: "Be Here", partner_url: "https://www.behere.brussels/", partner_logo: "/partners/be-here.png" },
    { partner_name: "Kinepolis", partner_url: "https://kinepolis.be/", partner_logo: "/partners/kinepolis.png" },
    { partner_name: "Brussels Airlines", partner_url: "https://www.brusselsairlines.com/", partner_logo: "/partners/brussels-airlines.png" },
    { partner_name: "VGC", partner_url: "https://www.vgc.be/", partner_logo: "/partners/vgc.png" },
    { partner_name: "Rollerland Aalst", partner_url: "https://www.rollerland.be/", partner_logo: "/partners/rollerland-aalst.png" },
    { partner_name: "Skate Vlaanderen", partner_url: "https://www.skate.vlaanderen/", partner_logo: "/partners/skate-vlaanderen.png" },
  ],

  // ── Prices ──
  tarifs_title: "Prices",
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
  menu_boissons: [
    { nom: "Water (bottle)", prix: "2€" },
    { nom: "Hot drinks", prix: "2,50€" },
    { nom: "Soft drinks", prix: "3€" },
    { nom: "Beer (Pils, 0%)", prix: "3€" },
    { nom: "Wine (glass)", prix: "4€" },
  ],
  menu_nourriture: [
    { nom: "Assorted snacks", prix: "2€" },
    { nom: "Chocolate cake (slice)", prix: "3,50€" },
    { nom: "Pizza (small)", prix: "6€" },
  ],

  // ── Schedule ──
  horaires_title: "Schedule",
  horaires_intro: "Outside regular hours, the rink is available by reservation for school groups, team buildings and birthdays.",
  horaire_mercredi: "12h00 – 20h00",
  horaire_vendredi: "17h00 – 00h00",
  horaire_samedi: "12h00 – 00h00",
  horaire_dimanche: "16h00 – 20h00",
  horaire_note_dimanche: "June–October: 12h–20h",
  fermetures_exceptionnelles: [
    { periode: "16 – 24 May 2026", raison: "Flea market / Special event" },
    { periode: "29 – 31 May 2026", raison: "Exceptional closure" },
  ],

  // ── Practical ──
  pratique_title: "Practical",
  pratique_intro: "Everything you need to know before coming to Rollerland Brussels.",
  parking_text: "Secure parking available at number 160. Book your spot online via ParkBee.",
  parking_url: "https://go.parkbee.net/start-booking/24763",
  reglement_image: "https://retro.brussels/wp-content/uploads/2024/04/roller-rules-Aida-724x1024.jpeg",
  rules: [
    { rule_text: "Roller skates are required on the rink." },
    { rule_text: "Protective gear (knee, elbow, wrist) is strongly recommended." },
    { rule_text: "No inline skates on the quad roller rink." },
    { rule_text: "Respect other skaters at all times." },
    { rule_text: "Children under 8 must be accompanied by an adult." },
    { rule_text: "No food or drinks on the rink." },
  ],

  // ── Lessons ──
  cours_title: "Lessons",
  cours_intro: "Learn to skate or improve your technique with our certified instructors. Skates included.",
  cours_tickettailor_url: "https://www.tickettailor.com/events/retrobrusselsasbl/2140456",
  cours_list: [
    { cours_titre: "Kids Lessons", cours_audience: "Kids", cours_prix: "10€", cours_jours: "Wednesday & Saturday", cours_horaire: "16h00 – 17h00", cours_niveau: "All levels", cours_age: "Kids", cours_description: "Safe introduction and progression. Our instructors guide each child at their own pace." },
    { cours_titre: "Adults Lessons", cours_audience: "Adults", cours_prix: "15€", cours_jours: "Wednesday & Saturday", cours_horaire: "17h30 – 19h00", cours_niveau: "Beginner – Intermediate", cours_age: "18+", cours_description: "Technique, balance and fun. A group lesson in a friendly atmosphere, whatever your starting level." },
  ],
  start2ride_desc: "Outdoor training at Parc de Laeken. Practice roller skating in a natural setting with our instructors.",
  start2ride_date: "Saturday 30 May",
  start2ride_time: "10h00 – 12h00",
  start2ride_place: "Parc de Laeken",
  start2ride_url: "https://www.tickettailor.com/events/retrobrusselsasbl/2211764",
  cours_own_skates_text: "Bringing your own skates? Protective gear is free. No extra charge.",
  cours_cancellations_text: "Join the lessons WhatsApp group to be informed in real time of cancellations or schedule changes.",

  // ── Private Events ──
  pe_title: "Private Events",
  pe_intro: "From disco nights to team building and birthdays — Rollerland Brussels adapts to all your private event projects.",
  services_liste: [
    { titre: "Disco Roller", horaire: "Friday 17h–24h · Saturday 12h–24h", description: "Brussels' must-see roller night. Music, colourful lights and a festive atmosphere on the rink.", image: "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg" },
    { titre: "Birthdays", horaire: "On reservation · Any day", description: "Celebrate your birthday on the rink! Birthday Party packages, animation, music and optional cake.", image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg" },
    { titre: "Team Building", horaire: "On reservation · Weekdays & weekends", description: "An original team-building activity to strengthen team cohesion. Skates and animation included.", image: "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg" },
  ],
  pe_privatization_title: "Privatize the rink for your event",
  pe_privatization_text: "The rink is available for privatization for large groups and corporate events.",

  // ── Contact ──
  contact_title: "Contact",
  contact_intro: "For any reservation, information or question. Reply within 24h by email.",
  contact_email_desc: "For reservations, group quotes and any question. Quick reply guaranteed.",
  contact_socials_desc: "Follow our events, schedule and disco nights.",
  contact_review_desc: "Enjoyed your visit? Leave us a review, it helps us a lot.",

  // ── Disco ──
  disco_lead: "Every Friday and Saturday, the rink turns into a disco: music, lights and skating until midnight. Free entry.",
  disco_hero_image: "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg",
};
