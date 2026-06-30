"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { saveContentSection, type SaveState } from "../contentActions";
import ImageUpload from "../ImageUpload";
import HelpBox from "./HelpBox";

// ── Field definitions ──────────────────────────────────────────────────
export type Field =
  | { name: string; label: string; type: "text" | "textarea" | "image" }
  | {
      name: string;
      label: string;
      type: "repeater";
      itemLabel: string;
      fields: Array<{ name: string; label: string; type: "text" | "textarea" | "image" | "bool" | "lines"; lineKey?: string }>;
    };

type Values = Record<string, unknown>;

const FIELD = { border: "0.5px solid rgba(127,119,221,0.4)", background: "transparent" } as const;

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

// ── Scalar field input ─────────────────────────────────────────────────
function ScalarInput({
  field,
  value,
  onChange,
}: {
  field: { name: string; label: string; type: "text" | "textarea" | "image" | "bool" | "lines"; lineKey?: string };
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const str = typeof value === "string" ? value : "";
  if (field.type === "image") {
    return <ImageUpload value={str} onChange={(url) => onChange(url)} />;
  }
  if (field.type === "lines") {
    // Edited as one item per line; stored as [{ [lineKey]: text }].
    const key = field.lineKey ?? "item";
    const arr = Array.isArray(value) ? (value as Array<Record<string, unknown>>) : [];
    const text = arr.map((r) => (typeof r[key] === "string" ? r[key] : "")).join("\n");
    return (
      <label className="flex flex-col gap-2">
        <span className="label-tag">{field.label} <span style={{ color: "rgba(255,255,255,0.3)" }}>(one per line)</span></span>
        <textarea
          value={text}
          onChange={(e) =>
            onChange(
              e.target.value
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean)
                .map((l) => ({ [key]: l })),
            )
          }
          rows={4}
          className="px-4 py-2.5 text-sm text-white outline-none"
          style={FIELD}
        />
      </label>
    );
  }
  if (field.type === "bool") {
    return (
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        <span className="text-sm text-white">{field.label}</span>
      </label>
    );
  }
  if (field.type === "textarea") {
    return (
      <label className="flex flex-col gap-2">
        <span className="label-tag">{field.label}</span>
        <textarea
          value={str}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="px-4 py-2.5 text-sm text-white outline-none"
          style={FIELD}
        />
      </label>
    );
  }
  return (
    <label className="flex flex-col gap-2">
      <span className="label-tag">{field.label}</span>
      <input
        value={str}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2.5 text-sm text-white outline-none"
        style={FIELD}
      />
    </label>
  );
}

// ── Repeater ───────────────────────────────────────────────────────────
function Repeater({
  field,
  rows,
  onChange,
}: {
  field: Extract<Field, { type: "repeater" }>;
  rows: Array<Record<string, unknown>>;
  onChange: (rows: Array<Record<string, unknown>>) => void;
}) {
  const update = (i: number, key: string, val: unknown) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r));
    onChange(next);
  };
  const remove = (i: number) => onChange(rows.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => onChange([...rows, {}]);

  return (
    <div className="flex flex-col gap-3">
      <span className="label-tag">{field.label}</span>
      {rows.map((row, i) => (
        <div
          key={i}
          className="p-4 flex flex-col gap-3"
          style={{ border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {field.itemLabel} {i + 1}
            </span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => move(i, -1)} className="text-xs" style={{ color: "#9B92F0" }}>↑</button>
              <button type="button" onClick={() => move(i, 1)} className="text-xs" style={{ color: "#9B92F0" }}>↓</button>
              <button type="button" onClick={() => remove(i)} className="text-xs" style={{ color: "rgba(255,128,128,0.7)" }}>Remove</button>
            </div>
          </div>
          {field.fields.map((f) => (
            <ScalarInput key={f.name} field={f} value={row[f.name]} onChange={(v) => update(i, f.name, v)} />
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="btn-outline w-fit text-xs"
        style={{ padding: "0.4rem 1rem" }}
      >
        + Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

// ── Editor ─────────────────────────────────────────────────────────────
export default function ContentEditor({
  title,
  description,
  help,
  fields,
  initial,
  preview,
}: {
  title: string;
  description?: string;
  help?: string[];
  fields: Field[];
  initial: Values;
  preview?: (values: Values) => React.ReactNode;
}) {
  const [v, setV] = useState<Values>(initial);
  const set = (name: string, val: unknown) => setV((prev) => ({ ...prev, [name]: val }));
  const [state, formAction] = useFormState<SaveState, FormData>(saveContentSection, {
    ok: false,
    message: "",
  });

  return (
    <div>
      <p className="label-tag mb-2">Content</p>
      <h1 className="text-3xl text-white mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
        {title}
      </h1>
      {description && (
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
          {description}
        </p>
      )}

      {help && help.length > 0 && <HelpBox tips={help} />}

      <div className={`grid grid-cols-1 ${preview ? "lg:grid-cols-2" : ""} gap-10`}>
        {/* Form */}
        <form action={formAction} className="flex flex-col gap-5">
          {fields.map((f) =>
            f.type === "repeater" ? (
              <Repeater
                key={f.name}
                field={f}
                rows={(Array.isArray(v[f.name]) ? (v[f.name] as Array<Record<string, unknown>>) : [])}
                onChange={(rows) => set(f.name, rows)}
              />
            ) : (
              <ScalarInput key={f.name} field={f} value={v[f.name]} onChange={(val) => set(f.name, val)} />
            ),
          )}

          {/* Whole section state serialized for the server action */}
          <input type="hidden" name="payload" value={JSON.stringify(v)} />

          <div className="mt-2 flex items-center gap-4">
            <SaveButton />
            {state.message && (
              <span className="text-sm" style={{ color: state.ok ? "#9B92F0" : "#ff8080" }}>
                {state.message}
              </span>
            )}
          </div>
        </form>

        {/* Live preview */}
        {preview && (
          <div className="lg:sticky lg:top-6 self-start">
            <p className="label-tag mb-3">Live preview</p>
            <div
              className="p-6 relative overflow-hidden"
              style={{ borderRadius: 8, border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(21,14,40,0.6)" }}
            >
              {preview(v)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
