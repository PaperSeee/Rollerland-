import { getContent } from "@/lib/content";
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
  { name: "footer_tagline", label: "Footer tagline", type: "text" },
  { name: "footer_subtitle", label: "Footer subtitle", type: "text" },
  { name: "footer_closed_note", label: "Footer closed-days note", type: "text" },
];

export default async function GlobalContentPage() {
  const content = await getContent();
  return (
    <ContentEditor
      title="Global & Footer"
      description="Edit global settings (email, socials, reservation link), the home hero/gallery images and the footer. Write in English."
      fields={FIELDS}
      initial={content as Record<string, unknown>}
    />
  );
}
