import { Tattoo } from '@lib/types/tattoo'
import { cache } from 'react'
import {
  FilterFuncPropFilterType,
  FilterFuncPropPaginationType,
  FilterFuncType,
} from '@backend/utils/types.d'
import {
  filterAndPaginateTattoos,
  getTattooBySlug,
} from '@backend/utils/tattoos-utils'

const getTattoos: FilterFuncType = filterAndPaginateTattoos

const getArtistTattoos = (
  artistSlug: string,
  a: FilterFuncPropFilterType,
  b: FilterFuncPropPaginationType
) => {
  return getTattoos({ ...a, artist: artistSlug }, b) // This is to ensure that artistSlug is not optional
}

const getRankedTattoos = async (): Promise<Tattoo[]> => {
  const { data } = await getTattoos(
    { sortByRanking: true },
    { page: 1, size: 18 }
  )

  return data
}

const cachedGetTattooBySlug = cache(getTattooBySlug)
const cachedGetTattoos = cache(getTattoos)
const cachedGetRankedTattoos = cache(getRankedTattoos)
const cachedGetArtistTattos = cache(getArtistTattoos)

export {
  cachedGetTattoos as getTattoos,
  cachedGetRankedTattoos as getRankedTattoos,
  cachedGetArtistTattos as getArtistTattoos,
  cachedGetTattooBySlug as getTattooBySlug,
}
