import { getTranslations, setRequestLocale } from "next-intl/server";
import { getRollerland, pick } from "@/lib/wordpress";
import { translate } from "@/lib/translate";
import Editable from "@/components/edit/Editable";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CLOSURES_FALLBACK = [
  { period: "16 – 24 mai 2026", reason: "Brocante / Événement spécial" },
  { period: "29 – 31 mai 2026", reason: "Fermeture exceptionnelle" },
  { period: "13 juin 2026", reason: "Fermé avant 19h" },
];

export default async function HorairesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("horaires");
  const acf = await getRollerland();
  const intro = (await translate(pick(acf, "horaires_intro"), locale)) || t("intro");

  const SCHEDULE = [
    { day: "Lundi", short: "LUN", hours: null as string | null, activities: [] as string[], note: "Sur réservation groupes", disco: false },
    { day: "Mardi", short: "MAR", hours: null, activities: [], note: "Sur réservation groupes", disco: false },
    { day: "Mercredi", short: "MER", hours: acf.horaire_mercredi || "12h00 – 20h00", activities: ["Cours enfants 16h–17h", "Cours adultes 17h30–19h", "Accès libre"], note: null, disco: false },
    { day: "Jeudi", short: "JEU", hours: null, activities: [], note: "Sur réservation groupes", disco: false },
    { day: "Vendredi", short: "VEN", hours: acf.horaire_vendredi || "17h00 – 00h00", activities: ["Disco Roller"], note: null, disco: true },
    { day: "Samedi", short: "SAM", hours: acf.horaire_samedi || "12h00 – 00h00", activities: ["Cours enfants 16h–17h", "Cours adultes 17h30–19h", "Disco Roller"], note: null, disco: true },
    { day: "Dimanche", short: "DIM", hours: acf.horaire_dimanche || "16h00 – 20h00", activities: ["Accès libre"], note: acf.horaire_note_dimanche || "Juin–Octobre : 12h–20h", disco: false },
  ];

  const CLOSURES = acf.fermetures_exceptionnelles?.length
    ? acf.fermetures_exceptionnelles.map((f) => ({ period: f.periode, reason: f.raison }))
    : CLOSURES_FALLBACK;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="label-tag mb-4">{t("kicker")}</p>
        <h1 className="text-5xl md:text-7xl text-white mb-4" style={{ fontWeight: 300, letterSpacing: "-0.03em", lineHeight: "0.95" }}>
          {t("title")}
        </h1>
        <Editable as="p" field="horaires_intro" value={intro} multiline className="text-sm max-w-lg mt-6" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }} />
      </div>

      {/* Visual week grid */}
      <div className="mb-20 animate-fade-up delay-100">
        <p className="label-tag mb-6">{t("typicalWeek")}</p>
        <div className="grid grid-cols-7 gap-0" style={{ border: "0.5px solid rgba(127,119,221,0.2)" }}>
          {SCHEDULE.map((slot, i) => (
            <div
              key={slot.day}
              className="relative flex flex-col"
              style={{
                borderRight: i < SCHEDULE.length - 1 ? "0.5px solid rgba(127,119,221,0.15)" : "none",
                background: slot.disco
                  ? "rgba(127,119,221,0.07)"
                  : slot.hours
                  ? "rgba(255,255,255,0.02)"
                  : "transparent",
                minHeight: 200,
              }}
            >
              <div
                className="px-3 py-3 text-center"
                style={{ borderBottom: "0.5px solid rgba(127,119,221,0.15)" }}
              >
                <p
                  className="text-xs font-medium uppercase"
                  style={{
                    color: slot.disco ? "#9B92F0" : slot.hours ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                    letterSpacing: "0.1em",
                    fontSize: "0.6rem",
                  }}
                >
                  {slot.short}
                </p>
              </div>

              <div className="px-2 py-4 flex flex-col gap-2 flex-1">
                {slot.hours ? (
                  <>
                    <p className="text-xs text-center font-medium" style={{ color: slot.disco ? "#9B92F0" : "rgba(255,255,255,0.8)", fontSize: "0.65rem", lineHeight: "1.4" }}>
                      {slot.hours}
                    </p>
                    <div className="flex flex-col gap-1.5 mt-1">
                      {slot.activities.map((a) => (
                        <span
                          key={a}
                          className="text-center px-1 py-0.5"
                          style={{
                            background: a === "Disco Roller" ? "rgba(127,119,221,0.2)" : "rgba(255,255,255,0.04)",
                            border: "0.5px solid rgba(127,119,221,0.2)",
                            color: a === "Disco Roller" ? "#9B92F0" : "rgba(255,255,255,0.4)",
                            fontSize: "0.55rem",
                            letterSpacing: "0.05em",
                            lineHeight: "1.4",
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.6rem", marginTop: "auto", marginBottom: "auto" }}>
                    {t("closed")}
                  </p>
                )}
                {slot.note && (
                  <p className="text-center text-xs mt-auto" style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.55rem", lineHeight: "1.4" }}>
                    {slot.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed list */}
      <div className="mb-20 animate-fade-up delay-200">
        <p className="label-tag mb-6">{t("detail")}</p>
        <div style={{ border: "0.5px solid rgba(127,119,221,0.2)" }}>
          {SCHEDULE.filter((s) => s.hours).map((slot, i, arr) => (
            <div
              key={slot.day}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6 hover-lift transition-all"
              style={{
                borderBottom: i < arr.length - 1 ? "0.5px solid rgba(127,119,221,0.12)" : "none",
                background: slot.disco ? "rgba(127,119,221,0.04)" : "rgba(255,255,255,0.01)",
              }}
            >
              <div className="flex items-center gap-3">
                {slot.disco && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#9B92F0" }} />
                )}
                <p className="text-sm font-medium text-white uppercase" style={{ letterSpacing: "0.1em", fontWeight: 400 }}>
                  {slot.day}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: slot.disco ? "#9B92F0" : "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                  {slot.hours}
                </p>
                {slot.note && (
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{slot.note}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {slot.activities.map((a) => (
                  <span
                    key={a}
                    className="text-xs px-2.5 py-1"
                    style={{
                      border: a === "Disco Roller" ? "0.5px solid rgba(127,119,221,0.6)" : "0.5px solid rgba(127,119,221,0.25)",
                      color: a === "Disco Roller" ? "#9B92F0" : "rgba(255,255,255,0.45)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closures */}
      <div className="mb-16 animate-fade-up delay-300">
        <p className="label-tag mb-6">{t("closures")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CLOSURES.map((c) => (
            <div
              key={c.period}
              className="p-5 hover-lift"
              style={{ border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(255,255,255,0.02)" }}
            >
              <div className="w-6 h-px mb-4" style={{ background: "#9B92F0" }} />
              <p className="text-sm font-medium text-white mb-2" style={{ fontWeight: 400 }}>{c.period}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Updates + reservation CTA */}
      <div
        className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-up delay-400"
        style={{ background: "rgba(127,119,221,0.06)", border: "0.5px solid rgba(127,119,221,0.3)" }}
      >
        <div>
          <p className="label-tag mb-2">{t("updates")}</p>
          <p className="text-sm text-white mb-4" style={{ fontWeight: 300 }}>
            {t("updatesText")}
          </p>
          <div className="flex flex-wrap gap-4">
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
                className="text-xs uppercase tracking-wide hover:text-white transition-colors"
                style={{ color: "#9B92F0", letterSpacing: "0.1em" }}
              >
                {s.name} →
              </a>
            ))}
          </div>
        </div>
        <a
          href={SITE.reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-shrink-0 animate-pulse-glow"
        >
          {t("reserve")}
        </a>
      </div>
    </div>
  );
}
