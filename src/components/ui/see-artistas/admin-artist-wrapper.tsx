'use client'

import { AdminArtistCard } from './admin-artist-card'
import { useAdminActions } from './use-admin-artist-page'

export function AdminArtistWrapper() {
  const { state } = useAdminActions()

  return (
    <>
      {state.map((art) => (
        <AdminArtistCard key={art.slug} {...art} />
      ))}
    </>
  )
}
