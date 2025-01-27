import type { Metadata } from 'next'
import './globals.css'
import { FontTitle, FontSans } from '@/lib/fonts'
import { Navbar } from '@/components/navbar/navbar'
import { cn } from '@/lib/utils/utils'
import { Toaster } from '@/components/shadcn/ui/sonner'
import { PageProvider } from '@/components/providers/page-provider'
import { APP_URL, MARCA } from '@/lib/utils/consts'
import { ViewTransitions } from 'next-view-transitions'
import { getAllPageData } from '@/lib/backend/utils/data'

const mainKeywords = [
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

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAllPageData()

  return {
    title: {
      template: `%s | ${MARCA} Tattoos`,
      default: `${MARCA} TATTOOS`,
    },
    robots: {
      follow: true,
      index: true,
    },
    description: data?.main_data,
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
      description: data?.main_data,
      url: APP_URL,
      siteName: `${MARCA} TATTOOS`,
      type: 'website',
      locale: 'es_AR',
    },
    alternates: {
      canonical: APP_URL,
    },
    verification: {
      google: 'EtaHZT8BS9AvJSMDYbJQIuoqRA1O2DxBpeGddC3Dm0s',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
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
    </ViewTransitions>
  )
}
