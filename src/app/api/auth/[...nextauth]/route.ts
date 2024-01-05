import NextAuth from 'next-auth/next'
import { nextAuthOptions } from './utils'

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
