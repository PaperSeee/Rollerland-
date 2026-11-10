#!/bin/bash
# Prépare une copie du code pour l'export statique du site public (Cloudflare Pages) :
# retire l'admin, les API et le middleware (ils tournent sur le Worker rollerland-app),
# et fige les pages qui lisaient la base à chaque visite (elles sont reconstruites à chaque publication).
set -e
cd "$(dirname "$0")/.."
rm -rf app/admin app/api app/media middleware.ts
for f in $(grep -rl 'force-dynamic\|export const revalidate = 0;' app || true); do
  sed -i.bak -e 's/export const dynamic = "force-dynamic";/export const dynamic = "force-static";/' -e '/^export const revalidate = 0;$/d' "$f" && rm -f "$f.bak"
done
for f in app/sitemap.ts app/robots.ts; do
  grep -q 'export const dynamic' "$f" || printf '\nexport const dynamic = "force-static";\n' >> "$f"
done
echo "Code prêt pour l'export statique."
