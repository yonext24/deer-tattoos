import { Tattoo } from '@/lib/types/tattoo'
import { prisma } from '@backend/prisma'
import { cache } from 'react'

export const getTattooBySlug = cache(
  async (slug: string): Promise<Tattoo | null> => {
    const tattoo = await prisma.tattoo.findUnique({
      where: {
        slug,
      },
      include: {
        artist: true,
      },
    })

    return tattoo as Tattoo
  }
)

export const filterAndPaginateTattoos = cache(
  async (
    {
      search,
      style,
      artist,
    }: { search?: string; style?: string | string[]; artist?: string },
    { size = 10, page = 1 }: { size?: string | number; page?: string | number }
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
          has: search,
        },
      })
    }

    if (artist) {
      where.AND.push({
        artistSlug: {
          equals: artist,
        },
      })
    }

    console.log({ style })

    if (style) {
      if (Array.isArray(style)) {
        where.AND.push({
          styles: {
            hasEvery: style,
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

    console.log(where.AND)

    // Realizar la consulta Prisma con paginación y filtrado
    const [data, total] = await Promise.all([
      prisma.tattoo.findMany({
        include: {
          artist: false,
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

    return {
      data: data as Tattoo[],
      total: parsedTotal,
      page: parsedPage,
    }
  }
)
