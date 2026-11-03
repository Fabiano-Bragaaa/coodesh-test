import { isNotFound } from "@infra";

import { entryAdapter } from "./entry-adapter";
import { entryApi } from "./entry-api";
import { type EntryLookup } from "./entry-types";

async function lookup(word: string): Promise<EntryLookup> {
  try {
    return entryAdapter.toLookup(word, await entryApi.lookup(word));
  } catch (error) {
    if (isNotFound(error)) {
      return { status: "not-found" };
    }

    throw error;
  }
}

export const entryService = { lookup };
