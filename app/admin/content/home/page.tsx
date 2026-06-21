import { getContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "home_location", label: "Location (hero subtitle)", type: "text" },
  { name: "home_hero_lead", label: "Hero lead", type: "textarea" },
  { name: "home_open_tonight", label: "'Open tonight' badge", type: "text" },
  { name: "home_tribute_title", label: "Tribute title", type: "text" },
  { name: "home_tribute_body", label: "Aalst tribute text", type: "textarea" },
  { name: "home_tribute_image", label: "Tribute image", type: "image" },
  { name: "home_services_title", label: "Services section title", type: "text" },
  { name: "home_partners_title", label: "Partners section title", type: "text" },
  { name: "home_cta_title", label: "Final CTA title", type: "text" },
  { name: "home_cta_lead", label: "Final CTA text", type: "textarea" },
  {
    name: "partners",
    label: "Partners (logos)",
    type: "repeater",
    itemLabel: "Partner",
    fields: [
      { name: "partner_name", label: "Name", type: "text" },
      { name: "partner_logo", label: "Logo", type: "image" },
      { name: "partner_url", label: "Link", type: "text" },
    ],
  },
];

export default async function HomeContentPage() {
  const content = await getContent();
  return (
    <ContentEditor
      title="Home page"
      description="Edit the home page content. Write in English — the site auto-translates to FR/NL."
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
