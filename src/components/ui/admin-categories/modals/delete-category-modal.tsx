import { modalStyles } from '@/lib/utils/styles'
import { SubmitModal } from '../../common/submit-modal'
import { useState } from 'react'

export function DeleteCategoryModal({
  closeModal,
  onDelete,
}: {
  closeModal: () => void
  onDelete: () => Promise<void>
}) {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div role="dialog" className={modalStyles({ variant: 'destructive' })}>
      <h3 className="font-semibold">Deseas borrar este estilo?</h3>
      <p className="text-[hsl(var(--muted-foreground))]">
        Esta acción borrará el estilo y lo quitará de todos los tatuajes que lo
        contengan. Podrás volver a agregarlo en cada tatuaje a mano.
      </p>
      <SubmitModal
        onClick={async () => {
          setLoading(true)
          await onDelete().then(closeModal)
        }}
        text="Eliminar"
        closeModal={closeModal}
        loading={loading}
        variant={'destructive'}
      />
    </div>
  )
}
