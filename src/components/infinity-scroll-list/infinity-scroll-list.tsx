import { FlatList, type FlatListProps, RefreshControl } from "react-native";

import { colors } from "@theme";
import { useTranslate } from "@translate";

import { EmptyList, type EmptyListProps } from "./components/empty-list";
import { ListFooter } from "./components/list-footer";

const END_REACHED_THRESHOLD = 0.6;
const emptyContentStyle = { flexGrow: 1 };

type ItemTConstraints = {
  id: number | string;
};

type InfinityScrollListProps<ItemT extends ItemTConstraints> = {
  list: ItemT[];
  renderItem: FlatListProps<ItemT>["renderItem"];
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  isRefreshing: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  flatListProps?: Omit<Partial<FlatListProps<ItemT>>, "data" | "renderItem">;
  emptyListProps?: Partial<Pick<EmptyListProps, "emptyMessage" | "errorMessage">>;
};

export function InfinityScrollList<ItemT extends ItemTConstraints>({
  list,
  renderItem,
  isLoading,
  isError,
  isFetchingNextPage,
  isRefreshing,
  onEndReached,
  onRefresh,
  flatListProps,
  emptyListProps,
}: InfinityScrollListProps<ItemT>) {
  const { t } = useTranslate();
  const isEmpty = list.length === 0;

  return (
    <FlatList
      data={list}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={END_REACHED_THRESHOLD}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      ListEmptyComponent={
        <EmptyList
          isLoading={isLoading}
          isError={isError}
          onRetry={onRefresh}
          emptyMessage={emptyListProps?.emptyMessage ?? t("list.empty")}
          errorMessage={emptyListProps?.errorMessage ?? t("list.error")}
          retryLabel={t("common.retry")}
        />
      }
      ListFooterComponent={
        isEmpty ? null : (
          <ListFooter
            isFetchingNextPage={isFetchingNextPage}
            isError={isError}
            onRetry={onEndReached}
            retryLabel={t("common.retry")}
          />
        )
      }
      {...flatListProps}
      contentContainerStyle={[isEmpty ? emptyContentStyle : undefined, flatListProps?.contentContainerStyle]}
    />
  );
}
