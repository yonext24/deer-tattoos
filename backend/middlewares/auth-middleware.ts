import { getToken } from 'next-auth/jwt'
import { AppError, Middleware } from './helpers'

export const AuthMiddleware =
  (withAuth: boolean): Middleware =>
  async (req, next) => {
    const token = await getToken({ req })

    if (!token) {
      throw new AppError(401, 'No estás autorizado para realizar esta acción')
    }

    if (withAuth && token.role !== 'admin') {
      throw new AppError(401, 'No estás autorizado para realizar esta acción')
    }

    next()
  }
