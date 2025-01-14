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
  isSmall,
}: Product & { isSmall?: boolean }) {
  const router = useTransitionRouter()
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(`/shop/product/${handle}`, {})
  }
  return (
    <a
      href={`/shop/product/${handle}`}
      className="h-full w-full"
      onClick={handleAnchorClick}
    >
      <article className="flex h-full border border-border hover:border-gold transition-colors relative group rounded-md">
        <Image
          width={featuredImage.width}
          height={featuredImage.height}
          src={featuredImage.url}
          alt={featuredImage.altText || title}
          className="w-full h-full object-cover"
          style={{ ...(!isSmall && { viewTransitionName: handle }) }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-green-dark/50 backdrop-blur z-10 flex flex-col items-center justify-center
        transition-opacity opacity-0 group-hover:opacity-100"
        >
          <span
            className={cn(
              'text-white text-2xl font-thin text-center',
              isSmall && 'text-xl'
            )}
          >
            {title}
          </span>
          <span
            className={cn(
              'text-white text-2xl font-thin text-center',
              isSmall && 'text-xl'
            )}
          >
            ${variants[0]?.price.amount}
          </span>
        </div>
      </article>
    </a>
  )
}
