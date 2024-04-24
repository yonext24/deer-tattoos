import { CartSheet } from '@/components/cart-sheet/cart-sheet'
import { MainFooter } from '@/components/footers/main-footer'
import { ShopSessionProvider } from '@/components/providers/shop-session-provider'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col gap-12">
        <ShopSessionProvider>{children}</ShopSessionProvider>
        <MainFooter />
        <CartSheet />
      </div>
    </>
  )
}
