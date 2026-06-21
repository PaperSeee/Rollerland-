import { getContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "tarifs_intro", label: "Intro", type: "textarea" },
  { name: "tarif_enfant", label: "Child price", type: "text" },
  { name: "tarif_adulte", label: "Adult price", type: "text" },
  { name: "tarif_protection", label: "Protection price", type: "text" },
  { name: "tarif_vestiaire", label: "Cloakroom price", type: "text" },
  { name: "consume_notice_1", label: "Be Here notice (line 1)", type: "text" },
  { name: "consume_notice_2", label: "Be Here notice (line 2)", type: "text" },
  {
    name: "options_supplementaires",
    label: "Add-on options",
    type: "repeater",
    itemLabel: "Option",
    fields: [
      { name: "option_label", label: "Label", type: "text" },
      { name: "option_price", label: "Price", type: "text" },
    ],
  },
  {
    name: "formules",
    label: "Packages (table + detail pages)",
    type: "repeater",
    itemLabel: "Package",
    fields: [
      { name: "formule_slug", label: "Slug (URL, e.g. birthday-party)", type: "text" },
      { name: "formule_nom", label: "Name", type: "text" },
      { name: "formule_tagline", label: "Tagline", type: "text" },
      { name: "formule_description", label: "Description", type: "textarea" },
      { name: "formule_prix_enfant", label: "Child price", type: "text" },
      { name: "formule_prix_adulte", label: "Adult price", type: "text" },
      { name: "formule_highlight", label: "Highlight", type: "bool" },
      { name: "formule_image", label: "Image", type: "image" },
      { name: "formule_includes", label: "Included", type: "lines", lineKey: "include_item" },
    ],
  },
  {
    name: "menu_boissons",
    label: "Bar · Drinks",
    type: "repeater",
    itemLabel: "Drink",
    fields: [
      { name: "nom", label: "Name", type: "text" },
      { name: "prix", label: "Price", type: "text" },
    ],
  },
  {
    name: "menu_nourriture",
    label: "Food",
    type: "repeater",
    itemLabel: "Item",
    fields: [
      { name: "nom", label: "Name", type: "text" },
      { name: "prix", label: "Price", type: "text" },
    ],
  },
];

export default async function PricesContentPage() {
  const content = await getContent();
  return (
    <ContentEditor
      title="Prices & Packages"
      description="Edit prices, add-on options, packages (with their detail pages) and the bar menu. Write in English."
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
