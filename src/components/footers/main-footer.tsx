import { Separator } from '@/components/shadcn/ui/separator'
import { LogoWithMedia } from './logo-with-media'
import { PageLinks } from './page-links'
import { getAllPageData } from '@/lib/backend/utils/data'
import { MARCA } from '@/lib/utils/consts'

export async function MainFooter() {
  const data = await getAllPageData().then((res) => res.footer_data)

  return (
    <footer className="pt-4 border-t border-border w-full flex flex-col px-2 *:max-w-[var(--content-max-width)] *:mx-auto *:w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 place-content-center mb-6">
        <LogoWithMedia />
        <div className="flex flex-col col-[1] row-span-2 md:col-[2] md:row-span-1 gap-2">
          <h5 className="text-start md:text-center text-xl">Quienes sómos?</h5>
          <p className="text-balance text-start md:text-center text-sm text-muted-foreground">
            {data}
          </p>
        </div>
        <PageLinks />
      </div>
      <div className="px-5 my-2">
        <Separator className="flex !bg-border/50" />
      </div>
      <div className="py-2 text-center text-muted-foreground text-sm">
        © {MARCA} {new Date(Date.now()).getFullYear()}
      </div>
    </footer>
  )
}
