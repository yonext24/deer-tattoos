/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ProductVariantSelector } from './product-variant-selector'
import React from 'react'
import { Product } from '@/lib/shopify/types'
import {
  ProductShoppingContextProvider,
  useProductShopping,
} from './product-shopping-context'
import { ProductShoppingButton } from './product-shopping-button'

export function ProductShoppingSection({ product }: { product: Product }) {
  return (
    <ProductShoppingContextProvider>
      <ProductShoppingSectionWithContext product={product} />
    </ProductShoppingContextProvider>
  )
}

export function ProductShoppingSectionWithContext({
  product,
}: {
  product: Product
}) {
  const { variants, options } = product

  console.log(product)

  return (
    <>
      <ProductVariantSelector variants={variants} options={options} />
      <ProductShoppingButton product={product} />
    </>
  )
}
