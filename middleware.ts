import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSessionValue } from "@/lib/auth";

// Gate the /admin area behind the session cookie. /admin/login stays public so
// users can authenticate. Phase 5 (next-intl) will compose its locale routing
// alongside this — admin paths are intentionally excluded from locale prefixing.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!(await isValidSessionValue(cookie))) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
