// Client-side image shrink before upload. Vercel rejects request bodies over
// ~4.5 MB, and phone photos are often bigger — so large images are resized
// (max 2400 px on the long side) and re-encoded as JPEG in the browser first.
// Small images, GIFs and SVGs are sent untouched.

const MAX_SIDE = 2400;
const MAX_BYTES = 3.5 * 1024 * 1024;

export async function prepareImageForUpload(file: File): Promise<File> {
  if (typeof window === "undefined") return file;
  if (!file.type.startsWith("image/") || /gif|svg/.test(file.type)) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file; // format the browser can't decode (e.g. HEIC on some browsers) → let the server decide
  }

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size <= MAX_BYTES) {
    bitmap.close();
    return file;
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  for (const quality of [0.85, 0.75, 0.6]) {
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
    if (blob && (blob.size <= MAX_BYTES || quality === 0.6)) {
      const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
      return new File([blob], name, { type: "image/jpeg" });
    }
  }
  return file;
}

// Shrink (if needed) + upload to /api/admin/upload. Resolves with the public
// URL; throws an Error with a human-readable message on any failure.
export async function uploadImage(file: File): Promise<string> {
  const prepared = await prepareImageForUpload(file);
  const fd = new FormData();
  fd.append("file", prepared);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  // Parse defensively: a non-JSON response (e.g. Vercel's size-limit page).
  const raw = await res.text();
  let data: { url?: string; error?: string } = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    throw new Error(res.status === 413 ? "Image too large to upload." : `Upload error (${res.status}).`);
  }
  if (res.status === 401) throw new Error("Session expired — please log in again at /admin.");
  if (!res.ok) throw new Error(data.error || `Upload failed (${res.status}).`);
  if (!data.url) throw new Error("Invalid server response.");
  return data.url;
}
