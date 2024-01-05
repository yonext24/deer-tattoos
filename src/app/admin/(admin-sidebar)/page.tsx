import { auth } from '@/app/api/auth/[...nextauth]/utils'
import { Main } from '@/components/ui/common/main'

export default async function Page() {
  const session = await auth()

  console.log(session)

  return (
    <Main>
      <h1>Admin Page</h1>
      {JSON.stringify(session)}
    </Main>
  )
}
