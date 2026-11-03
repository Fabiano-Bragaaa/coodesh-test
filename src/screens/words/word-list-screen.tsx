import { useNavigation } from "@react-navigation/native";

import { InfinityScrollList, Page } from "@components";
import { useWordList } from "@domain";
import { useTranslate } from "@translate";

import { WORD_COLUMNS, WordCell } from "./components/word-cell";

export function WordListScreen() {
  const { t } = useTranslate();
  const navigation = useNavigation();
  const wordList = useWordList();

  function openWord(word: string) {
    navigation.navigate("Word", { word });
  }

  return (
    <Page title={t("words.title")} safeTop={false}>
      <InfinityScrollList
        list={wordList.list}
        renderItem={({ item, index }) => <WordCell word={item} index={index} onPress={openWord} />}
        isLoading={wordList.isLoading}
        isError={wordList.isError}
        isFetchingNextPage={wordList.isFetchingNextPage}
        isRefreshing={wordList.isRefreshing}
        onEndReached={wordList.fetchNextPage}
        onRefresh={wordList.refresh}
        flatListProps={{ numColumns: WORD_COLUMNS }}
        emptyListProps={{ errorMessage: t("words.error") }}
      />
    </Page>
  );
}
