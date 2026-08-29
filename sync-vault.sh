#!/bin/zsh
# Sincroniza los vaults de coreano al contenido del sitio.
# NO copia books/ (PDFs con copyright) ni los AI-Context.md.
#   ./sync-vault.sh   y después: git add -A && git commit && git push
set -e
cd "$(dirname "$0")"
VAULT="/Users/pedro/Documents/Obsidian Vault"
EXCL=(--exclude 'books/' --exclude 'AI-Context.md' --exclude '.obsidian/'
      --exclude '*.bak' --exclude '*.bak2' --exclude '.DS_Store')

for nivel in "Korean 2A" "Korean 3"; do
  mkdir -p "content/$nivel"
  rsync -a --delete "${EXCL[@]}" "$VAULT/$nivel/" "content/$nivel/"
  echo "$nivel  ->  $(find "content/$nivel" -name '*.md' | wc -l | tr -d ' ') notas"
done

# recordatorio: el repo del sitio es de pmarquezg20, no de Ubushisas
echo
echo "Antes de publicar:  gh auth switch --user pmarquezg20"
echo "Ver el deploy:      gh run list -R pmarquezg20/pedromarquezg-site"
