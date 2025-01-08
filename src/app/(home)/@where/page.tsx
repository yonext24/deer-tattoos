import { DecoratedTitle } from '@/components/decorated-title/decorated-title'
import { Section } from '@/components/ui/common/section'

export default async function Page() {
  return (
    <Section className="min-h-[auto] flex w-full mt-4 mb-12">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.5310867002822!2d-58.39146823572363!3d-34.7061924858934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccd22352de20f%3A0x7ccd9474aff0e664!2sBingo%20Lan%C3%BAs!5e0!3m2!1ses-419!2sar!4v1735932939952!5m2!1ses-419!2sar"
        width="600"
        height="450"
        style={{ border: '0' }}
        // allowfullscreen=""
        loading="lazy"
        // referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="flex flex-1 flex-col">
        <DecoratedTitle className="h-max text-5xl">
          Dónde estamos?
        </DecoratedTitle>

        <p>Estamos ubicados en la mejor zona de Lanús Oeste</p>
        <p>A 5 cuadras de la estación de Lanús</p>
      </div>
    </Section>
  )
}
