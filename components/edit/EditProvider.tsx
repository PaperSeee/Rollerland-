"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

// Inline editing context. When an admin opens any page with ?edit=1, editable
// texts/images become editable in place; changes are buffered here and saved in
// one call. Edits always target the English source (translation handles FR/NL).

type Changes = Record<string, unknown>;

interface EditCtx {
  editing: boolean;
  setField: (key: string, value: unknown) => void;
  getField: (key: string, fallback: string) => string;
  getValue: <T>(key: string, fallback: T) => T;
  dirty: boolean;
}

const Ctx = createContext<EditCtx>({
  editing: false,
  setField: () => {},
  getField: (_k, f) => f,
  getValue: (_k, f) => f,
  dirty: false,
});

export function useEdit() {
  return useContext(Ctx);
}

export default function EditProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false); // admin + ?edit=1
  const [changes, setChanges] = useState<Changes>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Inline editing only on the English source pages.
  const canEditLocale = locale === "en";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wantEdit = new URLSearchParams(window.location.search).get("edit") === "1";
    if (!wantEdit || !canEditLocale) return;
    // Confirm the visitor is an authenticated admin.
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setEnabled(Boolean(d.admin)))
      .catch(() => setEnabled(false));
  }, [canEditLocale]);

  const setField = useCallback((key: string, value: unknown) => {
    setChanges((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const getField = useCallback(
    (key: string, fallback: string) => {
      const v = changes[key];
      return typeof v === "string" ? v : fallback;
    },
    [changes],
  );

  // Generic getter for non-string values (arrays/objects) buffered in edit mode.
  const getValue = useCallback(
    <T,>(key: string, fallback: T): T => {
      return (key in changes ? (changes[key] as T) : fallback);
    },
    [changes],
  );

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      if (res.ok) {
        setSaved(true);
        setChanges({});
        // Refresh so the saved values come back from the server.
        setTimeout(() => window.location.reload(), 600);
      }
    } finally {
      setSaving(false);
    }
  }, [changes]);

  const dirty = Object.keys(changes).length > 0;

  return (
    <Ctx.Provider value={{ editing: enabled, setField, getField, getValue, dirty }}>
      {children}
      {enabled && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[200] flex items-center justify-between px-6 py-3"
          style={{ background: "#150E28", borderTop: "0.5px solid rgba(155,146,240,0.4)" }}
        >
          <span className="text-xs uppercase tracking-widest" style={{ color: "#9B92F0", letterSpacing: "0.14em" }}>
            ✎ Edit mode {dirty ? "· unsaved changes" : ""}
          </span>
          <div className="flex items-center gap-4">
            {saved && <span className="text-xs" style={{ color: "#9B92F0" }}>Saved ✓</span>}
            <a href={window?.location?.pathname ?? "/"} className="text-xs uppercase" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
              Exit
            </a>
            <button
              onClick={save}
              disabled={!dirty || saving}
              className="btn-primary text-xs"
              style={{ padding: "0.45rem 1.4rem", opacity: dirty && !saving ? 1 : 0.5 }}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
