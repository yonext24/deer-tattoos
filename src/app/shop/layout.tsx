'use server'

import { CartSheet } from '@/components/cart-sheet/cart-sheet'
import { MainFooter } from '@/components/footers/main-footer'
import { Main } from '@/components/ui/common/main'
import { getCart } from '@/lib/shopify'
import { cookies } from 'next/headers'
import React from 'react'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cartId = (await cookies()).get('cartId')?.value
  const cart = await getCart(cartId)

  return (
    <Main withMarginOnTop className="mx-auto flex flex-col w-full">
      {children}
      <MainFooter />
      <CartSheet propsCart={cart} />
    </Main>
  )
}
