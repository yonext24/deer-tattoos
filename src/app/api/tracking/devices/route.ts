import { TopDevicesData } from '@/components/ui/admin-panel/charts/devices-chart/devices-chart.d'
import { queryPipe } from '@/lib/tracking/api'
import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { ParsedRequest, handler } from '@backend/middlewares/helpers'
import { NextResponse } from 'next/server'

const getDevices = async (req: ParsedRequest) => {
  const params = new URLSearchParams(req.url)

  const date_from = params.get('date_from') ?? undefined
  const date_to = params.get('date_to') ?? undefined

  const { data } = await queryPipe<TopDevicesData>('top_devices', {
    date_from,
    date_to,
    limit: 4,
  })

  return NextResponse.json(data)
}

export const GET = handler(AuthMiddleware(true), getDevices)
