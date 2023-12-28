'use client'

import { useIntersect } from '@/hooks/useIntersect'
import { Section } from '../common/section'
import { cn } from '@/lib/utils/utils'
import { Button } from '@/components/shadcn/ui/button'
import Image from 'next/image'
import tattoos from '../../../../public/tattoos.json'
import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'

export function Tattoos() {
  const { intersecting, fromRef } = useIntersect({
    once: true,
    rootMargin: '-100px',
  })

  return (
    <Section ref={fromRef} className="grid grid-cols-[1fr_1fr] gap-4">
      <div className="flex flex-col justify-center">
        <h3 className="text-6xl">Los mejores tatuajes de Lanús</h3>
        <span className="mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          incidunt ratione id labore fuga dignissimos ducimus sed eaque in
          laborum minima, at nulla impedit fugiat? Vitae quam magnam atque
          totam?
        </span>
        <Button
          variant={'outline'}
          className="mb-24 self-start mt-6 text-lg py-4 px-7 font-thin"
        >
          Ver más
        </Button>
      </div>
      <div className="h-full w-full flex">
        <div className="grid grid-cols-2 gap-4 py-2 pr-2 m-auto flex-1">
          {Array.from({ length: 4 }).map((_, index) => {
            const tattoo = tattoos[index]
            return (
              <article
                key={index}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={cn(
                  'rounded opacity-0 transition-opacity duration-300 relative overflow-hidden group cursor-pointer aspect-square w-full h-full',
                  intersecting && 'opacity-100',
                )}
              >
                <ImageWithBlur
                  src={tattoo.image}
                  blurDataURL={tattoo.bluredImg}
                  alt="image"
                  layout="fill"
                />
                <div
                  className="absolute top-0 left-0 w-full h-full z-10 opacity-0 flex items-center justify-center duration-300
              bg-green-dark/50 text-white backdrop-blur-md transition-opacity group-hover:opacity-100 font-thin"
                >
                  <span>Ver más</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
