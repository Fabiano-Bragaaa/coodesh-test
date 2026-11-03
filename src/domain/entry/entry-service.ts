import { entryAdapter } from "./entry-adapter";
import { entryApi } from "./entry-api";
import { type EntryLookup } from "./entry-types";

async function lookup(word: string): Promise<EntryLookup> {
  return entryAdapter.toLookup(word, await entryApi.lookup(word));
}

export const entryService = { lookup };
