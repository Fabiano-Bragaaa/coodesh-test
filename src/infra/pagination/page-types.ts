export type PageMeta = {
  currentPage: number;
  perPage: number;
  hasNextPage: boolean;
};

export type Page<Data> = {
  meta: PageMeta;
  data: Data[];
};

export type PageParams = {
  page: number;
  perPage: number;
};
