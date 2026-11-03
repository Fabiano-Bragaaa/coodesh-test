import { timedFetch } from "@infra";

const DICTIONARY_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";
const NOT_FOUND_STATUS = 404;

export type PhoneticJson = {
  text?: string;
  audio?: string;
};

export type DefinitionJson = {
  definition: string;
  example?: string;
};

export type MeaningJson = {
  partOfSpeech: string;
  definitions: DefinitionJson[];
  synonyms?: string[];
};

export type EntryJson = {
  word: string;
  phonetic?: string;
  phonetics?: PhoneticJson[];
  meanings?: MeaningJson[];
};

async function lookup(word: string): Promise<EntryJson[] | null> {
  const response = await timedFetch(`${DICTIONARY_URL}/${encodeURIComponent(word)}`);

  if (response.status === NOT_FOUND_STATUS) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Dictionary request failed with status ${response.status}`);
  }

  const entries: EntryJson[] = await response.json();

  return entries;
}

export const entryApi = { lookup };
