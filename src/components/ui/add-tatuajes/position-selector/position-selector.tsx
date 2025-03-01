// eslint-disable react-hooks/exhaustive-deps
'use client'

import { useStateWithLoading } from '@/hooks/useStateWithLoading'
import { getPositionsClient } from '@/lib/backend/utils/positions'
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup,
  SelectContent,
} from '@components/shadcn/ui/select'
import { useEffect, useRef, useState } from 'react'
import Spinner from '../../common/spinner'
import { PositionSelectorModal } from './position-selector-modal'
import { Button } from '@/components/shadcn/ui/button'
import { cn } from '@/lib/utils/utils'
import { CommandIcon, PlusIcon } from 'lucide-react'
import { addModal } from 'react-modal-observer'

type Props = {
  onChange: (value: string) => void
  value: string
}

export function PositionSelector({ onChange, value }: Props) {
  const {
    state: allPositions,
    status,
    updateState,
  } = useStateWithLoading<string[]>([])
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    updateState(getPositionsClient)
  }, [])

  const handleChange = (value: string) => {
    onChange(value)
  }

  const handleAdd = async (positionLocal: string) => {
    const doesPositionExists = allPositions.includes(positionLocal)
    if (doesPositionExists) {
      onChange(positionLocal)
      return
    }

    updateState([...allPositions, positionLocal])
    await new Promise((res) => {
      // Seems like the onChange doesnt work if the value is not in one of the SelectItems
      setTimeout(res, 200)
    })
    onChange(positionLocal)
  }

  const handleAddClick = () => {
    if (status === 'loading' || status === 'error') return
    setOpen(false)
    addModal(PositionSelectorModal, { allPositions, handleAdd }, {})
  }

  const selectRef = useRef<HTMLDivElement>(null)

  return (
    <Select
      onOpenChange={setOpen}
      open={open}
      defaultValue={undefined}
      value={value ?? undefined}
      onValueChange={handleChange}
    >
      <SelectTrigger id="position-select">
        <SelectValue placeholder="Selecciona una posición" asChild>
          <span>{value}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        onKeyDown={(e) => {
          if (e.key === 'c' && e.ctrlKey) {
            handleAddClick()
          }
        }}
        ref={selectRef}
      >
        <Button
          type="button"
          variant="outline"
          value="none"
          className={cn(
            'border-none text-sm text-start justify-start gap-2 cursor-pointer !w-full'
          )}
          onClick={handleAddClick}
        >
          <PlusIcon className="h-4 w-4" />
          <span>Agregar posición</span>
          <div className="flex ml-auto font-thin items-center">
            <CommandIcon strokeWidth={1} width={15} height={15} />
            <span className="italic">C</span>
          </div>
        </Button>
        <SelectGroup>
          <SelectLabel>
            {(() => {
              if (status === 'loading')
                return <Spinner className="self-center" />
              if (status === 'error')
                return (
                  <span className="text-red-500 font-thin">
                    Algo salió mal, intenta recargar la página
                  </span>
                )
              if (status === 'success') return 'Selecciona un artista'
            })()}
          </SelectLabel>
          {status === 'success' && (
            <>
              {allPositions.map((position) => {
                return (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                )
              })}
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
