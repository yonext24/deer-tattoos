import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { useId, useState } from 'react'
import { matchWordToArray } from '@/lib/utils/string-matching'
import { addModal } from 'react-modal-observer'
import { AddPositionSureModal } from './add-position-sure-modal'
import { modalStyles } from '@/lib/utils/styles'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { cn } from '@/lib/utils/utils'

type Props = {
  handleAdd: (position: string) => void
  allPositions: string[]
  closeModal: () => void
}

export function PositionSelectorModal({
  handleAdd,
  allPositions,
  closeModal,
}: Props) {
  const [value, setValue] = useState<string>('')

  const add = (position: string) => {
    handleAdd(position)
    closeModal()
  }

  const handleClick = () => {
    const position = value
    if (!position || typeof position !== 'string') return

    const curatedPosition = position.trim().toLowerCase()
    const similarWord = matchWordToArray(curatedPosition, allPositions)

    if (allPositions.includes(curatedPosition)) {
      add(position)
      return
    }

    if (similarWord) {
      addModal(
        AddPositionSureModal,
        {
          position: curatedPosition,
          similarPosition: similarWord,
          handleSure: handleAdd,
        },
        {}
      )
      closeModal()

      return
    }

    add(position)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const id = useId()

  const elementRef = useFocusTrap<HTMLDivElement>({
    focusOnDestroy: '#position-select',
  })

  return (
    <div
      ref={elementRef}
      role="dialog"
      className={cn(modalStyles({ size: 'default' }), '')}
    >
      <h3 className={cn(modalStyles({ type: 'title' }))}>Agregar posición</h3>
      <Input
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClick()
        }}
        autoFocus
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Nombre de la posición"
        id={id}
        name={id}
      />
      <div className={modalStyles({ type: 'footer' })}>
        <Button type="button" onClick={handleClick} variant="outline">
          Crear
        </Button>
      </div>
    </div>
  )
}
