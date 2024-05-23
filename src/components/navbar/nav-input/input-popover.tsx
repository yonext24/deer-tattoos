import { SearchResponse } from '@/app/api/search/route'
import { Separator } from '@/components/shadcn/ui/separator'
import { GoldBadge } from '@/components/ui/common/gold-badge'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn } from '@/lib/utils/utils'
import Image from 'next/image'
import { useMemo, useRef } from 'react'

const typeParser = (type: SearchResponse[0]['type']) => {
  if (type === 'search') return 'Búsqueda'
  if (type === 'category') return 'Categoría'
}

export function InputPopover({
  artist,
  styles,
  items,
  isMobile,
  currentIndex,
  handleClose,
  handleOptionClick,
  handleDeleteArtist,
  handleDeleteStyle,
}: {
  artist: string | null
  handleDeleteArtist: () => void
  handleDeleteStyle: (style: string) => void
  styles: string[]
  formRef: React.RefObject<HTMLFormElement>
  isMobile: boolean
  open: boolean
  items: SearchResponse
  currentIndex: number
  handleOptionClick: (index: number) => void
  handleClose: () => void
}) {
  const { artistItems, restItems } = useMemo(() => {
    const artistItems = items.filter((item) => item.type === 'artist')
    const restItems = items.filter((item) => item.type !== 'artist')

    return { artistItems, restItems }
  }, [items])

  const divRef = useRef<HTMLDivElement>(null)

  useClickOutside(divRef, handleClose, ['my-input'])

  return (
    <div
      ref={divRef}
      id="my-popover"
      className="absolute bottom-0 left-0 w-full z-40 translate-y-[calc(100%+5px)] bg-neutral-900 rounded-b py-1 border border-border border-t-0 shadow-lg "
    >
      {isMobile && (styles.length >= 1 || artist) && (
        <>
          <div className="flex gap-px bg-black py-2 items-center px-4">
            <div className="flex flex-col">
              <span className="text-sm">Filtros Actuales</span>
              <div className="flex gap-px">
                {artist && (
                  <GoldBadge onClick={handleDeleteArtist}>
                    De: {artist}
                  </GoldBadge>
                )}
                {styles.map((el) => (
                  <GoldBadge
                    onClick={() => {
                      handleDeleteStyle(el)
                    }}
                    key={el}
                    variant={'outline'}
                  >
                    {el}
                  </GoldBadge>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {restItems.map((item) => {
        const parsedType = typeParser(item.type)
        return (
          <div
            key={item.id}
            onClick={() => {
              handleOptionClick(item.id)
            }}
            role="link"
            className={cn(
              'py-2 px-2 cursor-pointer group hover:bg-green-dark duration-75 flex justify-between items-center transition-colors',
              currentIndex === item.id && 'bg-green-dark'
            )}
          >
            <span>{item.content}</span>
            <span className="text-gold/60 text-xs group-hover:text-gold/90 transition-colors">
              {parsedType}
            </span>
          </div>
        )
      })}
      {artistItems.length > 0 && (
        <>
          <Separator />

          <div className="flex mt-1 mx-1">
            {artistItems.map((art) => {
              return (
                <div
                  key={art.href}
                  onClick={() => {
                    handleOptionClick(art.id)
                  }}
                  role="link"
                  className={cn(
                    'py-2 px-2 cursor-pointer w-20 group hover:bg-green-dark duration-75 flex flex-col justify-center items-center transition-colors',
                    currentIndex === art.id && 'bg-green-dark'
                  )}
                >
                  {art.image && (
                    <Image
                      src={art.image}
                      alt="Imágen de artista"
                      height={50}
                      width={50}
                      className="rounded-lg"
                      quality={40}
                    />
                  )}
                  <div className="w-10 h-10 rounded-lg bg-white"></div>
                  <span>{art.content}</span>
                  <span className="text-gold/60 text-xs group-hover:text-gold/90 transition-colors">
                    Artista
                  </span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
