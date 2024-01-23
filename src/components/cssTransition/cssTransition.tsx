// This does something similar to the ReactCSSTransitionGroup package but very simplified.

import { useEffect, useState } from 'react'

// It only mounts on enter
export function CSSTransition({
  children,
  isIn,
  transitionDuration = 300,
}: {
  transitionDuration?: number
  children: React.ReactNode
  isIn: boolean
}) {
  const [showing, setShowing] = useState<boolean>(true) // This should be initialized with mountOnEnter prop but since i dont accept it i will just set it to true

  useEffect(() => {
    if (!showing || isIn) return
    const timeout = setTimeout(() => {
      setShowing(false)
    }, transitionDuration)

    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIn])

  if (!showing) return null

  return children
}
