import { getEditableContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "pe_title", label: "Page title", type: "text" },
  { name: "pe_intro", label: "Intro", type: "textarea" },
  {
    name: "services_liste",
    label: "Events / formulas",
    type: "repeater",
    itemLabel: "Event",
    fields: [
      { name: "titre", label: "Title", type: "text" },
      { name: "horaire", label: "Schedule", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image", type: "image" },
    ],
  },
  { name: "pe_privatization_title", label: "Privatization title", type: "text" },
  { name: "pe_privatization_text", label: "Privatization text", type: "textarea" },
];

export default async function PrivateEventsContentPage() {
  const content = await getEditableContent();
  return (
    <ContentEditor
      title="Private Events"
      description="Edit the private events page content. Write in English."
      help={[
        "Events / formulas: use '+ Add event' to create a card, 'Remove' to delete, ↑ ↓ to reorder. Each one has a title, schedule, description and image.",
        "Image: click to upload a photo for the event card (optional — without one, the card shows a number).",
        "Page title, intro and the privatization block at the bottom are edited in their own fields.",
        "Text is written in English and auto-translated to FR/NL. Click 'Save' to publish.",
      ]}
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
