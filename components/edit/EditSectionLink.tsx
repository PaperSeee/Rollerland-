"use client";

import { useEdit } from "./EditProvider";

// Small "Edit <section>" button shown ONLY in edit mode (?edit=1, admin). Lists
// and prices are edited via the form-based CMS at /admin/content/<slug>, not
// inline — this points the admin to the right form for the block it sits above.
export default function EditSectionLink({
  section,
  label,
  href,
}: {
  section?: string; // e.g. "prices", "schedule", "lessons" → /admin/content/<section>
  label?: string;
  href?: string; // explicit path (e.g. "/admin" for disco events), overrides section
}) {
  const { editing } = useEdit();
  if (!editing) return null;

  return (
    <a
      href={href ?? `/admin/content/${section}`}
      className="inline-flex items-center gap-1.5 text-xs uppercase mb-4"
      style={{
        background: "#9B92F0",
        color: "#150E28",
        padding: "0.35rem 0.8rem",
        letterSpacing: "0.08em",
        borderRadius: 2,
        width: "fit-content",
      }}
    >
      ✎ Edit {label ?? section}
    </a>
  );
}
