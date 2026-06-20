# Rollerland Brussels — Checklist de mise en ligne (à finir)

> L'erreur « Application error / Digest … » sur `/admin` et l'impossibilité de
> se connecter **ne sont PAS un bug** : il manque la config Vercel (variable
> `ADMIN_PASSWORD` + base de données Postgres). Le code compile et fonctionne.
> Une fois les étapes 1 → 3 faites, l'admin marchera.

## Cause de l'erreur actuelle
- **Login impossible** → `ADMIN_PASSWORD` pas défini sur Vercel
  (sans lui, le mot de passe est toujours refusé).
- **Erreur serveur sur `/admin`** → pas de base Postgres reliée
  (la page admin lit la base au chargement).

---

## 1. Base de données Postgres (Vercel → Storage) — corrige l'erreur serveur
> Vercel n'a plus de "Vercel Postgres" maison : c'est via le **Marketplace**.
1. Vercel → **Storage → Create Database** → section *Marketplace Database
   Providers* → **Neon (Serverless Postgres)** → **Continue**.
2. Plan **Free**, région **Frankfurt** (ou Paris), lier au projet `rollerland`.
   → ça injecte automatiquement `DATABASE_URL` et `DATABASE_URL_UNPOOLED`.
3. Appliquer le schéma à la base de prod (en local, avec les URLs Neon dans
   `.env.local`, OU via la console Neon) : `npx prisma migrate deploy`
4. (Optionnel) pré-remplir les events Disco : `npm run db:seed`

## 2. Variables d'environnement (Vercel → Settings → Environment Variables)
| Variable | Valeur |
|----------|--------|
| `DATABASE_URL` | (auto, créée par Neon à l'étape 1) |
| `DATABASE_URL_UNPOOLED` | (auto, créée par Neon à l'étape 1) |
| `ADMIN_PASSWORD` | **un mot de passe fort que tu choisis** → c'est celui de `/admin` |
| `REVALIDATE_SECRET` | une chaîne aléatoire |
→ **Redéployer** après avoir ajouté les variables (sinon elles ne sont pas prises).

## 3. Tester l'admin
- Aller sur `https://<le-site>/admin` → entrer `ADMIN_PASSWORD`.
- Vérifier : liste events, créer/modifier/supprimer, page `/admin/popup`.

## 4. Importer les champs ACF dans WordPress (retro.brussels)
- Voir **DEPLOYMENT.md §2bis** (procédure détaillée).
- Fichier : `acf-export-cms.json` → WP Admin → Custom Fields → Tools → Import.
- Page support déjà existante : **ID 42** (`rollerland-brussels`).
- Plugin **ACF gratuit** suffit. Non destructif pour le site existant.

## 5. Brancher le sous-domaine (Combell → Vercel)
- Voir **DEPLOYMENT.md §4**.
- Vercel → Domains → ajouter `rollerland.ledomaine.be` → CNAME `cname.vercel-dns.com`.
- Combell → Gestion DNS → ajouter ce CNAME. Ne pas toucher aux enregistrements existants.

## 6. Remplir le contenu (optionnel au lancement)
- Éditer la page WordPress ID 42 ; champs vides = textes par défaut (rien ne casse).

---

## État du projet (déjà fait, poussé sur GitHub)
Branche `feat/rollerland-quick-wins` :
- ✅ Refonte (branding, menu, contact, style violet vintage)
- ✅ Admin events Disco + popup (`/admin`, Postgres)
- ✅ Pages détail formules `/tarifs/[slug]`
- ✅ Fix formulaire de réservation
- ✅ i18n EN/FR/NL (EN par défaut)
- ✅ Tout le site éditable depuis WordPress (textes + images, 3 langues), avec
  fallback : le site marche même si WordPress n'est pas encore rempli.

## Coût : 0 € en plus
ACF gratuit · pas de 2e WordPress · Vercel + Postgres palier gratuit ·
sous-domaine Combell gratuit.
