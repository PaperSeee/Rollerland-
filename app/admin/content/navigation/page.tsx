import { getEditableContent } from "@/lib/content";
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
  const content = await getEditableContent();
  return (
    <ContentEditor
      title="Header & Navigation"
      description="Edit the header: logo, the menu links, and the header button. Write in English."
      help={[
        "Menu links: click '+ Add link' to add a new menu item. For each link set a Label (the text shown) and a URL.",
        "Reorder links with the ↑ and ↓ buttons on each row. Remove a link with the 'Remove' button.",
        "URL: use an internal path like /tarifs, /cours, /contact — or a full address like https://example.com for an external site.",
        "Highlight: turn this on to show the small purple dot next to a link (used for Disco Roller).",
        "Leave the 'Menu links' list completely empty to keep the built-in default menu.",
        "Header logo: click to upload a new image. Header button: change its label (e.g. 'Book now') and the URL it points to.",
        "Click 'Save' at the bottom. Changes go live on the site immediately.",
      ]}
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
