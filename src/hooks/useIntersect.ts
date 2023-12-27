import { useCallback, useEffect, useRef, useState } from 'react'

export function useIntersect({
  rootMargin,
  threshold = 0,
  once = true, // name,
}: {
  rootMargin?: string
  threshold?: number
  once?: boolean
  // name?: string // <-- For debugging purposes
}) {
  const [intersecting, setIntersecting] = useState<boolean>(false)

  const fromRef = useRef<HTMLDivElement>(null)

  const handleIntersect = useCallback(
    ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
      setIntersecting((prev) => {
        if (isIntersecting && !prev) {
          return true
        }
        if (!isIntersecting && prev && !once) {
          return false
        }
        return prev
      })
    },
    [once, setIntersecting],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin,
      threshold,
    })

    if (fromRef.current) {
      observer.observe(fromRef.current)
    }

    return () => {
      if (fromRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(fromRef.current)
      }
    }
  }, [fromRef, handleIntersect, rootMargin, threshold])

  return { intersecting, fromRef }
}
