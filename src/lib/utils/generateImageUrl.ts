import { PixelCrop } from 'react-image-crop'
import { canvasPreview, getScale } from './canvas-preview'

let previewUrl = ''

function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  console.log(canvas)
  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/webp')
  })
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function generateImageUrl(
  image: HTMLImageElement,
  crop: PixelCrop,
  imageData: ReturnType<typeof getScale>,
  scale = 1
) {
  const canvas = document.createElement('canvas')

  canvasPreview(image, canvas, crop, imageData, scale)

  const blob = await toBlob(canvas)

  if (!blob) {
    throw new Error('Ocurrió un error con la imágen')
  }

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl)
  }

  previewUrl = URL.createObjectURL(blob)

  return { previewUrl, blob }
}
