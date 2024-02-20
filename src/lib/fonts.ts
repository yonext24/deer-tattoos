import Local from 'next/font/local'

export const FontSans = Local({
  src: [
    {
      path: '../../public/fonts/Inter-Medium.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Inter-Bold.ttf',
      weight: '700',
    },
    {
      path: '../../public/fonts/Inter-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/Inter-ExtraLight.ttf',
      weight: '200',
    },
  ],
  variable: '--font-sans',
})

export const FontTitle = Local({
  src: '../../public/fonts/FiraSans-Medium.ttf',
  weight: '500',
  variable: '--font-title',
})
