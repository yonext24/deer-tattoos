import { getAllArtists } from '@/lib/backend/utils/artists'
import { getPages } from '@/lib/backend/utils/pages'
import { getCollections, getProducts } from '@/lib/shopify'
import { validateEnvironmentVariables } from '@/lib/utils/utils'
import { filterAndPaginateTattoos } from '@backend/utils/tattoos-utils'
import { MetadataRoute } from 'next'

type Route = {
  url: string
  lastModified: string
}

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables()

  const routesMap = [`/`, `/tatuajes`, `/shop`].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const artistsPromise = getAllArtists().then((artists) =>
    artists.map((artist) => ({
      url: `${baseUrl}/tatuador/${artist.slug}/tatuajes`,
      lastModified: new Date().toISOString(),
    }))
  )

  const tattoosPromise = filterAndPaginateTattoos(
    {},
    { size: 9999, page: 1 }
  ).then((tattoos) =>
    tattoos.data.map((tattoo) => ({
      url: `${baseUrl}/tatuajes/${tattoo.slug}`,
      lastModified: new Date().toISOString(),
    }))
  )

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}/shop${collection.handle === '' ? '' : `?collection=${collection.handle}`}`,
      lastModified: collection.updatedAt,
    }))
  )

  const dinamicPagesPromise = getPages().then((res) =>
    res.map((el) => ({
      url: `${baseUrl}/${el.slug}`,
      lastModified: new Date().toISOString(),
    }))
  )

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt,
    }))
  )

  let fetchedRoutes: Route[] = []

  try {
    fetchedRoutes = (
      await Promise.all([
        tattoosPromise,
        artistsPromise,
        collectionsPromise,
        productsPromise,
        dinamicPagesPromise,
      ])
    ).flat()
  } catch (error) {
    throw JSON.stringify(error, null, 2)
  }

  return [...routesMap, ...fetchedRoutes]
}
