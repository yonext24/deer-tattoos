import { modalStyles } from '@/lib/utils/styles'
import { useState } from 'react'
import { SubmitModal } from '../../common/submit-modal'
import { appFetch, errorParser } from '@/lib/utils/appFetch'

export default function DeleteArtistModal({
  slug,
  onRemove,
  closeModal,
}: {
  slug: string
  onRemove: () => void
  closeModal: () => void
}) {
  const [status, setStatus] = useState<{
    type: 'loading' | 'error' | 'success' | 'idle'
    message?: string
  }>({ type: 'idle' })

  const handleSubmit = async () => {
    setStatus({ type: 'loading' })
    try {
      const res = await appFetch(`/api/artists`, {
        body: JSON.stringify({ slug }),
        method: 'DELETE',
      })
      if (res.result) {
        // El backend devuelve un { result: boolean } indicando si se borró
        onRemove()
        closeModal()
        return
      }
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
