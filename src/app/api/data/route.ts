import { pageData, saveAllPageData } from '@/lib/backend/utils/data'
import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { handler } from '@backend/middlewares/helpers'
import { DataChangeValidator } from '@backend/middlewares/validators/data-validators'
import { NextResponse } from 'next/server'

export const POST = handler(
  AuthMiddleware(true),
  DataChangeValidator,
  async (req) => {
    const data = (await req.parsedBody()) as pageData
    await saveAllPageData(data)

    return NextResponse.json(data)
  }
)