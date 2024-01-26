import { getServerSession } from 'next-auth'
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@backend/prisma'
import { Adapter } from 'next-auth/adapters'
import { permitedMails } from '@/lib/utils/consts'

export const nextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user',
        }
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
    async signIn(props) {
      const profile = props.profile

      if (!permitedMails.includes(profile?.email ?? '')) {
        return false
      }

      return true
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
