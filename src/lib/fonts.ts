import { Fira_Sans, Inter } from 'next/font/google'

export const FontSans = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '600', '700'],
  variable: '--font-sans',
})

export const FontTitle = Fira_Sans({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-title',
})
