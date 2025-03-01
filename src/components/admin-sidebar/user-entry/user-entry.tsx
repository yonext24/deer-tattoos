import { buttonVariants } from '@/components/shadcn/ui/button'
import { cn } from '@/lib/utils/utils'
import Image from 'next/image'

export function UserEntry({ name, image }: { name?: string; image?: string }) {
  return (
    <button
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'px-2 py-3 w-full flex justify-evenly h-auto'
      )}
    >
      {image && (
        <Image src={image} alt="Imágen de usuario" height={35} width={35} />
      )}
      <span className="flex flex-1 justify-center">{name}</span>
    </button>
  )
}
