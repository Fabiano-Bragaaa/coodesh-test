import { Text } from "react-native";
import { fireEvent, render, screen } from "test-utils";

import { InfinityScrollList } from "../infinity-scroll-list";

type Item = {
  id: number;
  label: string;
};

type ListState = {
  list?: Item[];
  isLoading?: boolean;
  isError?: boolean;
  onRefresh?: () => void;
};

function renderList({ list = [], isLoading = false, isError = false, onRefresh = jest.fn() }: ListState) {
  return render(
    <InfinityScrollList
      list={list}
      renderItem={({ item }) => <Text>{item.label}</Text>}
      isLoading={isLoading}
      isError={isError}
      isFetchingNextPage={false}
      isRefreshing={false}
      onEndReached={jest.fn()}
      onRefresh={onRefresh}
      emptyListProps={{ emptyMessage: "Nenhuma palavra" }}
    />,
  );
}

function findSpinners() {
  return screen.container.queryAll((element) => element.type === "ActivityIndicator");
}

describe("<InfinityScrollList />", () => {
  it("shows a spinner while the first page loads", async () => {
    await renderList({ isLoading: true });

    expect(findSpinners()).toHaveLength(1);
    expect(screen.queryByText("Nenhuma palavra")).not.toBeOnTheScreen();
  });

  it("shows the error with a retry that refreshes the list", async () => {
    const onRefresh = jest.fn();

    await renderList({ isError: true, onRefresh });

    expect(screen.getByText("Não conseguimos carregar a lista. Confira sua conexão.")).toBeOnTheScreen();

    await fireEvent.press(screen.getByRole("button", { name: "Tentar de novo" }));

    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it("shows the empty message when there are no items", async () => {
    await renderList({});

    expect(screen.getByText("Nenhuma palavra")).toBeOnTheScreen();
  });

  it("renders the items", async () => {
    await renderList({
      list: [
        { id: 1, label: "hello" },
        { id: 2, label: "world" },
      ],
    });

    expect(screen.getByText("hello")).toBeOnTheScreen();
    expect(screen.getByText("world")).toBeOnTheScreen();
    expect(screen.queryByText("Nenhuma palavra")).not.toBeOnTheScreen();
  });
});
