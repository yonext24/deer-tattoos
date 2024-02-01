import { getPlaiceholder } from 'plaiceholder'
import { imageSize } from 'image-size'
import { removeAccents } from '@/lib/utils/utils'
import { prisma } from '@backend/prisma'

const extraWords = ['tatuaje', 'tattoo', 'ink']

const normalizeValue = (str: string | number) => {
  return encodeURI(
    removeAccents(String(str).toLowerCase()).replaceAll(' ', '-')
  )
}

export const generateTattooSlug = async (title: string, styles: string[]) => {
  const notTriedExtraWords = [...extraWords]

  let alreadyTriedRaw = false
  let retryNumber = 1
  let initialSlice = styles.length >= 2 ? 2 : styles.length

  const normalizedTitle = normalizeValue(title)
  const normalizedStyles = styles
    .map((style) => normalizeValue(style))
    .filter((el) => el !== normalizedTitle)

  while (true) {
    const stylesSlug = normalizedStyles.slice(0, initialSlice)

    let slug = normalizedTitle + '-' + [...stylesSlug].join('-')

    if (alreadyTriedRaw) {
      const pickedWord = notTriedExtraWords.pop()
      if (pickedWord) {
        slug += `-${pickedWord}`
      } else {
        slug += `-${retryNumber}`
        retryNumber++
      }
    }

    if (initialSlice === styles.length - 1) {
      alreadyTriedRaw = true
    } else initialSlice++

    const tattoo = await prisma.tattoo.findUnique({
      where: {
        slug,
      },
    })

    if (!tattoo) {
      return slug
    }
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

export const getBase64 = async (file: Blob, size: number = 15) => {
  try {
    const arrBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrBuffer)
    const { base64 } = await getPlaiceholder(buffer, { size })
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
