import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getRollerland, pick, pickRow, rowStr } from "@/lib/wordpress";
import { SITE } from "@/lib/site";
import { FORMULES } from "@/lib/formules";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Derive the group table from the shared FORMULES source so rows can link to
// their detail page at /tarifs/[slug].
const GROUPS = FORMULES.map((f) => ({
  name: f.name,
  desc: f.includes.join(" · "),
  kids: f.priceKids,
  adults: f.priceAdults,
  highlight: f.highlight,
  slug: f.slug,
}));

const OPTIONS_FALLBACK = [
  { label: "Cours / animation privé(e)", price: "75€/heure" },
  { label: "Karaoké", price: "50€/heure" },
];

const DRINKS_FALLBACK = [
  { name: "Eau (bouteille)", price: "2€" },
  { name: "Boissons chaudes", price: "2,50€" },
  { name: "Soft drinks", price: "3€" },
  { name: "Energy drink", price: "4€" },
  { name: "Bière (Pils, 0%)", price: "3€" },
  { name: "IPA / Bière spéciale", price: "4€" },
  { name: "Vin (verre)", price: "4€" },
  { name: "Vin (25cl)", price: "6€" },
  { name: "Vin (75cl)", price: "15€" },
  { name: "Glühwein (hiver)", price: "4€" },
  { name: "Cava (verre)", price: "5€" },
  { name: "Cava (75cl)", price: "22€" },
  { name: "Mocktails", price: "6€" },
  { name: "Cocktails", price: "8€" },
];

const FOOD_FALLBACK = [
  { name: "Mini bar de chocolat", price: "0,50€" },
  { name: "Snacks variés", price: "2€" },
  { name: "Gâteau au chocolat (part)", price: "3,50€" },
  { name: "Pizza (petite)", price: "6€" },
  { name: "Pizza (normale)", price: "10€" },
  { name: "Saucisse (bœuf, ail, noix)", price: "6€" },
];

function Row({ label, price, desc, last }: { label: string; price: string; desc?: string; last?: boolean }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4 hover-lift transition-all"
      style={{ borderBottom: last ? "none" : "0.5px solid rgba(127,119,221,0.1)", background: "rgba(255,255,255,0.01)" }}
    >
      <div>
        <p className="text-sm text-white" style={{ fontWeight: 400 }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{desc}</p>}
      </div>
      <p className="text-sm font-medium flex-shrink-0 ml-4" style={{ color: "#9B92F0" }}>{price}</p>
    </div>
  );
}

export default async function TarifsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("tarifs");
  const acf = await getRollerland();

  const intro = pick(acf, "tarifs_intro", locale) || t("intro");
  const consume1 = pick(acf, "consume_notice_1", locale) || t("consume1");
  const consume2 = pick(acf, "consume_notice_2", locale) || t("consume2");

  const INDIVIDUAL = [
    { label: "Enfant (−16 ans)", price: acf.tarif_enfant || "6€", desc: "Location de patins incluse" },
    { label: "Adulte", price: acf.tarif_adulte || "8€", desc: "Location de patins incluse" },
    { label: "Protection", price: acf.tarif_protection || "1€/paire", desc: "Genouillères, coudières, poignets" },
    { label: "Vestiaire", price: acf.tarif_vestiaire || "1€", desc: "Casier sécurisé" },
  ];

  // Options: WP repeater (localized label + neutral price) else hardcoded.
  const OPTIONS = acf.options_supplementaires?.length
    ? acf.options_supplementaires.map((o) => ({ label: pickRow(o, "option_label", locale), price: rowStr(o, "option_price") }))
    : OPTIONS_FALLBACK;

  const DRINKS = acf.menu_boissons?.length
    ? acf.menu_boissons.map((d) => ({ name: d.nom, price: d.prix }))
    : DRINKS_FALLBACK;

  const FOOD = acf.menu_nourriture?.length
    ? acf.menu_nourriture.map((f) => ({ name: f.nom, price: f.prix }))
    : FOOD_FALLBACK;

  // Group table: WP `formules` repeater (localized) → else shared FORMULES map.
  const groupRows = acf.formules?.length
    ? acf.formules.map((f) => ({
        name: pickRow(f, "formule_nom", locale),
        desc: pickRow(f, "formule_tagline", locale),
        kids: rowStr(f, "formule_prix_enfant") || "—",
        adults: rowStr(f, "formule_prix_adulte") || "—",
        highlight: Boolean(f.formule_highlight),
        slug: rowStr(f, "formule_slug") || null,
      }))
    : GROUPS;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="label-tag mb-4">{t("kicker")}</p>
        <h1 className="text-5xl md:text-7xl text-white mb-4" style={{ fontWeight: 300, letterSpacing: "-0.03em", lineHeight: "0.95" }}>
          {t("title")}
        </h1>
        <p className="text-sm mt-6 max-w-lg" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
          {intro}
        </p>
      </div>

      {/* Individual + options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 animate-fade-up delay-100">
        <div>
          <p className="label-tag mb-4">{t("individual")}</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {INDIVIDUAL.map((item, i) => (
              <Row key={item.label} label={item.label} price={item.price} desc={item.desc} last={i === INDIVIDUAL.length - 1} />
            ))}
          </div>
        </div>
        <div>
          <p className="label-tag mb-4">{t("options")}</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {OPTIONS.map((o, i) => (
              <Row key={o.label} label={o.label} price={o.price} last={i === OPTIONS.length - 1} />
            ))}
          </div>
          <div
            className="mt-4 p-4"
            style={{ border: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", lineHeight: "1.7" }}>
              {t("optionsNote")}
            </p>
          </div>
        </div>
      </div>

      {/* Group packages */}
      <div className="mb-16 animate-fade-up delay-200">
        <div className="flex items-end justify-between mb-4">
          <p className="label-tag">{t("groupPackages")}</p>
          <Link href="/contact" className="text-xs uppercase" style={{ color: "rgba(127,119,221,0.5)", letterSpacing: "0.1em" }}>
            {t("reserve")}
          </Link>
        </div>
        <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
          <div
            className="grid grid-cols-4 px-5 py-3"
            style={{ borderBottom: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(127,119,221,0.05)" }}
          >
            <p className="label-tag col-span-2">{t("colFormula")}</p>
            <p className="label-tag text-center">{t("colKids")}</p>
            <p className="label-tag text-center">{t("colAdults")}</p>
          </div>
          {groupRows.map((g, i) => (
            <div
              key={g.name}
              className="grid grid-cols-4 px-5 py-4 items-center hover-lift transition-all"
              style={{
                borderBottom: i < groupRows.length - 1 ? "0.5px solid rgba(127,119,221,0.1)" : "none",
                background: g.highlight ? "rgba(127,119,221,0.04)" : "rgba(255,255,255,0.01)",
              }}
            >
              <div className="col-span-2 flex items-center gap-3">
                {g.highlight && <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#9B92F0" }} />}
                <div>
                  {g.slug ? (
                    <Link
                      href={`/tarifs/${g.slug}`}
                      className="text-sm text-white hover:text-purple-300 transition-colors inline-flex items-center gap-1.5"
                      style={{ fontWeight: 400 }}
                    >
                      {g.name}
                      <span style={{ color: "#9B92F0", fontSize: "0.7rem" }}>→</span>
                    </Link>
                  ) : (
                    <p className="text-sm text-white" style={{ fontWeight: 400 }}>{g.name}</p>
                  )}
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{g.desc}</p>
                </div>
              </div>
              <p className="text-sm text-center font-medium" style={{ color: g.kids === "—" ? "rgba(255,255,255,0.15)" : "#9B92F0" }}>{g.kids}</p>
              <p className="text-sm text-center font-medium" style={{ color: g.adults === "—" ? "rgba(255,255,255,0.15)" : "#9B92F0" }}>{g.adults}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <a
            href={SITE.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {t("reserveGroup")}
          </a>
        </div>
      </div>

      {/* Bar + Food */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-up delay-300">
        <div>
          <p className="label-tag mb-4">{t("bar")}</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {DRINKS.map((d, i) => (
              <Row key={d.name} label={d.name} price={d.price} last={i === DRINKS.length - 1} />
            ))}
          </div>
        </div>
        <div>
          <p className="label-tag mb-4">{t("food")}</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {FOOD.map((f, i) => (
              <Row key={f.name} label={f.name} price={f.price} last={i === FOOD.length - 1} />
            ))}
          </div>
        </div>
      </div>

      {/* Consume-locally notice */}
      <div
        className="mt-10 p-6 md:p-8 animate-fade-up delay-300"
        style={{ border: "0.5px solid rgba(127,119,221,0.3)", background: "rgba(127,119,221,0.06)" }}
      >
        <p className="label-tag mb-3">{t("goodToKnow")}</p>
        <p className="text-sm text-white mb-1" style={{ fontWeight: 400, lineHeight: "1.7" }}>
          {consume1}
        </p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.7" }}>
          {consume2}
        </p>
      </div>
    </div>
  );
}
