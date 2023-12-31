/* eslint-disable @next/next/no-img-element */
import { Tattoo } from '@lib/types/tattoo'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'
import { ImageWithBlur } from './image-with-blur'

type TattooCardProps = Tattoo & {
  withAnimation: boolean
  delay?: string
}

export function TattooCard({
  type,
  images,
  id,
  withAnimation = false,
  delay,
  styles,
}: TattooCardProps) {
  const height = {
    single: 400,
    double: 800,
    quad: 800,
  }[type] as number

  return (
    <article
      role="link"
      key={id}
      className={cn(
        'overflow-hidden rounded relative border border-border hover:border-gold transition-colors group',
        type === 'double' && 'col-start-1 col-end-3',
        type === 'quad' && 'col-start-1 col-end-3',
        withAnimation && 'animate-fadeIn',
      )}
      style={
        withAnimation
          ? { animationDelay: delay, animationFillMode: 'backwards' }
          : {}
      }
    >
      <Link href={`/tatuajes/${id}`}>
        <ImageWithBlur
          src={images.main.src}
          loading="lazy"
          blurDataURL={images.bluredImg}
          height={height}
          style={{ height }}
          quality={100}
          width={type === 'single' ? 400 : 800}
          alt="Image"
          className={cn('w-full object-center object-cover')}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-green-dark/50 backdrop-blur z-10 flex flex-col items-center justify-evenly
        transition-opacity opacity-0 group-hover:opacity-100"
        >
          {styles.map((style, index) => (
            <span key={index} className="text-white text-2xl font-thin">
              {style}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
}
