import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidSessionValue } from "@/lib/auth";

// Lightweight check used by the inline editor to decide whether to enable edit mode.
export async function GET() {
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  const admin = await isValidSessionValue(cookie);
  return NextResponse.json({ admin });
}
