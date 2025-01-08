import { DevicesChart } from '@/components/ui/admin-panel/charts/devices-chart/devices-chart'
import { TopPagesChart } from '@/components/ui/admin-panel/charts/pages-chart/pages-chart'
import { VisitsChart } from '@/components/ui/admin-panel/charts/visits-chart/visits-chart'
import { SearchParamsType } from '@/lib/types/common'
import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  return (
    <div className="flex-1 grid grid-cols-2 gap-4">
      <Suspense>
        <div className="col-start-1 col-end-3">
          <VisitsChart />
        </div>
        <div className="col-start-1 col-end-3">
          <TopPagesChart />
        </div>
        <div className="">
          <DevicesChart />
        </div>
      </Suspense>
    </div>
  )
}
