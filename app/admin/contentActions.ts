"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { saveContent } from "@/lib/content";
import { ADMIN_COOKIE, isValidSessionValue } from "@/lib/auth";

export type SaveState = { ok: boolean; message: string };

async function assertAdmin() {
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  if (!(await isValidSessionValue(cookie))) throw new Error("Unauthorized");
}

// Each content editor submits its whole section state as one JSON string in the
// "payload" field. We merge it into the SiteContent blob and revalidate the site.
export async function saveContentSection(_prev: SaveState, formData: FormData): Promise<SaveState> {
  try {
    await assertAdmin();
    const raw = String(formData.get("payload") ?? "");
    const patch = raw ? JSON.parse(raw) : {};
    if (typeof patch !== "object" || Array.isArray(patch)) {
      return { ok: false, message: "Invalid data" };
    }
    await saveContent(patch as Record<string, unknown>);
    revalidatePath("/", "layout"); // content is read across the whole site
    return { ok: true, message: "Saved ✓" };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Error while saving" };
  }
}
