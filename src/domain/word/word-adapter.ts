import { type Database } from "@infra";

import { type Word, type WordNeighbors, type WordPage } from "./word-types";

type WordRow = Pick<Database["public"]["Tables"]["words"]["Row"], "id" | "word">;
type NeighborsRow = Database["public"]["Functions"]["word_neighbors"]["Returns"][number];

function toWordPage(rows: WordRow[], size: number): WordPage {
  const words: Word[] = rows.map((row) => ({ id: row.id, text: row.word }));
  const last = words.at(-1);

  return {
    words,
    nextCursor: last && words.length === size ? last.id : null,
  };
}

function toNeighbors(rows: NeighborsRow[]): WordNeighbors {
  const row = rows[0];

  return {
    previous: row?.previous ?? null,
    next: row?.next ?? null,
  };
}

export const wordAdapter = { toWordPage, toNeighbors };
