import { Separator } from '@/components/shadcn/ui/separator'
import { LogoWithMedia } from './logo-with-media'
import { PageLinks } from './page-links'

export function MainFooter() {
  return (
    <footer className="pt-4 border-t border-border w-full flex flex-col *:max-w-[var(--content-max-width)] *:mx-auto *:w-full">
      <div className="grid grid-cols-3 place-content-center mb-6">
        <LogoWithMedia />
        <div className="flex flex-col gap-2">
          <h5 className="text-center text-xl">Quienes sómos?</h5>
          <p className="text-balance text-center text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            laboriosam fugit fugiat. Quod, voluptate quidem unde tempora officia
            excepturi soluta est vel
          </p>
        </div>
        <PageLinks />
      </div>
      <div className="px-5 my-2">
        <Separator className="flex !bg-border/50" />
      </div>
      <div className="py-2 text-center text-muted-foreground text-sm">
        © MARCA DE TATUAJES 2024
      </div>
    </footer>
  )
}
