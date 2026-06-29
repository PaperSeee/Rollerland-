import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Ticker from "@/components/Ticker";
import { getRollerland, pick, rowStr } from "@/lib/wordpress";
import { translate } from "@/lib/translate";
import { SITE } from "@/lib/site";
import Editable from "@/components/edit/Editable";
import EditableImage from "@/components/edit/EditableImage";
import EditablePartners from "@/components/edit/EditablePartners";
import EditableGallery from "@/components/edit/EditableGallery";
import EditSectionLink from "@/components/edit/EditSectionLink";

const STATS_FALLBACK = [
  { label: "Mercredi", value: "12h–20h", sub: "Cours + accès libre" },
  { label: "Vendredi", value: "17h–24h", sub: "Disco Roller" },
  { label: "Samedi", value: "12h–24h", sub: "Cours + Disco" },
  { label: "Dimanche", value: "16h–20h", sub: "Accès libre" },
];

const SERVICES_FALLBACK = [
  { tag: "01", title: "Disco Roller", desc: "Vendredi & samedi — musique, lumières, piste ouverte jusqu'à minuit.", href: "/disco-roller", accent: true },
  { tag: "02", title: "Cours de Roller", desc: "Enfants & adultes, mercredi et samedi. Patins inclus.", href: "/cours", accent: false },
  { tag: "03", title: "Anniversaires", desc: "Formules Birthday Party sur mesure pour petits et grands.", href: "/private-events", accent: false },
  { tag: "04", title: "Team Building", desc: "Activité cohésion d'équipe originale avec animation.", href: "/private-events", accent: false },
  { tag: "05", title: "After Work", desc: "Décompressez en patins avec vos collègues le vendredi.", href: "/private-events", accent: false },
  { tag: "06", title: "Groupes Scolaires", desc: "School Deal à 5€/élève avec accompagnement pédagogique.", href: "/private-events", accent: false },
];

// Partners shown prominently on the homepage. TODO(client): drop the real
// logo files into /public/partners/ and set `logo` to e.g. "/partners/be-here.svg".
// Until then we render a styled text placeholder for each partner.
const PARTNERS = [
  { name: "Be Here", url: "https://www.behere.brussels/", logo: "/partners/be-here.png" as string | null },
  { name: "Kinepolis", url: "https://kinepolis.be/", logo: "/partners/kinepolis.png" as string | null },
  { name: "Brussels Airlines", url: "https://www.brusselsairlines.com/", logo: "/partners/brussels-airlines.png" as string | null },
  { name: "VGC", url: "https://www.vgc.be/", logo: "/partners/vgc.png" as string | null },
  { name: "Rollerland Aalst", url: "https://www.rollerland.be/", logo: "/partners/rollerland-aalst.png" as string | null },
  { name: "Skate Vlaanderen", url: "https://www.skate.vlaanderen/", logo: "/partners/skate-vlaanderen.png" as string | null },
];


const FALLBACK_HERO = "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg";
const FALLBACK_GALLERY = [
  { src: "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg", label: "Soirée Disco" },
  { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg", label: "Sur la piste" },
  { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.29.jpeg", label: "Rollerland" },
  { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.20.jpeg", label: "Session libre" },
  { src: "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg", label: "La piste" },
  { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.25.jpeg", label: "Anniversaire" },
];

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const acf = await getRollerland();
  const heroImage = acf.hero_image || FALLBACK_HERO;
  // Editable reservation link (admin → Global) with the configured fallback.
  const reservationUrl = pick(acf, "reservation_url") || SITE.reservationUrl;

  // Editable copy: WordPress value (English, auto-translated to the locale) else
  // the i18n default. tr() = translate the WP field; "" if the field is empty.
  const tr = (field: string) => translate(pick(acf, field), locale);
  const cms = {
    location: (await tr("home_location")) || t("location"),
    heroLead: (await tr("home_hero_lead")) || `${t("heroLead")}\n${t("heroLead2")}`,
    openTonight: (await tr("home_open_tonight")) || t("openTonight"),
    tributeTitle: (await tr("home_tribute_title")) || t("tributeTitle"),
    tributeBody: (await tr("home_tribute_body")) || t("tributeBody"),
    tributeImage: acf.home_tribute_image || "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg",
    discoFeatureImage: (acf.home_disco_feature_image as string) || "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-30-at-22.57.16.jpeg",
    servicesTitle: (await tr("home_services_title")) || t("servicesTitle"),
    partnersTitle: (await tr("home_partners_title")) || t("partnersTitle"),
    ctaTitle: await tr("home_cta_title"),
    ctaLead: (await tr("home_cta_lead")) || t("ctaLead", { email: SITE.email }),
  };

  // Partners: start from the full bundled list (6 partners + logos), then let
  // the DB override matching entries by name and append any extra DB partners.
  // A DB partner with no logo falls back to the bundled logo matched by name.
  // This way all six always show even if the DB was seeded with only a few.
  const norm = (s: string) => s.trim().toLowerCase();
  const logoByName = new Map(PARTNERS.map((p) => [norm(p.name), p.logo]));
  const dbPartners = (acf.partners ?? []).map((p) => ({
    name: p.partner_name ?? "",
    url: p.partner_url || "#",
    logo: p.partner_logo || logoByName.get(norm(p.partner_name ?? "")) || null,
  }));
  const dbByName = new Map(dbPartners.map((p) => [norm(p.name), p]));
  // Bundled defaults first (DB values win where names match), then DB-only extras.
  const partners = [
    ...PARTNERS.map((p) => dbByName.get(norm(p.name)) ?? p),
    ...dbPartners.filter((p) => !logoByName.has(norm(p.name))),
  ];

  // Opening-hours bar: DB repeater (neutral values, label auto-translated) else fallback.
  const stats = acf.home_stats?.length
    ? await Promise.all(
        acf.home_stats.map(async (s) => ({
          label: await translate(rowStr(s, "stat_label"), locale),
          value: rowStr(s, "stat_value"),
          sub: await translate(rowStr(s, "stat_sub"), locale),
        })),
      )
    : STATS_FALLBACK;

  // Services grid: DB repeater (auto-translated) else fallback.
  const services = acf.home_services?.length
    ? await Promise.all(
        acf.home_services.map(async (s, i) => ({
          tag: String(i + 1).padStart(2, "0"),
          title: await translate(rowStr(s, "service_title"), locale),
          desc: await translate(rowStr(s, "service_desc"), locale),
          href: rowStr(s, "service_href") || "/private-events",
          accent: Boolean(s.service_accent),
        })),
      )
    : SERVICES_FALLBACK;

  // Gallery: new editor rows ({src}) → legacy string[] → hardcoded fallback.
  const galleryRows = (acf.gallery_images_rows as Array<{ src?: string }> | undefined)
    ?.map((r) => r.src)
    .filter((s): s is string => Boolean(s));
  const gallerySrcs = galleryRows?.length ? galleryRows : acf.gallery_images;
  const galleryImages = gallerySrcs?.length
    ? gallerySrcs.map((src, i) => ({ src, label: `Photo ${i + 1}` }))
    : FALLBACK_GALLERY;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[680px] flex flex-col justify-end overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <EditableImage
            field="hero_image"
            value={heroImage}
            alt="Disco Roller Bruxelles"
            fill
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(21,14,40,0.92) 0%, rgba(83,74,183,0.15) 50%, rgba(21,14,40,0.85) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #150E28 0%, rgba(21,14,40,0.3) 60%, transparent 100%)" }} />
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
        </div>

        {/* Floating badge top-right */}
        <div className="absolute top-24 right-6 z-10 hidden md:flex flex-col items-end gap-2 animate-fade-in delay-600">
          <div className="glass-card px-4 py-2 animate-pulse-glow">
            <Editable as="p" field="home_open_tonight" value={cms.openTonight} className="text-xs" style={{ color: "#9B92F0", letterSpacing: "0.12em" }} />
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-0 w-full">
          <Editable as="p" field="home_location" value={cms.location} className="label-tag mb-5 animate-fade-up" />

          <h1
            className="animate-fade-up delay-100"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              lineHeight: "0.92",
              letterSpacing: "-0.03em",
              fontWeight: 300,
              color: "#fff",
            }}
          >
            Roller<br />
            <span style={{ color: "#9B92F0" }}>land</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>.</span>
          </h1>

          <Editable
            as="p"
            field="home_hero_lead"
            value={cms.heroLead}
            multiline
            className="mt-6 mb-10 max-w-md text-base animate-fade-up delay-200"
            style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.75", whiteSpace: "pre-line" }}
          />

          <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary animate-pulse-glow"
            >
              {t("reserve")}
            </a>
            <Link href="/disco-roller" className="btn-outline">
              Disco Roller ↗
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 mt-16 w-full" style={{ borderTop: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(21,14,40,0.85)", backdropFilter: "blur(12px)" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="py-5 px-4 hover-lift"
                style={{ borderRight: i < stats.length - 1 ? "0.5px solid rgba(127,119,221,0.12)" : "none" }}
              >
                <p className="label-tag mb-1">{s.label}</p>
                <p className="text-white text-sm font-medium mb-0.5">{s.value}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ticker tape ── */}
      <Ticker />

      {/* ── Tribute: Rollerland Aalst ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
            style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}
          >
            {/* Image — TODO(client): replace with a real Rollerland Aalst photo */}
            <div
              className="relative min-h-[280px]"
              style={{ background: "rgba(127,119,221,0.05)" }}
            >
              <EditableImage
                field="home_tribute_image"
                value={cms.tributeImage}
                alt="Rollerland Aalst"
                fill
                className="object-cover"
                style={{ opacity: 0.85 }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 40%, rgba(21,14,40,0.5) 100%)", pointerEvents: "none" }} />
            </div>

            {/* Text */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="label-tag mb-4">{t("tributeKicker")}</p>
              <h2
                className="text-3xl md:text-4xl text-white mb-5"
                style={{ fontWeight: 300, letterSpacing: "-0.02em", lineHeight: "1.1" }}
              >
                <Editable as="span" field="home_tribute_title" value={cms.tributeTitle} /><br />
                <span style={{ color: "#9B92F0" }}>Rollerland Aalst</span>
              </h2>
              <Editable as="p" field="home_tribute_body" value={cms.tributeBody} multiline className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.85", whiteSpace: "pre-line" }} />
              <a
                href="https://www.rollerland.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-fit"
              >
                {t("tributeCta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disco CTA Feature ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/disco-roller"
            className="group relative block overflow-hidden hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.3)" }}
          >
            <div className="absolute inset-0 z-0">
              <EditableImage
                field="home_disco_feature_image"
                value={cms.discoFeatureImage}
                alt="Disco Roller"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(21,14,40,0.97) 40%, rgba(21,14,40,0.5) 100%)", pointerEvents: "none" }} />
            </div>
            <div className="relative z-10 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="label-tag mb-4">{t("discoEvery")}</p>
                <h2
                  className="text-4xl md:text-5xl text-white mb-4"
                  style={{ fontWeight: 300, letterSpacing: "-0.02em", lineHeight: "1.1" }}
                >
                  Disco<br />Roller
                </h2>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8" }}>
                  {t("heroLead")}<br />
                  <strong style={{ color: "#9B92F0", fontWeight: 500 }}>{t("discoFree")} · {t("discoEntry")}</strong>
                </p>
                <span className="btn-primary group-hover:bg-white group-hover:text-black transition-all">
                  {t("discoSeeEvents")}
                </span>
              </div>
              <div className="hidden md:flex flex-col gap-3 items-end">
                {[
                  { day: "Vendredi", time: "17h00 – 00h00" },
                  { day: "Samedi", time: "12h00 – 00h00" },
                ].map((s) => (
                  <div
                    key={s.day}
                    className="glass-card px-6 py-4 text-right"
                    style={{ minWidth: 180 }}
                  >
                    <p className="label-tag mb-1">{s.day}</p>
                    <p className="text-white text-sm font-medium">{s.time}</p>
                  </div>
                ))}
                <div className="glass-card px-6 py-4 text-right animate-pulse-glow">
                  <p className="label-tag mb-1">{t("discoEntry")}</p>
                  <p className="text-sm font-medium" style={{ color: "#9B92F0" }}>{t("discoFree")}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="label-tag mb-3">{t("servicesKicker")}</p>
              <Editable as="h2" field="home_services_title" value={cms.servicesTitle} className="text-3xl md:text-4xl text-white" style={{ fontWeight: 300, letterSpacing: "-0.02em" }} />
            </div>
            <Link href="/private-events" className="hidden md:block text-xs uppercase tracking-widest hover:text-white transition-colors" style={{ color: "rgba(127,119,221,0.6)", letterSpacing: "0.14em" }}>
              {t("seeAll")}
            </Link>
          </div>

          {/* Services cards are edited as a list in the admin form */}
          <EditSectionLink section="home" label="services" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ border: "0.5px solid rgba(127,119,221,0.2)" }}>
            {services.map((s, i) => (
              <Link
                key={s.tag}
                href={s.href}
                className="group p-8 hover-lift transition-all relative overflow-hidden"
                style={{
                  background: s.accent ? "rgba(127,119,221,0.08)" : "rgba(255,255,255,0.02)",
                  borderRight: (i + 1) % 3 !== 0 ? "0.5px solid rgba(127,119,221,0.2)" : "none",
                  borderBottom: i < 3 ? "0.5px solid rgba(127,119,221,0.2)" : "none",
                }}
              >
                {s.accent && (
                  <div className="absolute top-3 right-3">
                    <span className="text-xs px-2 py-0.5" style={{ background: "#9B92F0", color: "#150E28", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {t("tonight")}
                    </span>
                  </div>
                )}
                <p className="label-tag mb-4 transition-colors group-hover:text-white">{s.tag}</p>
                <h3 className="text-lg text-white mb-3 transition-colors" style={{ fontWeight: 400 }}>
                  {s.title}
                </h3>
                <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
                  {s.desc}
                </p>
                <span
                  className="text-xs uppercase tracking-wide transition-all"
                  style={{ color: "rgba(127,119,221,0.5)", letterSpacing: "0.1em" }}
                >
                  {t("discover")}
                </span>
                {/* Hover line */}
                <div
                  className="absolute bottom-0 left-0 h-px transition-all duration-500 group-hover:w-full"
                  style={{ width: "0%", background: "#9B92F0" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="label-tag mb-3">{t("photosKicker")}</p>
              <h2 className="text-2xl text-white" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>
                {t("photosTitle")}
              </h2>
            </div>
          </div>
          <EditableGallery images={galleryImages} />
        </div>
      </section>

      {/* ── Tarifs strip ── */}
      <section
        className="py-16 px-6"
        style={{ borderTop: "0.5px solid rgba(127,119,221,0.15)", borderBottom: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          <div className="md:col-span-1">
            <p className="label-tag mb-2">{t("tarifsKicker")}</p>
            <h3 className="text-xl text-white" style={{ fontWeight: 300 }}>{t("tarifsTitle")}</h3>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {[
              { label: "Enfant (−16 ans)", price: "6€" },
              { label: "Adulte", price: "8€" },
              { label: "Protection", price: "1€/paire" },
              { label: "Vestiaire", price: "1€" },
            ].map((t) => (
              <div
                key={t.label}
                className="flex items-center justify-between px-4 py-3 hover-lift"
                style={{ border: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(255,255,255,0.02)" }}
              >
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{t.label}</p>
                <p className="text-sm font-medium" style={{ color: "#9B92F0" }}>{t.price}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/tarifs" className="btn-outline text-center">{t("allTarifs")}</Link>
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              {t("reserve")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-20 px-6" style={{ borderTop: "0.5px solid rgba(127,119,221,0.15)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="label-tag mb-3 justify-center flex">{t("partnersKicker")}</p>
            <Editable as="h2" field="home_partners_title" value={cms.partnersTitle} className="text-3xl md:text-4xl text-white" style={{ fontWeight: 300, letterSpacing: "-0.02em" }} />
          </div>
          <EditablePartners partners={partners} />
        </div>
      </section>

      {/* ── Address + Map ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label-tag mb-4">{t("findUs")}</p>
            <h2 className="text-3xl md:text-4xl text-white mb-8" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
              {t("addressTitle")}
            </h2>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {[
                { icon: "🚌", label: "STIB", value: "Bus 46, 86, 88, N18 — Arrêt André de Jongh" },
                { icon: "🚍", label: "De Lijn", value: "R30, R41, R50, R60 — Arrêt André de Jongh" },
                { icon: "🅿️", label: "Parking", value: "Parking sécurisé au n°160 — réservation en ligne" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex gap-4 items-start px-5 py-4"
                  style={{ border: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(255,255,255,0.02)" }}
                >
                  <span className="text-lg flex-shrink-0">{t.icon}</span>
                  <div>
                    <p className="label-tag mb-1">{t.label}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>{t.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={SITE.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {t("openMaps")}
            </a>
          </div>

          {/* Map embed */}
          <div className="relative overflow-hidden" style={{ height: 380, border: "0.5px solid rgba(127,119,221,0.3)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.8!2d4.3489!3d50.8803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3e1d9d1b1b1%3A0x1!2sRue+Dieudonn%C3%A9+Lef%C3%A8vre+4%2C+1020+Bruxelles!5e0!3m2!1sfr!2sbe!4v1"
              width="100%"
              height="380"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.85)" }}
              allowFullScreen
              loading="lazy"
              title="Rollerland Brussels"
            />
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ borderTop: "0.5px solid rgba(127,119,221,0.2)" }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(127,119,221,0.08) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="label-tag mb-4 justify-center flex">{t("ctaReady")}</p>
          <h2
            className="mb-6 text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: "1.1" }}
          >
            <Editable as="span" field="home_cta_title" value={cms.ctaTitle || `${t("ctaTitle1")} ${t("ctaTitle2")}`} />
          </h2>
          <Editable as="p" field="home_cta_lead" value={cms.ctaLead} multiline className="text-sm mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8", whiteSpace: "pre-line" }} />
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary animate-pulse-glow"
              style={{ padding: "0.9rem 2.5rem" }}
            >
              {t("ctaReserve")}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="btn-outline"
              style={{ padding: "0.9rem 2.5rem" }}
            >
              {t("ctaWrite")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
