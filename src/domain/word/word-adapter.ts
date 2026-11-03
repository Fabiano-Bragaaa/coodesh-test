import { type Database } from "@infra";

import { type Word, type WordNeighbors } from "./word-types";

type WordRow = Pick<Database["public"]["Tables"]["words"]["Row"], "id" | "word">;
type NeighborsRow = Database["public"]["Functions"]["word_neighbors"]["Returns"][number];

function toWord(row: WordRow): Word {
  return { id: row.id, text: row.word };
}

function toNeighbors(rows: NeighborsRow[]): WordNeighbors {
  const row = rows[0];

  return {
    previous: row?.previous ?? null,
    next: row?.next ?? null,
  };
}

export const wordAdapter = { toWord, toNeighbors };
