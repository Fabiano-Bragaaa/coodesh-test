import { ScrollView, View } from "react-native";

import { EmptyState, ErrorState, LoadingState, Text } from "@components";
import { type EntryLookup, type Meaning } from "@domain";
import { useTranslate } from "@translate";

type WordMeaningsProps = {
  lookup: EntryLookup | undefined;
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
};

type MeaningBlockProps = {
  meaning: Meaning;
};

function MeaningBlock({ meaning }: MeaningBlockProps) {
  const { t } = useTranslate();

  return (
    <View className="gap-2">
      <Text variant="label-sm" className="text-primary">
        {meaning.partOfSpeech}
      </Text>
      {meaning.definitions.map((definition, index) => (
        <View key={`${meaning.partOfSpeech}-${index}`} className="gap-1">
          <Text variant="body-md">{`${index + 1}. ${definition.text}`}</Text>
          {definition.example ? (
            <Text variant="body-md" className="text-text-muted italic">
              {t("word.example", { example: definition.example })}
            </Text>
          ) : null}
        </View>
      ))}
      {meaning.synonyms.length > 0 ? (
        <Text variant="body-md" className="text-text-muted">
          {t("word.synonyms", { synonyms: meaning.synonyms.join(", ") })}
        </Text>
      ) : null}
    </View>
  );
}

export function WordMeanings({ lookup, isLoading, hasError, onRetry }: WordMeaningsProps) {
  const { t } = useTranslate();

  if (isLoading) {
    return <LoadingState />;
  }

  if (hasError || !lookup) {
    return <ErrorState message={t("word.error")} retryLabel={t("common.retry")} onRetry={onRetry} />;
  }

  if (lookup.status === "not-found") {
    return <EmptyState message={t("word.notFound")} />;
  }

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-5 pb-4" showsVerticalScrollIndicator={false}>
      <Text variant="title-lg">{t("word.meanings")}</Text>
      {lookup.entry.meanings.map((meaning, index) => (
        <MeaningBlock key={`${meaning.partOfSpeech}-${index}`} meaning={meaning} />
      ))}
    </ScrollView>
  );
}
