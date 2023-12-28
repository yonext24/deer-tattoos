import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const searchInEvery = (search: string, arr: string[]) => {
  for (const el of arr) {
    if (el.includes(search)) return true
  }
  return false
}
