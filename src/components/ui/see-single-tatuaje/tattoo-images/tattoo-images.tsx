/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { ExtraImages } from '../extra-images/extra-images'
import { Tattoo } from '@/lib/types/tattoo'
import { useEffect, useMemo, useState } from 'react'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'

export function TattooImages({ tattoo }: { tattoo: Tattoo }) {
  const searchParams = useSearchParams()

  const [selectedIndex, setSelectedIndex] = useState<number>(() => {
    return safeGetParams(searchParams, tattoo)
  })

  useEffect(() => {
    setSelectedIndex(safeGetParams(searchParams, tattoo))
  }, [searchParams.get('image')])

  const image = useMemo(() => {
    return tattoo.images.images[selectedIndex - 1]
  }, [selectedIndex])

  return (
    <>
      <ExtraImages
        slug={tattoo.slug}
        images={tattoo.images.images}
        selectedIndex={selectedIndex}
      />

      <ImageWithBlur
        pictureClassName="w-full"
        alt="Image"
        src={image.src}
        height={image.height}
        width={image.width}
        blurDataURL={image.blured}
        className="w-full max-w-auto max-h-auto"
      />
    </>
  )
}

const safeGetParams = (
  searchParams: ReadonlyURLSearchParams,
  tattoo: Tattoo
) => {
  const image = searchParams.get('image')

  const parsed = image ? parseInt(image) : 1
  const isValid = parsed >= 1 && parsed <= tattoo.images.images.length
  return isValid ? parsed : 1
}
