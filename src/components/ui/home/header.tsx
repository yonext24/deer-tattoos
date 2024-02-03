import { StylizedText } from '@/components/stylized-text/stylized-text'
import { Section } from '../common/section'
import { MARCA } from '@/lib/utils/consts'
import { DeerSvgIcon } from '@/components/icons/deer-svg'
import { StylizedLink } from '@/components/stylized-button/stylized-button'
import { cn } from '@/lib/utils/utils'

export function HomeHeader() {
  return (
    <div className="relative overflow-hidden border-b border-[hsl(var(--border))]">
      <div
        className="
      before:absolute before:border-l 
      before:border-[hsl(var(--border))] 
      before:rotate-12 before:w-[60%] 
      before:h-[200vh] before:right-[-10%] 
      before:-top-1/3 before:bg-gradient-to-r from-green/40 to-green/70 before:-z-10"
      />

      <Section className="relative flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] gap-8 overflow-hidden w-full flex-1">
        <div className="grid-col-[1] h-full hidden lg:flex items-center">
          <DeerSvgIcon className="w-[400px] text-gold h-[70vh]" />
        </div>

        <div className="grid-col-[2] text-end flex flex-col min-[470px]:grid gap-y-4 grid-rows-[.5fr_1fr_.5fr] ">
          <div className="flex flex-col items-center min-[470px]:items-end min-[470px]:grid min-[470px]:grid-cols-[auto_1fr] lg:flex lg:flex-col lg:justify-start">
            <DeerSvgIcon className="w-[200px] max-[470px]:mx-auto lg:hidden text-gold h-[200px] self-start" />
            <div className="flex flex-col lg:flex-row items-end justify-center lg:mt-4">
              <StylizedText as="h1" text={`${MARCA}`} lineHeight={'3rem'} />
              <StylizedText as="h1" text={`TATTOOS`} lineHeight={'3rem'} />
              <Local className="lg:hidden" />
            </div>
            <Local className="hidden lg:block" />
          </div>

          <div className="flex flex-col items-center lg:items-end justify-center gap-3">
            <p className="text-center lg:text-end">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              tempore ab id, minima deserunt assumenda ipsum
            </p>
            <StylizedLink href="sobre-nosotros" className="mr-1">
              Conocenos más
            </StylizedLink>
          </div>
          <div />
        </div>
      </Section>
    </div>
  )
}

const Local = ({ className }: { className?: string }) => (
  <h2
    className={cn(
      'mt-4 col-span-2 lg:mt-0 text-2xl text-white font-light',
      className
    )}
  >
    Local de Tatuajes
  </h2>
)
