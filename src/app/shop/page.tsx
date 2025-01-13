import { Main } from '@/components/ui/common/main'
import { Section } from '@/components/ui/common/section'
import { CategoryFilter } from '@/components/ui/shop/category-filter/category-filter'
import { ProductCard } from '@/components/ui/shop/product-card/product-card'
import { getCollectionProducts, getProducts } from '@/lib/shopify'
import { Product } from '@/lib/shopify/types'
import { SearchParamsType } from '@/lib/types/common'
import { LOGO } from '@/lib/utils/consts'

export const metadata = {
  description: 'Página de venta de productos de tatuajes.',
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  let products: Product[] = []
  if (searchParams.category && !Array.isArray(searchParams.category)) {
    products = await getCollectionProducts({
      collection: searchParams.category,
    })
  } else {
    products = await getProducts({})
  }

  return (
    <Main withMarginOnTop className="mx-auto flex flex-col w-full">
      <Section className="min-h-0 py-12 w-full flex flex-col items-center">
        <h2 className="text-7xl text-gold font-title">{LOGO} SHOP</h2>
      </Section>
      <CategoryFilter searchParams={searchParams} />
      <Section className="max-w-[1000px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </Section>
    </Main>
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
