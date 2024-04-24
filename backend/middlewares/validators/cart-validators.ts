import * as z from 'zod'
import { AppError, Middleware } from '../helpers'

export const cartCreateSchema = z.object(
  {
    userId: z.string().min(10),
    cart: z.array(z.object({
      id: z.string(),
      name: z.string().min(1),
      variation: z.string().min(1),
      quantity: z.number().positive(),
      price: z.number().positive(),
    }).strict())
  })


export const cartCreateValidator: Middleware = async (req, next) => {
  try {
    const body = await req.parsedBody()
    const cookies = req.cookies
    body.userId = cookies.get('SESSIONID')?.value
    console.log({ body })
    cartCreateSchema.parse(body)
  } catch (error) {
    console.log({ error })
    throw new AppError(400, 'Ocurrió un error inesperado')
  }
  return next()
}