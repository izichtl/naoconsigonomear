#!/usr/bin/env bash
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
OUTPUT="$ROOT_DIR/manifest.js"

printf '%s\n' '/* Gerado por generate-manifest.sh. Não edite manualmente. */' > "$OUTPUT"
printf '%s\n' 'window.PAGE_MANIFEST = [' >> "$OUTPUT"

first=true
while IFS= read -r -d '' file; do
  relative="${file#"$ROOT_DIR"/}"
  title="$(tr '\n' ' ' < "$file" | sed -n 's:.*<title[^>]*>[[:space:]]*\([^<]*\)</title>.*:\1:p' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | head -n 1)"
  [ -n "$title" ] || title="${relative##*/}"
  title="${title//\\/\\\\}"
  title="${title//\"/\\\"}"
  path="${relative//\\/\/}"
  if [ "$first" = true ]; then
    first=false
  else
    printf '%s\n' ',' >> "$OUTPUT"
  fi
  printf '  {"path":"%s","title":"%s"}' "$path" "$title" >> "$OUTPUT"
done < <(
  find "$ROOT_DIR" -type f -name '*.html' ! -path "$ROOT_DIR/index.html" \
    ! -path '*/.git/*' -print0 | sort -z
)

printf '\n%s\n' '];' >> "$OUTPUT"
printf 'Manifesto gerado: %s\n' "$OUTPUT"
