import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getRollerland, pick, rowStr } from "@/lib/wordpress";
import { translate, translateMany } from "@/lib/translate";
import Editable from "@/components/edit/Editable";
import { SITE } from "@/lib/site";

export const revalidate = 60;

const STIB = [
  { line: "46", stop: "André de Jongh" },
  { line: "86", stop: "André de Jongh" },
  { line: "88", stop: "André de Jongh" },
  { line: "N18", stop: "André de Jongh (nuit)" },
];

const DELIJN = [
  { line: "R30", stop: "André de Jongh" },
  { line: "R41", stop: "André de Jongh" },
  { line: "R50", stop: "André de Jongh" },
  { line: "R60", stop: "André de Jongh" },
];

const RULES = [
  "Les patins à roulettes sont obligatoires sur la piste.",
  "Les protections (genouillères, coudières, poignets) sont fortement recommandées.",
  "Pas de patins en ligne (rollerblades) sur la piste roller quad.",
  "Respect des autres patineurs à tout moment.",
  "Les enfants de moins de 8 ans doivent être accompagnés d'un adulte.",
  "Pas de nourriture ni de boissons sur la piste.",
  "Les objets de valeur sont sous votre responsabilité.",
  "L'équipe se réserve le droit d'exclure tout comportement dangereux.",
];

const FALLBACK_REGLEMENT = "https://retro.brussels/wp-content/uploads/2024/04/roller-rules-Aida-724x1024.jpeg";

export default async function PratiquePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("pratique");
  const acf = await getRollerland();
  const reglementImage = acf.reglement_image || FALLBACK_REGLEMENT;
  const parkingUrl = acf.parking_url || "https://go.parkbee.net/start-booking/24763";
  const intro = (await translate(pick(acf, "pratique_intro"), locale)) || t("intro");
  const parkingText = (await translate(pick(acf, "parking_text"), locale)) || t("parkingText");
  // Rules from WP (translated) if provided, else the hardcoded RULES list.
  const rules = acf.rules?.length
    ? await translateMany(acf.rules.map((r) => rowStr(r, "rule_text")), locale)
    : RULES;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="label-tag mb-4">{t("kicker")}</p>
        <h1
          className="text-4xl md:text-6xl text-white mb-4"
          style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
        >
          {t("title")}
        </h1>
        <Editable as="p" field="pratique_intro" value={intro} multiline className="text-sm" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Address + Map */}
        <div>
          <p className="label-tag mb-5">{t("address")}</p>
          <div
            className="p-6 mb-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(127,119,221,0.3)" }}
          >
            <p className="text-white text-sm" style={{ lineHeight: "2" }}>
              <strong style={{ fontWeight: 500 }}>Rollerland Brussels</strong><br />
              Rue Dieudonné Lefèvre 4<br />
              B-1020 Laeken, Bruxelles
            </p>
          </div>

          {/* Google Maps embed */}
          <div
            className="relative overflow-hidden"
            style={{
              height: 300,
              border: "0.5px solid rgba(127,119,221,0.3)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.5!2d4.348!3d50.879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4a1d1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sRue+Dieudonn%C3%A9+Lef%C3%A8vre+4%2C+1020+Bruxelles!5e0!3m2!1sfr!2sbe!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.4)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte Rollerland Brussels"
            />
          </div>

          <a
            href={SITE.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-4 w-full justify-center"
          >
            {t("openMaps")}
          </a>
        </div>

        {/* Transport */}
        <div>
          <p className="label-tag mb-5">{t("transport")}</p>

          <div className="mb-6">
            <p
              className="text-xs font-medium uppercase tracking-wide mb-3"
              style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em" }}
            >
              STIB
            </p>
            <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
              {STIB.map((t, i) => (
                <div
                  key={t.line}
                  className="flex items-center gap-4 px-5 py-3"
                  style={{
                    borderBottom:
                      i < STIB.length - 1 ? "0.5px solid rgba(127,119,221,0.12)" : "none",
                  }}
                >
                  <span
                    className="text-xs font-medium px-2 py-0.5"
                    style={{
                      background: "#534AB7",
                      color: "white",
                      minWidth: 36,
                      textAlign: "center",
                    }}
                  >
                    {t.line}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {t.stop}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p
              className="text-xs font-medium uppercase tracking-wide mb-3"
              style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em" }}
            >
              De Lijn
            </p>
            <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
              {DELIJN.map((t, i) => (
                <div
                  key={t.line}
                  className="flex items-center gap-4 px-5 py-3"
                  style={{
                    borderBottom:
                      i < DELIJN.length - 1 ? "0.5px solid rgba(127,119,221,0.12)" : "none",
                  }}
                >
                  <span
                    className="text-xs font-medium px-2 py-0.5"
                    style={{
                      background: "#9B92F0",
                      color: "white",
                      minWidth: 36,
                      textAlign: "center",
                    }}
                  >
                    {t.line}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {t.stop}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Parking */}
          <div
            className="p-6"
            style={{
              background: "rgba(127,119,221,0.05)",
              border: "0.5px solid rgba(127,119,221,0.3)",
            }}
          >
            <p className="label-tag mb-3">{t("parking")}</p>
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8" }}>
              {parkingText}
            </p>
            <a
              href={parkingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {t("bookParking")}
            </a>
          </div>
        </div>
      </div>

      {/* Roller rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <p className="label-tag mb-5">{t("rules")}</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {rules.map((rule, i) => (
              <div
                key={i}
                className="flex gap-4 px-5 py-4"
                style={{
                  borderBottom:
                    i < rules.length - 1 ? "0.5px solid rgba(127,119,221,0.12)" : "none",
                }}
              >
                <span
                  className="text-xs font-medium flex-shrink-0 mt-0.5"
                  style={{ color: "#9B92F0", minWidth: 20 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Rules image */}
        <div>
          <p className="label-tag mb-5">{t("rulesVisual")}</p>
          <div
            className="relative overflow-hidden"
            style={{
              border: "0.5px solid rgba(127,119,221,0.3)",
              height: 480,
            }}
          >
            <Image
              src={reglementImage}
              alt="Règlement Rollerland Brussels"
              fill
              className="object-contain"
              style={{ objectPosition: "top center" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
