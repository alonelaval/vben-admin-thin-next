export interface BasicPageParams {
  currentPage: number;
  pageNum: number;
}
export interface BasicFetchResult<T> {
  data: T;
}

export interface BasicListFetchResult<T> {
  data: T[];
  totalCount: number;
}
