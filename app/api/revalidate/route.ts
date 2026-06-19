import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const path = (body as { path?: string }).path;

    if (path) {
      revalidatePath(path);
    } else {
      // Revalidate all known pages
      const paths = ["/", "/horaires", "/tarifs", "/cours", "/private-events", "/pratique", "/contact", "/disco-roller"];
      paths.forEach((p) => revalidatePath(p));
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  revalidatePath("/");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
