/* eslint-disable react/display-name */

import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { cn } from '@/lib/utils/utils'
import React, { useState } from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  onAccept: (z: any) => void
  extValue: string
  reset: () => void
  allowEmpty?: boolean
  initializeSaved?: boolean
}

export function MediaPicker({
  extValue,
  onAccept,
  reset,
  allowEmpty = false,
  initializeSaved = false,
  ...props
}: Props) {
  const [localValue, setLocalValue] = useState<string>(extValue ?? '')
  const [saved, setSaved] = useState<boolean>(
    initializeSaved && (Boolean(extValue) || extValue === '')
  )

  const handleAccept = () => {
    if (localValue === '' && !allowEmpty) return

    const isSaved = !saved
    setSaved(isSaved)

    if (isSaved) {
      onAccept(localValue)
    } else {
      setLocalValue(extValue)
      reset()
    }
  }

  return (
    <div className="flex max-w-[400px] gap-1">
      <Input
        disabled={saved}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
            handleAccept()
          }
        }}
        data-saved={saved}
        {...props}
        onChange={(e) => {
          setLocalValue(e.target.value)
        }}
        value={localValue}
        placeholder={
          allowEmpty && saved && extValue === '' ? '(Vacío)' : undefined
        }
        className="data-[saved=true]:cursor-not-allowed"
      />
      <Button
        type="button"
        data-saved={saved}
        onClick={handleAccept}
        variant={saved ? 'outline' : 'default'}
        className={cn('transition-colors')}
      >
        {saved ? 'Modificar' : 'Guardar'}
      </Button>
    </div>
  )
}
