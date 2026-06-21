import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PopupEditor from "./PopupEditor";

export const dynamic = "force-dynamic";

export default async function AdminPopupPage() {
  const popup = await prisma.popupSettings.findUnique({ where: { id: 1 } });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Section nav */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link href="/admin" className="btn-outline">
          Disco Events
        </Link>
        <span className="btn-outline" style={{ borderColor: "#9B92F0", color: "#9B92F0" }}>
          Promo Popup
        </span>
      </div>

      <p className="label-tag mb-2">Promotional popup</p>
      <h1 className="text-3xl text-white mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
        Popup settings
      </h1>
      <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
        The popup is shown only once per visitor. Any change shows it again once to visitors who
        had already seen it. The preview on the right updates live.
      </p>

      <PopupEditor
        initial={{
          enabled: popup?.enabled ?? false,
          title: popup?.title ?? "",
          body: popup?.body ?? "",
          imageUrl: popup?.imageUrl ?? "",
          imagePosition: popup?.imagePosition ?? "center",
          ctaLabel: popup?.ctaLabel ?? "",
          ctaUrl: popup?.ctaUrl ?? "",
        }}
      />
    </div>
  );
}
