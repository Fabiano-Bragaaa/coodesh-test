import { useNavigation } from "@react-navigation/native";

import { InfinityScrollList, Page, WORD_COLUMNS, WordCell } from "@components";
import { useFavoriteList } from "@domain";
import { useAuth } from "@services";
import { useTranslate } from "@translate";

export function FavoritesScreen() {
  const { t } = useTranslate();
  const navigation = useNavigation();
  const { user } = useAuth();
  const favoriteList = useFavoriteList(user?.id);

  function openWord(word: string) {
    navigation.navigate("Word", { word });
  }

  return (
    <Page title={t("favorites.title")} safeTop={false}>
      <InfinityScrollList
        list={favoriteList.list}
        renderItem={({ item, index }) => <WordCell word={item.word} index={index} onPress={openWord} />}
        isLoading={favoriteList.isLoading}
        isError={favoriteList.isError}
        isFetchingNextPage={favoriteList.isFetchingNextPage}
        isRefreshing={favoriteList.isRefreshing}
        onEndReached={favoriteList.fetchNextPage}
        onRefresh={favoriteList.refresh}
        flatListProps={{ numColumns: WORD_COLUMNS }}
        emptyListProps={{ emptyMessage: t("favorites.empty") }}
      />
    </Page>
  );
}
