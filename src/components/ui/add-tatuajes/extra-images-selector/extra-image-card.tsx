import { ExtraImageCardOptions } from './extra-image-card-options'

/* eslint-disable @next/next/no-img-element */
export function ExtraImageCard({
  src,
  handleMoveLeft,
  handleMoveRight,
  handleRemove,
}: {
  src: string
  handleRemove: () => void
  handleMoveLeft: () => void
  handleMoveRight: () => void
}) {
  return (
    <div className="relative w-full">
      <img src={src} alt="Image" className="w-full h-full object-cover" />
      <ExtraImageCardOptions
        handleMoveLeft={handleMoveLeft}
        handleMoveRight={handleMoveRight}
        handleRemove={handleRemove}
      />
    </div>
  )
}
