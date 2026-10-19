"use client";

import { useEffect, useState } from "react";
import { useMessages } from "next-intl";

export default function Ticker() {
  const [mounted, setMounted] = useState(false);
  // Items per language from messages/<locale>.json → ticker.items.
  const messages = useMessages() as { ticker?: { items?: string[] } };
  const TICKER_ITEMS = messages.ticker?.items ?? [];
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className="overflow-hidden py-3"
      style={{
        borderBottom: "0.5px solid rgba(127,119,221,0.15)",
        background: "rgba(127,119,221,0.04)",
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(127,119,221,0.7)", letterSpacing: "0.14em" }}
            >
              {item}
            </span>
            <span style={{ color: "rgba(127,119,221,0.3)", fontSize: "0.4rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
