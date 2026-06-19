import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation helpers. Use these Link/redirect/usePathname/useRouter
// instead of the ones from next/* for any links between localized pages.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
