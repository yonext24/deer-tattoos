'use client'

import { Product } from '@/lib/shopify/types'
import { cn } from '@/lib/utils/utils'
import { useTransitionRouter } from 'next-view-transitions'
import Image from 'next/image'
import React from 'react'

export function ProductCard({
  handle,
  title,
  variants,
  featuredImage,
  availableForSale,
  isSmall,
}: Product & { isSmall?: boolean }) {
  const router = useTransitionRouter()
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(`/shop/product/${handle}`, {})
  }
  const isOutOfStock = !availableForSale
  const variantForDisplay = variants[0]
  const variantHasComparePrice = variantForDisplay.compareAtPrice

  return (
    <a
      href={`/shop/product/${handle}`}
      className="h-full w-full group"
      onClick={handleAnchorClick}
    >
      <article className="h-full flex flex-col rounded overflow-hidden">
        <Image
          width={featuredImage.width}
          height={featuredImage.height}
          src={featuredImage.url}
          alt={featuredImage.altText || title}
          style={{ ...(!isSmall && { viewTransitionName: handle }) }}
          className="w-full h-full object-cover rounded-[inherit]"
        />
        <div
          className={cn(
            'flex flex-col justify-center',
            'text-white text-base first:text-xl font-thin',
            isOutOfStock && '!text-neutral-400'
          )}
        >
          <span className="[font-size:1.15rem] group-hover:underline">
            {title}
          </span>
          <span
            className={cn(
              'text-gold flex justify-between',
              isOutOfStock && 'text-neutral-400'
            )}
          >
            <div className="flex gap-2">
              ${variants[0]?.price.amount}
              {variantHasComparePrice && (
                <span className="line-through text-neutral-500">
                  ${variantHasComparePrice.amount}
                </span>
              )}
            </div>
            {isOutOfStock && (
              <span>
                {'('}No Stock{')'}
              </span>
            )}
          </span>
        </div>
      </article>
    </a>
  )
}
