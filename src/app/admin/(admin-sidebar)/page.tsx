import { auth } from '@/app/api/auth/[...nextauth]/utils'
import { Main } from '@/components/ui/common/main'

export default async function Page() {
  const session = await auth()

  return (
    <Main withAnalytics={false}>
      <h1>Admin Page</h1>
      {JSON.stringify(session)}
    </Main>
  )
}
