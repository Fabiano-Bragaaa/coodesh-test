export type Word = {
  id: number;
  text: string;
};

export type WordPage = {
  words: Word[];
  nextCursor: number | null;
};

export type WordNeighbors = {
  previous: string | null;
  next: string | null;
};
