import { StylizedLink } from '@/components/stylized-button/stylized-button'
import { StylizedText } from '@/components/stylized-text/stylized-text'
import { getAllPageData } from '@/lib/backend/utils/data'
import { transformPageMedias } from '@/lib/utils/utils'

export async function LogoWithMedia() {
  const pageData = await getAllPageData()
  const medias = transformPageMedias(pageData)

  return (
    <div className="flex flex-col">
      <StylizedText text="LOGO" size="3rem" />
      <div className="flex gap-2">
        {medias.map(({ href, icon: Icon }) => {
          return (
            <StylizedLink
              key={href}
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
