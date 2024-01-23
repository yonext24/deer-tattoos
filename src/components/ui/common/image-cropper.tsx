/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import 'react-image-crop/dist/ReactCrop.css'
import { useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import Spinner from './spinner'
import { SubmitButton } from './submit-button'
import { Button } from '@/components/shadcn/ui/button'
import { getScale } from '@/lib/utils/canvas-preview'
import { generateImageUrl } from '@/lib/utils/generateImageUrl'

export function ImageCropper({
  image,
  onCompleted,
  initialCrop,
  minWidth,
  minHeight,
  aspect,
}: {
  image?: File
  onCompleted: ({
    previewUrl,
    cropped,
  }: {
    previewUrl: string
    cropped: Blob
    height: number
    width: number
    original?: File
  }) => void
  initialCrop: Crop
  minWidth: number
  minHeight: number
  aspect: number
}) {
  const [crop, setCrop] = useState<Crop>(initialCrop)
  const [imgUrl, setImgUrl] = useState<string>()
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgUrl || !image) return

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      setImgUrl(reader.result as string)
    })

    reader.readAsDataURL(image)
  }, [image])

  const handleComplete = async () => {
    if (!imageRef.current) return

    const imageData = getScale(imageRef.current)
    const { previewUrl, blob } = await generateImageUrl(
      imageRef.current,
      crop as PixelCrop,
      imageData
    )

    onCompleted({
      previewUrl,
      cropped: blob,
      height: crop.height,
      width: crop.width,
      original: image,
    })
  }

  return (
    <div className="flex flex-col">
      {!imgUrl ? (
        <Spinner />
      ) : (
        <>
          <ReactCrop
            crop={crop}
            aspect={aspect}
            minHeight={minHeight}
            minWidth={minWidth}
            onChange={setCrop}
          >
            <img
              ref={imageRef}
              src={imgUrl}
              alt="Crop me"
              className="w-[500px]"
            />
          </ReactCrop>
          <div className="grid grid-cols-2 gap-2">
            <SubmitButton text="Guardar" onClick={handleComplete} />
            <Button>Cancelar</Button>
          </div>
        </>
      )}
    </div>
  )
}
