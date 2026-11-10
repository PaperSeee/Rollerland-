#!/bin/bash
# À lancer par Ilias dans SON Terminal : enregistre le mot de passe de l'admin Rollerland sur Cloudflare.
# Rien ne s'affiche quand tu tapes (c'est normal). Le mot de passe va directement à Cloudflare, nulle part ailleurs.
cd "$HOME/cf-migration/rollerland-admin" || exit 1
read -r -s -p "Mot de passe de l'admin Rollerland : " PW; echo
read -r -s -p "Retape-le : " PW2; echo
if [ -z "$PW" ] || [ "$PW" != "$PW2" ]; then echo "Vide ou différent, recommence."; exit 1; fi
export CLOUDFLARE_API_TOKEN=$(cat "$HOME/.hermes/cloudflare-token") CLOUDFLARE_ACCOUNT_ID=f7cc9bf8b1ded48f8122f6ee4973fe93
if printf '%s' "$PW" | npx wrangler secret put ADMIN_PASSWORD >/dev/null 2>&1; then
  echo "C'est bon : le mot de passe est enregistré. Dis à Hermes « mdp rollerland ok »."
else
  echo "Échec de l'envoi à Cloudflare. Dis-le à Hermes."
fi
unset PW PW2
