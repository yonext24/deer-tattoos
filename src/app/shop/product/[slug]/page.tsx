import { Prose } from '@/components/prose/prose'
import { Separator } from '@/components/shadcn/ui/separator'
import { ProductImages } from '@/components/ui/shop/product-images/product-images'
import { ProductShoppingSection } from '@/components/ui/shop/product-shopping-section/product-shopping-section'
import { getProduct } from '@/lib/shopify'
import { HIDDEN_PRODUCT_TAG } from '@/lib/utils/consts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const product = await getProduct(slug)
  if (!product) return notFound()

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  }
  const isOutOfStock = !product.availableForSale

  return (
    <div className="w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd }}
      />
      <div className="flex flex-col w-full lg:grid lg:grid-cols-2 h-max">
        <section>
          <ProductImages {...product} />
        </section>
        <section className="w-full flex flex-col items-center gap-2 px-4 sm:px-16 max-h-">
          <h1 className="font-title text-6xl capitalize">{product.title}</h1>
          <Separator className="w-full mt-1" />
          <Prose
            html={product.descriptionHtml}
            className="mt-12 mb-6 text-center sm:text-start"
          />
          {isOutOfStock && (
            <p className="text-neutral-500">
              Este producto no tiene ningún stock.
            </p>
          )}
          {/* <Separator className="w-full" /> */}
          <ProductShoppingSection product={product} />
        </section>
      </div>
    </div>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const product = await getProduct(params.slug)

  if (!product) return notFound()

  const { url, width, height, altText: alt } = product.featuredImage || {}
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG)

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  }
}
