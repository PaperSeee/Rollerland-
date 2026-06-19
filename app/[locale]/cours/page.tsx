import { SITE } from "@/lib/site";

export const revalidate = 60;

export default function CoursPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="label-tag mb-4">Formation · Patinage</p>
        <h1 className="text-5xl md:text-7xl text-white mb-4" style={{ fontWeight: 300, letterSpacing: "-0.03em", lineHeight: "0.95" }}>
          Cours de<br />Roller
        </h1>
        <p className="text-sm mt-6 max-w-lg" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
          Apprenez à patiner ou perfectionnez votre technique avec nos moniteurs certifiés.
          Patins inclus — venez juste avec l&apos;envie de glisser.
        </p>
      </div>

      {/* Course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 animate-fade-up delay-100">
        {[
          {
            tag: "01",
            audience: "Enfants",
            schedule: "Mercredi & Samedi",
            time: "16h00 – 17h00",
            price: "10€",
            level: "Tous niveaux",
            age: "Enfants",
            desc: "Initiation et progression en toute sécurité. Nos moniteurs guident chaque enfant à son rythme, des premières glissades aux virages en douceur.",
            ticketUrl: "https://www.tickettailor.com/events/retrobrusselsasbl/2140456",
          },
          {
            tag: "02",
            audience: "Adultes",
            schedule: "Mercredi & Samedi",
            time: "17h30 – 19h00",
            price: "15€",
            level: "Débutant – Intermédiaire",
            age: "18+",
            desc: "Technique, équilibre et plaisir. Un cours collectif dans une ambiance bienveillante — peu importe votre niveau de départ.",
            ticketUrl: "https://www.tickettailor.com/events/retrobrusselsasbl/2140456",
          },
        ].map((course) => (
          <div
            key={course.tag}
            className="p-8 flex flex-col hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.3)", background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="label-tag mb-2">{course.tag} · {course.audience}</p>
                <h2 className="text-2xl text-white" style={{ fontWeight: 400 }}>Cours {course.audience}</h2>
              </div>
              <span className="text-2xl font-light" style={{ color: "#9B92F0" }}>{course.price}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {[course.level, course.age, "Patins inclus"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1"
                  style={{ border: "0.5px solid rgba(127,119,221,0.3)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-sm mb-6 flex-1" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.85" }}>
              {course.desc}
            </p>

            <div
              className="grid grid-cols-2 gap-4 p-4 mb-6"
              style={{ background: "rgba(127,119,221,0.06)", border: "0.5px solid rgba(127,119,221,0.2)" }}
            >
              <div>
                <p className="label-tag mb-1">Jours</p>
                <p className="text-xs text-white">{course.schedule}</p>
              </div>
              <div>
                <p className="label-tag mb-1">Horaire</p>
                <p className="text-xs text-white">{course.time}</p>
              </div>
            </div>

            <a
              href={course.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center animate-pulse-glow"
            >
              Réserver via TicketTailor
            </a>
          </div>
        ))}
      </div>

      {/* Start2Ride */}
      <div
        className="p-8 md:p-12 mb-16 relative overflow-hidden animate-fade-up delay-200"
        style={{ border: "0.5px solid rgba(127,119,221,0.4)", background: "rgba(127,119,221,0.05)" }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(127,119,221,0.15) 0%, transparent 70%)" }} />

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <p className="label-tag">Nouveau</p>
              <span className="text-xs px-2 py-0.5 uppercase" style={{ background: "#9B92F0", color: "#150E28", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                Outdoor
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-white mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
              Start2Ride
            </h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.85" }}>
              Entraînement en plein air au Parc de Laeken. Pratiquez le roller dans un cadre naturel
              avec l&apos;encadrement de nos moniteurs. Idéal pour progresser en dehors de la piste couverte.
            </p>

            <div
              className="grid grid-cols-3 gap-4 mb-8"
              style={{ borderTop: "0.5px solid rgba(127,119,221,0.15)", paddingTop: "1.5rem" }}
            >
              {[
                { label: "Date", value: "Samedi 30 mai" },
                { label: "Horaire", value: "10h00 – 12h00" },
                { label: "Lieu", value: "Parc de Laeken" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="label-tag mb-1">{item.label}</p>
                  <p className="text-sm text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <a
              href="https://www.tickettailor.com/events/retrobrusselsasbl/2211764"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Réserver Start2Ride
            </a>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up delay-300">
        <div
          className="p-5"
          style={{ border: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(255,255,255,0.02)" }}
        >
          <p className="label-tag mb-2">Patins personnels</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
            Vous venez avec vos propres patins ? Les protections sont gratuites. Pas de surcoût.
          </p>
        </div>

        {/* Course cancellations WhatsApp group (kept per spec) */}
        <div
          className="p-5"
          style={{ border: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(255,255,255,0.02)" }}
        >
          <p className="label-tag mb-2">Annulations</p>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
            Rejoignez le groupe WhatsApp dédié aux cours pour être informé en temps réel des
            annulations ou changements d&apos;horaire.
          </p>
          {SITE.coursWhatsappGroupUrl ? (
            <a
              href={SITE.coursWhatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Rejoindre le groupe WhatsApp
            </a>
          ) : (
            // TODO(client): set SITE.coursWhatsappGroupUrl to enable this button.
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Lien du groupe disponible bientôt — demandez-le par e-mail à {SITE.email}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
