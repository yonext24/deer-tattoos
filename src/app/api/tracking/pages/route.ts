import { queryPipe } from '@/lib/tracking/api'
import { normalizeDates } from '@/lib/utils/utils'
import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { ParsedRequest, handler } from '@backend/middlewares/helpers'
import { NextResponse } from 'next/server'

const func = async (req: ParsedRequest) => {
  const params = new URLSearchParams(req.url)

  const fromRaw = params.get('date_from')
  const toRaw = params.get('date_to')
  const typeRaw = params.get('type') ?? ('tattoo' as 'tattoo' | 'artist')

  const { date_from, date_to } = normalizeDates({
    date_from: fromRaw,
    date_to: toRaw,
  })

  const { data } = await queryPipe('top_pages', {
    date_from,
    date_to,
  })

  return NextResponse.json(data)
}

export const GET = handler(AuthMiddleware(true), func)
