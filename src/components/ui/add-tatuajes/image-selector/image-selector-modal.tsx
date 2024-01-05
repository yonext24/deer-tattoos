/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/shadcn/ui/button'
import { getScale } from '@/lib/utils/canvas-preview'
import { useEffect, useRef, useState } from 'react'
import ReactCrop, { PixelCrop, type Crop } from 'react-image-crop'

export function ImageSelectorModal({
  img,
  crop,
  setCrop,
  setCropped,
  setImageData,
  setImage,
}: {
  img: File
  crop: Crop
  setCrop: (c: Crop) => void
  setCropped: (c: PixelCrop) => void
  setImageData: (data: ReturnType<typeof getScale>) => void
  setImage: (img: HTMLImageElement) => void
}) {
  const [imgUrl, setImgUrl] = useState<string>('')
  const [localCrop, setLocalCrop] = useState<PixelCrop>()

  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!imgRef.current) return
    setImage(imgRef.current)
  }, [imgRef.current])

  useEffect(() => {
    if (!img) return

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      setImgUrl(reader.result as string)
    })

    reader.readAsDataURL(img)
  }, [img])

  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-xl font-extralight">Acomodá la imágen</h5>

      <div className="flex flex-1">
        <ReactCrop
          minHeight={400}
          minWidth={500}
          crop={crop}
          onChange={setCrop}
          onComplete={setLocalCrop}
        >
          <img ref={imgRef} src={imgUrl} alt="Crop me" className="w-[500px]" />
        </ReactCrop>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => {
            setImageData(getScale(imgRef.current!))
            setCropped(crop as PixelCrop)
          }}
        >
          Guardar
        </Button>
        <Button>Cancelar</Button>
      </div>
    </div>
  )
}
