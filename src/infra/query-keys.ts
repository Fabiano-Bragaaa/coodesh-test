export const queryKeys = {
  words: {
    list: ["words", "list"],
    neighbors: (word: string) => ["words", "neighbors", word],
  },
  entry: {
    one: (word: string) => ["entry", word],
  },
};
