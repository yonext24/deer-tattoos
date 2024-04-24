import { ShopProduct } from '@/lib/shop/types'
import Image from 'next/image'
import Link from 'next/link'

export function ProductCard({ slug, images, name, price }: ShopProduct) {
  return (
    <Link href={`/shop/${slug}`} className="h-full w-full">
      <article className="flex h-full border border-border hover:border-gold transition-colors relative group rounded-md">
        <Image
          width={300}
          height={300}
          src={images[0].url}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-green-dark/50 backdrop-blur z-10 flex flex-col items-center justify-center
        transition-opacity opacity-0 group-hover:opacity-100"
        >
          <span className="text-white text-2xl font-thin">{name}</span>
          <span className="text-white text-2xl font-thin">${price}</span>
        </div>
      </article>
    </Link>
  )
}
