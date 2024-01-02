import tattoos from '../../../../public/tattoos.json'
import categories from '../../../../public/categories.json'
import artists from '../../../../public/tatuadores.json'

export type SearchResponse = {
  content: string
  type: 'search' | 'category' | 'artist'
  href: 'string'
  image?: string
}[]

export const GET = (request: Request) => {
  const url = request.url
  const params = new URLSearchParams(url.split('?')[1])
  const query = params.get('q')

  if (!query) {
    return Response.json([] as SearchResponse)
  }

  const search = tattoos
    .map((tattoo) => tattoo.tags)
    .flat()
    .filter((tag) => {
      return tag.toLowerCase().includes(query.toLowerCase())
    })
    .map((el) => ({ content: el, type: 'search', href: `/search?q=${el}` }))

  const cats = categories
    .filter((cat) => {
      const toFilter = [cat.name, ...cat.variants]
      return toFilter.some((el) =>
        el.toLowerCase().includes(query.toLowerCase()),
      )
    })
    .map((el) => {
      return {
        content: el.name,
        type: 'category',
        href: `/category/${el.name}`,
      }
    })
    .slice(0, 4)

  const arts = artists
    .filter((art) => {
      return art.name.toLowerCase().includes(query.toLowerCase())
    })
    .map((el) => {
      return {
        content: el.name,
        type: 'artist',
        href: `/tatuador/${el.slug}/tatuajes`,
        image: el.images.profile,
      }
    })

  const res = search.concat(cats).concat(arts) as SearchResponse
  return Response.json(res)
}
