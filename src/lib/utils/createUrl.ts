import { ReadonlyURLSearchParams } from 'next/navigation'

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

  return `${pathname}${queryString}`
}

export const generateParams = (
  params?:
    | ReadonlyURLSearchParams
    | {
        [key: string]: string | string[] | undefined
      },
) => {
  const urlParams = new URLSearchParams()

  if (!params) return urlParams

  if (params instanceof ReadonlyURLSearchParams) {
    const arr = Array.from(params.entries())

    arr.forEach(([key, value]) => {
      urlParams.append(key, value)
    })
  } else {
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => urlParams.append(key, val))
      } else {
        urlParams.set(key, value ?? '')
      }
    })
  }

  return urlParams
}

export const matchPathname = (pathname: string) => {
  const acceptedPathnames = ['/tatuajes', '/tatuador/*/tatuajes']
  const accepted =
    acceptedPathnames.find((path) => {
      const reg = new RegExp(`^${path}`.replace('*', '[a-zA-Z]+'))
      return reg.test(pathname)
    }) !== undefined

  if (accepted) return pathname

  return accepted
}
