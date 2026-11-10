/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from "@neondatabase/serverless";
import type { DiscoEvent, PopupSettings, SiteContent, Translation } from "@prisma/client";

// Cloudflare (10/11/2026) : Prisma ne tourne pas dans un Worker avec Next 14 (son moteur lit le disque).
// Ce petit module le remplace avec la même syntaxe pour les seuls appels du site (findUnique, findMany,
// create, update, delete, upsert), en requêtes HTTPS vers Neon. Le schéma reste dans prisma/schema.prisma.

type Valeurs = Record<string, unknown>;

const sql = () => neon(process.env.DATABASE_URL as string, { fullResults: true });
const q = (nom: string) => `"${nom.replace(/"/g, "")}"`;
const cuid = () => "c" + crypto.randomUUID().replace(/-/g, "").slice(0, 24);

function versSql(v: unknown): unknown {
  if (v instanceof Date) return v.toISOString();
  if (v !== null && typeof v === "object") return JSON.stringify(v);
  return v;
}

function modele<T>(table: string, opts: { cuid?: boolean; createdAt?: boolean; updatedAt?: boolean }) {
  const t = q(table);
  const executer = async (texte: string, params: unknown[]): Promise<any[]> => {
    const r = (await sql()(texte, params.map(versSql))) as unknown as { fields: { name: string; dataTypeID: number }[]; rows: any[] };
    // Colonnes « date » (oid 1082) remises à minuit UTC, comme Prisma (sinon le fuseau de la machine décale d'un jour).
    const dates = r.fields.filter((f) => f.dataTypeID === 1082).map((f) => f.name);
    for (const ligne of r.rows)
      for (const c of dates)
        if (ligne[c] instanceof Date) ligne[c] = new Date(Date.UTC(ligne[c].getFullYear(), ligne[c].getMonth(), ligne[c].getDate()));
    return r.rows;
  };
  const complet = (data: Valeurs, creation: boolean): Valeurs => {
    const d = { ...data };
    if (creation && opts.cuid && d.id === undefined) d.id = cuid();
    if (creation && opts.createdAt && d.createdAt === undefined) d.createdAt = new Date();
    if (opts.updatedAt) d.updatedAt = new Date();
    return d;
  };
  const filtre = (where: Valeurs, depart: number) => {
    const cles = Object.keys(where);
    return { texte: cles.map((c, i) => `${q(c)} = $${depart + i}`).join(" and "), params: cles.map((c) => where[c]) };
  };
  const inserer = async (data: Valeurs) => {
    const d = complet(data, true);
    const cles = Object.keys(d);
    const lignes = await executer(
      `insert into ${t} (${cles.map(q).join(", ")}) values (${cles.map((_, i) => `$${i + 1}`).join(", ")}) returning *`,
      cles.map((c) => d[c]),
    );
    return lignes[0];
  };
  const modifier = async (where: Valeurs, data: Valeurs) => {
    const d = complet(data, false);
    const cles = Object.keys(d);
    const f = filtre(where, cles.length + 1);
    const lignes = await executer(
      `update ${t} set ${cles.map((c, i) => `${q(c)} = $${i + 1}`).join(", ")} where ${f.texte} returning *`,
      [...cles.map((c) => d[c]), ...f.params],
    );
    return lignes[0] ?? null;
  };
  const trouver = async (where: Valeurs) => {
    const f = filtre(where, 1);
    return (await executer(`select * from ${t} where ${f.texte} limit 1`, f.params))[0] ?? null;
  };

  return {
    findUnique: async ({ where }: { where: Valeurs }): Promise<T | null> => trouver(where),
    findMany: async (args: { orderBy?: Record<string, "asc" | "desc"> } = {}): Promise<T[]> => {
      const tri = args.orderBy
        ? " order by " + Object.entries(args.orderBy).map(([c, s]) => `${q(c)} ${s === "desc" ? "desc" : "asc"}`).join(", ")
        : "";
      return executer(`select * from ${t}${tri}`, []);
    },
    create: async ({ data }: { data: Valeurs }): Promise<T> => inserer(data),
    update: async ({ where, data }: { where: Valeurs; data: Valeurs }): Promise<T> => {
      const r = await modifier(where, data);
      if (!r) throw new Error(`${table} : enregistrement introuvable`);
      return r;
    },
    delete: async ({ where }: { where: Valeurs }): Promise<T | null> => {
      const f = filtre(where, 1);
      return (await executer(`delete from ${t} where ${f.texte} returning *`, f.params))[0] ?? null;
    },
    upsert: async ({ where, create, update }: { where: Valeurs; create: Valeurs; update: Valeurs }): Promise<T> => {
      const existant = await trouver(where);
      if (!existant) return inserer({ ...where, ...create });
      if (Object.keys(update).length === 0) return existant;
      return modifier(where, update);
    },
  };
}

export const prisma = {
  discoEvent: modele<DiscoEvent>("DiscoEvent", { cuid: true, createdAt: true, updatedAt: true }),
  popupSettings: modele<PopupSettings>("PopupSettings", { updatedAt: true }),
  siteContent: modele<SiteContent>("SiteContent", { updatedAt: true }),
  translation: modele<Translation>("Translation", { cuid: true, createdAt: true }),
};
