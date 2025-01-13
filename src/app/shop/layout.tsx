'use server'

import { CartSheet } from '@/components/cart-sheet/cart-sheet'
import { MainFooter } from '@/components/footers/main-footer'
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
    <>
      <div className="flex flex-col gap-12">
        {children}
        <MainFooter />
        <CartSheet propsCart={cart} />
      </div>
    </>
  )
}
