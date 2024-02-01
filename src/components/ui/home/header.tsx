import { StylizedText } from '@/components/stylized-text/stylized-text'
import { Section } from '../common/section'
import Image from 'next/image'
import { MARCA } from '@/lib/utils/consts'

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

      <Section className="relative grid grid-cols-[1.2fr_1fr] gap-8 overflow-hidden w-full flex-1">
        <div className="grid-col-[1] h-full flex items-center">
          <div className="p-2 border border-[hsl(var(--border))] w-max shadow-lg">
            <Image
              src="/a.jpg"
              alt="image"
              height={550}
              width={550}
              quality={100}
            />
          </div>
        </div>
        <div className="grid-col-[2] text-end flex flex-col items-end">
          <StylizedText as="h1" text={`${MARCA} TATTOOS`} />
          <h2 className="text-2xl text-white font-light">Local de Tatuajes</h2>
        </div>
      </Section>
    </div>
  )
}
