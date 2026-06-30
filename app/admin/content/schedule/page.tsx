import { getEditableContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "horaires_title", label: "Page title", type: "text" },
  { name: "horaires_intro", label: "Intro", type: "textarea" },
  { name: "horaire_mercredi", label: "Wednesday hours", type: "text" },
  { name: "horaire_vendredi", label: "Friday hours", type: "text" },
  { name: "horaire_samedi", label: "Saturday hours", type: "text" },
  { name: "horaire_dimanche", label: "Sunday hours", type: "text" },
  { name: "horaire_note_dimanche", label: "Sunday note", type: "text" },
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
  const content = await getEditableContent();
  return (
    <ContentEditor
      title="Schedule"
      description="Edit opening hours and exceptional closures. Write in English."
      help={[
        "Opening hours: type each day's hours (e.g. '12h00 – 20h00'). Leave a day blank to show it as closed.",
        "Exceptional closures: use '+ Add closure' for each special closing (period + reason), 'Remove' to delete, ↑ ↓ to reorder.",
        "Page title and intro appear at the top of the Schedule page.",
        "Click 'Save' to publish. Changes go live immediately.",
      ]}
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
