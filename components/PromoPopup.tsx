"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PopupView } from "@/lib/popup";

// Shows the promo popup once per visitor. The localStorage flag is keyed on the
// popup version (updatedAt), so editing the popup re-shows it once.
export default function PromoPopup({ data }: { data: PopupView }) {
  const [open, setOpen] = useState(false);
  const storageKey = `rl_popup_seen_${data.version}`;

  useEffect(() => {
    try {
      if (!localStorage.getItem(storageKey)) {
        // Small delay so it doesn't fight the initial paint.
        const t = setTimeout(() => setOpen(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage unavailable (private mode/SSR) — show once this session.
      setOpen(true);
    }
  }, [storageKey]);

  function dismiss() {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
      onClick={dismiss}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: "rgba(21,14,40,0.85)", backdropFilter: "blur(6px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card relative w-full max-w-md overflow-hidden animate-fade-up"
        style={{ background: "#150E28" }}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-white hover:text-purple-300 transition-colors"
          style={{ fontSize: "1.25rem", lineHeight: 1 }}
        >
          ×
        </button>

        {data.imageUrl && (
          <div className="relative w-full" style={{ height: 180 }}>
            <Image
              src={data.imageUrl}
              alt={data.title}
              fill
              className="object-cover"
              style={{ objectPosition: data.imagePosition || "center" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, #150E28 0%, transparent 70%)" }}
            />
          </div>
        )}

        <div className="p-8">
          <p className="label-tag mb-3">Rollerland Brussels</p>
          <h2 className="text-2xl text-white mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
            {data.title}
          </h2>
          {data.body && (
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.8" }}>
              {data.body}
            </p>
          )}
          {data.ctaLabel && data.ctaUrl && (
            <a
              href={data.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="btn-primary"
            >
              {data.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
