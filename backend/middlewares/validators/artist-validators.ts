import * as z from 'zod'
import { AppError, Middleware } from '../helpers'
import { prisma } from '@backend/prisma'
import { imageTypeValidation, imageValidation } from '@/lib/utils/validations'

const badFormatError = AppError.badFormat()

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
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message)
    }
    if (error instanceof AppError) {
      throw error
    }
    throw badFormatError
  }

  next()
}

const artistUpdateSchema = z.object({
  slug: z.string().min(1, { message: 'Algo salió mal al editar el artista' }),
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener mínimo 3 caracteres' })
    .optional(),
  styles: z.array(z.string().min(1)).optional(),
  medias: z
    .object({
      description: z
        .string()
        .min(15, {
          message: 'La descripción debe tener al menos 15 caracteres',
        })
        .max(200, {
          message: 'La descripción debe tener menos de 50 caracteres',
        })
        .optional(),
      instagram: z
        .string()
        .url('El instagram debe ser una url')
        .or(z.null())
        .optional(),
      facebook: z
        .string()
        .url('El facebook debe ser una url')
        .or(z.null())
        .optional(),
      website: z
        .string()
        .url('La web debe ser una url')
        .or(z.null())
        .optional(),
    })
    .optional(),
})
export type ArtistUpdateBodyType = z.infer<typeof artistUpdateSchema>

export const ArtistUpdateValidator: Middleware = async (req, next) => {
  try {
    const body = await req.parsedBody()
    const exists = await prisma.artist.findUnique({
      where: {
        slug: body?.slug,
      },
    })
    if (!exists) throw new AppError(404, 'El artista no existe')

    artistUpdateSchema.parse(body)
  } catch (error) {
    console.log({ error })
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message)
    }
    if (error instanceof AppError) {
      throw error
    }
    throw badFormatError
  }

  next()
}

const artistUpdateImagesSchema = z.object({
  slug: z.string().min(1, { message: 'Algo salió mal al editar el artista' }),
  profile: z
    .any()
    .refine(imageValidation, {
      message: 'La imágen no es válida, probá denuevo.',
    })
    .refine(imageTypeValidation, {
      message:
        'La imágen de fondo debe ser un archivo de tipo png, jpg, jpeg o webp',
    })
    .optional(),
  background: z
    .any()
    .refine(imageValidation, {
      message: 'La imágen no es válida, probá denuevo.',
    })
    .refine(imageTypeValidation, {
      message:
        'La imágen de fondo debe ser un archivo de tipo png, jpg, jpeg o webp',
    })
    .optional(),
})

export type ArtistUpdateImagesBodyType = z.infer<
  typeof artistUpdateImagesSchema
>

export const ArtistUpdateImagesValidator: Middleware = async (req, next) => {
  try {
    const body = await req.parsedBody('formData')

    if (!body.profile && !body.background)
      throw new AppError(400, 'No hay imágenes para subir')

    artistUpdateImagesSchema.parse(body)

    const exists = await prisma.artist.findUnique({
      where: {
        slug: body?.slug,
      },
    })
    if (!exists) throw new AppError(404, 'El artista no existe')
  } catch (error) {
    console.log({ error })
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message)
    }
    if (error instanceof AppError) {
      throw error
    }
    throw badFormatError
  }

  next()
}
