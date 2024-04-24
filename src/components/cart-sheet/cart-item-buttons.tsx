import { cn } from '@/lib/utils/utils'
import { Button, buttonVariants } from '../shadcn/ui/button'

export function CartItemButtons({
  quantity,
  onIncrease,
  onDecrease,
  id,
}: {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  id: string
}) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="w-6 h-6 p-0" onClick={onDecrease}>
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
      <Button variant="outline" className="w-6 h-6 p-0" onClick={onIncrease}>
        +
      </Button>
    </div>
  )
}
