import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { FORMULES, getFormule, type Formule } from "@/lib/formules";
import { getRollerland, rowStr } from "@/lib/wordpress";
import { translate, translateMany } from "@/lib/translate";
import { SITE } from "@/lib/site";

// Build a Formule from a WordPress repeater row (auto-translated to the locale),
// if one matches the slug; otherwise null so we fall back to the static map.
async function formuleFromWP(slug: string, locale: string): Promise<Formule | null> {
  const acf = await getRollerland();
  const row = acf.formules?.find((f) => rowStr(f, "formule_slug") === slug);
  if (!row) return null;
  const includesSrc = Array.isArray(row.formule_includes)
    ? (row.formule_includes as Array<Record<string, unknown>>).map((r) => rowStr(r, "include_item")).filter(Boolean)
    : [];
  const [name, tagline, desc, includes] = await Promise.all([
    translate(rowStr(row, "formule_nom"), locale),
    translate(rowStr(row, "formule_tagline"), locale),
    translate(rowStr(row, "formule_description"), locale),
    translateMany(includesSrc, locale),
  ]);
  return {
    slug,
    name,
    tagline,
    desc,
    priceKids: rowStr(row, "formule_prix_enfant") || "—",
    priceAdults: rowStr(row, "formule_prix_adulte") || "—",
    highlight: Boolean(row.formule_highlight),
    includes,
    image: rowStr(row, "formule_image") || null,
    ctaLabel: "Réserver cette formule",
    ctaHref: SITE.reservationUrl,
  };
}

// Static formule detail pages — generated at build time for every locale × slug.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    FORMULES.map((f) => ({ locale, slug: f.slug })),
  );
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const formule = getFormule(params.slug);
  if (!formule) return { title: "Formule introuvable — Rollerland Brussels" };
  return {
    title: `${formule.name} — Tarifs Rollerland Brussels`,
    description: formule.desc,
  };
}

export default async function FormuleDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("formule");
  // Prefer WordPress content for this slug, else the static map.
  const formule = (await formuleFromWP(params.slug, params.locale)) ?? getFormule(params.slug);
  if (!formule) notFound();
  // Editable reservation link (admin → Global), fallback to the formule default.
  const acf = await getRollerland();
  const reservationUrl = rowStr(acf as unknown as Record<string, unknown>, "reservation_url") || formule.ctaHref;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Back link */}
      <Link
        href="/tarifs"
        className="text-xs uppercase tracking-wide hover:text-white transition-colors inline-block mb-10"
        style={{ color: "rgba(127,119,221,0.7)", letterSpacing: "0.1em" }}
      >
        {t("back")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: content */}
        <div>
          <p className="label-tag mb-4">{formule.tagline}</p>
          <h1
            className="text-4xl md:text-6xl text-white mb-6"
            style={{ fontWeight: 300, letterSpacing: "-0.03em", lineHeight: "0.95" }}
          >
            {formule.name}
          </h1>
          <p className="text-sm mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.85" }}>
            {formule.desc}
          </p>

          {/* Prices */}
          <div className="flex gap-4 mb-10">
            {formule.priceKids !== "—" && (
              <div
                className="px-5 py-4 flex-1"
                style={{ border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(255,255,255,0.02)" }}
              >
                <p className="label-tag mb-1">{t("kids")}</p>
                <p className="text-2xl font-light" style={{ color: "#9B92F0" }}>
                  {formule.priceKids}
                </p>
              </div>
            )}
            {formule.priceAdults !== "—" && (
              <div
                className="px-5 py-4 flex-1"
                style={{ border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(255,255,255,0.02)" }}
              >
                <p className="label-tag mb-1">{t("adults")}</p>
                <p className="text-2xl font-light" style={{ color: "#9B92F0" }}>
                  {formule.priceAdults}
                </p>
              </div>
            )}
          </div>

          {/* Includes */}
          <p className="label-tag mb-4">{t("included")}</p>
          <ul className="flex flex-col gap-2 mb-10">
            {formule.includes.map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span style={{ color: "#9B92F0", fontSize: "0.5rem", marginTop: "0.4rem" }}>◆</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <a href={reservationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary animate-pulse-glow">
            {formule.ctaLabel}
          </a>
        </div>

        {/* Right: image */}
        <div
          className="relative w-full overflow-hidden"
          style={{ minHeight: 360, border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(127,119,221,0.04)" }}
        >
          {formule.image ? (
            <Image src={formule.image} alt={formule.name} fill className="object-cover" style={{ opacity: 0.85 }} />
          ) : (
            // TODO(client): fournir une image pour cette formule.
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-light" style={{ color: "rgba(127,119,221,0.15)" }}>
                {formule.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Consume-locally reminder (consistent with /tarifs) */}
      <div
        className="mt-16 p-6 md:p-8"
        style={{ border: "0.5px solid rgba(127,119,221,0.3)", background: "rgba(127,119,221,0.06)" }}
      >
        <p className="label-tag mb-3">{t("goodToKnow")}</p>
        <p className="text-sm text-white mb-1" style={{ fontWeight: 400, lineHeight: "1.7" }}>
          {t("consume1")}
        </p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.7" }}>
          {t("consume2")}
        </p>
      </div>
    </div>
  );
}
