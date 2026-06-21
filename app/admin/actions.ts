"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE, isValidSessionValue } from "@/lib/auth";

// Defense-in-depth: middleware already gates /admin, but Server Actions can be
// invoked directly, so re-check the session before any mutation.
async function assertAdmin() {
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  if (!(await isValidSessionValue(cookie))) {
    throw new Error("Unauthorized");
  }
}

function parseEvent(formData: FormData) {
  const date = String(formData.get("date") ?? "").trim();
  const day = String(formData.get("day") ?? "").trim();
  const theme = String(formData.get("theme") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const dj = String(formData.get("dj") ?? "").trim();
  const time = String(formData.get("time") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const imagePosition = String(formData.get("imagePosition") ?? "center").trim() || "center";
  const special = formData.get("special") === "on";

  if (!date || !day || !theme || !time) {
    throw new Error("Missing required fields (date, day, theme, time).");
  }

  return {
    date: new Date(date + "T00:00:00Z"),
    day,
    theme,
    description,
    dj: dj || null,
    time,
    image: image || null,
    imagePosition,
    special,
  };
}

export async function createEvent(formData: FormData) {
  await assertAdmin();
  await prisma.discoEvent.create({ data: parseEvent(formData) });
  revalidatePath("/disco-roller");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateEvent(id: string, formData: FormData) {
  await assertAdmin();
  await prisma.discoEvent.update({ where: { id }, data: parseEvent(formData) });
  revalidatePath("/disco-roller");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteEvent(id: string) {
  await assertAdmin();
  await prisma.discoEvent.delete({ where: { id } });
  revalidatePath("/disco-roller");
  revalidatePath("/admin");
}

// ── Promo popup (singleton id = 1) ──────────────────────────────────────
export type SaveState = { ok: boolean; message: string };

// useActionState signature: (prevState, formData). Returns a status the editor
// shows ("Enregistré ✓") instead of redirecting to the same page (which looked
// like nothing happened).
export async function updatePopup(_prev: SaveState, formData: FormData): Promise<SaveState> {
  try {
    await assertAdmin();
    const data = {
      enabled: formData.get("enabled") === "on",
      title: String(formData.get("title") ?? "").trim(),
      body: String(formData.get("body") ?? "").trim(),
      imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
      imagePosition: String(formData.get("imagePosition") ?? "center").trim() || "center",
      ctaLabel: String(formData.get("ctaLabel") ?? "").trim() || null,
      ctaUrl: String(formData.get("ctaUrl") ?? "").trim() || null,
    };
    await prisma.popupSettings.upsert({
      where: { id: 1 },
      create: { id: 1, ...data },
      update: data,
    });
    // Popup is rendered from the root layout, so revalidate the whole tree.
    revalidatePath("/", "layout");
    revalidatePath("/admin/popup");
    return { ok: true, message: "Saved ✓" };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Error while saving" };
  }
}
