import { getTranslations, setRequestLocale } from "next-intl/server";
import { getRollerland, pick, rowStr } from "@/lib/wordpress";
import { translate } from "@/lib/translate";
import Editable from "@/components/edit/Editable";
import EditSectionLink from "@/components/edit/EditSectionLink";
import { SITE } from "@/lib/site";

export const revalidate = 60;

const DEFAULT_TICKET_URL = "https://www.tickettailor.com/events/retrobrusselsasbl/2140456";

export default async function CoursPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("cours");
  const acf = await getRollerland();
  const ticketUrl = pick(acf, "cours_tickettailor_url") || DEFAULT_TICKET_URL;
  const cms = {
    title: (await translate(pick(acf, "cours_title"), locale)) || t("title"),
    intro: (await translate(pick(acf, "cours_intro"), locale)) || t("intro"),
    start2rideDesc: (await translate(pick(acf, "start2ride_desc"), locale)) || t("start2rideDesc"),
    ownSkatesText: (await translate(pick(acf, "cours_own_skates_text"), locale)) || t("ownSkatesText"),
    cancellationsText: (await translate(pick(acf, "cours_cancellations_text"), locale)) || t("cancellationsText"),
    start2rideDate: pick(acf, "start2ride_date") || "Samedi 30 mai",
    start2rideTime: pick(acf, "start2ride_time") || "10h00 – 12h00",
    start2ridePlace: pick(acf, "start2ride_place") || "Parc de Laeken",
    start2rideUrl: pick(acf, "start2ride_url") || "https://www.tickettailor.com/events/retrobrusselsasbl/2211764",
  };

  const COURSES_FALLBACK = [
    {
      tag: "01",
      audience: t("kids"),
      title: t("courseKids"),
      schedule: "Mercredi & Samedi",
      time: "16h00 – 17h00",
      price: "10€",
      level: "Tous niveaux",
      age: t("kids"),
      desc: "Initiation et progression en toute sécurité. Nos moniteurs guident chaque enfant à son rythme, des premières glissades aux virages en douceur.",
      ticketUrl,
    },
    {
      tag: "02",
      audience: t("adults"),
      title: t("courseAdults"),
      schedule: "Mercredi & Samedi",
      time: "17h30 – 19h00",
      price: "15€",
      level: "Débutant – Intermédiaire",
      age: "18+",
      desc: "Technique, équilibre et plaisir. Un cours collectif dans une ambiance bienveillante — peu importe votre niveau de départ.",
      ticketUrl,
    },
  ];

  // Course cards: WP `cours_list` repeater (auto-translated) → else fallback.
  const COURSES = acf.cours_list?.length
    ? await Promise.all(
        acf.cours_list.map(async (c, i) => ({
          tag: String(i + 1).padStart(2, "0"),
          audience: await translate(rowStr(c, "cours_audience"), locale),
          title: await translate(rowStr(c, "cours_titre"), locale),
          schedule: await translate(rowStr(c, "cours_jours"), locale),
          time: rowStr(c, "cours_horaire"),
          price: rowStr(c, "cours_prix"),
          level: await translate(rowStr(c, "cours_niveau"), locale),
          age: await translate(rowStr(c, "cours_age"), locale),
          desc: await translate(rowStr(c, "cours_description"), locale),
          ticketUrl: rowStr(c, "cours_ticket_url") || ticketUrl,
        })),
      )
    : COURSES_FALLBACK;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="label-tag mb-4">{t("kicker")}</p>
        <Editable
          as="h1"
          field="cours_title"
          value={cms.title}
          className="text-5xl md:text-7xl text-white mb-4"
          style={{ fontWeight: 300, letterSpacing: "-0.03em", lineHeight: "0.95" }}
        />
        <Editable as="p" field="cours_intro" value={cms.intro} multiline className="text-sm mt-6 max-w-lg" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }} />
      </div>

      {/* Course cards — edited as a list in the admin form */}
      <EditSectionLink section="lessons" label="courses" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 animate-fade-up delay-100">
        {COURSES.map((course) => (
          <div
            key={course.tag}
            className="p-8 flex flex-col hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.3)", background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="label-tag mb-2">{course.tag} · {course.audience}</p>
                <h2 className="text-2xl text-white" style={{ fontWeight: 400 }}>{course.title}</h2>
              </div>
              <span className="text-2xl font-light" style={{ color: "#9B92F0" }}>{course.price}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {[course.level, course.age, t("skatesIncluded")].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1"
                  style={{ border: "0.5px solid rgba(127,119,221,0.3)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-sm mb-6 flex-1" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.85" }}>
              {course.desc}
            </p>

            <div
              className="grid grid-cols-2 gap-4 p-4 mb-6"
              style={{ background: "rgba(127,119,221,0.06)", border: "0.5px solid rgba(127,119,221,0.2)" }}
            >
              <div>
                <p className="label-tag mb-1">{t("days")}</p>
                <p className="text-xs text-white">{course.schedule}</p>
              </div>
              <div>
                <p className="label-tag mb-1">{t("schedule")}</p>
                <p className="text-xs text-white">{course.time}</p>
              </div>
            </div>

            <a
              href={course.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center animate-pulse-glow"
            >
              {t("bookTicket")}
            </a>
          </div>
        ))}
      </div>

      {/* Start2Ride */}
      <div
        className="p-8 md:p-12 mb-16 relative overflow-hidden animate-fade-up delay-200"
        style={{ border: "0.5px solid rgba(127,119,221,0.4)", background: "rgba(127,119,221,0.05)" }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(127,119,221,0.15) 0%, transparent 70%)" }} />

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <p className="label-tag">{t("new")}</p>
              <span className="text-xs px-2 py-0.5 uppercase" style={{ background: "#9B92F0", color: "#150E28", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                {t("outdoor")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-white mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
              Start2Ride
            </h2>
            <Editable
              as="p"
              field="start2ride_desc"
              value={cms.start2rideDesc}
              multiline
              className="text-sm mb-6"
              style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.85" }}
            />

            <div
              className="grid grid-cols-3 gap-4 mb-8"
              style={{ borderTop: "0.5px solid rgba(127,119,221,0.15)", paddingTop: "1.5rem" }}
            >
              {[
                { label: t("date"), field: "start2ride_date", value: cms.start2rideDate },
                { label: t("schedule"), field: "start2ride_time", value: cms.start2rideTime },
                { label: t("place"), field: "start2ride_place", value: cms.start2ridePlace },
              ].map((item) => (
                <div key={item.field}>
                  <p className="label-tag mb-1">{item.label}</p>
                  <Editable as="p" field={item.field} value={item.value} className="text-sm text-white" />
                </div>
              ))}
            </div>

            <a
              href={cms.start2rideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t("bookStart2ride")}
            </a>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up delay-300">
        <div
          className="p-5"
          style={{ border: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(255,255,255,0.02)" }}
        >
          <p className="label-tag mb-2">{t("ownSkates")}</p>
          <Editable
            as="p"
            field="cours_own_skates_text"
            value={cms.ownSkatesText}
            multiline
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}
          />
        </div>

        {/* Course cancellations WhatsApp group (kept per spec) */}
        <div
          className="p-5"
          style={{ border: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(255,255,255,0.02)" }}
        >
          <p className="label-tag mb-2">{t("cancellations")}</p>
          <Editable
            as="p"
            field="cours_cancellations_text"
            value={cms.cancellationsText}
            multiline
            className="text-xs mb-4"
            style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}
          />
          {SITE.coursWhatsappGroupUrl ? (
            <a
              href={SITE.coursWhatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {t("joinWhatsapp")}
            </a>
          ) : (
            // TODO(client): set SITE.coursWhatsappGroupUrl to enable this button.
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              {t("whatsappSoon", { email: SITE.email })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
