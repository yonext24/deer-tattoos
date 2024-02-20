import { NextRequest, NextResponse } from 'next/server'
import { matchPathname } from './lib/utils/createUrl'
import { getToken } from 'next-auth/jwt'

const privateRoutes = ['/admin/*', '/admin']

const isPrivate = (url: string) => {
  return matchPathname(url, privateRoutes)
}

export async function middleware(request: NextRequest) {
  // if (isPrivate(request.nextUrl.pathname)) {
  //   const token = await getToken({
  //     req: request,
  //   })

  //   if (token?.role === 'admin') {
  //     return NextResponse.next()
  //   }

  //   const url = request.nextUrl.clone()
  //   url.pathname = '/api/auth/signin'
  //   return NextResponse.redirect(url)
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public folder
     */
    '/((?!static|.*\\..*|_next|favicon.ico|api).*)',
  ],
}
