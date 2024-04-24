/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ShopProduct } from '@/lib/shop/types'
import { ProductVariantSelector } from './product-variant-selector'
import { Button } from '@/components/shadcn/ui/button'
import { useEffect, useMemo, useState } from 'react'
import { client } from '@/lib/shop/client'
import Spinner from '../../common/spinner'
import { useCartStore } from '@/store/shop-store'
import {
  StylizedButton,
  StylizedLink,
} from '@/components/stylized-button/stylized-button'

export function ProductShoppingSection({
  slug,
  _id,
  price,
  name,
  images,
}: ShopProduct) {
  const [variations, setVariations] = useState<ShopProduct['variations']>([])
  const [selectedVariation, setSelectedVariation] = useState<string | null>(
    null
  )
  const [error, setError] = useState<any>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const addToCart = useCartStore((s) => s.addToCart)
  const openCart = useCartStore((s) => s.openCart)

  useEffect(() => {
    setLoading(true)
    client
      .fetch(
        `*[slug.current == "${slug}"][0]{
      variations
    }`
      )
      .then((res) => {
        res.variations.length === 1 &&
          setSelectedVariation(res.variations[0].name)
        setVariations(res?.variations)
      })
      .then(setError)
      .finally(() => setLoading(false))
  }, [slug])

  const currentVariation = useMemo(() => {
    return variations?.find((variation) => variation.name === selectedVariation)
  }, [selectedVariation, variations.length])

  if (error) {
    return (
      <p className="text-red-500">
        ocurrió un error, porfavor inténtalo más tarde
      </p>
    )
  }
  const isDisabled = loading || error || !currentVariation?.stock

  const onBuy = () => {
    if (isDisabled) return
    addToCart({
      id: _id,
      price,
      variation: selectedVariation as string,
      quantity: 1,
      name,
      image: images[0].url,
    })
    openCart()
  }

  const onChange = (variation: string | null) => {
    setSelectedVariation(variation)
  }

  return (
    <>
      {variations.length > 1 && (
        <ProductVariantSelector onChange={onChange} variations={variations} />
      )}
      <StylizedButton
        disabled={isDisabled}
        className="w-full py-2 font-thin text-lg min-h-[44px] flex justify-center items-center"
        onClick={onBuy}
      >
        {loading ? <Spinner /> : 'Añadir al carrito'}
      </StylizedButton>
    </>
  )
}
