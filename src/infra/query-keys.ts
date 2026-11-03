export const queryKeys = {
  words: {
    all: ["words"],
    page: (page: number) => ["words", "page", page],
  },
  entry: {
    one: (word: string) => ["entry", word],
  },
};
