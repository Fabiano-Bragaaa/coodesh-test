export const queryKeys = {
  words: {
    list: ["words", "list"],
    neighbors: (word: string) => ["words", "neighbors", word],
  },
  entry: {
    one: (word: string) => ["entry", word],
  },
  favorites: {
    list: (userId: string | undefined) => ["favorites", "list", userId],
    one: (userId: string | undefined, word: string) => ["favorites", "one", userId, word],
  },
  history: {
    list: (userId: string | undefined) => ["history", "list", userId],
  },
};
