import { AppError, Middleware } from './helpers'
import { z } from 'zod'
import { prisma } from '@backend/prisma'

const badFormatError = AppError.badFormat()

const TattooCreateSchema = z.object({
  card: z.any(),
  title: z
    .string()
    .min(1)
    .max(80)
    .regex(
      /^[a-zA-Z\s]+$/,
      'El título solo puede contener letras (sin acentos)'
    ),
  card_height: z
    .string()
    .refine((s) => !isNaN(Number(s)))
    .transform((s) => Number(s)),
  card_width: z
    .string()
    .refine((s) => !isNaN(Number(s)))
    .transform((s) => Number(s)),
  original: z.any(),
  artist: z.object({
    slug: z.string().min(1),
  }),
  styles: z.array(z.string()),
  tags: z.array(z.string()),
  type: z.enum(['single', 'double', 'quad']),
})

export type TattooCreateBodyType = z.infer<typeof TattooCreateSchema>

export const TattooCreateValidator: Middleware = async (req, next) => {
  let styles, tags, type, artist, card, original

  try {
    const body = await req.parsedBody('formData')

    body.tags = JSON.parse(body.tags)
    body.styles = JSON.parse(body.styles)
    body.artist = JSON.parse(body.artist)

    const { card_height, card_width } = TattooCreateSchema.parse(body)

    body.card_height = card_height
    body.card_width = card_width

    card = body.card
    original = body.original
    artist = body.artist
    styles = body.styles
    tags = body.tags
    type = body.type
  } catch (error) {
    console.log({ error })
    throw badFormatError
  }

  next()
}

const artistFormSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es obligatorio.' })
    .min(1, 'El nombre es requerido')
    .max(24, 'El nombre debe tener menos de 24 caracteres.')
    .refine((val) => !val.startsWith(' '), {
      message: 'El nombre no puede empezar con un espacio',
    }),
  description: z
    .string({ required_error: 'La descripción es obligatoria.' })
    .min(15, 'La descripción debe tener al menos 15 caracteres.')
    .max(80, 'El máximo de caracteres es 80'),
  user: z
    .string()
    .refine((val) => !val.includes(' '), {
      message: 'El usuario no puede tener espacios',
    })
    .optional()
    .or(z.literal('')),

  profile: z.any().refine((s) => Boolean(s)),
  background: z.any().refine((s) => Boolean(s)),
  instagram: z.string().url('El instagram debe ser una url').optional(),
  facebook: z.string().url('El facebook debe ser una url').optional(),
  website: z.string().url('El website debe ser una url').optional(),
  styles: z.array(z.string().min(1)),
})

export type ArtistFormBodyType = z.infer<typeof artistFormSchema>

export const ArtistCreateValidator: Middleware = async (req, next) => {
  try {
    const body = await req.parsedBody('formData')
    if (body.user) {
      const exists = await prisma.artist.findUnique({
        where: { slug: body.user },
      })
      if (exists) throw new AppError(400, 'El usuario ya existe')
    }

    body.styles = JSON.parse(body.styles)

    artistFormSchema.parse(body)
  } catch (error) {
    console.log({ error })
    if (error instanceof AppError) {
      throw error
    }
    throw badFormatError
  }

  next()
}
