import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { handler } from '@backend/middlewares/helpers'
import { DataChangeValidator } from '@backend/middlewares/validators/data-validators'
import { NextResponse } from 'next/server'
import { pageData, saveAllPageData } from '@/lib/backend/utils/data';
import { revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/utils/consts';


export const POST = handler(
  AuthMiddleware(true),
  DataChangeValidator,
  async (req) => {
    const data = (await req.parsedBody()) as pageData
    try {

      await saveAllPageData(data)
      revalidateTag(TAGS.data)

      return NextResponse.json(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : err

      return NextResponse.json(message, { status: 500 })
    }
  }
)
