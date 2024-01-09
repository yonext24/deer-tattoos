import { ARTIST_CONTROLLER } from '@backend/controllers/artist-controller'
import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { handler } from '@backend/middlewares/helpers'
import { ArtistCreateValidator } from '@backend/middlewares/validators'

export const GET = ARTIST_CONTROLLER.getAllArtists
export const POST = handler(
  AuthMiddleware(true),
  ArtistCreateValidator,
  ARTIST_CONTROLLER.createArtist
)
