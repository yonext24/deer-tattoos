import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Tattoo } from '../types/tattoo'
import { Artist } from '../types/artist'
import { SearchParamsType } from '../types/common'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const searchInEvery = (search: string, arr: string[]) => {
  for (const el of arr) {
    if (el.includes(search)) return true
  }
  return false
}

export const transformSearchParams = <
  TransformSearchParamsArgs extends { [key: string]: 'unique' | 'multiple' },
>(
  params: SearchParamsType,
  args: TransformSearchParamsArgs
): {
  [K in keyof TransformSearchParamsArgs]: TransformSearchParamsArgs[K] extends 'unique'
    ? string | undefined
    : string[] | undefined
} => {
  const newParams: {
    [K in keyof TransformSearchParamsArgs]: TransformSearchParamsArgs[K]
  } = {} as any

  Object.keys(args).forEach((key) => {
    const value = params[key as keyof SearchParamsType]
    const type = args[key as keyof TransformSearchParamsArgs]

    if (value) {
      if (type === 'multiple') {
        if (value && Array.isArray(value)) {
          newParams[key as keyof TransformSearchParamsArgs] = value as any
        } else if (value && typeof value === 'string') {
          newParams[key as keyof TransformSearchParamsArgs] = [value] as any
        }
      } else {
        if (value && typeof value === 'string')
          newParams[key as keyof TransformSearchParamsArgs] = value as any
        else if (value && Array.isArray(value))
          newParams[key as keyof TransformSearchParamsArgs] = value[0] as any
      }
    }
  })

  return newParams as any
  // fuck it, this works
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

