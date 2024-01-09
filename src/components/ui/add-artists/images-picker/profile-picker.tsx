/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { useEffect, useRef, useState } from 'react'
import { ImageSelectorButton } from '../../common/image-selector-button'
import { ImageCropper } from '../../common/image-cropper'
import { useControlledPicker } from '@/hooks/useControlledPicker'

export function ProfilePicker({
  onChange,
}: {
  value: File
  onChange: (file: any) => void
}) {
  const {
    open,
    setOriginalFile,
    originalFile,
    croppedUrl,
    onCompleted,
    setOpen,
  } = useControlledPicker({ onChange })

  return (
    <>
      <ImageSelectorButton
        onChange={(e) => {
          setOriginalFile(e.target.files?.[0])
        }}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[none] w-auto max-h-screen overflow-y-auto my-1">
          <ImageCropper
            image={originalFile}
            minHeight={300}
            minWidth={300}
            aspect={1}
            initialCrop={{
              unit: 'px',
              width: 300,
              height: 300,
              x: 0,
              y: 0,
            }}
            onCompleted={onCompleted}
          />
        </DialogContent>
      </Dialog>

      {croppedUrl && (
        <img
          src={croppedUrl}
          alt="Imágen cortada"
          style={{
            maxHeight: 200,
            maxWidth: 300,
          }}
        />
      )}
    </>
  )
}
