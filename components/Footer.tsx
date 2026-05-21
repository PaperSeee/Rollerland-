import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{ borderTop: "0.5px solid rgba(127,119,221,0.2)" }}
      className="mt-24 py-12 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p
            className="text-white uppercase tracking-widest text-xs font-medium mb-4"
            style={{ letterSpacing: "0.18em" }}
          >
            Rollerland Brussels
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
            Rue Dieudonné Lefèvre 4<br />
            B-1020 Bruxelles<br />
            <a
              href="https://wa.me/32484772593"
              className="hover:text-white transition-colors"
              style={{ color: "rgba(127,119,221,0.8)" }}
            >
              WhatsApp: +32 484 77 25 93
            </a>
          </p>
        </div>

        {/* Nav */}
        <div>
          <p className="label-tag mb-4">Navigation</p>
          <div className="flex flex-col gap-2">
            {[
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
                style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Hours summary */}
        <div>
          <p className="label-tag mb-4">Horaires clés</p>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.9" }}>
            <p>Mercredi · 12h–20h</p>
            <p>Vendredi · 17h–24h</p>
            <p>Samedi · 12h–24h</p>
            <p>Dimanche · 16h–20h</p>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto mt-10 pt-6 flex items-center justify-between divider"
      >
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} Rollerland Brussels · Retro Brussels asbl
        </p>
        <a
          href="https://retro.brussels/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}
        >
          Confidentialité
        </a>
      </div>
    </footer>
  );
}
