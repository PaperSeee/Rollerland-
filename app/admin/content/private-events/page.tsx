import { getContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "pe_intro", label: "Intro", type: "textarea" },
  { name: "pe_privatization_title", label: "Privatization title", type: "text" },
  { name: "pe_privatization_text", label: "Privatization text", type: "textarea" },
];

export default async function PrivateEventsContentPage() {
  const content = await getContent();
  return (
    <ContentEditor
      title="Private Events"
      description="Edit the private events page content. Write in English."
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
