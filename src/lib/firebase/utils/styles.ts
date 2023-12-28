import { Style } from '@/lib/types/style'
import styles from '../../../../public/categories.json'

export const getStyles = async (search?: string) => {
  await new Promise((res) => {
    setTimeout(res, 1000)
  })

  return styles as Style[]
}
