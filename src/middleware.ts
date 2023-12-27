import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  })
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
