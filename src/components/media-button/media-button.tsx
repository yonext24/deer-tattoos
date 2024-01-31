import React from 'react'
import { StylizedLink } from '../stylized-button/stylized-button'
import { Artist } from '@/lib/types/artist'
import { InstagramLogoIcon } from '@radix-ui/react-icons'
import { Facebook, WebcamIcon } from 'lucide-react'

type Medias = keyof Artist['medias']

const iconMapper: Record<Medias, React.ComponentType<any>> = {
  facebook: Facebook,
  instagram: InstagramLogoIcon,
  website: WebcamIcon,
}

export function MediaButton({ href, type }: { href: string; type: Medias }) {
  const Icon = iconMapper[type]

  return (
    <StylizedLink href={href} className="px-2 py-2 group" circleRadius="25px">
      <Icon className="h-6 w-6 group-hover:text-gold transition-colors" />
    </StylizedLink>
  )
}
