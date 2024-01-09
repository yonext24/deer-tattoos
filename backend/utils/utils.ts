import { getPlaiceholder } from 'plaiceholder'
import { imageSize } from 'image-size'
import { removeAccents } from '@/lib/utils/utils'
import { prisma } from '@backend/prisma'

const extraWords = ['tatuaje', 'tattoo']

export const generateTattooSlug = async (title: string, styles: string[]) => {
  const notTriedExtraWords = [...extraWords]

  let retryNumber = 0
  let initialSlice = styles.length >= 2 ? 2 : styles.length

  while (true) {
    const stylesSlug = styles
      .slice(0, initialSlice)
      .map((style) => removeAccents(style))

    const slug =
      removeAccents(title.toLowerCase().replaceAll(' ', '-')) +
      '-' +
      [...stylesSlug].join('-') +
      (retryNumber ? `-${retryNumber}` : '')

    const tattoo = await prisma.tattoo.findUnique({
      where: {
        slug,
      },
    })

    if (!tattoo) {
      return slug
    }

    retryNumber++
  }
}

export const generateArtistSlug = async (name: string, user?: string) => {
  if (user) return user

  let retryNumber = 0
  while (true) {
    const slug =
      name.toLowerCase().replace(/\s/g, '-') +
      (retryNumber ? `-${retryNumber}` : '')

    const exists = await prisma.artist
      .findUnique({ where: { slug } })
      .then((artist) => {
        return Boolean(artist)
      })

    if (!exists) return slug
    retryNumber++
  }
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
