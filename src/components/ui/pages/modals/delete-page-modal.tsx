import { modalStyles } from '@/lib/utils/styles'
import { cn } from '@/lib/utils/utils'
import { SubmitModal } from '../../common/submit-modal'
import { useFormState } from 'react-dom'
import { deletePageAction } from '@/lib/backend/utils/pages.actions'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/ui/button'

export function DeletePageModal({
  closeModal,
  id,
  onDelete,
}: {
  closeModal: () => void
  id: string
  onDelete: (id: string) => void
}) {
  const [state, formAction] = useFormState(deletePageAction, {
    message: '',
    status: 0,
  })

  useEffect(() => {
    if (state.status === 1) {
      toast.success(state.message)
      onDelete(id)
      closeModal()
    }
  }, [state.status])

  const action = formAction.bind(null, id)

  return (
    <div role="dialog" className={modalStyles({})}>
      <h3 className="font-semibold">Estas seguro?</h3>
      <p className="text-[hsl(var(--muted-foreground))]">
        Esta acción borrará la página y todo su contenido
      </p>
      {[-1, 0].includes(state.status) && state.message && (
        <p className="text-red-500">{state.message}</p>
      )}
      <form className="flex justify-end w-full mt-2 gap-2">
        <Button type="button" onClick={closeModal} variant="ghost">
          Cancelar
        </Button>
        <Button formAction={action} variant="destructive">
          Borrar
        </Button>
      </form>
    </div>
  )
}
