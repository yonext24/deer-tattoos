/* eslint-disable react/display-name */

import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { cn } from '@/lib/utils/utils'
import React, { useState } from 'react'

type Props = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  onAccept: (z: any) => void
  extValue: string
  reset: () => void
  allowEmpty?: boolean
  initializeSaved?: boolean
  isTextarea?: boolean
  rows?: number
  withCancelButton?: boolean
}

export function MediaPicker({
  extValue,
  onAccept,
  reset,
  allowEmpty = false,
  initializeSaved = false,
  isTextarea,
  rows,
  withCancelButton = false,
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
  const handleCancel = () => {
    setLocalValue(extValue)
    setSaved(true)
  }

  return (
    <div className="flex w-full max-w-[400px] gap-1">
      {isTextarea ? (
        <Textarea
          disabled={saved}
          onKeyDownCapture={(e) => {
            // if (e.key === 'Enter') {
            //   e.preventDefault()
            //   e.stopPropagation()
            //   handleAccept()
            // }
            if (e.key === 'Escape') {
              e.preventDefault()
              e.stopPropagation()
              handleCancel()
            }
          }}
          rows={rows}
          data-saved={saved}
          {...props}
          onChange={(e) => {
            setLocalValue(e.target.value)
          }}
          value={localValue}
          placeholder={
            allowEmpty && saved && extValue === '' ? '(Vacío)' : undefined
          }
          className={cn(
            'data-[saved=true]:cursor-not-allowed',
            props.className
          )}
        />
      ) : (
        <Input
          disabled={saved}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.stopPropagation()
              handleAccept()
            }
            if (e.key === 'Escape') {
              e.preventDefault()
              e.stopPropagation()
              handleCancel()
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
          className={cn(
            'data-[saved=true]:cursor-not-allowed',
            props.className
          )}
        />
      )}
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          data-saved={saved}
          onClick={handleAccept}
          variant={saved ? 'outline' : 'default'}
          className={cn('transition-colors')}
        >
          {saved ? 'Modificar' : 'Guardar'}
        </Button>
        {withCancelButton && !saved && (
          <Button type="button" variant={'destructive'} onClick={handleCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </div>
  )
}
