import { StylizedText } from '@/components/stylized-text/stylized-text'
import { Main } from '@/components/ui/common/main'
import { MultiStepForm } from '@/components/ui/shop/checkout/multi-step-form/multi-step-form'
import { PriceSection } from '@/components/ui/shop/checkout/price-section'
import { StageSection } from '@/components/ui/shop/checkout/stage-section'
import { MARCA } from '@/lib/utils/consts'

export default function Page() {
  return (
    <Main
      withMarginOnTop
      className="mx-auto flex flex-col w-full min-h-screen-n"
    >
      <div className="flex flex-col items-center pt-4 pb-4">
        <StylizedText text={MARCA} as={'h1'} lineHeight={'50px'} />
        <h2 className="flex font-thin text-md">Proceder al pago</h2>
        <StageSection />
      </div>
      <div className="flex flex-col-reverse lg:flex-row">
        <section className="flex flex-col flex-1 border-t borer-border px-4 py-4">
          <MultiStepForm />
        </section>
        <section className="flex flex-col border-l border-border">
          <PriceSection />
        </section>
      </div>
    </Main>
  )
}
