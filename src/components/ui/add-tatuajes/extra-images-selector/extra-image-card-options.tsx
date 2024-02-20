import { Button } from '@/components/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  TrashIcon,
} from 'lucide-react'

export function ExtraImageCardOptions({
  handleMoveLeft,
  handleMoveRight,
  handleRemove,
}: {
  handleRemove: () => void
  handleMoveLeft: () => void
  handleMoveRight: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-md flex items-center justify-center absolute top-2 right-2 bg-black/50 w-[30px] h-[30px] p-0 aspect-square"
        >
          <DotsHorizontalIcon className="w-4 h-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleMoveLeft} role="button">
            <div className="flex gap-2">
              <ArrowLeftCircleIcon className="w-4 h-4" />
              <label>Mover a la izquierda</label>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem role="button" onClick={handleMoveRight}>
            <div className="flex gap-2">
              <ArrowRightCircleIcon className="w-4 h-4" />
              <label>Mover a la derecha</label>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem role="button" onClick={handleRemove}>
            <div className="flex gap-2 text-destructive">
              <TrashIcon className="w-4 h-4" />
              <label>Borrar</label>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
