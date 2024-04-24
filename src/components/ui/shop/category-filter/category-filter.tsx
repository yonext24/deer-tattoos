import { SearchParamsType } from '@/lib/types/common'
import { Section } from '../../common/section'
import { client } from '@/lib/shop/client'
import { ShopCategory } from '@/lib/shop/types'
import Link from 'next/link'
import React from 'react'
import { Dot } from 'lucide-react'

export async function CategoryFilter({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  const categories = await client.fetch<ShopCategory[]>(
    `*[_type == "category"]{
      "slug": slug.current,
      name
    }`,
    {},
    { cache: 'no-cache' }
  )

  return (
    <Section className="min-h-0 border-b border-border flex mb-4 w-full">
      <div className="flex gap-1 mx-auto mb-1">
        {[{ name: 'Todos', slug: '' }, ...categories].map((category, i) => (
          <React.Fragment key={category.slug}>
            <Link
              href={
                !category.slug ? '/shop' : `/shop?category=${category.slug}`
              }
              data-is-current={categoryMatcher(
                category.slug,
                searchParams?.category as string
              )}
              className="text-xl transition-colors [line-height:1.3rem] font-thin text-white hover:text-gold-dark data-[is-current=true]:border-b
              data-[is-current=true]:text-gold border-gold"
            >
              {category.name}
            </Link>
            {i !== categories.length && (
              <div className="text-2xl font-thin text-border flex items-center select-none">
                <Dot />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Section>
  )
}

function categoryMatcher(
  categorySlug: string,
  categoryQuery: string | undefined
) {
  if (!categorySlug && !categoryQuery) return true
  if (categorySlug === categoryQuery) return true
  return false
}
