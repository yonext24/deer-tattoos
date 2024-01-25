import type { Metadata } from 'next'
import './globals.css'
import { FontSans, FontTitle } from '@/lib/fonts'
import { Navbar } from '@/components/navbar/navbar'
import { cn } from '@/lib/utils/utils'
import { Toaster } from '@/components/shadcn/ui/sonner'
import { PageProvider } from '@/components/providers/page-provider'

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
    template: '%s | DEER Tattoos',
    default: 'DEER TATTOOS',
  },
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  applicationName: 'DEER TATTOOS',
  keywords: mainKeywords,
  category: 'Tatuajes',
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
