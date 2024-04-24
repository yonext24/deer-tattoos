// This does something similar to the ReactCSSTransitionGroup package but simplified.
import { useEffect, useState } from 'react'

export function CSSTransition({
  children,
  isIn,
  transitionDuration = 300,
  // debug,
}: {
  transitionDuration?: number
  children: React.ReactNode
  isIn: boolean
  // debug?: boolean
}) {
  const [showing, setShowing] = useState<boolean>(isIn)

  // debug && console.log({ isIn, showing })

  useEffect(() => {
    if (showing && !isIn) {
      const timeout = setTimeout(() => {
        setShowing(false)
      }, transitionDuration)

      return () => {
        clearTimeout(timeout)
      }
    }

    if (!showing && isIn) {
      const timeout = setTimeout(() => {
        setShowing(true)
      }, transitionDuration)

      return () => {
        clearTimeout(timeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIn])

  if (!showing) return null

  return children
}
