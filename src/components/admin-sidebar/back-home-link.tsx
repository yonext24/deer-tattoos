import { buttonVariants } from '@/components/shadcn/ui/button'
import { cn } from '@/lib/utils/utils'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Link } from 'next-view-transitions'

export function BackHomeLink() {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'lg' }),
        'px-2 py-1 flex h-auto m-1 rounded-md justify-start gap-4'
      )}
      href="/"
    >
      <ArrowLeftIcon />
      <span className="">Volver al inicio</span>
    </Link>
  )
}
