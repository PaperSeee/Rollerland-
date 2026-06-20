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
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Le fichier doit être une image." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image trop lourde (max 8 Mo)." }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Stockage d'images non configuré (BLOB_READ_WRITE_TOKEN manquant)." },
      { status: 500 },
    );
  }

  const blob = await put(`rollerland/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}
