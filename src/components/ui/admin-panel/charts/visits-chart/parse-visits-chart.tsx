import { KpisData, KpiType, KPI_OPTIONS, isKpi } from '@/lib/tracking/types'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

type ChartValue = number | string

const arrayHasCurrentDate = (dates: string[], isHourlyGranularity: boolean) => {
  const now = dayjs().format(isHourlyGranularity ? 'HH:00' : 'MMM DD, YYYY')
  return dates[dates.length - 1] === now
}

function parseData(
  kpi: KpiType,
  queryData: KpisData[],
  date_from?: Date,
  date_to?: Date
) {
  console.log({ date_from, date_to })

  const isHourlyGranularity = !!date_from && !!date_to && date_from === date_to

  const dates = queryData.map(({ date }) =>
    dayjs(date)
      .locale('es')
      .format(isHourlyGranularity ? 'HH:mm' : 'MMM DD, YYYY')
  )
  const isCurrentData = arrayHasCurrentDate(dates, isHourlyGranularity)

  const data = isCurrentData
    ? queryData.reduce(
        (acc, record, index) => {
          const value = record[kpi] ?? 0

          const pastValue = index < queryData.length - 1 ? value : ''
          const currentValue = index > queryData.length - 3 ? value : ''

          const [pastPart, currentPart] = acc

          return [
            [...pastPart, pastValue],
            [...currentPart, currentValue],
          ]
        },
        [[], []] as ChartValue[][]
      )
    : [queryData.map((value) => value[kpi] ?? 0), ['']]

  return {
    dates,
    data,
  }
}

export function parseVisitsChart({
  queryData,
  dateParams,
  kpiParam,
}: {
  queryData: KpisData[]
  dateParams: { date_from: string | undefined; date_to: string | undefined }
  kpiParam: { kpi?: string }
}) {
  const kpi = isKpi(kpiParam.kpi) ? kpiParam.kpi : 'visits'
  const kpiOption = KPI_OPTIONS.find(({ value }) => value === kpi)!

  const startDate = dateParams.date_from
    ? new Date(dateParams.date_from)
    : undefined
  const endDate = dateParams.date_to ? new Date(dateParams.date_to) : undefined

  const { dates, data } = parseData(kpi, queryData, startDate, endDate)

  return {
    kpi,
    kpiOption,
    dates,
    data,
  }
}
