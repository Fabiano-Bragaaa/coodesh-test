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
