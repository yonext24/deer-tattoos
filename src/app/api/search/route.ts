import { prisma } from '@backend/prisma'

export type SearchResponse = {
  content: string
  type: 'search' | 'category' | 'artist'
  href: string
  image?: string
}[]

export const GET = async (request: Request) => {
  const url = request.url
  const params = new URLSearchParams(url.split('?')[1])
  const query = params.get('q')

  if (!query) {
    return Response.json([] as SearchResponse)
  }

  // @ts-ignore
  const search = (await prisma.tattoo.findRaw({
    filter: {
      $or: [
        { tags: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { styles: { $regex: query, $options: 'i' } },
      ],
    },
    options: {
      projection: { tags: true, styles: true, title: true, _id: false },
      limit: 1,
    },
  })) as { tags: string[]; styles: string[]; title: string }[]

  const parsedSearch = search.flatMap((item) => {
    const arr = []

    const matchesWithStyles = item.styles.filter((style) =>
      new RegExp(query, 'i').test(style)
    )

    if (matchesWithStyles.length > 0) {
      arr.push(
        matchesWithStyles.map((el) => ({
          content: el,
          type: 'category' as SearchResponse[0]['type'],
          href: `/category/${el}`,
        }))
      )
    }

    const matchesWithTags = item.tags.filter((tag) =>
      new RegExp(query, 'i').test(tag)
    )

    if (matchesWithTags.length > 0)
      arr.push(
        matchesWithTags.map((el) => ({
          content: el,
          type: 'category',
          href: `/category/${el}`,
        }))
      )

    const matchesWithTitle = new RegExp(query, 'i').test(item.title)
    if (matchesWithTitle && arr.length === 0)
      return [
        { type: 'search', content: item.title, href: `/search?q=${query}` },
      ]

    return arr.flatMap((el) => el)
  })

  console.log(parsedSearch)

  return Response.json(parsedSearch)
}
