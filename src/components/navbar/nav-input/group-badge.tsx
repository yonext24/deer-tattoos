import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/shadcn/ui/hover-card'
import { GoldBadge } from '@/components/ui/common/gold-badge'
import { useState } from 'react'

export function GroupBadge({
  styles,
  handleDeleteStyle,
}: {
  handleDeleteStyle: (style: string) => void
  styles: string[]
}) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger className="self-center">
        <GoldBadge
          id="groupBadge"
          variant="outline"
          onClick={() => {
            setOpen(true)
          }}
        >
          +{styles.length}
        </GoldBadge>
      </HoverCardTrigger>
      <HoverCardContent className="min-w-32 w-auto flex flex-col">
        {styles.map((el) => (
          <GoldBadge
            key={el}
            variant="outline"
            onClick={() => handleDeleteStyle(el)}
          >
            {el}
          </GoldBadge>
        ))}
      </HoverCardContent>
    </HoverCard>
  )
}
