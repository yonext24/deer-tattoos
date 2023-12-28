import { ReadonlyURLSearchParams } from 'next/navigation'

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

  return `${pathname}${queryString}`
}

export const generateParams = (params?: {
  [key: string]: string | string[] | undefined
}) => {
  const urlParams = new URLSearchParams()

  if (!params) return urlParams

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => urlParams.append(key, val))
    } else {
      urlParams.set(key, value ?? '')
    }
  })

  return urlParams
}
