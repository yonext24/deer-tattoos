import * as z from 'zod'
import { AppError, Middleware } from '../helpers'
import { imageTypeValidation, imageValidation } from '@/lib/utils/validations'

const badFormatError = AppError.badFormat()

const TattooCreateSchema = z.object({
  card: z.any().refine(imageValidation).refine(imageTypeValidation),
  title: z.string().min(1).max(70),
  card_height: z
    .string()
    .refine((s) => !isNaN(Number(s)))
    .transform((s) => Number(s)),
  card_width: z
    .string()
    .refine((s) => !isNaN(Number(s)))
    .transform((s) => Number(s)),
  original: z.any().refine(imageValidation).refine(imageTypeValidation),
  artist: z.object({
    slug: z.string().min(1),
  }),
  styles: z.array(z.string()),
  tags: z.array(z.string()),
  type: z.enum(['single', 'double', 'quad']),
  extra_images: z.array(
    z.any().refine(imageValidation).refine(imageTypeValidation)
  ),
})

export type TattooCreateBodyType = z.infer<typeof TattooCreateSchema>

export const TattooCreateValidator: Middleware = async (req, next) => {
  try {
    const body = await req.parsedBody('formData')

    body.tags = JSON.parse(body.tags)
    body.styles = JSON.parse(body.styles)
    body.artist = JSON.parse(body.artist)

    const extraImagesKeys = Object.keys(body).filter((key) =>
      key.startsWith('extra_images-')
    )
    const extraImages = []
    for (const key of extraImagesKeys) {
      extraImages.push(body[key])
      delete body[key]
    }

    body.extra_images = extraImages

    const { card_height, card_width } = TattooCreateSchema.parse(body)

    body.card_height = card_height
    body.card_width = card_width
  } catch (error) {
    console.log({ error })
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message)
    }
    throw badFormatError
  }

  next()
}

const TattooUpdateSchema = z.object({
  id: z.string().min(1, 'No se encontró el tatuaje que se quiere modificar.'),
  tags: z.array(z.string().min(1)).optional(),
  styles: z.array(z.string().min(1)).optional(),
  artistSlug: z.string().min(1).nullable().optional(),
})

export type TattooUpdateSchemaType = z.infer<typeof TattooUpdateSchema>

export const TattooUpdateValidator: Middleware = async (req, next) => {
  try {
    const body = await req.parsedBody()
    TattooUpdateSchema.parse(body)
  } catch (error) {
    console.log({ error })
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message)
    }
    throw badFormatError
  }

  next()
}
