import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";

// Footer config from the DB (assembled + translated in the layout). Everything
// has a fallback so the footer renders even with an empty DB.
export type FooterData = {
  brand: string | null;
  tagline: string | null;
  subtitle: string | null;
  address: string | null;
  email: string | null;
  socials: { instagram: string | null; facebook: string | null; tiktok: string | null };
  links: { label: string; href: string }[] | null;
  hours: { day: string; h: string }[] | null;
  closedNote: string | null;
  rights: string | null;
  privacyLabel: string | null;
  privacyUrl: string | null;
};

const DEFAULT_LINKS = [
  { key: "horaires", href: "/horaires" },
  { key: "pratique", href: "/pratique" },
  { key: "tarifs", href: "/tarifs" },
  { key: "contact", href: "/contact" },
  { key: "cours", href: "/cours" },
  { key: "privateEvents", href: "/private-events" },
  { key: "discoRoller", href: "/disco-roller" },
];

const DEFAULT_HOURS = [
  { day: "Mercredi", h: "12h–20h" },
  { day: "Vendredi", h: "17h–00h" },
  { day: "Samedi", h: "12h–00h" },
  { day: "Dimanche", h: "16h–20h" },
];

export default function Footer({ data }: { data?: FooterData }) {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  const brand = data?.brand || "RollerlandBrussels";
  const tagline = data?.tagline || t("tagline");
  const subtitle = data?.subtitle || t("subtitle");
  const address = data?.address || `${SITE.address.line1} · ${SITE.address.line2}`;
  const email = data?.email || SITE.email;
  const socials = [
    { label: "Instagram", url: data?.socials.instagram || SITE.socials.instagram },
    { label: "Facebook", url: data?.socials.facebook || SITE.socials.facebook },
    { label: "TikTok", url: data?.socials.tiktok || SITE.socials.tiktok },
  ].filter((s) => s.url);
  const links =
    data?.links?.length
      ? data.links
      : DEFAULT_LINKS.map((l) => ({ label: tn(l.key), href: l.href }));
  const hours = data?.hours?.length ? data.hours : DEFAULT_HOURS;
  const closedNote = data?.closedNote || t("closedNote");
  const rights = data?.rights || t("rights");
  const privacyLabel = data?.privacyLabel || t("privacy");
  const privacyUrl = data?.privacyUrl || "https://retro.brussels/privacy-policy/";

  // Render the brand with the second half highlighted (e.g. "Rollerland" + "Brussels").
  const brandSplit = brand.match(/^(.*?)(brussels)$/i);

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
              {brandSplit ? (
                <>
                  {brandSplit[1]}
                  <span style={{ color: "#9B92F0" }}>{brandSplit[2]}</span>
                </>
              ) : (
                brand
              )}
            </p>
            <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.9" }}>
              {tagline}<br />
              {subtitle}
            </p>
            <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              {address}
            </p>
            <a
              href={`mailto:${email}`}
              className="text-xs transition-colors hover:text-white"
              style={{ color: "rgba(127,119,221,0.8)" }}
            >
              {email}
            </a>

            {/* Social links */}
            <div className="flex gap-4 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url as string}
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
            <p className="label-tag mb-4">{t("pages")}</p>
            <div className="flex flex-col gap-2.5">
              {links.map((link) => (
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
            <p className="label-tag mb-4">{t("hours")}</p>
            <div className="flex flex-col gap-2">
              {hours.map((s) => (
                <div key={s.day} className="flex justify-between items-center">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{s.day}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.h}</p>
                </div>
              ))}
              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>
                {closedNote}
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
            © {new Date().getFullYear()} {rights}
          </p>
          <a
            href={privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}
          >
            {privacyLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
