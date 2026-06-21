"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="text-xs uppercase tracking-wide hover:text-white transition-colors"
      style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
    >
      Log out
    </button>
  );
}
