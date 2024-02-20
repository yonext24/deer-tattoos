'use client'

import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { useNavigation } from '@/hooks/useNavigation'
import { TattooImage } from '@/lib/types/tattoo'
import { createUrl } from '@/lib/utils/createUrl'
import { cn } from '@/lib/utils/utils'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import Spinner from '../../common/spinner'

export function ExtraImagesCard({
  src,
  blured,
  isSelected,
  index,
  slug,
}: TattooImage & { isSelected: boolean; index: number; slug: string }) {
  const [navigating, setNavigating] = useState<boolean>(false)
  const router = useRouter()

  useNavigation({
    on: {
      routeChanged: () => {
        setNavigating(false)
      },
    },
  })

  const handleClick = useCallback(
    (isSelected: boolean) => {
      if (isSelected) return

      const newParams = new URLSearchParams()
      newParams.set('image', `${index}`)

      setNavigating(true)
      router.replace(createUrl(`/tatuajes/${slug}`, newParams), {
        scroll: false,
      })
    },
    [index, router, slug]
  )

  return (
    <article
      role="button"
      className={cn(
        'border select-none overflow-hidden relative rounded-lg p-0.5 transition-colors h-24 w-24',
        'after:absolute after:transition-colors after:top-0 after:left-0 after:w-full after:h-full',
        isSelected ? 'border-gold' : 'border-transparent',
        isSelected && 'after:bg-black/50',
        !isSelected && 'hover:after:bg-black/20'
      )}
      onClick={() => handleClick(isSelected)}
    >
      <ImageWithBlur
        width={96}
        height={96}
        blurDataURL={blured}
        className="rounded-lg"
        alt="Imágen de tatuaje"
        src={src}
      />
      {navigating && (
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </article>
  )
}
