"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

// Menu order per spec: Horaires · Pratique · Tarifs · Contact · Cours ·
// Private Events · Disco Roller (kept furthest right, highlighted).
const NAV_LINKS = [
  { label: "Horaires", href: "/horaires" },
  { label: "Pratique", href: "/pratique" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Contact", href: "/contact" },
  { label: "Cours", href: "/cours" },
  { label: "Private Events", href: "/private-events" },
  { label: "Disco Roller", href: "/disco-roller", hot: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-sm" style={{ width: 32, height: 32 }}>
            <Image
              src="https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.29.jpeg"
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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

        {/* CTA */}
        <a
          href={SITE.reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex btn-primary text-xs"
          style={{ padding: "0.5rem 1.25rem" }}
        >
          Réserver
        </a>

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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
          <a
            href={SITE.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-fit mt-2"
          >
            Réserver
          </a>
        </div>
      </div>
    </header>
  );
}
