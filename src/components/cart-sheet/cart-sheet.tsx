/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCartStore } from '@/store/shop-store'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from '../shadcn/ui/sheet'
import { Button } from '../shadcn/ui/button'
import { useRouter } from 'next/navigation'
import { CartItem } from './cart-item'
import { useEffect } from 'react'
import { createCartAndSetCookie } from '@/lib/shopify/actions'
import { Cart } from '@/lib/shopify/types'
import { CartPrices } from './cart-prices'
import { cn } from '@/lib/utils/utils'
import { ShoppingCart } from 'lucide-react'
import { useSwipe } from '@/hooks/useSwipe'

export function CartSheet({ propsCart }: { propsCart: Cart | undefined }) {
  const open = useCartStore((s) => s.open)
  const close = useCartStore((s) => s.closeCart)
  const setCart = useCartStore((s) => s.setCart)

  const cart = useCartStore((s) => s.cart)
  console.log(cart)

  useEffect(() => {
    if (!propsCart) {
      createCartAndSetCookie()
    } else {
      setCart(propsCart)
    }
  }, [propsCart])

  const isEmpty = cart.lines.length <= 0

  useSwipe({ onSwipeRight: close })

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent className="flex flex-col w-full max-w-full sm:max-w-sm">
        <SheetTitle>Carrito</SheetTitle>
        <div
          className={cn(
            'flex flex-col flex-1 overflow-y-auto',
            isEmpty && 'justify-center items-center'
          )}
        >
          {isEmpty ? (
            <div>
              <span>Tu carrito esta vacio</span>
            </div>
          ) : (
            cart.lines.map((item) => <CartItem key={item.id} {...item} />)
          )}
        </div>
        <CartPrices />
      </SheetContent>
    </Sheet>
  )
}
