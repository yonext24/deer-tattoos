import { queryPipe } from '@/lib/tracking/api'
import { KpisData } from '@/lib/tracking/types'
import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { ParsedRequest, handler } from '@backend/middlewares/helpers'
import { NextResponse } from 'next/server'

const getKpis = async (req: ParsedRequest) => {
  const params = new URLSearchParams(req.url)

  const date_from = params.get('date_from') ?? undefined
  const date_to = params.get('date_to') ?? undefined

  const { data } = await queryPipe<KpisData>('kpis', {
    date_from,
    date_to,
  })

  return NextResponse.json(data)
}

export const GET = handler(AuthMiddleware(true), getKpis)
