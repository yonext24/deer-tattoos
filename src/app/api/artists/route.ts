import { ARTIST_CONTROLLER } from '@backend/controllers/artist-controller'
import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { handler } from '@backend/middlewares/helpers'
import {
  ArtistCreateValidator,
  ArtistUpdateImagesValidator,
  ArtistUpdateValidator,
} from '@backend/middlewares/validators'

export const GET = ARTIST_CONTROLLER.getAllArtists

export const POST = handler(
  AuthMiddleware(true),
  ArtistCreateValidator,
  ARTIST_CONTROLLER.createArtist
)

export const PATCH = handler(
  AuthMiddleware(true),
  ArtistUpdateValidator,
  ARTIST_CONTROLLER.updateArtist
)

export const PUT = handler(
  AuthMiddleware(true),
  ArtistUpdateImagesValidator,
  ARTIST_CONTROLLER.updateImagesArtist
)

export const DELETE = handler(
  AuthMiddleware(true),
  ARTIST_CONTROLLER.deleteArtist
)
