import { SearchParamsType } from '@/lib/types/common'
import { Section } from '../../common/section'
import { Link } from 'next-view-transitions'
import React from 'react'
import { Dot } from 'lucide-react'
import { getCollections } from '@/lib/shopify'

export async function CategoryFilter({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  const categories = await getCollections()

  return (
    <Section className="min-h-0 border-b border-border flex w-full">
      <div className="flex gap-1 mx-auto mb-1">
        {categories.map((category, i) => (
          <React.Fragment key={category.handle}>
            <Link
              href={
                !category.handle ? '/shop' : `/shop?category=${category.handle}`
              }
              data-is-current={categoryMatcher(
                category.handle,
                searchParams?.category as string
              )}
              className="text-xl transition-colors [line-height:1.3rem] font-thin text-white hover:text-green-light data-[is-current=true]:border-b
              data-[is-current=true]:text-gold border-gold"
            >
              {category.title}
            </Link>
            {i !== categories.length - 1 && (
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
