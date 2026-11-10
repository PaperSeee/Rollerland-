import { getCloudflareContext } from "@opennextjs/cloudflare";

// Sert les images envoyées depuis l'admin (Workers KV, lien MEDIA).
export async function GET(_req: Request, { params }: { params: { key: string } }) {
  const { env } = getCloudflareContext();
  const media = (env as unknown as { MEDIA?: KVNamespace }).MEDIA;
  if (!media) return new Response("Not found", { status: 404 });
  const { value, metadata } = await media.getWithMetadata<{ type?: string }>(params.key, "arrayBuffer");
  if (!value) return new Response("Not found", { status: 404 });
  return new Response(value, {
    headers: {
      "content-type": metadata?.type || "application/octet-stream",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
