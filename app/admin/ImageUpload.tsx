"use client";

import { useRef, useState } from "react";

// Image picker: click or drag & drop a file → uploads to Vercel Blob → calls
// onChange with the resulting public URL. Used in the popup & event editors.
export default function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  async function upload(file: File) {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      // Parse defensively: a non-JSON response (e.g. an upload-size limit page)
      // would otherwise throw a cryptic "did not match the expected pattern".
      const raw = await res.text();
      let data: { url?: string; error?: string } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(
          res.status === 413
            ? "Image too large to upload."
            : `Upload error (${res.status}).`,
        );
      }
      if (!res.ok) throw new Error(data.error || "Upload failed");
      if (!data.url) throw new Error("Invalid server response.");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) upload(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="label-tag">Image</span>

      {value ? (
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="object-cover"
            style={{ width: 120, height: 80, border: "0.5px solid rgba(127,119,221,0.4)" }}
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs uppercase tracking-wide hover:text-white transition-colors"
              style={{ color: "#9B92F0", letterSpacing: "0.08em" }}
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs uppercase tracking-wide transition-colors"
              style={{ color: "rgba(255,128,128,0.7)", letterSpacing: "0.08em" }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            onFiles(e.dataTransfer.files);
          }}
          className="flex flex-col items-center justify-center gap-2 py-8 transition-colors"
          style={{
            border: `1px dashed ${dragOver ? "#9B92F0" : "rgba(127,119,221,0.4)"}`,
            background: dragOver ? "rgba(127,119,221,0.08)" : "transparent",
          }}
        >
          <span style={{ color: "#9B92F0", fontSize: "1.5rem" }}>↑</span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            {uploading ? "Uploading…" : "Click or drag an image here"}
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            JPG, PNG, WebP — max 8 MB
          </span>
        </button>
      )}

      {error && (
        <p className="text-xs" style={{ color: "#ff8080" }}>
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
    </div>
  );
}
