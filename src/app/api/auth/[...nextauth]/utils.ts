import { getServerSession, User } from 'next-auth'
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@backend/prisma'
import { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'

const user = { id: '1', name: process.env.ADMIN_USER, role: 'admin' }

export const nextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        username: { label: 'Nombre de usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials, req) {
        if (
          credentials?.username !== process.env.ADMIN_USERNAME &&
          credentials?.password !== process.env.ADMIN_PASSWORD
        )
          return null

        return user as User
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user?.role ?? 'user'
      }

      return token
    },
    session({ session, token }) {
      session.user.role = token.role

      return session
    },
    redirect() {
      return '/admin'
    },
  },
}

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, nextAuthOptions)
}
