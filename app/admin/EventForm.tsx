"use client";

import { useState } from "react";
import Link from "next/link";

export interface EventFormValues {
  date?: string; // YYYY-MM-DD
  day?: string;
  theme?: string;
  description?: string;
  dj?: string;
  time?: string;
  image?: string;
  imagePosition?: string;
  special?: boolean;
}

const FIELD_STYLE = { border: "0.5px solid rgba(127,119,221,0.4)", background: "transparent" } as const;

const POSITIONS = [
  { label: "↖", value: "left top" }, { label: "↑", value: "center top" }, { label: "↗", value: "right top" },
  { label: "←", value: "left center" }, { label: "●", value: "center" }, { label: "→", value: "right center" },
  { label: "↙", value: "left bottom" }, { label: "↓", value: "center bottom" }, { label: "↘", value: "right bottom" },
];

function formatDate(d: string) {
  if (!d) return "Date";
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });
}

export default function EventForm({
  action,
  values = {},
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  values?: EventFormValues;
  submitLabel: string;
}) {
  const [v, setV] = useState<EventFormValues>({ imagePosition: "center", ...values });
  const set = <K extends keyof EventFormValues>(k: K, val: EventFormValues[K]) =>
    setV((prev) => ({ ...prev, [k]: val }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* ── Form ── */}
      <form action={action} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2">
            <span className="label-tag">Date <span style={{ color: "#9B92F0" }}>*</span></span>
            <input type="date" name="date" value={v.date ?? ""} onChange={(e) => set("date", e.target.value)} required className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD_STYLE} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label-tag">Jour <span style={{ color: "#9B92F0" }}>*</span></span>
            <input name="day" value={v.day ?? ""} onChange={(e) => set("day", e.target.value)} required placeholder="Samedi" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD_STYLE} />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Thème <span style={{ color: "#9B92F0" }}>*</span></span>
          <input name="theme" value={v.theme ?? ""} onChange={(e) => set("theme", e.target.value)} required placeholder="Summer Opening" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD_STYLE} />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2">
            <span className="label-tag">Horaire <span style={{ color: "#9B92F0" }}>*</span></span>
            <input name="time" value={v.time ?? ""} onChange={(e) => set("time", e.target.value)} required placeholder="17h00 – 00h00" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD_STYLE} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label-tag">DJ</span>
            <input name="dj" value={v.dj ?? ""} onChange={(e) => set("dj", e.target.value)} placeholder="DJ Summer" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD_STYLE} />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Description</span>
          <textarea name="description" value={v.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={3} className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD_STYLE} />
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-tag">Image (URL)</span>
          <input name="image" value={v.image ?? ""} onChange={(e) => set("image", e.target.value)} placeholder="https://…" className="px-4 py-2.5 text-sm text-white outline-none" style={FIELD_STYLE} />
        </label>

        {v.image && (
          <div className="flex flex-col gap-2">
            <span className="label-tag">Cadrage de l&apos;image</span>
            <div className="grid grid-cols-3 gap-1" style={{ width: 96 }}>
              {POSITIONS.map((p) => (
                <button key={p.value} type="button" onClick={() => set("imagePosition", p.value)}
                  className="aspect-square text-xs flex items-center justify-center"
                  style={{
                    border: "0.5px solid rgba(127,119,221,0.4)",
                    background: v.imagePosition === p.value ? "#9B92F0" : "transparent",
                    color: v.imagePosition === p.value ? "#150E28" : "rgba(255,255,255,0.6)",
                  }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <input type="hidden" name="imagePosition" value={v.imagePosition ?? "center"} />

        <label className="flex items-center gap-3">
          <input type="checkbox" name="special" checked={Boolean(v.special)} onChange={(e) => set("special", e.target.checked)} />
          <span className="text-sm text-white">Événement spécial</span>
        </label>

        <div className="flex items-center gap-4 mt-2">
          <button type="submit" className="btn-primary">{submitLabel}</button>
          <Link href="/admin" className="text-xs uppercase tracking-wide hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
            Annuler
          </Link>
        </div>
      </form>

      {/* ── Live preview (carte agenda comme sur /disco-roller) ── */}
      <div className="lg:sticky lg:top-6 self-start">
        <p className="label-tag mb-3">Aperçu en direct</p>
        <div
          className="p-6 relative overflow-hidden"
          style={{ border: "0.5px solid rgba(127,119,221,0.4)", background: "rgba(127,119,221,0.07)" }}
        >
          {v.image && (
            <div className="relative w-full mb-4" style={{ height: 140 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.image} alt="" className="w-full h-full object-cover" style={{ objectPosition: v.imagePosition || "center" }} />
            </div>
          )}
          <div className="flex items-center gap-3 mb-3">
            <span className="label-tag">{v.day || "Jour"} · {formatDate(v.date ?? "")}</span>
            {v.special && (
              <span className="text-xs px-2 py-0.5 uppercase" style={{ background: "#9B92F0", color: "#150E28", fontSize: "0.55rem", letterSpacing: "0.1em" }}>
                Spécial
              </span>
            )}
          </div>
          <h3 className="text-2xl text-white mb-2" style={{ fontWeight: 400 }}>{v.theme || "Thème de l'événement"}</h3>
          {v.description && (
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{v.description}</p>
          )}
          <div className="flex flex-wrap gap-3 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <span>{v.time || "Horaire"}</span>
            {v.dj && <><span>·</span><span>{v.dj}</span></>}
          </div>
        </div>
      </div>
    </div>
  );
}
