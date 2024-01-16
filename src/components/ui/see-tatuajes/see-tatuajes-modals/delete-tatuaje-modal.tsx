import { Button } from '@/components/shadcn/ui/button'
import { modalStyles } from '@/lib/utils/styles'

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

  return (
    <div role="dialog" className={modalStyles({})}>
      <h3 className="font-semibold">Estas seguro?</h3>
      <p className="text-[hsl(var(--muted-foreground))]">
        Esta acción borrará el tatuaje y todas las imágenes asignadas a él, no
        se puede revertir.
      </p>
      <div className="flex justify-end gap-4 mt-3">
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
        <Button onClick={handleRemove} variant="destructive">
          Eliminar
        </Button>
      </div>
    </div>
  )
}

export default DeleteModal
