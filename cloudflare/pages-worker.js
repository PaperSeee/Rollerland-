// Rollerland sur Cloudflare Pages (DNS restés chez Combell avec DNSSEC : pas de zone Cloudflare possible).
// Rôle : ce que faisaient next-intl (anglais sans préfixe, /fr et /nl préfixés) et les redirections de next.config.
// Les fichiers sont servis par env.ASSETS (URL « propres » de Pages : /en/tarifs → en/tarifs.html).
const REDIRECTIONS = { "/services": "/private-events", "/fr/services": "/fr/private-events", "/nl/services": "/nl/private-events" };
const ADMIN = "https://rollerland-app.hqdigital.workers.dev";
const AUTRES = /^\/(fr|nl)(\/|$|\.txt$)/;

const site = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;
    if (url.hostname === "rollerland.brussels") {
      url.hostname = "www.rollerland.brussels";
      return Response.redirect(url.toString(), 308);
    }
    // L'admin tourne sur le Worker rollerland-app (le site public, lui, est en fichiers).
    if (p === "/admin" || p.startsWith("/admin/")) return Response.redirect(ADMIN + p + url.search, 302);
    if (REDIRECTIONS[p]) return Response.redirect(new URL(REDIRECTIONS[p] + url.search, url).toString(), 308);
    if (p !== "/" && p.endsWith("/")) {
      url.pathname = p.replace(/\/+$/, "");
      return Response.redirect(url.toString(), 308);
    }
    if (p === "/en" || p.startsWith("/en/")) {
      url.pathname = p.slice(3) || "/";
      return Response.redirect(url.toString(), 308);
    }
    const fichier = /\.[a-z0-9]+$/i.test(p);
    if (p.startsWith("/_next/") || AUTRES.test(p) || (fichier && !p.endsWith(".txt"))) return env.ASSETS.fetch(request);
    // Anglais sans préfixe : page (/tarifs → /en/tarifs) ou données de navigation (.txt).
    const cible = p.endsWith(".txt") ? (p === "/index.txt" ? "/en.txt" : "/en" + p) : "/en" + (p === "/" ? "" : p);
    const rep = await env.ASSETS.fetch(new Request(new URL(cible + url.search, url), request));
    // Fichier .txt propre au site (robots.txt, version.txt) : servi tel quel.
    if (rep.status === 404 && fichier) return env.ASSETS.fetch(request);
    if (rep.status === 404 && !fichier) {
      const page = await env.ASSETS.fetch(new Request(new URL("/404", url)));
      return new Response(page.body, { status: 404, headers: page.headers });
    }
    return rep;
  },
};

// Adresses techniques (<projet>.pages.dev et ses aperçus) : jamais indexables, seul www.rollerland.brussels compte (14/11/2026).
export default {
  async fetch(request, env) {
    const rep = await site.fetch(request, env);
    const h = new URL(request.url).hostname;
    if (!h.endsWith(".pages.dev") && !h.endsWith(".workers.dev")) return rep;
    const r = new Response(rep.body, rep);
    r.headers.set("x-robots-tag", "noindex, nofollow");
    return r;
  },
};
