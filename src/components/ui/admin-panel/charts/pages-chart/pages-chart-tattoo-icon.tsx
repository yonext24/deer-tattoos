/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { useIntersect } from '@/hooks/useIntersect'
import { Tattoo } from '@/lib/types/tattoo'
import { appFetch } from '@/lib/utils/appFetch'
import { cn } from '@/lib/utils/utils'
import { useEffect, useState } from 'react'

export function PagesChartTattooIcon({ slug }: { slug: string }) {
  const [data, setData] = useState<Tattoo | null>(null)

  const { fromRef, intersecting: intersected } = useIntersect({ once: true })

  useEffect(() => {
    if (!intersected) return

    appFetch(`/api/tattoo?&slug=${slug}`)
      .then((res) => {
        console.log(res)
        setData(res)
      })
      .catch(() => setData(null))
  }, [intersected])

  console.log({ data })

  return (
    <div
      ref={fromRef}
      className={cn('mr-4 w-[35px] bg-neutral rounded-md overflow-hidden')}
    >
      {(() => {
        if (!slug.includes('/tatuajes')) return null
        if (!intersected || !data) return <Skeleton className="h-full w-full" />
        return (
          <ImageWithBlur
            className="h-full w-full"
            width={50}
            height={50}
            src={data.images.card.src}
            alt="Imaágen de tatuaje"
            withSkeleton
          />
        )
      })()}
    </div>
  )
}
