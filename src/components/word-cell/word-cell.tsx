import { Pressable } from "react-native";

import { twMerge } from "@utils";

import { Text } from "../text/text";

export const WORD_COLUMNS = 3;

type WordCellProps = {
  word: string;
  index: number;
  onPress: (word: string) => void;
};

export function WordCell({ word, index, onPress }: WordCellProps) {
  const firstRow = index < WORD_COLUMNS;
  const firstColumn = index % WORD_COLUMNS === 0;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(word)}
      className={twMerge(
        "h-20 w-1/3 items-center justify-center border-r border-b border-border bg-surface px-2 active:bg-surface-muted",
        firstRow && "border-t",
        firstColumn && "border-l",
      )}>
      <Text numberOfLines={1}>{word}</Text>
    </Pressable>
  );
}
