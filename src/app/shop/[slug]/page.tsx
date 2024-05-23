import { Separator } from '@/components/shadcn/ui/separator'
import { ProductImages } from '@/components/ui/shop/product-images/product-images'
import { ProductShoppingSection } from '@/components/ui/shop/product-shopping-section/product-shopping-section'
import { client } from '@/lib/shop/client'
import { ShopProduct } from '@/lib/shop/types'

export default async function Page({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const product = await client.fetch<ShopProduct>(
    `*[_type == "product" && slug.current == '${slug}'][0]{
    "images": images[]{
      ...,
      "url": asset->url
    },
    "slug": slug.current,
    description,
    name,
    price,
    _id
  }`,
    {},
    {}
  )
  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-2 h-max">
      <section>
        <ProductImages {...product} />
      </section>
      <section className="w-full flex flex-col items-center gap-2 px-16">
        <h1 className="font-title text-6xl capitalize">{product.name}</h1>
        <Separator className="w-full" />
        <p className="text-center my-12">{product.description}</p>
        <Separator className="w-[60%]" />
        <ProductShoppingSection {...product} />
      </section>
    </div>
  )
}
