import Local from 'next/font/local'

export const FontSans = Local({
  src: [
    {
      path: '../../public/fonts/Inter-Medium.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/Inter-Bold.woff2',
      weight: '700',
    },
    {
      path: '../../public/fonts/Inter-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/Inter-ExtraLight.woff2',
      weight: '200',
    },
  ],
  variable: '--font-sans',
})

export const FontTitle = Local({
  src: '../../public/fonts/FiraSans-Medium.woff2',
  weight: '500',
  variable: '--font-title',
})
