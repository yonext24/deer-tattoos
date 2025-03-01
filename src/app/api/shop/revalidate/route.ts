import { revalidate } from '@/lib/shopify'
import { handler } from '@backend/middlewares/helpers'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  console.log(
    '********************************************************************'
  )
  console.log(
    '********************************************************************'
  )
  // console.log(await req.json())
  console.log(
    '********************************************************************'
  )
  console.log(
    '********************************************************************'
  )

  return revalidate(req)
}
