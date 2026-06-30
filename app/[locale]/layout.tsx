import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";
import { getPopup } from "@/lib/popup";
import { routing } from "@/i18n/routing";
import EditProvider from "@/components/edit/EditProvider";
import { getRollerland, pick, rowStr } from "@/lib/wordpress";
import { translate } from "@/lib/translate";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Rollerland Brussels — Roller Skating Brussels",
  description:
    "Rollerland Brussels: roller skating lessons, disco nights, birthdays, team building and more. Rue Dieudonné Lefèvre 4, B-1020 Brussels.",
  keywords: "roller, Brussels, Bruxelles, skating, disco roller, birthday, roller lessons",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: "Rollerland Brussels",
    description: "Roller skating rink in the heart of Brussels.",
    url: "https://rollerland.brussels",
    siteName: "Rollerland Brussels",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const popup = await getPopup();

  // Header config from the DB (editable in /admin/content/navigation), with
  // fallbacks handled inside Navbar. Custom link labels are auto-translated.
  const acf = await getRollerland();
  const navLinks = acf.nav_links?.length
    ? await Promise.all(
        acf.nav_links.map(async (l) => ({
          label: await translate(rowStr(l, "nav_label"), locale),
          href: rowStr(l, "nav_href") || "/",
          hot: Boolean(l.nav_hot),
        })),
      )
    : null;
  const nav = {
    links: navLinks,
    logo: pick(acf, "nav_logo") || null,
    bookLabel: (await translate(pick(acf, "nav_book_label"), locale)) || null,
    bookUrl: pick(acf, "nav_book_url") || null,
  };

  // Footer config from the DB (editable in /admin/content/global), fully
  // translated; Footer holds all the fallbacks. Reuses the same menu links and,
  // when set, a dedicated footer hours list.
  const footerHours = acf.footer_hours?.length
    ? await Promise.all(
        acf.footer_hours.map(async (h) => ({
          day: await translate(rowStr(h, "stat_label"), locale),
          h: rowStr(h, "stat_value"),
        })),
      )
    : null;
  // Footer links: own list if set, else reuse the header menu.
  const footerLinks = acf.footer_links?.length
    ? await Promise.all(
        acf.footer_links.map(async (l) => ({
          label: await translate(rowStr(l, "nav_label"), locale),
          href: rowStr(l, "nav_href") || "/",
        })),
      )
    : navLinks;
  // Footer socials: own list if set, else null (Footer falls back to global socials).
  const footerSocials = acf.footer_socials?.length
    ? acf.footer_socials
        .map((s) => ({ label: rowStr(s, "social_label"), url: rowStr(s, "social_url") }))
        .filter((s) => s.label && s.url)
    : null;
  const footer = {
    brand: pick(acf, "footer_brand") || null,
    tagline: (await translate(pick(acf, "footer_tagline"), locale)) || null,
    subtitle: (await translate(pick(acf, "footer_subtitle"), locale)) || null,
    address: (await translate(pick(acf, "footer_address"), locale)) || null,
    email: pick(acf, "site_email") || null,
    socials: {
      instagram: pick(acf, "social_instagram") || null,
      facebook: pick(acf, "social_facebook") || null,
      tiktok: pick(acf, "social_tiktok") || null,
    },
    socialsList: footerSocials,
    links: footerLinks,
    hours: footerHours,
    closedNote: (await translate(pick(acf, "footer_closed_note"), locale)) || null,
    rights: (await translate(pick(acf, "footer_rights"), locale)) || null,
    privacyLabel: (await translate(pick(acf, "footer_privacy_label"), locale)) || null,
    privacyUrl: pick(acf, "footer_privacy_url") || null,
  };

  return (
    <html lang={locale} className={spaceGrotesk.variable}>
      <body className="antialiased" style={{ color: "#FFFFFF" }}>
        <NextIntlClientProvider>
          <EditProvider locale={locale}>
            <Navbar nav={nav} />
            <main className="pt-16">{children}</main>
            <Footer data={footer} />
            {popup && <PromoPopup data={popup} />}
          </EditProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
