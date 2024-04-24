import { Main } from '@/components/ui/common/main'
import { Section } from '@/components/ui/common/section'
import { CategoryFilter } from '@/components/ui/shop/category-filter/category-filter'
import { ProductCard } from '@/components/ui/shop/product-card/product-card'
import { client } from '@/lib/shop/client'
import { ShopProduct } from '@/lib/shop/types'
import { SearchParamsType } from '@/lib/types/common'
import { LOGO } from '@/lib/utils/consts'

const generateQuery = (category?: string) => {
  if (!category)
    return `
  *[_type == 'product']{
    "images": images[]{
      ...,
      "url": asset->url,
    },
    description,
    name,
    "slug": slug.current,
    _id,
    price
  }
  `
  return `
  *[_type == 'product' && references(*[_type == 'category' && slug.current == '${category}']._id)]{
    "images": images[]{
      ...,
      "url": asset->url,
    },
    description,
    name,
    "slug": slug.current,
    _id,
    price
  }
  `
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  const products = await client.fetch<ShopProduct[]>(
    generateQuery(searchParams?.category as string),
    {},
    { cache: 'no-cache' }
  )

  return (
    <Main withMarginOnTop className="mx-auto flex flex-col w-full">
      <Section className="min-h-0 py-12 w-full flex flex-col items-center">
        <h2 className="text-7xl text-gold font-title">{LOGO} SHOP</h2>
      </Section>
      <CategoryFilter searchParams={searchParams} />
      <Section className="max-w-[1000px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </Section>
    </Main>
  )
}
