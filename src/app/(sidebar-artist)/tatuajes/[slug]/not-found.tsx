import { Button } from '@/components/shadcn/ui/button'
import { StylizedText } from '@/components/stylized-text/stylized-text'
import { Main } from '@/components/ui/common/main'
import { MARCA } from '@/lib/utils/consts'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Main className="flex flex-col gap-1 items-center justify-center">
      <StylizedText text={MARCA} />
      No se encontró el tatuaje que estabas buscando
      <Button variant="link">
        <Link href="/tatuajes">Volver a tatuajes</Link>
      </Button>
    </Main>
  )
}
