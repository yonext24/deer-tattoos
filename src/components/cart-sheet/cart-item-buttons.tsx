import { cn } from '@/lib/utils/utils'
import { Button, buttonVariants } from '../shadcn/ui/button'
import { updateItemQuantity } from '@/lib/shopify/actions'
import { useFormState } from 'react-dom'
import { useState } from 'react'

export function CartItemButtons({
  quantity,
  onIncrease,
  onDecrease,
  merchandiseId,
  quantityAvailable,
}: {
  quantity: number
  merchandiseId: string
  onIncrease: () => void
  onDecrease: () => void
  quantityAvailable: number
}) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const handleDebounce = (func: () => void) => {
    setIsDisabled(true)
    setTimeout(() => {
      setIsDisabled(false)
    }, 100)
    func()
  }
  const [message, formAction] = useFormState(updateItemQuantity, null)

  const downActionWithId = formAction.bind(null, {
    merchandiseId,
    quantity: quantity - 1,
  })
  const upActionWithId = formAction.bind(null, {
    merchandiseId,
    quantity: quantity + 1,
  })

  return (
    <form className="flex gap-2">
      <Button
        disabled={quantity <= 1 || isDisabled}
        type="submit"
        formAction={async () => {
          if (quantity > 1) {
            handleDebounce(onDecrease)
            await downActionWithId()
          }
        }}
        variant="outline"
        className="h-8 w-8 sm:w-6 sm:h-6 p-0"
      >
        -
      </Button>
      <span
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-6 h-6 p-0 font-thin'
        )}
      >
        {quantity}
      </span>
      <Button
        disabled={quantity >= quantityAvailable || isDisabled}
        type="submit"
        formAction={async () => {
          handleDebounce(onIncrease)
          await upActionWithId()
        }}
        variant="outline"
        className="h-8 w-8 sm:w-6 sm:h-6 p-0"
      >
        +
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  )
}
