import { useRouter } from 'next-nprogress-bar'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createUrl } from '@/lib/utils/createUrl'
import dayjs from 'dayjs'
import { DateRange } from 'react-day-picker'

export function useDateFilter() {
  const router = useRouter()
  const nextSearchParams = useSearchParams()

  const [dateRangePickerValue, setDateRangePickerValue] = useState<DateRange>(
    () => {
      const searchParams = new URLSearchParams(nextSearchParams)

      const rawStartDate = searchParams.get('date_from')
      const rawEndDate = searchParams.get('date_to')

      const startDate = rawStartDate ? new Date(rawStartDate) : null
      const endDate = rawEndDate ? new Date(rawEndDate) : null

      return {
        from: startDate ?? dayjs().subtract(1, 'week').toDate(),
        to: endDate ?? dayjs().toDate(),
      }
    }
  )
  const setDateFilter = useCallback(
    (data: DateRange | undefined, day?: Date) => {
      if (!data) {
        setDateRangePickerValue({ from: undefined, to: undefined })
        return
      }

      const { from, to } = data

      const searchParams = new URLSearchParams(nextSearchParams)
      setDateRangePickerValue({ from, to })

      if (!from || !to) return

      const rawStart = from.toISOString().split('T')[0]
      const rawEnd = to.toISOString().split('T')[0]

      searchParams.set('date_from', rawStart)
      searchParams.set('date_to', rawEnd)

      router.push(createUrl('/admin', searchParams), { scroll: false })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return {
    dateRangePickerValue,
    setDateFilter,
  }
}
