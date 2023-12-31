'use client'

import { useIntersect } from '@/hooks/useIntersect'
import { Section } from '../common/section'
import { ArtistCard } from './artist-card/artist-card'
import { Artist } from '@/lib/types/artist'
import { cn } from '@/lib/utils/utils'

export function Artists({ artists }: { artists: Artist[] }) {
  const { fromRef, intersecting } = useIntersect({ once: true })

  return (
    <Section
      className="w-full !min-h-max pt-2 pb-8"
      ref={fromRef}
      id="artistas"
    >
      <h2 className="text-6xl font-light mb-4">Artistas</h2>
      <div className={cn('flex gap-4', artists.length >= 5 && 'flex-wrap')}>
        {artists.map((artist, index) => (
          <ArtistCard
            key={index}
            {...artist}
            intersected={intersecting}
            delay={index * 75}
          />
        ))}
      </div>
    </Section>
  )
}
