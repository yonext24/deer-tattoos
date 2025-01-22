'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { SearchResponse } from '@/app/api/search/route'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { createUrl } from '@/lib/utils/createUrl'
import debounce from 'just-debounce-it'
import { useRouter } from 'next-nprogress-bar'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useResize } from './use-resize'
import { cn, measureHipoteticElement } from '@/lib/utils/utils'
import { badgeVariants } from '@/components/shadcn/ui/badge'

const NAV_STYLES_WIDTH_THRESHOLD_PERCENTAGE = 35
// Badges will start overflowing when they overpass the 35% of their parent element

const resolveArtist = (pathname: string) => {
  const reg = new RegExp('/tatuador/(.*)/tatuajes')
  const match = reg.exec(pathname)
  if (match) return match[1]
  return null
}
const resolveIsShop = (pathname: string) => {
  const reg = new RegExp('/shop/*')
  const match = reg.exec(pathname)
  if (match) return true
  return false
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
  const [isShop, setIsShop] = useState<boolean>(resolveIsShop(pathname))
  const alreadyMadeSearchs = useRef<{ [key: string]: SearchResponse }>({})

  useEffect(() => {
    setArtist(resolveArtist(pathname))
    const isShop = resolveIsShop(pathname)
    if (isShop) {
      setOpen(false)
      setIsShop(true)
    } else {
      setIsShop(false)
    }
  }, [pathname])

  const [search, setSearch] = useState<SearchResponse>([])
  const [styles, setStyles] = useState<string[]>([])
  const [stylesDisplay, setStylesDisplay] = useState<{ show: string[], group: string[] }>({ show: [], group: [] })

  const isFirstFocus = useRef<boolean>(true)
  const formRef = useRef<HTMLFormElement>(null)
  const stylesContainerRef = useRef<HTMLDivElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)

  const size = useResize()

  useLayoutEffect(() => {
    /* 
      This effect is in charge of making sure theres no overflow on the style badges that appear in the nav-input
      it will show the special "+number" badge.
      It probably should be a memo, because i can have issues with having two sources of truth, but if i dont use a layoutEffect it can clip at first load
    */
    const getIfOverflowed = (externalSize?: DOMRect): boolean => {
      if (!inputContainerRef.current || (!externalSize && !stylesContainerRef.current)) return false
      let stylesSize

      const inputSize = inputContainerRef.current.getBoundingClientRect()
      const groupBadgeSize = inputContainerRef.current.querySelector('#groupBadge')?.getBoundingClientRect?.()
      const artistBadgeSize = inputContainerRef.current.querySelector('#artistBadge')?.getBoundingClientRect?.()

      if (externalSize) {
        stylesSize = externalSize
      } else {
        if (!stylesContainerRef.current) {
          console.error('Theres no container ref')
          return false
        }
        stylesSize = stylesContainerRef.current.getBoundingClientRect()
      }

      // The "+number" and artist badges doesnt count in the formula
      const normalizedGroupBadgeSize = externalSize ? 0 : groupBadgeSize?.width ? (groupBadgeSize.width + 1) : 0
      const normalizedArtistBadgeSize = externalSize ? 0 : artistBadgeSize?.width ? (artistBadgeSize.width + 1) : 0

      const isThresholdOverflowed = ((stylesSize.width - normalizedGroupBadgeSize - normalizedArtistBadgeSize) / inputSize.width) * 100 > NAV_STYLES_WIDTH_THRESHOLD_PERCENTAGE

      return isThresholdOverflowed
    }

    let isOverflowed = getIfOverflowed()
    if (!isOverflowed && !stylesDisplay.group.length) return

    // If theres a resize on the window and there are styles that are not displaying i need to recalculate if i need to show them
    else if (!isOverflowed && stylesDisplay.group.length) {
      const itOverflowsWithOneMore = getIfOverflowed(createHipoteticBadgeContainer([...stylesDisplay.show, stylesDisplay.group[0]]))
      if (itOverflowsWithOneMore) return

      let sliceCount = 1
      let itOverflows = false

      while (!itOverflows && sliceCount <= stylesDisplay.group.length) {
        itOverflows = getIfOverflowed(createHipoteticBadgeContainer([...stylesDisplay.show, ...stylesDisplay.group.slice(0, sliceCount)]))
        !itOverflows && sliceCount++
      }
      sliceCount--
      setStylesDisplay(prev => ({ show: [...prev.show, ...prev.group.slice(0, sliceCount)], group: prev.group.slice(sliceCount, prev.group.length) }))
    }
    // If it overflows i need to know how many badges i need to stop showing for it to stop happening
    else if (isOverflowed) {
      let sliceCount = stylesDisplay.show.length - 1
      let itOverflows = true

      while (itOverflows && sliceCount >= 0) {
        itOverflows = getIfOverflowed(createHipoteticBadgeContainer([...stylesDisplay.show.slice(0, sliceCount)]))
        itOverflows && sliceCount--
      }

      setStylesDisplay(prev => ({ show: prev.show.slice(0, sliceCount), group: [...prev.show.slice(sliceCount, prev.show.length), ...prev.group] }))
    }
  }, [size?.x, size?.y, styles.length])

  const isMobile = useMediaQuery('(max-width:600px)')
  const paramsStyles = params.getAll('style')

  useEffect(() => {
    if (paramsStyles.length === 0) {
      setStyles([])
      setStylesDisplay({ show: [], group: [] })
    }
    setStyles(paramsStyles)
    setStylesDisplay({ show: paramsStyles, group: [] })
  }, [JSON.stringify(paramsStyles)])

  useEffect(() => {
    if (open) return
    setCurrentIndex(-1)
  }, [open])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | number) => {
    if (typeof e !== 'number') {
      e.preventDefault?.()
    }

    if (isShop) {
      setOpen(false)
      if (!value) {
        router.push('/shop')
        return
      }
      router.push(`/shop?search=${value}`)
      return
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

    const pathToUse = artist === null
      ? '/tatuajes'
      : `/tatuador/${artist}/tatuajes`

    router.push(createUrl(pathToUse, newParams))
  }

  const debouncedGetSearch = useCallback(
    debounce(async (search: string, active: boolean) => {
      if (alreadyMadeSearchs.current[search]) {
        setSearch(alreadyMadeSearchs.current[search])
        if (alreadyMadeSearchs.current[search].length > 0) setOpen(true)
        return
      }
      fetch(`/api/search?q=${search}&${styles.length > 0 ? `ignore=${styles.join(',')}` : ''}`)
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
    [styles]
  )

  useEffect(() => {
    if (isShop) return
    let active = true
    if (!value) return setSearch([])

    debouncedGetSearch(value, active)
    return () => {
      active = false
    }
  }, [value, setSearch, debouncedGetSearch, isShop])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (['Escape', 'ArrowDown', 'ArrowUp'].includes(e.key)) e.preventDefault()
      if (isShop) return

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
    [search.length, isShop]
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
    if (isShop) return
    setShowingCategories(true)
    if (!isFirstFocus.current) return

    isFirstFocus.current = false
    debouncedGetSearch('', true)

    // if (search.length > 0) setOpen(true)
  }

  const handleDeleteStyle = (style: string) => {
    setStyles((prev) => prev.filter((s) => s !== style))
    setStylesDisplay(prev => ({ show: prev.show.filter(s => s !== style), group: prev.group.filter(s => s !== style) }))
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
    stylesContainerRef,
    inputContainerRef,
    styles,
    stylesDisplay,
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

const createHipoteticBadgeContainer = (styles: string[]) => {
  return measureHipoteticElement('div',
    `<div class="grid w-full relative bg-black/30 backdrop-blur grid-cols-[auto_1fr]">
      <div class="flex gap-px">
        ${styles.map(el => `<div class="${cn(badgeVariants({ variant: 'outline' }), 'flex flex-nowrap border-gold/50 text-gold/80 self-center cursor-pointer')}">${el}</div>`).join('')}
      </div>
    </div>`
  )
}