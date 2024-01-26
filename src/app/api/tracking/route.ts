import { queryPipe } from '@/lib/tracking/api'
import { KpisData } from '@/lib/tracking/types'
import { normalizeDates } from '@/lib/utils/utils'
import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { ParsedRequest, handler } from '@backend/middlewares/helpers'
import { NextResponse } from 'next/server'

const getKpis = async (req: ParsedRequest) => {
  const params = new URLSearchParams(req.url)

  const rawFrom = params.get('date_from') ?? undefined
  const rawTo = params.get('date_to') ?? undefined

  const { date_from, date_to } = normalizeDates({
    date_from: rawFrom,
    date_to: rawTo,
  })

  console.log({
    date_from,
    date_to,
    rawFrom,
    rawTo,
    params,
    url: req.url,
  })

  const { data } = await queryPipe<KpisData>('kpis', {
    date_from,
    date_to,
  })

  return NextResponse.json(data)
}

export const GET = handler(AuthMiddleware(true), getKpis)
