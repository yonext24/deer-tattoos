import { Artist } from '@/lib/types/artist'
import { TAGS } from '@/lib/utils/consts'
import { uploadImage } from '@backend/firebase/utils'
import { AppError, ParsedRequest } from '@backend/middlewares/helpers'
import {
  ArtistFormBodyType,
  ArtistUpdateBodyType,
  ArtistUpdateImagesBodyType,
} from '@backend/middlewares/validators'
import { prisma } from '@backend/prisma'
import { generateArtistSlug, getBase64 } from '@backend/utils/utils'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const ARTIST_CONTROLLER = {
  getAllArtists: async (req: ParsedRequest) => {
    const artists = await prisma.artist.findMany({
      include: {
        tattoos: false,
      },
    })

    return NextResponse.json(artists)
  },

  createArtist: async (req: ParsedRequest) => {
    const {
      description,
      name,
      user,
      styles,
      background,
      profile,
      facebook,
      instagram,
      website,
    } = (await req.parsedBody()) as ArtistFormBodyType

    const slug = await generateArtistSlug(name, user)

    console.log({ background, profile })

    const [profile_url, background_url] = await Promise.all([
      uploadImage(profile, `/artists/${slug}/profile`),
      uploadImage(background, `/artists/${slug}/background`),
    ])
    const [profile_blur, background_blur] = await Promise.all([
      (await getBase64(profile)) as string,
      (await getBase64(background)) as string,
    ])

    if (!profile_url || !background_url) {
      throw new AppError(500, 'Algo salió mal al subir las imágenes.')
    }
    const images = {
      profile: {
        src: profile_url,
        blured: profile_blur,
      },
      background: {
        src: background_url,
        blured: background_blur,
      },
    }
    const medias = {
      facebook,
      instagram,
      website,
    }

    const artist = await prisma.artist.create({
      data: {
        description,
        name,
        slug,
        styles,
        images,
        medias,
      },
    })
    revalidateTag(TAGS.artists)

    return NextResponse.json(artist)
  },

  updateArtist: async (req: ParsedRequest) => {
    const body = (await req.parsedBody()) as ArtistUpdateBodyType

    const res = await prisma.artist.update({
      where: { slug: body.slug },
      data: body,
    })

    revalidateTag(TAGS.artists)
    return NextResponse.json(res)
  },

  updateImagesArtist: async (req: ParsedRequest) => {
    const body = (await req.parsedBody()) as ArtistUpdateImagesBodyType

    const toUpdate: {
      images: {
        profile: Artist['images']['profile'] | undefined
        background: Artist['images']['background'] | undefined
      }
    } = {
      images: {
        profile: undefined,
        background: undefined,
      },
    }
    const response = {} as any

    if (body.profile) {
      const profile_url = await uploadImage(
        body.profile,
        `/artists/${body.slug}/profile`
      )
      const profile_blur = (await getBase64(body.profile)) as string

      if (!profile_url || !profile_blur) {
        throw new AppError(500, 'Algo salió mal al subir la imagen.')
      }

      toUpdate.images.profile = {
        src: profile_url,
        blured: profile_blur,
      }
      response.profile = { src: profile_url, blured: profile_blur }
    }

    if (body.background) {
      const background_url = await uploadImage(
        body.background,
        `/artists/${body.slug}/background`
      )
      const background_blur = (await getBase64(body.background)) as string

      if (!background_url || !background_blur) {
        throw new AppError(500, 'Algo salió mal al subir la imagen.')
      }

      toUpdate.images.background = {
        src: background_url,
        blured: background_blur,
      }
      response.background = { src: background_url, blured: background_blur }
    }

    await prisma.artist.update({
      where: { slug: body.slug },
      data: {
        images: {
          update: {
            ...toUpdate.images,
          },
        },
      },
    })
    revalidateTag(TAGS.artists)

    return NextResponse.json(response)
  },

  deleteArtist: async (req: ParsedRequest) => {
    const body = (await req.parsedBody()) as { slug: string }

    if (!body.slug) {
      throw new AppError(400, 'No se encontró el artista que deseas borrar.')
    }

    await prisma.artist.delete({
      where: { slug: body.slug },
    })

    revalidateTag(TAGS.artists)
    return NextResponse.json({ result: true })
  },
}
