import { ProductCard } from '@/components/ui/shop/product-card/product-card'
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
    category,
    _id
  }`,
    {},
    {}
  )
  const recommendations = await client.fetch<ShopProduct[]>(
    `*[_type == "product" && _id != "${product._id}" && references("${
      // @ts-ignore
      product.category._ref as string
    }")]{
      "images": images[]{
        ...,
        "url": asset->url,
      },
      description,
      name,
      "slug": slug.current,
      _id,
      price
    }`
  )

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-thin text-3xl">Productos Relacionados</h3>
      <div className="flex gap-2">
        {recommendations.map((el) => (
          <div className="max-w-[200px]" key={el._id}>
            <ProductCard {...el} />
          </div>
        ))}
      </div>
    </div>
  )
}
