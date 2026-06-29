import { getContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

// The disco events list itself is managed from the Disco Events admin screen
// (/admin). This section covers the editable copy/image on the Disco page.
const FIELDS: Field[] = [
  { name: "disco_lead", label: "Hero lead", type: "textarea" },
  { name: "disco_hero_image", label: "Hero image", type: "image" },
];

export default async function DiscoContentPage() {
  const content = await getContent();
  return (
    <ContentEditor
      title="Disco Roller"
      description="Edit the Disco Roller page copy and hero image. Events are managed in the Disco Events screen. Write in English."
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
