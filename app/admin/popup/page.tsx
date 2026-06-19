import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updatePopup } from "../actions";

export const dynamic = "force-dynamic";

const FIELD_STYLE = {
  border: "0.5px solid rgba(127,119,221,0.4)",
  background: "transparent",
} as const;

export default async function AdminPopupPage() {
  const popup = await prisma.popupSettings.findUnique({ where: { id: 1 } });

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Section nav */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link href="/admin" className="btn-outline">
          Événements Disco
        </Link>
        <span className="btn-outline" style={{ borderColor: "#9B92F0", color: "#9B92F0" }}>
          Popup promo
        </span>
      </div>

      <p className="label-tag mb-2">Popup promotionnel</p>
      <h1 className="text-3xl text-white mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
        Configuration du popup
      </h1>
      <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
        Le popup ne s&apos;affiche qu&apos;une seule fois par visiteur. Toute modification le
        réaffiche une fois aux visiteurs qui l&apos;avaient déjà vu.
      </p>

      <form action={updatePopup} className="flex flex-col gap-5">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="enabled" defaultChecked={popup?.enabled ?? false} />
          <span className="text-sm text-white">Activer le popup</span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Titre</span>
          <input
            name="title"
            defaultValue={popup?.title ?? ""}
            placeholder="Soirée spéciale ce vendredi !"
            className="px-4 py-2.5 text-sm text-white outline-none"
            style={FIELD_STYLE}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Texte</span>
          <textarea
            name="body"
            defaultValue={popup?.body ?? ""}
            rows={3}
            placeholder="Rejoignez-nous pour une soirée disco exceptionnelle…"
            className="px-4 py-2.5 text-sm text-white outline-none"
            style={FIELD_STYLE}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Image (URL, optionnel)</span>
          <input
            name="imageUrl"
            defaultValue={popup?.imageUrl ?? ""}
            placeholder="https://…"
            className="px-4 py-2.5 text-sm text-white outline-none"
            style={FIELD_STYLE}
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2">
            <span className="label-tag">Bouton — libellé (optionnel)</span>
            <input
              name="ctaLabel"
              defaultValue={popup?.ctaLabel ?? ""}
              placeholder="Réserver"
              className="px-4 py-2.5 text-sm text-white outline-none"
              style={FIELD_STYLE}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label-tag">Bouton — lien (optionnel)</span>
            <input
              name="ctaUrl"
              defaultValue={popup?.ctaUrl ?? ""}
              placeholder="https://…"
              className="px-4 py-2.5 text-sm text-white outline-none"
              style={FIELD_STYLE}
            />
          </label>
        </div>

        <div className="mt-2">
          <button type="submit" className="btn-primary">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
