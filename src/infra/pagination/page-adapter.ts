import { type Page, type PageParams } from "./page-types";

function toPage<Row, Model>(rows: Row[], params: PageParams, toModel: (row: Row) => Model): Page<Model> {
  return {
    meta: {
      currentPage: params.page,
      perPage: params.perPage,
      hasNextPage: rows.length === params.perPage,
    },
    data: rows.map(toModel),
  };
}

export const pageAdapter = { toPage };
