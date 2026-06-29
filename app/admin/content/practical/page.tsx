import { getContent } from "@/lib/content";
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
  const content = await getContent();
  return (
    <ContentEditor
      title="Practical info"
      description="Edit the practical info: intro, parking, rules. Write in English."
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
