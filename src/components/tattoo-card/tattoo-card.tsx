import { Tattoo } from '@/app/(sidebar)/tatuajes/page'
import { cn } from '@/lib/utils/utils'
import Image from 'next/image'
import Link from 'next/link'

type TattooCardProps = Tattoo & {
  withAnimation: boolean
  delay?: string
}

export function TattooCard({
  type,
  image,
  id,
  withAnimation = false,
  delay,
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
        'overflow-hidden rounded',
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
        <Image
          src={image}
          height={height}
          style={{ height }}
          quality={100}
          width={type === 'single' ? 400 : 800}
          alt="Image"
          className="w-full object-center object-cover"
        />
      </Link>
    </article>
  )
}
