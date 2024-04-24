'use client'

import { useCartStore } from '@/store/shop-store'
import { ShoppingCart } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function NavCartButton() {
  const path = usePathname()
  const open = useCartStore((s) => s.openCart)

  if (!path.startsWith('/shop')) return null

  return (
    <button onClick={open}>
      <ShoppingCart className="h-5 w-5" />
    </button>
  )
}
