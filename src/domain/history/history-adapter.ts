import { type Database } from "@infra";

import { type HistoryEntry } from "./history-types";

type HistoryRow = Pick<Database["public"]["Tables"]["history"]["Row"], "word">;

function toEntry(row: HistoryRow): HistoryEntry {
  return { id: row.word, word: row.word };
}

export const historyAdapter = { toEntry };
