import { FlatList, Pressable, View } from "react-native";

import { Button, ErrorState, LoadingState, Text } from "@components";
import { type Word } from "@domain";
import { useTranslate } from "@translate";

const COLUMNS = 3;
const END_REACHED_THRESHOLD = 0.6;

type WordGridProps = {
  words: Word[];
  isLoading: boolean;
  isFetchingMore: boolean;
  hasError: boolean;
  onRetry: () => void;
  onEndReached: () => void;
  onPressWord: (word: string) => void;
};

type WordCellProps = {
  word: Word;
  onPress: (word: string) => void;
};

function WordCell({ word, onPress }: WordCellProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(word.text)}
      className="h-20 w-1/3 items-center justify-center border-r border-b border-border bg-surface px-2 active:bg-surface-muted">
      <Text numberOfLines={1}>
        {word.text}
      </Text>
    </Pressable>
  );
}

type GridFooterProps = {
  isFetchingMore: boolean;
  hasError: boolean;
  onRetry: () => void;
};

function GridFooter({ isFetchingMore, hasError, onRetry }: GridFooterProps) {
  const { t } = useTranslate();

  if (isFetchingMore) {
    return <LoadingState />;
  }

  if (hasError) {
    return (
      <View className="py-4">
        <Button title={t("common.retry")} variant="outline" onPress={onRetry} />
      </View>
    );
  }

  return null;
}

export function WordGrid({
  words,
  isLoading,
  isFetchingMore,
  hasError,
  onRetry,
  onEndReached,
  onPressWord,
}: WordGridProps) {
  const { t } = useTranslate();

  if (isLoading) {
    return <LoadingState />;
  }

  if (hasError && words.length === 0) {
    return <ErrorState message={t("words.error")} retryLabel={t("common.retry")} onRetry={onRetry} />;
  }

  return (
    <FlatList
      data={words}
      keyExtractor={(word) => String(word.id)}
      numColumns={COLUMNS}
      renderItem={({ item }) => <WordCell word={item} onPress={onPressWord} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={END_REACHED_THRESHOLD}
      ListFooterComponent={<GridFooter isFetchingMore={isFetchingMore} hasError={hasError} onRetry={onEndReached} />}
      className="border-t border-l border-border"
      showsVerticalScrollIndicator
    />
  );
}
