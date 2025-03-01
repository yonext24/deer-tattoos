import { useState } from 'react'

export const useStateWithLoading = <T extends any>(initialState: T) => {
  const [state, setState] = useState<{
    state: T
    status: 'idle' | 'error' | 'loading' | 'success'
    error: string | null
  }>({ error: null, status: 'idle', state: initialState })

  const updateState: (data: T | (() => Promise<T>)) => void = async (data) => {
    if (typeof data !== 'function') {
      setState({ state: data as T, status: 'success', error: null })
      return
    }

    setState({ ...state, status: 'loading', error: null })
    const fn = data as () => Promise<T>

    try {
      const s = await fn()
      setState({ ...state, state: s, status: 'success' })
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'Algo salió mal'
      setState({ ...state, error: message, status: 'error' })
    }
  }

  return { ...state, updateState }
}
