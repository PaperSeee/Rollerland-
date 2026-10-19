import type { WPAcf } from "@/lib/wordpress";
import { translateMany } from "@/lib/translate";

// ── Weekly schedule ──────────────────────────────────────────────────────
// One editable list (admin → Schedule → "Week"), one row per day, written in
// English and auto-translated. Used by the Schedule page and reused by the
// home page, contact page and Disco page so hours are typed in ONE place.
//
// Stored in SiteContent as `schedule_days`:
//   [{ schedule_day, schedule_hours, schedule_activities: [{ activity }],
//      schedule_note, schedule_disco }]

export type ScheduleRow = {
  schedule_day: string;
  schedule_hours: string;
  schedule_activities: Array<{ activity: string }>;
  schedule_note: string;
  schedule_disco: boolean;
};

export const DEFAULT_SCHEDULE: ScheduleRow[] = [
  { schedule_day: "Monday", schedule_hours: "", schedule_activities: [], schedule_note: "Groups by reservation", schedule_disco: false },
  { schedule_day: "Tuesday", schedule_hours: "", schedule_activities: [], schedule_note: "Groups by reservation", schedule_disco: false },
  {
    schedule_day: "Wednesday",
    schedule_hours: "12h00 – 20h00",
    schedule_activities: [{ activity: "Kids lessons 16h–17h" }, { activity: "Adult lessons 17h30–19h" }, { activity: "Free skating" }],
    schedule_note: "",
    schedule_disco: false,
  },
  { schedule_day: "Thursday", schedule_hours: "", schedule_activities: [], schedule_note: "Groups by reservation", schedule_disco: false },
  { schedule_day: "Friday", schedule_hours: "17h00 – 00h00", schedule_activities: [{ activity: "Disco Roller" }], schedule_note: "", schedule_disco: true },
  {
    schedule_day: "Saturday",
    schedule_hours: "12h00 – 00h00",
    schedule_activities: [{ activity: "Kids lessons 16h–17h" }, { activity: "Adult lessons 17h30–19h" }, { activity: "Disco Roller" }],
    schedule_note: "",
    schedule_disco: true,
  },
  { schedule_day: "Sunday", schedule_hours: "16h00 – 20h00", schedule_activities: [{ activity: "Free skating" }], schedule_note: "June–October: 12h–20h", schedule_disco: false },
];

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function normalize(rows: unknown[]): ScheduleRow[] {
  return rows
    .filter((r): r is Record<string, unknown> => Boolean(r) && typeof r === "object")
    .map((r) => ({
      schedule_day: str(r.schedule_day),
      schedule_hours: str(r.schedule_hours),
      schedule_activities: (Array.isArray(r.schedule_activities) ? r.schedule_activities : [])
        .map((a) => ({ activity: str((a as Record<string, unknown>)?.activity) }))
        .filter((a) => a.activity),
      schedule_note: str(r.schedule_note),
      schedule_disco: Boolean(r.schedule_disco),
    }))
    .filter((r) => r.schedule_day);
}

// The schedule rows to use: the saved list, else the defaults with the older
// per-day fields (horaire_mercredi, …) applied so nothing set before is lost.
export function resolveScheduleRows(acf: WPAcf): ScheduleRow[] {
  const saved = Array.isArray(acf.schedule_days) ? normalize(acf.schedule_days as unknown[]) : [];
  if (saved.length) return saved;

  const legacy: Record<string, string> = {
    Wednesday: str(acf.horaire_mercredi),
    Friday: str(acf.horaire_vendredi),
    Saturday: str(acf.horaire_samedi),
    Sunday: str(acf.horaire_dimanche),
  };
  const sundayNote = str(acf.horaire_note_dimanche);
  return DEFAULT_SCHEDULE.map((d) => ({
    ...d,
    schedule_hours: legacy[d.schedule_day] || d.schedule_hours,
    schedule_note: d.schedule_day === "Sunday" && sundayNote ? sundayNote : d.schedule_note,
  }));
}

export type ScheduleDay = {
  day: string; // translated day name
  short: string; // 3-letter label
  hours: string | null; // null = closed
  activities: { label: string; disco: boolean }[];
  note: string | null;
  disco: boolean;
};

// Resolved + translated schedule for the public pages.
export async function getSchedule(acf: WPAcf, locale: string): Promise<ScheduleDay[]> {
  const rows = resolveScheduleRows(acf);

  // One batched translation call for every day name, activity and note.
  const texts: string[] = [];
  rows.forEach((r) => {
    texts.push(r.schedule_day, r.schedule_note);
    r.schedule_activities.forEach((a) => texts.push(a.activity));
  });
  const out = await translateMany(texts, locale);

  let k = 0;
  return rows.map((r) => {
    const day = out[k++] || r.schedule_day;
    const note = out[k++] || "";
    const activities = r.schedule_activities.map((a) => ({
      label: out[k++] || a.activity,
      disco: /disco/i.test(a.activity),
    }));
    return {
      day,
      short: day.slice(0, 3).toUpperCase(),
      hours: r.schedule_hours || null,
      activities,
      note: note || null,
      disco: r.schedule_disco,
    };
  });
}
