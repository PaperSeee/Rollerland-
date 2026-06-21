"use client";

import { useEffect, useState } from "react";

// Floating "Edit" button shown only to logged-in admins (and only when not
// already in edit mode). Clicking it reloads the current page with ?edit=1, so
// the client never has to type the query param by hand.
export default function EditLauncher({ locale }: { locale: string }) {
  const [admin, setAdmin] = useState(false);
  const [alreadyEditing, setAlreadyEditing] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Inline editing only on the English source pages.
    if (locale !== "en") return;
    const editing = new URLSearchParams(window.location.search).get("edit") === "1";
    setAlreadyEditing(editing);
    if (editing) return; // the edit bar already handles this case
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setAdmin(Boolean(d.admin)))
      .catch(() => setAdmin(false));
  }, [locale]);

  if (!admin || alreadyEditing) return null;

  function openEdit() {
    const url = new URL(window.location.href);
    url.searchParams.set("edit", "1");
    window.location.href = url.toString();
  }

  return (
    <button
      onClick={openEdit}
      className="fixed bottom-6 right-6 z-[150] btn-primary text-xs shadow-lg"
      style={{ padding: "0.6rem 1.4rem", letterSpacing: "0.1em" }}
      title="Edit this page"
    >
      ✎ Edit
    </button>
  );
}
