import { AppError, Middleware } from './helpers'
import { z } from 'zod'

const badFormatError = AppError.badFormat()

const TattooCreateSchema = z.object({
  card: z.any(),
  title: z.string().min(1),
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
