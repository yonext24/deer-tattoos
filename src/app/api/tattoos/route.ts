import { tattooController } from '@backend/controllers/tattoo-controller'
import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { handler } from '@backend/middlewares/helpers'
import {
  TattooCreateValidator,
  TattooUpdateValidator,
} from '@backend/middlewares/validators'

export const POST = handler(
  AuthMiddleware(true),
  TattooCreateValidator,
  tattooController.createTattoo
)

export const PATCH = handler(
  AuthMiddleware(true),
  TattooUpdateValidator,
  tattooController.updateTattoo
)

export const DELETE = handler(
  AuthMiddleware(true),
  tattooController.deleteTattoo
)

export const GET = tattooController.getTattoos
