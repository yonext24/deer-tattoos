/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import 'react-image-crop/dist/ReactCrop.css'
import { ImageSelectorButton } from '../../common/image-selector-button'
import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { Crop } from 'react-image-crop'
import { TattooCard } from '@/components/tattoo-card/tattoo-card'
import { AddTatuajesFormValues } from '../use-add-tatuajes-form'
import {
  onCompletedFuncProps,
  useControlledPicker,
} from '@/hooks/useControlledPicker'
import { ImageCropper } from '../../common/image-cropper'
import { forwardRef } from 'react'
import { modalStyles } from '@/lib/utils/styles'

const initialCrop: Crop = {
  height: 80,
  width: 100,
  x: 0,
  y: 0,
  unit: 'px',
}

export const ImageSelector = forwardRef(function ImageSelector(
  {
    onChange,
  }: {
    value: AddTatuajesFormValues['image']
    onChange: (data: any) => void
  },
  ref
) {
  const handleChange = () => {}

  const {
    open,
    setOpen,
    setCroppedUrl,
    croppedUrl,
    originalFile,
    setOriginalFile,
    hasImageBeenInitialized,
    onCancel,
  } = useControlledPicker({ onChange: handleChange, ref })

  const onCompleted = ({
    width,
    height,
    cropped,
    previewUrl,
    original,
  }: onCompletedFuncProps) => {
    setCroppedUrl(previewUrl)
    onChange({
      card_width: width,
      card_height: height,
      card: cropped,
      original,
    })
    hasImageBeenInitialized.current = true
    setOpen(false)
  }

  return (
    <>
      <ImageSelectorButton
        onChange={(e) => {
          onCancel()
          setOriginalFile(e.target.files?.[0])
        }}
      />

      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent className={modalStyles({})}>
          <ImageCropper
            onCancel={onCancel}
            image={originalFile}
            minHeight={80}
            minWidth={100}
            aspect={500 / 400}
            initialCrop={initialCrop}
            onCompleted={onCompleted}
          />
        </DialogContent>
      </Dialog>

      {croppedUrl && (
        <div className="w-[500px]">
          <TattooCard
            artistSlug=""
            title=""
            id={''}
            slug=""
            createdAt={new Date()}
            updatedAt={new Date()}
            images={{
              images: [],
              card: {
                src: croppedUrl,
                height: 400,
                width: 500,
                blured:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVR4nAE0AMv/AIuIgp+RheKbgIN2agCysqvHqpb/0bDQ0c0AAAcFv5F4/+bV//74ACAAAHdOQDEtKmZlYOcbGgr8U4zeAAAAAElFTkSuQmCC',
              },
            }}
            styles={[]}
            tags={[]}
            type="single"
            withAnimation={false}
          />
        </div>
      )}
    </>
  )
})
