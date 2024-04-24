import { Middleware, handler } from '@backend/middlewares/helpers'
import { cartCreateValidator } from '@backend/middlewares/validators/cart-validators'
import { cartCreateSchema } from '@backend/middlewares/validators/cart-validators'
import { infer as zInfer } from 'zod'
import { prisma } from '@backend/prisma'
import { NextResponse } from 'next/server'
import { client } from '@lib/shop/client'

const PostController: Middleware = async (request) => {
  const { userId, cart } = (await request.parsedBody()) as zInfer<
    typeof cartCreateSchema
  >

  const res = await prisma.userCart.upsert({
    create: {
      userId,
      cart: cart.map(({ id, ...el }) => ({ ...el, productId: id })),
    },
    update: {
      cart: cart.map(({ id, ...el }) => ({ ...el, productId: id })),
    },
    where: { userId },
  })

  console.log({ res })

  return NextResponse.json({ success: true })
}


const GetController: Middleware = async (request) => {
  const userId = request.cookies.get('SESSIONID')?.value
  if (!userId) return NextResponse.json([])

  const cart = await prisma.userCart.findFirst({
    where: { userId },
  })

  if (!cart) return NextResponse.json([])

  type Product = {
    _id: string
    name: string
    price: number
    image: string
    variations: { name: string; stock: number }[]
  }
  // No se por qué me enrosqué tanto haciendo esto del hash pero bue
  type ProductWithHashedVariations = Product & {
    hashedVariations: { [key: string]: { name: string, stock: number } }
  }

  const products = await client.fetch<
    Product[]
  >(`*[_type == "product"]{
    _id,
    name,
    price,
    "image": images[0].asset->url,
    variations
  }`)

  if (!products || products.length <= 0) return NextResponse.json([])

  const hashedProducts: { [key: string]: ProductWithHashedVariations } = {}

  products.forEach(({ variations, ...product }) => {
    const hashedVariations: ProductWithHashedVariations['hashedVariations'] = {}
    variations.forEach((variation) => {
      hashedVariations[variation.name] = { ...variation }
    })

    hashedProducts[product._id] = { ...product, hashedVariations: hashedVariations, variations }
  })

  const parsedCart = cart.cart.filter((item) => {
    if (!hashedProducts[item.productId]) return false
    const product = hashedProducts[item.productId]
    if (!product.hashedVariations[item.variation]) return false
    return true
  }
  ).map(item => {
    const product = hashedProducts[item.productId]
    return {
      id: item.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      variation: item.variation,
      quantity: item.quantity
    }

  })

  return NextResponse.json(parsedCart)
}

export const GET = handler(GetController)
export const POST = handler(cartCreateValidator, PostController)
