import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import LogoutButton from "./LogoutButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "Admin — Rollerland Brussels",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={spaceGrotesk.variable}>
      <body className="antialiased" style={{ color: "#FFFFFF" }}>
        <div className="min-h-screen">
          <header
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: "0.5px solid rgba(127,119,221,0.2)" }}
          >
            <Link href="/admin" className="flex items-center gap-3">
              <span
                className="text-white font-semibold"
                style={{ letterSpacing: "0.14em", fontSize: "0.8rem", textTransform: "uppercase" }}
              >
                Rollerland<span style={{ color: "#9B92F0" }}>Admin</span>
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-xs uppercase tracking-wide hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
              >
                Voir le site →
              </Link>
              <LogoutButton />
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
