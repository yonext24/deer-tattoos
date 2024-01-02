import { RefObject, useEffect } from 'react'

export function useClickOutside(
  elementRef: RefObject<HTMLElement>,
  callback: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      event.preventDefault()

      if (
        elementRef &&
        elementRef.current &&
        !elementRef.current.contains(event.target as HTMLElement)
      ) {
        callback()
      }
    }

    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [elementRef, callback])
}
