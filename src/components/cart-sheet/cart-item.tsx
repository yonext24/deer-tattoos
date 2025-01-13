import { useCartStore } from '@/store/shop-store'
import Image from 'next/image'
import { CartItemButtons } from './cart-item-buttons'
import * as types from '@/lib/shopify/types'
import { CartDeleteItem } from './cart-delete-item'

export function CartItem({ merchandise, cost, quantity }: types.CartItem) {
  const { product, quantityAvailable } = merchandise
  const { title, featuredImage: image } = product

  const del = useCartStore((s) => s.removeFromCart)
  const down = useCartStore((s) => s.quantityDown)
  const up = useCartStore((s) => s.quantityUp)

  const onDel = () => del(merchandise.id)
  const onIncrease = () => up(merchandise.id)
  const onDecrease = () => down(merchandise.id)

  const total = cost.totalAmount.amount
  const hasDefaultVariation =
    merchandise.selectedOptions[0].value === 'Default Title'

  return (
    <div className="flex border-b border-border py-3">
      <Image
        className="object-contain h-auto w-20 max-h-[70px] object-left"
        height={image.height}
        width={image.width}
        src={image.url}
        alt={image.altText}
      />
      <div className="flex flex-col flex-1 gap-2 sm:gap-px px-4">
        <div className="flex w-full">
          <span className="text-lg [line-height:1.4rem] flex-1">{title}</span>
          <CartDeleteItem onDel={onDel} merchandiseId={merchandise.id} />
        </div>
        <div className="flex self-start text-sm">
          {hasDefaultVariation
            ? ''
            : merchandise.selectedOptions.map((el) => el.value).join(' / ')}
        </div>
        <div className="flex justify-between">
          <span className="font-thin text-sm">${total}</span>
          <CartItemButtons
            quantityAvailable={quantityAvailable}
            merchandiseId={merchandise.id}
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
      </div>
    </div>
  )
}
