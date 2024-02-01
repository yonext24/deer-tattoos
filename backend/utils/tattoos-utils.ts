import { Tattoo } from '@/lib/types/tattoo'
import { prisma } from '@backend/prisma'
import { FilterFuncType } from './types'
import * as z from 'zod'

export const getTattooBySlug = async (slug: string): Promise<Tattoo | null> => {
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

const safeParseIntWithDefaultVal = (
  num: string | number | undefined,
  def: number = 1
) => {
  if (num === undefined) return def

  const parsed = parseInt(num as string)
  return isNaN(parsed) ? def : parsed
}

const filterAndPaginateTattoosSchema = z.object({
  filter: z.object({
    search: z.union([z.string(), z.null()]).optional(),
    style: z.union([z.string(), z.array(z.string()), z.null()]).optional(),
    artist: z.union([z.string(), z.null()]).optional(),
    sortByRanking: z.union([z.boolean(), z.null()]).optional(),
    exclude: z.union([z.string(), z.null()]).optional(),
  }),
  pagination: z.object({
    size: z
      .union([z.string(), z.number()])
      .optional()
      .transform((num) => safeParseIntWithDefaultVal(num, 10)),
    page: z
      .union([z.string(), z.number()])
      .optional()
      .transform((num) => safeParseIntWithDefaultVal(num)),
  }),
})

export const filterAndPaginateTattoos: FilterFuncType = async (
  filter = {
    artist: null,
    search: null,
    sortByRanking: null,
    style: null,
    exclude: null,
  },
  pagination
) => {
  const {
    pagination: { page, size },
    filter: { artist, search, sortByRanking, style, exclude },
  } = filterAndPaginateTattoosSchema.parse({
    filter,
    pagination,
  })

  const offset = (page - 1) * size

  // Construir el objeto de filtro para la consulta Prisma
  const where = {
    AND: [] as any[],
  }

  if (search) {
    where.AND.push({
      OR: [
        {
          tags: {
            has: search,
          },
        },
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    })
  }

  if (artist) {
    where.AND.push({
      artistSlug: {
        equals: artist,
      },
    })
  }

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

  if (exclude) {
    where.AND.push({
      slug: {
        not: exclude,
      },
    })
  }

  // Realizar la consulta Prisma con paginación y filtrado
  const [data, total] = await Promise.all([
    prisma.tattoo.findMany({
      include: {
        artist: false,
      },
      where,
      ...(sortByRanking
        ? {
            orderBy: {
              ranking: 'desc',
            },
          }
        : {}),
      take: size,
      skip: offset,
    }),
    prisma.tattoo.count({
      where,
    }),
  ])

  const parsedTotal = Math.ceil(total / size)

  return {
    data: data as Tattoo[],
    total: parsedTotal,
    page: page,
  }
}
