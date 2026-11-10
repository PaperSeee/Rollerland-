import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";

// Requêtes par HTTPS (pas de WebSocket) : marche au build (Node) comme sur Cloudflare.
neonConfig.poolQueryViaFetch = true;

// Cloudflare Workers (10/11/2026) : une connexion ne peut pas servir deux requêtes,
// donc un client Prisma (pilote Neon) est créé à chaque utilisation.
function nouveauClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter: new PrismaNeon(pool), log: ["error"] });
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_t, prop) {
    const c = nouveauClient() as unknown as Record<string | symbol, unknown>;
    const v = c[prop];
    return typeof v === "function" ? (v as (...a: unknown[]) => unknown).bind(c) : v;
  },
});
