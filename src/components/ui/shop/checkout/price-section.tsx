'use client'

import { CartItem } from '@/components/cart-sheet/cart-item'
import { useCartStore } from '@/store/shop-store'

export function PriceSection() {
  const cart = useCartStore((s) => s.cart)

  return (
    <div className="flex flex-col md:min-w-[400px] h-full px-2">
      <div className="flex flex-col overflow-y-auto">
        {cart.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
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
    </div>
  )
}
