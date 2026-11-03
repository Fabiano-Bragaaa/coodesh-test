import { dictionaryClient } from "@infra";

import { type EntryJson } from "./entry-types";

async function lookup(word: string): Promise<EntryJson[]> {
  return dictionaryClient.get<EntryJson[]>(`/entries/en/${encodeURIComponent(word)}`);
}

export const entryApi = { lookup };
