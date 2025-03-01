/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'

export function useFocusTrap<T extends HTMLElement = HTMLElement>({
  focusOnDestroy,
  lagFirst = 150,
}: {
  focusOnDestroy?: string
  lagFirst?: number
}) {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    //add any focusable HTML element you want to include to this string
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const lagFocus = async () => {
      await new Promise((res) => setTimeout(res, lagFirst))
      firstElement.focus()
    }
    lagFocus()

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (!elementRef?.current?.contains(document.activeElement)) {
        firstElement.focus()
        return
      }

      if (event.key === 'Tab') {
        if (document.activeElement)
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault()
            firstElement.focus()
          }
      }
    }

    document.addEventListener('keydown', handleTabKeyPress)

    return () => {
      document.removeEventListener('keydown', handleTabKeyPress)
      if (focusOnDestroy) {
        document.querySelector<HTMLElement>(focusOnDestroy)?.focus?.()
      }
    }
  }, [elementRef])

  return elementRef
}
