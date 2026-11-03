export type Favorite = {
  id: string;
  word: string;
};

export type ToggleFavoriteInput = {
  word: string;
  favorite: boolean;
};
