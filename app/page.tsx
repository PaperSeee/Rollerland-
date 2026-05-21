import Image from "next/image";
import Link from "next/link";

const STATS = [
  { label: "Mercredi", value: "12h–20h", sub: "Cours + accès libre" },
  { label: "Vendredi", value: "17h–24h", sub: "Disco Roller" },
  { label: "Samedi", value: "12h–24h", sub: "Cours + Disco" },
  { label: "Dimanche", value: "16h–20h", sub: "Accès libre" },
];

const SERVICES = [
  { tag: "01", title: "Disco Roller", desc: "Vendredi & samedi — musique, lumières, piste ouverte jusqu'à minuit.", href: "/disco-roller", accent: true },
  { tag: "02", title: "Cours de Roller", desc: "Enfants & adultes, mercredi et samedi. Patins inclus.", href: "/cours", accent: false },
  { tag: "03", title: "Anniversaires", desc: "Formules Birthday Party sur mesure pour petits et grands.", href: "/services", accent: false },
  { tag: "04", title: "Team Building", desc: "Activité cohésion d'équipe originale avec animation.", href: "/services", accent: false },
  { tag: "05", title: "After Work", desc: "Décompressez en patins avec vos collègues le vendredi.", href: "/services", accent: false },
  { tag: "06", title: "Groupes Scolaires", desc: "School Deal à 5€/élève avec accompagnement pédagogique.", href: "/services", accent: false },
];

const GALLERY = [
  { src: "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg", label: "Soirée Disco" },
  { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg", label: "Sur la piste" },
  { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.29.jpeg", label: "Rollerland" },
  { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.20.jpeg", label: "Session libre" },
  { src: "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg", label: "La piste" },
  { src: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.25.jpeg", label: "Anniversaire" },
];

const TICKER_ITEMS = [
  "Disco Roller — Vendredi & Samedi",
  "Entrée Gratuite",
  "Cours Enfants & Adultes",
  "Anniversaires sur la piste",
  "Team Building",
  "After Work",
  "Rue Dieudonné Lefèvre 4 · 1020 Bruxelles",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[680px] flex flex-col justify-end overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg"
            alt="Disco Roller Bruxelles"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,10,26,0.92) 0%, rgba(83,74,183,0.15) 50%, rgba(13,10,26,0.85) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0D0A1A 0%, rgba(13,10,26,0.3) 60%, transparent 100%)" }} />
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
        </div>

        {/* Floating badge top-right */}
        <div className="absolute top-24 right-6 z-10 hidden md:flex flex-col items-end gap-2 animate-fade-in delay-600">
          <div className="glass-card px-4 py-2 animate-pulse-glow">
            <p className="text-xs" style={{ color: "#7F77DD", letterSpacing: "0.12em" }}>OUVERT CE SOIR</p>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-0 w-full">
          <p className="label-tag mb-5 animate-fade-up">Bruxelles · 1020 Laeken</p>

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
            <span style={{ color: "#7F77DD" }}>land</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>.</span>
          </h1>

          <p
            className="mt-6 mb-10 max-w-md text-base animate-fade-up delay-200"
            style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.75" }}
          >
            La piste de roller au cœur de Bruxelles.<br />
            Disco, cours, anniversaires &amp; team building.
          </p>

          <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary animate-pulse-glow"
            >
              Réserver
            </a>
            <Link href="/disco-roller" className="btn-outline">
              Disco Roller ↗
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 mt-16 w-full" style={{ borderTop: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(13,10,26,0.85)", backdropFilter: "blur(12px)" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="py-5 px-4 hover-lift"
                style={{ borderRight: i < 3 ? "0.5px solid rgba(127,119,221,0.12)" : "none" }}
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
      <div
        className="overflow-hidden py-3"
        style={{ borderBottom: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(127,119,221,0.04)" }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6">
              <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(127,119,221,0.7)", letterSpacing: "0.14em" }}>
                {item}
              </span>
              <span style={{ color: "rgba(127,119,221,0.3)", fontSize: "0.4rem" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Disco CTA Feature ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/disco-roller"
            className="group relative block overflow-hidden hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.3)" }}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-30-at-22.57.16.jpeg"
                alt="Disco Roller"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,10,26,0.97) 40%, rgba(13,10,26,0.5) 100%)" }} />
            </div>
            <div className="relative z-10 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="label-tag mb-4">Chaque vendredi &amp; samedi</p>
                <h2
                  className="text-4xl md:text-5xl text-white mb-4"
                  style={{ fontWeight: 300, letterSpacing: "-0.02em", lineHeight: "1.1" }}
                >
                  Disco<br />Roller
                </h2>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8" }}>
                  Musique, lumières et piste ouverte jusqu&apos;à minuit.<br />
                  <strong style={{ color: "#7F77DD", fontWeight: 500 }}>Entrée gratuite.</strong>
                </p>
                <span className="btn-primary group-hover:bg-white group-hover:text-black transition-all">
                  Voir les événements →
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
                  <p className="label-tag mb-1">Entrée</p>
                  <p className="text-sm font-medium" style={{ color: "#7F77DD" }}>Gratuite</p>
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
              <p className="label-tag mb-3">Ce qu&apos;on propose</p>
              <h2 className="text-3xl md:text-4xl text-white" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
                Services &amp; Activités
              </h2>
            </div>
            <Link href="/services" className="hidden md:block text-xs uppercase tracking-widest hover:text-white transition-colors" style={{ color: "rgba(127,119,221,0.6)", letterSpacing: "0.14em" }}>
              Tout voir →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ border: "0.5px solid rgba(127,119,221,0.2)" }}>
            {SERVICES.map((s, i) => (
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
                    <span className="text-xs px-2 py-0.5" style={{ background: "#7F77DD", color: "#0D0A1A", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Ce soir
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
                  Découvrir →
                </span>
                {/* Hover line */}
                <div
                  className="absolute bottom-0 left-0 h-px transition-all duration-500 group-hover:w-full"
                  style={{ width: "0%", background: "#7F77DD" }}
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
              <p className="label-tag mb-3">Photos</p>
              <h2 className="text-2xl text-white" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>
                Sur la piste
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((g, i) => (
              <div
                key={i}
                className="group relative overflow-hidden hover-lift"
                style={{
                  aspectRatio: i === 0 ? "16/9" : "4/3",
                  gridColumn: i === 0 ? "span 2" : "span 1",
                  border: "0.5px solid rgba(127,119,221,0.2)",
                }}
              >
                <Image
                  src={g.src}
                  alt={g.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: "linear-gradient(to top, rgba(13,10,26,0.8) 0%, transparent 60%)" }}
                >
                  <p className="label-tag">{g.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs strip ── */}
      <section
        className="py-16 px-6"
        style={{ borderTop: "0.5px solid rgba(127,119,221,0.15)", borderBottom: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          <div className="md:col-span-1">
            <p className="label-tag mb-2">Tarifs individuels</p>
            <h3 className="text-xl text-white" style={{ fontWeight: 300 }}>Location de patins</h3>
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
                <p className="text-sm font-medium" style={{ color: "#7F77DD" }}>{t.price}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/tarifs" className="btn-outline text-center">Tous les tarifs</Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Réserver
            </a>
          </div>
        </div>
      </section>

      {/* ── Address + Map ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label-tag mb-4">Nous trouver</p>
            <h2 className="text-3xl md:text-4xl text-white mb-8" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
              Rue Dieudonné<br />Lefèvre 4, Bruxelles
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
              href="https://maps.app.goo.gl/wUYExjkrJLUSWEf88"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Ouvrir dans Google Maps
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
          <p className="label-tag mb-4 justify-center flex">Prêt ?</p>
          <h2
            className="mb-6 text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: "1.1" }}
          >
            Chaussez les patins,<br />
            <span style={{ color: "#7F77DD" }}>la piste vous attend.</span>
          </h2>
          <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
            Réservation en ligne ou via WhatsApp. Réponse rapide garantie.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary animate-pulse-glow"
              style={{ padding: "0.9rem 2.5rem" }}
            >
              Réserver maintenant
            </a>
            <a
              href="https://wa.me/32484772593"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: "0.9rem 2.5rem" }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
