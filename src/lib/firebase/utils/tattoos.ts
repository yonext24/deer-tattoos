import { Tattoo } from '@lib/types/tattoo'
import { sortTats } from '@/lib/utils/sortTats'
import { filterTattoos, paginate } from '@/lib/utils/utils'
import { cache } from 'react'
import { WithPagination } from '@/lib/types/common'
import { appFetch } from '@/lib/utils/appFetch'
import { filterAndPaginateTattoos } from '@backend/utils/tattoos-utils'
import { tattooConverter } from '@backend/converters/tattoo-converter'

const getTattoos = async ({
  search,
  style,
  page = '1',
  size = '8',
}: {
  search?: string
  style?: string | string[]
  page?: string
  size?: string
}): Promise<WithPagination<Tattoo[]>> => {
  const {
    total,
    data,
    page: parsedPage,
  } = await filterAndPaginateTattoos({ search, style }, { page, size })
  const convertedData = tattooConverter(data as [])
  const finalData = sortTats(convertedData)

  return {
    data: finalData,
    page: parsedPage,
    total,
  }
}

const getArtistTattoos = async (
  slug: string,
  {
    search,
    style,
    page = '1',
    size = '8',
  }: {
    search?: string
    style?: string | string[]
    page?: string
    size?: string
  },
): Promise<WithPagination<Tattoo[]>> => {
  const tattoos: Tattoo[] = await appFetch('http://localhost:3000/api/tattoos')

  const filteredByArtist = (tattoos as Tattoo[]).filter(
    (el) => el.artist.slug === slug,
  )
  const filtered = filterTattoos(filteredByArtist, { search, style })

  const {
    data: paginatedTattoos,
    total,
    parsedPage,
  } = paginate(filtered, { page, size })

  const sorted = sortTats(paginatedTattoos)

  return {
    page: parsedPage,
    total,
    data: sorted,
  }
}

const getRankedTattoos = async (): Promise<Tattoo[]> => {
  const tattoos: Tattoo[] = await appFetch('http://localhost:3000/api/tattoos')

  return tattoos
    .map(({ type, ...el }) => ({ ...el, type: type as Tattoo['type'] }))
    .slice(0, 4)
}

const cachedGetTattoos = cache(
  (
    style?: string | string[],
    search?: string,
    page?: string,
    size?: string,
  ) => {
    return getTattoos({ style, search, page, size })
  },
)
const cachedGetRankedTattoos = cache(() => getRankedTattoos())
const cachedGetArtistTattos = cache(
  (
    slug: string,
    {
      style,
      search,
      page,
      size,
    }: {
      style?: string | string[]
      search?: string
      page?: string
      size?: string
    },
  ) => {
    return getArtistTattoos(slug, { style, search, page, size })
  },
)

export {
  cachedGetTattoos as getTattoos,
  cachedGetRankedTattoos as getRankedTattoos,
  cachedGetArtistTattos as getArtistTattoos,
}
