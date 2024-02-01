import { ReadonlyURLSearchParams } from 'next/navigation'

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
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
      }
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

// Esta función se encarga de matchear el path actual, y si es uno de los aceptados, lo devuelve, sinó devuelve false
// para que se pueda utilizar de esta forma: matchPathname(current) || <default_path>
export const matchPathname = (pathname: string, arrayOfPaths?: string[]) => {
  const acceptedPathnames = arrayOfPaths ?? [
    '/tatuajes',
    '/tatuador/*/tatuajes',
  ]
  const regCreator = (path: string) => {
    let baseReg = `^${path.replaceAll('/', String.raw`\/`)}`.replace(
      '*',
      '[a-zA-Z]+'
    )
    if (!baseReg.endsWith('+')) {
      // This is done this way to avoid cases where the regex ends with
      // +* wich causes the page to crash
      baseReg += '*'
    }
    baseReg += '$'
    return baseReg
  }

  const accepted =
    acceptedPathnames.find((path) => {
      const reg = new RegExp(regCreator(path))
      return reg.test(pathname)
    }) !== undefined

  if (accepted) return pathname

  return accepted
}
