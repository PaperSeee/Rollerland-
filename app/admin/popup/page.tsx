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
          Événements Disco
        </Link>
        <span className="btn-outline" style={{ borderColor: "#9B92F0", color: "#9B92F0" }}>
          Popup promo
        </span>
      </div>

      <p className="label-tag mb-2">Popup promotionnel</p>
      <h1 className="text-3xl text-white mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
        Configuration du popup
      </h1>
      <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
        Le popup ne s&apos;affiche qu&apos;une seule fois par visiteur. Toute modification le
        réaffiche une fois aux visiteurs qui l&apos;avaient déjà vu. L&apos;aperçu à droite se
        met à jour en direct.
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
