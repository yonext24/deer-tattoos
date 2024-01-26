/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { KpiOption, KpisData } from '@/lib/tracking/types'
import Widget from '../helpers'
import { AreaChart } from '@tremor/react'
import { Tab, Tabs } from '@/components/tabs/tabs'
import { formatNumber } from '@/lib/utils/formating'
import { parseVisitsChart } from './parse-visits-chart'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useRouter } from 'next-nprogress-bar'
import { createUrl } from '@/lib/utils/createUrl'
import Spinner from '@/components/ui/common/spinner'
import { useDependenciesParams } from '../../use-dependencies-params'
import { appFetch } from '@/lib/utils/appFetch'

export function VisitsChart({ queryData }: { queryData: KpisData[] }) {
  const [currentData, setCurrentData] = useState<KpisData[]>(queryData)

  const params = useSearchParams()
  const router = useRouter()

  const {
    loading,
    error,
    kpiOption: rawKpi,
    date_from,
    date_to,
  } = useDependenciesParams({
    initialData: queryData,
    onDataChange: setCurrentData,
    fn: ({ date_from, date_to }) =>
      appFetch(`/api/tracking?&date_from=${date_from}&date_to=${date_to}`, {
        cache: 'no-store',
      }),
  })

  const { data, dates, kpiOption } = useMemo(() => {
    return parseVisitsChart({
      queryData: currentData,
      dateParams: { date_from, date_to },
      kpiParam: { kpi: rawKpi ?? '' },
    })
  }, [JSON.stringify(currentData), date_from, date_to, rawKpi])

  const parsedData = (dates ?? []).map((date, index) => {
    const value = Math.max(
      Number(data[0][index]) || 0,
      Number(data[1][index]) || 0
    )

    return {
      date: date.toUpperCase(),
      [kpiOption.label]: value,
    }
  })

  console.log({ currentData, data })

  const setKpi = (kpi: KpiOption['value']) => {
    const newParams = new URLSearchParams(params)
    newParams.set('kpi', kpi)
    router.replace(createUrl('/admin', newParams))
  }

  return (
    <div className="flex flex-col h-auto gap-2 relative">
      <Tabs>
        <Tab
          isActive={kpiOption.value === 'visits'}
          onClick={() => {
            setKpi('visits')
          }}
        >
          Visitas únicas
        </Tab>
        <Tab
          isActive={kpiOption.value === 'pageviews'}
          onClick={() => {
            setKpi('pageviews')
          }}
        >
          Visitas totales
        </Tab>
      </Tabs>
      <Widget className="h-auto">
        <Widget.Title isVisuallyHidden>KPIs</Widget.Title>
        <Widget.Content
          noData={!parsedData?.length}
          className="pt-2 mt-4 [&_text]:!text-white"
        >
          <AreaChart
            showAnimation
            data={parsedData}
            index="date"
            categories={[kpiOption.label]}
            colors={['yellow']}
            valueFormatter={formatNumber}
            showLegend={false}
            className="h-64"
          />
        </Widget.Content>
      </Widget>

      {loading && (
        <div className="absolute bottom-2 right-2">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="absolute bottom-1 right-1/2 translate-x-1/2 text-destructive">
          {'Ocurrió un error al recuperar los datos.'}
        </div>
      )}
    </div>
  )
}
