import { getEditableContent } from "@/lib/content";
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
    name: "home_stats",
    label: "Opening-hours bar",
    type: "repeater",
    itemLabel: "Day",
    fields: [
      { name: "stat_label", label: "Day", type: "text" },
      { name: "stat_value", label: "Hours", type: "text" },
      { name: "stat_sub", label: "Activities", type: "text" },
    ],
  },
  {
    name: "home_services",
    label: "Services cards",
    type: "repeater",
    itemLabel: "Service",
    fields: [
      { name: "service_title", label: "Title", type: "text" },
      { name: "service_desc", label: "Description", type: "textarea" },
      { name: "service_href", label: "Link (e.g. /cours)", type: "text" },
      { name: "service_accent", label: "Highlight", type: "bool" },
    ],
  },
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
  const content = await getEditableContent();
  return (
    <ContentEditor
      title="Home page"
      description="Edit the home page content. Write in English — the site auto-translates to FR/NL."
      help={[
        "Texts (hero, tribute, CTA, section titles): just type. They appear on the home page.",
        "Images (tribute): click to upload a new one. The hero & gallery images are in 'Global & Footer'.",
        "Opening-hours bar & Services cards: lists — use '+ Add', 'Remove', ↑ ↓ to manage rows.",
        "Partners: add / remove / reorder partner rows. Each can have a name, link and logo (logo optional — a built-in logo is used if the name matches).",
        "Tip: you can also edit most of these directly on the live page — go to /admin and click 'Edit the site'.",
        "Click 'Save' to publish.",
      ]}
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
