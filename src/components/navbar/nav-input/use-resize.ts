/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

type sizeType = { x: number; y: number }

export function useResize() {
  const [size, setSize] = useState<sizeType | null>(null)

  useEffect(() => {
    const resizeFunc = () => {
      setSize({ x: window.innerWidth, y: window.innerHeight })
    }

    window.addEventListener('resize', resizeFunc)

    return () => {
      window.removeEventListener('resize', resizeFunc)
    }
  }, [])

  return size
}
