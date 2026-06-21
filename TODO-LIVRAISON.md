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

## 2bis. Stockage d'images (Vercel Blob) — pour l'upload dans /admin
1. Vercel → **Storage → Create Database → Blob** → lier au projet `rollerland`.
   → ça injecte automatiquement `BLOB_READ_WRITE_TOKEN`.
2. **Redéployer**. Sans ça, l'upload d'image dans popup/events renverra une
   erreur « stockage non configuré ».

## 2ter. Traduction automatique (DeepL) — contenu écrit en anglais seulement
Le contenu (admin /content + popup + events) est écrit **uniquement en anglais** ;
le site traduit automatiquement vers FR/NL (mis en cache dans Neon).
1. Créer une clé gratuite sur **deepl.com/pro-api** (clé gratuite finit par `:fx`).
2. Vercel → Settings → Environment Variables → ajouter `DEEPL_API_KEY` (Production+Preview).
3. **Redéployer**.
> Sans clé : le site affiche l'anglais en FR/NL (aucune casse), mais pas de traduction.

## 2quater. Pré-remplir le contenu (1re fois)
La base de contenu (`SiteContent`) doit contenir les valeurs par défaut anglaises :
`npm run db:seed-content` (en local avec les URLs Neon). Idempotent : ne fait rien si déjà rempli.

## 3. Tester l'admin
- Aller sur `https://<le-site>/admin` → entrer `ADMIN_PASSWORD`.
- **Disco Events** : créer/modifier/supprimer (aperçu live + upload image).
- **Promo Popup** : éditer + activer (aperçu live).
- **Content** : 8 sections (Home, Prices & Packages, Schedule, Practical, Lessons,
  Private Events, Contact, Global & Footer) — tout le texte + images du site, en anglais.

## 4. Le contenu se gère 100 % dans /admin (plus de WordPress)
Le site **n'utilise plus WordPress**. Tout le contenu (textes, images, tarifs, formules,
horaires, partenaires, règles…) s'édite dans **`/admin/content`** :
- Écrire **en anglais** → traduit FR/NL automatiquement.
- Images : **upload par glisser-déposer** (stockées sur Vercel Blob).
- Champ vide = le site garde la valeur par défaut (rien ne casse).
> L'import ACF WordPress et le fichier `acf-export-cms.json` ne sont **plus nécessaires**.

## 5. Brancher le sous-domaine (Combell → Vercel)
- Voir **DEPLOYMENT.md §4**.
- Vercel → Domains → ajouter `rollerland.ledomaine.be` → CNAME `cname.vercel-dns.com`.
- Combell → Gestion DNS → ajouter ce CNAME. Ne pas toucher aux enregistrements existants.

---

## État du projet (déjà fait, poussé sur GitHub, branche main)
- ✅ Refonte (branding, menu, contact, style violet vintage)
- ✅ Admin events Disco + popup (`/admin`, Postgres) — aperçu live + upload image
- ✅ Pages détail formules `/tarifs/[slug]`
- ✅ Fix formulaire de réservation
- ✅ i18n EN/FR/NL (EN par défaut) + auto-traduction DeepL (cache)
- ✅ **CMS maison complet** : tout le contenu éditable dans `/admin/content`
  (textes + images), en anglais, traduit automatiquement. Plus de dépendance WordPress.

## Coût : 0 € en plus
ACF/WordPress plus utilisés · Vercel + Neon + Blob en palier gratuit · DeepL gratuit ·
sous-domaine Combell gratuit.
ACF gratuit · pas de 2e WordPress · Vercel + Postgres palier gratuit ·
sous-domaine Combell gratuit.
