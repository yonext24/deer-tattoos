import { Product, ProductVariant } from '@/lib/shopify/types'
import { useProductShopping } from './product-shopping-context'
import { useFormState } from 'react-dom'
import { addItem } from '@/lib/shopify/actions'
import { StylizedButton } from '@/components/stylized-button/stylized-button'
import { useCartStore } from '@/store/shop-store'
import { useState } from 'react'

export function ProductShoppingButton({ product }: { product: Product }) {
  const { variants } = product
  const addToCart = useCartStore((s) => s.addToCart)
  const openCart = useCartStore((s) => s.openCart)

  const { state } = useProductShopping()
  const [message, formAction] = useFormState(addItem, null)

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  )
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
  const selectedVariantId = variant?.id || defaultVariantId
  const actionWithVariant = formAction.bind(null, selectedVariantId)
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!
  const finalVariantHasComparePrice = finalVariant?.compareAtPrice

  {
  }


  return (
    <>
      <p className="font-title text-2xl self-start">
        {finalVariant?.price?.amount && `$${finalVariant.price.amount} `}
        {finalVariantHasComparePrice && (
          <span className="line-through font-thin font-sans">{`$${finalVariantHasComparePrice.amount}`}</span>
        )}
      </p>
      <form
        action={async () => {
          addToCart(product, finalVariant)
          openCart()
          await actionWithVariant()
        }}
        className="w-full flex mt-6 items-end"
      >
        <StylizedButton
          disabled={!finalVariant || !finalVariant?.availableForSale}
          className="w-full py-2 font-thin text-lg min-h-[44px] flex justify-center items-center outline-neutral-300"
        >
          Añadir al carrito
        </StylizedButton>
        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </form>
    </>
  )
}
