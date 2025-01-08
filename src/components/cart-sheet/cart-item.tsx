import { CartItemType, useCartStore } from '@/store/shop-store'
import Image from 'next/image'
import { Button } from '../shadcn/ui/button'
import { TrashIcon } from 'lucide-react'
import { CartItemButtons } from './cart-item-buttons'

export function CartItem({
  image,
  name,
  price,
  variation,
  id,
  quantity,
}: CartItemType) {
  const del = useCartStore((s) => s.removeFromCart)
  const down = useCartStore((s) => s.quantityDown)
  const up = useCartStore((s) => s.quantityUp)

  const onDel = () => del(id, variation)
  const onIncrease = () => up(id, variation)
  const onDecrease = () => down(id, variation)

  const total = quantity * Number(price)

  return (
    <div className="flex border-b border-border py-3">
      <Image
        className="object-contain"
        height={80}
        width={80}
        src={image}
        alt={name}
      />
      <div className="flex flex-col flex-1 px-4">
        <div className="flex w-full">
          <span className="text-lg text-center flex-1">{name}</span>
          <Button
            variant="destructive-ghost"
            className="p-0 h-[28px] w-[38px]"
            onClick={onDel}
          >
            <TrashIcon className="w-3 h-3" />
          </Button>
        </div>
        <div className="flex self-start">
          <span className="text-xs font-thin text-start">
            Variante: {variation}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-thin text-sm">${total}</span>
          <CartItemButtons
            quantity={quantity}
            id={id}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
      </div>
    </div>
  )
}
