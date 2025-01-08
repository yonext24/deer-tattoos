import { Style } from '@/lib/types/style'
import { appFetch } from '@/lib/utils/appFetch'

export const getStylesClient = async () => {
  const styles = await appFetch('/api/categories')

  return styles as Style[]
}
