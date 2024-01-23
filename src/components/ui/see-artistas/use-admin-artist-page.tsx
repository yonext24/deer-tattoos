'use client'

import { Artist } from '@/lib/types/artist'
import { Dispatch, createContext, useContext, useReducer } from 'react'
import { AdminArtistAction, AdminArtistReducer } from './admin-artist-reducer'

const AdminActionsContext = createContext<{
  state: Artist[]
  dispatch: Dispatch<AdminArtistAction>
}>({ state: [], dispatch: () => {} })

export const AdminActionsProvider = ({
  children,
  artists,
}: {
  children: React.ReactNode
  artists: Artist[]
}) => {
  const [state, dispatch] = useReducer(AdminArtistReducer, artists)

  return (
    <AdminActionsContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminActionsContext.Provider>
  )
}

export const useAdminActions = () => {
  const context = useContext(AdminActionsContext)
  if (context === undefined) {
    throw new Error(
      'useAdminActions must be used within a AdminActionsProvider'
    )
  }
  return context
}
