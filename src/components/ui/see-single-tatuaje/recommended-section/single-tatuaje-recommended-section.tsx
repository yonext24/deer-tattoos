/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Tattoo } from '@/lib/types/tattoo'
import { appFetch } from '@/lib/utils/appFetch'
import { createUrl } from '@/lib/utils/createUrl'
import { useEffect, useState } from 'react'
import { RecommendationCardRender } from './recommendation-card-render'
import { cn } from '@/lib/utils/utils'

export type WithStatusAndErrorType<T> = {
  status: 'idle' | 'loading' | 'success' | 'error'
  error: null | string
  data: T
}

const getRelated = async (slug: string, styles: string[]) => {
  const params = new URLSearchParams()
  params.set('sortByRanking', 'true')
  params.set('size', '3')
  params.set('page', '1')
  params.set('style', styles[0])
  params.set('exclude', slug)

  return await appFetch(createUrl(`/api/tattoos`, params))
}
const getRecommended = async (slug: string, artistSlug: string | null) => {
  const params = new URLSearchParams()
  params.set('sortByRanking', 'true')
  params.set('size', '3')
  params.set('page', '1')
  params.set('exclude', slug)

  artistSlug && params.set('artist', artistSlug)

  return await appFetch(createUrl(`/api/tattoos`, params))
}

export function SingleTatuajeRecommendedSection({
  tattoo,
}: {
  tattoo: Tattoo | null
}) {
  const [recommended, setRecommended] = useState<
    WithStatusAndErrorType<Tattoo[]>
  >({
    status: 'idle',
    error: null,
    data: [],
  })
  const [related, setRelated] = useState<WithStatusAndErrorType<Tattoo[]>>({
    status: 'idle',
    error: null,
    data: [],
  })

  useEffect(() => {
    if (!tattoo) return
    setRecommended({ status: 'loading', error: null, data: [] })
    setRelated({ status: 'loading', error: null, data: [] })

    getRecommended(tattoo.slug, tattoo.artistSlug)
      .then((data) => {
        setRecommended({ status: 'success', error: null, data: data.data })
      })
      .catch((err) => {
        setRecommended({ status: 'error', data: [], error: err })
      })
    getRelated(tattoo.slug, tattoo.styles)
      .then((data) => {
        setRelated({ status: 'success', error: null, data: data.data })
      })
      .catch((err) => {
        setRelated({ status: 'error', data: [], error: err })
      })
  }, [])

  if (!tattoo) return null



  return (
    <div className="flex flex-col">
      <h2 className="font-extralight text-2xl mt-4">
        Otros tatuajes de {tattoo.artistSlug ?? 'la galería'}
      </h2>
      <TatsContainer
        length={recommended.status !== 'success' ? 3 : recommended.data.length}
      >
        <RecommendationCardRender {...recommended} />
      </TatsContainer>
      {related.status === 'success' &&
        !related.data.every((rel) =>
          recommended.data.some((rec) => rec.slug === rel.slug)
        ) && ( // Si todos los tatuajes de related son iguales a los de recommended
          <>
            <h2 className="font-extralight text-2xl mt-4">
              Tatuajes Relacionados
            </h2>
            <TatsContainer length={related.data.length}>
              <RecommendationCardRender {...related} />
            </TatsContainer>
          </>
        )}
    </div>
  )
}

const TatsContainer = ({
  length,
  children,
}: {
  length: number
  children: React.ReactNode
}) => (
  <div
    className={cn(
      'w-full h-[250px] grid gap-2',
      length > 2 ? 'grid-cols-3' : 'grid-cols-2'
    )}
  >
    {children}
  </div>
)
