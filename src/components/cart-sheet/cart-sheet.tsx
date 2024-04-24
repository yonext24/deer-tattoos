/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CartItemType, useCartStore } from '@/store/shop-store'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from '../shadcn/ui/sheet'
import { Button } from '../shadcn/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { appFetch } from '@/lib/utils/appFetch'
import { CartItem } from './cart-item'

export function CartSheet() {
  const open = useCartStore((s) => s.open)
  const close = useCartStore((s) => s.closeCart)
  const setCart = useCartStore((s) => s.setCart)

  const cart = useCartStore((s) => s.cart)
  const router = useRouter()
  const onBuy = () => {
    router.push('/shop/checkout')
    close()
  }

  useEffect(() => {
    appFetch<CartItemType[]>('/api/shop/cart').then((res) => {
      setCart(res)
    })
  }, [])

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent className="flex flex-col">
        <SheetTitle>Carrito</SheetTitle>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {cart.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <SheetFooter className="border-t border-border !flex !flex-col gap-2">
          <div className="flex justify-between py-4 w-full">
            <span className="text-lg">Total</span>
            <span className="text-lg">
              $
              {cart.reduce(
                (acc, item) => acc + Number(item.price) * item.quantity,
                0
              )}
            </span>
          </div>
          <Button role="link" onClick={onBuy} variant="outline">
            Finalizar Compra
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
