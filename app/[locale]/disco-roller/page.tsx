import { getTranslations, setRequestLocale } from "next-intl/server";
import EditableImage, { ImageReplaceButton } from "@/components/edit/EditableImage";
import Editable from "@/components/edit/Editable";
import EditSectionLink from "@/components/edit/EditSectionLink";
import { getRollerland, pick } from "@/lib/wordpress";
import { translate, translateMany } from "@/lib/translate";
import { getSchedule } from "@/lib/schedule";
import { getDiscoEvents } from "@/lib/disco";
import { SITE } from "@/lib/site";

// DB-backed; events are managed from /admin. Stay dynamic so admin edits show
// immediately (Server Actions also revalidate this path).
export const dynamic = "force-dynamic";

const DATE_LOCALE: Record<string, string> = { en: "en-GB", fr: "fr-BE", nl: "nl-BE" };

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(DATE_LOCALE[locale] ?? "en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const FALLBACK_HERO_DISCO = "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg";

export default async function DiscoRollerPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("disco");
  const [dbEvents, acf] = await Promise.all([getDiscoEvents(), getRollerland()]);
  const heroImage = acf.disco_hero_image || FALLBACK_HERO_DISCO;
  const lead = (await translate(pick(acf, "disco_lead"), params.locale)) || t("lead");

  // Events from the Disco Events admin. Past events are hidden; no event = a
  // short "coming soon" message (never placeholder events).
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = dbEvents.filter((e) => e.date >= today);
  // Day + description are written in English in the admin → auto-translated.
  const evTr = await translateMany(upcoming.flatMap((e) => [e.day, e.desc]), params.locale);
  const discoEvents = upcoming.map((e, i) => ({ ...e, day: evTr[2 * i] || e.day, desc: evTr[2 * i + 1] || e.desc }));
  const nextEvent = discoEvents[0];

  // Disco days + hours come from the Schedule (admin → Schedule).
  const discoDays = (await getSchedule(acf, params.locale)).filter((d) => d.disco && d.hours);

  // Rental prices: same values as the Prices page.
  const [pAdult, pKids, pProt, pCloak] = await translateMany(
    [pick(acf, "tarif_adulte") || "8€", pick(acf, "tarif_enfant") || "6€", pick(acf, "tarif_protection") || "1€/pair", pick(acf, "tarif_vestiaire") || "1€"],
    params.locale,
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage
            field="disco_hero_image"
            value={heroImage}
            alt="Disco Roller Bruxelles"
            fill
            controls={false}
            className="object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(21,14,40,0.95) 0%, rgba(83,74,183,0.2) 60%, rgba(21,14,40,0.9) 100%)", pointerEvents: "none" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #150E28 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <ImageReplaceButton field="disco_hero_image" label="Replace background image" className="mb-5" />
          <p className="label-tag mb-5 animate-fade-up">{t("kicker")}</p>
          <h1
            className="text-6xl md:text-8xl text-white animate-fade-up delay-100"
            style={{ fontWeight: 300, lineHeight: "0.95", letterSpacing: "-0.03em" }}
          >
            Disco<br />
            <span style={{ color: "#9B92F0" }}>Roller</span>
          </h1>
          <Editable
            as="p"
            field="disco_lead"
            value={lead}
            multiline
            className="mt-6 text-base max-w-lg animate-fade-up delay-200"
            style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.75" }}
          />

          <div className="flex flex-wrap gap-4 mt-8 animate-fade-up delay-300">
            {discoDays.map((d, i) => (
              <div key={`${d.day}-${i}`} className={`glass-card px-6 py-3${i === 0 ? " animate-pulse-glow" : ""}`}>
                <p className="label-tag mb-0.5">{d.day}</p>
                <p className="text-white text-sm font-medium">{d.hours}</p>
              </div>
            ))}
            <div className="glass-card px-6 py-3">
              <p className="label-tag mb-0.5">{t("entry")}</p>
              <p className="text-sm font-medium" style={{ color: "#9B92F0" }}>{t("free")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prochains événements ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="label-tag mb-3">{t("agenda")}</p>
            <h2 className="text-3xl md:text-4xl text-white mb-4" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
              {t("nextEvents")}
            </h2>
            {/* Disco events are managed from the Disco Events admin screen */}
            <EditSectionLink href="/admin" label="disco events" />
          </div>

          {!nextEvent ? (
            <div className="p-8 md:p-10 mb-6 text-center" style={{ border: "0.5px solid rgba(127,119,221,0.3)", background: "rgba(127,119,221,0.05)" }}>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.7" }}>{t("noEvents")}</p>
              <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
                {t("followInstagram")}
              </a>
            </div>
          ) : (
          <>
          {/* Featured next event */}
          <div
            className="p-8 md:p-10 mb-6 relative overflow-hidden hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.4)", background: "rgba(127,119,221,0.07)" }}
          >
            <div className="absolute top-0 left-0 h-full w-1" style={{ background: "linear-gradient(to bottom, #9B92F0, transparent)" }} />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="label-tag">{t("next")}</span>
                  {nextEvent.special && (
                    <span className="text-xs px-2 py-0.5 uppercase" style={{ background: "#9B92F0", color: "#150E28", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                      {t("special")}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl text-white mb-2" style={{ fontWeight: 400 }}>
                  {nextEvent.theme}
                </h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>
                  {nextEvent.desc}
                </p>
                <div className="flex flex-wrap gap-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <span>{nextEvent.day} {formatDate(nextEvent.date, params.locale)}</span>
                  <span>·</span>
                  <span>{nextEvent.time}</span>
                  {nextEvent.dj && <><span>·</span><span>{nextEvent.dj}</span></>}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div
                  className="px-6 py-4 text-center animate-pulse-glow"
                  style={{ border: "0.5px solid rgba(127,119,221,0.5)", background: "rgba(127,119,221,0.08)" }}
                >
                  <p className="label-tag mb-1">{t("entry")}</p>
                  <p className="text-xl font-light" style={{ color: "#9B92F0" }}>{t("free")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event list */}
          <div style={{ border: "0.5px solid rgba(127,119,221,0.2)" }}>
            {discoEvents.slice(1).map((event, i) => (
              <div
                key={event.id}
                className="group grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-5 hover-lift transition-all"
                style={{
                  borderBottom: i < discoEvents.length - 2 ? "0.5px solid rgba(127,119,221,0.12)" : "none",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                {/* Date */}
                <div>
                  <p className="label-tag mb-1">{event.day}</p>
                  <p className="text-xs text-white">{formatDate(event.date, params.locale)}</p>
                </div>

                {/* Theme */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <h4 className="text-sm text-white group-hover:text-purple-400 transition-colors" style={{ fontWeight: 400 }}>
                    {event.theme}
                  </h4>
                  {event.special && (
                    <span className="text-xs px-2 py-0.5" style={{ border: "0.5px solid rgba(127,119,221,0.5)", color: "#9B92F0", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {t("special")}
                    </span>
                  )}
                </div>

                {/* Time + DJ */}
                <div className="flex items-center justify-between md:justify-end gap-4">
                  <div className="text-right">
                    <p className="text-xs" style={{ color: "#9B92F0" }}>{event.time}</p>
                    {event.dj && <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{event.dj}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </>
          )}

          <p className="text-xs mt-4 text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
            {t("weeklyUpdate")}
          </p>
        </div>
      </section>

      {/* ── Infos pratiques ── */}
      <section
        className="py-16 px-6"
        style={{ borderTop: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t("skateRental"),
              items: [t("rentalSkates", { adult: pAdult, kids: pKids }), t("rentalProtection", { price: pProt }), t("rentalCloakroom", { price: pCloak })],
            },
            {
              title: t("onSite"),
              items: [t("onSite1"), t("onSite2"), t("onSite3")],
            },
            {
              title: t("toKnow"),
              items: [t("know1"), t("know2"), t("know3")],
            },
          ].map((block) => (
            <div
              key={block.title}
              className="p-6"
              style={{ border: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(255,255,255,0.02)" }}
            >
              <p className="label-tag mb-4">{block.title}</p>
              <ul className="flex flex-col gap-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <span style={{ color: "#9B92F0", fontSize: "0.5rem", marginTop: "0.35rem" }}>◆</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="label-tag mb-2">{t("ctaKicker")}</p>
            <h3 className="text-2xl text-white" style={{ fontWeight: 300 }}>
              {t("ctaTitle1")}<br />
              <span style={{ color: "#9B92F0" }}>{t("ctaTitle2")}</span>
            </h3>
          </div>
          <div className="flex gap-4">
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
              {t("followInstagram")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
