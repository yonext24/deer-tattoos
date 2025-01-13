import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Tattoo } from '../types/tattoo'
import { Artist } from '../types/artist'
import { SearchParamsType } from '../types/common'
import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { FacebookIcon } from 'lucide-react'
import { pageData } from '../backend/utils/data'

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

export const normalizeDates = ({
  date_from,
  date_to,
}: {
  date_from: string | null | undefined
  date_to: string | null | undefined
}) => {
  if (!date_from || !date_to) {
    const today = new Date()
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    )
    return {
      date_from: lastWeek.toISOString().split('T')[0],
      date_to: today.toISOString().split('T')[0],
    }
  }

  return {
    date_from,
    date_to,
  }
}

export const getDirtyData = (
  data: any,
  dirtyFields: { [key: string]: boolean | undefined }
) => {
  const dirtyData: any = {}
  for (const key in dirtyFields) {
    if (dirtyFields[key]) {
      dirtyData[key] = data[key]
    }
  }
  return dirtyData
}

type mediaType = {
  key_name: 'instagram' | 'facebook' | 'twitter'
  href: string
  icon: any
}


export const transformPageMedias = (data: pageData): Array<Omit<mediaType, 'key_name'>> => {
  const medias: Array<Omit<Omit<mediaType, 'name'>, 'href'>> = [
    {
      key_name: 'instagram',
      icon: InstagramLogoIcon,
    },
    {
      key_name: 'facebook',
      icon: FacebookIcon,
    },
    {
      key_name: 'twitter',
      icon: TwitterLogoIcon,
    },
  ]

  return medias.map(({ key_name, ...el }) => ({ ...el, href: data[key_name] })).filter(el => el.href)
}

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_STOREFRONT_ACCESS_TOKEN'];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        '\n'
      )}\n`
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes('[') ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes(']')
  ) {
    throw new Error(
      'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.'
    );
  }
};
