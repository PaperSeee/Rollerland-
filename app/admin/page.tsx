import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteEvent } from "./actions";
import DeleteEventButton from "./DeleteEventButton";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function AdminHome() {
  const events = await prisma.discoEvent.findMany({ orderBy: { date: "asc" } });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Section nav */}
      <div className="flex flex-wrap gap-3 mb-12">
        <span className="btn-outline" style={{ borderColor: "#9B92F0", color: "#9B92F0" }}>
          Disco Events
        </span>
        <Link href="/admin/popup" className="btn-outline">
          Promo Popup
        </Link>
        <Link href="/admin/content" className="btn-outline">
          Content
        </Link>
        <Link href="/admin/content/guide" className="btn-outline" style={{ borderColor: "rgba(155,146,240,0.6)", color: "#9B92F0" }}>
          📖 Guide
        </Link>
        {/* Launch on-page inline editing (English source) */}
        <a href="/?edit=1" className="btn-primary" style={{ marginLeft: "auto" }}>
          ✎ Edit the site
        </a>
      </div>

      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="label-tag mb-2">Disco Roller</p>
          <h1 className="text-3xl text-white" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
            Events ({events.length})
          </h1>
        </div>
        <Link href="/admin/events/new" className="btn-primary">
          + New event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          No events yet. The site shows the default list while the database is empty.
        </p>
      ) : (
        <div style={{ border: "0.5px solid rgba(127,119,221,0.2)" }}>
          {events.map((e, i) => (
            <div
              key={e.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 px-5 py-4 items-center"
              style={{
                borderBottom: i < events.length - 1 ? "0.5px solid rgba(127,119,221,0.1)" : "none",
                background: e.special ? "rgba(127,119,221,0.05)" : "transparent",
              }}
            >
              <div className="md:col-span-3">
                <p className="label-tag mb-0.5">{e.day}</p>
                <p className="text-xs text-white">{formatDate(e.date)}</p>
              </div>
              <div className="md:col-span-5 flex items-center gap-2">
                <p className="text-sm text-white" style={{ fontWeight: 400 }}>
                  {e.theme}
                </p>
                {e.special && (
                  <span
                    className="text-xs px-2 py-0.5 uppercase"
                    style={{ background: "#9B92F0", color: "#150E28", fontSize: "0.55rem", letterSpacing: "0.1em" }}
                  >
                    Special
                  </span>
                )}
              </div>
              <div className="md:col-span-2">
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {e.time}
                </p>
                {e.dj && (
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {e.dj}
                  </p>
                )}
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-4">
                <Link
                  href={`/admin/events/${e.id}`}
                  className="text-xs uppercase tracking-wide hover:text-white transition-colors"
                  style={{ color: "#9B92F0", letterSpacing: "0.08em" }}
                >
                  Edit
                </Link>
                <DeleteEventButton action={deleteEvent.bind(null, e.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
