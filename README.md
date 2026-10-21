# Rollerland Brussels

Website of **Rollerland Brussels**, the roller skating rink in Laeken (1020 Brussels) — live at [www.rollerland.brussels](https://www.rollerland.brussels).

This repository contains **everything needed to run, modify and redeploy the site**: the code, a snapshot of the live content (texts, prices, schedule, menus, promo popup) and all the images it uses. Anyone can clone it, change it and host it.

> 🇫🇷 Une version française du guide est plus bas : [Français](#français).

---

## What's inside

| Path | What it is |
|------|------------|
| `app/[locale]/` | Public pages (EN at `/`, FR at `/fr`, NL at `/nl`): home, schedule, prices, practical info, lessons, disco roller, private events, contact |
| `app/admin/` | Password-protected admin (`/admin`): edit every text/image, disco events and the promo popup — no code needed |
| `components/`, `lib/` | UI components, content helpers, defaults (`lib/defaults.ts`), DeepL auto-translation |
| `messages/` | Fixed interface strings (EN / FR / NL) |
| `prisma/schema.prisma` | Database schema (PostgreSQL) |
| `prisma/content/` | **Snapshot of the live content** (21/10/2026): `site-content.json`, `popup.json`, `images-sources.json` (original URL of each image) |
| `public/content-images/` | All images used by the content snapshot |
| `public/partners/` | Partner logos |

Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · next-intl · Prisma + PostgreSQL · Vercel Blob (image uploads from the admin) · DeepL (optional, FR/NL translation).

## Run it locally

Requirements: Node.js 18+ and a PostgreSQL database (a free [Neon](https://neon.tech) database works).

```bash
git clone https://github.com/PaperSeee/Rollerland-.git rollerland-brussels
cd rollerland-brussels
npm install
cp .env.example .env.local      # then fill in the values (see below)
npx prisma migrate deploy       # create the tables
npm run db:import-content       # load the live content snapshot (texts, prices, images, popup)
npm run dev                     # http://localhost:3000  — admin: http://localhost:3000/admin
```

Without `db:import-content` the site still works: it then shows the default texts from `lib/defaults.ts`.

### Environment variables (`.env.example`)

| Variable | Required | Use |
|----------|----------|-----|
| `DATABASE_URL`, `DATABASE_URL_UNPOOLED` | yes | PostgreSQL connection (pooled + direct) |
| `ADMIN_PASSWORD` | yes | Password of `/admin` — choose your own |
| `BLOB_READ_WRITE_TOKEN` | for uploads | Vercel Blob store, used when uploading images from the admin |
| `DEEPL_API_KEY` | no | Auto-translates English content to FR/NL (free DeepL key). Without it, FR/NL show English text for admin-edited fields |
| `REVALIDATE_SECRET` | no | Token for `/api/revalidate` |

No secret is stored in this repository.

## Edit the site

- **Without code**: go to `/admin`, log in with `ADMIN_PASSWORD`, then *Content* (all pages), *Disco events* or *Promo popup*. The admin has a built-in guide (`/admin/content/guide`).
- **With code**: page layouts are in `app/[locale]/*/page.tsx`, default texts in `lib/defaults.ts`, interface strings in `messages/*.json`, colours and fonts in `tailwind.config.ts` and `app/globals.css`.

## Deploy

The easiest host is [Vercel](https://vercel.com): import the repository, add a Neon database from *Storage* (it injects `DATABASE_URL*`), add `ADMIN_PASSWORD` (and optionally `BLOB_READ_WRITE_TOKEN`, `DEEPL_API_KEY`), deploy, then run `npx prisma migrate deploy` and `npm run db:import-content` once against that database. More details in `DEPLOYMENT.md` (French). Any Node.js host that supports Next.js works too.

## License

- **Code**: MIT — see [LICENSE](LICENSE). You may use, copy, modify and redistribute it.
- **Brand, texts and photos** (Rollerland name and logo, photos in `public/content-images/`, partner logos in `public/partners/`) belong to Rollerland Brussels and their respective owners. They are included so the site can be rebuilt as is, not licensed for other uses.

---

## Français

Ce dépôt contient **tout le site Rollerland Brussels** : le code, une copie du contenu en ligne au 21/10/2026 (textes, prix, horaires, menus, popup) et toutes les images. N'importe qui peut le récupérer, le modifier et le remettre en ligne.

**Lancer le site sur son ordinateur** (Node.js 18+ et une base PostgreSQL, par exemple Neon gratuit) :

```bash
npm install
cp .env.example .env.local     # remplir DATABASE_URL, DATABASE_URL_UNPOOLED, ADMIN_PASSWORD
npx prisma migrate deploy      # crée les tables
npm run db:import-content      # charge le contenu du site en ligne (textes, prix, images, popup)
npm run dev                    # http://localhost:3000 — admin : /admin
```

**Modifier** : sans code, via `/admin` (mot de passe = `ADMIN_PASSWORD`) ; avec du code, pages dans `app/[locale]/`, textes par défaut dans `lib/defaults.ts`, textes d'interface dans `messages/`.

**Mettre en ligne** : importer le dépôt sur Vercel, ajouter une base Neon (*Storage*), la variable `ADMIN_PASSWORD`, déployer, puis lancer une fois `npx prisma migrate deploy` et `npm run db:import-content`. Détails dans `DEPLOYMENT.md`.

**Licence** : code sous licence MIT (libre d'utiliser, copier, modifier). Le nom, le logo, les textes et les photos de Rollerland, ainsi que les logos des partenaires, restent la propriété de leurs titulaires.
