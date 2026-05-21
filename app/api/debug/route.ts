import { NextResponse } from "next/server";
import { getRollerland } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const acf = await getRollerland();
    const rawRes = await fetch(
      "https://retro.brussels/wp-json/wp/v2/pages?slug=rollerland-brussels&_fields=acf",
      { cache: "no-store" }
    );
    const rawData = await rawRes.json();
    return NextResponse.json({
      getRollerland_result: acf,
      tarif_vestiaire: acf.tarif_vestiaire,
      raw: rawData,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
