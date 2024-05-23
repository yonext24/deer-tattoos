import { RefObject, useEffect, useRef } from 'react'

export function useClickOutside(
  elementRef: RefObject<HTMLElement>,
  callback: () => void,
  excludedIds: string[] = []
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const excludedIdsElements: Node[] = []
      excludedIds.forEach(id => {
        const found = document.querySelector(`#${id}`)
        if (!found) return
        excludedIdsElements.push(found)
      })

      const someExcludedElementContainsClick = excludedIdsElements.some(node => {
        return node.contains(event.target as any)
      })

      if (someExcludedElementContainsClick) {
        return
      }

      console.log(elementRef.current)

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
  }, [elementRef, callback, excludedIds])
}
