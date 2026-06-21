"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-32">
      <p className="label-tag mb-4">Administration</p>
      <h1 className="text-3xl text-white mb-8" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
        Log in
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="px-4 py-3 text-sm text-white bg-transparent outline-none"
          style={{ border: "0.5px solid rgba(127,119,221,0.4)" }}
        />
        {error && (
          <p className="text-xs" style={{ color: "#ff8080" }}>
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-primary justify-center">
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
