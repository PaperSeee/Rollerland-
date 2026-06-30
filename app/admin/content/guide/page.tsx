import Link from "next/link";

export const dynamic = "force-dynamic";

// Central how-to guide for the whole CMS. Plain reference page, no form.
const SECTIONS: { title: string; intro?: string; steps: string[] }[] = [
  {
    title: "Two ways to edit your site",
    steps: [
      "On-page editing: go to /admin and click 'Edit the site'. Texts and images get a dashed outline — click them to edit directly on the page, then click 'Save changes' in the bottom bar.",
      "Admin forms: the tabs above (Header & Nav, Home, Prices, …) let you edit everything, including lists (menus, prices, partners, events) that are easier to manage as forms.",
      "Both write to the same place, so use whichever you prefer. On-page editing always works on the English version of the site.",
    ],
  },
  {
    title: "Editing text on the page",
    steps: [
      "In 'Edit the site' mode, click any outlined text (titles, intros, descriptions). Type your change.",
      "Click outside the text, then 'Save changes' in the bottom bar.",
      "You only write English — the site automatically translates to French and Dutch.",
    ],
  },
  {
    title: "Changing images",
    steps: [
      "In 'Edit the site' mode, hover an image and click 'Replace' / 'Add image', then choose a file.",
      "Some images (event photos, package images, partner logos) are uploaded from the admin forms instead — look for the image field in the matching tab.",
      "Use good-quality images. Very large files are fine, they are optimised automatically.",
    ],
  },
  {
    title: "Lists: add, remove, reorder",
    intro: "Menus, prices, packages, drinks, food, courses, events, partners, rules and closures are all 'lists'. They all work the same way in the admin forms:",
    steps: [
      "'+ Add' creates a new row at the bottom.",
      "'Remove' deletes that row.",
      "↑ and ↓ move a row up or down to change the order shown on the site.",
      "Important: once a list has at least one row, it fully replaces the built-in default — so add every item you want to keep.",
    ],
  },
  {
    title: "Header & menu",
    steps: [
      "Open the 'Header & Nav' tab.",
      "Add / remove / reorder / rename the menu links, and set each link's URL (internal like /tarifs, or a full https:// address).",
      "Change the header logo and the 'Book now' button (its text and link) here too.",
      "Leave the links list empty to keep the default menu.",
    ],
  },
  {
    title: "Footer",
    steps: [
      "Open the 'Global & Footer' tab.",
      "Edit the brand, tagline, address, email, opening hours, copyright and privacy link.",
      "Footer menu links and social links are their own lists — manage them independently, or leave them empty to reuse the header menu / default socials.",
    ],
  },
  {
    title: "Buttons & links",
    steps: [
      "All 'Book' buttons across the site use one link: 'Reservation form URL' in the 'Global & Footer' tab. Change it once, it updates everywhere.",
      "Their label is set by 'Main Book button label' (same tab). The header button has its own label/URL in 'Header & Nav'.",
    ],
  },
  {
    title: "Promo popup",
    steps: [
      "Open 'Promo Popup' (top of the admin).",
      "Set the title, text, image and button, then enable it.",
      "Every time you save a change, the popup re-shows once to every visitor — even those who already closed it.",
    ],
  },
  {
    title: "Disco events",
    steps: [
      "Open 'Disco Events' (top of the admin) to add, edit or remove dated events (theme, DJ, time).",
      "The Disco page texts and hero image are in the 'Disco Roller' tab.",
    ],
  },
  {
    title: "Saving & languages",
    steps: [
      "Always click 'Save' (forms) or 'Save changes' (on-page). Changes go live on the site immediately.",
      "Write everything in English. French (/fr) and Dutch (/nl) are generated automatically.",
    ],
  },
];

export default function GuidePage() {
  return (
    <div>
      <p className="label-tag mb-2">Help</p>
      <h1 className="text-3xl text-white mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
        How to edit your site
      </h1>
      <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
        A quick guide to everything you can change. Each editing tab above also has its own
        “How to edit this section” box at the top.
      </p>

      <div className="flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <div
            key={s.title}
            className="p-6"
            style={{ border: "0.5px solid rgba(127,119,221,0.25)", background: "rgba(255,255,255,0.02)", borderRadius: 4 }}
          >
            <h2 className="text-lg text-white mb-3" style={{ fontWeight: 400 }}>{s.title}</h2>
            {s.intro && (
              <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>{s.intro}</p>
            )}
            <ol className="flex flex-col gap-2">
              {s.steps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="text-xs font-medium flex-shrink-0"
                    style={{ color: "#9B92F0", minWidth: 18 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/admin/content/navigation" className="btn-primary">Start editing →</Link>
      </div>
    </div>
  );
}
