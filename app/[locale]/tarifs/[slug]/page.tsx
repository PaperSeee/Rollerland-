import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FORMULES, getFormule } from "@/lib/formules";

// Static formule detail pages — generated at build time from the FORMULES map.
export function generateStaticParams() {
  return FORMULES.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const formule = getFormule(params.slug);
  if (!formule) return { title: "Formule introuvable — Rollerland Brussels" };
  return {
    title: `${formule.name} — Tarifs Rollerland Brussels`,
    description: formule.desc,
  };
}

export default function FormuleDetailPage({ params }: { params: { slug: string } }) {
  const formule = getFormule(params.slug);
  if (!formule) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Back link */}
      <Link
        href="/tarifs"
        className="text-xs uppercase tracking-wide hover:text-white transition-colors inline-block mb-10"
        style={{ color: "rgba(127,119,221,0.7)", letterSpacing: "0.1em" }}
      >
        ← Tous les tarifs
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
                <p className="label-tag mb-1">Enfant</p>
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
                <p className="label-tag mb-1">Adulte</p>
                <p className="text-2xl font-light" style={{ color: "#9B92F0" }}>
                  {formule.priceAdults}
                </p>
              </div>
            )}
          </div>

          {/* Includes */}
          <p className="label-tag mb-4">Ce qui est inclus</p>
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

          <a href={formule.ctaHref} target="_blank" rel="noopener noreferrer" className="btn-primary animate-pulse-glow">
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
        <p className="label-tag mb-3">À savoir</p>
        <p className="text-sm text-white mb-1" style={{ fontWeight: 400, lineHeight: "1.7" }}>
          Please consume locally and support Be Here.
        </p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.7" }}>
          Refrain from bringing your own food and drinks.
        </p>
      </div>
    </div>
  );
}
