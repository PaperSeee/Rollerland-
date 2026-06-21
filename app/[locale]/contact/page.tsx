import { getTranslations, setRequestLocale } from "next-intl/server";
import { getRollerland, pick } from "@/lib/wordpress";
import { translate } from "@/lib/translate";
import { SITE } from "@/lib/site";
import ReservationForm from "@/components/ReservationForm";

export const revalidate = 60;

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const acf = await getRollerland();
  const cms = {
    intro: (await translate(pick(acf, "contact_intro"), locale)) || t("intro"),
    emailDesc: (await translate(pick(acf, "contact_email_desc"), locale)) || t("emailDesc"),
    socialsDesc: (await translate(pick(acf, "contact_socials_desc"), locale)) || t("socialsDesc"),
    reviewDesc: (await translate(pick(acf, "contact_review_desc"), locale)) || t("reviewDesc"),
    email: acf.site_email || SITE.email,
    instagram: acf.social_instagram || SITE.socials.instagram,
    facebook: acf.social_facebook || SITE.socials.facebook,
    tiktok: acf.social_tiktok || SITE.socials.tiktok,
    reviewUrl: acf.google_review_url || SITE.googleReviewUrl,
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="label-tag mb-4">{t("kicker")}</p>
        <h1 className="text-5xl md:text-7xl text-white mb-4" style={{ fontWeight: 300, letterSpacing: "-0.03em", lineHeight: "0.95" }}>
          {t("title")}
        </h1>
        <p className="text-sm mt-6 max-w-lg" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
          {cms.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="flex flex-col gap-4 animate-fade-up delay-100">
          {/* Email */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.3)", background: "rgba(255,255,255,0.03)" }}
          >
            <p className="label-tag mb-3">{t("email")}</p>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
              {cms.emailDesc}
            </p>
            <a
              href={`mailto:${cms.email}`}
              className="btn-primary w-full justify-center animate-pulse-glow"
            >
              {cms.email}
            </a>
          </div>

          {/* Address */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="label-tag mb-3">{t("address")}</p>
            <p className="text-sm text-white mb-3" style={{ lineHeight: "1.9", fontWeight: 300 }}>
              {SITE.address.line1}<br />
              {SITE.address.line2}
            </p>
            <a
              href={SITE.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ color: "#9B92F0" }}
            >
              {t("seeMap")}
            </a>
          </div>

          {/* Social networks */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="label-tag mb-3">{t("socials")}</p>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
              {cms.socialsDesc}
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Instagram", url: cms.instagram },
                { name: "Facebook", url: cms.facebook },
                { name: "TikTok", url: cms.tiktok },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wide hover:text-white transition-colors flex items-center justify-between"
                  style={{ color: "#9B92F0", letterSpacing: "0.08em" }}
                >
                  <span>{s.name}</span>
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Google review */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(127,119,221,0.05)" }}
          >
            <p className="label-tag mb-3">{t("review")}</p>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
              {cms.reviewDesc}
            </p>
            <a
              href={cms.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center"
            >
              {t("reviewCta")}
            </a>
          </div>

          {/* Hours */}
          <div
            className="p-6 hover-lift"
            style={{ border: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="label-tag mb-3">{t("hours")}</p>
            <div className="flex flex-col gap-2">
              {[
                { day: "Mercredi", h: "12h–20h" },
                { day: "Vendredi", h: "17h–00h", hot: true },
                { day: "Samedi", h: "12h–00h", hot: true },
                { day: "Dimanche", h: "16h–20h" },
              ].map((s) => (
                <div key={s.day} className="flex justify-between items-center">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.day}</p>
                  <p className="text-xs font-medium" style={{ color: s.hot ? "#9B92F0" : "rgba(255,255,255,0.6)" }}>{s.h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="p-6" style={{ border: "0.5px solid rgba(127,119,221,0.15)" }}>
            <p className="label-tag mb-3">{t("partners")}</p>
            <div className="flex flex-col gap-2">
              {[
                { name: "VGC", url: "https://www.vgc.be/" },
                { name: "Rollerland Aalst", url: "https://www.rollerland.be/" },
                { name: "Skate Vlaanderen", url: "https://www.skate.vlaanderen/" },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wide hover:text-white transition-colors"
                  style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}
                >
                  {p.name} →
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Google Form */}
        <div className="lg:col-span-2 animate-fade-up delay-200">
          <p className="label-tag mb-5">{t("formTitle")}</p>
          <ReservationForm />
        </div>
      </div>
    </div>
  );
}
