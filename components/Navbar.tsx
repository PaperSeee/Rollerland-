"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useEdit } from "@/components/edit/EditProvider";

// Menu order per spec: Horaires · Pratique · Tarifs · Contact · Cours ·
// Private Events · Disco Roller (kept furthest right, highlighted).
const NAV_LINKS: { key: string; href: string; hot?: boolean }[] = [
  { key: "horaires", href: "/horaires" },
  { key: "pratique", href: "/pratique" },
  { key: "tarifs", href: "/tarifs" },
  { key: "contact", href: "/contact" },
  { key: "cours", href: "/cours" },
  { key: "privateEvents", href: "/private-events" },
  { key: "discoRoller", href: "/disco-roller", hot: true },
];

// Header config from the DB (editable in /admin/content/navigation).
export type NavConfig = {
  links: { label: string; href: string; hot?: boolean }[] | null;
  logo: string | null;
  bookLabel: string | null;
  bookUrl: string | null;
};

export default function Navbar({ nav }: { nav?: NavConfig }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const { editing } = useEdit();

  // Links: DB config if provided, else the built-in translated list.
  const links =
    nav?.links?.length
      ? nav.links
      : NAV_LINKS.map((l) => ({ label: t(l.key), href: l.href, hot: l.hot }));
  const bookLabel = nav?.bookLabel || t("reserve");
  const bookUrl = nav?.bookUrl || SITE.reservationUrl;
  const logo = nav?.logo || "https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.29.jpeg";

  // While editing, keep ?edit=1 on internal links so edit mode persists as the
  // admin browses from page to page.
  const editHref = (href: string) => (editing ? { pathname: href, query: { edit: "1" } } : href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: scrolled ? "0.5px solid rgba(127,119,221,0.25)" : "0.5px solid rgba(127,119,221,0.1)",
        backgroundColor: scrolled ? "rgba(21,14,40,0.97)" : "rgba(21,14,40,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={editHref("/")} className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-sm" style={{ width: 32, height: 32 }}>
            <Image
              src={logo}
              alt="Rollerland Brussels"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span
            className="text-white font-semibold transition-colors group-hover:text-purple-400"
            style={{ letterSpacing: "0.14em", fontSize: "0.85rem", textTransform: "uppercase" }}
          >
            Rollerland<span style={{ color: "#9B92F0" }}>Brussels</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={editHref(link.href)}
              className="relative text-xs uppercase tracking-widest transition-colors group"
              style={{
                color: pathname === link.href ? "#9B92F0" : link.hot ? "rgba(127,119,221,0.9)" : "rgba(255,255,255,0.5)",
                letterSpacing: "0.12em",
              }}
            >
              {link.label}
              {link.hot && (
                <span
                  className="absolute -top-1.5 -right-2.5 w-1 h-1 rounded-full animate-pulse-glow"
                  style={{ background: "#9B92F0" }}
                />
              )}
              {/* Active underline */}
              {pathname === link.href && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "#9B92F0" }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA + locale switcher */}
        <div className="hidden lg:flex items-center gap-5">
          {editing && (
            <a
              href="/admin/content/navigation"
              className="text-xs uppercase"
              style={{ background: "#9B92F0", color: "#150E28", padding: "0.3rem 0.7rem", borderRadius: 2, letterSpacing: "0.08em" }}
            >
              ✎ Edit header
            </a>
          )}
          <LocaleSwitcher />
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex btn-primary text-xs"
            style={{ padding: "0.5rem 1.25rem" }}
          >
            {bookLabel}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 relative z-50"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className="block h-px transition-all duration-300"
            style={{
              width: 22,
              background: open ? "#9B92F0" : "white",
              transform: open ? "rotate(45deg) translate(4px, 4px)" : "none",
            }}
          />
          <span
            className="block h-px transition-all duration-300"
            style={{
              width: 22,
              background: open ? "#9B92F0" : "white",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block h-px transition-all duration-300"
            style={{
              width: 22,
              background: open ? "#9B92F0" : "white",
              transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "500px" : "0",
          borderTop: open ? "0.5px solid rgba(127,119,221,0.2)" : "none",
        }}
      >
        <div className="px-6 pb-8 pt-6 flex flex-col gap-5 bg-[#150E28]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={editHref(link.href)}
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-widest flex items-center gap-3"
              style={{
                color: pathname === link.href ? "#9B92F0" : link.hot ? "rgba(127,119,221,0.9)" : "rgba(255,255,255,0.5)",
                letterSpacing: "0.14em",
              }}
            >
              {link.label}
              {link.hot && <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />}
            </Link>
          ))}
          <div className="mt-2">
            <LocaleSwitcher />
          </div>
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-fit mt-2"
          >
            {bookLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
