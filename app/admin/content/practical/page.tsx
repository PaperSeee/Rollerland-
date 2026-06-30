import { getEditableContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "pratique_title", label: "Page title", type: "text" },
  { name: "pratique_intro", label: "Intro", type: "textarea" },
  { name: "parking_text", label: "Parking text", type: "textarea" },
  { name: "parking_url", label: "Parking booking URL", type: "text" },
  { name: "reglement_image", label: "Visual rules image", type: "image" },
  {
    name: "rules",
    label: "Rules",
    type: "repeater",
    itemLabel: "Rule",
    fields: [{ name: "rule_text", label: "Rule", type: "text" }],
  },
];

export default async function PracticalContentPage() {
  const content = await getEditableContent();
  return (
    <ContentEditor
      title="Practical info"
      description="Edit the practical info: intro, parking, rules. Write in English."
      help={[
        "Rules: use '+ Add rule' for each rule, 'Remove' to delete, ↑ ↓ to reorder.",
        "Visual rules image: click to upload the rules poster shown on the page.",
        "Parking: edit the parking text and the booking URL. Page title and intro are at the top.",
        "Text is written in English and auto-translated to FR/NL. Click 'Save' to publish.",
      ]}
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
