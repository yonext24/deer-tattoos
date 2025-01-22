/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Product } from '@/lib/shopify/types'
import { createUrl } from '@/lib/utils/createUrl'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { ImageZoomOnHover } from './image-zoom-on-hover'

export function ProductImages(product: Product) {
  const { images, handle } = product
  const params = useSearchParams()
  const router = useRouter()

  const imageParam = params.get('image')

  const selectedImage = useMemo(() => {
    if (!imageParam) return images[0]
    const parsedImageParam = Number(imageParam)
    if (isNaN(parsedImageParam)) return images[0]
    if (parsedImageParam - 1 < 0 || parsedImageParam - 1 >= images.length)
      return images[0]
    return images[parsedImageParam - 1]
  }, [imageParam])

  return (
    <div className="flex flex-col gap-2 sticky top-[calc(var(--navbar-height)+1rem)]">
      <ImageZoomOnHover handle={handle} image={selectedImage} defaultZoom={2} />
      <div className="flex gap-2">
        {images.length >= 2 &&
          images.map((img, i) => {
            const isCurrentImageSelected = img.url === selectedImage.url
            return (
              <button
                key={img.url}
                data-selected={isCurrentImageSelected}
                className="flex items-center justify-center border border-border rounded-md group relative data-[selected=true]:border-gold"
                onClick={() => {
                  router.push(
                    createUrl(`/shop/product/${handle}`, { image: `${i + 1}` }),
                    {
                      scroll: false,
                    }
                  )
                }}
              >
                <Image
                  height={75}
                  width={75}
                  src={img.url}
                  alt={img.altText}
                  data-selected={isCurrentImageSelected}
                  // style={{ viewTransitionName: handle }}
                  className={
                    'rounded-md scale-90 group-hover:scale-100 transition-transform data-[selected=true]:scale-100'
                  }
                />
                {isCurrentImageSelected && (
                  <div className="absolute top-0 left-0 w-full h-full bg-green/50 backdrop-blur-[1px]" />
                )}
              </button>
            )
          })}
      </div>
    </div>
  )
}
