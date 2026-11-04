import { HttpError } from "@infra";
import { renderHook, waitFor } from "test-utils";

import { entryApi } from "../../entry-api";
import { type EntryJson } from "../../entry-types";
import { useEntry } from "../use-entry";

const helloJson: EntryJson[] = [
  {
    word: "hello",
    phonetic: "/həˈləʊ/",
    phonetics: [{ text: "/həˈləʊ/", audio: "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3" }],
    meanings: [{ partOfSpeech: "noun", definitions: [{ definition: "A greeting.", example: "Hello, everyone." }] }],
  },
];

describe("useEntry", () => {
  it("returns the entry found in the dictionary", async () => {
    jest.spyOn(entryApi, "lookup").mockResolvedValueOnce(helloJson);

    const { result } = await renderHook(() => useEntry("hello"));

    await waitFor(() => expect(result.current.data?.status).toBe("found"));

    expect(entryApi.lookup).toHaveBeenCalledWith("hello");
    expect(result.current.data).toStrictEqual({
      status: "found",
      entry: {
        word: "hello",
        phonetic: "/həˈləʊ/",
        audioUrl: "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
        meanings: [
          { partOfSpeech: "noun", definitions: [{ text: "A greeting.", example: "Hello, everyone." }], synonyms: [] },
        ],
      },
    });
  });

  it("returns not-found when the dictionary answers 404", async () => {
    jest.spyOn(entryApi, "lookup").mockRejectedValueOnce(new HttpError(404));

    const { result } = await renderHook(() => useEntry("qwertyuiop"));

    await waitFor(() => expect(result.current.data).toStrictEqual({ status: "not-found" }));

    expect(result.current.error).toBeNull();
  });

  it("returns the error when the request fails for another reason", async () => {
    const serverError = new HttpError(500);
    jest.spyOn(entryApi, "lookup").mockRejectedValueOnce(serverError);

    const { result } = await renderHook(() => useEntry("hello"));

    await waitFor(() => expect(result.current.error).toBe(serverError));

    expect(result.current.data).toBeUndefined();
  });
});
