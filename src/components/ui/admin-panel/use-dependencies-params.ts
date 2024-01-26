/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { errorParser } from '@/lib/utils/appFetch'
import { normalizeDates } from '@/lib/utils/utils'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

export function useDependenciesParams<T extends any>({
  initialData,
  onDataChange,
  permitFirstFetch = false,
  fn,
  excludeDependencies = { kpi: false, from: false, to: false },
}: {
  initialData: T
  onDataChange: (data: T) => void
  permitFirstFetch?: boolean
  fn: (prop: {
    date_from?: string | null
    date_to?: string | null
    kpiOption?: string | null
  }) => Promise<T>
  excludeDependencies?: { kpi?: boolean; from?: boolean; to?: boolean }
}) {
  const [loading, setLoading] = useState<boolean>(permitFirstFetch)
  const [error, setError] = useState<string | null>(null)

  const params = useSearchParams()

  const kpiRaw = params.get('kpi')
  const fromRaw = params.get('date_from')
  const toRaw = params.get('date_to')

  const record = useRef({
    date_from: fromRaw,
    date_to: toRaw,
    kpi: kpiRaw,
    data: initialData,
    hasFetched: !permitFirstFetch,
  })

  const dependencies = (() => {
    const deps = []
    if (!excludeDependencies.kpi) deps.push(kpiRaw)
    if (!excludeDependencies.from) deps.push(fromRaw)
    if (!excludeDependencies.to) deps.push(toRaw)
    return deps
  })()

  useEffect(() => {
    console.log('trigger')

    const currentRecord = record.current
    if (
      currentRecord.date_from === fromRaw &&
      currentRecord.date_to === toRaw &&
      currentRecord.kpi === kpiRaw &&
      currentRecord.hasFetched
    )
      return

    setLoading(true)

    const { date_from, date_to } = normalizeDates({
      date_from: fromRaw,
      date_to: toRaw,
    })

    fn({ date_from, date_to, kpiOption: kpiRaw })
      .then((newData) => {
        record.current = {
          date_from: fromRaw,
          date_to: toRaw,
          kpi: kpiRaw,
          data: newData,
          hasFetched: false,
        }
        onDataChange(newData)
      })
      .catch((err) => setError(errorParser(err)))
      .finally(() => {
        setLoading(false)
      })
  }, dependencies)

  const { date_from, date_to, kpiOption } = useMemo(() => {
    const { date_from, date_to } = normalizeDates({
      date_from: fromRaw,
      date_to: toRaw,
    })
    return { date_from, date_to, kpiOption: kpiRaw }
  }, [fromRaw, toRaw, kpiRaw])

  return { loading, error, date_from, date_to, kpiOption }
}
