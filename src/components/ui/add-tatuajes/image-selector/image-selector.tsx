/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import 'react-image-crop/dist/ReactCrop.css'

import { useEffect, useRef, useState } from 'react'
import { ImageSelectorButton } from '../../common/image-selector-button'
import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { ImageSelectorModal } from './image-selector-modal'
import { Crop, PixelCrop } from 'react-image-crop'
import { getScale } from '@/lib/utils/canvas-preview'
import { generateImageUrl } from '@/lib/utils/generateImageUrl'
import { TattooCard } from '@/components/tattoo-card/tattoo-card'
import { AddTatuajesFormValues } from '../use-add-tatuajes-form'
import { Tattoo } from '@/lib/types/tattoo'

const initialCrop: Crop = {
  height: 400,
  width: 500,
  x: 0,
  y: 0,
  unit: 'px',
}

export function ImageSelector({
  value,
  onChange,
}: {
  value: AddTatuajesFormValues['image']
  onChange: (data: {
    card: Blob
    original: File
    card_width: number
    card_height: number
  }) => void
}) {
  1
  const [open, setOpen] = useState<boolean>(false)
  const [originalImage, setOriginalImage] = useState<File | null>(null)
  const [imageElement, setImageElement] = useState<HTMLImageElement>()
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob>()
  const [crop, setCrop] = useState<Crop>(initialCrop)
  const [imageData, setImageData] = useState<ReturnType<typeof getScale>>()
  const [cropped, setCropped] = useState<PixelCrop>()
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>('')

  const hasImageBeenInitialized = useRef(false)

  useEffect(() => {
    if (!value?.card && hasImageBeenInitialized.current) {
      hasImageBeenInitialized.current = false
      setOpen(false)
      setOriginalImage(null)
      setImageElement(undefined)
      setCroppedImageBlob(undefined)
      setCroppedImageUrl('')
      setCrop(initialCrop)
      setImageData(undefined)
      setCropped(undefined)
    }
  }, [hasImageBeenInitialized.current, value?.card])

  useEffect(() => {
    if (
      croppedImageBlob &&
      originalImage &&
      cropped?.width &&
      cropped?.height
    ) {
      hasImageBeenInitialized.current = true
      onChange({
        card: croppedImageBlob,
        original: originalImage,
        card_width: cropped.width,
        card_height: cropped.height,
      })
    }
  }, [croppedImageBlob, originalImage, cropped])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) return

    setOriginalImage(file)
    setOpen(true)
  }

  useEffect(() => {
    if (imageElement && cropped && imageData) {
      generateImageUrl(imageElement, cropped, imageData).then(
        ({ blob, previewUrl }) => {
          setCroppedImageUrl(previewUrl)
          setCroppedImageBlob(blob)
          setOpen(false)
        }
      )
    }
  }, [JSON.stringify(cropped), imageElement, JSON.stringify(imageData)])

  return (
    <>
      <ImageSelectorButton onChange={onFileChange} />
      <Dialog
        open={open && Boolean(originalImage)}
        onOpenChange={(c) => {
          setOpen(c)
        }}
      >
        <DialogContent className="max-w-[none] w-auto max-h-screen overflow-y-auto my-1">
          {originalImage && (
            <ImageSelectorModal
              setImageData={setImageData}
              crop={crop}
              setCrop={setCrop}
              setImage={setImageElement}
              setCropped={setCropped}
              img={originalImage}
            />
          )}
        </DialogContent>
      </Dialog>

      {croppedImageUrl && (
        <div className="w-[500px]">
          <TattooCard
            artistSlug=""
            id={''}
            slug=""
            images={{
              main: {
                src: '',
                height: 400,
                width: 500,
                blured: '',
              },
              card: {
                src: croppedImageUrl,
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
}
