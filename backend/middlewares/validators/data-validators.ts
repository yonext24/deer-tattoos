import { AppError, Middleware } from '../helpers'
import * as z from 'zod'

const schema = z.object({
  main_data: z
    .string({ required_error: 'Este campo requiere al menos 100 caracteres' })
    .max(230, 'Este campo como maximo puede tener 230 caracteres')
    .min(100, 'Este campo requiere al menos 100 caracteres'),
  footer_data: z
    .string({ required_error: 'Este campo requiere al menos 50 caracteres' })
    .max(165, 'Este campo puede tener como maximo 165 caracteres')
    .min(50, 'Este campo requiere al menos 50 caracteres'),
  who_we_are: z.string().min(0),
  instagram: z
    .string()
    .url(
      'Este campo tiene que ser una url válida, por ejemplo: "https://google.com"'
    )
    .or(z.literal('')),
  facebook: z
    .string()
    .url(
      'Este campo tiene que ser una url válida, por ejemplo: "https://google.com"'
    )
    .or(z.literal('')),
  twitter: z
    .string()
    .url(
      'Este campo tiene que ser una url válida, por ejemplo: "https://google.com"'
    )
    .or(z.literal('')),

  email: z.string().email().or(z.literal('')),
  address: z.string().or(z.literal('')),
})

export const DataChangeValidator: Middleware = async (req, next) => {
  try {
    const body = await req.parsedBody()
    schema.parse(body)
  } catch (error) {
    console.log({ error })
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message)
    }
    if (error instanceof AppError) {
      throw error
    }
    throw AppError.badFormat()
  }
  return next()
}
