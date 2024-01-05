import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      role: 'user' | 'admin' | 'artist'
    } & DefaultSession['user']
  }

  interface User {
    role: 'user' | 'admin' | 'artist'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'user' | 'admin' | 'artist'
    access_token: string
  }
}
