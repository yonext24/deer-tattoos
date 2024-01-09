import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Tattoo } from '../types/tattoo'
import { Artist } from '../types/artist'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const searchInEvery = (search: string, arr: string[]) => {
  for (const el of arr) {
    if (el.includes(search)) return true
  }
  return false
}

export function removeAccents(input: string): string {
  const accentMap: { [key: string]: string } = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    ü: 'u',
  }

  return input.replace(/[áéíóúü]/gi, function (match) {
    return accentMap[match.toLowerCase()] || match
  })
}

export const parseArtistMedias = (medias: Artist['medias']) => {
  return Object.entries(medias)
    .filter(([key, value]) => Boolean(value))
    .map(([key, value]) => {
      return {
        text: key,
        url: value as string,
      }
    })
}

export const filterTattoos = (
  _tattoos: Tattoo[],
  { search, style }: { search?: string; style?: string | string[] }
) => {
  return _tattoos.filter((el) => {
    const stylesOfTattoo = el.styles
    const normalizedStylesOfTattoo = stylesOfTattoo.map((el) =>
      removeAccents(el)
    )

    const stack = []

    if (search) stack.push(searchInEvery(search, el.tags))

    if (Array.isArray(style)) {
      const normalizedPropStyles = style.map((el) => removeAccents(el))

      normalizedPropStyles.forEach((style) => {
        stack.push(normalizedStylesOfTattoo.includes(style))
      })
    }
    if (typeof style === 'string') {
      stack.push(normalizedStylesOfTattoo.includes(removeAccents(style)))
    }

    return stack.every((el) => el)
  })
}

export const paginate = <T>(
  array: T[],
  { size, page }: { size: string | number; page: string | number }
) => {
  const parsedSize = parseInt(size as string)
  const parsedPage = parseInt(page as string)

  const offset = (parsedPage - 1) * parsedSize
  const data = array.slice(offset).slice(0, parsedSize)
  const total = Math.ceil(array.length / parsedSize)

  return {
    data,
    total,
    parsedPage,
  }
}
