import { useEffect } from 'react'

export function usePressKey(callback: (e: KeyboardEvent) => void) {
  useEffect(() => {
    if (!document) return

    const func = (e: KeyboardEvent) => {
      callback(e)
    }

    document.addEventListener('keydown', func)

    return () => {
      document.removeEventListener('keydown', func)
    }
  }, [callback])
}
