"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useEdit } from "./EditProvider";

type Partner = { name: string; url: string; logo: string | null };
type PartnerRow = { partner_name?: string; partner_url?: string; partner_logo?: string };

// Partners grid that is fully inline-editable: in edit mode each cell lets you
// upload/replace the logo and edit the name in place. The whole `partners`
// array is buffered in the edit context and saved with everything else.
// (Add/remove rows stays in /admin/content.)
export default function EditablePartners({ partners }: { partners: Partner[] }) {
  const { editing, getValue, setField } = useEdit();

  // Source of truth in edit mode: the buffered partners array (as stored).
  const stored: PartnerRow[] = partners.map((p) => ({
    partner_name: p.name,
    partner_url: p.url,
    partner_logo: p.logo ?? "",
  }));
  const rows = getValue<PartnerRow[]>("partners", stored);

  const updateRow = (i: number, key: keyof PartnerRow, val: string) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r));
    setField("partners", next);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: "rgba(127,119,221,0.15)", border: "0.5px solid rgba(127,119,221,0.2)" }}>
      {rows.map((p, i) => {
        const name = p.partner_name ?? "";
        const logo = p.partner_logo ?? "";
        const url = p.partner_url || "#";
        const inner = (
          <PartnerCell
            name={name}
            logo={logo}
            editing={editing}
            onLogo={(u) => updateRow(i, "partner_logo", u)}
            onName={(n) => updateRow(i, "partner_name", n)}
          />
        );
        return editing ? (
          <div key={i} className="flex items-center justify-center px-6 py-12" style={{ background: "rgba(21,14,40,0.6)" }}>
            {inner}
          </div>
        ) : (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center px-6 py-12 hover-lift transition-all"
            style={{ background: "rgba(21,14,40,0.6)" }}
          >
            {inner}
          </a>
        );
      })}
    </div>
  );
}

function PartnerCell({
  name,
  logo,
  editing,
  onLogo,
  onName,
}: {
  name: string;
  logo: string;
  editing: boolean;
  onLogo: (url: string) => void;
  onName: (name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) onLogo(data.url);
    } finally {
      setUploading(false);
    }
  }

  if (!editing) {
    // Logos sit on a white rounded "pill" so brand colours stay legible on the
    // dark purple background and every cell looks uniform.
    return logo ? (
      <div
        className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ background: "#fff", borderRadius: 12, padding: "1rem 1.4rem", width: 180, height: 96 }}
      >
        <Image src={logo} alt={name} width={160} height={64} className="object-contain" style={{ maxHeight: 64, maxWidth: "100%", width: "auto" }} />
      </div>
    ) : (
      <span className="text-xl md:text-2xl font-light text-center" style={{ color: "rgba(255,255,255,0.55)" }}>
        {name}
      </span>
    );
  }

  // Edit mode: logo (or placeholder) + Replace button + editable name.
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div
        className="relative flex items-center justify-center"
        style={{ background: logo ? "#fff" : "transparent", borderRadius: 12, padding: logo ? "1rem 1.4rem" : 0, width: 180, height: 96, outline: "2px dashed rgba(155,146,240,0.9)", outlineOffset: 4 }}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={name} style={{ maxHeight: 64, maxWidth: "100%", width: "auto" }} />
        ) : (
          <span className="text-xs uppercase" style={{ color: "#9B92F0" }}>No logo</span>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute -top-2 -right-2 text-xs uppercase"
          style={{ background: "#9B92F0", color: "#150E28", padding: "0.2rem 0.5rem", borderRadius: 2 }}
        >
          {uploading ? "…" : logo ? "↑" : "+ Logo"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
      </div>
      <input
        value={name}
        onChange={(e) => onName(e.target.value)}
        className="text-sm text-center text-white bg-transparent outline-none w-full"
        style={{ border: "0.5px solid rgba(127,119,221,0.4)", padding: "0.2rem" }}
      />
    </div>
  );
}
