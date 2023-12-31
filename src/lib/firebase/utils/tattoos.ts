import { Tattoo } from '@lib/types/tattoo'
import { sortTats } from '@/lib/utils/sortTats'
import tattoos from '../../../../public/tattoos.json'
import { filterTattoos, paginate } from '@/lib/utils/utils'
import { cache } from 'react'
import { WithPagination } from '@/lib/types/common'

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
  await new Promise((res) => {
    setTimeout(res, 2000)
  })

  const filtered = filterTattoos(tattoos as Tattoo[], { search, style })

  const {
    data: paginatedTattoos,
    total,
    parsedPage,
  } = paginate(filtered, { size, page })

  const finalData = sortTats(paginatedTattoos)

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
  await new Promise((res) => {
    setTimeout(res, 500)
  })

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
  await new Promise((res) => {
    setTimeout(res, 500)
  })

  return tattoos
    .map(({ type, ...el }) => ({ ...el, type: type as Tattoo['type'] }))
    .slice(0, 4)
}

const cachedGetTattoos = cache(
  (style?: string | string[], search?: string, page?: string) => {
    return getTattoos({ style, search, page })
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
