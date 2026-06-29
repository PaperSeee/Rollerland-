import { defineRouting } from "next-intl/routing";

// EN is the default locale and is served without a prefix (/, /tarifs);
// FR and NL are prefixed (/fr/*, /nl/*). `localeDetection: false` means we do
// NOT auto-switch to the browser language — visitors land on English by default
// and only see FR/NL when they explicitly pick it (or hit a /fr,/nl URL).
export const routing = defineRouting({
  locales: ["en", "fr", "nl"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
