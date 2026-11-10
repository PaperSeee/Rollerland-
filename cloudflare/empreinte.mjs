#!/usr/bin/env node
// Empreinte du contenu modifiable depuis l'admin (textes, popup, soirées disco + date du jour pour les soirées passées).
// Le robot GitHub compare cette empreinte à celle du site en ligne (/version.txt) et republie si elle a changé.
// Usage : DATABASE_URL=... node cloudflare/empreinte.mjs
import { createHash } from "node:crypto";

const url = process.env.DATABASE_URL;
const hote = new URL(url.replace(/^postgres(ql)?:/, "https:")).hostname;
const requete = `select
  (select coalesce(max("updatedAt")::text, '') from "SiteContent") as contenu,
  (select coalesce(max("updatedAt")::text, '') from "PopupSettings") as popup,
  (select count(*)::text || '/' || coalesce(max("updatedAt")::text, '') from "DiscoEvent") as disco,
  (select count(*)::text from "Translation") as traductions`;
const rep = await fetch(`https://${hote}/sql`, {
  method: "POST",
  headers: { "Neon-Connection-String": url, "Content-Type": "application/json" },
  body: JSON.stringify({ query: requete, params: [] }),
});
if (!rep.ok) throw new Error(`Base inaccessible : ${rep.status} ${await rep.text()}`);
const ligne = (await rep.json()).rows[0];
const jour = new Date().toLocaleDateString("fr-BE", { timeZone: "Europe/Brussels" });
const empreinte = createHash("sha256").update(JSON.stringify({ ...ligne, jour })).digest("hex").slice(0, 16);
console.log(empreinte);
