import { appFetch } from '@/lib/utils/appFetch'

export const getPositionsClient = async (artist?: string) => {
  return await appFetch(`/api/position${artist ? `?artist=${artist}` : ''}`)
}
