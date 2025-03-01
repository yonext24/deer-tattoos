export const fetchHandler = async (res: Response) => {
  const contentType = res.headers.get('content-type')
  const isJson = contentType && contentType.includes('application/json')

  if (!res.ok) {
    if (isJson) {
      const errRes = await res.json()
      if (errRes?.error) {
        throw new Error(errRes.error)
      } else
        throw new Error('Ocurrió un error inesperado, vuelva a intentarlo.')
    } else {
      throw new Error('Ocurrió un error inesperado, vuelva a intentarlo.')
    }
  }

  if (isJson) {
    const data = await res.json()
    return data
  }
}

export const appFetch = async <T = any>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    return fetch(url, options).then(fetchHandler)
  } catch (err) {
    const errMessage =
      err instanceof Error && err.message === 'Failed to fetch'
        ? 'Ocurrió un error, es posible que el servidor esté caído, si el problema persiste contactá a soporte.'
        : 'Algo salió mal, si el problema persiste contactá a soporte'

    throw new Error(errMessage)
  }
}

export const errorParser = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Algo salió mal, porfavor inténtalo denuevo.'
}
