import * as z from 'zod'
import { AppError, Middleware } from '../helpers'
import { client } from '@lib/shop/client'

export const checkoutCartValidatorSchema = z.array(z.object({
  id: z.string().min(1),
  variation: z.string().min(1),
  unit_price: z.number().positive().refine(n => n > 0),
  title: z.string().min(1),
  quantity: z.number().positive().refine(n => n > 0)
}).strict())

export type checkoutCartValidatorSchemaType = z.infer<typeof checkoutCartValidatorSchema>

export const checkoutCartValidator: Middleware = async (request, next) => {
  try {
    const body = await request.parsedBody()
    const parsed = checkoutCartValidatorSchema.parse(body)
    request._parsedBody = parsed

    const products = await client.fetch<Array<{ _id: string, variations: Array<{ name: string, _key: string, stock: number }> }>>(`
      *[_type == 'product' && _id in [${parsed.map(el => `"${el.id}"`).join(', ')}]]{
        _id,
        variations
      }
    `)

    parsed.forEach(prod => {
      const foundProduct = products.find(el => el._id === prod.id)
      if (!foundProduct) throw new AppError(405, `El producto ${prod.title} no se encontró`)
      const foundVariation = foundProduct.variations.find(el => el.name === prod.variation)
      if (!foundVariation) throw new AppError(405, `La variación ${prod.variation} del producto ${prod.title} no se encontró`)
      if (foundVariation.stock < prod.quantity) throw new AppError(405, `El producto ${prod.title} no tiene suficiente stock para satisfacer la demanda`)
    })

    next()
  } catch (err) {
    if (err instanceof z.ZodError) throw new AppError(405, 'El contenido no es válido')
    else if (err instanceof AppError) throw err
    else throw new AppError(500, 'Sucedió un error inesperado, porfavor inténtalo denuevo más tarde')
  }
}