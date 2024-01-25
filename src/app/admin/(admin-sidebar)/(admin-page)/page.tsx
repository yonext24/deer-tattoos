import { DevicesChart } from '@/components/ui/admin-panel/charts/devices-chart/devices-chart'
import { VisitsChart } from '@/components/ui/admin-panel/charts/visits-chart/visits-chart'
import { queryPipe } from '@/lib/tracking/api'
import { KpisData } from '@/lib/tracking/types'
import { SearchParamsType } from '@/lib/types/common'
import { transformSearchParams } from '@/lib/utils/utils'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  const dateParams = transformSearchParams(searchParams, {
    date_from: 'unique',
    date_to: 'unique',
  })

  const { data: queryData } = await queryPipe<KpisData>('kpis', {
    ...dateParams,
  })

  return (
    <div className="flex-1 grid grid-cols-2 gap-4">
      <div className="col-start-1 col-end-3">
        <VisitsChart queryData={queryData} />
      </div>
      <div className="">
        <DevicesChart />
      </div>
    </div>
  )
}