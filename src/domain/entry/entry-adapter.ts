import { type EntryJson, type EntryLookup, type Meaning, type MeaningJson } from "./entry-types";

function toMeaning(meaning: MeaningJson): Meaning {
  return {
    partOfSpeech: meaning.partOfSpeech,
    definitions: meaning.definitions.map((definition) => ({
      text: definition.definition,
      example: definition.example ?? null,
    })),
    synonyms: meaning.synonyms ?? [],
  };
}

function groupByPartOfSpeech(meanings: Meaning[]): Meaning[] {
  const groups = new Map<string, Meaning>();

  for (const meaning of meanings) {
    const group = groups.get(meaning.partOfSpeech);

    if (group) {
      group.definitions.push(...meaning.definitions);
      group.synonyms = [...new Set([...group.synonyms, ...meaning.synonyms])];
    } else {
      groups.set(meaning.partOfSpeech, { ...meaning, definitions: [...meaning.definitions] });
    }
  }

  return [...groups.values()];
}

function firstPhonetic(entries: EntryJson[]): string | null {
  const phonetics = entries.flatMap((entry) => entry.phonetics ?? []);
  const declared = entries.find((entry) => entry.phonetic)?.phonetic;

  return declared ?? phonetics.find((phonetic) => phonetic.text)?.text ?? null;
}

function firstAudio(entries: EntryJson[]): string | null {
  const phonetics = entries.flatMap((entry) => entry.phonetics ?? []);

  return phonetics.find((phonetic) => phonetic.audio)?.audio ?? null;
}

function toLookup(word: string, entries: EntryJson[]): EntryLookup {
  if (entries.length === 0) {
    return { status: "not-found" };
  }

  return {
    status: "found",
    entry: {
      word: entries[0]?.word ?? word,
      phonetic: firstPhonetic(entries),
      audioUrl: firstAudio(entries),
      meanings: groupByPartOfSpeech(entries.flatMap((entry) => (entry.meanings ?? []).map(toMeaning))),
    },
  };
}

export const entryAdapter = { toLookup };
