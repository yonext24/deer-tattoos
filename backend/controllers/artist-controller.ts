import { ParsedRequest } from '@backend/middlewares/helpers'
import { prisma } from '@backend/prisma'
import { NextResponse } from 'next/server'

export const ARTIST_CONTROLLER = {
  getAllArtists: async (req: ParsedRequest) => {
    const artists = await prisma.artist.findMany({
      include: {
        tattoos: false,
      },
    })

    return NextResponse.json(artists)
  },
}
