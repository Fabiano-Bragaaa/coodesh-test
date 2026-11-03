import { useNavigation } from "@react-navigation/native";

import { Page } from "@components";
import { useWordList } from "@domain";
import { useTranslate } from "@translate";

import { WordGrid } from "./components/word-grid";

export function WordListScreen() {
  const { t } = useTranslate();
  const navigation = useNavigation();
  const wordList = useWordList();

  return (
    <Page title={t("words.title")} safeTop={false}>
      <WordGrid
        words={wordList.list}
        isLoading={wordList.isLoading}
        isFetchingNextPage={wordList.isFetchingNextPage}
        isError={wordList.isError}
        onRetry={wordList.refresh}
        onEndReached={wordList.fetchNextPage}
        onPressWord={(word) => navigation.navigate("Word", { word })}
      />
    </Page>
  );
}
