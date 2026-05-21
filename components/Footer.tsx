import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-0 py-16 px-6"
      style={{ borderTop: "0.5px solid rgba(127,119,221,0.15)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="text-white uppercase tracking-widest text-xs font-medium mb-4" style={{ letterSpacing: "0.2em" }}>
              Rollerland Brussels
            </p>
            <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
              La piste de roller au cœur de Bruxelles.<br />
              Disco, cours, anniversaires &amp; team building.
            </p>
            <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
              Rue Dieudonné Lefèvre 4 · B-1020 Bruxelles
            </p>
            <a
              href="https://wa.me/32484772593"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "rgba(127,119,221,0.7)" }}
            >
              WhatsApp : +32 484 77 25 93
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="label-tag mb-4">Pages</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Disco Roller", href: "/disco-roller" },
                { label: "Horaires", href: "/horaires" },
                { label: "Tarifs", href: "/tarifs" },
                { label: "Cours", href: "/cours" },
                { label: "Services", href: "/services" },
                { label: "Pratique", href: "/pratique" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-wide transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="label-tag mb-4">Horaires</p>
            <div className="flex flex-col gap-2">
              {[
                { day: "Mercredi", h: "12h–20h" },
                { day: "Vendredi", h: "17h–00h" },
                { day: "Samedi", h: "12h–00h" },
                { day: "Dimanche", h: "16h–20h" },
              ].map((s) => (
                <div key={s.day} className="flex justify-between items-center">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{s.day}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.h}</p>
                </div>
              ))}
              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>
                Lun–Mar–Jeu sur réservation
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "0.5px solid rgba(127,119,221,0.12)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Rollerland Brussels · Retro Brussels asbl
          </p>
          <a
            href="https://retro.brussels/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}
          >
            Politique de confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
}
