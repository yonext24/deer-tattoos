import { NextResponse } from 'next/server'
import { AppError, ParsedRequest } from '@backend/middlewares/helpers'
import { prisma } from '@backend/prisma'
import { tattooConverter } from '@backend/converters/tattoo-converter'
import {
  TattooCreateBodyType,
  TattooUpdateSchemaType,
} from '@backend/middlewares/validators'
import { uploadImage } from '@backend/firebase/utils'
import {
  generateTattooSlug,
  getBase64,
  getImageDimensions,
} from '@backend/utils/utils'
import { filterAndPaginateTattoos } from '@backend/utils/tattoos-utils'

export const tattooController = {
  async getTattoos(req: ParsedRequest) {
    const query = req.nextUrl.searchParams

    const search = query.get('search') ?? undefined
    const style = query.get('style') ?? undefined
    const page = query.get('page') ?? undefined
    const size = query.get('size') ?? undefined

    const { data, total } = await filterAndPaginateTattoos(
      { search, style },
      { size, page }
    )

    return NextResponse.json({ data: tattooConverter(data as []), page, total })
  },

  async createTattoo(request: ParsedRequest) {
    const {
      artist,
      card,
      original,
      styles,
      tags,
      type,
      card_height,
      card_width,
      title,
    } = (await request.parsedBody()) as TattooCreateBodyType

    const { width: main_width, height: main_height } =
      await getImageDimensions(original)
    if (!card_width || !card_height || !main_width || !main_height) {
      throw new AppError(500, 'Algo salió mal al subir las imágenes. (dim)')
    }

    const slug = await generateTattooSlug(title, styles)
    const cardUrl = (await uploadImage(
      card,
      `/tattoos/${slug}/card.${(card as File).type.split('/')[1]}`
    )) as string
    const originalUrl = (await uploadImage(
      original,
      `/tattoos/${slug}/original.${(original as File).type.split('/')[1]}`
    )) as string
    const base64Card = (await getBase64(card)) as string
    const base64Original = (await getBase64(original)) as string

    const nuevoTatuaje = await prisma.tattoo.create({
      data: {
        title,
        artistSlug: artist.slug,
        type: 'single',
        slug,
        styles,
        tags,
        images: {
          main: {
            src: originalUrl,
            blured: base64Original,
            width: main_width,
            height: main_height,
          },
          card: {
            src: cardUrl,
            blured: base64Card,
            width: card_width,
            height: card_height,
          },
        },
      },
    })

    return NextResponse.json(nuevoTatuaje)
  },

  deleteTattoo: async (request: ParsedRequest) => {
    try {
      const { id } = (await request.parsedBody()) as { id: string }
      if (!id) {
        throw new AppError(
          400,
          'No se encontró el tatuaje que se quiere borrar, porfavor inténtalo denuevo.'
        )
      }

      const deleted = await prisma.tattoo.delete({ where: { id } })

      return NextResponse.json(deleted)
    } catch (err) {
      console.error(`Error al eliminar el tatuaje: ${err}`)
      throw new AppError(500, 'Algo salió mal al eliminar el tatuaje.')
    }
  },

  updateTattoo: async (request: ParsedRequest) => {
    try {
      const { styles, tags, artistSlug, id } =
        (await request.parsedBody()) as TattooUpdateSchemaType

      const toUpdate: any = {}

      if (styles !== undefined) {
        toUpdate['styles'] = styles
      }
      if (tags !== undefined) {
        toUpdate['tags'] = tags
      }
      if (artistSlug !== undefined) {
        toUpdate['artistSlug'] = artistSlug
      }

      const updated = await prisma.tattoo.update({
        where: { id },
        data: toUpdate,
      })

      return NextResponse.json(updated)
    } catch (err) {
      throw new AppError(500, 'Algo salió mal al actualizar el tatuaje.')
    }
  },
  async addRanking({ slug }: { slug: string }) {
    if (!slug) {
      throw new AppError(
        400,
        'No se encontró el tatuaje que se quiere borrar, porfavor inténtalo denuevo.'
      )
    }

    await prisma.tattoo.update({
      where: { slug },
      data: { ranking: { increment: 1 } },
    })

    return NextResponse.json({})
  },
}
