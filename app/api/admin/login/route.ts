import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, isValidPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  let password = "";
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    password = (body as { password?: string }).password ?? "";
  } else {
    const form = await request.formData().catch(() => null);
    password = (form?.get("password") as string) ?? "";
  }

  if (!(await isValidPassword(password))) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
