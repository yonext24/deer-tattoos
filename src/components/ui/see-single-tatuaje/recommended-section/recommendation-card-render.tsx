import { Tattoo } from '@/lib/types/tattoo'
import { WithStatusAndErrorType } from './single-tatuaje-recommended-section'
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { SmallerTattooCard } from '@/components/tattoo-card/smaller-tattoo-card'

export function RecommendationCardRender({
  status,
  error,
  data,
}: WithStatusAndErrorType<Tattoo[]>) {
  if (status === 'loading' || status === 'idle')
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-full" />
        ))}
      </>
    )

  if (status === 'error')
    return (
      <div className="col-start-1 col-end-4 h-full flex justify-center items-center text-destructive">
        Ocurrió un error al recuperar los tatuajes, por favor inténtalo denuevo.
      </div>
    )

  if (status === 'success')
    return (
      <>
        {data.map((el) => (
          <SmallerTattooCard key={el.id} tattoo={el} preventScale />
        ))}
      </>
    )

  return null
}
