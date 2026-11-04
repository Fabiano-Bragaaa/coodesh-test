import { useNavigation } from "@react-navigation/native";

import { Button, Icon, InfinityScrollList, Page } from "@components";
import { useSignOut, useWordList } from "@domain";
import { useTranslate } from "@translate";

import { WORD_COLUMNS, WordCell } from "./components/word-cell";

export function WordListScreen() {
  const { t } = useTranslate();
  const navigation = useNavigation();
  const wordList = useWordList();
  const signOut = useSignOut();

  function openWord(word: string) {
    navigation.navigate("Word", { word });
  }

  function signOutUser() {
    signOut.mutate();
  }

  return (
    <Page
      title={t("words.title")}
      safeTop={false}
      rightComponent={
        <Button
          title={t("auth.signOut")}
          variant="ghost"
          size="icon"
          leftComponent={<Icon name="LogOut" size={20} />}
          isLoading={signOut.isLoading}
          onPress={signOutUser}
        />
      }>
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
