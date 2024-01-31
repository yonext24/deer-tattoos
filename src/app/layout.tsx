import type { Metadata } from 'next'
import './globals.css'
import { FontSans, FontTitle } from '@/lib/fonts'
import { Navbar } from '@/components/navbar/navbar'
import { cn } from '@/lib/utils/utils'
import { Toaster } from '@/components/shadcn/ui/sonner'
import { PageProvider } from '@/components/providers/page-provider'
import { APP_URL, MARCA } from '@/lib/utils/consts'

export const mainKeywords = [
  'tatuajes lanus',
  'tatuajes lomas de zamora',
  'tatuajes buenos aires',
  'tatuajes argentina',
  'tatuajes zona sur',
  'tatuajes zona oeste',
  'tatuajes zona centro',
  'local de tatuajes lanus',
  'local de tatuajes',
]

export const metadata: Metadata = {
  title: {
    template: `%s | ${MARCA} Tattoos`,
    default: `${MARCA} TATTOOS`,
  },
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  applicationName: `${MARCA} TATTOOS`,
  keywords: mainKeywords,
  category: 'Tatuajes',
  generator: `${MARCA}`,
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
    url: true,
  },
  metadataBase: new URL(APP_URL as string),
  openGraph: {
    title: `${MARCA} TATTOOS`,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    url: APP_URL,
    siteName: `${MARCA} TATTOOS`,
    type: 'website',
    locale: 'es_AR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body
        className={cn(
          'bg-black flex flex-col items-center min-h-screen text-white font-sans',
          FontSans.variable,
          FontTitle.variable
        )}
      >
        <Navbar />
        <PageProvider>{children}</PageProvider>
        <Toaster />
      </body>
    </html>
  )
}
