/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { DialogContent, DialogHeader } from '@/components/shadcn/ui/dialog'
import { ImageSelectorButton } from '../../common/image-selector-button'
import { ExtraImageCard } from './extra-image-card'
import { Image } from './use-extra-images-selector'

export function ExtraImagesModal({
  images,
  moveToLeft,
  moveToRight,
  deleteImage,
  handleImageAdd,
}: {
  images: Image[]
  moveToLeft: (index: number) => void
  moveToRight: (index: number) => void
  deleteImage: (index: number) => void
  handleImageAdd: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <DialogContent className="max-w-2xl max-h-[calc(100vh-10px)] overflow-y-auto">
      <DialogHeader>Imágenes extra</DialogHeader>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {images.map((image, index) => {
          const handleMoveToLeft = () => {
            if (index === 0) return
            moveToLeft(index)
          }
          const handleMoveToRight = () => {
            if (index === images.length - 1) return
            moveToRight(index)
          }
          const handleRemove = () => {
            deleteImage(index)
          }

          return (
            <ExtraImageCard
              src={image.url}
              key={image.url}
              handleMoveLeft={handleMoveToLeft}
              handleMoveRight={handleMoveToRight}
              handleRemove={handleRemove}
            />
          )
        })}
        <ImageSelectorButton
          className="h-full w-full min-h-[150px]"
          onChange={handleImageAdd}
        />
      </div>
    </DialogContent>
  )
}
