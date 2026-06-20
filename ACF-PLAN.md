# Plan ACF — site Rollerland Brussels éditable depuis WordPress (retro.brussels)

Objectif : rendre **tout le contenu éditable** par le client depuis WordPress
(retro.brussels), en headless. Le site Next.js lit ces champs via l'API REST et
remplace les textes/images actuellement codés en dur.

## Conventions (à respecter à la lettre côté WP)

- **Page WP support** : on continue d'utiliser la page de slug **`rollerland-brussels`**
  (déjà utilisée par `lib/wordpress.ts`). Tous les champs ci-dessous sont des
  champs ACF attachés à cette page (sauf les événements Disco — voir §8).
- **Multilingue (EN/FR/NL)** : les **textes éditoriaux** sont **triplés** avec les
  suffixes `_en`, `_fr`, `_nl`. Ex. `home_hero_lead_en`, `home_hero_lead_fr`,
  `home_hero_lead_nl`.
- **NE PAS tripler** les valeurs neutres (mêmes dans toutes les langues) :
  prix (`8€`), horaires (`17h00 – 00h00`), URLs, e-mail, numéros, images,
  noms de lignes de bus. → un seul champ.
- **Types ACF** : `text` (titre court), `textarea` (paragraphe), `image`
  (`return_format: url`), `url`, `true_false`, `gallery`, `repeater`.
- **Fallback** : le code Next.js garde une valeur par défaut si un champ est
  vide, donc rien ne casse si un champ n'est pas rempli.
- **Légende ci-dessous** : 🌐 = champ triplé `_en/_fr/_nl` · ▪️ = champ unique.
  « (existe) » = champ déjà présent dans `acf-export.json`, à réutiliser tel quel.

---

## 1. Réglages globaux (groupe « Général »)

| Champ (name) | Type | Lang | Remarque |
|---|---|---|---|
| `site_email` | text | ▪️ | info@rollerland.brussels |
| `reservation_url` | url | ▪️ | (existe) formulaire Google |
| `social_instagram` | url | ▪️ | |
| `social_facebook` | url | ▪️ | |
| `social_tiktok` | url | ▪️ | |
| `google_review_url` | url | ▪️ | bouton « laisser un avis » |
| `cours_whatsapp_group_url` | url | ▪️ | groupe annulations cours |
| `hero_image` | image | ▪️ | (existe) |
| `gallery_images` | gallery | ▪️ | (existe) |

## 2. Navigation & pied de page

| Champ | Type | Lang |
|---|---|---|
| `footer_tagline` 🌐 | text | EN/FR/NL |
| `footer_subtitle` 🌐 | text | EN/FR/NL |
| `footer_closed_note` 🌐 | text | EN/FR/NL |
> Les libellés du menu (Horaires, Tarifs…) restent gérés dans le code i18n —
> inutile de les rendre éditables (ce sont des noms de pages).

## 3. Page d'accueil

| Champ | Type | Lang |
|---|---|---|
| `home_location` 🌐 | text | « Bruxelles · 1020 Laeken » |
| `home_hero_lead` 🌐 | textarea | accroche héro |
| `home_open_tonight` 🌐 | text | badge « ouvert ce soir » |
| `home_tribute_title` 🌐 | text | « Tribute à … » |
| `home_tribute_body` 🌐 | textarea | **texte officiel Aalst à fournir** |
| `home_tribute_image` | image | ▪️ |
| `home_services_title` 🌐 | text | |
| `home_partners_title` 🌐 | text | |
| `home_cta_title` 🌐 | text | « Chaussez les patins… » |
| `home_cta_lead` 🌐 | textarea | |
| `partners` | repeater | ▪️ | sous-champs : `name` (text), `logo` (image), `url` (url) |
| `stats` | repeater | mixte | `day` 🌐 (text), `hours` ▪️ (text), `note` 🌐 (text) |

## 4. Page Horaires

| Champ | Type | Lang |
|---|---|---|
| `horaires_intro` 🌐 | textarea | |
| `horaire_mercredi` … `horaire_dimanche` | text | ▪️ (existe) |
| `horaire_note_dimanche` 🌐 | text | (existe, à tripler) |
| `fermetures_exceptionnelles` | repeater | `periode` ▪️, `raison` 🌐 (existe) |
| `schedule_activities` | repeater | `label` 🌐 — chips d'activités par jour |

## 5. Page Pratique

| Champ | Type | Lang |
|---|---|---|
| `pratique_intro` 🌐 | textarea | |
| `reglement_image` | image | ▪️ (existe) |
| `parking_url` | url | ▪️ (existe) |
| `parking_text` 🌐 | textarea | |
| `transport_stib` | repeater | `line` ▪️, `stop` 🌐 |
| `transport_delijn` | repeater | `line` ▪️, `stop` 🌐 |
| `rules` | repeater | `rule` 🌐 — les 8 règles |

## 6. Page Tarifs + détails formules

| Champ | Type | Lang |
|---|---|---|
| `tarifs_intro` 🌐 | textarea | |
| `tarif_enfant` / `tarif_adulte` / `tarif_protection` / `tarif_vestiaire` | text | ▪️ (existe) |
| `options_supplementaires` | repeater | `label` 🌐, `price` ▪️ (karaoké 50€, etc.) |
| `forfaits_groupe` | repeater | voir détail ci-dessous (existe, à enrichir) |
| `menu_boissons` | repeater | `nom` 🌐, `prix` ▪️ (existe) |
| `menu_nourriture` | repeater | `nom` 🌐, `prix` ▪️ (existe) |
| `consume_notice_1` 🌐 / `consume_notice_2` 🌐 | text | message Be Here |

**`forfaits_groupe` (repeater) — sous-champs par formule :**
`slug` ▪️, `nom` 🌐, `tagline` 🌐, `description` 🌐, `prix_enfant` ▪️,
`prix_adulte` ▪️, `includes` (repeater de `item` 🌐), `image` ▪️, `highlight` ▪️ (true_false).
→ alimente à la fois le tableau /tarifs ET les pages /tarifs/[slug].

## 7. Pages Cours · Private Events · Contact

**Cours :** `cours_intro` 🌐, `cours_enfants_*` / `cours_adultes_*` (existe),
`cours_tickettailor_url` ▪️ (existe), `start2ride_*` (existe ; `start2ride_desc` 🌐),
`cours_own_skates_text` 🌐, `cours_cancellations_text` 🌐.

**Private Events :** `pe_intro` 🌐, `services_liste` (repeater existe) avec
`titre` 🌐, `horaire` ▪️, `description` 🌐, `image` ▪️ ; bloc privatisation
`pe_privatization_title` 🌐 + `pe_privatization_text` 🌐.

**Contact :** `contact_intro` 🌐, `contact_email_desc` 🌐, `contact_socials_desc` 🌐,
`contact_review_desc` 🌐. (adresse/horaires viennent des réglages globaux).

## 8. Événements Disco Roller — DÉCISION À PRENDRE

Actuellement gérés dans l'**admin Next.js + Postgres** (déjà construit et
fonctionnel). Deux options, à trancher :
- **(a) Garder l'admin Next.js** pour les events (CRUD déjà fait, simple) et ne
  mettre QUE le reste du contenu dans WordPress. → le moins de travail.
- **(b) Tout dans WordPress** : recréer les events en ACF (`disco_evenements`
  repeater existe déjà : `date`, `jour`, `theme`, `description`, `dj`, `horaire`,
  `special`, `image`) + champs textes disco (`disco_lead` 🌐, etc.), et
  débrancher Postgres pour les events.

## 9. Popup promo — DÉCISION À PRENDRE

Même logique : actuellement admin Next.js + Postgres. Option WordPress :
`popup_enabled` ▪️, `popup_title` 🌐, `popup_body` 🌐, `popup_image` ▪️,
`popup_cta_label` 🌐, `popup_cta_url` ▪️.

---

## Côté Next.js (ce que je câblerai ensuite, par lots)

1. Étendre `WPAcf` dans `lib/wordpress.ts` avec tous les champs ci-dessus.
2. Helper `pick(field, locale)` qui choisit `field_<locale>` avec fallback FR→EN.
3. Remplacer, page par page, les `t("…")`/chaînes codées par la valeur WP
   (en gardant le fallback i18n si le champ WP est vide).
4. Tester chaque lot en EN/FR/NL.

**Ordre proposé des lots :** Accueil → Tarifs(+formules) → Horaires → Pratique →
Cours → Private Events → Contact → (Disco/Popup selon §8/§9).

## Estimation de charge (indicative)

- Config WordPress (créer ~120 champs ACF triplés) : **gros poste côté WP**,
  surtout les repeaters. C'est le travail que tu fais dans l'admin WP.
- Câblage Next.js : ~1 lot par page, testable indépendamment.
- Le multilingue triplé = 3× les champs texte → bien suivre la convention de
  nommage pour que le câblage soit mécanique.
