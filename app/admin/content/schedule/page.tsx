import { getEditableContent } from "@/lib/content";
import { getRollerland } from "@/lib/wordpress";
import { resolveScheduleRows } from "@/lib/schedule";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "horaires_title", label: "Page title", type: "text" },
  { name: "horaires_intro", label: "Intro", type: "textarea" },
  {
    name: "schedule_days",
    label: "Week (one row per day)",
    type: "repeater",
    itemLabel: "Day",
    fields: [
      { name: "schedule_day", label: "Day (e.g. Thursday)", type: "text" },
      { name: "schedule_hours", label: "Hours (e.g. 12h00 – 20h00) — leave empty = closed", type: "text" },
      { name: "schedule_activities", label: "Activities", type: "lines", lineKey: "activity" },
      { name: "schedule_note", label: "Small note (e.g. Groups by reservation)", type: "text" },
      { name: "schedule_disco", label: "Disco night (highlighted in purple, shown on the Disco page)", type: "bool" },
    ],
  },
  {
    name: "fermetures_exceptionnelles",
    label: "Exceptional closures",
    type: "repeater",
    itemLabel: "Closure",
    fields: [
      { name: "periode", label: "Period", type: "text" },
      { name: "raison", label: "Reason", type: "text" },
    ],
  },
];

export default async function ScheduleContentPage() {
  const [content, acf] = await Promise.all([getEditableContent(), getRollerland()]);
  // Show the week exactly as the site displays it (incl. hours saved before the
  // week list existed).
  const initial = { ...content, schedule_days: resolveScheduleRows(acf) };
  return (
    <ContentEditor
      title="Schedule"
      description="Edit the week, opening hours and exceptional closures. Write in English — the site translates to FR/NL."
      help={[
        "Week: one row per day. Type the day name, the hours, and one activity per line. Leave the hours empty to show the day as closed.",
        "Need an extra opening day (e.g. Thursday)? Fill in its hours. '+ Add day' adds a row, 'Remove' deletes one, ↑ ↓ reorders.",
        "Tick 'Disco night' on Disco days: they are highlighted and their hours appear on the home and Disco Roller pages.",
        "These hours are also used on the home page (Disco block) and the Contact page — you only type them here.",
        "Exceptional closures: '+ Add closure' for each special closing (period + reason). Remove old ones once they're past — an empty list hides the section.",
        "Click 'Save' to publish. Changes go live immediately.",
      ]}
      fields={FIELDS}
      initial={initial as Record<string, unknown>}
    />
  );
}
