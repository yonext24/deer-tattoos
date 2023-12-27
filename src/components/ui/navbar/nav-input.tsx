import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { cn } from '@/lib/utils/utils'

type NavInputProps = {} & React.InputHTMLAttributes<HTMLInputElement>

export const NavInput = (props: NavInputProps) => {
  return (
    <div className="flex items-center max-w-[600px] w-full col-span-2">
      <Input {...props} className={cn(props.className, 'rounded-r-none')} />
      <Button disabled={props.disabled} className="rounded-l-none">
        Buscar
      </Button>
    </div>
  )
}
