import { tattooController } from '@backend/controllers/tattoo-controller'
import { AuthMiddleware } from '@backend/middlewares/auth-middleware'
import { handler } from '@backend/middlewares/helpers'
import { TattooCreateValidator } from '@backend/middlewares/validators'

const POST_FUNCTION = tattooController.createTattoo

export const POST = handler(
  AuthMiddleware(true),
  TattooCreateValidator,
  POST_FUNCTION,
)
export const GET = tattooController.getTattoos
