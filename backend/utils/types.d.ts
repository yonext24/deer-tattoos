import { WithPagination } from '@/lib/types/common'

export type FilterFuncPropFilterType = {
  search?: string | null
  style?: string | string[] | null
  artist?: string | null
  sortByRanking?: boolean | null
  exclude?: string | null
}
export type FilterFuncPropPaginationType = {
  size?: string | number | null
  page?: string | number | null
}

export type FilterFuncType = (
  a: FilterFuncPropFilterType,
  b: FilterFuncPropPaginationType
) => Promise<WithPagination<Tattoo[]>>
