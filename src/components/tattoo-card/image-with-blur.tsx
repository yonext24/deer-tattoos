/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
'use client'

import { cn } from '@/lib/utils/utils'
import Image, { ImageProps } from 'next/image'
import { ForwardedRef, forwardRef, useState } from 'react'

export type ImageWithBlurProps = Omit<ImageProps, 'placeholder'> & {}

export const ImageWithBlur = forwardRef(
  (
    { blurDataURL, onLoad, ...props }: ImageWithBlurProps,
    ref: ForwardedRef<HTMLImageElement>,
  ) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    return (
      <>
        <Image
          ref={ref}
          placeholder="blur"
          onLoad={(e) => {
            setLoaded(true)
            onLoad?.(e)
          }}
          className={cn(
            'w-full object-center object-cover',
            !loaded && 'opacity-0',
            props.className,
          )}
          blurDataURL={blurDataURL}
          {...props}
        />
        <img
          src={blurDataURL}
          alt="blured image"
          className={cn(
            'absolute top-0 left-0 h-full w-full z-10 opacity-100 transition-opacity blur-3xl duration-200',
            loaded && 'opacity-0',
          )}
        />
      </>
    )
  },
)
