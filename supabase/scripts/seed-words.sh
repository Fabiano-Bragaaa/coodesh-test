#!/usr/bin/env bash
set -euo pipefail

if [ -z "${SUPABASE_DB_URL:-}" ]; then
  echo "Defina SUPABASE_DB_URL com a connection string do banco (session pooler, porta 5432)." >&2
  exit 1
fi

SOURCE_URL="https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"
WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT

curl -fsSL "$SOURCE_URL" -o "$WORK_DIR/words.json"

node -e '
const words = Object.keys(require(process.argv[1])).sort();
process.stdout.write(words.map((word, index) => `${index + 1}\t${word}`).join("\n") + "\n");
' "$WORK_DIR/words.json" > "$WORK_DIR/words.tsv"

psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<SQL
begin;
truncate public.words;
\copy public.words (id, word) from '$WORK_DIR/words.tsv'
commit;
select count(*) as words from public.words;
SQL
