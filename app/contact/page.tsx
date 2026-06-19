import { SITE } from "@/lib/site";

export const revalidate = 60;

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="label-tag mb-4">Nous écrire</p>
        <h1 className="text-5xl md:text-7xl text-white mb-4" style={{ fontWeight: 300, letterSpacing: "-0.03em", lineHeight: "0.95" }}>
          Contact
        </h1>
        <p className="text-sm mt-6 max-w-lg" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
          Pour toute demande de réservation, information ou question. Réponse sous 24h par e-mail.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="flex flex-col gap-4 animate-fade-up delay-100">
          {/* Email */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.3)", background: "rgba(255,255,255,0.03)" }}
          >
            <p className="label-tag mb-3">E-mail</p>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
              Pour les réservations, devis groupes et toute question. Réponse rapide garantie.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="btn-primary w-full justify-center animate-pulse-glow"
            >
              {SITE.email}
            </a>
          </div>

          {/* Address */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="label-tag mb-3">Adresse</p>
            <p className="text-sm text-white mb-3" style={{ lineHeight: "1.9", fontWeight: 300 }}>
              {SITE.address.line1}<br />
              {SITE.address.line2}
            </p>
            <a
              href={SITE.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ color: "#9B92F0" }}
            >
              Voir sur la carte →
            </a>
          </div>

          {/* Social networks */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="label-tag mb-3">Réseaux sociaux</p>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
              Suivez nos événements, horaires et soirées disco.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Instagram", url: SITE.socials.instagram },
                { name: "Facebook", url: SITE.socials.facebook },
                { name: "TikTok", url: SITE.socials.tiktok },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wide hover:text-white transition-colors flex items-center justify-between"
                  style={{ color: "#9B92F0", letterSpacing: "0.08em" }}
                >
                  <span>{s.name}</span>
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Google review */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(127,119,221,0.05)" }}
          >
            <p className="label-tag mb-3">Avis Google</p>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
              Vous avez aimé votre passage ? Laissez-nous un avis, ça nous aide énormément.
            </p>
            <a
              href={SITE.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center"
            >
              Laisser un avis ★
            </a>
          </div>

          {/* Hours */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="label-tag mb-3">Horaires</p>
            <div className="flex flex-col gap-2">
              {[
                { day: "Mercredi", h: "12h–20h" },
                { day: "Vendredi", h: "17h–00h", hot: true },
                { day: "Samedi", h: "12h–00h", hot: true },
                { day: "Dimanche", h: "16h–20h" },
              ].map((s) => (
                <div key={s.day} className="flex justify-between items-center">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.day}</p>
                  <p className="text-xs font-medium" style={{ color: s.hot ? "#9B92F0" : "rgba(255,255,255,0.6)" }}>{s.h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="p-6" style={{ border: "0.5px solid rgba(127,119,221,0.15)" }}>
            <p className="label-tag mb-3">Partenaires</p>
            <div className="flex flex-col gap-2">
              {[
                { name: "VGC", url: "https://www.vgc.be/" },
                { name: "Rollerland Aalst", url: "https://www.rollerland.be/" },
                { name: "Skate Vlaanderen", url: "https://www.skate.vlaanderen/" },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wide hover:text-white transition-colors"
                  style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}
                >
                  {p.name} →
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Google Form */}
        <div className="lg:col-span-2 animate-fade-up delay-200">
          <p className="label-tag mb-5">Formulaire de réservation &amp; contact</p>
          <div
            className="overflow-hidden"
            style={{ border: "0.5px solid rgba(127,119,221,0.3)", background: "rgba(255,255,255,0.02)" }}
          >
            <iframe
              src={SITE.reservationEmbedUrl}
              width="100%"
              height="720"
              style={{ border: 0, display: "block" }}
              title="Formulaire de réservation Rollerland Brussels"
            >
              Chargement…
            </iframe>
          </div>
          <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.2)" }}>
            Réponse sous 24h · Vous pouvez aussi nous écrire à {SITE.email}
          </p>
        </div>
      </div>
    </div>
  );
}
