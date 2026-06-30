"use client";

import { useState } from "react";

// Collapsible "How to edit this" help panel shown at the top of each content
// section. Pure presentational; takes a title and a list of tip lines.
export default function HelpBox({
  title = "How to edit this section",
  tips,
  defaultOpen = false,
}: {
  title?: string;
  tips: string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="mb-8"
      style={{ border: "0.5px solid rgba(155,146,240,0.4)", background: "rgba(127,119,221,0.06)", borderRadius: 4 }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: "#9B92F0", letterSpacing: "0.12em" }}>
          ⓘ {title}
        </span>
        <span className="text-xs" style={{ color: "#9B92F0" }}>{open ? "Hide ▲" : "Show ▼"}</span>
      </button>
      {open && (
        <ul className="px-5 pb-4 pt-1 flex flex-col gap-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-2.5 items-start">
              <span style={{ color: "#9B92F0", fontSize: "0.6rem", marginTop: "0.35rem" }}>◆</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
                {tip}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
