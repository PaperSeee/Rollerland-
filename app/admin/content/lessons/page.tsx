import { getContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "cours_intro", label: "Intro", type: "textarea" },
  { name: "start2ride_desc", label: "Start2Ride description", type: "textarea" },
  { name: "cours_own_skates_text", label: "Own-skates text", type: "textarea" },
  { name: "cours_cancellations_text", label: "Cancellations text", type: "textarea" },
  { name: "cours_tickettailor_url", label: "TicketTailor booking URL", type: "text" },
];

export default async function LessonsContentPage() {
  const content = await getContent();
  return (
    <ContentEditor
      title="Lessons"
      description="Edit the roller lessons content. Write in English."
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
