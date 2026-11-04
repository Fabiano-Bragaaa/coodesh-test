import { entryAdapter } from "../entry-adapter";
import { type EntryJson } from "../entry-types";

describe("entryAdapter.toLookup", () => {
  it("returns not-found when the dictionary has no entries", () => {
    expect(entryAdapter.toLookup("hello", [])).toStrictEqual({ status: "not-found" });
  });

  it("groups the meanings of every entry by part of speech", () => {
    const entries: EntryJson[] = [
      {
        word: "run",
        meanings: [
          { partOfSpeech: "verb", definitions: [{ definition: "To move fast." }], synonyms: ["sprint"] },
          { partOfSpeech: "noun", definitions: [{ definition: "An act of running." }] },
        ],
      },
      {
        word: "run",
        meanings: [{ partOfSpeech: "verb", definitions: [{ definition: "To manage." }], synonyms: ["sprint", "manage"] }],
      },
    ];

    expect(entryAdapter.toLookup("run", entries)).toStrictEqual({
      status: "found",
      entry: {
        word: "run",
        phonetic: null,
        audioUrl: null,
        meanings: [
          {
            partOfSpeech: "verb",
            definitions: [
              { text: "To move fast.", example: null },
              { text: "To manage.", example: null },
            ],
            synonyms: ["sprint", "manage"],
          },
          { partOfSpeech: "noun", definitions: [{ text: "An act of running.", example: null }], synonyms: [] },
        ],
      },
    });
  });

  it("takes the first phonetic text and the first non-empty audio", () => {
    const entries: EntryJson[] = [
      { word: "aardwolf", phonetics: [{ text: "/ˈɑːdwʊlf/", audio: "" }] },
      { word: "aardwolf", phonetics: [{ text: "/ˈɑɹdwʊlf/", audio: "https://example.com/aardwolf-us.mp3" }] },
    ];

    expect(entryAdapter.toLookup("aardwolf", entries)).toMatchObject({
      status: "found",
      entry: { phonetic: "/ˈɑːdwʊlf/", audioUrl: "https://example.com/aardwolf-us.mp3" },
    });
  });

  it("returns no phonetic and no audio when the entry has neither", () => {
    expect(entryAdapter.toLookup("word", [{ word: "word", phonetics: [{ text: "", audio: "" }] }])).toMatchObject({
      status: "found",
      entry: { phonetic: null, audioUrl: null },
    });
  });
});
