'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { SearchResponse } from '@/app/api/search/route'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { createUrl, matchPathname } from '@/lib/utils/createUrl'
import debounce from 'just-debounce-it'
import { useRouter } from 'next-nprogress-bar'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

const resolveArtist = (pathname: string) => {
  const reg = new RegExp('/tatuador/(.*)/tatuajes')
  const match = reg.exec(pathname)
  if (match) return match[1]
  return null
}

export function useNavInput() {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const [value, setValue] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [open, setOpen] = useState<boolean>(false)
  const [showingCategories, setShowingCategories] = useState<boolean>(false)
  const [artist, setArtist] = useState<string | null>(() => {
    return resolveArtist(pathname)
  })
  const alreadyMadeSearchs = useRef<{ [key: string]: SearchResponse }>({})

  useEffect(() => {
    setArtist(resolveArtist(pathname))
  }, [pathname])

  const [search, setSearch] = useState<SearchResponse>([])
  const [styles, setStyles] = useState<string[]>([])

  const isFirstFocus = useRef<boolean>(true)
  const formRef = useRef<HTMLFormElement>(null)

  const isMobile = useMediaQuery('(max-width:600px)')

  const paramsStyles = params.getAll('style')

  useEffect(() => {
    if (paramsStyles.length === 0) return setStyles([])
    setStyles(paramsStyles)
  }, [JSON.stringify(paramsStyles)])

  useEffect(() => {
    if (open) return
    setCurrentIndex(-1)
  }, [open])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | number) => {
    if (typeof e !== 'number') {
      e.preventDefault?.()
    }

    if (
      !value &&
      !params.get('search') &&
      !params.get('style') &&
      currentIndex === -1
    )
      return

    const newParams = new URLSearchParams()
    if (styles.length > 0) {
      styles.forEach((style) => {
        newParams.append('style', style)
      })
    }

    const indexToUse = typeof e === 'number' ? e : currentIndex

    if (indexToUse > -1) {
      const item = search[indexToUse]
      setValue('')

      if (item.type === 'search') {
        newParams.set('search', item.content)
      } else if (item.type === 'category') {
        newParams.append('style', item.content)
      } else if (item.type === 'artist') {
        router.push(item.href)
        return
      }
    } else if (value) {
      newParams.set('search', value)
    }

    // setShowingCategories(false)
    setOpen(false)
    setSearch([])

    const pathToUse = artist
      ? `/tatuador/${artist}/tatuajes`
      : matchPathname(pathname) || '/tatuajes'

    router.push(createUrl(pathToUse, newParams))
  }

  const debouncedGetSearch = useCallback(
    debounce(async (search: string, active: boolean) => {
      if (alreadyMadeSearchs.current[search]) {
        setSearch(alreadyMadeSearchs.current[search])
        if (alreadyMadeSearchs.current[search].length > 0) setOpen(true)
        return
      }
      fetch('/api/search?q=' + search)
        .then((res) => res.json())
        .then((data: SearchResponse) => {
          alreadyMadeSearchs.current[search] = data
          if (active) {
            startTransition(() => {
              setSearch(data)
            })
            if (data.length > 0) setOpen(true)
          }
        })
    }, 100),
    []
  )

  useEffect(() => {
    let active = true
    if (!value) return setSearch([])

    debouncedGetSearch(value, active)
    return () => {
      active = false
    }
  }, [value, setSearch, debouncedGetSearch])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (['Escape', 'ArrowDown', 'ArrowUp'].includes(e.key)) e.preventDefault()

      if (e.key === 'Escape') {
        setOpen(false)
      } else if (e.key === 'ArrowDown') {
        setCurrentIndex((prev) => {
          if (prev === search.length - 1) return 0
          return prev + 1
        })
      } else if (e.key === 'ArrowUp') {
        setCurrentIndex((prev) => {
          if (prev === 0) return search.length - 1
          return prev - 1
        })
      }
    },
    [search.length]
  )

  const handleClose = () => {
    setOpen(false)
    setShowingCategories(false)
  }

  const handleOptionClick = (index: number) => {
    handleSubmit(index)
    setCurrentIndex(index)
  }

  const handleBlur = () => {
    // setTimeout(() => {
    //   setOpen(false)
    // }, 100)
  }

  const handleFocus = () => {
    setShowingCategories(true)
    if (!isFirstFocus.current) return

    isFirstFocus.current = false
    debouncedGetSearch('', true)

    // if (search.length > 0) setOpen(true)
  }

  const handleDeleteStyle = (style: string) => {
    setStyles((prev) => prev.filter((s) => s !== style))
  }
  const handleDeleteArtist = () => {
    setArtist(null)
  }

  return {
    search,
    open,
    value,
    currentIndex,
    formRef,
    styles,
    showingCategories,
    artist,
    isMobile,
    setValue,
    handleSubmit,
    handleKeyDown,
    setOpen,
    handleOptionClick,
    setShowingCategories,
    handleBlur,
    handleFocus,
    handleDeleteStyle,
    handleDeleteArtist,
    handleClose,
  }
}
