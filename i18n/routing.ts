import { defineRouting } from "next-intl/routing";

// EN is the default locale and is served without a prefix (/, /tarifs);
// FR and NL are prefixed (/fr/*, /nl/*).
export const routing = defineRouting({
  locales: ["en", "fr", "nl"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
