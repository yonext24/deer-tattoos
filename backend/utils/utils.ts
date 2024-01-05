import { getPlaiceholder } from 'plaiceholder'
import { imageSize } from 'image-size'

export const generateTattooSlug = (
  title: string,
  styles: string[],
  tags: string[],
  retryNumber: number,
) => {
  const stylesSlug = styles.map((style) => style)
  const tagsSlug = tags.map((tag) => tag)

  return (
    title +
    '-' +
    [...stylesSlug, ...tagsSlug].join('-') +
    (retryNumber ? `-${retryNumber}` : '')
  )
}

export const getBase64 = async (file: Blob) => {
  try {
    const arrBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrBuffer)
    const { base64 } = await getPlaiceholder(buffer)
    return base64
  } catch (error) {
    //error handling
    if (error instanceof Error) return error.message
    else if (error && typeof error === 'object' && 'message' in error)
      return error.message
    else if (typeof error === 'string') return error
    else return 'Unexpected error!'
  }
}

export const getImageDimensions = async (file: Blob) => {
  const arrBuffer = await file.arrayBuffer()
  const uiArr = new Uint8Array(arrBuffer)

  const { height, width } = imageSize(uiArr)
  return { height, width }
}
