import { Tattoo } from '@lib/types/tattoo'
import {
  FilterFuncPropFilterType,
  FilterFuncPropPaginationType,
  FilterFuncType,
} from '@backend/utils/types.d'
import {
  filterAndPaginateTattoos,
  getTattooBySlug,
} from '@backend/utils/tattoos-utils'
import { unstable_cache } from 'next/cache'
import { TAGS } from '@lib/utils/consts'

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

const cachedGetTattooBySlug = unstable_cache(getTattooBySlug, ['tattoo', 'slug'], { tags: [TAGS.tattoos] })
const cachedGetTattoos = unstable_cache(getTattoos, ['tattoo'], { tags: [TAGS.tattoos] })
const cachedGetRankedTattoos = unstable_cache(getRankedTattoos, ['tattoo', 'ranked'], { tags: [TAGS.tattoos] })
const cachedGetArtistTattos = unstable_cache(getArtistTattoos, ['tattoo', 'artist'], { tags: [TAGS.tattoos] })

export {
  cachedGetTattoos as getTattoos,
  cachedGetRankedTattoos as getRankedTattoos,
  cachedGetArtistTattos as getArtistTattoos,
  cachedGetTattooBySlug as getTattooBySlug,
}
