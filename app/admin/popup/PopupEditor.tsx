"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updatePopup, type SaveState } from "../actions";
import ImageUpload from "../ImageUpload";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

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

  const [state, formAction] = useFormState<SaveState, FormData>(updatePopup, {
    ok: false,
    message: "",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* ── Form ── */}
      <form action={formAction} className="flex flex-col gap-5">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="enabled" checked={v.enabled} onChange={(e) => set("enabled", e.target.checked)} />
          <span className="text-sm text-white">Enable popup</span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Title</span>
          <input name="title" value={v.title} onChange={(e) => set("title", e.target.value)}
            placeholder="Special night this Friday!" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD} />
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Text</span>
          <textarea name="body" value={v.body} onChange={(e) => set("body", e.target.value)} rows={3}
            placeholder="Join us for an unforgettable disco night…" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD} />
        </label>

        <ImageUpload value={v.imageUrl} onChange={(url) => set("imageUrl", url)} />
        <input type="hidden" name="imageUrl" value={v.imageUrl} />

        {/* Image crop / reposition */}
        {v.imageUrl && (
          <div className="flex flex-col gap-2">
            <span className="label-tag">Image framing</span>
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
                Choose which part of the photo stays visible in the popup frame.
              </p>
            </div>
          </div>
        )}
        <input type="hidden" name="imagePosition" value={v.imagePosition} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2">
            <span className="label-tag">Button — label</span>
            <input name="ctaLabel" value={v.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)}
              placeholder="Book now" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label-tag">Button — link</span>
            <input name="ctaUrl" value={v.ctaUrl} onChange={(e) => set("ctaUrl", e.target.value)}
              placeholder="https://…" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD} />
          </label>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <SaveButton />
          {state.message && (
            <span className="text-sm" style={{ color: state.ok ? "#9B92F0" : "#ff8080" }}>
              {state.message}
            </span>
          )}
        </div>
      </form>

      {/* ── Live preview ── */}
      <div className="lg:sticky lg:top-6 self-start">
        <p className="label-tag mb-3">Live preview</p>
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
                {v.title || "Popup title"}
              </h2>
              {(v.body || !v.title) && (
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                  {v.body || "The popup text appears here."}
                </p>
              )}
              {v.ctaLabel && v.ctaUrl && <span className="btn-primary">{v.ctaLabel}</span>}
            </div>
          </div>
          {!v.enabled && (
            <p className="text-xs text-center mt-4" style={{ color: "rgba(255,180,180,0.7)" }}>
              ⚠️ The popup is disabled — it will not appear on the site.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
