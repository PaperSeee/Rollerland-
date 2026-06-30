import { getEditableContent } from "@/lib/content";
import ContentEditor, { type Field } from "../ContentEditor";

export const dynamic = "force-dynamic";

const FIELDS: Field[] = [
  { name: "site_email", label: "Site email", type: "text" },
  { name: "social_instagram", label: "Instagram URL", type: "text" },
  { name: "social_facebook", label: "Facebook URL", type: "text" },
  { name: "social_tiktok", label: "TikTok URL", type: "text" },
  { name: "google_review_url", label: "Google review link", type: "text" },
  { name: "cours_whatsapp_group_url", label: "Lessons WhatsApp group URL", type: "text" },
  { name: "reservation_url", label: "Reservation form URL (all 'Book' buttons)", type: "text" },
  { name: "reserve_label", label: "Main 'Book' button label", type: "text" },
  { name: "hero_image", label: "Home hero image", type: "image" },
  {
    name: "gallery_images_rows",
    label: "Home gallery images",
    type: "repeater",
    itemLabel: "Photo",
    fields: [{ name: "src", label: "Image", type: "image" }],
  },
  { name: "footer_brand", label: "Footer brand name", type: "text" },
  { name: "footer_tagline", label: "Footer tagline", type: "text" },
  { name: "footer_subtitle", label: "Footer subtitle", type: "text" },
  { name: "footer_address", label: "Footer address line", type: "text" },
  { name: "footer_closed_note", label: "Footer closed-days note", type: "text" },
  { name: "footer_rights", label: "Footer copyright text", type: "text" },
  { name: "footer_privacy_label", label: "Privacy link label", type: "text" },
  { name: "footer_privacy_url", label: "Privacy link URL", type: "text" },
  {
    name: "footer_hours",
    label: "Footer opening hours",
    type: "repeater",
    itemLabel: "Day",
    fields: [
      { name: "stat_label", label: "Day", type: "text" },
      { name: "stat_value", label: "Hours", type: "text" },
    ],
  },
  {
    name: "footer_links",
    label: "Footer menu links (leave empty to reuse the header menu)",
    type: "repeater",
    itemLabel: "Link",
    fields: [
      { name: "nav_label", label: "Label", type: "text" },
      { name: "nav_href", label: "URL", type: "text" },
    ],
  },
  {
    name: "footer_socials",
    label: "Footer social links (leave empty for the defaults)",
    type: "repeater",
    itemLabel: "Social",
    fields: [
      { name: "social_label", label: "Label (e.g. Instagram)", type: "text" },
      { name: "social_url", label: "URL", type: "text" },
    ],
  },
];

export default async function GlobalContentPage() {
  const content = await getEditableContent();
  return (
    <ContentEditor
      title="Global & Footer"
      description="Edit global settings (email, socials, reservation link), the home hero/gallery images and the footer. Write in English."
      help={[
        "Reservation form URL: this single link is used by every 'Book' button across the whole site. 'Main Book button label' changes their text.",
        "Email & socials: these are reused on the Contact page and in the footer.",
        "Home hero image / gallery: click an image to upload a new one. In the gallery, use '+ Add photo' / 'Remove' / ↑ ↓ to manage photos.",
        "Footer menu links: add / remove / reorder / rename your own footer links. Leave this list empty to reuse the header menu.",
        "Footer social links: add / remove / reorder your own social links (label + URL). Leave empty to keep the default Instagram / Facebook / TikTok.",
        "Footer opening hours: one row per day (e.g. 'Wednesday' / '12h–20h').",
        "Privacy link: set its label and URL. Copyright: the year is added automatically.",
        "Click 'Save'. Changes go live immediately.",
      ]}
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
