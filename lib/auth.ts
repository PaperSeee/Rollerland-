// Lightweight admin auth: a single shared password (ADMIN_PASSWORD) gates
// /admin. On login we set an httpOnly cookie whose value is a SHA-256 token
// derived from the password — never the raw password. The middleware (Edge
// runtime) validates the cookie against the same derived token, so it works
// without any database/Node-crypto dependency.

export const ADMIN_COOKIE = "rl_admin";

// SHA-256 hex digest using Web Crypto (available in both Edge and Node 18+).
async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// The token stored in the cookie. Salted with a fixed string so the digest is
// specific to this app rather than a bare password hash.
export async function adminToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return sha256Hex(`rollerland-admin::${password}`);
}

export async function isValidPassword(candidate: string): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  // Reject when no password is configured, to avoid an open admin.
  if (!password) return false;
  return candidate === password;
}

export async function isValidSessionValue(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  if (!process.env.ADMIN_PASSWORD) return false;
  return cookieValue === (await adminToken());
}
