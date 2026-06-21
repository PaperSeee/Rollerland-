"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useEdit } from "./EditProvider";

type Row = { src?: string };

// Home gallery, inline-editable: each photo can be replaced on the page in edit
// mode. The whole `gallery_images_rows` array is buffered + saved.
// (Add/remove photos stays in /admin/content → Global.)
export default function EditableGallery({ images }: { images: { src: string; label: string }[] }) {
  const { editing, getValue, setField } = useEdit();
  const stored: Row[] = images.map((g) => ({ src: g.src }));
  const rows = getValue<Row[]>("gallery_images_rows", stored);

  const replaceAt = (i: number, url: string) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, src: url } : r));
    setField("gallery_images_rows", next);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {rows.map((g, i) => (
        <div
          key={i}
          className="group relative overflow-hidden hover-lift"
          style={{
            aspectRatio: i === 0 ? "16/9" : "4/3",
            gridColumn: i === 0 ? "span 2" : "span 1",
            border: "0.5px solid rgba(127,119,221,0.2)",
          }}
        >
          <GalleryCell src={g.src ?? ""} editing={editing} onReplace={(u) => replaceAt(i, u)} />
        </div>
      ))}
    </div>
  );
}

function GalleryCell({ src, editing, onReplace }: { src: string; editing: boolean; onReplace: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) onReplace(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      {src ? (
        <Image src={src} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-xs uppercase" style={{ background: "rgba(127,119,221,0.12)", color: "#9B92F0" }}>
          No image
        </span>
      )}
      {editing && (
        <>
          <span className="absolute inset-0 z-[5] pointer-events-none" style={{ outline: "2px dashed rgba(155,146,240,0.9)", outlineOffset: -2 }} />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute top-2 left-2 z-10 text-xs uppercase"
            style={{ background: "#9B92F0", color: "#150E28", padding: "0.3rem 0.7rem", borderRadius: 2 }}
          >
            {uploading ? "Uploading…" : src ? "↑ Replace" : "↑ Add"}
          </button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
        </>
      )}
    </>
  );
}
