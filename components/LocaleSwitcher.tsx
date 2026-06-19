"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { en: "EN", fr: "FR", nl: "NL" };

// Switches locale while keeping the visitor on the same page.
export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? "true" : undefined}
          className="text-xs uppercase transition-colors"
          style={{
            color: loc === locale ? "#9B92F0" : "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            fontWeight: loc === locale ? 600 : 400,
          }}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
