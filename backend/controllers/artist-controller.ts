import { uploadImage } from '@backend/firebase/utils'
import { AppError, ParsedRequest } from '@backend/middlewares/helpers'
import { ArtistFormBodyType } from '@backend/middlewares/validators'
import { prisma } from '@backend/prisma'
import { generateArtistSlug, getBase64 } from '@backend/utils/utils'
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

    return NextResponse.json(artist)
  },
}
