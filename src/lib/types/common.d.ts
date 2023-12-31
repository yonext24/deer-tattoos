export type SearchParamsType = { [key: string]: string | string[] | undefined }

export type WithPagination<T> = {
  page: number
  total: number
  data: T
}
