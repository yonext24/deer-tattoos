import { RefObject, useEffect, useRef } from 'react'

export function useClickOutside(
  elementRef: RefObject<HTMLElement>,
  callback: () => void
) {
  const callbackRef = useRef(callback)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // event.preventDefault()
      if (
        elementRef &&
        elementRef.current &&
        !elementRef.current.contains(event.target as any)
      ) {
        callbackRef.current()
      }
      return
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [elementRef, callback])
}
