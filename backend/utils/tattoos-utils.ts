import { Tattoo } from '@/lib/types/tattoo'
import { tattooConverter } from '@backend/converters/tattoo-converter'
import { prisma } from '@backend/prisma'

export const getTattooBySlug = async <T extends boolean>(
  slug: string,
  withConverter: T = true as T,
): Promise<T extends true ? Tattoo : any> => {
  const tattoo = await prisma.tattoo.findUnique({
    where: {
      slug,
    },
    include: {
      images: {
        select: {
          card_blured: true,
          card_height: true,
          card_src: true,
          card_width: true,
          main_blured: true,
          main_height: true,
          main_src: true,
          main_width: true,
        },
      },
      artist: true,
    },
  })

  if (withConverter) {
    return tattooConverter(tattoo) as Tattoo
  }

  return tattoo as any
}

export const filterAndPaginateTattoos = async (
  { search, style }: { search?: string; style?: string | string[] },
  { size = 10, page = 1 }: { size?: string | number; page?: string | number },
) => {
  const parsedSize = parseInt(size as string)
  const parsedPage = parseInt(page as string)

  const offset = (parsedPage - 1) * parsedSize

  // Construir el objeto de filtro para la consulta Prisma
  const where = {
    AND: [] as any[],
  }

  if (search) {
    where.AND.push({
      tags: {
        contains: search,
      },
    })
  }

  if (style) {
    if (Array.isArray(style)) {
      where.AND.push({
        styles: {
          hasSome: style,
        },
      })
    } else {
      where.AND.push({
        styles: {
          has: style,
        },
      })
    }
  }

  // Realizar la consulta Prisma con paginación y filtrado
  const [data, total] = await Promise.all([
    prisma.tattoo.findMany({
      include: {
        images: {
          select: {
            card_blured: true,
            card_height: true,
            card_src: true,
            card_width: true,
            main_blured: true,
            main_height: true,
            main_src: true,
            main_width: true,
          },
        },
        artist: true,
      },
      where,
      take: parsedSize,
      skip: offset,
    }),
    prisma.tattoo.count({
      where,
    }),
  ])

  const parsedTotal = Math.ceil(total / parsedSize)
  console.log(parsedTotal, total, data.length)

  return {
    data,
    total: parsedTotal,
    page: parsedPage,
  }
}
