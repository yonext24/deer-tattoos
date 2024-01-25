import { cn } from '@/lib/utils/utils'

export function Tabs({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="tablist"
      className="h-10 items-center justify-center rounded-md bg-neutral-800 p-1 text-muted-foreground grid w-full grid-cols-2"
    >
      {children}
    </div>
  )
}
export function Tab({
  children,
  isActive = false,
  onClick,
}: {
  isActive?: boolean
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      role="tab"
      data-active={isActive}
      aria-selected={isActive}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-background',
        'data-[active=true]:text-foreground data-[active=true]:shadow-sm'
      )}
    >
      {children}
    </button>
  )
}
