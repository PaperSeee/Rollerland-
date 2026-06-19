import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Rollerland Brussels — Patin à Roulettes",
  description:
    "Rollerland Brussels : cours de roller, soirées disco, anniversaires, team building et plus. Rue Dieudonné Lefèvre 4, B-1020 Bruxelles.",
  keywords: "roller, Brussels, Bruxelles, patinage, disco roller, anniversaire, cours roller",
  openGraph: {
    title: "Rollerland Brussels",
    description: "Patinoire à roulettes au cœur de Bruxelles.",
    url: "https://rollerland.brussels",
    siteName: "Rollerland Brussels",
    locale: "fr_BE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={spaceGrotesk.variable}>
      <body className="antialiased" style={{ color: "#FFFFFF" }}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
