import { Tattoo } from '@lib/types/tattoo'
import { sortTats } from '@/lib/utils/sortTats'
import { cache } from 'react'
import { WithPagination } from '@/lib/types/common'
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
  }
): Promise<WithPagination<Tattoo[]>> => {
  const {
    data,
    page: parsedPage,
    total,
  } = await filterAndPaginateTattoos(
    {
      search,
      style,
      artist: slug,
    },
    { page, size }
  )

  const sorted = sortTats(data as Tattoo[])

  return {
    page: parsedPage,
    total,
    data: sorted,
  }
}

const getRankedTattoos = async (): Promise<Tattoo[]> => {
  const { data } = await getTattoos({
    size: '7',
    page: '1',
  })

  return data
}

const cachedGetTattoos = cache(
  (
    style?: string | string[],
    search?: string,
    page?: string,
    size?: string
  ) => {
    return getTattoos({ style, search, page, size })
  }
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
    }
  ) => {
    return getArtistTattoos(slug, { style, search, page, size })
  }
)

export {
  cachedGetTattoos as getTattoos,
  cachedGetRankedTattoos as getRankedTattoos,
  cachedGetArtistTattos as getArtistTattoos,
}
