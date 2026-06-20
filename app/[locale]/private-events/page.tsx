import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getRollerland, pick } from "@/lib/wordpress";
import { SITE } from "@/lib/site";

export const revalidate = 60;

const EVENTS_FALLBACK = [
  {
    tag: "01",
    title: "Disco Roller",
    schedule: "Vendredi 17h–24h · Samedi 12h–24h",
    desc: "La soirée roller incontournable de Bruxelles. Musique, lumières colorées et ambiance festive sur la piste. Patins en location sur place. Pas de réservation nécessaire en accès individuel.",
    image: "https://retro.brussels/wp-content/uploads/2025/01/roller-party2-scaled.jpg",
    cta: { label: "Réserver", href: SITE.reservationUrl },
  },
  {
    tag: "02",
    title: "Anniversaires",
    schedule: "Sur réservation · Tous jours possibles",
    desc: "Célébrez votre anniversaire sur la piste ! Formules Birthday Party (14€/18€ par personne) et Birthday Party Plus (20€/24€). Animation, musique et gâteau optionnel. Cours d'animation privé disponible en option (75€/h).",
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.51.jpeg",
    cta: { label: "Réserver un anniversaire", href: SITE.reservationUrl },
  },
  {
    tag: "03",
    title: "Team Building",
    schedule: "Sur réservation · En semaine & weekend",
    desc: "Une activité team building originale pour renforcer la cohésion de votre équipe. Forfait à 16€ (enfants) / 23€ (adultes) par personne, patins et animation inclus. Karaoké disponible en option (50€/h).",
    image: "https://retro.brussels/wp-content/uploads/2024/10/IMG_20231112_111005-scaled.jpg",
    cta: { label: "Demander un devis", href: SITE.reservationUrl },
  },
  {
    tag: "04",
    title: "After Work",
    schedule: "Sur réservation · Vendredi soir",
    desc: "Décompressez après le travail avec vos collègues. Formule After Work à 30€ par personne, boissons incluses. La piste est privatisable pour les grands groupes.",
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.25.jpeg",
    cta: { label: "Organiser un After Work", href: SITE.reservationUrl },
  },
  {
    tag: "05",
    title: "Karaoké",
    schedule: "Sur réservation · Option groupe",
    desc: "Ajoutez une session karaoké à votre événement. Disponible en option pour tous les forfaits groupe à 50€/heure. Salle privative avec système audio professionnel.",
    image: null,
    cta: { label: "Réserver avec karaoké", href: SITE.reservationUrl },
  },
  {
    tag: "06",
    title: "Groupes Scolaires",
    schedule: "Sur réservation · Lundi–Vendredi",
    desc: "Formule School Deal à 5€ par élève (7€ pour +16 ans). Encadrement pédagogique disponible. Idéal pour les sorties scolaires, centres PMS et associations de jeunesse.",
    image: "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.20.jpeg",
    cta: { label: "Réserver pour une école", href: SITE.reservationUrl },
  },
];

export default async function PrivateEventsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("privateEvents");
  const acf = await getRollerland();
  const cms = {
    intro: pick(acf, "pe_intro", locale) || t("intro"),
    privTitle: pick(acf, "pe_privatization_title", locale) || t("privatizationTitle"),
    privText: pick(acf, "pe_privatization_text", locale) || t("privatizationText"),
  };

  const EVENTS = acf.services_liste?.length
    ? acf.services_liste.map((s, i) => ({
        tag: String(i + 1).padStart(2, "0"),
        title: s.titre,
        schedule: s.horaire,
        desc: s.description,
        image: s.image || null,
        cta: { label: "En savoir plus", href: "/contact" },
      }))
    : EVENTS_FALLBACK;

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
        <p className="text-sm max-w-xl" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}>
          {cms.intro}
        </p>
      </div>

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
          <h3
            className="text-xl text-white"
            style={{ fontWeight: 400 }}
          >
            {cms.privTitle}
          </h3>
          <p
            className="text-sm mt-2"
            style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}
          >
            {cms.privText}
          </p>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <a
            href={SITE.reservationUrl}
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
