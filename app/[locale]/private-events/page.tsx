import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getRollerland, pick } from "@/lib/wordpress";
import { translate, translateMany } from "@/lib/translate";
import { DEFAULT_CONTENT } from "@/lib/defaults";
import Editable from "@/components/edit/Editable";
import EditSectionLink from "@/components/edit/EditSectionLink";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export default async function PrivateEventsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("privateEvents");
  const acf = await getRollerland();
  const reservationUrl = pick(acf, "reservation_url") || SITE.reservationUrl;
  const cms = {
    title: (await translate(pick(acf, "pe_title"), locale)) || t("title"),
    intro: (await translate(pick(acf, "pe_intro"), locale)) || t("intro"),
    privTitle: (await translate(pick(acf, "pe_privatization_title"), locale)) || t("privatizationTitle"),
    privText: (await translate(pick(acf, "pe_privatization_text"), locale)) || t("privatizationText"),
  };

  // Event cards: admin list, else the English defaults — all auto-translated.
  const eventRows = acf.services_liste?.length
    ? acf.services_liste
    : (DEFAULT_CONTENT.services_liste as Array<{ titre: string; horaire: string; description: string; image?: string }>);
  const evTr = await translateMany(eventRows.flatMap((e) => [e.titre ?? "", e.horaire ?? "", e.description ?? ""]), locale);
  const EVENTS = eventRows.map((e, i) => ({
    tag: String(i + 1).padStart(2, "0"),
    title: evTr[3 * i] || e.titre,
    schedule: evTr[3 * i + 1] || e.horaire,
    desc: evTr[3 * i + 2] || e.description,
    image: e.image || null,
    cta: { label: t("learnMore"), href: "/contact" },
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="label-tag mb-4">{t("kicker")}</p>
        <Editable
          as="h1"
          field="pe_title"
          value={cms.title}
          className="text-4xl md:text-6xl text-white mb-4"
          style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
        />
        <Editable as="p" field="pe_intro" value={cms.intro} multiline className="text-sm max-w-xl" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }} />
      </div>

      {/* Events list — edited as a list in the admin form */}
      <EditSectionLink section="private-events" label="events" />

      {/* Events list */}
      <div className="flex flex-col gap-0" style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
        {EVENTS.map((event, i) => (
          <div
            key={event.tag}
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{
              borderBottom:
                i < EVENTS.length - 1 ? "0.5px solid rgba(127,119,221,0.2)" : "none",
            }}
          >
            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <p className="label-tag mb-4">{event.tag}</p>
                <h2
                  className="text-2xl md:text-3xl text-white mb-2"
                  style={{ fontWeight: 400 }}
                >
                  {event.title}
                </h2>
                <p
                  className="text-xs mb-5"
                  style={{ color: "#9B92F0", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {event.schedule}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.85" }}
                >
                  {event.desc}
                </p>
              </div>
              <div className="mt-8">
                <a
                  href={event.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  {event.cta.label}
                </a>
              </div>
            </div>

            {/* Image */}
            <div
              className="relative min-h-[220px] lg:min-h-0"
              style={{
                borderLeft: "0.5px solid rgba(127,119,221,0.2)",
                background: "rgba(127,119,221,0.03)",
              }}
            >
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  style={{ opacity: 0.8 }}
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(127,119,221,0.04)" }}
                >
                  <span
                    className="text-6xl font-light"
                    style={{ color: "rgba(127,119,221,0.15)", letterSpacing: "-0.03em" }}
                  >
                    {event.tag}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="mt-16 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8"
        style={{
          background: "rgba(127,119,221,0.05)",
          border: "0.5px solid rgba(127,119,221,0.3)",
        }}
      >
        <div>
          <p className="label-tag mb-2">{t("privatization")}</p>
          <Editable
            as="h3"
            field="pe_privatization_title"
            value={cms.privTitle}
            className="text-xl text-white"
            style={{ fontWeight: 400 }}
          />
          <Editable
            as="p"
            field="pe_privatization_text"
            value={cms.privText}
            multiline
            className="text-sm mt-2"
            style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}
          />
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <a
            href={reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {t("requestQuote")}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="btn-outline"
          >
            {t("write")}
          </a>
        </div>
      </div>
    </div>
  );
}
