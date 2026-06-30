import Link from "next/link";

export const dynamic = "force-dynamic";

const SECTIONS = [
  { slug: "navigation", label: "Header & Nav" },
  { slug: "home", label: "Home" },
  { slug: "prices", label: "Prices & Packages" },
  { slug: "schedule", label: "Schedule" },
  { slug: "practical", label: "Practical" },
  { slug: "lessons", label: "Lessons" },
  { slug: "disco", label: "Disco Roller" },
  { slug: "private-events", label: "Private Events" },
  { slug: "contact", label: "Contact" },
  { slug: "global", label: "Global & Footer" },
];

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Top admin section nav */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="/admin" className="btn-outline">Disco Events</Link>
        <Link href="/admin/popup" className="btn-outline">Promo Popup</Link>
        <span className="btn-outline" style={{ borderColor: "#9B92F0", color: "#9B92F0" }}>Content</span>
      </div>

      {/* Content sub-nav */}
      <div className="flex flex-wrap gap-2 mb-10">
        {SECTIONS.map((s) => (
          <Link
            key={s.slug}
            href={`/admin/content/${s.slug}`}
            className="text-xs uppercase tracking-wide px-3 py-1.5 transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.5)", border: "0.5px solid rgba(127,119,221,0.2)", letterSpacing: "0.08em" }}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
