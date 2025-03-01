export const isProduction = process.env.NODE_ENV === 'production'

export const APP_URL = isProduction
  ? process.env.PRODUCTION_URL
  : 'http://localhost:3000'

export const MARCA = '<MARCA>'
export const LOGO = '<LOGO>'

export const NECESARY_AMOUNT_OF_TATTOOS_IN_HOMEPAGE = 18

export const devices = {
  desktop: 'PC',
  'mobile-android': 'Android',
  'mobile-ios': 'iOS',
  bot: 'Bots',
} as const

export const permitedMails = JSON.stringify(
  process.env.PERMITED_MAILS?.split(',')
)

export type SortFilterItem = {
  title: string
  slug: string | null
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE'
  reverse: boolean
}

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false,
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: 'Trending',
    slug: 'trending-desc',
    sortKey: 'BEST_SELLING',
    reverse: false,
  }, // asc
  {
    title: 'Latest arrivals',
    slug: 'latest-desc',
    sortKey: 'CREATED_AT',
    reverse: true,
  },
  {
    title: 'Price: Low to high',
    slug: 'price-asc',
    sortKey: 'PRICE',
    reverse: false,
  }, // asc
  {
    title: 'Price: High to low',
    slug: 'price-desc',
    sortKey: 'PRICE',
    reverse: true,
  },
]

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart',
  data: 'data',
  tattoos: 'tattoos',
  artists: 'artists',
  pages: 'pages',
}

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden'
export const DEFAULT_OPTION = ''
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json'
