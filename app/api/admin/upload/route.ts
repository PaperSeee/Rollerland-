import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { ADMIN_COOKIE, isValidSessionValue } from "@/lib/auth";

// Cloudflare (10/11/2026) : les images de l'admin sont rangées dans Workers KV (lien MEDIA)
// et servies par /media/<clé> (remplace Vercel Blob). Admin uniquement.
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

  const { env } = getCloudflareContext();
  const media = (env as unknown as { MEDIA?: KVNamespace }).MEDIA;
  if (!media) {
    return NextResponse.json({ error: "Image storage not configured (MEDIA missing)." }, { status: 500 });
  }

  const propre = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  const cle = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${propre}`;
  await media.put(cle, await file.arrayBuffer(), { metadata: { type: file.type } });

  return NextResponse.json({ url: `${new URL(request.url).origin}/media/${cle}` });
}
