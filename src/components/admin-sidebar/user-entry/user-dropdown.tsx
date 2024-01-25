'use client'

import { Button } from '@/components/shadcn/ui/button'
import { signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/shadcn/ui/dropdown-menu'

export function UserDropdown({
  children,
  name,
  role,
}: {
  name: string
  children: React.ReactNode
  role: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {name}
          <span className="text-sm text-green-lighter ml-2">{role}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              onClick={() => {
                signOut()
              }}
              className="w-full"
              size="sm"
            >
              Cerrar Sesión
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
