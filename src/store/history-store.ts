"use client"

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { create } from 'zustand'

type HistoryStore = {
  prevPath: string | null,
  currentPath: string | null,
  setPath: (path: string) => void
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  prevPath: null,
  currentPath: null,
  setPath: (path) => set(() => ({
    prevPath: get().currentPath,
    currentPath: path
  }))
}))

export const useHistory = () => {
  const pathname = usePathname()
  const { currentPath, setPath } = useHistoryStore(s => s)

  useEffect(() => {
    if (!currentPath) {
      setPath(pathname)
      return
    }
    if (pathname.split('?')[0] === currentPath.split('?')[0]) return

    setPath(pathname)
  }, [pathname, currentPath, setPath])
}
