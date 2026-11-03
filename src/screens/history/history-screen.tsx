import { useNavigation } from "@react-navigation/native";

import { InfinityScrollList, Page, WORD_COLUMNS, WordCell } from "@components";
import { useHistoryList } from "@domain";
import { useAuth } from "@services";
import { useTranslate } from "@translate";

export function HistoryScreen() {
  const { t } = useTranslate();
  const navigation = useNavigation();
  const { user } = useAuth();
  const historyList = useHistoryList(user?.id);

  function openWord(word: string) {
    navigation.navigate("Word", { word });
  }

  return (
    <Page title={t("history.title")} safeTop={false}>
      <InfinityScrollList
        list={historyList.list}
        renderItem={({ item, index }) => <WordCell word={item.word} index={index} onPress={openWord} />}
        isLoading={historyList.isLoading}
        isError={historyList.isError}
        isFetchingNextPage={historyList.isFetchingNextPage}
        isRefreshing={historyList.isRefreshing}
        onEndReached={historyList.fetchNextPage}
        onRefresh={historyList.refresh}
        flatListProps={{ numColumns: WORD_COLUMNS }}
        emptyListProps={{ emptyMessage: t("history.empty") }}
      />
    </Page>
  );
}
