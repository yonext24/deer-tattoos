import * as z from 'zod'
import { AppError, Middleware } from '../helpers'

export const addCategoryValidator: Middleware = async (req, next) => {
  const body = await req.parsedBody()
  const schema = z.object({
    name: z.string().min(1),
    variants: z.array(z.string().min(1)),
  })

  try {
    schema.parse(body)
    return next()
  } catch (err) {
    throw new AppError(400, 'Hubo un error.')
  }
}

export const removeCategoryValidator: Middleware = async (req, next) => {
  const body = await req.parsedBody()
  const schema = z.object({
    name: z.string().min(1),
  })
  try {
    schema.parse(body)
    return next()
  } catch (err) {
    console.log({ err })
    throw new AppError(400, 'Hubo un error.')
  }
}
