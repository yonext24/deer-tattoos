import { modalStyles } from '@/lib/utils/styles'
import { useState } from 'react'
import { SubmitModal } from '../../common/submit-modal'
import { errorParser } from '@/lib/utils/appFetch'

export default function DeleteArtistModal({
  slug,
  name,
  onRemove,
  closeModal,
}: {
  slug: string
  name: string
  onRemove: () => void
  closeModal: () => void
}) {
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
      // await appFetch(`/api/tattoos`, {
      //   body: JSON.stringify({ id }),
      //   method: 'DELETE',
      // })
      await new Promise((res) => {
        setTimeout(res, 1500)
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
        Esta acción borrará el artista y convertirá todos sus tatuajes en parte
        de la galería {'<NOMBRE DE LA GALERÍA>'}, no se puede revertir, pero se
        pueden volver a asignar todos sus tatuajes a mano después.
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
