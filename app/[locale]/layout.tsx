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

  return (
    <html lang={locale} className={spaceGrotesk.variable}>
      <body className="antialiased" style={{ color: "#FFFFFF" }}>
        <NextIntlClientProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          {popup && <PromoPopup data={popup} />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
