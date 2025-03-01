import { Button } from '@/components/shadcn/ui/button'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { modalStyles } from '@/lib/utils/styles'
import { cn } from '@/lib/utils/utils'
import { useRef } from 'react'

type Props = {
  closeModal: () => void
  handleSure: (position: string) => void
  position: string
  similarPosition: string
}

export function AddPositionSureModal({
  closeModal,
  handleSure,
  position,
  similarPosition,
}: Props) {
  const elRef = useFocusTrap<HTMLDivElement>({
    focusOnDestroy: '#position-select',
    lagFirst: 500,
  })

  const handleSimilar = () => {
    handleSure(similarPosition)
    closeModal()
  }
  const handleAdd = () => {
    handleSure(position)
    closeModal()
  }

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div role="dialog" ref={elRef} className={cn(modalStyles({}), '')}>
      <h3 className="font-semibold">Estas seguro?</h3>
      <p className="text-[hsl(var(--muted-foreground))]">
        Se detectó que hay una posición muy similar a la que estás intentando
        agregar, si es la misma porfavor usá la que ya existe, para mantener la
        consistencia en la aplicación
      </p>
      <p>Agregaste: {position}</p>
      <p>Muy similar: {similarPosition}</p>
      <div className={cn(modalStyles({ type: 'footer' }), 'mt-2')}>
        <Button ref={buttonRef} onClick={handleAdd}>
          Agregar de todas formas
        </Button>
        <Button autoFocus variant="ghost" onClick={handleSimilar}>
          Quise decir {similarPosition}
        </Button>
      </div>
    </div>
  )
}
