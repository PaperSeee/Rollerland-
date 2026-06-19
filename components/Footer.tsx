import Link from "next/link";
import { SITE } from "@/lib/site";

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
              Rollerland<span style={{ color: "#9B92F0" }}>Brussels</span>
            </p>
            <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.9" }}>
              La piste de roller au cœur de Bruxelles.<br />
              Disco, cours, anniversaires &amp; team building.
            </p>
            <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              {SITE.address.line1} · {SITE.address.line2}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-xs transition-colors hover:text-white"
              style={{ color: "rgba(127,119,221,0.8)" }}
            >
              {SITE.email}
            </a>

            {/* Social links */}
            <div className="flex gap-4 mt-5">
              {[
                { label: "Instagram", url: SITE.socials.instagram },
                { label: "Facebook", url: SITE.socials.facebook },
                { label: "TikTok", url: SITE.socials.tiktok },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wide transition-colors hover:text-white"
                  style={{ color: "rgba(127,119,221,0.7)", letterSpacing: "0.1em" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="label-tag mb-4">Pages</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Horaires", href: "/horaires" },
                { label: "Pratique", href: "/pratique" },
                { label: "Tarifs", href: "/tarifs" },
                { label: "Contact", href: "/contact" },
                { label: "Cours", href: "/cours" },
                { label: "Private Events", href: "/private-events" },
                { label: "Disco Roller", href: "/disco-roller" },
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
