# Rollerland Brussels — Déploiement & administration

Ce site est une application **Next.js** déployée sur **Vercel**. Il est totalement
séparé du WordPress existant du client (techno + hébergement différents).

---

## 1. Architecture des accès

Trois niveaux distincts — le client n'a accès qu'au niveau 2 :

| Niveau | Qui | Accès |
|--------|-----|-------|
| Site public | tout le monde | `/`, `/tarifs`, `/disco-roller`, … |
| **Admin** (`/admin`) | le client (mot de passe) | gérer les événements Disco + le popup promo |
| Code / hébergement | toi (développeur) | GitHub, Vercel, base de données |

Le client reçoit uniquement : **l'URL `/admin` + le mot de passe**. Il ne peut
pas modifier le code ni casser le site.

---

## 2. Variables d'environnement (à définir sur Vercel)

Dans Vercel → Project → Settings → Environment Variables :

| Variable | Description |
|----------|-------------|
| `POSTGRES_PRISMA_URL` | URL poolée (auto-injectée par l'intégration Vercel Postgres) |
| `POSTGRES_URL_NON_POOLING` | URL directe pour les migrations (auto-injectée aussi) |
| `ADMIN_PASSWORD` | **Le mot de passe de `/admin`** — choisis-le, c'est lui que tu donnes au client |
| `REVALIDATE_SECRET` | Jeton du webhook de revalidation (existant) |

### Base de données
1. Vercel → Storage → **Create Database → Postgres** → lier au projet
   (les deux `POSTGRES_*` sont injectées automatiquement).
2. Au premier déploiement, appliquer le schéma :
   `npx prisma migrate deploy` (ou via un build hook).
3. (Optionnel) Pré-remplir les événements : `npm run db:seed`.

---

## 3. Espace admin (`/admin`)

- **Connexion** : aller sur `https://<le-site>/admin`, entrer le mot de passe
  (`ADMIN_PASSWORD`). Une session est gardée 30 jours via cookie.
- **`/admin`** : liste des événements Disco Roller → créer, modifier, supprimer.
  Les changements apparaissent immédiatement sur `/disco-roller`.
- **`/admin/popup`** : éditer le popup promotionnel (titre, texte, image, bouton)
  et l'activer/désactiver. Le popup s'affiche **une seule fois par visiteur** ;
  toute modification le réaffiche une fois.
- **Déconnexion** : bouton en haut à droite.

> Note : l'admin écrit dans la base Postgres du site, **pas** dans WordPress.
> Les événements Disco et le popup se gèrent donc ici, pas dans le WP du client.

---

## 4. Brancher le domaine (Combell → Vercel) — sous-domaine

Le nouveau site sera servi sur un **sous-domaine** (ex. `rollerland.ledomaine.be`),
ce qui laisse le WordPress existant 100 % intact.

### Étape A — côté Vercel
1. Vercel → Project → Settings → **Domains** → *Add*.
2. Saisir le sous-domaine voulu, ex. `rollerland.ledomaine.be`.
3. Vercel affiche l'enregistrement DNS à créer — en général :
   - **Type** : `CNAME`
   - **Nom / Host** : `rollerland` (le sous-domaine, sans le domaine principal)
   - **Valeur / Cible** : `cname.vercel-dns.com`

### Étape B — côté Combell (DNS)
1. Espace client Combell → **Noms de domaine** → ton domaine → **Gestion DNS**
   (zone DNS).
2. **Ajouter un enregistrement** :
   - Type : `CNAME`
   - Nom : `rollerland`
   - Cible/valeur : `cname.vercel-dns.com`
   - TTL : laisser par défaut (ou 1h).
3. Enregistrer. La propagation prend de quelques minutes à ~24h.

### Étape C — vérifier
- De retour sur Vercel → Domains, le sous-domaine passe en **Valid** une fois le
  DNS propagé. Le HTTPS (certificat) est généré automatiquement par Vercel.

> ⚠️ Ne PAS toucher aux enregistrements existants (le `A`/`CNAME` du WordPress).
> On **ajoute** juste un nouveau sous-domaine ; l'ancien site n'est pas affecté.

### Si plus tard le client veut un domaine dédié (rollerland.brussels)
Même principe : ajouter le domaine racine dans Vercel, puis chez le registrar de
`rollerland.brussels` créer les enregistrements indiqués par Vercel (souvent un
`A` vers `76.76.21.21` pour la racine + un `CNAME` pour `www`).

---

## 5. Résumé pour le client (à transmettre)

- Adresse d'administration : `https://<le-site>/admin`
- Mot de passe : *(celui que tu as défini dans `ADMIN_PASSWORD`)*
- Ce qu'il peut gérer : événements Disco Roller + popup promotionnel.
- Pour tout le reste (textes, photos, tarifs…), passer par le développeur.
