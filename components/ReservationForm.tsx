"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

// Embedded Google Form. After a submission the form shows a confirmation and
// can't be reused; the cross-origin iframe doesn't expose that state to us.
// Remounting the iframe via a changing React `key` reliably reloads a fresh,
// empty form so visitors can make another reservation.
export default function ReservationForm() {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ border: "0.5px solid rgba(127,119,221,0.3)", background: "rgba(255,255,255,0.02)" }}
      >
        <iframe
          key={reloadKey}
          src={SITE.reservationEmbedUrl}
          width="100%"
          height="720"
          style={{ border: 0, display: "block" }}
          title="Formulaire de réservation Rollerland Brussels"
        >
          Chargement…
        </iframe>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3 mt-3">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Réponse sous 24h · Vous pouvez aussi nous écrire à {SITE.email}
        </p>
        <button
          onClick={() => setReloadKey((k) => k + 1)}
          className="text-xs uppercase tracking-wide hover:text-white transition-colors"
          style={{ color: "#9B92F0", letterSpacing: "0.1em" }}
        >
          ↻ Faire une nouvelle réservation
        </button>
      </div>
    </div>
  );
}
