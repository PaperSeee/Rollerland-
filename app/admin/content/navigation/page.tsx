import { getContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

// Header / navigation. Leave "Menu links" empty to use the built-in default
// menu. Add rows to fully control the header: label, URL and an optional
// highlight dot. Labels are written in English and auto-translated to FR/NL.
const FIELDS: Field[] = [
  { name: "nav_logo", label: "Header logo", type: "image" },
  { name: "nav_book_label", label: "Header button label (e.g. Book now)", type: "text" },
  { name: "nav_book_url", label: "Header button URL", type: "text" },
  {
    name: "nav_links",
    label: "Menu links",
    type: "repeater",
    itemLabel: "Link",
    fields: [
      { name: "nav_label", label: "Label", type: "text" },
      { name: "nav_href", label: "URL (e.g. /tarifs or https://…)", type: "text" },
      { name: "nav_hot", label: "Highlight (purple dot)", type: "bool" },
    ],
  },
];

export default async function NavigationContentPage() {
  const content = await getContent();
  return (
    <ContentEditor
      title="Header & Navigation"
      description="Edit the header: logo, the menu links (add / remove / reorder), and the header button. Leave 'Menu links' empty to keep the default menu. Write in English."
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
