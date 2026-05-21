"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Horaires", href: "/horaires" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Cours", href: "/cours" },
  { label: "Services", href: "/services" },
  { label: "Pratique", href: "/pratique" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      style={{
        borderBottom: "0.5px solid rgba(127,119,221,0.25)",
        backgroundColor: "#0D0A1A",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://retro.brussels/wp-content/uploads/2023/10/WhatsApp-Image-2023-09-12-at-09.22.29.jpeg"
            alt="Rollerland Brussels"
            width={36}
            height={36}
            className="rounded-sm object-cover"
            style={{ filter: "brightness(1.1)" }}
          />
          <span
            className="text-white tracking-widest uppercase text-xs font-medium"
            style={{ letterSpacing: "0.18em" }}
          >
            Rollerland
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest transition-colors"
              style={{
                color: pathname === link.href ? "#7F77DD" : "rgba(255,255,255,0.6)",
                letterSpacing: "0.14em",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex btn-primary text-xs"
          style={{ padding: "0.5rem 1.25rem" }}
        >
          Réserver
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className="block h-px w-5 transition-all"
            style={{ background: open ? "#7F77DD" : "white" }}
          />
          <span
            className="block h-px w-5 transition-all"
            style={{ background: open ? "#7F77DD" : "white" }}
          />
          <span
            className="block h-px w-5 transition-all"
            style={{ background: open ? "#7F77DD" : "white" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: "0.5px solid rgba(127,119,221,0.2)",
            backgroundColor: "#0D0A1A",
          }}
          className="md:hidden px-6 pb-6 pt-4 flex flex-col gap-5"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-widest"
              style={{
                color: pathname === link.href ? "#7F77DD" : "rgba(255,255,255,0.6)",
                letterSpacing: "0.14em",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-fit text-xs"
          >
            Réserver
          </a>
        </div>
      )}
    </header>
  );
}
