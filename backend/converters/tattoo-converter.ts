import { Tattoo } from '@/lib/types/tattoo'
import { RawTattoo } from './types'

export const tattooConverter = <T = RawTattoo | RawTattoo[]>(
  tattoo: T
): T extends [] ? Tattoo[] : Tattoo => {
  if (Array.isArray(tattoo)) {
    return tattoo as any
  }

  return tattoo as any as any
}
