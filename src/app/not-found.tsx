import { StylizedLink } from '@/components/stylized-button/stylized-button'
import { StylizedText } from '@/components/stylized-text/stylized-text'
import { Main } from '@/components/ui/common/main'
import { Section } from '@/components/ui/common/section'
import { LOGO } from '@/lib/utils/consts'

export default function Custom404() {
  return (
    <Main>
      <Section className="items-center justify-center flex">
        <div className="flex flex-col items-center gap-4">
          <div className="-mb-4">
            <StylizedText size="3rem" text={LOGO} />
          </div>
          No se encontró la página que estabas buscando
          <StylizedLink href="/" className="text-sm">
            Volver al inicio
          </StylizedLink>
        </div>
      </Section>
    </Main>
  )
}
