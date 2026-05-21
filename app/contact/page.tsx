export const revalidate = 60;

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="label-tag mb-4">Contact</p>
        <h1
          className="text-4xl md:text-6xl text-white mb-4"
          style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
        >
          Nous contacter
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}>
          Pour toute demande de réservation, information ou question générale.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact options */}
        <div className="flex flex-col gap-5">
          {/* WhatsApp */}
          <div
            className="p-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(127,119,221,0.3)" }}
          >
            <p className="label-tag mb-3">WhatsApp</p>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}>
              Pour les mises à jour en temps réel, les annulations et les réservations rapides.
            </p>
            <a
              href="https://wa.me/32484772593"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
            >
              +32 484 77 25 93
            </a>
          </div>

          {/* Address */}
          <div
            className="p-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(127,119,221,0.3)" }}
          >
            <p className="label-tag mb-3">Adresse</p>
            <p className="text-xs text-white" style={{ lineHeight: "1.9" }}>
              Rue Dieudonné Lefèvre 4<br />
              B-1020 Bruxelles
            </p>
            <a
              href="https://maps.app.goo.gl/wUYExjkrJLUSWEf88"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-3 inline-block"
              style={{ color: "#7F77DD" }}
            >
              Voir sur la carte →
            </a>
          </div>

          {/* Hours */}
          <div
            className="p-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(127,119,221,0.3)" }}
          >
            <p className="label-tag mb-3">Horaires d&apos;ouverture</p>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "2" }}>
              <p>Mercredi · 12h00–20h00</p>
              <p>Vendredi · 17h00–24h00</p>
              <p>Samedi · 12h00–24h00</p>
              <p>Dimanche · 16h00–20h00</p>
              <p
                className="mt-2 pt-2"
                style={{ borderTop: "0.5px solid rgba(127,119,221,0.15)", color: "rgba(255,255,255,0.3)" }}
              >
                Lun–Mar–Jeu : sur réservation
              </p>
            </div>
          </div>
        </div>

        {/* Google Form embed */}
        <div className="lg:col-span-2">
          <p className="label-tag mb-5">Formulaire de contact &amp; réservation</p>
          <div
            className="overflow-hidden"
            style={{
              border: "0.5px solid rgba(127,119,221,0.3)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform?embedded=true"
              width="100%"
              height="700"
              style={{ border: 0, background: "transparent" }}
              title="Formulaire de réservation Rollerland Brussels"
            >
              Chargement…
            </iframe>
          </div>
          <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            Vous pouvez aussi nous contacter directement via WhatsApp pour une réponse rapide.
          </p>
        </div>
      </div>

      {/* Partners */}
      <div className="mt-20">
        <p className="label-tag mb-6">Partenaires</p>
        <div className="flex flex-wrap gap-6 items-center">
          {[
            { name: "Vlaamse Gemeenschapscommissie", url: "https://www.vgc.be/" },
            { name: "Rollerland Aalst", url: "https://www.rollerland.be/" },
            { name: "Skate Vlaanderen", url: "https://www.skate.vlaanderen/" },
          ].map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wide transition-colors hover:text-white px-4 py-2"
              style={{
                color: "rgba(255,255,255,0.3)",
                border: "0.5px solid rgba(127,119,221,0.15)",
                letterSpacing: "0.1em",
              }}
            >
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
