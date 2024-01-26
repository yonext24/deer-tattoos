import { getTattooBySlug } from '@backend/utils/tattoos-utils'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  const params = new URLSearchParams(req.url)
  const slug = params.get('slug')

  if (!slug) return new Response('Not found', { status: 404 })

  const tattoo = await getTattooBySlug(slug)

  return NextResponse.json(tattoo)
}
