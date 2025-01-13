import { useFormState } from 'react-dom'
import { Button } from '../shadcn/ui/button'
import { removeItem } from '@/lib/shopify/actions'
import { TrashIcon } from 'lucide-react'

export function CartDeleteItem({
  onDel,
  merchandiseId,
}: {
  merchandiseId: string
  onDel: () => void
}) {
  const [message, formAction] = useFormState(removeItem, null)
  const actionWithId = formAction.bind(null, merchandiseId)

  return (
    <form>
      <Button
        type="submit"
        variant="destructive-ghost"
        className="p-0 h-10 w-10 sm:h-[28px] sm:w-[38px]"
        formAction={async () => {
          onDel()
          await actionWithId()
        }}
      >
        <TrashIcon className="w-3 h-3" />
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  )
}
