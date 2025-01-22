import { Main } from '@/components/ui/common/main'
import { Section } from '@/components/ui/common/section'
import { CategoryFilter } from '@/components/ui/shop/category-filter/category-filter'
import { ProductCard } from '@/components/ui/shop/product-card/product-card'
import { getCollectionProducts, getProducts } from '@/lib/shopify'
import { Product } from '@/lib/shopify/types'
import { SearchParamsType } from '@/lib/types/common'
import { LOGO } from '@/lib/utils/consts'
import { sortWithoutStockToEnd } from '@/lib/utils/utils'
import { Link } from 'next-view-transitions'

export const metadata = {
  description: 'Página de venta de productos de tatuajes.',
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  let products: Product[] = []
  const withSearch =
    searchParams.search && typeof searchParams.search === 'string'
  if (searchParams.category && !Array.isArray(searchParams.category)) {
    products = await getCollectionProducts({
      collection: searchParams.category,
    })
  } else {
    const withQuery = withSearch ? { query: searchParams.search } : {}
    products = await getProducts(withQuery as { query: string })
  }
  products.sort(sortWithoutStockToEnd)

  return (
    <>
      <Section className="min-h-0 py-12 w-full flex flex-col items-center">
        <h2 className="text-7xl text-gold font-title">
          <span className="block ml-4 md:ml-12">{LOGO}</span>
          <span className="block ml-auto">SHOP</span>
        </h2>
      </Section>
      <CategoryFilter searchParams={searchParams} />
      <Section className="max-w-none w-full py-4">
        {withSearch && (
          <div className="max-w-[1200px] text-sm xs:text-base sm:text-lg grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-1 font-thin text-center -mt-2 mb-1 w-full">
            <div className="hidden sm:block"></div>
            <h4 className="text-center">
              Estas buscando: {searchParams.search}
            </h4>
            <Link href="/shop" className="underline justify-self-end">
              Limpiar búsqueda
            </Link>
          </div>
        )}
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </Section>
    </>
  )
}

// export async function generateMetadata(props: {
//   params: Promise<{ page: string }>
// }): Promise<Metadata> {
//   const params = await props.params
//   console.log({ params })
//   const page = await getPage(params.page)
//   console.log({ page, params })

//   if (!page) return notFound()

//   return {
//     title: page.seo?.title || page.title,
//     description: page.seo?.description || page.bodySummary,
//     openGraph: {
//       publishedTime: page.createdAt,
//       modifiedTime: page.updatedAt,
//       type: 'article',
//     },
//   }
// }
