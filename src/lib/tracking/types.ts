import {
  formatMinSec,
  formatNumber,
  formatPercentage,
  kFormatter,
} from '@/lib/utils/formating'

export type ClientResponse<T> = T & { error?: string }

export type BaseColumnType = 'String' | 'Date' | 'UInt64' | 'Float64'

export type ColumnType = BaseColumnType | `Nullable(${BaseColumnType})`

export type Meta<T> = { name: keyof T; type: ColumnType }

export type Statistics = {
  elapsed: number
  rows_read: number
  bytes_read: number
}

export type QueryPipe<T> = {
  meta: Meta<T>[]
  data: T[]
  rows: number
  statistics: Statistics
}

export type QuerySQL<T> = {
  meta: Meta<T>[]
  data: T[]
  rows: number
  statistics: Statistics
}

export type PipeParams<T> = Record<keyof T, string> & {
  limit: number
  date_to: string
  date_from: string
}

export type QueryStatus = 'idle' | 'loading' | 'updating' | 'error' | 'success'

export class QueryError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'QueryError'
    this.status = status
  }
}
export type KpisData = {
  date: string
  visits: number
  pageviews: number
  bounce_rate: null | number
  avg_session_sec: number
}

const ALL_KPIS = [
  'visits',
  'pageviews',
  'avg_session_sec',
  'bounce_rate',
] as const

type KpiTuple = typeof ALL_KPIS

export type KpiType = KpiTuple[number]

export type KpiOption = {
  label: string
  value: KpiType
  tooltip: string
  formatter: (value: number) => string
}

export const KPI_OPTIONS: KpiOption[] = [
  {
    label: 'Visitantes únicos',
    value: 'visits',
    tooltip: 'visits',
    formatter: formatNumber,
  },
  {
    label: 'Visitas totales',
    value: 'pageviews',
    tooltip: 'pageviews',
    formatter: formatNumber,
  },
]

export function isKpi(kpi: string | string[] | undefined): kpi is KpiType {
  return ALL_KPIS.includes(kpi as KpiType)
}

export enum DateFilter {
  Today = '0',
  Yesterday = '1',
  Last7Days = '7',
  Last30Days = '30',
  Last12Months = '365',
  Custom = 'custom',
}

export type DateRangePickerOption = {
  value: string
  text: string
  startDate: Date
}

export const dateFormat = 'YYYY-MM-DD'
