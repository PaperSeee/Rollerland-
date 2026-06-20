"use client";

import { useState } from "react";
import { updatePopup } from "../actions";
import ImageUpload from "../ImageUpload";

export interface PopupInitial {
  enabled: boolean;
  title: string;
  body: string;
  imageUrl: string;
  imagePosition: string;
  ctaLabel: string;
  ctaUrl: string;
}

const FIELD = { border: "0.5px solid rgba(127,119,221,0.4)", background: "transparent" } as const;

// 3×3 grid of object-position presets for the simple image crop/reposition.
const POSITIONS: { label: string; value: string }[] = [
  { label: "↖", value: "left top" },
  { label: "↑", value: "center top" },
  { label: "↗", value: "right top" },
  { label: "←", value: "left center" },
  { label: "●", value: "center" },
  { label: "→", value: "right center" },
  { label: "↙", value: "left bottom" },
  { label: "↓", value: "center bottom" },
  { label: "↘", value: "right bottom" },
];

export default function PopupEditor({ initial }: { initial: PopupInitial }) {
  const [v, setV] = useState<PopupInitial>(initial);
  const set = <K extends keyof PopupInitial>(k: K, val: PopupInitial[K]) =>
    setV((prev) => ({ ...prev, [k]: val }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* ── Form ── */}
      <form action={updatePopup} className="flex flex-col gap-5">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="enabled" checked={v.enabled} onChange={(e) => set("enabled", e.target.checked)} />
          <span className="text-sm text-white">Activer le popup</span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Titre</span>
          <input name="title" value={v.title} onChange={(e) => set("title", e.target.value)}
            placeholder="Soirée spéciale ce vendredi !" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD} />
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Texte</span>
          <textarea name="body" value={v.body} onChange={(e) => set("body", e.target.value)} rows={3}
            placeholder="Rejoignez-nous pour une soirée disco…" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD} />
        </label>

        <ImageUpload value={v.imageUrl} onChange={(url) => set("imageUrl", url)} />
        <input type="hidden" name="imageUrl" value={v.imageUrl} />

        {/* Image crop / reposition */}
        {v.imageUrl && (
          <div className="flex flex-col gap-2">
            <span className="label-tag">Cadrage de l&apos;image</span>
            <div className="flex gap-4 items-center">
              <div className="grid grid-cols-3 gap-1" style={{ width: 96 }}>
                {POSITIONS.map((p) => (
                  <button key={p.value} type="button" onClick={() => set("imagePosition", p.value)}
                    className="aspect-square text-xs flex items-center justify-center transition-colors"
                    style={{
                      border: "0.5px solid rgba(127,119,221,0.4)",
                      background: v.imagePosition === p.value ? "#9B92F0" : "transparent",
                      color: v.imagePosition === p.value ? "#150E28" : "rgba(255,255,255,0.6)",
                    }}>
                    {p.label}
                  </button>
                ))}
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                Choisissez quelle partie de la photo reste visible dans le cadre du popup.
              </p>
            </div>
          </div>
        )}
        <input type="hidden" name="imagePosition" value={v.imagePosition} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2">
            <span className="label-tag">Bouton — libellé</span>
            <input name="ctaLabel" value={v.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)}
              placeholder="Réserver" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label-tag">Bouton — lien</span>
            <input name="ctaUrl" value={v.ctaUrl} onChange={(e) => set("ctaUrl", e.target.value)}
              placeholder="https://…" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD} />
          </label>
        </div>

        <div className="mt-2">
          <button type="submit" className="btn-primary">Enregistrer</button>
        </div>
      </form>

      {/* ── Live preview ── */}
      <div className="lg:sticky lg:top-6 self-start">
        <p className="label-tag mb-3">Aperçu en direct</p>
        <div className="relative overflow-hidden" style={{ borderRadius: 8, border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(21,14,40,0.6)", padding: 24 }}>
          {/* Replica of the visitor popup card */}
          <div className="glass-card relative w-full mx-auto overflow-hidden" style={{ background: "#150E28", maxWidth: 380 }}>
            {v.imageUrl && (
              <div className="relative w-full" style={{ height: 160 }}>
                {/* plain img to tolerate any URL while typing */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.imageUrl} alt="" className="w-full h-full object-cover"
                  style={{ objectPosition: v.imagePosition || "center" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #150E28 0%, transparent 70%)" }} />
              </div>
            )}
            <div className="p-7">
              <p className="label-tag mb-3">Rollerland Brussels</p>
              <h2 className="text-2xl text-white mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
                {v.title || "Titre du popup"}
              </h2>
              {(v.body || !v.title) && (
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                  {v.body || "Le texte du popup s'affiche ici."}
                </p>
              )}
              {v.ctaLabel && v.ctaUrl && <span className="btn-primary">{v.ctaLabel}</span>}
            </div>
          </div>
          {!v.enabled && (
            <p className="text-xs text-center mt-4" style={{ color: "rgba(255,180,180,0.7)" }}>
              ⚠️ Le popup est désactivé — il ne s&apos;affichera pas sur le site.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
