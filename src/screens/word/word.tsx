import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";

import { Page } from "@components";
import { useEntry, useWordNeighbors } from "@domain";
import { type AppStackParamList } from "@routes";

import { WordHero } from "./components/word-hero";
import { WordMeanings } from "./components/word-meanings";
import { WordSteps } from "./components/word-steps";
import { useWordFavorite } from "./hooks/use-word-favorite";
import { useWordHistory } from "./hooks/use-word-history";

type WordScreenProps = NativeStackScreenProps<AppStackParamList, "Word">;

export function WordScreen({ route, navigation }: WordScreenProps) {
  const { word } = route.params;
  const entry = useEntry(word);
  const neighbors = useWordNeighbors(word);
  const favorite = useWordFavorite(word);
  useWordHistory(word);
  const found = entry.data?.status === "found" ? entry.data.entry : null;

  function showWord(nextWord: string) {
    navigation.setParams({ word: nextWord });
  }

  return (
    <Page onClose={navigation.goBack}>
      <View className="flex-1 gap-5">
        <WordHero
          word={found?.word ?? word}
          phonetic={found?.phonetic ?? null}
          favorite={favorite.favorite}
          onToggleFavorite={favorite.toggle}
        />
        <WordMeanings
          lookup={entry.data}
          isLoading={entry.isLoading}
          isError={entry.error !== null}
          onRetry={entry.refetch}
        />
      </View>
      <WordSteps
        previous={neighbors.data?.previous ?? null}
        next={neighbors.data?.next ?? null}
        onSelect={showWord}
      />
    </Page>
  );
}
