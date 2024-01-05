import { Tattoo } from '@/lib/types/tattoo'
import { RawTattoo } from './types'

export const tattooConverter = <T = RawTattoo | RawTattoo[]>(
  tattoo: T,
): T extends [] ? Tattoo[] : Tattoo => {
  const convert = (tattoo: RawTattoo): Tattoo => {
    const { images, artistSlug, imagesId, artist, ...rest } = tattoo

    return {
      ...rest,
      slug: tattoo.slug,
      images: {
        main: {
          src: images.main_src,
          height: images.main_height,
          width: images.main_width,
          blured: images.main_blured,
        },
        card: {
          src: images.card_src,
          height: images.card_height,
          width: images.card_width,
          blured: images.card_blured,
        },
      },
      artist: {
        slug: artistSlug,
      },
    }
  }

  if (Array.isArray(tattoo)) {
    return tattoo.map(convert) as any
  }

  return convert(tattoo as any) as any
}
