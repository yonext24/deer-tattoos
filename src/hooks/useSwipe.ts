import { useRef, useEffect } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  offsetXTreshhold?: number
  offsetYTreshhold?: number
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  offsetXTreshhold = 100,
  offsetYTreshhold = 100,
}: SwipeHandlers): void {
  const initialX = useRef<number | null>(null)
  const initialY = useRef<number | null>(null)

  useEffect(() => {
    const touchStart = (e: TouchEvent) => {
      initialX.current = e.touches[0].clientX
      initialY.current = e.touches[0].clientY
    }

    const touchEnd = (e: TouchEvent) => {
      if (initialX.current === null || initialY.current === null) {
        return
      }

      let finalX = e.changedTouches[0].clientX
      let finalY = e.changedTouches[0].clientY
      let diffX = initialX.current - finalX
      let diffY = initialY.current - finalY

      const isMainlyHorizontal = Math.abs(diffX) > Math.abs(diffY)

      console.log({ isMainlyHorizontal, diffX, diffY })

      if (isMainlyHorizontal) {
        if (diffX > 10) {
          // Swipe left detected
          onSwipeLeft?.()
        } else if (diffX < offsetXTreshhold) {
          // Swipe right detected
          onSwipeRight?.()
        }
      }

      if (!isMainlyHorizontal) {
        if (diffY > 10) {
          // Swipe up detected
          onSwipeUp?.()
        } else if (diffY < offsetYTreshhold) {
          // Swipe down detected
          onSwipeDown?.()
        }
      }

      initialX.current = null
      initialY.current = null
    }

    document.addEventListener('touchstart', touchStart, false)
    document.addEventListener('touchend', touchEnd, false)

    return () => {
      document.removeEventListener('touchstart', touchStart)
      document.removeEventListener('touchend', touchEnd)
    }
  }, [
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    offsetXTreshhold,
    offsetYTreshhold,
  ])
}
