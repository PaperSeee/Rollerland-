"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useEdit } from "./EditProvider";
import { uploadImage } from "@/lib/prepareImage";

// Upload an image (shrunk first if large) and buffer its URL under `field`.
// Shows the error instead of failing silently (storage not configured, session
// expired, …).
function useImageUpload(field: string) {
  const { setField } = useEdit();
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      setField(field, await uploadImage(file));
    } catch (e) {
      window.alert(`Image upload failed: ${e instanceof Error ? e.message : "please try again."}`);
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading };
}

// The "↑ Replace" button on its own. Use it (with <EditableImage controls={false}>)
// for BACKGROUND images that sit under text/overlays: place this button in the
// top (text) layer so it can actually be clicked.
export function ImageReplaceButton({
  field,
  label = "Replace image",
  className,
  style,
}: {
  field: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { editing } = useEdit();
  const { upload, uploading } = useImageUpload(field);
  const inputRef = useRef<HTMLInputElement>(null);
  if (!editing) return null;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          // Don't trigger a parent <Link> when the button sits inside one.
          e.preventDefault();
          e.stopPropagation();
          inputRef.current?.click();
        }}
        className={`relative z-20 text-xs uppercase ${className ?? ""}`}
        style={{ background: "#9B92F0", color: "#150E28", padding: "0.4rem 0.8rem", letterSpacing: "0.08em", borderRadius: 2, ...style }}
      >
        {uploading ? "Uploading…" : `↑ ${label}`}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />
    </>
  );
}

// Inline-editable image. Normal mode: a next/image. Edit mode: dashed outline +
// a "Replace" button that uploads to Vercel Blob and buffers the new URL.
// controls={false}: no button here (render an <ImageReplaceButton> elsewhere).
export default function EditableImage({
  field,
  value,
  alt,
  fill,
  width,
  height,
  className,
  style,
  controls = true,
}: {
  field: string;
  value: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  controls?: boolean;
}) {
  const { editing, getField } = useEdit();
  const current = getField(field, value);
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading } = useImageUpload(field);

  const hasImage = Boolean(current);
  const img = !hasImage ? null : fill ? (
    <Image src={current} alt={alt} fill className={className} style={style} />
  ) : (
    <Image src={current} alt={alt} width={width ?? 200} height={height ?? 120} className={className} style={style} />
  );

  // Not editing: render the image as-is (or nothing if empty).
  if (!editing) return img;

  return (
    <span
      style={
        fill
          ? { position: "absolute", inset: 0, display: "block" }
          : { position: "relative", display: "inline-block" }
      }
    >
      {img}
      {/* Empty-state placeholder so an unset image is still visible & clickable */}
      {!hasImage && (
        <span
          className="flex items-center justify-center text-xs uppercase"
          style={{
            ...(fill ? { position: "absolute", inset: 0 } : { width: width ?? 200, height: height ?? 120 }),
            background: "rgba(127,119,221,0.12)",
            color: "#9B92F0",
            letterSpacing: "0.08em",
          }}
        >
          No image
        </span>
      )}
      {/* Highlight the editable image so the admin sees what they're changing */}
      <span
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ outline: "2px dashed rgba(155,146,240,0.9)", outlineOffset: -2 }}
      />
      {controls && (
        <>
          <button
            type="button"
            onClick={(e) => {
              // Don't trigger a parent <Link> when the image sits inside one.
              e.preventDefault();
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="absolute top-2 left-2 z-10 text-xs uppercase"
            style={{ background: "#9B92F0", color: "#150E28", padding: "0.3rem 0.7rem", letterSpacing: "0.08em", borderRadius: 2 }}
          >
            {uploading ? "Uploading…" : hasImage ? "↑ Replace" : "↑ Add image"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </>
      )}
    </span>
  );
}
