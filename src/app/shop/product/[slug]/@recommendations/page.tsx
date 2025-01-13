import { ProductCard } from '@/components/ui/shop/product-card/product-card'
import { getProduct, getProductRecommendations } from '@/lib/shopify'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const product = await getProduct(slug)
  if (!product) return notFound()
  const recommendations = await (
    await getProductRecommendations(product.id)
  ).slice(0, 3)

  if (!recommendations.length) return null
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-thin text-3xl">Productos Relacionados</h3>
      <div className="flex gap-2">
        {recommendations.map((el) => (
          <div className="max-w-[200px]" key={el.id}>
            <ProductCard isSmall {...el} />
          </div>
        ))}
      </div>
    </div>
  )
}
