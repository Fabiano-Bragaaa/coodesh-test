export type Definition = {
  text: string;
  example: string | null;
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
};

export type Entry = {
  word: string;
  phonetic: string | null;
  audioUrl: string | null;
  meanings: Meaning[];
};

export type EntryLookup =
  | { status: "found"; entry: Entry }
  | { status: "not-found" };
