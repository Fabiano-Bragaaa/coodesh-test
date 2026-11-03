import { useNavigation } from "@react-navigation/native";

import { Page } from "@components";
import { useWordList } from "@domain";
import { useTranslate } from "@translate";

import { WordGrid } from "./components/word-grid";

export function WordListScreen() {
  const { t } = useTranslate();
  const navigation = useNavigation();
  const list = useWordList();

  return (
    <Page title={t("words.title")} safeTop={false}>
      <WordGrid
        words={list.words}
        isLoading={list.isLoading}
        isFetchingMore={list.isFetchingMore}
        hasError={list.error !== null}
        onRetry={list.refetch}
        onEndReached={list.fetchMore}
        onPressWord={(word) => navigation.navigate("Word", { word })}
      />
    </Page>
  );
}
