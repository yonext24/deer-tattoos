import { StylizedLink } from '@/components/stylized-button/stylized-button'
import { StylizedText } from '@/components/stylized-text/stylized-text'
import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { FacebookIcon } from 'lucide-react'

const medias = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/inkedbyjavi/',
    icon: InstagramLogoIcon,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/inkedbyjavi/',
    icon: FacebookIcon,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/inkedbyjavi/',
    icon: TwitterLogoIcon,
  },
]

export function LogoWithMedia() {
  return (
    <div className="flex flex-col">
      <StylizedText text="LOGO" size="3rem" />
      <div className="flex gap-2">
        {medias.map(({ name, href, icon: Icon }) => {
          return (
            <StylizedLink
              key={name}
              href={href}
              className="px-2 py-2 group"
              circleRadius="25px"
            >
              <Icon className="h-5 w-5 group-hover:text-gold transition-colors" />
            </StylizedLink>
          )
        })}
      </div>
    </div>
  )
}
