import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { appFetch } from '@/lib/utils/appFetch'
import {
  ColumnDef,
  PaginationState,
  RowData,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react'
import { TableActionsDropdown } from './table-actions-dropdown'
import { Tattoo } from '@/lib/types/tattoo'
import { Artist } from '@/lib/types/artist'
import { TatuajesReducer } from './tatuajes-reducer'
import { useSearchParams } from 'next/navigation'
import { createUrl } from '@/lib/utils/createUrl'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    deleteTattoo: (index: number) => void
    changeArtist: ({
      index,
      artistSlug,
    }: {
      index: number
      artistSlug: string | null
    }) => void
    changeData: (data: {
      index: number
      tags?: string[]
      styles?: string[]
      position?: string
    }) => void
  }
}

export function useTatuajesTable({
  initial,
  total,
}: {
  initial: Tattoo[]
  total: number
}) {
  const queryParams = useSearchParams()
  const currentArtist = queryParams.get('artist')

  const [artists, setArtists] = useState<Artist[]>([])

  const [isPending, startTransition] = useTransition()
  const [state, dispatch] = useReducer(TatuajesReducer, initial)

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(
    () => {
      const page = queryParams.get('page')
      const size = queryParams.get('size')

      return {
        pageIndex: page ? parseInt(page) - 1 : 0,
        pageSize: size ? parseInt(size) : 10,
      }
    }
  )

  const currentFetch = useRef({
    page: pageIndex,
    size: pageSize,
    artist: currentArtist,
    hasBeenFetched: true,
  })

  useEffect(() => {
    const current = currentFetch.current
    if (
      current.hasBeenFetched &&
      current.page === pageIndex &&
      current.size === pageSize &&
      current.artist === currentArtist
    )
      return

    const newParams = new URLSearchParams()
    newParams.set('page', (pageIndex + 1).toString())
    newParams.set('size', pageSize.toString())
    if (currentArtist) newParams.set('artist', currentArtist)

    appFetch(createUrl(`/api/tattoos`, newParams)).then((data) => {
      startTransition(() => {
        const tats = data.data as Tattoo[]
        dispatch({ type: 'change-page', payload: tats })
      })
      currentFetch.current = {
        page: pageIndex,
        size: pageSize,
        artist: currentArtist,
        hasBeenFetched: true,
      }
    })
  }, [pageIndex, pageSize, currentArtist])

  useEffect(() => {
    appFetch('/api/artists').then(setArtists)
  }, [])

  const pagination = useMemo(() => {
    return { pageIndex, pageSize }
  }, [pageIndex, pageSize])

  const columns: ColumnDef<Tattoo>[] = useMemo(
    (): ColumnDef<Tattoo>[] => [
      {
        header: 'Imágen',
        enableHiding: false,
        accessorKey: 'images',
        cell: ({ getValue }) => {
          try {
            const images = getValue() as Tattoo['images']
            const image = images.card
            const { height, width } = image

            return (
              <ImageWithBlur
                pictureClassName="h-[50px] w-max flex "
                quality={100}
                src={image.src}
                blurDataURL={image.blured}
                alt="Imágen de tatuaje"
                className=""
                height={50}
                width={50 * (width / height)}
              />
            )
          } catch (err) {
            return <div className="h-[60px] w-[40px] bg-red-500 rounded"></div>
          }
        },
      },
      {
        accessorKey: 'title',
        header: 'Título',
        cell: ({ row }) => <span>{row.getValue('title')}</span>,
      },
      {
        accessorKey: 'styles',
        header: 'Estilos',
        cell: ({ row }) => {
          const styles = row.getValue('styles') as Tattoo['styles']
          return (
            <div className="flex flex-wrap gap-1">
              {styles.map((style) => (
                <span
                  key={style}
                  className="border border-gold/30 text-gold/50 px-2 rounded"
                >
                  {style}
                </span>
              ))}
            </div>
          )
        },
      },
      {
        header: 'Posición',
        accessorKey: 'position',
        cell: ({ row }) => <span>{row.getValue('position')}</span>
      },
      {
        header: 'Artista',
        accessorKey: 'artistSlug',
        cell: ({ row }) => {
          const artistSlug = row.getValue('artistSlug') as Tattoo['artistSlug']
          const artist =
            artistSlug === null
              ? { name: 'Ninguno' }
              : artists.find((artist) => artist.slug === artistSlug)

          return <span>{artist?.name}</span>
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row, table }) => (
          <TableActionsDropdown table={table} row={row} />
        ),
      },
    ],
    [artists]
  )

  const table = useReactTable({
    data: state,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: total,
    state: {
      pagination,
    },
    initialState: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: setPagination,
    meta: {
      deleteTattoo: (index: number) => {
        dispatch({ type: 'remove', payload: index })
      },
      changeArtist: ({
        index,
        artistSlug,
      }: {
        index: number
        artistSlug: string | null
      }) => {
        dispatch({ type: 'change-artist', payload: { index, artistSlug } })
      },
      changeData: (data: {
        index: number
        tags?: string[]
        styles?: string[]
        position?: string
      }) => {
        dispatch({ type: 'change-data', payload: data })
      },
    },
  })

  return { table, pagination }
}
