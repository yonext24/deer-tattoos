/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Fragment, useMemo, useState } from 'react'
import { DonutChart } from '@tremor/react'
import Widget, {
  tremorPieChartColors,
} from '@components/ui/admin-panel/charts/helpers'
import { formatNumber } from '@/lib/utils/formating'
import { type TopDevicesData } from './devices-chart.d'
import { useDependenciesParams } from '../../use-dependencies-params'
import { appFetch } from '@/lib/utils/appFetch'
import { devices } from '@/lib/utils/consts'

export function DevicesChart() {
  const [fullData, setFullData] = useState<TopDevicesData[]>()

  const { loading, error } = useDependenciesParams({
    initialData: [],
    onDataChange: setFullData,
    excludeDependencies: { kpi: true },
    permitFirstFetch: true,
    fn: ({ date_from, date_to }) =>
      appFetch(
        `/api/tracking/devices?date_from=${date_from}&date_to=${date_to}`,
        {}
      ),
  })

  const data = useMemo(() => {
    if (!fullData) return []
    return [...fullData]
      .sort((a, b) => b.visits - a.visits)
      .map(({ device, visits }) => ({
        device: devices[device] ?? device,
        visits,
      }))
  }, [JSON.stringify(fullData)])

  const status = (() => {
    if (loading) return 'loading'
    if (error) return 'error'
    return 'idle'
  })()
  return (
    <Widget className="min-h-[240px] h-auto">
      <Widget.Title>Top Dispositivos</Widget.Title>
      <Widget.Content noData={!data?.length} status={status} warning={error}>
        <div className="w-full h-full grid grid-cols-2">
          <DonutChart
            data={data ?? []}
            category="visits"
            index="device"
            colors={tremorPieChartColors.map(([color]) => color)}
            showLabel={false}
            valueFormatter={formatNumber}
          />
          <div className="justify-self-end">
            <div className="grid grid-cols-2 gap-y-1 gap-4">
              <div className="text-xs tracking-widest font-medium uppercase text-center truncate">
                Dispositivo
              </div>
              <div className="text-xs tracking-widest font-medium uppercase text-right truncate">
                Visitantes
              </div>
              {(data ?? []).map(({ device, visits }, index) => (
                <Fragment key={device}>
                  <div className="flex items-center gap-2 text-sm leading-5 text-neutral-64 h-9 px-4 py-2 rounded-md z-10">
                    <div
                      className="h-4 min-w-[1rem]"
                      style={{
                        backgroundColor: tremorPieChartColors[index][1],
                      }}
                    />
                    <span>{device}</span>
                  </div>
                  <div className="flex items-center justify-end text-neutral-64 h-9">
                    {formatNumber(visits)}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </Widget.Content>
    </Widget>
  )
}
