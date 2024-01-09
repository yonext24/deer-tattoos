import { Style } from '@/lib/types/style'
import styles from '../../../../public/categories.json'
import { cache } from 'react'

export const getStyles = cache(async (search?: string) => {
  await new Promise((res) => {
    setTimeout(res, 1000)
  })

  return styles as Style[]
})
