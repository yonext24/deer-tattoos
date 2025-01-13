import { useCartStore } from '@/store/shop-store'
import { Button } from '../shadcn/ui/button'
import { SheetFooter } from '../shadcn/ui/sheet'
import Spinner from '../ui/common/spinner'
import { cn } from '@/lib/utils/utils'
import { redirectToCheckout } from '@/lib/shopify/actions'

export function CartPrices() {
  const close = useCartStore((s) => s.closeCart)
  const cart = useCartStore((s) => s.cart)

  const onBuy = () => {
    close()
  }
  const isLoading = cart.cost.isLoading

  if (cart.lines.length === 0) return

  return (
    <SheetFooter className="border-t border-border !flex !flex-col gap-0">
      <div
        className={cn(
          'min-h-[101px] [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:ml-2 [&>div:first-of-type:not(#spinner)]:pt-2 [&>div:last-of-type:not(#spinner)]:pb-2',
          isLoading && 'flex items-center justify-center'
        )}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div>
              <span className="text-sm font-thin text-neutral-300">
                Impuestos
              </span>
              <span className="text-lg font-thin">
                ${cart.cost.totalTaxAmount.amount}
              </span>
            </div>
            <div>
              <span className="font-thin text-sm">Precio Neto</span>
              <span className="text-lg font-thin">
                ${cart.cost.subtotalAmount.amount}
              </span>
            </div>
            <div>
              <span className="text-lg">Total</span>
              <span className="text-lg">${cart.cost.totalAmount.amount}</span>
            </div>
          </>
        )}
      </div>
      <form action={redirectToCheckout} className="flex flex-col">
        <Button type="submit" role="link" onClick={onBuy} variant="outline">
          Finalizar Compra
        </Button>
      </form>
    </SheetFooter>
  )
}
