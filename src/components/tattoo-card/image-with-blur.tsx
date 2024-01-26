/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
'use client'

import { cn } from '@/lib/utils/utils'
import Image, { ImageProps } from 'next/image'
import { ForwardedRef, forwardRef, useState } from 'react'
import { CSSTransition } from '../cssTransition/cssTransition'
import { Skeleton } from '../shadcn/ui/skeleton'

export type ImageWithBlurProps = Omit<ImageProps, 'placeholder'> & {
  pictureClassName?: string
  withSkeleton?: boolean
}

export const ImageWithBlur = forwardRef(
  (
    {
      blurDataURL,
      onLoad,
      pictureClassName,
      withSkeleton = false,
      ...props
    }: ImageWithBlurProps,
    ref: ForwardedRef<HTMLImageElement>
  ) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    return (
      <picture className={cn('relative overflow-hidden', pictureClassName)}>
        <Image
          ref={ref}
          placeholder={withSkeleton ? undefined : 'blur'}
          onLoad={(e) => {
            setLoaded(true)
            onLoad?.(e)
          }}
          className={cn(
            'w-full object-center object-cover',
            !loaded && 'opacity-0',
            props.className
          )}
          blurDataURL={blurDataURL}
          {...props}
        />
        <CSSTransition isIn={!loaded} transitionDuration={300}>
          <div
            className={cn(
              'absolute top-0 left-0 h-full w-full z-10 opacity-100 transition-opacity flex bg-black duration-300',
              loaded && 'opacity-0'
            )}
          >
            {withSkeleton ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <img
                src={blurDataURL}
                alt="blured image"
                className={cn('blur-3xl')}
              />
            )}
          </div>
        </CSSTransition>
      </picture>
    )
  }
)
