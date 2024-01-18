import { Button } from '@/components/shadcn/ui/button'
import { modalStyles } from '@/lib/utils/styles'
import { SubmitModal } from '../../common/submit-modal'
import { useState } from 'react'
import { appFetch, errorParser } from '@/lib/utils/appFetch'

const DeleteModal = ({
  closeModal,
  onRemove,
  id,
}: {
  closeModal: () => void
  onRemove: () => void
  id: string
}) => {
  const handleRemove = () => {
    onRemove()
    closeModal()
  }
  const [status, setStatus] = useState<{
    type: 'loading' | 'error' | 'success' | 'idle'
    message?: string
  }>({ type: 'idle' })

  const handleSubmit = async () => {
    setStatus({ type: 'loading' })
    try {
      await appFetch(`/api/tattoos`, {
        body: JSON.stringify({ id }),
        method: 'DELETE',
      })
      handleRemove()
    } catch (e) {
      setStatus({ type: 'error', message: errorParser(e) })
    }
  }

  return (
    <div role="dialog" className={modalStyles({})}>
      <h3 className="font-semibold">Estas seguro?</h3>
      <p className="text-[hsl(var(--muted-foreground))]">
        Esta acción borrará el tatuaje y todas las imágenes asignadas a él, no
        se puede revertir.
      </p>
      <SubmitModal
        loading={status.type === 'loading'}
        variant="destructive"
        closeModal={closeModal}
        error={status.message}
        onClick={handleSubmit}
        text="Eliminar"
      />
    </div>
  )
}

export default DeleteModal
