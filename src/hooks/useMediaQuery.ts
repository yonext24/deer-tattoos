/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string, initialState: boolean = false) {
  const [breakpoint, setBreakpoint] = useState<boolean>(() => {
    if (typeof window === 'undefined') return initialState
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (!window) return
    const media = window.matchMedia(query)

    const onChange = (e: MediaQueryListEvent) => {
      setBreakpoint(e.matches)
    }

    media.addEventListener('change', onChange)

    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [])

  return breakpoint
}