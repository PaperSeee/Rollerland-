import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://retro.brussels/wp-json/wp/v2/pages?slug=rollerland-brussels&_fields=acf",
      { cache: "no-store" }
    );
    const data = await res.json();
    return NextResponse.json({ ok: res.ok, status: res.status, data });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
