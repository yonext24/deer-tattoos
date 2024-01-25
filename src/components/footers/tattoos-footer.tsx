import { LogoWithMedia } from './logo-with-media'
import { PageLinks } from './page-links'

export function TattoosFooter() {
  return (
    <footer className="py-2 px-5 border-t border-border w-full grid grid-cols-2 *:max-w-[var(--content-max-width)] *:mx-auto *:w-full">
      <LogoWithMedia />
      <PageLinks />
    </footer>
  )
}
