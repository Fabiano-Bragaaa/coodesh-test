import { renderHook, waitFor } from "test-utils";

import { type Page } from "../../pagination/page-types";
import { usePaginatedList } from "../use-paginated-list";

const page1 = ["item1", "item2", "item3"];
const page2 = ["item4", "item5", "item6"];

function getList(page: number): Promise<Page<string>> {
  return Promise.resolve({
    meta: { currentPage: page, perPage: 3, hasNextPage: page === 1 },
    data: page === 1 ? page1 : page2,
  });
}

describe("usePaginatedList", () => {
  it("returns all pages together and stops fetching when there is no next page", async () => {
    const getListSpy = jest.fn(getList);
    const { result } = await renderHook(() => usePaginatedList(["key"], getListSpy));

    await waitFor(() => expect(result.current.list).toStrictEqual(page1));

    result.current.fetchNextPage();

    await waitFor(() => expect(result.current.list).toStrictEqual([...page1, ...page2]));
    expect(result.current.hasNextPage).toBe(false);

    result.current.fetchNextPage();

    await waitFor(() => expect(result.current.list).toStrictEqual([...page1, ...page2]));
    expect(getListSpy).toHaveBeenCalledTimes(2);
  });
});
