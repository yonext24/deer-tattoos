/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { ImageSelectorButton } from '../../common/image-selector-button'
import { ImageCropper } from '../../common/image-cropper'
import { useControlledPicker } from '@/hooks/useControlledPicker'
import { forwardRef } from 'react'

export const BackgroundPicker = forwardRef(function BackgroundPicker(
  {
    onChange,
  }: {
    value: File
    onChange: (file: any) => void
  },
  ref
) {
  const {
    open,
    setOriginalFile,
    originalFile,
    croppedUrl,
    onCompleted,
    setOpen,
  } = useControlledPicker({ onChange, ref })

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
            minHeight={60}
            minWidth={150}
            aspect={300 / 120}
            initialCrop={{
              unit: 'px',
              width: 300,
              height: 120,
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
          style={{ maxWidth: 300, maxHeight: 120 }}
        />
      )}
    </>
  )
})
