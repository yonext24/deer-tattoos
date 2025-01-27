'use client'

import Widget from '../helpers'
import { BarList } from '@tremor/react'
import { useMemo, useState } from 'react'
import { TopPagesData } from './pages-chart.d'
import { appFetch } from '@/lib/utils/appFetch'
import { useDependenciesParams } from '../../use-dependencies-params'
import { cn } from '@/lib/utils/utils'
import { formatNumber } from '@/lib/utils/formating'
import { PagesChartTattooIcon } from './pages-chart-tattoo-icon'

export function TopPagesChart() {
  const [currentData, setCurrentData] = useState<TopPagesData[]>([])

  const { loading, error, kpiOption } = useDependenciesParams({
    initialData: [],
    excludeDependencies: { kpi: true },
    permitFirstFetch: true,
    onDataChange: setCurrentData,
    fn: ({ date_from, date_to }) =>
      appFetch(
        `/api/tracking/pages?&date_from=${date_from}&date_to=${date_to}&type=tattoo`,
        {
          cache: 'no-store',
        }
      ),
  })

  const chartData = useMemo(
    () =>
      (currentData ?? []).map((d) => {
        const slug = d.pathname.split('/tatuajes/')[1] ?? d.pathname
        const index = kpiOption === 'visits' ? 'visits' : 'hits'

        return {
          // icon: () => <PagesChartTattooIcon slug={slug} />,
          name: slug,
          value: d[index],
          href: `${d.pathname}`,
        }
      }),
    [currentData, kpiOption]
  )

  return (
    <Widget>
      <Widget.Title>Top Pages</Widget.Title>
      <Widget.Content
        status={loading ? 'loading' : error ? 'error' : 'success'}
        noData={!chartData?.length}
        warning={error}
      >
        <div className="grid grid-cols-5 gap-x-4 gap-y-2">
          <div className="col-span-3 text-xs font-semibold tracking-widest text-gray-500 uppercase h-5">
            Content
          </div>
          <div
            className={cn(
              'col-span-1 font-semibold text-xs text-right tracking-widest uppercase cursor-pointer h-5'
            )}
          >
            Visitas
            <br />
            únicas
          </div>
          <div
            className={cn(
              'col-span-1 row-span-1 font-semibold text-xs text-right tracking-widest uppercase cursor-pointer h-5'
            )}
          >
            Visitas
            <br />
            totales
          </div>

          <div className="col-span-3">
            <BarList
              showAnimation
              color="yellow"
              data={chartData}
              valueFormatter={(_: any) => ''}
            />
          </div>
          <div className="flex flex-col col-span-1 row-span-4 gap-2">
            {(currentData ?? []).map(({ pathname, visits }) => (
              <div
                key={pathname}
                className="flex items-center justify-end w-full text-neutral-64 h-9"
              >
                {formatNumber(visits ?? 0)}
              </div>
            ))}
          </div>
          <div className="flex flex-col col-span-1 row-span-4 gap-2">
            {(currentData ?? []).map(({ pathname, hits }) => (
              <div
                key={pathname}
                className="flex items-center justify-end w-full text-neutral-64 h-9"
              >
                {formatNumber(hits)}
              </div>
            ))}
          </div>
        </div>
      </Widget.Content>
    </Widget>
  )
}
