import { getContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "contact_title", label: "Page title", type: "text" },
  { name: "contact_intro", label: "Intro", type: "textarea" },
  { name: "contact_email_desc", label: "Email description", type: "textarea" },
  { name: "contact_socials_desc", label: "Socials description", type: "text" },
  { name: "contact_review_desc", label: "Google review description", type: "text" },
];

export default async function ContactContentPage() {
  const content = await getContent();
  return (
    <ContentEditor
      title="Contact"
      description="Edit the contact page descriptions. Write in English."
      help={[
        "These texts appear next to the email, socials and Google-review buttons on the Contact page.",
        "The actual email address, social links and review URL are set in 'Global & Footer'.",
        "Text is written in English and auto-translated to FR/NL. Click 'Save' to publish.",
      ]}
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
