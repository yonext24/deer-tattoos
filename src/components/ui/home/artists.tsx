'use client'

import { useIntersect } from '@/hooks/useIntersect'
import { Section } from '../common/section'
import { ArtistCard } from './artist-card/artist-card'

const artists = [
  {
    name: 'Jorge',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
  {
    name: 'Jorge',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
  {
    name: 'Jorge',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
  {
    name: 'Jorge',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
]

export function Artists() {
  const { fromRef, intersecting } = useIntersect({ once: true })

  return (
    <Section
      className="w-full !min-h-max pt-2 pb-8"
      ref={fromRef}
      id="artistas"
    >
      <h2 className="text-6xl font-light mb-4">Artistas</h2>
      <div className="flex gap-4">
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
