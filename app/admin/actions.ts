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
  const special = formData.get("special") === "on";

  if (!date || !day || !theme || !time) {
    throw new Error("Champs requis manquants (date, jour, thème, horaire).");
  }

  return {
    date: new Date(date + "T00:00:00Z"),
    day,
    theme,
    description,
    dj: dj || null,
    time,
    image: image || null,
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
