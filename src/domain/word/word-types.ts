export type Word = {
  id: number;
  text: string;
};

export type WordNeighbors = {
  previous: string | null;
  next: string | null;
};
