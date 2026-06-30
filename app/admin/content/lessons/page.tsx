import { getEditableContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "cours_title", label: "Page title", type: "text" },
  { name: "cours_intro", label: "Intro", type: "textarea" },
  { name: "cours_tickettailor_url", label: "TicketTailor booking URL (default)", type: "text" },
  {
    name: "cours_list",
    label: "Courses",
    type: "repeater",
    itemLabel: "Course",
    fields: [
      { name: "cours_titre", label: "Title", type: "text" },
      { name: "cours_audience", label: "Audience (e.g. Kids, Adults)", type: "text" },
      { name: "cours_prix", label: "Price", type: "text" },
      { name: "cours_jours", label: "Days", type: "text" },
      { name: "cours_horaire", label: "Time", type: "text" },
      { name: "cours_niveau", label: "Level", type: "text" },
      { name: "cours_age", label: "Age", type: "text" },
      { name: "cours_description", label: "Description", type: "textarea" },
      { name: "cours_ticket_url", label: "Booking URL (optional, overrides default)", type: "text" },
    ],
  },
  { name: "start2ride_desc", label: "Start2Ride description", type: "textarea" },
  { name: "start2ride_date", label: "Start2Ride date", type: "text" },
  { name: "start2ride_time", label: "Start2Ride time", type: "text" },
  { name: "start2ride_place", label: "Start2Ride place", type: "text" },
  { name: "start2ride_url", label: "Start2Ride booking URL", type: "text" },
  { name: "cours_own_skates_text", label: "Own-skates text", type: "textarea" },
  { name: "cours_cancellations_text", label: "Cancellations text", type: "textarea" },
];

export default async function LessonsContentPage() {
  const content = await getEditableContent();
  return (
    <ContentEditor
      title="Lessons"
      description="Edit the roller lessons content. Write in English."
      help={[
        "Courses: use '+ Add course' to create a course card, 'Remove' to delete one, ↑ ↓ to reorder. Fill in title, price, days, time, level, age and description.",
        "Booking URL: set a default TicketTailor URL at the top; each course can override it with its own booking URL if needed.",
        "Start2Ride: edit its description, date, time, place and booking URL in their own fields.",
        "Page title and intro appear at the top of the Lessons page.",
        "Text is written in English and auto-translated to FR/NL. Click 'Save' to publish.",
      ]}
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
