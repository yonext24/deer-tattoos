/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { ImageSelectorButton } from '../../common/image-selector-button'
import { ImageCropper } from '../../common/image-cropper'
import { useControlledPicker } from '@/hooks/useControlledPicker'
import { forwardRef } from 'react'
import { modalStyles } from '@/lib/utils/styles'

export const ProfilePicker = forwardRef(function ProfilePicker(
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
    onCancel,
  } = useControlledPicker({ onChange, ref })

  return (
    <>
      <ImageSelectorButton
        onChange={(e) => {
          setOriginalFile(e.target.files?.[0])
        }}
      />
      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent className={modalStyles({})}>
          <ImageCropper
            onCancel={onCancel}
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
})
