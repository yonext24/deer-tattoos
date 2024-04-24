'use client'

import { useEffect } from 'react'

const sessionIdGenerator = () => {
  const date = Date.now()
  const random = Math.random()
  const sessionId = `${date}${random.toString(16)}`
  // Whatever, im not gonna use Crypto here and install a polyfill for it
  return sessionId.replace('.', 'a')
}

export function ShopSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const cookies = document.cookie.split(';')
    const sessionId = cookies.find((cookie) => cookie.includes('SESSIONID'))

    if (!sessionId) {
      document.cookie = `SESSIONID=${sessionIdGenerator()}; path=/`
    }
  }, [])

  return <>{children}</>
}
