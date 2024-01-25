import { SearchResponse } from '@/app/api/search/route'
import { Separator } from '@/components/shadcn/ui/separator'
import { cn } from '@/lib/utils/utils'
import Image from 'next/image'
import { useMemo } from 'react'

const typeParser = (type: SearchResponse[0]['type']) => {
  if (type === 'search') return 'Búsqueda'
  if (type === 'category') return 'Categoría'
}

export function InputPopover({
  items,
  currentIndex,
  handleOptionClick,
}: {
  formRef: React.RefObject<HTMLFormElement>
  open: boolean
  items: SearchResponse
  currentIndex: number
  handleOptionClick: (index: number) => void
  closeSelf: () => void
}) {
  const { artistItems, restItems } = useMemo(() => {
    const toFilter = items.map((el, index) => ({ ...el, i: index }))

    const artistItems = toFilter.filter((item) => item.type === 'artist')
    const restItems = toFilter.filter((item) => item.type !== 'artist')

    return { artistItems, restItems }
  }, [items])

  return (
    <div className="absolute bottom-0 left-0 w-full translate-y-[calc(100%+5px)] bg-neutral-900 rounded-b py-1 border border-border border-t-0 shadow-lg">
      {restItems.map((item) => {
        const parsedType = typeParser(item.type)
        return (
          <div
            key={item.href}
            onClick={() => {
              handleOptionClick(item.i)
            }}
            role="link"
            className={cn(
              'py-2 px-2 cursor-pointer group hover:bg-green-dark duration-75 flex justify-between items-center transition-colors',
              currentIndex === item.i && 'bg-green-dark',
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
                    handleOptionClick(art.i)
                  }}
                  role="link"
                  className={cn(
                    'py-2 px-2 cursor-pointer w-20 group hover:bg-green-dark duration-75 flex flex-col justify-center items-center transition-colors',
                    currentIndex === art.i && 'bg-green-dark',
                  )}
                >
                  {/* {art.image && (
                    <Image
                      src={art.image}
                      alt="Imágen de artista"
                      height={50}
                      width={50}
                      className="rounded-lg"
                      quality={40}
                    />
                  )} */}
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
