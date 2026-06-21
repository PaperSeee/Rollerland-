"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useEdit } from "./EditProvider";

// Inline-editable image. Normal mode: a next/image. Edit mode: hover shows a
// "Replace" button that uploads to Vercel Blob and buffers the new URL.
export default function EditableImage({
  field,
  value,
  alt,
  fill,
  width,
  height,
  className,
  style,
}: {
  field: string;
  value: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { editing, setField, getField } = useEdit();
  const current = getField(field, value);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) setField(field, data.url);
    } finally {
      setUploading(false);
    }
  }

  const img = fill ? (
    <Image src={current} alt={alt} fill className={className} style={style} />
  ) : (
    <Image src={current} alt={alt} width={width ?? 200} height={height ?? 120} className={className} style={style} />
  );

  if (!editing) return img;

  return (
    <span style={{ position: fill ? "absolute" : "relative", inset: fill ? 0 : undefined, display: "block" }}>
      {img}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute top-2 left-2 z-10 text-xs uppercase"
        style={{ background: "#9B92F0", color: "#150E28", padding: "0.3rem 0.7rem", letterSpacing: "0.08em", borderRadius: 2 }}
      >
        {uploading ? "Uploading…" : "↑ Replace"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        }}
      />
    </span>
  );
}
