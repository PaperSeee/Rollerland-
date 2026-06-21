import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { saveContent } from "@/lib/content";
import { ADMIN_COOKIE, isValidSessionValue } from "@/lib/auth";

// Save inline edits (a partial patch of SiteContent keys). Admin-only.
export async function POST(request: NextRequest) {
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  if (!(await isValidSessionValue(cookie))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const patch = await request.json().catch(() => null);
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  await saveContent(patch as Record<string, unknown>);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
