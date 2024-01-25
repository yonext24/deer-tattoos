/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { appFetch, errorParser } from '@/lib/utils/appFetch'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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
    fromRaw?: string | null
    toRaw?: string | null
    kpiRaw?: string | null
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
    fn({ fromRaw, toRaw, kpiRaw })
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

  return { loading, error, fromRaw, toRaw, kpiRaw }
}
