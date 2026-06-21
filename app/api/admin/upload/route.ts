import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidSessionValue } from "@/lib/auth";

// Uploads an image to Vercel Blob and returns its public URL.
// Admin-only: rejects requests without a valid admin session cookie.
export async function POST(request: NextRequest) {
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  if (!(await isValidSessionValue(cookie))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "The file must be an image." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image too large (max 8 MB)." }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image storage not configured (BLOB_READ_WRITE_TOKEN missing)." },
      { status: 500 },
    );
  }

  const blob = await put(`rollerland/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}
