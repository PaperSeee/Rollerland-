"use client";

export default function DeleteEventButton({ action }: { action: () => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this event?")) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="text-xs uppercase tracking-wide transition-colors hover:opacity-100"
        style={{ color: "rgba(255,128,128,0.7)", letterSpacing: "0.08em" }}
      >
        Delete
      </button>
    </form>
  );
}
