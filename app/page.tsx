import Image from "next/image";
import Link from "next/link";

const STATS = [
  { label: "Mercredi", value: "12h–20h" },
  { label: "Vendredi", value: "17h–24h" },
  { label: "Samedi", value: "12h–24h" },
  { label: "Dimanche", value: "16h–20h" },
];

const SERVICES = [
  {
    tag: "01",
    title: "Disco Roller",
    desc: "Vendredi et samedi soir, musique, lumières et patins. La soirée roller de Bruxelles.",
    href: "/services",
  },
  {
    tag: "02",
    title: "Cours de Roller",
    desc: "Cours pour enfants et adultes le mercredi et le samedi. Réservation via TicketTailor.",
    href: "/cours",
  },
  {
    tag: "03",
    title: "Anniversaires",
    desc: "Fête d'anniversaire inoubliable sur patins. Formules Birthday Party & Plus disponibles.",
    href: "/services",
  },
  {
    tag: "04",
    title: "Team Building",
    desc: "Activité originale pour votre équipe. Patins + animation sur mesure.",
    href: "/services",
  },
  {
    tag: "05",
    title: "After Work",
    desc: "Décompressez après le boulot avec vos collègues sur la piste.",
    href: "/services",
  },
  {
    tag: "06",
    title: "Groupes Scolaires",
    desc: "Formule School Deal pour écoles et associations. Accompagnement pédagogique disponible.",
    href: "/services",
  },
];

const TARIFS_PREVIEW = [
  { label: "Enfant (−16 ans)", price: "6€" },
  { label: "Adulte", price: "8€" },
  { label: "Protection", price: "1€/paire" },
  { label: "Vestiaire", price: "1€" },
];

const GALLERY = [
  "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.29.jpeg",
  "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.25.jpeg",
  "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg",
  "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.20.jpeg",
  "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg",
  "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg"
            alt="Rollerland Brussels — piste de patinage"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #0D0A1A 30%, rgba(13,10,26,0.55) 70%, rgba(13,10,26,0.2) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <p className="label-tag mb-6">Bruxelles · Rue Dieudonné Lefèvre 4</p>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl text-white mb-6"
            style={{ lineHeight: "0.95", letterSpacing: "-0.02em", fontWeight: 300 }}
          >
            Roller<br />land.
          </h1>
          <p
            className="text-base md:text-lg mb-10 max-w-xl"
            style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}
          >
            La piste de roller au cœur de Bruxelles.<br />
            Cours, soirées disco, anniversaires &amp; team building.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Réserver
            </a>
            <Link href="/horaires" className="btn-outline">
              Voir les horaires
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="relative z-10 w-full"
          style={{ borderTop: "0.5px solid rgba(127,119,221,0.25)", backgroundColor: "#0D0A1A" }}
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="py-5 px-4"
                style={{
                  borderRight:
                    i < STATS.length - 1 ? "0.5px solid rgba(127,119,221,0.15)" : "none",
                }}
              >
                <p className="label-tag mb-1">{stat.label}</p>
                <p className="text-white text-sm font-medium">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="label-tag mb-3">Ce qu&apos;on propose</p>
            <h2
              className="text-3xl md:text-4xl text-white"
              style={{ fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Services &amp; Activités
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ border: "0.5px solid rgba(127,119,221,0.3)" }}
          >
            {SERVICES.map((service, i) => (
              <Link
                key={service.tag}
                href={service.href}
                className="p-8 group transition-all"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRight:
                    (i + 1) % 3 !== 0
                      ? "0.5px solid rgba(127,119,221,0.3)"
                      : "none",
                  borderBottom:
                    i < 3
                      ? "0.5px solid rgba(127,119,221,0.3)"
                      : "none",
                }}
              >
                <p className="label-tag mb-4">{service.tag}</p>
                <h3
                  className="text-lg text-white mb-3 group-hover:text-purple-400 transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}
                >
                  {service.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery strip ── */}
      <section
        className="py-4 px-6 overflow-hidden"
        style={{
          borderTop: "0.5px solid rgba(127,119,221,0.2)",
          borderBottom: "0.5px solid rgba(127,119,221,0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="flex gap-3 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {GALLERY.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 relative overflow-hidden"
                style={{
                  width: 220,
                  height: 145,
                  border: "0.5px solid rgba(127,119,221,0.2)",
                }}
              >
                <Image
                  src={src}
                  alt={`Rollerland Brussels photo ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs + Adresse ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Tarifs */}
          <div>
            <p className="label-tag mb-3">Location de patins</p>
            <h2
              className="text-3xl md:text-4xl text-white mb-4"
              style={{ fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Tarifs individuels
            </h2>
            <p
              className="text-sm mb-10"
              style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}
            >
              Location de patins en accès libre. Protections et vestiaire disponibles sur place.
            </p>

            <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
              {TARIFS_PREVIEW.map((t, i) => (
                <div
                  key={t.label}
                  className="flex items-center justify-between px-6 py-4"
                  style={{
                    borderBottom:
                      i < TARIFS_PREVIEW.length - 1
                        ? "0.5px solid rgba(127,119,221,0.15)"
                        : "none",
                  }}
                >
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {t.label}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#7F77DD" }}>
                    {t.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link href="/tarifs" className="btn-outline">
                Voir tous les tarifs
              </Link>
            </div>
          </div>

          {/* Adresse */}
          <div>
            <p className="label-tag mb-3">Nous trouver</p>
            <h2
              className="text-3xl md:text-4xl text-white mb-4"
              style={{ fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Adresse
            </h2>

            <div
              className="p-8 mb-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(127,119,221,0.3)" }}
            >
              <p className="text-white text-sm mb-6" style={{ lineHeight: "1.9" }}>
                Rue Dieudonné Lefèvre 4<br />
                B-1020 Bruxelles
              </p>
              <div className="mb-6">
                <p className="label-tag mb-3">Transports en commun</p>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8" }}
                >
                  STIB Bus 46, 86, 88, N18<br />
                  De Lijn Bus R30, R41, R50, R60<br />
                  Arrêt : André de Jongh
                </p>
              </div>
              <div>
                <p className="label-tag mb-2">Parking sécurisé</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Parking sécurisé au n°160
                </p>
                <a
                  href="https://go.parkbee.net/start-booking/24763"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs mt-2 inline-block"
                  style={{ color: "#7F77DD" }}
                >
                  Réserver en ligne →
                </a>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/wUYExjkrJLUSWEf88"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="py-20 px-6"
        style={{
          borderTop: "0.5px solid rgba(127,119,221,0.2)",
          borderBottom: "0.5px solid rgba(127,119,221,0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="label-tag mb-3">Prêt à chausser les patins ?</p>
            <h2
              className="text-3xl md:text-4xl text-white"
              style={{ fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Réservez votre session
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Réserver
            </a>
            <a
              href="https://wa.me/32484772593"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
