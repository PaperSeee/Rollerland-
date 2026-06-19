import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { ADMIN_COOKIE, isValidSessionValue } from "@/lib/auth";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin area: gated by the session cookie, NOT subject to locale routing.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!(await isValidSessionValue(cookie))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // Everything else goes through next-intl locale routing.
  return intlMiddleware(request);
}

export const config = {
  // Run on app routes; skip api, next internals, and files with an extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
